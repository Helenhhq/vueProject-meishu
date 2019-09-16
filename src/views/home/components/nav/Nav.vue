<template>
	<div class="wrapper">
		<div class="itemWrapper" v-for="(nav,index) in nav_list" :key="nav.cid">
			<div class="imageWrapper">
				<img class="image" :src="nav.icon_url" :alt="nav.name">
			</div>
			<div class="titleWrapper">
				<span class="title">{{nav.name}}</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "homeNav",
		props:{
			nav_list:Array
		}
	}
</script>

<style scoped>
	.wrapper {
		padding-top: 0.9375rem;
		padding-bottom: 0.9375rem;
		background: #FFF;
	}
	.itemWrapper {
		display: inline-block;
		padding-top: 0.3125rem;
		width: 20%;
	}
	.imageWrapper {
		padding-bottom: 58.823%;
		height: 0;
		overflow: hidden;
		text-align: center;
	}
	.image {
		width: 58.823%;
		height: auto;
		display: inline-block;
	}
	.titleWrapper {
		padding: 0.4375rem 0.3125rem 0.375rem 0.3125rem;
	}
	.title {
		font-size: 0.7rem;
		color: #555;
		text-align: center;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}	
</style>
