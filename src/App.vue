<template>
  <div id="app">
    <header class="bg-green-600 p-2">
      <nav class="inline-block space-x-2">
        <a href="https://" target="_blank" rel="noopener noreferrer" class="font-black">Noter</a>
        <a href="https://#" class="font-bold">Home</a>
      </nav>
    </header>
    <main class="px-12 flex-grow">
      <section id="notes" class="h-full">
        <notes-home></notes-home>
      </section>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { notesState } from './components/notes/State'

export default defineComponent({
  name: 'App',
  components: {
    'notes-home': () => import('./components/notes/Home.vue')
  },
  setup () {
    notesState.loadAvailable()
    return {}
  }
})
</script>

<style lang="postcss">
#app {
  @apply w-screen h-screen inline-flex flex-col;
}
</style>
