import { StyleSheet, Text, View, TouchableOpacity, Animated } from "react-native";
import { router, useFocusEffect } from "expo-router";
import { useFonts } from 'expo-font';
import { Fontisto } from '@expo/vector-icons';
import { useRef, useState, useCallback } from 'react';

export default function Index() {
  const [fontsLoaded] = useFonts({ 'Bonheur': require('../assets/fonts/BonheurRoyale-Regular.ttf') });
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [isLocked, setIsLocked] = useState(true);

  // Réinitialiser l'état du cadenas quand l'écran reçoit le focus
  useFocusEffect(
    useCallback(() => {
      setIsLocked(true);
      scaleAnim.setValue(1);
    }, [])
  );

  if (!fontsLoaded)
    return null;

  const handlePressIn = () => {
    setIsLocked(false);
    Animated.spring(scaleAnim, {
      toValue: 1.2,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start(() => {
      router.push("/(auth)");
    });
  };

  return (
    <View style={styles.container}>
      {/* Coins dorés */}
      <View style={styles.cornerTopLeft} />
      <View style={styles.cornerTopRight} />
      <View style={styles.cornerBottomLeft} />
      <View style={styles.cornerBottomRight} />

      <Text style={styles.title}>Your Diary</Text>
      <TouchableOpacity
        style={styles.button}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Animated.View style={{
          transform: [{ scale: scaleAnim }],
          alignItems: 'center'
        }}>
          <Fontisto name={isLocked ? "locked" : "unlocked"} size={64} color="#FFD700" />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#1A1A1A',
  },
  title: {
    fontFamily: 'Bonheur',
    fontSize: 62,
    marginBottom: 20,
    color: 'white',
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#2A2A2A',
    padding: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#FFD700',
    borderRadius: 80,
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Bonheur',
    fontSize: 18,
    color: '#FFD700',
    fontWeight: '600',
  },
  cornerTopLeft: {
    position: 'absolute',
    top: 60,
    left: 20,
    width: 50,
    height: 50,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderColor: '#FFD700',
  },
  cornerTopRight: {
    position: 'absolute',
    top: 60,
    right: 20,
    width: 50,
    height: 50,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: '#FFD700',
  },
  cornerBottomLeft: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    width: 50,
    height: 50,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderColor: '#FFD700',
  },
  cornerBottomRight: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    width: 50,
    height: 50,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: '#FFD700',
  },
});