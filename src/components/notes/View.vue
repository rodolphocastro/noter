<template>
  <div class="w-full">
    <div class="mb-4 block">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="note-titulo">Título</label>
      <input
        class="block shadow appearance-none border rounded py-2 px-4 text-gray-700 leading-tight"
        type="text"
        id="note-titulo"
        disabled
        v-bind:value="selectedNote.titulo"
      />
    </div>
    <div class="mb-4 block">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="note-titulo">Descricao</label>
      <textarea
        class="block shadow appearance-none border rounded py-2 px-4 text-gray-700 leading-tight"
        type="text"
        id="note-desc"
        disabled
        v-bind:value="selectedNote.descricao"
      ></textarea>
    </div>
    <div class="block space-x-1">
      <button
        @click="editNote"
        type="button"
        class="bg-gray-500 hover:bg-gray-300 transition duration-500 rounded-lg px-4 py-2 w-32"
      >Editar</button>
      <button
        @click="fireDeleteNote"
        type="button"
        class="bg-red-600 hover:bg-red-400 transition duration-500 rounded-lg px-4 py-2 w-32"
      >Deletar</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { notesState } from './Notes'

export default defineComponent({
  setup (_props, ctx) {
    const { selectedNote, pickNote, deleteNote } = notesState
    const editNote = () => {
      pickNote(selectedNote.value)
      ctx.emit('note-edit-enabled')
    }
    const fireDeleteNote = () => {
      deleteNote(selectedNote.value)
      ctx.emit('note-deleted')
    }
    return {
      selectedNote,
      editNote,
      fireDeleteNote
    }
  }
})
</script>

<style>
</style>
