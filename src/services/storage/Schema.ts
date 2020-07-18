import { DBSchema, IDBPDatabase } from 'idb'
import { Note } from '@/models/Notes'

export interface NoterSchema extends DBSchema{
  notes: {
    key: string,
    value: Note;
  }
}

export function createNotesStore (database: IDBPDatabase<NoterSchema>): void {
  if (!database.objectStoreNames.contains('notes')) {
    database.createObjectStore('notes', {
      keyPath: 'id',
      autoIncrement: true
    })
  }
}
