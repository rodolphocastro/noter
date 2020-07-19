<template>
  <div id="app">
    <header class="bg-green-600 p-2">
      <nav class="inline-block">
        <a href="#" class="font-black text-lg mr-4">Noter</a>
        <a href="#" class="font-bold inline-flex items-center">
          <svg class="fill-current h-4 w-4 mr-1" viewBox="0 0 20 20">
            <path
              d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
            />
          </svg>
          <span>Home</span>
        </a>
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
    const {
      actions: { loadAvailable }
    } = notesState
    loadAvailable()
    return {}
  }
})
</script>

<style lang="postcss">
#app {
  @apply w-screen h-screen inline-flex flex-col;
}
</style>
