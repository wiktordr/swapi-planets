<script setup lang="ts">
</script>

<template>
  <div>
    <el-container class="app-container">
      <el-header>
        <RouterLink to="/">
          <el-button type="plain" text> Home </el-button>
        </RouterLink>
        <RouterLink to="/planet-list">
          <el-button type="plain" text> Planet list </el-button>
        </RouterLink>
      </el-header>
      <el-main>
        <RouterView />
      </el-main>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.app-container {
  max-width: 1440px;
  margin: 0 auto;
}
</style>
