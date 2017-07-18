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
          <router-link :to="'/notice/' + item.id">
            <span v-text='item.name'></span>
          </router-link>
        </yd-rollnotice-item>
      </yd-rollnotice>
    </div>

    <home-nav></home-nav>
    
    <!-- 商学院 -->
    <school-list title="商学院" subTitle="尊贵服务，即刻开启" icon='school' :datas="schoolData" link='/school'></school-list>
    
    <!-- 光伏项目 -->
    <v-list title="光伏惠民" subTitle="千村万户，光伏扶贫" icon='pvp' :datas="pvpData" link='/pvp'></v-list>

    <!-- 影视文化 -->
    <v-list title="影视文化" icon='film' :datas="filmData" link='/film'></v-list>

    <!-- PPP项目 -->
    <v-list title="PPP项目" icon='fields' :datas="pppData" link='/ppp'></v-list>

    <!-- 不良资产 -->
    <v-list title="不良资产" icon='money-house' :datas="houseData" link='/house'></v-list>

    <v-footer></v-footer>
  </div>
</template>

<script>
import homeHeader from '@/components/homeHeader'
import Carousel from '@/components/carousel'
import homeNav from '@/components/homeNav'
import vFooter from '@/components/footer'
import schoolList from '@/components/schoolList'
import vList from '@/components/projectList'

export default {
  name: 'home',
  components: {
    homeHeader,
    Carousel,
    homeNav,
    vFooter,
    schoolList,
    vList
  },
  data() {
    return {
      noticeList: [],
      schoolData: [],
      pvpData: [],
      filmData: [],
      pppData: [],
      houseData: []
    }
  },
  methods: {

    handleGetNotice() {
      this.$http.get(`${this.HOST}/api.php?action=activity`,{
        params: {
          "type": "1",
          "hot": "1"
        }
      }).then(response => {
        this.noticeList = response.data.data.list;
      })
    },
    handleGetSchool() {
      this.$http.get(`${this.HOST}/api.php?action=school`).then(response => {
        let temp = response.data.data.list
        this.schoolData = temp.filter(item => {
          return item.level > 3
        })
      })
    },
    handleGetHouse() {
      this.$http.get(`${this.HOST}/api.php?action=invest`, {
        params: {
          "type": "1"
        }
      }).then(response => {
        this.houseData = response.data.data.list.slice(0,2)
      })
    },
    handleGetPPP() {
      this.$http.get(`${this.HOST}/api.php?action=invest`, {
        params: {
          "type": "2"
        }
      }).then(response => {
        this.pppData = response.data.data.list.slice(0,2)
      })
    },
    handleGetFilm() {
      this.$http.get(`${this.HOST}/api.php?action=invest`, {
        params: {
          "type": "3"
        }
      }).then(response => {
        this.filmData = response.data.data.list.slice(0,2)
      })
    },
    handleGetPVP() {
      this.$http.get(`${this.HOST}/api.php?action=invest`, {
        params: {
          "type": "4"
        }
      }).then(response => {
        this.pvpData = response.data.data.list.slice(0,2)
      })
    },
    handleGetInvest() {
      this.handleGetPVP();
      this.handleGetHouse();
      this.handleGetFilm();
      this.handleGetPPP();
    }
  },
  created() {
    this.handleGetNotice();
    this.handleGetSchool();
    this.handleGetInvest();
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