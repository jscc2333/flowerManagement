<template>
  <div class="tip">
    <div class="tip-operation">
      <ul class="operation-wrapper">
        <li class="operation-type" :class="{'active':select[index]}" v-for="(item,index) in operation" :key="index" @click="selectType(index)">{{item}}</li>
      </ul>
  
      <div class="operation-insert" v-show="select[0]" :key="select[0]">
        <ul>
          <li class="insert-item">
            <span class="title">贴士标题</span>
            <input type="text" class="insert text" v-model="tipTitle">
          </li>
          <li class="insert-item">
            <span class="title">贴士内容</span>
            <input type="text" class="insert text" v-model="tipText">
          </li>
        </ul>
      </div>
      <div class="operation-delete" v-show="select[1]" :key="select[1]">
        <ul>
          <li class="delete-item">
            <span class="title">贴士ID</span>
            <input type="text" class="insert text" v-model="tipID">
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue';
import split from '@/components/split/split';
export default {
  data() {
    return {
      tipID: 0,
      tipTitle: '',
      tipText: '',
      select: [true, false, false],
      operation: ['添加贴士', '删除贴士']
    };
  },
  components: {
    split: split
  },
  methods: {
    selectType(index) {
      for (let i = 0; i < this.select.length; i++) {
        this.select[i] = false;
      }
      Vue.set(this.select, index, true);
    }
  }
};
</script>
<style lang="less">
.tip {
  position: absolute;
  top: 42px;
  left: 0;
  right: 0;
  .tip-operation {
    .operation-wrapper {
      display: flex;
      padding: 10px;
      .operation-type {
        flex: 1;
        height: 20px;
        line-height: 20px;
        text-align: center;
        border-radius: 10px;
        background: #f3f5f7;
        font-size: 14px;
        &.active {
          color: #fff;
          background: rgb(0, 160, 220);
        }
        &:hover {
          transform: scale(1.2);
        }
      }
    }
  }
}
</style>
