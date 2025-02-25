import React from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { MOODS } from '../types/diary';
import { useFonts } from 'expo-font';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSubmit: () => void;
  entry: {
    title: string;
    mood: string;
    text: string;
  };
  onChangeEntry: (field: string, value: string) => void;
};

export function NewEntryModal({ visible, onClose, onSubmit, entry, onChangeEntry }: Props) {
  const [fontsLoaded] = useFonts({ 'Bonheur': require('../assets/fonts/BonheurRoyale-Regular.ttf') });

  if (!fontsLoaded)
    return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>New Note</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <FontAwesome6 name="xmark" size={24} color="#FFD700" />
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Title"
            placeholderTextColor="#666"
            value={entry.title}
            onChangeText={(text) => onChangeEntry('title', text)}
          />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={true}
            contentContainerStyle={styles.moodContainer}
            indicatorStyle="white"
          >
            {MOODS.map((mood) => (
              <TouchableOpacity
                key={mood.label}
                style={[
                  styles.moodButton,
                  { backgroundColor: mood.color },
                  entry.mood === mood.label && styles.selectedMood
                ]}
                onPress={() => onChangeEntry('mood', mood.label)}
              >
                <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                <Text style={styles.moodLabel}>{mood.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <TextInput
            style={[styles.input, styles.contentInput]}
            placeholder="Write your thoughts..."
            placeholderTextColor="#666"
            multiline
            value={entry.text}
            onChangeText={(text) => onChangeEntry('text', text)}
          />

          <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
            <Text style={styles.submitButtonText}>Print Note</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
    gap: 10,
  },
  content: {
    backgroundColor: '#1A1A1A',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  title: {
    fontFamily: 'Bonheur',
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    textDecorationLine: 'underline',
  },
  closeButton: {
    padding: 5,
  },
  input: {
    backgroundColor: '#2A2A2A',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    color: '#fff',
    fontSize: 16,
  },
  contentInput: {
    height: 150,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#FFD700',
    padding: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'black',
    fontFamily: 'Bonheur',
    fontSize: 36,
    fontWeight: 'bold',
  },
  moodContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    gap: 5,
  },
  moodButton: {
    padding: 10,
    borderRadius: 12,
    alignItems: 'center',
    width: 80,
    opacity: 0.7,
  },
  selectedMood: {
    opacity: 1,
    borderWidth: 2,
    borderColor: 'white',
  },
  moodEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  moodLabel: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
}); 