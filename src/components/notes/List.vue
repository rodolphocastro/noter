<template>
  <section class="flex flex-row flex-wrap w-full">
    <article
      v-for="note in notes"
      v-bind:key="note.id"
      class="flex-grow shadow-lg border border-gray-300 m-3 w-3/12"
    >
      <div class="px-6 py-4">
        <header class="mb-2">
          <h3 class="font-bold truncate">{{note.titulo}}</h3>
        </header>
        <p class="text-base text-gray-700 truncate">{{note.descricao}}</p>
      </div>
      <div class="px-6 py-4">
        <button type="button" class="bg-gray-500 rounded-sm px-4 py-2 w-32">Selecionar</button>
      </div>
    </article>
  </section>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { notesState } from './Notes'

export default defineComponent({
  setup () {
    return {
      notes: notesState.notes
    }
  }
})
</script>

<style>
</style>
