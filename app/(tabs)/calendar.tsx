import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { Calendar as RNCalendar, DateData } from 'react-native-calendars';
import { NoteEntry } from '../../components/NoteEntry';
import { NoteType } from '../../types/diary';
import { useFonts } from 'expo-font';
import { NoteDetailModal } from '../../components/NoteDetailModal';
import { db } from '../../services/firestoreService';
import { useAuth } from '../../context/AuthContext';


export default function Calendar() {
  const { user } = useAuth();
  const [fontsLoaded] = useFonts({ 'Bonheur': require('../../assets/fonts/BonheurRoyale-Regular.ttf') });
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedNote, setSelectedNote] = useState<NoteType | null>(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [notes, setNotes] = useState<NoteType[]>([]);

  const loadEntries = async () => {
    if (user?.email) {
      const allnotes = await db.getAllNotesOf(user.email);
      setNotes(allnotes);
    }
  };

  useEffect(() => {
    loadEntries();
  }, [user]);

  if (!fontsLoaded)
    return null;

  const filteredEntries = notes.filter(entry => {
    const entryDate = new Date(entry.date).toLocaleDateString('fr-FR');
    const selectedLocalDate = new Date(selectedDate).toLocaleDateString('fr-FR');
    return entryDate === selectedLocalDate;
  });

  const handleNotePress = (note: NoteType) => {
    setSelectedNote(note);
    setIsDetailModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    await db.deleteNote(id);
    loadEntries();
  };

  return (
    <SafeAreaView style={styles.container}>
      <RNCalendar
        style={styles.calendar}
        onDayPress={(day: DateData) => setSelectedDate(day.dateString)}
        markedDates={{ [selectedDate]: { selected: true, selectedColor: '#FFD700' } }}
        theme={{
          backgroundColor: '#1A1A1A',
          calendarBackground: '#1A1A1A',
          selectedDayBackgroundColor: '#FFD700',
          selectedDayTextColor: '#000',
          todayTextColor: '#FFD700',
          dayTextColor: '#FFFFFF',
          textDisabledColor: '#444444',
          monthTextColor: '#FFFFFF',
          textSectionTitleColor: '#FFD700',
          arrowColor: '#FFD700',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: 'bold',
          textDayFontSize: 16,
          textMonthFontSize: 18,
          textDayHeaderFontSize: 14,
          textSectionTitleDisabledColor: '#444444',
          selectedDotColor: '#000',
          dotColor: '#FFD700',
          weekVerticalMargin: 4,
        }}
      />

      <View style={styles.entriesContainer}>
        <Text style={styles.dateTitle}>
          Notes du {new Date(selectedDate).toLocaleDateString('fr-FR')}
        </Text>

        {filteredEntries.length === 0 ? (
          <Text style={styles.noEntries}>Aucune note pour cette date</Text>
        ) : (
          <FlatList
            data={filteredEntries}
            keyExtractor={item => item.id || ''}
            renderItem={({ item }) => (
              <NoteEntry
                entry={item}
                onDelete={handleDelete}
                onPress={() => handleNotePress(item)}
              />
            )}
            style={styles.entriesList}
            indicatorStyle="white"
          />
        )}
      </View>

      <NoteDetailModal
        visible={isDetailModalVisible}
        note={selectedNote}
        onClose={() => setIsDetailModalVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
    paddingBottom: 10,
  },
  entriesContainer: {
    flex: 1,
    padding: 10,
  },
  dateTitle: {
    fontFamily: 'Bonheur',
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  entriesList: {
    flex: 1,
    flexGrow: 1,
  },
  noEntries: {
    textAlign: 'center',
    color: '#666',
  },
});
