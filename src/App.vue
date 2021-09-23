<template>
  <div id="app">
    <app-layout></app-layout>
  </div>
</template>

<script>
import { ViewLayout, AppLayout } from '@comp/Layout'

export default {
  name: 'App',
  // eslint-disable-next-line vue/no-unused-components
  components: { ViewLayout, AppLayout },
  created () {
    
  }
}
</script>

<style>

</style>
