import { useRef, useEffect } from "react";

function Card3D({ image }) {
	const cardRef = useRef(null);

	useEffect(() => {
		const card = cardRef.current;
		const handleMouseMove = (e) => {
			const rect = card.getBoundingClientRect();
			const x = (e.clientX - rect.left) / rect.width - 0.5;
			const y = (e.clientY - rect.top) / rect.height - 0.5;
			card.style.transform = `perspective(1000px) rotateY(${x * 20}deg) rotateX(${-y * 20}deg) scale(1.05)`;
		};
		const handleMouseLeave = () => {
			card.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)`;
		};
		card.addEventListener("mousemove", handleMouseMove);
		card.addEventListener("mouseleave", handleMouseLeave);
		return () => {
			card.removeEventListener("mousemove", handleMouseMove);
			card.removeEventListener("mouseleave", handleMouseLeave);
		};
	}, []);

	return (
		<div
			ref={cardRef}
			className="rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/20"
			style={{
				width: 340,
				height: 420,
				transition: "transform 0.1s ease-out",
			}}
		>
			<img
				src={image}
				alt="Mudassir Siddiqui"
				className="w-full h-full object-cover"
			/>
		</div>
	);
}
