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
      <label class="block text-gray-700 text-sm font-bold mb-2" for="note-titulo">Descrição</label>
      <textarea
        class="w-full resize-y block shadow appearance-none border rounded py-2 px-4 text-gray-700 leading-tight"
        type="text"
        id="note-desc"
        disabled
        v-bind:value="selectedNote.descricao"
      ></textarea>
    </div>
    <div class="flex flex-row justify-between w-full">
      <button
        @click="fireDeleteNote"
        type="button"
        class="button bg-red-600 hover:bg-red-400 inline-flex items-center"
      >
        <svg class="fill-current h-4 w-4 mr-1" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clip-rule="evenodd"
          />
        </svg>
        <span>Deletar</span>
      </button>
      <button
        @click="editNote"
        type="button"
        class="button bg-gray-500 hover:bg-gray-300 inline-flex items-center"
      >
        <svg class="fill-current h-4 w-4 mr-1" viewBox="0 0 20 20">
          <path
            d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
          />
        </svg>
        <span>Editar</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { notesState } from './State'

export default defineComponent({
  setup (_props, ctx) {
    const {
      computed: { selectedNote },
      actions: { deleteNote, pickNote }
    } = notesState
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
  @apply rounded-md px-4 py-2;
  @apply transition duration-300;
}
</style>
