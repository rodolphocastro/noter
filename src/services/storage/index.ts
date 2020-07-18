import { openDB, IDBPDatabase } from 'idb'
import { NoterSchema, createNotesStore } from './Schema'

const databaseName = 'Noter'

function indexedDbIsAvailable () {
  if (!('indexedDB' in window)) {
    alert('Seu navegador não possui suporte a Armazenamento')
    return false
  }

  return true
}

export async function getDatabase (): Promise<null | IDBPDatabase<NoterSchema>> {
  if (!indexedDbIsAvailable()) {
    return null
  }

  const db = await openDB<NoterSchema>(databaseName, 1, {
    upgrade (db, from) {
      if (!from) {
        createNotesStore(db)
      }
    }
  })

  return db
}
