<template>
  <div class="main-div forms">
    <h3>Create User</h3>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-form :model="createUser" :rules="rules" ref="createUser" label-width="120px" class="demo-createUser">
            <el-form-item prop="first_name" label="First name">
              <el-input v-model="createUser.first_name">
              </el-input>
            </el-form-item>
            <el-form-item prop="last_name" label="Last name">
              <el-input v-model="createUser.last_name">
              </el-input>
            </el-form-item>
            <el-form-item prop="email" label="Email">
              <el-input v-model="createUser.email">
                <i slot="prefix" class="el-icon-message"></i>
              </el-input>
            </el-form-item>
            <el-form-item label="Avatar URL" prop="avatar">
              <el-input type="text" v-model="createUser.avatar"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('createUser')">Create</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import { mapActions } from 'vuex'
import axios from 'axios'

export default {
  name: 'CreateUser',
  data () {
    return {
      createUser: {
        first_name: '',
        last_name: '',
        email: '',
        avatar: ''
      },
      rules: {
        first_name: [
          { required: true, message: 'Please enter your first name', trigger: 'blur' },
          { min: 3, max: 15, message: 'Length should be 3 to 15', trigger: 'blur' }
        ],
        last_name: [
          { required: true, message: 'Please enter your last name', trigger: 'blur' },
          { min: 3, max: 15, message: 'Length should be 3 to 15', trigger: 'blur' }
        ],
        email: [
          { required: true, message: 'Please enter email address', trigger: 'blur' },
          { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  methods: {
    ...mapActions({
      addUser: 'addUser'
    }),
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post('https://reqres.in/api/users', this.createUser)
            .then(response => {
              this.addUser(response.data)
              this.$router.push({ path: '/list-users' })
            //   this.resetSuccessAlert()
            //   setTimeout(function () {
            //     self.resetSuccessAlert()
            //   }, 3000)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
