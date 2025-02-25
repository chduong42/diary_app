import { router } from 'expo-router';
import auth from '@react-native-firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { GoogleSignin, statusCodes, isSuccessResponse, isErrorWithCode } from '@react-native-google-signin/google-signin';
import { useAuthRequest, makeRedirectUri } from 'expo-auth-session';

declare global { var RNFB_SILENCE_MODULAR_DEPRECATION_WARNINGS: boolean; }
globalThis.RNFB_SILENCE_MODULAR_DEPRECATION_WARNINGS = true;

interface AuthContextType {
  user: any;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  error: string | null;
  handleGithubLogin: () => Promise<void>;
}

const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint: `https://github.com/settings/connections/applications/${process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID}`,
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const [_, response, promptAsync] = useAuthRequest({
    clientId: process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID!,
    scopes: ['identity', 'user:email'],
    redirectUri: makeRedirectUri({
      scheme: 'diaryapp',
      path: 'oauth2/github'
    })
  }, discovery);

  useEffect(() => {
    if (response?.type === 'success') {
      handleGithubAuth(response.params.code);
      setError(null);
    }
  }, [response]);

  async function handleGithubAuth(code: string) {
    try {
      const { access_token } = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID,
          client_secret: process.env.EXPO_PUBLIC_GITHUB_CLIENT_SECRET,
          code,
        }),
      }).then(res => res.json());

      const credential = auth.GithubAuthProvider.credential(access_token);
      await auth().signInWithCredential(credential);
    } catch (error) {
      setError('Erreur GitHub:' + error);
    }
  }

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    });

    return auth().onAuthStateChanged((user) => {
      setUser(user);
      router.replace(user ? '/(tabs)' : '/');
    });
  }, []);

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const response = await GoogleSignin.signIn();

      if (isSuccessResponse(response)) {
        const credential = auth.GoogleAuthProvider.credential(response.data.idToken);
        await auth().signInWithCredential(credential);
      }

    } catch (error) {
      setError("Erreur Google Sign-In: " + error);
    }
  };

  const signOut = async () => {
    try {
      await Promise.all([GoogleSignin.signOut(), auth().signOut()]);
      router.replace('/(auth)');
    } catch (error) {
      console.error(error);
    }
  };

  const handleGithubLogin = async () => {
    try {
      await promptAsync();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      signInWithGoogle,
      signOut,
      error,
      handleGithubLogin
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}

export default AuthProvider;