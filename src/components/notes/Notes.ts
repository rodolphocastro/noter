import Vue from 'vue'
import VueCompositionAPI, { reactive, computed } from '@vue/composition-api'

Vue.use(VueCompositionAPI)

export interface Note {
  id: string;
  titulo: string;
  descricao: string | null;
}

interface NotesState {
  current: Note | null;
  available: Note[];
  isEditing: boolean;
}

/**
 * Cria uma anotação vazia.
 */
function createBlankNote (): Note {
  return {
    id: '',
    titulo: '',
    descricao: ''
  }
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
  // TODO: Buscar da indexedDB
  setAvaliable([{ id: '1', titulo: 'Minha anotação', descricao: 'Conteudo!' }])
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
const saveChanges = async (subject: Note): Promise<void> => {
  if (subject.id === '') {
    insertNote(subject)
  } else {
    updateNote(subject)
  }
}

const deleteNote = async (subject: Note): Promise<void> => {
  if (subject.id !== '') {
    setAvaliable([...notes.value.filter(n => n.id !== subject.id)])
  }
}

/**
 * Insere uma anotação no banco.
 * @param newNote Anotação a ser inserida
 */
const insertNote = (newNote: Note) => {
  // TODO: Salvar na indexedDB
  newNote.id = (new Date()).getTime().toString()
  setAvaliable([...notes.value, newNote])
}

/**
 * Atualiza uma anotação no banco.
 * @param updatedNote Anotação a ser atualizada
 */
const updateNote = (updatedNote: Note) => {
  // TODO: Atualizar na indexedDB
  setAvaliable([...notes.value.filter(n => n.id !== updatedNote.id), updatedNote])
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
