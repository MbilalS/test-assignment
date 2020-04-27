<template>
  <div class="main-div forms">
    <h3>Edit User</h3>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-form :model="editUser" :rules="rules" ref="editUser" label-width="120px" class="demo-editUser">
            <el-form-item prop="first_name" label="First name">
              <el-input v-model="editUser.first_name">
              </el-input>
            </el-form-item>
            <el-form-item prop="last_name" label="Last name">
              <el-input v-model="editUser.last_name">
              </el-input>
            </el-form-item>
            <el-form-item prop="email" label="Email">
              <el-input v-model="editUser.email">
                <i slot="prefix" class="el-icon-message"></i>
              </el-input>
            </el-form-item>
            <el-form-item label="Avatar URL" prop="avatar">
              <el-input type="text" v-model="editUser.avatar"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('editUser')">Update</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'EditUser',
  data () {
    return {
      editUser: {
        first_name: '',
        last_name: '',
        email: '',
        avatar: '',
        id: null
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
  mounted: function () {
    this.editUser = this.getEditUser()
    if (this.editUser) {
      this.editUser = this.editUser[0]
    }
  },
  computed: {
    ...mapGetters({
      allUsers: 'users'
    })
  },
  methods: {
    ...mapActions({
      updateUser: 'updateUser'
    }),
    getEditUser () {
      return this.allUsers.filter(user => user.id === parseInt(this.$route.params.id))
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.updateUser(this.editUser)
          this.$router.push({ path: '/list-users' })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
