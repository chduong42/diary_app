import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MOODS, NoteType } from '../types/diary';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

interface MoodOverviewProps {
  entries: NoteType[];
}

export const MoodOverview = ({ entries }: MoodOverviewProps) => {
  const [fontsLoaded] = useFonts({ 'Bonheur': require('../assets/fonts/BonheurRoyale-Regular.ttf') });

  if (!fontsLoaded)
    return null;

  const calculateMoodStats = () => {
    const moods: { [key: string]: number } = {};

    // Initialiser tous les moods à 0
    MOODS.forEach(mood => {
      moods[mood.label] = 0;
    });

    // Compter les moods existants
    entries.forEach(entry => {
      if (entry.mood) {
        moods[entry.mood] = (moods[entry.mood] || 0) + 1;
      }
    });

    const total = entries.length || 1;
    return MOODS.map(mood => ({
      emotion: mood.label,
      emoji: mood.emoji,
      color: mood.color,
      percentage: Math.round((moods[mood.label] / total) * 100)
    }));
  };

  const moodStats = calculateMoodStats();

  return (
    <View style={styles.container}>
      <View style={styles.statsContainer}>
        <Text style={styles.title}>Mood Overview</Text>

        <View style={styles.legendContainer}>
          {moodStats.map(({ emotion, emoji, color, percentage }) => (
            <View key={emotion} style={styles.legendRow}>
              <Text style={styles.emotion}>{emoji} {emotion}</Text>
              <Text style={[styles.percentageText, { color: color }]}>{percentage}%</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.stack}>
        <View style={styles.stackhead} />
        <View style={styles.verticalBar}>
          {moodStats.map(({ emotion, color, percentage }, index) => (
            <View
              key={emotion}
              style={[styles.horizontalFill,
              { backgroundColor: color, height: `${percentage}%` }]}
            />
          ))}
          <Ionicons
            name="flash"
            size={28}
            color="white"
            style={styles.lightningBolt}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2A2A2A',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: 'white',
    fontFamily: 'Bonheur',
    fontSize: 40,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  statsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  verticalBar: {
    height: 200,
    width: 140,
    backgroundColor: '#ababab',
    borderRadius: 10,
    overflow: 'hidden',
    flexDirection: 'column',
    position: 'relative',
    borderWidth: 2,
    borderColor: 'white',
  },
  stack: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  stackhead: {
    height: 12,
    width: 40,
    backgroundColor: '#ababab',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: 'white',
  },
  horizontalFill: {
    width: '100%',
  },
  legendContainer: {
    width: 180,
    flexDirection: 'column',
    gap: 2,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  emotion: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  percentageText: {
    color: '#FFFFFF',
    width: 40,
    textAlign: 'right',
    fontSize: 18,
  },
  lightningBolt: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: [{ translateX: -14 }, { translateY: -14 }],
    zIndex: 10,
  },
}); 