import Vue from 'vue'
import VueCompositionAPI, { reactive, computed } from '@vue/composition-api'
import { openDB, IDBPDatabase } from 'idb'
import { Note, createBlankNote } from '@/models/Notes'

Vue.use(VueCompositionAPI)

interface NotesState {
  current: Note | null;
  available: Note[];
  isEditing: boolean;
}

async function useDb (): Promise<null | IDBPDatabase> {
  if (!('indexedDB' in window)) {
    alert('Seu navegador não possui suporte a Armazenamento')
    return null
  }
  const db = await openDB('Noter', 1, {
    upgrade (db) {
      if (!db.objectStoreNames.contains('notes')) {
        db.createObjectStore('notes', { keyPath: 'id', autoIncrement: true })
      }
    }
  })
  return db
}

const state = reactive<NotesState>({
  available: [],
  current: null,
  isEditing: false
})

/**
 * Flag do modo de edição.
 */
const isEditing = computed<boolean>(() => state.isEditing)
/**
 * Anotações presentes na aplicação.
 */
const notes = computed<Note[]>(() => state.available)
/**
 * Anotação selecionada. Caso null retornará uma Vazia.
 */
const selectedNote = computed<Note>(() => state.current ?? createBlankNote())

const setAvaliable = (notes: Note[]): void => {
  state.available = notes
}

const setCurrent = (note: Note | null = null): void => {
  state.current = note
}

/**
 * Inicializa o state.
 */
const loadAvailable = async (): Promise<void> => {
  const db = await useDb()
  if (db) {
    setAvaliable(await db.getAll('notes'))
  }
}

/**
 * Seleciona uma anotação.
 * @param selection anotação a ser selecionada
 */
const pickNote = (selection: Note | null): void => {
  setCurrent(selection)
}

/**
 * Habilita/Desabilita o modo de edição.
 * @param newFlag valor para a flag
 */
const toggleEdit = (newFlag: boolean): void => { state.isEditing = newFlag }

/**
 * Salva as alterações de uma Anotação.
 * @param subject Objeto a ser salvo
 */
const saveChanges = (subject: Note): Promise<void> => {
  if (subject.id === '') {
    return insertNote(subject)
  } else {
    return updateNote(subject)
  }
}

const deleteNote = async (subject: Note): Promise<void> => {
  const db = await useDb()
  if (db && subject.id) {
    await db.delete('notes', subject.id).then(() => loadAvailable())
  }
}

/**
 * Insere uma anotação no banco.
 * @param newNote Anotação a ser inserida
 */
const insertNote = async (newNote: Note) => {
  const db = await useDb()
  if (db) {
    await db.add('notes', newNote).then(() => loadAvailable())
  } else {
    newNote.id = (new Date()).getTime().toString()
    setAvaliable([...notes.value, newNote])
  }
}

/**
 * Atualiza uma anotação no banco.
 * @param updatedNote Anotação a ser atualizada
 */
const updateNote = async (updatedNote: Note) => {
  const db = await useDb()
  if (db) {
    await db.put('notes', updatedNote).then(() => loadAvailable())
  } else {
    setAvaliable([...notes.value.filter(n => n.id !== updatedNote.id), updatedNote])
  }
}

/**
 * State para Anotações.
 */
export const notesState = {
  loadAvailable,
  pickNote,
  toggleEdit,
  saveChanges,
  deleteNote,
  isEditing,
  notes,
  selectedNote
}
