<template>
  <div class="m-home m-home--fixed">
    <yd-navbar title='商学院' class='fixed'>
      <yd-navbar-back-icon v-back slot="left"></yd-navbar-back-icon>
    </yd-navbar>

    <div class="school__banner">
    	<img :src="img">
    </div>
    
    <v-loading v-if='isLoad'></v-loading>
    <school-list
      title="商学院"
      subTitle="尊贵服务，即刻开启"
      icon='school'
      :datas='listData'
      v-if='!isLoad'></school-list>
  </div>
</template>

<script>
import schoolList from '@/components/schoolList'
import vLoading from '@/components/loading'

export default {
  name: 'projectPage',
  components: {
    schoolList,
    vLoading
  },
  data() {
    return {
      isLoad: true,
    	img: require('@/assets/images/school_banner.jpg'),
      listData: []
    }
  },
  methods: {
    load() {
      this.$http.get(`${this.HOST}/api.php?action=school`).then(response => {
      	this.listData = response.data.data.list;
        this.isLoad = false;
      })
    }
  },

  mounted() {
    this.load();
  }
}
</script>

<style scoped>
	.school__banner {
		margin: .25rem auto;
		width: 96%;
		border-radius: 6px;
		overflow: hidden;
	}
	.school__banner img {
		width: 100%;
	}
  .dont-tips {
    position: relative;
    padding: .15rem 0;
    display: inline-block;
    width: 100%;
    font-size: .125rem;
    color: #ccc;
    text-align: center;
  }
  .dont-tips:before,
  .dont-tips:after {
    position: absolute;
    z-index: -1;
    content: "";
    top: 50%;
    width: 35%;
    height: 1px;
    background-color: #eee;
  }
  .dont-tips:before {
    left: .125rem;
  }
  .dont-tips:after {
    right: .125rem;
  }

  .loading {
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -32px;
    margin-left: -32px;
  }
</style>