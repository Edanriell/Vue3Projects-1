export default {
	methods: {
		getStarName(rate: number) {
			if (rate <= (this as any).rating) {
				return "star";
			}
			if (Math.fround(rate - (this as any).rating) < 1) {
				return "star_half";
			}
			return "star_border";
		}
	}
};
