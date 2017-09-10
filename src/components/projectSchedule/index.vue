<template>
  <div class="schedule">
    <p class="title">项目进度</p>
    <yd-flexbox :class='["wrap", `status--${data.caseflownum}`]'>
      <yd-flexbox-item
        class='item'
        v-for='(item, index) in list'
        :key = 'index'>
        <p class="tips" v-text='item'></p>
        <div class="line"></div>
      </yd-flexbox-item>
    </yd-flexbox>
  </div>
</template>

<script>
export default {
  name: 'projectSchedule',
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      tipsList: [
        ['资产锁定', '办理交接', '对外出售', '办理按揭', '项目结束'],
        ['勘探测绘', '中标签约', '土地整理', '国土验收', '挂牌交易'],
        ['前期筹备', '开机拍摄', '影片制作', '宣传推广', '放映营收'],
        ['认筹', '给保证金', '农户贷款', '审核放款', '设备安装', '项目回款']
      ],
      list: []
    }
  },
  methods: {
    setSchedule() {
      this.list = this.tipsList[this.data.type - 1]
    }
  },
  created() {
    this.setSchedule();
  }
}
</script>

<style scoped>
  .schedule {
    padding: .25rem;
    width: 100%;
    background-color: #fff;
  }
  .title {
    padding-bottom: .25rem;
    color: #3399d5;
    font-size: .3rem;
  }
  .wrap {
    padding-bottom: .25rem;
    width: 100%;
    text-align: center;
  }
  .item {
    position: relative;
  }
  .tips {
    color: #999;
    font-size: .2rem;
  }
  .line {
    position: relative;
    margin-top: 15px;
    width: 100%;
    height: 1px;
    background-color: #ccc;
  }
  .line:before {
    position: absolute;
    content: "";
    top: -1px;
    right: 50%;
    bottom: -1px;
    left: 0;
    background-color: #3399d5;
    display: none;
  }
  .line:after {
    position: absolute;
    top: -2px;
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #fff;
    border: 1px solid #3399d5;
    display: none;
  }
  .status--0 .item:nth-child(1) .line:before,
  .status--0 .item:nth-child(1) .line:after,

  .status--1 .item:nth-child(1) .line:before,
  .status--1 .item:nth-child(2) .line:before,
  .status--1 .item:nth-child(2) .line:after,

  .status--2 .item:nth-child(1) .line:before,
  .status--2 .item:nth-child(2) .line:before,
  .status--2 .item:nth-child(3) .line:before,
  .status--2 .item:nth-child(3) .line:after,

  .status--3 .item:nth-child(1) .line:before,
  .status--3 .item:nth-child(2) .line:before,
  .status--3 .item:nth-child(3) .line:before,
  .status--3 .item:nth-child(4) .line:before,
  .status--3 .item:nth-child(4) .line:after,

  .status--4 .item:nth-child(1) .line:before,
  .status--4 .item:nth-child(2) .line:before,
  .status--4 .item:nth-child(3) .line:before,
  .status--4 .item:nth-child(4) .line:before,
  .status--4 .item:nth-child(5) .line:before,
  .status--4 .item:nth-child(5) .line:after,

  .status--5 .item:nth-child(1) .line:before,
  .status--5 .item:nth-child(2) .line:before,
  .status--5 .item:nth-child(3) .line:before,
  .status--5 .item:nth-child(4) .line:before,
  .status--5 .item:nth-child(5) .line:before,
  .status--5 .item:nth-child(6) .line:before,
  .status--5 .item:nth-child(6) .line:after {
    display: block;
  }

  .status--1 .item:nth-child(1) .line:before,

  .status--2 .item:nth-child(1) .line:before,
  .status--2 .item:nth-child(2) .line:before,

  .status--3 .item:nth-child(1) .line:before,
  .status--3 .item:nth-child(2) .line:before,
  .status--3 .item:nth-child(3) .line:before,

  .status--4 .item:nth-child(1) .line:before,
  .status--4 .item:nth-child(2) .line:before,
  .status--4 .item:nth-child(3) .line:before,
  .status--4 .item:nth-child(4) .line:before,

  .status--5 .item:nth-child(1) .line:before,
  .status--5 .item:nth-child(2) .line:before,
  .status--5 .item:nth-child(3) .line:before,
  .status--5 .item:nth-child(4) .line:before,
  .status--5 .item:nth-child(5) .line:before {
    right: 0;
  }

  .status--0 .item:nth-child(1) .line:after,
  .status--1 .item:nth-child(2) .line:after,
  .status--2 .item:nth-child(3) .line:after,
  .status--3 .item:nth-child(4) .line:after,
  .status--4 .item:nth-child(5) .line:after,
  .status--5 .item:nth-child(6) .line:after {
    left: 50%;
  }

  .status--4 .item:nth-child(5) .line:before,
  .status--5 .item:nth-child(6) .line:before {
    right: 0;
  }
</style>