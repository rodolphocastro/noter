<template>
  <div class="w-full h-full">
    <header class="w-full p-2 border-b border-green-700 mb-2">
      <nav class="flex-row space-x-2 text-lg text-green-800 font-semibold">
        <a
          href="http://"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:text-green-600"
          v-on:click="navigateToBrowse"
        >Todas</a>
        <a
          href="http://"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:text-green-600"
          v-on:click="navigateToCreate"
        >Nova</a>
      </nav>
    </header>
    <component
      v-bind:is="selectedComponent"
      v-on:note-submited="navigateToBrowse"
      v-on:note-cancelled="navigateToBrowse"
    ></component>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import { notesState, Note } from './Notes'

export default defineComponent({
  name: 'notes-home',
  components: {
    'create-note': () => import('./Edit.vue'),
    'list-notes': () => import('./List.vue')
  },
  setup () {
    const components = ['list-notes', 'create-note']
    const selectedComponent = ref(components[0])
    const navigateToBrowse = () => {
      notesState.toggleEdit(false)
      notesState.pickNote(null)
      selectedComponent.value = components[0]
    }
    const navigateToDetails = (selected: Note) => {
      notesState.toggleEdit(false)
      notesState.pickNote(selected)
      selectedComponent.value = components[0]
    }
    const navigateToEdit = (selected: Note) => {
      notesState.toggleEdit(true)
      notesState.pickNote(selected)
      selectedComponent.value = components[1]
    }
    const navigateToCreate = () => {
      notesState.toggleEdit(false)
      notesState.pickNote(null)
      selectedComponent.value = components[1]
    }
    return {
      components,
      selectedComponent,
      navigateToBrowse,
      navigateToDetails,
      navigateToEdit,
      navigateToCreate
    }
  }
})
</script>

<style scoped lang="postcss">
</style>
