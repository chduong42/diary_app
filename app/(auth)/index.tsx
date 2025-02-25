import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { useAuth } from '@/context/AuthContext';
import { router } from 'expo-router';

function AuthScreen() {
  const { signInWithGoogle, handleGithubLogin, error } = useAuth();
  const [fontsLoaded] = useFonts({ 'Bonheur': require('@/assets/fonts/BonheurRoyale-Regular.ttf') });

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <FontAwesome name="arrow-left" size={24} color="#FFD700" />
      </TouchableOpacity>

      <Text style={styles.title}>
        Welcome to your diary
      </Text>
      {error ?
        <Text style={styles.error}>{error}</Text> :
        <Text style={styles.subtitle}>Login to your account</Text>
      }

      <TouchableOpacity
        style={styles.button}
        onPress={signInWithGoogle}
      >
        <FontAwesome name="google" size={25} color="white" />
        <Text style={styles.buttonText}>Continue with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={handleGithubLogin}
      >
        <FontAwesome name="github" size={25} color="white" />
        <Text style={styles.buttonText}>Continue with Github</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#1A1A1A',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    padding: 10,
  },
  title: {
    fontFamily: 'Bonheur',
    fontSize: 42,
    color: 'white',
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2A2A2A',
    padding: 15,
    width: '100%',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
  error: {
    color: 'red',
    fontSize: 16,
    marginBottom: 30,
  },
});

export default AuthScreen;
