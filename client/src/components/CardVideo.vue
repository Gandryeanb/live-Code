<template>
  <div class="ui segment">
    <div class="ui grid">
      <div class="ui eight wide column">
        <img :src="list.snippet.thumbnails.medium.url">
      </div>
      <div class="ui eight wide column form">
        <div class="field">
          <label>Title :</label>
          {{ list.snippet.title }}
        </div>
        <div class="field"> 
          <label>By :</label>
          {{ list.snippet.channelTitle }}
        </div>
        <div class="field">
          <button class="ui fluid button" @click="redirectsTo">more details</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'CardVideo',
  methods: {
    ...mapActions(['newDetail']),
    redirectsTo() {
      this.$router.push({ path: `/${this.list.id.videoId}` })
      this.newDetail()
    }
  },
  props: ['list']
}
</script>

<style>

</style>
