<template>
  <div>
    首页
    <hello-world v-if="HelloWorld"></hello-world>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'home',
  data () {
    return {
      HelloWorld: false
    }
  },
  created () {
    Vue.component('HelloWorld', window.sharedComponent['micro-sample'].HelloWorld)
    this.HelloWorld = true
  }
}
</script>

<style lang="less" scoped>

</style>
