<template>
  <div class="flower">
    <div class="flower-operation">
      <ul class="operation-wrapper">
        <li class="operation-type" :class="{'active':select[index]}" v-for="(item,index) in operation" :key="index" @click="selectType(index)">{{item}}</li>
      </ul>
      <!-- <transition-group name="slide" mode="out-in"> -->
      <div class="operation-insert" v-show="select[0]" :key="select[0]">
        <ul>
          <li class="insert-item">
            <span class="title">鲜花名</span>
            <input type="text" class="insert text" v-model="flowerName">
          </li>
          <li class="insert-item">
            <span class="title">所属类别</span>
            <input type="text" class="insert text" v-model="categoryID">
          </li>
          <li class="insert-item">
            <span class="title">鲜花描述</span>
            <input type="text" class="insert text" v-model="flowerDesc">
          </li>
          <li class="insert-item">
            <span class="title">图片路径</span>
            <input type="text" class="insert text" v-model="flowerImg">
          </li>
          <li class="insert-item">
            <span class="title">鲜花总数</span>
            <input type="text" class="insert text" v-model="flowerTotal">
          </li>
          <li class="insert-item">
            <span class="title">鲜花价格</span>
            <input type="text" class="insert text" v-model="flowerPrice">
          </li>
        </ul>
      </div>
      <div class="operation-update" v-show="select[1]" :key="select[1]">
        <ul>
          <li class="update-item">
            <span class="title">鲜花ID</span>
            <input type="text" class="update text" v-model="flowerID">
          </li>
          <li class="update-item">
            <span class="title">鲜花名</span>
            <input type="text" class="update text" v-model="flowerName">
          </li>
          <li class="update-item">
            <span class="title">所属类别</span>
            <input type="text" class="update text" v-model="categoryID">
          </li>
          <li class="update-item">
            <span class="title">鲜花描述</span>
            <input type="text" class="update text" v-model="flowerDesc">
          </li>
          <li class="update-item">
            <span class="title">图片路径</span>
            <input type="text" class="update text" v-model="flowerImg">
          </li>
          <li class="update-item">
            <span class="title">鲜花总数</span>
            <input type="text" class="update text" v-model="flowerTotal">
          </li>
          <li class="update-item">
            <span class="title">鲜花价格</span>
            <input type="text" class="update text" v-model="flowerPrice">
          </li>
        </ul>
      </div>
      <div class="operation-delete" v-show="select[2]" :key="select[2]">
        <ul>
          <li class="delete-item">
            <span class="title">鲜花ID</span>
            <input type="text" class="delete text" v-model="flowerID">
          </li>
        </ul>
      </div>
      <!-- </transition-group> -->
      <div class="flower-wrapper" v-show="!select[0]">
        <ul>
          <li class="flower-item" v-for="(flower,flowerIndex) in flowerList" :key="flowerIndex" @click="selectFlower(flowerIndex)">
            <div class="content-wrapper">
              <div class="img-wrapper">
                <img :src="flower.flowerImg" alt="" width="80" height="80">
              </div>
              <div class="detail-wrapper">
                <span class="flower-id detail">鲜花ID {{flower.flowerID}}</span>
                <span class="flower-name detail">花名 {{flower.flowerName}}</span>
                <span class="flower-category detail">鲜花类别 {{flower.category.categoryID}}</span>
                <span class="flower-total detail">鲜花总数 {{flower.flowerTotal}}</span>
                <span class="flower-price detail">鲜花价格 {{flower.flowerPrice}}</span>
              </div>
            </div>
            <P class="flower-desc">鲜花描述 {{flower.flowerDesc}}</P>
            <split v-show="flowerIndex<flowerList.length-1"></split>
          </li>
        </ul>
      </div>
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
</template>

 <script type="text/ecmascript-6">
import Vue from 'vue';
import split from '@/components/split/split';
export default {
  data() {
    return {
      status: -1,
      flowerID: 0,
      categoryID: 0,
      flowerName: '',
      flowerDesc: '',
      flowerImg: '',
      flowerTotal: 0,
      flowerPrice: 0,
      flowerList: [],
      select: [true, false, false],
      operation: ['添加鲜花', '更新鲜花', '删除鲜花']
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
        this.$http.get('/api/FlowerManageServlet').then((res) => {
          this.flowerList = res.body;
        });
      }
    },
    submit() {
      let statusNo;
      for (let i = 0; i < this.select.length; i++) {
        if (this.select[i] === true) {
          statusNo = i;
        }
      }
      if (statusNo === 0) {
        if (this.flowerName === '' || this.categoryID === 0 || this.flowerPrice === 0 || this.flowerTotal === 0) {
          console.log('need to be inputed');
          return;
        }
      } else if (statusNo === 1) {
        if (this.flowerID === 0 || this.flowerName === '' || this.categoryID === 0 || this.flowerPrice === 0 || this.flowerTotal === 0) {
          console.log('need to be inputed');
          return;
        }
      } else {
        if (this.flowerID === 0) {
          console.log('need to be inputed');
          return;
        }
      }
      let data = {
        statusNo: statusNo,
        flowerID: this.flowerID,
        categoryID: this.categoryID,
        flowerName: this.flowerName,
        flowerDesc: this.flowerDesc,
        flowerImg: this.flowerImg,
        flowerTotal: this.flowerTotal,
        flowerPrice: this.flowerPrice
      };
      this.$http.post('/api/FlowerManageServlet', data).then((res) => {
        this.status = res.body.status_no;
        if (this.status === 1) {
          this.cancel();
        }
        setTimeout(() => {
          this.status = -1;
        }, 2000);
        this.$http.get('/api/FlowerManageServlet').then((res) => {
          this.flowerList = res.body;
        });
      }, (res) => {

      });
    },
    selectFlower(index) {
      let flower = this.flowerList[index];
      this.flowerID = flower.flowerID;
      this.flowerImg = flower.flowerID;
      this.flowerName = flower.flowerName;
      this.flowerTotal = flower.flowerTotal;
      this.flowerPrice = flower.flowerPrice;
      this.flowerDesc = flower.flowerDesc;
      this.categoryID = flower.category.categoryID;
    },
    scrollTop() {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
    cancel() {
      this.flowerID = 0;
      this.flowerImg = '';
      this.flowerName = '';
      this.flowerTotal = 0;
      this.flowerPrice = 0;
      this.flowerDesc = '';
      this.categoryID = 0;
    }
  }
};
</script>

<style lang="less">
.flower {
  position: absolute;
  top: 42px;
  left: 0;
  right: 0;
  .flower-operation {
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
    .operation-update,
    .operation-delete {
      padding: 10px; // &.slide-enter{
      //   transform:translateY(100%);
      // }
      // &.slide-leave-active {
      //   transform: translateX(-100%);
      // }
      // &.slide-enter-active,
      // &.slide-leave-active {
      //   transition: all .5s linear;
      // }
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
    .flower-wrapper {
      padding: 10px;
      margin: 0 10px;
      border: 1px solid rgba(7, 17, 27, 0.3);
      border-radius: 10px;
      .flower-item {
        position: relative;
        margin: 10px 0;
        .content-wrapper {
          display: flex;
          width: 100%;
          .img-wrapper {
            flex: 0 80px;
            img {
              border-radius: 10px;
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
        .flower-desc {
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
