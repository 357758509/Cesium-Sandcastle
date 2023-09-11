export default  {
	"code": 200,
	"data": [
		{
		"title": "控制及参数",
		"id": 10,
		"children": [
			{
				"name": "分屏对比",
				"imgUrl": "SameScreenComparison.png",
				"parentId": 10,
				"id": 21,
				"content": `
<template>
<div id="cesiumContainer" class="fullSize">
    <div id="view3"></div>
    <div id="view2"></div>
</div>
</template>
<script setup>
import { ref, createApp, onMounted } from 'vue'

const init = async() => {
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1NjZlMDhlMS01NmFmLTRiNDEtYTJiYi0zZjcwZWJjZjk5ZDciLCJpZCI6MTQ3NDk4LCJpYXQiOjE2ODcwMDIzNjl9.I5J46xv2jWmIWMKNqpiQ7QPd7DFcBCYWolY2PxReZr8';
    //我们希望我们的两个视图在时间上同步，因此我们创建
    //两个视图共享的共享时钟对象
    const clockViewModel = new Cesium.ClockViewModel();
    const options = {
      homeButton: false,
      fullscreenButton: false,
      sceneModePicker: false,
      clockViewModel: clockViewModel,
      infoBox: false,
      geocoder: false,
      navigationHelpButton: false,
      animation: false,
      timeline: false,
      baseLayerPicker: false,
      creditContainer: null
    };
    //我们创建了两个查看器，一个2D查看器和一个3D查看器
    //CSS设置为将它们并排放置
    const view3 = new Cesium.Viewer("view3", options);
    const view2 = new Cesium.Viewer("view2", options);

    // 设置初始化的相机位置
    const initialPosition = Cesium.Cartesian3.fromDegrees(94.98999, 152.9876, 10000000);
    
    // 将第一个视图的相机位置设置为初始位置
    view3.scene.camera.setView({
      destination: initialPosition
    });
  
    // 将第二个视图的相机位置设置为初始位置
    view2.scene.camera.setView({
      destination: initialPosition
    });
    
    // 监听第一个视图的相机变化事件
    view3.camera.changed.addEventListener(() => {
      // 将第一个视图的相机参数同步到第二个视图
      view2.scene.camera.setView({
        destination: view3.scene.camera.position,
        orientation: {
          direction: view3.scene.camera.direction,
          up: view3.scene.camera.up
        }
      });
    });
    view3.camera.percentageChanged = 0.001;
    
    // 监听第二个视图的相机变化事件
    view2.camera.changed.addEventListener(() => {
      // 将第二个视图的相机参数同步到第一个视图
      view3.scene.camera.setView({
        destination: view2.scene.camera.position,
        orientation: {
          direction: view2.scene.camera.direction,
          up: view2.scene.camera.up
        }
      });
    });
    view2.camera.percentageChanged = 0.001;
    }
    
    onMounted(()=>{
        init()
    })
</script>

<style lang="less">
body,html,#app {
    width: 100%;
    height: 100%;
    padding: 0px;
    margin: 0px;
}
#cesiumContainer {
    width: 100%;
    height: 100%;
}
#view3D {
    display: inline-block;
    width: 100%;
}
#view2D {
    display: inline-block;
    width: 100%;
}
.cesium-viewer-bottom{
    display: none;
}
</style>
							`
        },
    ]
},
],
	"msg": "成功"
}
