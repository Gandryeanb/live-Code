<template>
  <div id="app">
    <NavBar @showRegist="viewRegister" @showLogin="viewLogin" @queryPayload="changeQuery($event)"/>
    <FromRegister v-if="showRegister && !currentUser" @resetView="viewReset" @viewLogin="viewLogin"/>
    <FormLogin v-if="showLogin && !currentUser" @resetView="viewReset" @getUser="getUser"/>
    <router-view :query="query"/>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState, mapActions } from 'vuex'
import config from '@/assets/config'
import NavBar from '@/components/NavBar'
import FromRegister from '@/components/FromRegister'
import FormLogin from '@/components/FormLogin'

const { host } = config

export default {
  name: 'App',
  data() {
    return {
      showLogin: false,
      showRegister: false,
      query: ''
    }
  },
  created() {
    let token = localStorage.getItem('token')

    if (token) {
      this.getUser()
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  watch: {
    currentUser: {
      handler() {
        if (!this.currentUser) {
          this.showLogin = false
          this.showRegister = false
        }
      },
      deep: true
    }
  },
  methods: {
    ...mapActions(['getUser']),
    changeQuery(q) {
      this.query = q
    },
    viewReset() {
      this.showLogin = false
      this.showRegister = false
    },
    viewRegister() {
      this.showLogin = false
      this.showRegister = true
    },
    viewLogin() {
      console.log('masuk')
      this.showLogin = true
      this.showRegister = false
    }
  },
  components: {
    NavBar,
    FromRegister,
    FormLogin
  }
}
</script>

<style>
</style>
