<!-- eslint-disable vue/multi-word-component-names -->

<script lang="ts">
	type Puzzle = {
		id: string;
		image: string;
		title: string;
	};

	type Puzzles = {
		puzzles: Puzzle[];
	};

	export default {
		data(): Puzzles {
			return {
				puzzles: [
					{ id: "cut-pink", image: "pink.jpg", title: "Pink Flower" },
					{ id: "cut-purple", image: "purple.jpg", title: "Purple Flower" },
					{ id: "cut-red", image: "red.jpg", title: "Red Flower" }
				]
			};
		},
		methods: {
			selectPuzzle(puzzle: Puzzle) {
				this.$emit("puzzle-changed", puzzle.id);
			},
			getImgUrl(imageName: string) {
				return new URL(`../assets/${imageName}`, import.meta.url).href;
			}
		}
	};
</script>

<template>
	<div>
		<h1 class="mb-5 mt-5">Select a Puzzle</h1>
		<div v-for="puzzle of puzzles" :key="puzzle.id" class="d-flex flex-row justify-content-between align-items-center pb-2">
			<div>
				<img :src="getImgUrl(puzzle.image)" class="image" />
			</div>
			<div>
				<h2>{{ puzzle.title }}</h2>
			</div>
			<div class="play-button">
				<button @click="selectPuzzle(puzzle)" class="btn btn-secondary">Play</button>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.image {
		width: 140px;
		height: 140px;
		object-fit: cover;
	}
</style>
