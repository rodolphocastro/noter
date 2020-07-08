<template>
  <form class="px-12 container space-y-2" v-on:submit.prevent="submitChanges(current)" v-on:reset="cancelChanges">
    <fieldset>
      <legend>Título</legend>
      <input type="text" id="input-titulo" class="w-full" v-model.trim="current.titulo"/>
    </fieldset>
    <fieldset>
      <legend>Descrição</legend>
      <textarea id="input-desc" class="w-full" v-model.trim="current.descricao"></textarea>
    </fieldset>
    <fieldset class="relative px-5">
      <button type="reset" class="absolute bg-gray-500 px-4 py-2 left-0 w-32 h-12">Cancelar</button>
      <button type="submit" class="absolute bg-green-400 px-4 py-2 right-0 w-32 h-12">Salvar</button>
    </fieldset>
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
fieldset {
  @apply border-gray-300 border-solid border-2 relative;
}

legend {
  @apply font-normal;
}
</style>
