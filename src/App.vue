<template>
  <div id="app">
    <div class="tab">
      <div class="tab-item">
        <router-link to="/flower">鲜花管理</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/tip">贴士管理</router-link>
      </div>
    </div>
    <transition name="slide" mode="out-in">
      <router-view>
  
      </router-view>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
export default {

};
</script>

<style lang="less">
#app {
  @tab-height: 40px;
  .tab {
    display: flex;
    width: 100%;
    height: @tab-height;
    line-height: @tab-height;
    border: 1px solid rgba(7, 17, 27, 0.1);
    .tab-item {
      flex: 1;
      text-align: center;
      >a {
        display: block;
        font-size: 15px;
        color: rgb(77, 85, 93);
        &:hover {
          color: rgb(240, 20, 20);
        }
      }
    }
  }
  .slide-enter{
    transform: translate(100%);
  }
  .slide-leave-active {
    transform: translateX(-100%);
  }
  .slide-enter-active,
  .slide-leave-active {
    transition: all .3s linear;
  }
}
</style>
