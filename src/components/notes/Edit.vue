<template>
  <form
    class="max-w-xl bg-gray-100 shadow-lg px-2 py-4 border border-red-200"
    v-on:submit.prevent="submitChanges(current)"
    v-on:reset="cancelChanges"
  >
    <div class="mb-4 block">
      <label class="block" for="input-titulo">Título</label>
      <input
        class="w-full block shadow border rounded py-2 px-4 text-gray-700 leading-tight"
        type="text"
        id="input-titulo"
        v-model.trim="current.titulo"
      />
    </div>
    <div class="mb-4 block">
      <label class="block" for="input-desc">Descrição</label>
      <textarea
        class="w-full block shadow border rounded py-2 px-4 text-gray-700 leading-tight"
        id="input-desc"
        v-model.trim="current.descricao"
      ></textarea>
    </div>
    <div class="flex flex-row justify-between w-full">
      <button type="reset" class="button bg-gray-500 hover:bg-gray-300 inline-flex items-center">
        <svg viewBox="0 0 20 20" class="fill-current w-4 h-4 mr-1">
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clip-rule="evenodd"
          />
        </svg>
        <span>Cancelar</span>
      </button>
      <button type="submit" class="button bg-green-400 hover:bg-green-200 inline-flex items-center">
        <svg class="fill-current w-4 h-4 mr-1" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
        <span>Salvar</span>
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api'
import { notesState } from './State'
import { Note } from '@/models/Notes'

export default defineComponent({
  setup (_props, ctx) {
    const current = reactive({ ...notesState.computed.selectedNote.value })
    const submitChanges = async (note: Note) => {
      await notesState.actions.saveChanges({ ...note })
      ctx.emit('note-submited')
    }
    const cancelChanges = () => {
      ctx.emit('note-cancelled')
    }
    return {
      current,
      isEditing: notesState.computed.isEditing,
      submitChanges,
      cancelChanges
    }
  }
})
</script>

<style scoped lang="postcss">
label {
  @apply text-gray-700 text-sm font-bold mb-2;
}

input {
  @apply appearance-none;
}

.button {
  @apply font-semibold;
  @apply rounded-md px-4 py-2;
  @apply transition duration-300;
}
</style>
