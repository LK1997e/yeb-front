<template>
  <el-container style="width: 100%;height: 100%">
    <el-header class="homeHeader">
      <div class="title">智能办公管理系统</div>
      <div>
        <el-button type="text" icon="el-icon-bell" size="normal"
                   style="color: wheat;" @click="goChat"></el-button>
        <el-dropdown class="userInfo" @command="commandHandler">
          <span class="el-dropdown-link">
              {{ user.name }}
            <i><img :src="user.userFace"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="userinfo">个人中心</el-dropdown-item>
            <el-dropdown-item command="logout">注销登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px" style="background-color: papayawhip">
        <el-menu router ref="menuList" active-text-color="brown"
                 :default-openeds="openSubMenu" background-color="papayawhip" :unique-opened = "true">
          <el-submenu v-for="(item,index) in routes"
                      :key="index"
                      :index="index+''"
                      v-show="!item.hidden"
          >
            <template slot="title">
              <i :class="item.iconCls" style="color: rosybrown;margin-right: 5px"></i>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item v-for="(children,indexj) in item.children" :key="indexj" :index="children.path">
              <span>{{ children.name }}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main style="background-color: aliceblue">
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right"
                       v-if="this.$router.currentRoute.path!=='/home'">
          <el-breadcrumb-item :to="{ path: '/home' }">
            <span style="color: brown" @click="cancelActive">首页</span>
          </el-breadcrumb-item>
          <el-breadcrumb-item>
            <span style="color: brown">
               {{ this.$router.currentRoute.name }}
            </span>
          </el-breadcrumb-item>
        </el-breadcrumb>
        <div class="homeWelcome" v-if="this.$router.currentRoute.path==='/home'">
          欢迎来到智能办公系统！
        </div>
        <router-view class="homeRouterView"/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      user: JSON.parse(window.sessionStorage.getItem('user')),
      openSubMenu:[],
    }


  },
  methods: {
    goChat(){
      this.$router.push('/chat');
    },
    // 注销登录
    commandHandler(command) {
      if (command === 'logout') {
        // 弹框提示用户是否要删除
        this.$confirm('此操作将注销登录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 注销登录
          this.postRequest('/api/logout')
          // 清空用户信息
          window.sessionStorage.removeItem('tokenStr')
          window.sessionStorage.removeItem('user')
          // 路由替换到登录页面
          // this.$router.replace('/')
          // 清空菜单信息；在src/utils/menus.js 中初始化菜单信息
          this.$store.commit('initRoutes', [])
          this.$router.replace('/')
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消注销登录'
          });
        });
      }
      if (command === 'userinfo') {
        this.$router.push('/userinfo')
      }
    },
    cancelActive() {
      this.$refs.menuList.activeIndex = null;
    }

  },
  watch:{
    routes:function (){
      let routes = this.$store.state.routes;
      for(let i=0; i<routes.length; i++){
        let ifFind = false;
        this.openSubMenu = [];
        routes[i].children.forEach(child=>{
          if(child.path == this.$router.currentRoute.path){
            this.openSubMenu.push(i+'');
            this.$refs.menuList.activeIndex =  this.$router.currentRoute.path;
            ifFind = true;
          }
        });
        if(ifFind){
          return;
        }
      }

    }
  },

  computed: {
    routes() {
      return this.$store.state.routes;
    }
  },
  mounted() {
    this.$refs.menuList.activeIndex =  this.$router.currentRoute.path;
  },
  created() {
    let routes = this.$store.state.routes;
    for(let i=0; i<routes.length; i++){
      let ifFind = false;
      routes[i].children.forEach(child=>{
        if(child.path == this.$router.currentRoute.path){
          this.openSubMenu.push(i+'');
          ifFind = true;
        }
      });
      if(ifFind){
        return;
      }
    }
  }
}
</script>

<style>
.homeHeader {
  background: #321f22;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  box-sizing: border-box;

}

.homeHeader .title {
  font-size: 30px;
  /*font-family: 微软雅黑;*/
  font-family: 华文楷体;
  color: white;
}

.homeHeader .userInfo {
  padding: 0 15px;
  cursor: pointer;
}

.el-dropdown-link {
  display: flex;
  align-items: center;
  color: wheat;
  font-size: 18px;
  font-family: 华文楷体;
}

.el-dropdown-link img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-left: 8px;
}

.homeWelcome {
  text-align: center;
  font-size: 30px;
  font-family: 华文楷体;
  color: brown;
  padding-top: 50px;
}

.el-menu-item.is-active {
  background-color: white !important;
}

.homeRouterView {
  margin-top: 10px;
}
</style>