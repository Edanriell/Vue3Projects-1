<!-- eslint-disable vue/multi-word-component-names -->

<script lang="ts">
	import axios from "axios";
	import { APIURL } from "@/constants";
	import TopBar from "../components/TopBar.vue";
	import CatalogForm from "../components/CatalogForm.vue";

	export default {
		name: "Catalog",
		components: {
			TopBar,
			CatalogForm
		},
		data() {
			return {
				catalog: [],
				displayCatalog: false
			};
		},
		methods: {
			async getCatalog() {
				const { data } = await axios.get(`${APIURL}/catalog`);
				this.catalog = data;
			},
			async deleteCatalogItem(id: string) {
				await axios.delete(`${APIURL}/catalog/${id}`);
				this.getCatalog();
			}
		},
		beforeMount() {
			this.getCatalog();
		}
	};
</script>

<template>
	<TopBar title="Manage Vacation Packages" />
	<div class="p-col-12">
		<h1>Manage Vacation Packages</h1>
	</div>
	<div class="p-col-12">
		<Button label="Add Vacation Package" @click="displayCatalog = true" />
		<Dialog header="Add Vacation Package" v-model:visible="displayCatalog">
			<CatalogForm
				@catalog-form-close="
					displayCatalog = false;
					getCatalog();
				"
			/>
		</Dialog>
	</div>
	<div class="p-col-12">
		<Card v-for="c of (catalog as any)" :key="c.id">
			<template #header>
				<img :alt="c.description" :src="c.image_url" style="width: 400px; border-radius: 5px; object-fit: contain;" />
			</template>
			<template #title> {{ c.name }} </template>
			<template #content>
				{{ c.description }}
			</template>
			<template #footer>
				<Button
					icon="pi pi-times"
					label="Delete"
					class="p-button-secondary"
					@click="deleteCatalogItem(c.id)"
				/>
			</template>
		</Card>
	</div>
</template>
