<script lang="ts">
	import axios from "axios";
	import { APIURL } from "../constant";

	export default {
		name: "PhotoForm",
		data() {
			return {
				form: {
					name: "",
					description: "",
					dateTaken: "",
					photoFile: undefined
				}
			};
		},
		methods: {
			async submit() {
				const { name, description, dateTaken, photoFile } = this.form;
				if (!name || !description || !dateTaken || !photoFile) {
					alert("All fields are required");
					return;
				}
				const { id } = this.$route.params;
				if (id) {
					await axios.put(`${APIURL}/photos/${id}`, this.form);
				} else {
					await axios.post(`${APIURL}/photos`, this.form);
				}
				this.$router.push("/");
			},
			onChange(ev: any) {
				const reader = new FileReader();
				reader.readAsDataURL(ev.target.files[0]);
				reader.onload = () => {
					this.form.photoFile = reader.result as any;
				};
			}
		},
		async beforeMount() {
			const { id } = this.$route.params;
			if (id) {
				const { data } = await axios.get(`${APIURL}/photos/${id}`);
				this.form = data;
			}
		}
	};
</script>

<template>
	<div>
		<h1 class="mb-4">{{ $route.params.id ? "Edit" : "Add" }} Photo</h1>
		<form @submit.prevent="submit">
			<div class="mb-2">
				<label for="name" class="mb-1">Name</label>
				<br />
				<input
					type="text"
					v-model="form.name"
					name="name"
					id="name"
					class="form-control" />
			</div>
			<div class="mb-2">
				<label for="dscription" class="mb-1">Description</label>
				<br />
				<textarea
					v-model="form.description"
					name="description"
					id="description"
					class="form-control"></textarea>
			</div>
			<div class="mb-2">
				<label for="dateTaken" class="mb-1">Date Taken</label>
				<br />
				<input
					type="datetime-local"
					name="dateTaken"
					id="dateTaken"
					class="form-control"
					v-model="form.dateTaken" />
			</div>
			<div class="mb-2">
				<label for="photoFile" class="mb-1">Photo</label>
				<br />
				<input
					type="file"
					name="photoFile"
					class="form-control"
					id="photoFile"
					@change="onChange" />
				<br />
				<img
					:src="form.photoFile"
					id="photo-preview"
					class="mb-2" />
			</div>
			<div class="mb-5">
				<input type="submit" class="btn btn-success" />
			</div>
		</form>
	</div>
</template>

<style scoped>
	#photo-preview {
		width: 200px;
		object-fit: contain;
		border-radius: 5px;
	}
</style>
