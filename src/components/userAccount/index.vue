<template>
  <yd-flexbox class='app-text-center'>
    <yd-flexbox-item>
      <div class="navbar__item">
        <span>99999.00</span>
        <p class="tips">账户总额(￥)</p>
      </div>
    </yd-flexbox-item>
    <yd-flexbox-item>
      <div class="navbar__item">
        <span>99999.00</span>
        <p class="tips">可用余额(￥)</p>
      </div>
    </yd-flexbox-item>
    <yd-flexbox-item>
      <div class="navbar__item">
        <span>99999.00</span>
        <p class="tips">净赚收益(￥)</p>
      </div>
    </yd-flexbox-item>
    <div class="sp scale-1px left">
      <div class="navbar__item">
        <i class="arrow dy-icon-arrow-right"></i>
        <i class="dy-icon-recharge icon app-text-main"></i>
        <p class="text-main">去充值</p>
      </div>
    </div>
  </yd-flexbox>
</template>

<script>
export default {
  name: 'userAccount'
}
</script>

<style scoped>
  .navbar__item {
    position: relative;
    padding: .25rem 0;
    background-color: #fff;
  }
  .arrow {
    position: absolute;
    top: 50%;
    left: -8px;
    color: #eee;
    margin-top: -8px;
    background-color: #fff;
    font-size: .45rem;
  }
  .arrow:after {
    position: absolute;
    top: 5px;
    left: 8px;
    content: "";
    z-index: 10;
    width: 1px;
    height: 7px;
    background-color: #fff;
  }
  .tips {
    margin-top: .1rem;
    font-size: .225rem;
    color: #999;
  }
  .text-main {
    font-size: .225rem;
    color: #ef4f4f;
  }
  .sp {
    width: 80px;
  }
  .icon {
    font-size: .4rem;
  }
</style>