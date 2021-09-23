<template>
  <div id="app">
    <app-layout></app-layout>
    <!-- 微应用注册组件 -->
    <register></register>
  </div>
</template>

<script>
import { ViewLayout, AppLayout } from '@comp/Layout'
import register from '@comp/register/index.vue'

export default {
  name: 'App',
  // eslint-disable-next-line vue/no-unused-components
  components: { ViewLayout, AppLayout, register },
  created () {
    
  }
}
</script>

<style>

</style>
