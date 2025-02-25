import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { NoteType } from '../types/diary';
import { MOODS } from '../types/diary';
import { useFonts } from 'expo-font';
type Props = {
  entry: NoteType;
  onDelete: (id: string) => void;
  onPress: () => void;
};

export function NoteEntry({ entry, onDelete, onPress }: Props) {
  const [fontsLoaded] = useFonts({ 'Bonheur': require('../assets/fonts/BonheurRoyale-Regular.ttf') });

  const formatDate = (timestamp: any) => {
    if (timestamp?.seconds)
      return new Date(timestamp.seconds * 1000).toLocaleDateString();
    else if (timestamp)
      return new Date(timestamp).toLocaleDateString();
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.leftpart}>
        <Text style={styles.date}>{formatDate(entry.date)}</Text>
        <Text style={styles.feeling}>{MOODS.find(mood => mood.label === entry.mood)?.emoji}</Text>
      </View>

      <Text style={styles.title} numberOfLines={1}>{entry.title}</Text>

      <TouchableOpacity onPress={() => onDelete(entry.id!)} style={styles.deleteButton}>
        <FontAwesome6 name="trash" size={16} color="#FFD700" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#2A2A2A',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 5,
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    color: '#fff',
    width: 100,
    fontSize: 18,
  },
  leftpart: {
    flexDirection: 'row',
    gap: 0,
    alignItems: 'center',
    paddingRight: 10,
    marginHorizontal: 0,
    borderRightWidth: 1,
    borderColor: '#c0b4b4',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "flex-start",
    gap: 10,
  },
  title: {
    fontSize: 30,
    color: '#fff',
    fontFamily: 'Bonheur',
    fontWeight: 'bold',
    width: 180,
  },
  text: {
    color: '#999',
    fontSize: 16,
  },
  feeling: {
    fontSize: 26,
  },
  deleteButton: {
    padding: 5,
  },
}); 