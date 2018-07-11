<template>
  <div class="app-container">
    <!-- 树状表 start -->
    <div class="tree">
      <el-tree :data="treeList" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    </div>
    <!-- 树状表 end -->

    <!-- 列表页 start -->
    <div v-show="tableShow" class="table">
      <el-table :key='tableKey' :data="tableData" v-loading="false" border fit highlight-current-row>
        <el-table-column align="center" :label="$t('public.title')" width="250">
          <template slot-scope="scope">
            <span>{{scope.row.title}}</span>
          </template>
        </el-table-column>
        <el-table-column width="250px" align="center" :label="$t('public.key')">
          <template slot-scope="scope">
            <span>{{scope.row.module}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('table.actions')" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button v-if="checkPermission('module', 'edit')" size="mini" type="primary"><router-link :key="scope.row.id" :to="'/module/edit/' + scope.row.id">{{$t('table.edit')}}</router-link></el-button>
            <el-button v-if="checkPermission('module', 'sort')" size="mini" type="success" @click="handleMove(scope.row.id,1)">{{$t('module_table.move_up')}}</el-button>
            <el-button v-if="checkPermission('module', 'sort')" size="mini" type="success" @click="handleMove(scope.row.id,2)">{{$t('module_table.move_down')}}</el-button>
            <el-button v-if="checkPermission('module', 'del')" size="mini" type="danger" @click="handleDelete(scope.row.id)">{{$t('table.delete')}}</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-container">
        <el-pagination background  @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
      </div>
    </div>
    <!-- 列表页 end -->
  </div>
</template>

<script>
import { getModuleTree, deleteModule } from '@/api/module';
import checkPermission from '@/utils/permission';

export default {
  name: 'module',
  data() {
    return {
      treeList: undefined,
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      tableKey: "listingTable",
      tableShow: false,
      tableData: [],
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
      total: 0
    }
  },
  created() {
    this.getTree();
  },
  methods: {
    getTree() {
      //获取模块树列表
      getModuleTree().then((response) => {
        if( !response.data.status ) {
          this.$message({
            message: response.data.msg,
            type: 'error'
          });
        }
        this.treeList = response.data.data;
      });
    },
    handleNodeClick(node) {
      const tableData = [];
      tableData.push({
        id: node.id,
        module: node.module,
        pid: node.pid,
        title: node.title
      });
      if(node.children && node.children.length > 0) {
        node.children.forEach(nodeItem => {
          tableData.push({
            id: nodeItem.id,
            module: nodeItem.module,
            pid: nodeItem.pid,
            title: nodeItem.title
          });
        });
      }
      this.tableData = tableData;
      this.total = tableData.length;
      this.tableShow = true;
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleMove(id, type) {

    },
    handleDelete(id) {
      this.$confirm('此操作将永久删除该模块, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    checkPermission
  }
}
</script>

<style lang="scss" scoped>
.tree {
  float: left;
  width: 200px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  .el-tree{
    padding: 10px;
  }
}
.table {
  float: left;
  min-width: 80%;
  margin-left: 80px;
  padding: 20px;
  max-height:1000px;
  min-height:100px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}

</style>
