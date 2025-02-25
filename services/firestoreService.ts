import firestore from '@react-native-firebase/firestore';
import { NoteType } from '../types/diary';

const notesCollection = firestore().collection('notes');

export const db = {
  getAllNotesOf: async (usermail: string) => {
    try {
      const entries = await notesCollection
        .where('usermail', '==', usermail)
        .get();

      return entries.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          date: data.date ? data.date.toDate() : null // Vérification pour éviter une erreur si `date` est `undefined`
        } as NoteType;
      });
    } catch (error) {
      console.error(`Erreur lors de la récupération des notes de ${usermail}:`, error);
      return [];
    }
  },

  getNoteFrom: async (usermail: string, date: string) => {
    const entries = await notesCollection.where('usermail', '==', usermail).where('date', '==', date).get();
    return entries.docs.map(doc => doc.data() as NoteType);
  },

  addNote: async (note: NoteType) => {
    const noteToAdd = {
      ...note,
      date: firestore.Timestamp.fromDate(note.date)
    };
    const docRef = await notesCollection.add(noteToAdd);
    return docRef.id;
  },

  deleteNote: async (id: string) => {
    await notesCollection.doc(id).delete();
  },
};
