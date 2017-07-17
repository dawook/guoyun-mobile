<template>
  <footer class='footer scale-1px top'>
    <div class="footer__main">
      <div class="footer__nav">
        <router-link to='/register'>注册</router-link>
        <router-link to='/login'>登录</router-link>
        <router-link to='/mobile'>客户端</router-link>
        <router-link to='/help'>帮助</router-link>
        <router-link to='/feedback'>反馈</router-link>
      </div>
      <p class="copyright">
        Copyright &copy; 国运产权 www.ahgycq.com
      </p>
    </div>

    <div class="footer__download">
      <yd-flexbox>
        <div class='logo'>
          <img :src="logoImg" alt="">
        </div>
        <yd-flexbox-item>
          <b>安装国运产权客户端</b>
          <p class="tips">随时随地购买</p>
        </yd-flexbox-item>
        <yd-button type="danger" @click.native='download'>立即下载</yd-button>
      </yd-flexbox>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'vFooter',
  data() {
    return {
      logoImg: require('@/assets/images/ICON.png'),
      android: '//www.ahgycq.com/app/gycq_v1.0.0.apk',
      iOS: 'https://itunes.apple.com/cn/app/guo-yun-chan-quan/id1182664734?l=zh&ls=1&mt=8'
    }
  },
  methods: {
    download() {
      var u = navigator.userAgent;
      //android终端
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
      //ios终端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

      if (isAndroid) {
        window.open(this.android);
      } else if (isiOS) {
        window.open(this.iOS)
      }
    }
  }
}
</script>

<style scoped>
  .footer {
    margin-top: .2rem;
    width: 100%;
    background-color: #fff;
  }
  .footer__main {
    padding: .25rem;
    font-size: .2rem;
    color: #999;
    text-align: center;
  }
  .footer__nav {
    display: flex;
    font-size: .2rem;
    color: #999;
  }
  .footer__nav a {
    display: inline-block;
    flex: 1;
  }
  .copyright {
    margin: .35rem 0 .1rem;
    color: #ccc;
  }
  .footer__download {
    padding: 0 .25rem;
    width: 100%;
    height: 1.2rem;
    background-color: #eee;
  }
  .footer__download .logo {
    margin-top: .1rem;
    margin-right: .2rem;
    width: 1rem;
    height: 1rem;
    overflow: hidden;
    border-radius: 5px;
  }
  .footer__download .logo img {
    width: 100%;
  }
  .footer__download .tips {
    margin-top: 3px;
    color: #999;
  }
</style>