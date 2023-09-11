<template>
	<List :data="FlyingRoamData.data" />
</template>
<script setup>
import List from "@/components/list/index.vue"
import FlyingRoamData from "@/assets/json/FlyingRoam.js"
</script>
<style lang="less" scoped></style>