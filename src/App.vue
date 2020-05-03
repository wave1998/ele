<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col class="logo" :span="8" :style="{width:isCollapse?'64px':'240px'}">
          <strong>{{isCollapse?'大':'大学生兼职管理系统'}}</strong>
        </el-col>
        <el-col class="info" :span="8">
          <i :class="isCollapse?'el-icon-d-arrow-right':'el-icon-d-arrow-left'"
             @click="isCollapse=!isCollapse"></i>
        </el-col>
        <el-col :span="8" class="adminInfo">
          <el-dropdown trigger="click">
                        <span class="el-dropdown-link">
                            <span>{{$store.state.admin.adminName}}</span> <img src="./assets/logo.png" alt="">
                        </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="$store.commit('OUT_LOGIN')">退出登陆</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside :style="{width:isCollapse?'auto':'240px'}">

        <el-menu :collapse-transition="false" :router="true" :default-active="$route.path"
                 class="el-menu-vertical-demo" :collapse="isCollapse">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span slot="title">管理员设置</span>
            </template>
            <el-menu-item index="/">管理员登陆日志</el-menu-item>
            <el-menu-item index="/adminList">管理员列表</el-menu-item>
          </el-submenu>

          <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span slot="title">公司设置</span>
          </template>
          <el-menu-item index="/shopTypeList">公司类别列表</el-menu-item>
          <el-menu-item index="/shopList">公司列表</el-menu-item>
        </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span slot="title">职位设置</span>
            </template>
            <el-menu-item index="/goodsTypeList">部门列表</el-menu-item>
            <el-menu-item index="/goodsList">职位列表</el-menu-item>
          </el-submenu>

        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    data() {
      return {
        // 是否折叠
        isCollapse: false
      }
    },
    methods: {
      fn() {
        console.log(121212);
      }
    }
  }
</script>

<style lang="less">
  * {
    padding: 0;
    margin: 0;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 240px;
    min-height: 1000px;
  }

  .el-header {
    padding: 0px !important;
    background: #409EFF;
    color: #ffffff;
    .info {
      font-size: 30px;
      line-height: 60px;
    }
    .logo {
      text-align: center;
      width: 240px;
      font-size: 25px;
      line-height: 60px;
      border-right: 1px solid rgba(238, 241, 146, 0.3);
    }
    .adminInfo {
      float: right;
      text-align: right;
      padding-right: 20px;
      line-height: 60px;
      .el-dropdown-link {
        span {
          color: #fff;
        }
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          vertical-align: middle;
        }
      }
    }
  }

  .toolbar {
    background: #f4f4f4;
    padding: 10px;
    marign: 20px 0 !important;
  }

  .el-table th, .el-table td {
    text-align: center !important;
  }

  .toolbar .el-form-item {
    margin-bottom: 0px;
  }
</style>
