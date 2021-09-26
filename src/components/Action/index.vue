<template>
  <div class="action-container">
    <a-icon class="action-icon" type="logout" title="退出登录" v-if="needLogin"></a-icon>
    <a-icon class="action-icon" type="setting" title="设置"></a-icon>
    <a-icon class="action-icon" type="bell" title="提醒"></a-icon>
    <a-icon class="action-icon" type="user" title="用户" v-if="needLogin"></a-icon>
  </div>
</template>

<script>
export default {
  data () {
    return {
      needLogin: window.custom.needLogin
    }
  }
}
</script>

<style lang="less" scoped>
  .action-container{
    height: 100%;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    padding: 0 8px;
    .action-icon{
      font-size: 22px;
      cursor: pointer;
      display: flex;
      height: 100%;
      align-items: center;
      padding: 0 12px;
    }
    .action-icon:hover{
      background: rgba(0,0,0,.025);
    }
  }
</style>
