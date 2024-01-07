<script lang="ts">
	import moment from "moment";

	const correctPuzzleArray = [
		"image_part_001.jpg",
		"image_part_002.jpg",
		"image_part_003.jpg",
		"image_part_004.jpg",
		"image_part_005.jpg",
		"image_part_006.jpg",
		"image_part_007.jpg",
		"image_part_008.jpg",
		"image_part_009.jpg"
	];

	export default {
		name: "SliderPuzzle",
		props: {
			puzzleId: {
				type: String,
				default: "cut-pink"
			}
		},
		data() {
			return {
				correctPuzzleArray,
				shuffledPuzzleArray: [...correctPuzzleArray].sort(() => Math.random() - 0.5),
				indexesToSwap: [],
				timer: undefined,
				startDateTime: new Date(),
				currentDateTime: new Date()
			};
		},
		computed: {
			isWinning() {
				for (let i = 0; i < correctPuzzleArray.length; i++) {
					if (correctPuzzleArray[i] !== this.shuffledPuzzleArray[i]) {
						return false;
					}
				}
				return true;
			},
			elapsedDiff() {
				const currentDateTime = moment(this.currentDateTime);
				const startDateTime = moment(this.startDateTime);
				return currentDateTime.diff(startDateTime);
			},
			elapsedTime() {
				return moment.utc(this.elapsedDiff).format("HH:mm:ss");
			}
		},
		methods: {
			swap(index: number) {
				if (!this.timer) {
					return;
				}
				if (this.indexesToSwap.length < 2) {
					(this.indexesToSwap as any).push(index);
				}
				if (this.indexesToSwap.length === 2) {
					const [index1, index2] = this.indexesToSwap;
					[this.shuffledPuzzleArray[index1], this.shuffledPuzzleArray[index2]] = [
						this.shuffledPuzzleArray[index2],
						this.shuffledPuzzleArray[index1]
					];
					this.indexesToSwap = [];
				}
			},
			start() {
				this.resetTime();
				this.shuffledPuzzleArray = [...correctPuzzleArray].sort(() => Math.random() - 0.5);
				this.indexesToSwap = [];
				(this.timer as any) = setInterval(() => {
					this.currentDateTime = new Date();
					if (this.isWinning) {
						this.recordSpeedRecords();
						this.stop();
					}
				}, 1000);
			},
			stop() {
				this.resetTime();
				clearInterval(this.timer);
			},
			resetTime() {
				this.startDateTime = new Date();
				this.currentDateTime = new Date();
			},
			recordSpeedRecords() {
				let records = JSON.parse(localStorage.getItem("records")!) || [];
				const { elapsedTime, elapsedDiff } = this;
				records.push({ elapsedTime, elapsedDiff });
				const sortedRecords = records
					.sort((a: any, b: any) => a.elapsedDiff - b.elapsedDiff)
					.slice(0, 10);
				const stringifiedRecords = JSON.stringify(sortedRecords);
				localStorage.setItem("records", stringifiedRecords);
			},
			getImgUrl(imageName: string, index: string) {
				return new URL(`../assets/${imageName}/${index}`, import.meta.url).href;
			}
		}
	};
</script>

<template>
	<div class="mb-5">
		<h1 class="mb-2">Swap the Images to Win</h1>
		<div class="d-flex flex-row align-self-center mb-2 column-gap-2">
			<button @click="start" class="btn btn-secondary" id="start-button">Start Game</button>
			<button @click="stop" class="btn btn-secondary" id="quit-button">Quit</button>
		</div>
		<p class="mb-2">Elapsed Time: {{ elapsedTime }}</p>
		<p v-if="isWinning" class="mb-2">You win</p>
		<div class="row">
			<div class="column" v-for="(s, index) of shuffledPuzzleArray" :key="s" @click="swap(index)">
				<img :src="getImgUrl(puzzleId, s)" />
			</div>
		</div>
	</div>
</template>

<style scoped>
	.row {
		display: flex;
		flex-wrap: wrap;
	}

	.column {
		flex-grow: 1;
		width: 33%;
		padding: 0;
	}

	.column img {
		width: 100%;
		height: auto;
		padding: 2px;
	}
</style>
