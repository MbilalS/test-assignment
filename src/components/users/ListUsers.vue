<template>
  <div class="main-div">
    <h3>Users List</h3>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="23">
        <div class="grid-content bg-purple-dark">
          <el-alert v-if="success"
            title="success"
            type="success"
            description="User Deleted successfully"
            show-icon>
          </el-alert>
          <el-row class="create-logout-button">
              <el-button round @click="createUser()">Create</el-button>
              <el-button round @click="logout()">Logout</el-button>
          </el-row>
          <el-table
            v-loading="loading"
            element-loading-text="Loading..."
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
              prop="avatar"
              label="Avatar">
            </el-table-column>
            <el-table-column
            label="Full name"
            width="200">
              <template slot-scope="scope">
                <span>{{ scope.row.first_name }} {{ scope.row.last_name }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="email"
              label="Email"
              width="200">
            </el-table-column>
            <el-table-column
              align="right"
              width="200">
            <template slot-scope="scope">
              <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
              <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
            </template>
            </el-table-column>
          </el-table>
          <el-pagination
          style="margin-top: 10px"
            @prev-click="handlePrev"
            @next-click="handleNext"
            layout="prev, pager, next"
            :page-size="perPage"
            :total="totalUsers">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ListUsers',
  data () {
    return {
      success: false,
      perPage: 5,
      page: 1,
      totalUsers: 12,
      loading: false
    }
  },
  mounted: function () {
    this.getUsersList(this.page, this.perPage)
  },
  computed: {
    ...mapGetters({
      tableData: 'users'
    })
  },
  methods: {
    ...mapActions({
      setInitialUsers: 'setInitialUsers',
      removeUser: 'removeUser'
    }),
    getUsersList (page, perPage) {
      this.loading = true
      axios.get('https://reqres.in/api/users?page=' + page + '&per_page=' + perPage)
        .then(response => {
          this.setInitialUsers(response.data.data)
          this.loading = false
          return this.tableData
        })
    },
    handleEdit (index, row) {
      this.$router.push({ path: '/user/' + row.id + '/edit' })
    },
    handleDelete (index, row) {
      let self = this
      axios.delete('https://reqres.in/api/users/:' + row.id)
        .then(response => {
          this.removeUser(index)
          this.resetSuccessAlert()
          setTimeout(function () {
            self.resetSuccessAlert()
          }, 3000)
        })
    },
    resetSuccessAlert () {
      this.success = !this.success
    },
    createUser () {
      this.$router.push({ path: '/user' })
    },
    logout () {
      window.localStorage.removeItem('token')
      this.$router.push({ path: '/' })
    },
    handlePrev () {
      this.page = this.page - 1
      this.getUsersList(this.page, this.perPage)
    },
    handleNext () {
      this.page = this.page + 1
      this.getUsersList(this.page, this.perPage)
    }
  }
}
</script>
