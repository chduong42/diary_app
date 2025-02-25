import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { NoteType, MOODS } from '../types/diary';
import { FontAwesome6 } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

type NoteDetailModalProps = {
  visible: boolean;
  note: NoteType | null;
  onClose: () => void;
};

export const NoteDetailModal = ({ visible, note, onClose }: NoteDetailModalProps) => {
  const [fontsLoaded] = useFonts({ 'Bonheur': require('../assets/fonts/BonheurRoyale-Regular.ttf') });
  if (!note || !fontsLoaded) return null;
  const mood = MOODS.find(m => m.label.toLowerCase() === note.mood.toLowerCase());

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.emoji}>{mood?.emoji || '😶'}</Text>
            
            <Text style={styles.date}>
              {note.date.toLocaleDateString()} - {note.date.toLocaleTimeString()}
            </Text>

            <TouchableOpacity onPress={onClose}>
              <FontAwesome6 name="xmark" size={24} color="#FFD700" />
            </TouchableOpacity>
          </View>

          <Text style={styles.title}>{note.title}</Text>

          <ScrollView style={styles.textContainer}>
            <Text style={styles.text}>{note.text}</Text>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 28,
    marginRight: 10,
  },
  date: {
    fontSize: 18,
    color: '#c1bfbf',
    flex: 1,
  },
  title: {
    fontSize: 40,
    color: 'white',
    fontFamily: 'Bonheur',
  },
  textContainer: {
    maxHeight: '100%',
  },
  text: {
    color: 'white',
    fontSize: 16,
    lineHeight: 24,
  },
}); 