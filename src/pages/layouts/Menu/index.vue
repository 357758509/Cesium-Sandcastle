<template>
   <!-- <div class="Menu">
        <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
            @open="handleOpen"
            @close="handleClose"
        >
            <el-sub-menu index="1">
            <template #title>
                <el-icon><location /></el-icon>
                <span>Navigator One</span>
            </template>
            <el-menu-item-group>
                <template #title><span>Group One</span></template>
                <el-menu-item index="1-1">item one</el-menu-item>
                <el-menu-item index="1-2">item two</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group Two">
                <el-menu-item index="1-3">item three</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1-4">
                <template #title><span>item four</span></template>
                <el-menu-item index="1-4-1">item one</el-menu-item>
            </el-sub-menu>
            </el-sub-menu>
            <el-menu-item index="2">
            <el-icon><icon-menu /></el-icon>
            <template #title>Navigator Two</template>
            </el-menu-item>
            <el-menu-item index="3" disabled>
            <el-icon><document /></el-icon>
            <template #title>Navigator Three</template>
            </el-menu-item>
            <el-menu-item index="4">
            <el-icon><setting /></el-icon>
            <template #title>Navigator Four</template>
            </el-menu-item>
        </el-menu> 
        <div class="ddf"></div>
   </div> -->

   <template v-for="subItem in menuList" :key="subItem.path">
		<el-sub-menu v-if="subItem.children && subItem.children.length > 0" :index="subItem.path">
			<template #title>
				
				<div class="iconfont" :class="subItem.meta.icon"></div>
				<span>{{ subItem.meta.title }}</span>
			</template>
			<SubMenu :menuList="subItem.children" />
		</el-sub-menu>
		<el-menu-item v-else :index="subItem.path" @click="handleClickMenu(subItem)">
			
			<div class="iconfont" :class="subItem.meta.icon"></div>
			<template #title>
				<span>{{ subItem.meta.title }}</span>
			</template>
		</el-menu-item>
	</template>
</template>
<script setup>
import { ref, computed, defineProps } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from "vue-router";
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
const props = defineProps({
   menuList: {
    type: Array,
    default: () => {
        return []
    }
   }
});

// console.log('jjjjj',props.menuList)
// const isCollapse = ref(true)
const router = useRouter();
const store = useStore();
const isCollapse = computed(() => store.state.common.ThreeDdataThemeConfig.isCollapse);
// const handleOpen = (key, keyPath) => {
//   console.log(key, keyPath)
// }
// const handleClose = (key, keyPath) => {
//   console.log(key, keyPath)
// }
const handleClickMenu = (subItem) => {
	if (subItem.meta.isLink) return window.open(subItem.meta.isLink, "_blank");
	router.push(subItem.path);
};
</script>
<style lang="less" scoped>
// .el-menu-vertical-demo:not(.el-menu--collapse) {
//   width: 200px;
//   min-height: 400px;
// }
// .ddf{
//     width: 300px;
//     height: 40px;
//     background-color: red;
// }
// .Menu{
//     // width: 100%;
//     height: 100%;
// }

.iconfont {
	margin-right: 10px;
	font-size: 18px;
}
</style>