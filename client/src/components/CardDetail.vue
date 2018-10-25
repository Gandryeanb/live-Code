<template>
  <div class="ui segment form">
    <img :src="data.thumbnails.high.url" width="100%" >
    <div class="field">
      <label>Title :</label>
      {{ data.title }}
    </div>
    <div class="field">
      <label>By :</label>
      {{ data.channelTitle }}
    </div>
    <div class="two fields" v-if="currentUser">
      <div class="field">
        <button class="ui fluid mini button" @click="pushLike" :class="{disabled : currentUser.like.indexOf(id) !== -1}">Likes</button>
      </div>
      <div class="field">
        <button class="ui fluid mini button" @click="pullLike" :class="{disabled : currentUser.dislike.indexOf(id) !== -1}">Dislikes</button>
      </div>
    </div>
    <div class="field">
      <label>Description :</label>
      {{ data.description }}
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState, mapActions } from 'vuex'
import config from '@/assets/config'

const { APIKEY, host } = config

export default {
  name: 'CardDetail',
  data() {
    return {
      data: null,
      id: null
    }
  },
  computed: {
    ...mapState(['currentUser', 'getDetail'])
  },
  watch: {
    getDetail() {
      if (this.getDetail) {
        this.getDetailData()
      }
    },
    currentUser() {
      if (!this.currentUser) {
        this.$router.push({ path: '/' })
      }
    }
  },
  created() {
    this.getDetailData()
  },
  methods: {
    ...mapActions(['getUser']),
    getDetailData() {
      let Id = this.$router.history.current.params.id
      this.id = Id
      axios({
        url: `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${Id}&key=${APIKEY}`
      })
        .then(data => {
          this.data = data.data.items[0].snippet
        })
        .catch(err => {
          console.log(err.message)
        })
    },
    pushLike() {
      axios({
        url: host + '/users/like/' + this.id,
        method: 'put',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(data => {
          this.getUser()
        })
        .catch(err => {
          console.log(err.message)
        })
    },
    pullLike() {
      axios({
        url: host + '/users/dislike/' + this.id,
        method: 'put',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(data => {
          this.getUser()
        })
        .catch(err => {
          console.log(err.response)
        })
    }
  }
}
</script>

<style>

</style>
