<template>
  <div id="app">
    <header class="bg-green-600 p-2">
      <nav class="flex-row space-x-2">
        <a href="https://" target="_blank" rel="noopener noreferrer" class="font-black">Noter</a>
        <a href="https://#" class="font-bold">Home</a>
      </nav>
    </header>
    <main class="px-12">
      <section id="notes">

      </section>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'App'
})
</script>

<style lang="postcss">

#app {
  @apply w-screen
}

</style>
