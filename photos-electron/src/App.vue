<script lang="ts">
	import NavBar from "./components/NavBar.vue";

	export default {
		name: "App",
		components: {
			NavBar
		}
	};
</script>

<template>
	<div class="container">
		<nav-bar v-if="!$route.fullPath.includes('login')"></nav-bar>
		<router-view></router-view>
	</div>
</template>

