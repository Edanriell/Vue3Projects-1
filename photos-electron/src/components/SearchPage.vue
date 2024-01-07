<script lang="ts">
	import axios from "axios";
	import { APIURL } from "../constant";

	type Photo = {
		id: string;
		photoFile: string;
		name: string;
		description: string;
	};

	type Photos = Array<Photo>;

	export default {
		name: "SearchPage",
		data() {
			return {
				keyword: "",
				photos: []
			};
		},
		methods: {
			async search() {
				const { data } = await axios.get(
					`${APIURL}/photos?name_like=${this.$route.query.q}`
				);
				this.photos = data;
			},
			submit() {
				console.log(this.keyword);
				this.$router.push({ path: "/search", query: { q: this.keyword } });
			}
		},
		watch: {
			$route: {
				immediate: true,
				handler() {
					this.keyword = this.$route.query.q as any;
					this.search();
				}
			}
		}
	};
</script>

<template>
	<div>
		<h1 class="mb-4">Search</h1>
		<form @submit.prevent="submit">
			<div>
				<label for="name" class="mb-1">Keyword</label>
				<br />
				<input
					type="text"
					v-model="keyword"
					name="keyword"
					id="keyword"
					class="form-control" />
			</div>
			<div class="mt-4">
				<input
					type="submit"
					value="Search"
					class="btn btn-primary" />
			</div>
		</form>
		<div
			v-for="p of (photos as Photos)"
			class="row"
			:key="p.id">
			<div>
				<img :src="p.photoFile" />
			</div>
			<div>{{ p.name }}</div>
			<div>{{ p.description }}</div>
		</div>
	</div>
</template>

<style scoped>
	.row {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.row div {
		width: 25%;
	}

	.row img {
		width: 100px;
		object-fit: contain;
		border-radius: 5px;
	}
</style>
