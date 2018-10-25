<template>
  <div class="ui grid segment">
    <div class="ui four wide column">
      <h2>Live-Code</h2>
    </div> 
    <div class="ui eight wide column form">
      <input type="text" placeholder="Search Video.." v-model="query">
    </div>
    <div class="ui four wide column">
      <div>
        <div class="ui right floated button" @click="$emit('showLogin')" v-if="!currentUser">
        login
        </div>  
        <div class="ui right floated button" @click="$emit('showRegist')" v-if="!currentUser">
        register
        </div>
      </div>
      <div class="ui right floated button" @click="logout" v-if="currentUser">
        logout
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'NavBar',
  data() {
    return {
      query: ''
    }
  },
  watch: {
    query() {
      this.$emit('queryPayload', this.query)
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    ...mapActions(['resetUser']),
    logout() {
      localStorage.removeItem('token')
      this.resetUser()
    }
  }
}
</script>

<style>

</style>
