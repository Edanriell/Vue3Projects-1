<script lang="ts">
	import { defineAsyncComponent } from "vue";

	const StarRating = defineAsyncComponent(() => import("./components/StarRating.vue"));
	const MaterialButton = defineAsyncComponent(() => import("./components/MaterialButton.vue"));
	const MaterialCardBox = defineAsyncComponent(() => import("./components/MaterialCardBox.vue"));

	export default {
		name: "App",
		components: {
			StarRating,
			MaterialButton,
			MaterialCardBox
		},
		methods: {
			resetVote() {
				(this as any).$refs.starRating.rank = 0;
				(this as any).$refs.starRating.voted = false;
			},
			forceVote() {
				(this as any).$refs.starRating.rank = 5;
				(this as any).$refs.starRating.voted = true;
			}
		}
	};
</script>

<template>
	<div id="app">
		<MaterialCardBox
			header="Material Card Header"
			sub-header="Card Sub Header"
			show-media
			show-actions
			img-src="https://picsum.photos/300/200"
		>
			<p>
				<StarRating ref="starRating" />
			</p>
			<p>
				The path of the righteous man is beset on all sides by the iniquities of the selfish and the
				tyranny of evil men.
			</p>
			<template v-slot:action>
				<MaterialButton background-color="#027be3" text-color="#fff" @click="resetVote">
					Reset
				</MaterialButton>
				<MaterialButton background-color="#26a69a" text-color="#fff" is-flat @click="forceVote">
					Rate 5 Stars
				</MaterialButton>
			</template>
		</MaterialCardBox>
	</div>
</template>

<style>
	body {
		font-size: 14px;
	}
</style>
