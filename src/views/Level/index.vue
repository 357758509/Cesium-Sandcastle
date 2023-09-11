<template>
	<List :data="LevelData.data" />
</template>
<script setup>
import List from "@/components/list/index.vue"
import LevelData from "@/assets/json/Level.js"
</script>
<style lang="less" scoped></style>