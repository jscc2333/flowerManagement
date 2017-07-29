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
          <li class="insert-item">
            <span class="title">图片路径</span>
            <input type="text" class="insert text" v-model="tipImg"></input>
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
      <div class="tip-wrapper" v-show="!select[0]">
        <ul>
          <li class="tip-item" v-for="(tip,tipIndex) in tipList" :key="tipIndex" @click="selectTip(tipIndex)">
            <div class="content-wrapper">
              <div class="img-wrapper">
                <img :src="tip.imgsrc" alt="" width="80" height="80">
              </div>
              <div class="detail-wrapper">
                <span class="tip-id detail">贴士ID {{tip.tipID}}</span>
                <span class="tip-name detail">贴士标题 {{tip.title}}</span>
              </div>
            </div>
            <P class="tip-desc">贴士内容 {{tip.text}}</P>
            <split v-show="tipIndex < tipList.length-1"></split>
          </li>
        </ul>
      </div>
      <div class="scroll-top" @click="scrollTop" v-show="!select[0]">顶部</div>
      <div class="operation-submit">
        <transition name="fade">
          <span class="response" v-show="status !== -1">{{responseMsg}}</span>
        </transition>
        <span class="confirm" @click="submit">
          提交
        </span>
        <span class="cancel" @click="cancel">
          取消
        </span>
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
      status: -1,
      tipID: 0,
      tipTitle: '',
      tipText: '',
      tipImg: '',
      tipList: [],
      select: [true, false, false],
      operation: ['添加贴士', '删除贴士']
    };
  },
  components: {
    split: split
  },
  computed: {
    responseMsg() {
      if (this.status === 1) {
        return '更新成功';
      } else if (this.status === 0) {
        return '更新失败';
      } else {
        return '';
      }
    }
  },
  methods: {
    selectType(index) {
      for (let i = 0; i < this.select.length; i++) {
        this.select[i] = false;
      }
      Vue.set(this.select, index, true);
      if (index !== 0) {
        this.$http.get('/api/TipManageServlet').then((res) => {
          this.tipList = res.body;
        });
      }
    },
    selectTip(index) {
      let tip = this.tipList[index];
      this.tipID = tip.tipID;
    },
    scrollTop() {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
    submit() {
      let statusNo;
      for (let i = 0; i < this.select.length; i++) {
        if (this.select[i] === true) {
          statusNo = i;
        }
      }
      if (statusNo === 0) {
        if (this.tipTitle === '' || this.tipText === '' || this.tipImg === '') {
          return;
        }
      } else {
        if (this.tipID === 0) {
          return;
        }
      }
      let data = {
        statusNo: statusNo,
        tipID: this.tipID,
        title: this.tipTitle,
        text: this.tipText,
        imgsrc: this.imgsrc
      };
      this.$http.post('/api/TipManageServlet', data).then((res) => {
        this.status = res.body.status_no;
        if (this.status === 1) {
          this.cancel();
        }
        setTimeout(() => {
          this.status = -1;
        }, 2000);
        this.$http.get('/api/TipManageServlet').then((res) => {
          this.tipList = res.body;
        });
      });
    },
    cancel() {
      this.tipID = 0;
      this.tipTitle = '';
      this.tipText = '';
      this.tipImg = '';
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
    .operation-insert,
    .operation-delete {
      padding: 10px;
      .insert-item,
      .update-item,
      .delete-item {
        padding: 5px 10px;
        margin: 10px 0;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        text-align: center;
        &:last-child {
          border: none;
        }
        .text,
        .title {
          display: inline-block;
          font-size: 12px;
          height: 18px;
          line-height: 18px;
        }
        .title {
          width: 48px;
          text-align: center;
        }
        .text {
          padding: 0 5px;
          border-radius: 5px;
          background: #f3f5f7;
        }
      }
    }
    .tip-wrapper {
      padding: 10px;
      margin: 0 10px;
      border: 1px solid rgba(7, 17, 27, 0.3);
      border-radius: 10px;
      .tip-item {
        position: relative;
        margin: 10px 0;
        .content-wrapper {
          display: flex;
          width: 100%;
          .img-wrapper {
            flex: 0 80px;
            img {
              border-radius: 15px;
            }
          }
          .detail-wrapper {
            flex: 1;
            margin-left: 12px;
            .detail {
              display: inline-block;
              margin-right: 5px;
              margin-bottom: 10px;
              font-size: 14px;
              color: rgba(7, 17, 27, 0.6)
            }
          }
        }
        .tip-desc {
          margin: 10px 0;
          line-height: 24px;
          font-size: 12px;
        }
      }
    }
  }
  .scroll-top {
    position: fixed;
    bottom: 40px;
    right: 10px;
    padding: 15px 10px;
    border-radius: 50%;
    background: rgba(0, 160, 220, 0.5);
    color: #fff;
  }
  .operation-submit {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    text-align: center;
    .response {
      display: block;
      margin-bottom: 10px;
      font-size: 12px;
      color: rgba(7, 17, 27, 0.6);
      &.fade-enter,
      &.fade-leave-active {
        opacity: 0;
      }
      &.fade-enter-active,
      &.fade-leave-active {
        transition: all .5s ease;
      }
    }
    .confirm,
    .cancel {
      display: inline-block;
      padding: 5px 10px;
      border-radius: 10px;
      background: #f3f5f7;
    }
  }
}
</style>
