import { useRef, useEffect } from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import SpotlightCard from "@/components/ui/SpotlightCard";

const PROJECTS = [
	{
		number: "01",
		title: "Animated Frontend Website",
		description:
			"A visually stunning frontend inspired by Zentry's Awwwwards-winning website. Built with React and GSAP for buttery smooth animations and immersive transitions.",
		tags: ["React", "GSAP"],
		live: "https://mudassirsiddiqui54.github.io/Animated_Frontend_Website/",
		github: "https://github.com/MudassirSiddiqui54/Animated_Frontend_Website",
		color: "#00f5ff",
		bg: "linear-gradient(135deg, #0a1628 0%, #060010 100%)",
	},
	{
		number: "02",
		title: "SSK Enterprises",
		description:
			"Professional website for a Data Center & Cooling Infrastructure company. Clean, corporate React frontend deployed and live.",
		tags: ["React"],
		live: "https://mudassirsiddiqui54.github.io/SSK-Enterprises/",
		github: "https://github.com/MudassirSiddiqui54/SSK-Enterprises",
		color: "#bf00ff",
		bg: "linear-gradient(135deg, #120a28 0%, #060010 100%)",
	},
	{
		number: "03",
		title: "Car Inventory Management",
		description:
			"Frontend application built for small car dealers to take their businesses online. Contributed to UI and core inventory features.",
		tags: ["HTML", "CSS", "JavaScript"],
		live: "https://hardiksedani.github.io/COLLEGEPROJECT1/",
		github: "https://github.com/hardiksedani/COLLEGEPROJECT1",
		color: "#00ff88",
		bg: "linear-gradient(135deg, #0a1a10 0%, #060010 100%)",
	},
	{
		number: "04",
		title: "CyberShield",
		description:
			"Desktop application that scans websites for security vulnerabilities and uses GenAI to explain fixes in simple steps. Built with Python and Electron.",
		tags: ["Python", "Electron", "GenAI", "React"],
		live: null,
		github: "https://github.com/hardiksedani/CYBERSHEILD",
		color: "#ff4444",
		bg: "linear-gradient(135deg, #1a0a0a 0%, #060010 100%)",
		image: "/src/assets/cybershield.png",
	},
	{
		number: "05",
		title: "ProjectCamp",
		description:
			"Full stack project management system for managing projects and tasks. Built with the MERN stack — MongoDB, Express, React, and Node.js.",
		tags: ["MongoDB", "Express", "React", "Node.js"],
		live: "https://projectcamp-phi.vercel.app/",
		github: "https://github.com/MudassirSiddiqui54/Project-Management-System-frontend",
		color: "#f5a623",
		bg: "linear-gradient(135deg, #1a1200 0%, #060010 100%)",
	},
];

