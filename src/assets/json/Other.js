import arrow from '@/assets/images/arrow.png'
import wordage from '@/assets/images/worldimage.jpg'
export default  {
	"code": 200,
	"data": [
		{
		"title": "动态效果",
		"id": 10,
		"children": [
			{
				"name": "动态文字",
				"imgUrl": "DynamicText.png",
				"parentId": 10,
				"id": 21,
				"content": `
<template>
  <div id="cesiumContainer" class="fullSize"> </div>
  <div id="loadingOverlay"><h1>Loading...</h1></div>
  <div id="toolbar"></div>
  <canvas id="canvas-a" class="canvas" width="700" height="100"></canvas>
  <canvas id="canvas-b" class="canvas" width="700" height="100"></canvas>
</template>
<script setup>
  import { ref, createApp, onMounted } from 'vue'
  //添加回调函数
    
const init = () => {
  Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1NjZlMDhlMS01NmFmLTRiNDEtYTJiYi0zZjcwZWJjZjk5ZDciLCJpZCI6MTQ3NDk4LCJpYXQiOjE2ODcwMDIzNjl9.I5J46xv2jWmIWMKNqpiQ7QPd7DFcBCYWolY2PxReZr8';
  var viewer = new Cesium.Viewer('cesiumContainer', 
  {
      homeButton: false,
      baseLayerPicker: false,
      navigationHelpButton: false,
      animation: false,
      timeline: false,
      fullscreenButton: false,
      vrButton: false
  });

  var rotation = Cesium.Math.toRadians(30);
  var curCanvas = 'a';
  function getRotationValue() {
      rotation += 0.005;
      return rotation;
  }

  // 动态切换
  function drawCanvas(time, result) {
      var canvas = document.getElementById("canvas-" + curCanvas);
      var context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.font = 'italic 40pt Calibri';
      context.fillStyle = "red";
      context.fillText(Cesium.JulianDate.toDate(Cesium.JulianDate.now()).getTime(), 20, 100);
      //console.log(Cesium.JulianDate.toDate(time).getTime());
      curCanvas = curCanvas === 'a' ? 'b' : 'a';
      return canvas;
  }

  viewer.entities.add({
      name: 'Rotating rectangle with rotating texture coordinate',
      rectangle: {
          coordinates: Cesium.Rectangle.fromDegrees(-90.0, 30.0, -70.0, 35.0),
          material: new Cesium.ImageMaterialProperty({
              image: new Cesium.CallbackProperty(drawCanvas, false),
              transparent: true
          }),
          rotation: new Cesium.CallbackProperty(getRotationValue, false),
          stRotation: new Cesium.CallbackProperty(getRotationValue, false)
      }
  });
  viewer.zoomTo(viewer.entities);
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
  .canvas {
      position: absolute;
      left: 10px;
      top: 10px;
      display:none;
  }
  #canvas-a {
      top: 10px;
  }
  #canvas-b {
      top: 120px;
  }
    
</style>
							`
        },
        {
          "name": "动态图片",
          "imgUrl": "dynamicImage.png",
          "parentId": 10,
          "id": 21,
          "content": `
<template>
<div id="cesiumContainer" class="fullSize">
</div>
<div id="loadingOverlay"><h1>Loading...</h1></div>
<div id="toolbar"></div>
<canvas id="canvas-a" class="canvas" width="700" height="100"></canvas>
<canvas id="canvas-b" class="canvas" width="700" height="100"></canvas>
</template>
<script setup>
import { ref, createApp, onMounted } from 'vue'
//添加回调函数
  
const init = () => {
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1NjZlMDhlMS01NmFmLTRiNDEtYTJiYi0zZjcwZWJjZjk5ZDciLCJpZCI6MTQ3NDk4LCJpYXQiOjE2ODcwMDIzNjl9.I5J46xv2jWmIWMKNqpiQ7QPd7DFcBCYWolY2PxReZr8';
var viewer = new Cesium.Viewer('cesiumContainer', 
{
    // imageryProvider: new Cesium.SingleTileImageryProvider({
    //    url: "${wordage}"
    // }),

    homeButton: false,
    //sceneModePicker: false,
    baseLayerPicker: false,
    navigationHelpButton: false,
    animation: false,
    timeline: false,
    fullscreenButton: false,
    vrButton: false
});
var curCanvas = 'a';
let i = 0;
function drawCanvasImage(time, result) {
    var canvas = document.getElementById("canvas-" + curCanvas);
    let cwidth = 700;
    let cheight = 100;
    var ctx=canvas.getContext("2d");
    var img=new Image();
    img.src="${arrow}";
    img.onload = function() {
        ctx.clearRect(0,0,cwidth,cheight);
        if(i<=cwidth){
            ctx.drawImage(img,i,0);
        }else{
          i=0;
        }
        i+=3;
    }
    curCanvas = curCanvas === 'a' ? 'b' : 'a';
    return canvas;
}

viewer.entities.add({
    name: 'Rotating rectangle with rotating texture coordinate',
    rectangle: {
        coordinates: Cesium.Rectangle.fromDegrees(-90.0, 30.0, -70.0, 35.0),
        material: new Cesium.ImageMaterialProperty({
            image: new Cesium.CallbackProperty(drawCanvasImage, false),
            transparent: true
        })
    }
});

viewer.zoomTo(viewer.entities);
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
    overflow: hidden;
}
.canvas {
  position: absolute;
  left: 10px;
  top: 10px;
  display:none;
}
#canvas-a {
  top: 10px;
}
#canvas-b {
  top: 120px;
}
  
</style>            
                `
          },
    ]
}
],
	"msg": "成功"
}
