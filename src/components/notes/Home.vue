<template>
  <div class="w-full h-full">
    <header class="w-full p-2 border-b border-green-700 mb-2">
      <nav class="w-full flex flex-row space-x-2 text-lg text-green-800 font-semibold">
        <a
          href="http://"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:text-green-600 inline-flex items-center"
          v-on:click="navigateToBrowse"
        >
          <svg class="h-4 w-4 inline-block fill-current mr-1" viewBox="0 0 20 20">
            <path
              d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            />
          </svg>
          <span>Todas</span>
        </a>
        <a
          href="http://"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:text-green-600 inline-flex items-center"
          v-on:click="navigateToCreate"
        >
          <svg class="h-4 w-4 fill-current mr-1" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clip-rule="evenodd"
            />
          </svg>
          <span>Criar</span>
        </a>
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
