<template>
  <form
    class="max-w-xl bg-gray-100 shadow-lg px-2 py-4 border border-red-200"
    v-on:submit.prevent="submitChanges(current)"
    v-on:reset="cancelChanges"
  >
    <div class="mb-4 block">
      <label class="block" for="input-titulo">Título</label>
      <input class="w-full block shadow border rounded py-2 px-4 text-gray-700 leading-tight" type="text" id="input-titulo" v-model.trim="current.titulo" />
    </div>
    <div class="mb-4 block">
      <label class="block" for="input-desc">Descrição</label>
      <textarea class="w-full block shadow border rounded py-2 px-4 text-gray-700 leading-tight" id="input-desc" v-model.trim="current.descricao"></textarea>
    </div>
    <div class="relative block h-12">
      <button type="reset" class="button bg-gray-500 hover:bg-gray-300 absolute inset-y-auto left-0">Cancelar</button>
      <button type="submit" class="button bg-green-400 hover:bg-green-200 absolute inset-y-auto right-0">Salvar</button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api'
import { notesState, Note } from './Notes'

export default defineComponent({
  setup (_props, ctx) {
    const current = reactive({ ...notesState.selectedNote.value })
    const submitChanges = async (note: Note) => {
      await notesState.saveChanges({ ...note })
      ctx.emit('note-submited')
    }
    const cancelChanges = () => {
      ctx.emit('note-cancelled')
    }
    return {
      current,
      isEditing: notesState.isEditing,
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
  @apply rounded-md px-4 py-2 w-32 h-12;
  @apply transition duration-300;
}
</style>
