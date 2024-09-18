<template>
  <div>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="权限组" name="PermissionMana"><PermissionMana/></el-tab-pane>
      <el-tab-pane label="部门管理" name="DepMana"><DepMana/></el-tab-pane>
      <el-tab-pane label="职位管理" name="PositionMana"><PositionMana/></el-tab-pane>
      <el-tab-pane label="职称管理" name="JobLevelMana"><JobLevelMana/></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import DepMana from "@/components/sys/basic/DepMana";  // 部门管理
import JobLevelMana from "@/components/sys/basic/JobLevelMana"; // 职称管理
import PositionMana from "@/components/sys/basic/PositionMana"; // 职位管理
import PermissionMana from "@/components/sys/basic/PermissionMana";

export default {
  name: "SysBasic",
  components:{
    JobLevelMana,
    DepMana,
    PositionMana,
    PermissionMana
  },
  data() {
    return {
      activeName: 'PermissionMana' // 激活项
    }
  },
  methods: {}
}
</script>

<style>
.el-tabs__item:hover {
  color: orange;
}
.el-tabs__item.is-active {
  color: orange;
}

</style>
