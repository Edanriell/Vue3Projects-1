<!-- eslint-disable vue/multi-word-component-names -->

<script lang="ts">
	export default {
		data() {
			return {
				records: []
			};
		},
		created() {
			this.getRecords();
		},
		methods: {
			getRecords() {
				const records = JSON.parse(localStorage.getItem("records")!) || [];
				this.records = records;
			}
		}
	};
</script>

<template>
	<div class="mb-5 mt-5">
		<h1 class="mb-2">Records</h1>
		<button @click="getRecords" class="btn btn-secondary">Refresh</button>
		<div
			v-for="(r, index) of records"
			:key="index">
			{{ index + 1 }} - {{ (r as any).elapsedTime }}
		</div>
	</div>
</template>
