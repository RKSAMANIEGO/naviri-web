import confetti from "canvas-confetti";
export const lanzarConfetti = () => {
	confetti({
		particleCount: 100,
		spread: 160,
		origin: { y: 0.6 },
	});
};
