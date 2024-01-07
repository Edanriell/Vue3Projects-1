<script lang="ts">
	export default {
		methods: {
			logOut() {
				localStorage.clear();
				this.$router.push("/login");
			}
		}
	};
</script>

<template>
	<nav class="mt-2">
		<ul class="d-flex flex-row flex-wrap justify-content-center align-self-center column-gap-2">
			<li>
				<router-link
					to="/"
					class="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
					>Home</router-link
				>
			</li>
			<li>
				<router-link
					to="/add-photo-form"
					class="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
					>Add Photo</router-link
				>
			</li>
			<li>
				<router-link
					to="/search"
					class="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
					>Search Photos</router-link
				>
			</li>
		</ul>
	</nav>
</template>

<style scoped>
	ul {
		list-style: none;
	}
</style>