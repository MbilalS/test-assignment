<template>
  <div class="login">
    <h3>Login</h3>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
            <el-form-item prop="email" label="Email">
              <el-input v-model="ruleForm.email">
                <i slot="prefix" class="el-icon-message"></i>
              </el-input>
            </el-form-item>
            <el-form-item label="Password" prop="password">
              <el-input type="password" v-model="ruleForm.password" autocomplete="off">
                <i slot="prefix" class="el-icon-lock"></i>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">Login</el-button>
            </el-form-item>
            <el-alert v-if="error"
              title="error alert"
              type="error"
              description="Email or Password is wrong"
              show-icon>
            </el-alert>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'Login',
  data () {
    return {
      error: false,
      ruleForm: {
        email: '',
        password: ''
      },
      rules: {
        email: [
          { required: true, message: 'Please enter email address', trigger: 'blur' },
          { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: 'Please enter password', trigger: 'blur' },
          { min: 5, max: 15, message: 'Length should be 5 to 15', trigger: 'blur' }
        ]
      }
    }
  },
  mounted: function () {
  },
  methods: {
    submitForm (formName) {
      this.success = false
      this.error = false
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post('https://reqres.in/api/login',
            { email: this.ruleForm.email, password: this.ruleForm.password })
            .then(response => {
              window.localStorage.setItem('token', response.data.token)
              this.$router.push({ path: '/list-users' })
            })
            .catch(error => {
              this.error = true
              console.log(error)
            })
        } else {
          return false
        }
      })
    }
  }
}
</script>
