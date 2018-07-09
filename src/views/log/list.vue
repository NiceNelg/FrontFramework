<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input 
        @keyup.enter.native="handleFilter" 
        style="width: 200px;" 
        class="filter-item" 
        :placeholder="$t('table.title')" 
        v-model="listQuery.title"
      >
      </el-input>
      <el-select 
        clearable style="width: 90px" 
        class="filter-item" 
        v-model="listQuery.importance" 
        :placeholder="$t('table.importance')"
      >
        <el-option 
          v-for="item in importanceOptions" 
          :key="item" 
          :label="item" 
          :value="item"
        >
        </el-option>
      </el-select>
      <el-select 
        clearable 
        class="filter-item" 
        style="width: 130px" 
        v-model="listQuery.type" 
        :placeholder="$t('table.type')"
      >
        <el-option 
          v-for="item in  calendarTypeOptions" 
          :key="item.key" 
          :label="item.display_name+'('+item.key+')'" 
          :value="item.key"
        >
        </el-option>
      </el-select>
      <el-select 
        @change='handleFilter' 
        style="width: 140px" 
        class="filter-item" 
        v-model="listQuery.sort"
      >
        <el-option 
          v-for="item in sortOptions" 
          :key="item.key" 
          :label="item.label" 
          :value="item.key"
        >
        </el-option>
      </el-select>
      <el-button 
        class="filter-item" 
        type="primary" 
        v-waves 
        icon="el-icon-search" 
        @click="handleFilter"
      >
        {{$t('table.search')}}
      </el-button>
      <el-button 
        class="filter-item" 
        style="margin-left: 10px;" 
        @click="handleCreate" 
        type="primary" 
        icon="el-icon-edit"
      >
        {{$t('table.add')}}
      </el-button>
      <el-button 
        class="filter-item" 
        type="primary" 
        :loading="downloadLoading" 
        v-waves 
        icon="el-icon-download" 
        @click="handleDownload"
      >
        {{$t('table.export')}}
      </el-button>
      <el-checkbox 
        class="filter-item" 
        style='margin-left:15px;' 
        @change='tableKey=tableKey+1' 
        v-model="showReviewer"
      >
        {{$t('table.reviewer')}}
      </el-checkbox>
    </div>
    <listing></listing>
  </div>
</template>

<script>
import Listing from '@/components/Listing'
import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'


export default {
  name: 'log',
  directives: {
    waves
  },
  components: {
    Listing
  },
  create() {
    console.log('hh');
  },
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      }
    }
  },
  methods: {
    handleFilter() {
      
    }
  }
}
</script>
