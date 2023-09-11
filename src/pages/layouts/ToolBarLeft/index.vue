<template>
    <el-icon v-if="isCollapse == false" class="Icon" @click="collapse(true)"><Expand /></el-icon>
    <el-icon v-else class="Icon" @click="collapse(false)"><Fold /></el-icon>
</template>
<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import {
    Expand,
    Fold
} from '@element-plus/icons-vue'

const store = useStore();
const isCollapse = computed(() => store.state.common.ThreeDdataThemeConfig.isCollapse);
const collapse = (item) => {
    // if()
    // console.log('jjjjj',isCollapse, store.state.common.ThreeDdataThemeConfig.isCollapse)
    store.dispatch('common/setIsCollapse', item);
}
</script>
<style lang="less" scoped>
.el-icon{
    // width: 30px;
    // height: 30px;
    font-size: 26px !important;
    margin-left: 20px;
    color: white !important;
    // svg{
    //     width: 200px;
    //     height: 200px;
    // }
}
</style>