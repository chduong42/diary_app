import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, Alert, Text } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../services/firestoreService';
import { NoteType } from '../../types/diary';
import { FontAwesome6 } from '@expo/vector-icons';
import { ProfileHeader } from '../../components/ProfileHeader';
import { NoteEntry } from '../../components/NoteEntry';
import { NewEntryModal } from '../../components/NewEntryModal';
import { MoodOverview } from '../../components/MoodOverview';
import { useFonts } from 'expo-font';
import { NoteDetailModal } from '../../components/NoteDetailModal';

function ProfileScreen() {
  const [fontsLoaded] = useFonts({ 'Bonheur': require('../../assets/fonts/BonheurRoyale-Regular.ttf') });
  const { user, signOut } = useAuth();
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newEntry, setNewEntry] = useState({ title: '', mood: '', text: '' });
  const [selectedNote, setSelectedNote] = useState<NoteType | null>(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);

  const loadEntries = async () => {
    if (user?.email) {
      const allnotes = await db.getAllNotesOf(user.email);
      // console.log("allnotes:", allnotes);
      setNotes(allnotes);
    }
  };

  useEffect(() => {
    loadEntries();
  }, [user]);

  const handleDelete = (id: string) => {
    Alert.alert(
      "Delete Entry",
      "Are you sure you want to delete this entry?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await db.deleteNote(id);
            loadEntries();
          }
        }
      ]
    );
  };

  const handleAddEntry = async () => {
    if (!user?.email) return;

    try {
      await db.addNote({
        usermail: user.email,
        date: new Date(),
        title: newEntry.title,
        mood: newEntry.mood || 'Neutral',
        text: newEntry.text,
      });

      setNewEntry({ title: '', mood: '', text: '' });
      setIsModalVisible(false);
      loadEntries();
    } catch (error) {
      Alert.alert('Error', 'Failed to create entry');
    }
  };

  const handleNotePress = (note: NoteType) => {
    setSelectedNote(note);
    setIsDetailModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <ProfileHeader
        photoURL={user?.photoURL}
        displayName={user?.displayName}
        email={user?.email}
        onSignOut={signOut}
      />

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Last notes</Text>
        <FlatList
          data={notes.sort((a, b) => b.date.getTime() - a.date.getTime())}
          renderItem={({ item }) => (
            <NoteEntry
              entry={item}
              onDelete={handleDelete}
              onPress={() => handleNotePress(item)}
            />
          )}
          keyExtractor={item => item.id!}
          style={styles.list}
          indicatorStyle="white"
        />

        <MoodOverview entries={notes} />
      </View>

      <NewEntryModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSubmit={handleAddEntry}
        entry={newEntry}
        onChangeEntry={(field, value) =>
          setNewEntry(prev => ({ ...prev, [field]: value }))
        }
      />

      <NoteDetailModal
        visible={isDetailModalVisible}
        note={selectedNote}
        onClose={() => setIsDetailModalVisible(false)}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setIsModalVisible(true)}
      >
        <FontAwesome6 name="feather-pointed" size={24} color="#1A1A1A" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  sectionTitle: {
    fontFamily: 'Bonheur',
    color: 'white',
    fontSize: 45,
    fontWeight: 'bold',
    marginLeft: 10,
    textDecorationLine: 'underline',
  },
  list: {
    height: '50%',
    marginBottom: 10,
    flexGrow: 0,
  },
  addButton: {
    position: 'absolute',
    left: '50%',
    bottom: -15,
    marginLeft: -30,
    backgroundColor: '#FFD700',
    width: 60,
    height: 60,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 1000,
  },
});

export default ProfileScreen; 