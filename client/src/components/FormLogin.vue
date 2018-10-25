<template>
  <div class="ui grid" >
    <div style="position: fixed; top:1; right:0; z-index:1;">
       <a href="#" @click="$emit('resetView')">
         <i class=" small close icon"></i>
        </a> 
      <div class="ui three wide column">
        <div class="ui segment form">
          <div class="ui dividing header">
            <h2>Login</h2>
          </div>
          <div class="field">
            <label>Email :</label>
            <input type="text" placeholder="Email" v-model="formEmail">
          </div>
          <div class="field">
            <label>Password :</label>
            <input type="password" placeholder="Password" v-model="formPassword">
          </div>
          <div class="field">
            <button class="ui fluid button" @click="login">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import config from '@/assets/config'

const { host } = config

export default {
  name: 'FormRegister',
  data() {
    return {
      formEmail: '',
      formPassword: ''
    }
  },
  methods: {
    login() {
      axios({
        url: host + '/users/login',
        method: 'post',
        data: {
          email: this.formEmail,
          password: this.formPassword
        }
      })
        .then(data => {
          localStorage.setItem('token', data.data.token)
          this.$emit('getUser')
          this.$emit('resetView')
        })
        .catch(err => {
          console.log(err.response.data.message)
        })
    }
  }
}
</script>

<style>

</style>
