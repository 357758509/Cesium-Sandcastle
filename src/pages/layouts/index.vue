<template>
    <!-- <div class="layouts"> -->
        <!-- <Menu /> -->
    <!-- </div> -->
    <div class="layouts">
        <el-container class="container">
            <el-header>
                <div class="header-lf">
                    <div class="logo flx-center notConvertPx">
                        <!-- <img src="@/assets/images/logo.svg" alt="logo" /> -->
                        <span>Cesium示例</span>
                    </div>
                    <ToolBarLeft />
                </div>
            </el-header>
            <el-container>
                <el-aside :width="asideWidth">
                    <!-- :style="{width: asideWidth}" -->
                    <el-menu
                        :default-active="activeMenu"
                        :router="false"
                        :collapse="isCollapse"
                        :collapse-transition="false"
                        :unique-opened="true"
                        background-color="#ffffff"
                        text-color="#ffffff"
                        active-text-color="#3c8dbc"
                    >
                       <Menu  :menuList="menuList"/>
                    </el-menu>
                </el-aside>
                <el-main>
                    <router-view v-slot="{ Component }">
                        <transition>
                            <keep-alive>
                            <component :is="Component" />
                            </keep-alive>
                        </transition>
                    </router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script setup>
import Menu from "@/pages/layouts/Menu/index.vue"
import ToolBarLeft from "@/pages/layouts/ToolBarLeft/index.vue";
import { ref, watch, computed } from 'vue'
import { useRoute,  useRouter} from "vue-router";
import { useStore } from 'vuex'
const store = useStore();
const route = useRoute();
const asideWidth = ref('200px')
store.dispatch("common/setShowMenuListGet")
// const isCollapse = computed(() => store.state.common.ThreeDdataThemeConfig.isCollapse);
const isCollapse = computed(() => store.state.common.ThreeDdataThemeConfig.isCollapse);
const activeMenu = computed(() => (route.meta.activeMenu ? route.meta.activeMenu : route.path));
const menuList = computed(() => store.state.common.showMenuListGet);
console.log('route',route, useRouter())
watch(() => store.state.common.ThreeDdataThemeConfig.isCollapse, (newVlaue)=> {
    console.log("监听打开关闭的变化", newVlaue)
    if(newVlaue){
        asideWidth.value = '66px'
    } else {
        asideWidth.value = '200px'
    }
})

</script>
<style lang="less">
 .el-menu,
    .el-menu--popup {
        .el-menu-item {
            &.is-active {
                // background: var(--el-color-primary-light-9);
                background: #575d60 !important;
                // &::before {
                // 	position: absolute;
                // 	top: 0;
                // 	bottom: 0;
                // 	left: 0;
                // 	width: 4px;
                // 	content: "";
                // 	background: var(--el-color-primary);
                // }
            }
            &:hover {
                background-color: #575d60;
            }
        }
    }

    // guide
    #driver-highlighted-element-stage {
        background-color: #606266 !important;
        // background-color: $babyBlue-color !important;
    }
</style>
<style lang="less" scoped>
.layouts{
    width: 100%;
    height: 100%;
    .container{
        width: 100%;
        height: 100%;
        // .el-header{
        //     height: 50px;
        // }
        .el-header{
            background-color: #3c8dbc;
            padding: 0px;
            .header-lf {
                height: 100%;
                display: flex;
                align-items: center;
                overflow: hidden;
                white-space: nowrap;
                .notConvertPx{
                    width: 200px;
                }
                .logo {
                    flex-shrink: 0;
                    height: 100%;
                    // margin-right: 16px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: #367fa9;
                    span {
                        font-size: 21.5px;
                        font-weight: bold;
                        // color: #dadada;
                        color: white;
                        white-space: nowrap;
                    }
                    // img {
                    //     width: 28px;
                    //     object-fit: contain;
                    //     margin-right: 6px;
                    // }
                }
            }
        }
        .el-aside{
            // background-color: #222d32;
            background-color: #103444;
            .el-menu{
                height: 100%;
                // background-color: #222d32;
                background-color: #103444;
                border-right: none;
            }
        }
        
        .el-main{
            padding: 0px;
        }
    }
}
</style>