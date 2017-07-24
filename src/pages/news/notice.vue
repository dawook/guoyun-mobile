<template>
  <div class="m-home m-home--fixed">
    <yd-navbar title='详情' class='fixed'>
      <yd-navbar-back-icon v-back slot="left"></yd-navbar-back-icon>
    </yd-navbar>
    <yd-list theme="4" class="without-img article__title" slot='list'>
      <yd-list-item>
        <span slot="title">{{articleList.name}}</span>
        <yd-list-other slot="other">
          <div>
            <yd-badge type="hollow">{{articleList.type_name}}</yd-badge>
          </div>
          <div v-text='articleList.apptime'></div>
         </yd-list-other>
      </yd-list-item>
    </yd-list>

    <div class="article__content scale-1px top" v-html='articleList.contents'></div>
  </div>
</template>

<script>
export default {
  name: 'Notice',
  data() {
    return {
      articleId: 0,
      articleList: {}
    }
  },
  watch: {
    articleId: 'load'
  },
  methods: {
    load() {
      this.$http.get(`${this.HOST}/api.php?action=activityinfo`, {
        params: {
          id: this.articleId
        }
      }).then(response => {
        this.articleList = response.data.data;
        console.log(response.data.data)
      })
    }
  },
  created() {
    this.articleId = this.$route.params.id;
  }
}
</script>

<style scoped>
  .article__title {
    margin-top: .35rem;
    padding-top: .25rem;
    background-color: #fff;
  }
  .article__content {
    padding: .25rem .25rem 1rem;
    line-height: 2;
    background-color: #fff;
  }


</style>