<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld
  }
})
</script>

<style lang="postcss">

#app {
  @apply px-10 pt-0 mt-0
}

</style>
