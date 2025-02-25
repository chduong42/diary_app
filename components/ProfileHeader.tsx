import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
type Props = {
  photoURL?: string | null;
  displayName?: string | null;
  email?: string | null;
  onSignOut: () => void;
};

export function ProfileHeader({ photoURL, displayName, email, onSignOut }: Props) {
  const [fontsLoaded] = useFonts({ 'Bonheur': require('../assets/fonts/BonheurRoyale-Regular.ttf') });

  if (!fontsLoaded) 
    return null;
  
  return (
    <>
      <View style={styles.header}>
        <View style={styles.profileSection}>
          {photoURL ? (
            <Image source={{ uri: photoURL }} style={styles.profileImage} />
          ) : (
            <View style={styles.profileImagePlaceholder}>
              <FontAwesome6 name="user-circle" size={40} color="white" />
            </View>
          )}
          <Text style={styles.userName}>{displayName || email}</Text>
        </View>
        <TouchableOpacity style={styles.signOutButton} onPress={onSignOut}>
          <MaterialIcons name="logout" size={30} color="#FFD700" />
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 60,
    paddingBottom: 10,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 5,
  },
  profileImagePlaceholder: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  userName: {
    marginLeft: 10,
    fontSize: 28,
    color: 'white',
    fontWeight: '400',
    // fontFamily: 'Bonheur',
  },
  signOutButton: {
    padding: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#333',
    marginHorizontal: 10,
  },
}); 