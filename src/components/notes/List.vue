<template>
  <section class="flex flex-row flex-wrap w-full">
    <article
      v-for="note in notes"
      v-bind:key="note.id"
    >
      <div class="px-6 py-4">
        <header class="mb-2">
          <h3 class="font-bold truncate">{{note.titulo}}</h3>
        </header>
        <p class="text-base text-gray-700 truncate leading-relaxed">{{note.descricao}}</p>
      </div>
      <div class="px-6 py-4 block text-center">
        <button
          @click.prevent="selectNote(note)"
          type="button"
          class="bg-gray-500 hover:bg-gray-300 transition duration-500 rounded-lg px-4 py-2 w-32"
        >Selecionar</button>
      </div>
    </article>
  </section>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { notesState } from './State'
import { Note } from '@/models/Notes'

export default defineComponent({
  setup (_props, ctx) {
    const { notes, pickNote } = notesState
    const selectNote = (n: Note) => {
      pickNote(n)
      ctx.emit('note-selected')
    }
    return {
      notes,
      selectNote
    }
  }
})
</script>

<style scoped lang="postcss">

article {
  @apply flex-grow transition duration-300 shadow-md border border-gray-300 m-3 max-w-sm overflow-hidden;
}

article:hover {
  @apply shadow-2xl;
}

</style>
