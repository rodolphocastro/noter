<template>
  <div class="w-full h-full">
    <header class="w-full p-2 border-b border-green-700 mb-2">
      <nav class="inline-block space-x-2 text-lg text-green-800 font-semibold">
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
      class="container mx-auto"
      v-bind:is="selectedComponent"
      v-on:note-submited="navigateToBrowse"
      v-on:note-cancelled="navigateToPrevious"
      v-on:note-selected="navigateToDetails"
      v-on:note-edit-enabled="navigateToEdit"
      v-on:note-deleted="navigateToBrowse"
    ></component>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import { notesState } from './State'

export default defineComponent({
  name: 'notes-home',
  components: {
    'create-note': () => import('./Edit.vue'),
    'list-notes': () => import('./List.vue'),
    'view-note': () => import('./View.vue')
  },
  setup () {
    const components = ['list-notes', 'create-note', 'view-note']
    const selectedComponent = ref(components[0])
    const navigateToBrowse = () => {
      notesState.actions.toggleEdit(false)
      notesState.actions.pickNote(null)
      selectedComponent.value = components[0]
    }
    const navigateToDetails = () => {
      notesState.actions.toggleEdit(false)
      selectedComponent.value = components[2]
    }
    const navigateToEdit = () => {
      notesState.actions.toggleEdit(true)
      selectedComponent.value = components[1]
    }
    const navigateToCreate = () => {
      notesState.actions.toggleEdit(false)
      notesState.actions.pickNote(null)
      selectedComponent.value = components[1]
    }
    const navigateToPrevious = () => {
      notesState.actions.toggleEdit(false)
      if (notesState.computed.selectedNote.value.id !== '') {
        selectedComponent.value = components[2]
      } else {
        selectedComponent.value = components[0]
      }
    }
    return {
      components,
      selectedComponent,
      navigateToBrowse,
      navigateToDetails,
      navigateToEdit,
      navigateToCreate,
      navigateToPrevious
    }
  }
})
</script>

<style scoped lang="postcss">
</style>
