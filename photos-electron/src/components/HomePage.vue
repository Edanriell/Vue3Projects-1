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
		data() {
			return {
				photos: []
			};
		},
		methods: {
			async load() {
				const { data } = await axios.get(`${APIURL}/photos`);
				this.photos = data;
			},
			edit(id: string) {
				this.$router.push({ path: `/edit-photo-form/${id}` });
			},
			async deletePhoto(id: string) {
				await axios.delete(`${APIURL}/photos/${id}`);
				this.photos = [];
				this.load();
			}
		},
		beforeMount() {
			this.load();
		}
	};
</script>

<template>
	<div>
		<h1 class="mt-2 mb-2">Photos</h1>
		<button @click="load" class="btn btn-primary mb-5">Refresh</button>
		<div class="row">
			<div>Name</div>
			<div>Photo</div>
			<div>Description</div>
			<div>Actions</div>
		</div>
		<div
			v-for="p of (photos as Photos)"
			class="row"
			:key="p.id">
			<div>
				<img :src="p.photoFile" />
			</div>
			<div>{{ p.name }}</div>
			<div>{{ p.description }}</div>
			<div>
				<button @click="edit(p.id)" class="btn btn-warning">Edit</button>
				<button @click="deletePhoto(p.id)" class="btn btn-danger">Delete</button>
			</div>
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
	}
</style>