export default function Projects() {
	const sliderRef = useRef(null);
	const isDragging = useRef(false);
	const startX = useRef(0);
	const scrollLeft = useRef(0);

	useEffect(() => {
		const slider = sliderRef.current;
		if (!slider) return;

		const onMouseDown = (e) => {
			isDragging.current = true;
			startX.current = e.pageX - slider.offsetLeft;
			scrollLeft.current = slider.scrollLeft;
			slider.style.cursor = "grabbing";
		};

		const onMouseLeave = () => {
			isDragging.current = false;
			slider.style.cursor = "grab";
		};

		const onMouseUp = () => {
			isDragging.current = false;
			slider.style.cursor = "grab";
		};

		const onMouseMove = (e) => {
			if (!isDragging.current) return;
			e.preventDefault();
			const x = e.pageX - slider.offsetLeft;
			const walk = (x - startX.current) * 1.5;
			slider.scrollLeft = scrollLeft.current - walk;
		};

		// Touch support
		const onTouchStart = (e) => {
			startX.current = e.touches[0].pageX - slider.offsetLeft;
			scrollLeft.current = slider.scrollLeft;
		};

		const onTouchMove = (e) => {
			const x = e.touches[0].pageX - slider.offsetLeft;
			const walk = (x - startX.current) * 1.5;
			slider.scrollLeft = scrollLeft.current - walk;
		};

		slider.addEventListener("mousedown", onMouseDown);
		slider.addEventListener("mouseleave", onMouseLeave);
		slider.addEventListener("mouseup", onMouseUp);
		slider.addEventListener("mousemove", onMouseMove);
		slider.addEventListener("touchstart", onTouchStart, { passive: true });
		slider.addEventListener("touchmove", onTouchMove, { passive: true });

		return () => {
			slider.removeEventListener("mousedown", onMouseDown);
			slider.removeEventListener("mouseleave", onMouseLeave);
			slider.removeEventListener("mouseup", onMouseUp);
			slider.removeEventListener("mousemove", onMouseMove);
			slider.removeEventListener("touchstart", onTouchStart);
			slider.removeEventListener("touchmove", onTouchMove);
		};
	}, []);

	return (
		<section
			id="projects"
			className="relative w-full py-32 overflow-hidden"
		>
			{/* Top blend */}
			<div
				className="absolute top-0 left-0 w-full h-32 z-10 pointer-events-none"
				style={{
					background:
						"linear-gradient(to bottom, #060010, transparent)",
				}}
			/>

			{/* Bottom blend */}
			<div
				className="absolute bottom-0 left-0 w-full h-32 z-10 pointer-events-none"
				style={{
					background: "linear-gradient(to top, #060010, transparent)",
				}}
			/>

			{/* Header */}
			<div className="relative z-20 text-center mb-12 px-6">
				<p className="text-cyan-400 text-sm tracking-[0.3em] uppercase font-mono mb-3">
					What I've built
				</p>
				<h2 className="text-white text-4xl md:text-5xl font-bold">
					My{" "}
					<span className="text-transparent bg-clip-text bg-gradient-to-br from-[#141e3a] via-[#6b5cff] to-[#141e3a]">
						Projects
					</span>
				</h2>
				<p className="text-gray-600 text-xs font-mono mt-4 tracking-widest">
					← drag to explore →
				</p>
			</div>

			{/* Horizontal scroll container */}
			<div
				ref={sliderRef}
				className="relative z-20 flex gap-6 overflow-x-auto pb-8 px-12"
				style={{
					cursor: "grab",
					scrollbarWidth: "none",
					msOverflowStyle: "none",
					WebkitOverflowScrolling: "touch",
				}}
			>
				{/* Hide scrollbar */}
				<style>{`.projects-slider::-webkit-scrollbar { display: none; }`}</style>

				{PROJECTS.map((project, i) => (
					<div
						key={i}
						className="flex-shrink-0 rounded-[32px] overflow-hidden"
						style={{
							background: project.bg,
							width: "380px",
							minHeight: "480px",
							border: `1px solid ${project.color}33`,
							boxShadow: `0 0 20px ${project.color}15`,
						}}
					>
						<SpotlightCard
							className="w-full h-full p-8 flex flex-col justify-between gap-6 select-none"
							spotlightColor={project.color + "33"}
						>
							<div
								className="absolute top-0 left-0 w-full h-[2px]"
								style={{
									background: `linear-gradient(to right, ${project.color}, transparent)`,
								}}
							/>
							{/* Top — number + title */}
							<div className="flex flex-col gap-3">
								<span
									className="font-mono text-5xl font-bold opacity-10 leading-none"
									style={{ color: project.color }}
								>
									{project.number}
								</span>
								<h3 className="text-white text-xl font-bold leading-tight">
									{project.title}
								</h3>
								<p className="text-gray-400 text-sm leading-relaxed">
									{project.description}
								</p>
							</div>

							{/* Image if available */}
							{project.image && (
								<img
									src={project.image}
									alt={project.title}
									className="rounded-xl object-cover w-full border border-white/10"
									style={{
										maxHeight: "160px",
										objectFit: "cover",
									}}
									draggable={false}
								/>
							)}

							{/* Bottom — tags + links */}
							<div className="flex flex-col gap-4">
								<div className="flex flex-wrap gap-2">
									{project.tags.map((tag, j) => (
										<span
											key={j}
											className="px-3 py-1 rounded-full text-xs font-mono border"
											style={{
												color: project.color,
												borderColor:
													project.color + "33",
												background:
													project.color + "11",
											}}
										>
											{tag}
										</span>
									))}
								</div>

								<div className="flex gap-3">
									{project.live && (
										<a
											href={project.live}
											target="_blank"
											rel="noopener noreferrer"
											onClick={(e) => e.stopPropagation()}
											className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono transition-all duration-200 hover:-translate-y-0.5"
											style={{
												background:
													project.color + "22",
												color: project.color,
												border: `1px solid ${project.color}44`,
											}}
										>
											<FaExternalLinkAlt size={10} />
											Live Demo
										</a>
									)}
									<a
										href={project.github}
										target="_blank"
										rel="noopener noreferrer"
										onClick={(e) => e.stopPropagation()}
										className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono text-gray-400 border border-white/10 hover:border-white/25 hover:text-white transition-all duration-200 hover:-translate-y-0.5"
									>
										<FaGithub size={10} />
										GitHub
									</a>
								</div>
							</div>
						</SpotlightCard>
					</div>
				))}

				{/* End padding */}
				<div className="flex-shrink-0 w-12" />
			</div>

			{/* Left fade */}
			<div
				className="absolute left-0 top-0 h-full w-24 z-30 pointer-events-none"
				style={{
					background:
						"linear-gradient(to right, #060010, transparent)",
				}}
			/>

			{/* Right fade */}
			<div
				className="absolute right-0 top-0 h-full w-24 z-30 pointer-events-none"
				style={{
					background:
						"linear-gradient(to left, #060010, transparent)",
				}}
			/>
		</section>
	);
}
