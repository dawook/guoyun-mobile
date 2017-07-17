<template>
  <div class="m-home">
    <home-header></home-header>
    <carousel></carousel>

    <div class="notice-slider">
      <i class="dy-icon-notice notice-slider__icon"></i>
      <yd-rollnotice autoplay="5000" height='36'>
        <yd-rollnotice-item
          v-for='(item, index) in noticeList'
          :key='index'>
          <span v-text='item.name' @click='noticeRedirect(item.id)'></span>
        </yd-rollnotice-item>
      </yd-rollnotice>
    </div>

    <home-nav></home-nav>

    <v-footer></v-footer>
  </div>
</template>

<script>
import homeHeader from '@/components/homeHeader'
import Carousel from '@/components/carousel'
import homeNav from '@/components/homeNav'
import vFooter from '@/components/footer'

export default {
  name: 'home',
  components: {
    homeHeader,
    Carousel,
    homeNav,
    vFooter
  },
  data() {
    return {
      noticeList: []
    }
  },
  methods: {
    noticeRedirect(id) {
      this.$router.push({ path: 'notice', query: { noticeId: id }})
    },

    handleGetNotice() {
      this.$http.get(`${this.HOST}/api.php?action=activity`,{
        params: {
          "type": "1",
          "hot": "1"
        }
      }).then(response => {
        this.noticeList = response.data.data.list;
      })
    }
  },
  created() {
    this.handleGetNotice();
  }
}
</script>
<style scoped>
  .notice-slider {
    position: relative;
    margin: .2rem .25rem;
    padding-left: 30px;
    background-color: #fff;
    border-radius: 3px;
    overflow: hidden;
    color: #666;
  }
  .notice-slider__icon {
    position: absolute;
    top: 9px;
    left: 5px;
    font-size: .36rem;
    color: #f00;
  }
</style>