<template>
	<div class="container">
		<div class="list-cont" :class="props.data.length > 1 ? 'bottomBoder' : ''" v-for="(item, index) in props.data" :key="index">
			<div class="hader">
				<div>{{ item.title }}</div>
			</div>
			<div class="list">
				<div class="list-item" v-for="(childrenItem, index) in item.children" :key="index">
					<div class="item" @click.stop="itemClick(childrenItem)">
						<span>{{ childrenItem.name }}</span>
					
						<img :src="require('@/assets/images/'+childrenItem.imgUrl)" alt="" />
						<!-- <img src="@/assets/images/bag.png" alt="" /> -->
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, defineProps } from "vue";
import { useRouter } from "vue-router";
import { useStore } from 'vuex'
const router = useRouter();
const store = useStore();
const props = defineProps({
	data: {
		type: Object,
		default: () => {
			return {};
		}
	}
});


const itemClick = (childrenItem) => {
	console.log("点击了uuuuu",childrenItem)
    store.dispatch('common/setCesiumDomItem', JSON.stringify(childrenItem));
	store.dispatch('common/setIsCollapse', true);
	router.push({
		path: `/Editor`
	});
};
</script>
<style lang="less" scoped>
.container {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	padding-left: 20px;
	padding-right: 20px;
	box-sizing: border-box;
	.bottomBoder {
		border-bottom: 1px solid #3c8dbc;
	}
	.list-cont {
		display: flex;
		flex-direction: column;
		padding-bottom: 10px;
		.hader {
			display: flex;
			justify-content: center;
			padding-bottom: 6px;
			padding-top: 26px;
			margin-bottom: 18px;
			width: 20%;
			div {
				color: #111111;
				font-size: 22px;
				width: 160px;
			}
		}
		.list {
			display: flex;
			flex-wrap: wrap;
			.list-item {
				width: 20%;
				display: flex;
				justify-content: center;
				height: 207px;
				.item {
					display: flex;
					flex-direction: column;
					justify-content: flex-start;
					border-radius: 2px;
					background: #fff;
					box-shadow: 0 0 3px rgba(150, 150, 150, 0.5);
					-webkit-box-shadow: 0 0 3px rgba(150, 150, 150, 0.5);
					box-sizing: border-box;
					width: 160px;
					height: 167px;
					transition: all 0.3s ease-in-out;
					cursor: pointer;
					&:hover{
						height: 187px;
						width: 180px;
					}
					span {
						height: 20%;
						color: #2c3b41;
						font-size: 18px;
						display: flex;
						justify-content: center;
						align-items: center;
					}
					img {
						height: 80%;
					}
				}
			}
		}
	}
}
</style>
