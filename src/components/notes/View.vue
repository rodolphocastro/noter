<template>
  <div class="max-w-xl bg-gray-100 shadow-lg px-2 py-4 border border-gray-100">
    <div class="mb-4 block">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="note-titulo">Título</label>
      <input
        class="w-full block shadow appearance-none border rounded py-2 px-4 text-gray-700 leading-tight"
        type="text"
        id="note-titulo"
        disabled
        v-bind:value="selectedNote.titulo"
      />
    </div>
    <div class="mb-4 block">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="note-titulo">Descricao</label>
      <textarea
        class="w-full block shadow appearance-none border rounded py-2 px-4 text-gray-700 leading-tight"
        type="text"
        id="note-desc"
        disabled
        v-bind:value="selectedNote.descricao"
      ></textarea>
    </div>
    <div class="relative block h-12">
      <button
        @click="editNote"
        type="button"
        class="button absolute right-0 bg-gray-500 hover:bg-gray-300"
      >Editar</button>
      <button
        @click="fireDeleteNote"
        type="button"
        class="button absolute left-0 bg-red-600 hover:bg-red-400"
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
      if (confirm('Deseja deletar a anotação?')) {
        deleteNote(selectedNote.value)
        ctx.emit('note-deleted')
      }
    }
    return {
      selectedNote,
      editNote,
      fireDeleteNote
    }
  }
})
</script>

<style scoped lang="postcss">
.button {
  @apply font-semibold;
  @apply rounded-md px-4 py-2 w-32 h-12;
  @apply transition duration-300;
}
</style>
