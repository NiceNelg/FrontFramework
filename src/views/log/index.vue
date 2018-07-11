<template>
  <div class="app-container">
    
    <!-- 搜索框 start -->
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('public.module')" v-model="listQuery.module"></el-input>
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('public.username')" v-model="listQuery.username"></el-input>
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('log_table.ip')" v-model="listQuery.ip"></el-input>
      <el-date-picker class="filter-item" style="display: inline-flex;" v-model="timeArray" type="datetimerange" range-separator="~" :start-placeholder="$t('public.startTime')" :end-placeholder="$t('public.endTime')" align="left"></el-date-picker>
      <el-select clearable style="width: 90px" class="filter-item" v-model="listQuery.type" :placeholder="$t('log_table.type')">
        <el-option v-for="typeItem in type" :key="typeItem.value" :label="typeItem.title" :value="typeItem.value"></el-option>
      </el-select>
      <el-select clearable style="width: 90px" class="filter-item" v-model="listQuery.result" :placeholder="$t('public.result')">
        <el-option v-for="resultItem in result" :key="resultItem.value" :label="resultItem.title" :value="resultItem.value"></el-option>
      </el-select>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
    </div>
    <!-- 搜索框 end -->

    <!-- 列表页 start -->
    <el-table :key='tableKey' :data="list" v-loading="listLoading" border fit highlight-current-row style="width: 100%;max-height:1000px;">
      <el-table-column align="center" :label="$t('log_table.id')" width="65">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" :label="$t('public.module')">
        <template slot-scope="scope">
          <span>{{scope.row.module_title}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" :label="$t('public.operate')">
        <template slot-scope="scope">
          <span>{{scope.row.operate_title}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="150px" :label="$t('public.content')">
        <template slot-scope="scope">
          <span>{{scope.row.content}}</span>
        </template>
      </el-table-column>
      <el-table-column width="110px" align="center" :label="$t('log_table.author_name')">
        <template slot-scope="scope">
          <span>{{scope.row.author_name}}</span>
        </template>
      </el-table-column>
      <el-table-column width="110px" align="center" :label="$t('log_table.truename')">
        <template slot-scope="scope">
          <span>{{scope.row.truename}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('log_table.type')" width="95">
        <template slot-scope="scope">
          <span>{{scope.row.type}}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" :label="$t('public.result')" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.result}}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" :label="$t('log_table.ip')" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.ip}}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" :label="$t('log_table.createtime')" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.createtime}}</span>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>
    <!-- 列表页 end -->

  </div>
</template>

<script>
import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/log'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'
import checkPermission from '@/utils/permission'

export default {
  name: 'List',
  directives: {
    waves
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        module: undefined,
        username: undefined,
        ip: undefined,
        startTime: undefined,
        endTime: undefined,
        type: undefined,
        result: undefined
      },
      timeArray: [],
      type: [{
        value: 0,
        title: '不限'
      }, {
        value: 1,
        title: '登录'
      }, {
        value: 2,
        title: '登出'
      }, {
        value: 3,
        title: '操作'
      }],
      result: [{
        value: 0,
        title: '不限'
      }, {
        value: 1,
        title: '成功'
      }, {
        value: 2,
        title: '失败'
      }],
      dialogFormVisible: false,
      dialogStatus: '',
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    checkPermission,
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.data.row
        this.total = parseInt(response.data.data.total);

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 0.4 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      //时间控件转换时间戳
      if( this.timeArray.length > 0 ) {
        this.timeArray.forEach((timeItem,index) => {
          if( timeItem && index == 0 ) {
            this.listQuery.startTime = timeItem.getTime() / 1000;
          } else {
            this.listQuery.endTime = timeItem.getTime() / 1000;
          }
        });
      }
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleDelete(row) {
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
