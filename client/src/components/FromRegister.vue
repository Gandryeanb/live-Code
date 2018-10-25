<template>
  <div class="ui grid" >
    <div style="position: fixed; top:1; right:0; z-index:1;">
       <a href="#" @click="$emit('resetView')">
         <i class=" small close icon"></i>
        </a> 
      <div class="ui three wide column">
        <div class="ui segment form">
          <div class="ui dividing header">
            <h2>Register</h2>
          </div>
          <div class="field">
            <label>Name :</label>
            <input type="text" placeholder="Name" v-model="formName">
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
            <button class="ui fluid button" @click="register">Submit</button>
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
      formName: '',
      formEmail: '',
      formPassword: ''
    }
  },
  methods: {
    register() {
      axios({
        url: host + '/users/register',
        method: 'post',
        data: {
          name: this.formName,
          email: this.formEmail,
          password: this.formPassword
        }
      })
        .then(data => {
          console.log(data.data)
          this.$emit('viewLogin')
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
