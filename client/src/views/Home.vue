<template>
  <div>
    <div class="ui container centered grid">
      <div class="ui ten wide column">
        <button class="ui button" @click="myLikeList" v-if="currentUser">My Like List</button>
        <CardVideo v-for="(list, index) in listVideo" :key="index" :list="list"/>
      </div>
      <div class="ui six wide column">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import CardVideo from '@/components/CardVideo'
import config from '@/assets/config'

const { APIKEY } = config

export default {
  name: 'home',
  props: ['query'],
  data() {
    return {
      listVideo: []
    }
  },
  created() {
    this.getVideo()
  },
  computed: {
    ...mapState(['currentUser'])
  },
  watch: {
    currentUser() {
      if (!this.currentUser) {
        this.getVideo()
      }
    },
    query() {
      if (this.query !== '') {
        this.getByQ(this.query)
      } else {
        this.getVideo()
      }
    }
  },
  methods: {
    myLikeList() {
      axios({
        url: `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${this.currentUser.like.join(
          ','
        )}&key=${APIKEY}`
      })
        .then(data => {
          this.listVideo = data.data.items
        })
        .catch(err => {
          console.log(err.message)
        })
    },
    getByQ(q) {
      axios({
        url: `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${q}&key=${APIKEY}`
      })
        .then(data => {
          this.listVideo = data.data.items
        })
        .catch(err => {
          console.log(err.message)
        })
    },
    getVideo() {
      axios({
        url: `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${APIKEY}`
      })
        .then(data => {
          this.listVideo = data.data.items
        })
        .catch(err => {
          console.log(err.message)
        })
    }
  },
  components: {
    CardVideo
  }
}
</script>

<style>

</style>
