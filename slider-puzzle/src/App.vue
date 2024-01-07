<script lang="ts">
	import SliderPuzzle from "./components/SliderPuzzle.vue";
	import Puzzles from "./components/Puzzles.vue";
	import Records from "./components/Records.vue";

	export default {
		name: "App",
		components: {
			SliderPuzzle,
			Puzzles,
			Records
		},
		data() {
			return {
				selectedPuzzleId: "cut-pink"
			};
		}
	};
</script>

<template>
	<div class="container">
		<Puzzles @puzzle-changed="selectedPuzzleId = $event" />
		<Records />
		<SliderPuzzle :puzzleId="selectedPuzzleId" />
	</div>
</template>
