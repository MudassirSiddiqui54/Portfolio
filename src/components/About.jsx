import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Calendar, Sparkles } from "lucide-react";
import Particles from "@/components/ui/Particles";

gsap.registerPlugin(ScrollTrigger);

function Card3D() {
	const cardRef = useRef(null);
	const imgRef = useRef(null);
	const range = 20;

	useEffect(() => {
		const card = cardRef.current;

		const handleMouseMove = (e) => {
			const rect = card.getBoundingClientRect();
			const x = (e.clientX - rect.left) / rect.width;
			const y = (e.clientY - rect.top) / rect.height;
			const xVal = (x * range - range / 2).toFixed(1);
			const yVal = (y * range - range / 2).toFixed(1);
			card.style.transform = `perspective(1200px) rotateX(${-yVal}deg) rotateY(${xVal}deg)`;
			imgRef.current.style.transform = `translateX(${-xVal * 0.8}px) translateY(${yVal * 0.8}px)`;
		};

		const handleMouseLeave = () => {
			card.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg)`;
			imgRef.current.style.transform = `translateX(0px) translateY(0px)`;
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
			className="relative rounded-2xl border border-white/10 shadow-2xl shadow-cyan-500/10 overflow-hidden"
			style={{
				width: 300,
				transformStyle: "preserve-3d",
				transition: "transform 0.1s ease-out",
				background: "linear-gradient(135deg, #0a0a1a 0%, #060010 100%)",
			}}
		>
			{/* Image area */}
			<div className="relative overflow-hidden" style={{ height: 300 }}>
				{/* Background */}
				<div
					className="absolute inset-0 z-0"
					style={{
						filter: "blur(5px)",
						backgroundImage: `url(/src/assets/aboutbg.png)`,
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
				/>
				{/* Foreground */}
				<img
					ref={imgRef}
					src="/src/assets/about.png"
					alt="Mudassir"
					className="absolute inset-0 w-full h-full object-cover z-10"
					style={{ transition: "transform 0.1s ease-out" }}
					draggable={false}
				/>
				{/* Gradient overlay */}
				<div className="absolute inset-0 z-20 bg-gradient-to-t from-[#060010] to-transparent" />
			</div>

			{/* Info below image */}
			<div
				className="px-6 py-5 flex flex-col gap-3"
				style={{ transform: "translateZ(20px)" }}
			>
				<div>
					<h3 className="text-white text-lg font-bold">
						Mudassir Siddiqui
					</h3>
					<p className="text-cyan-400 font-mono text-sm">
						AI & Data Science
					</p>
				</div>

				<div className="flex flex-col gap-2">
					<span className="flex items-center gap-2 text-gray-400 text-sm">
						<MapPin size={13} className="text-cyan-400" />
						Thane, India
					</span>
					<span className="flex items-center gap-2 text-gray-400 text-sm">
						<Calendar size={13} className="text-cyan-400" />
						B.Tech 2025–2028
					</span>
				</div>

				{/* Traits */}
				<div className="flex flex-wrap gap-2 mt-1">
					{["Problem Solver", "Quick Learner", "Creative"].map(
						(trait) => (
							<span
								key={trait}
								className="px-2 py-1 rounded-full text-xs font-mono border border-cyan-400/20 text-cyan-400/70 bg-cyan-400/5"
							>
								{trait}
							</span>
						),
					)}
				</div>
			</div>
		</div>
	);
}

export default function About() {
	const textRef = useRef(null);
	const photoRef = useRef(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						gsap.to(entry.target, {
							opacity: 1,
							x: 0,
							duration: 0.8,
							delay: 0.5,
							ease: "power1.out",
						});
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.1 },
		);

		if (photoRef.current) {
			gsap.set(photoRef.current, { opacity: 0, x: -40 });
			observer.observe(photoRef.current);
		}
		if (textRef.current) {
			gsap.set(textRef.current, { opacity: 0, x: 40 });
			observer.observe(textRef.current);
		}

		return () => observer.disconnect();
	}, []);

	return (
		<section
			id="about"
			className="relative w-full min-h-screen flex items-center overflow-hidden py-32"
		>
			{/* Top blend from Hero */}
			<div
				className="absolute top-0 left-0 w-full h-32 z-10 pointer-events-none"
				style={{
					background:
						"linear-gradient(to bottom, #060010, transparent)",
				}}
			/>

			{/* Particle background */}
			<div className="absolute inset-0 z-0">
				<Particles />
			</div>

			{/* Bottom blend to next section */}
			<div
				className="absolute bottom-0 left-0 w-full h-32 z-10 pointer-events-none"
				style={{
					background: "linear-gradient(to top, #060010, transparent)",
				}}
			/>

			{/* Content */}
			<div className="relative z-20 w-full max-w-6xl mx-auto px-8 flex flex-col md:flex-row items-center gap-56">
				{/* Left — Photo with 3D hover + decay */}
				<div ref={photoRef} className="flex-shrink-0 opacity-0">
					<Card3D />
				</div>

				{/* Right — Text */}
				<div ref={textRef} className="flex flex-col gap-6 opacity-0">
					{/* Section label */}
					<p className="text-cyan-400 text-sm tracking-[0.3em] uppercase font-mono">
						About Me
					</p>

					{/* Heading */}
					<h2 className="text-white text-4xl md:text-5xl font-bold leading-tight">
						Passionate about <br />
						<span className="text-transparent bg-clip-text bg-gradient-to-br from-[#141e3a] via-[#6b5cff] to-[#141e3a]">
							building things
						</span>
					</h2>

					{/* Bio */}
					<p className="text-gray-400 text-base leading-relaxed max-w-lg">
						I'm a second-year Engineering student at KJ Somaiya
						Institute of Technology, specializing in Artificial
						Intelligence and Data Science. I have a strong passion
						for coding, full-stack web development, and solving
						challenging problems on LeetCode. I enjoy building
						applications that are not only functional but also
						thoughtfully designed — bridging the gap between
						intelligent systems and intuitive user experiences. When
						I'm not writing code, I'm exploring new technologies in
						the ML and AI space, always looking for the next problem
						worth solving.
					</p>

					{/* Quick stats */}
					<div className="flex gap-8 mt-2">
						<div>
							<p className="text-cyan-400 text-2xl font-bold">
								2+
							</p>
							<p className="text-gray-500 text-sm">
								Years Coding
							</p>
						</div>
						<div>
							<p className="text-cyan-400 text-2xl font-bold">
								10+
							</p>
							<p className="text-gray-500 text-sm">
								Projects Built
							</p>
						</div>
						<div>
							<p className="text-cyan-400 text-2xl font-bold">
								AI/DS
							</p>
							<p className="text-gray-500 text-sm">
								Specialization
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
