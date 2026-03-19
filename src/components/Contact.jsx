import { useRef, useEffect } from "react";
import gsap from "gsap";
import {
	FaGithub,
	FaLinkedinIn,
	FaInstagram,
	FaWhatsapp,
} from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { LaserFlow } from "@/components/ui/LaserFlow";

const LINKS = [
	{
		icon: <SiGmail size={28} />,
		label: "Gmail",
		sub: "mudassirsid54@gmail.com",
		href: "https://mail.google.com/mail/?view=cm&to=mudassirsid54@gmail.com&su=Hello Mudassir&body=Hi, I found your portfolio and wanted to reach out!",
		color: "#EA4335",
		glow: "rgba(234, 67, 53, 0.15)",
	},
	{
		icon: <FaLinkedinIn size={28} />,
		label: "LinkedIn",
		sub: "mudassir-siddiqui",
		href: "https://www.linkedin.com/in/mudassir-siddiqui-9a3b37256/",
		color: "#0A66C2",
		glow: "rgba(10, 102, 194, 0.15)",
	},
	{
		icon: <FaGithub size={28} />,
		label: "GitHub",
		sub: "MudassirSiddiqui54",
		href: "https://github.com/MudassirSiddiqui54",
		color: "#ffffff",
		glow: "rgba(255, 255, 255, 0.1)",
	},
	{
		icon: <FaInstagram size={28} />,
		label: "Instagram",
		sub: "@mudassir_sid2006",
		href: "https://www.instagram.com/mudassir_sid2006/",
		color: "#E1306C",
		glow: "rgba(225, 48, 108, 0.15)",
	},
	{
		icon: <FaWhatsapp size={28} />,
		label: "WhatsApp",
		sub: "+91 98672 10504",
		href: "https://wa.me/919867210504?text=Hii",
		color: "#25D366",
		glow: "rgba(37, 211, 102, 0.15)",
	},
];

export default function Contact() {
	const leftRef = useRef(null);
	const rightRef = useRef(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						gsap.to(entry.target, {
							opacity: 1,
							x: 0,
							duration: 0.8,
							ease: "power3.out",
						});
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.1 },
		);

		if (leftRef.current) {
			gsap.set(leftRef.current, { opacity: 0, x: -40 });
			observer.observe(leftRef.current);
		}
		if (rightRef.current) {
			gsap.set(rightRef.current, { opacity: 0, x: 40 });
			observer.observe(rightRef.current);
		}

		return () => observer.disconnect();
	}, []);

	return (
		<>
			<section
				id="contact"
				className="relative w-full pt-32 pb-8 overflow-hidden"
			>
				{/* Top blend */}
				<div
					className="absolute top-0 left-0 w-full h-32 z-10 pointer-events-none"
					style={{
						background:
							"linear-gradient(to bottom, #060010, transparent)",
					}}
				/>

				{/* LaserFlow background */}
				<div className="absolute inset-0 z-0 opacity-50">
					<LaserFlow
						color="#6b5cff"
						verticalSizing={10}
						horizontalSizing={2.5}
						fogIntensity={0.2}
						wispIntensity={5}
						wispDensity={0.5}
						horizontalBeamOffset={0}
						verticalBeamOffset={-0.5}
						decay={1.2}
					/>
				</div>

				{/* Content */}
				<div className="relative z-20 max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-8">
					{/* Left — text */}
					<div ref={leftRef} className="flex flex-col gap-6 flex-1">
						<p className="text-cyan-400 text-sm tracking-[0.3em] uppercase font-mono">
							Get in touch
						</p>
						<h2 className="text-white text-4xl md:text-5xl font-bold leading-tight">
							Let's{" "}
							<span className="text-transparent bg-clip-text bg-gradient-to-br from-[#141e3a] via-[#6b5cff] to-[#141e3a]">
								Connect
							</span>
						</h2>
						<p className="text-gray-400 text-base leading-relaxed max-w-md">
							I'm always open to new opportunities,
							collaborations, or just a good conversation about
							tech. Feel free to reach out through any of the
							platforms on the right.
						</p>
						<div className="flex flex-col gap-2 mt-2">
							<p className="text-gray-500 font-mono text-sm">
								📞 +91 98672 10504
							</p>
							<p className="text-gray-500 font-mono text-sm">
								✉️ mudassirsid54@gmail.com
							</p>
						</div>
					</div>

					{/* Vertical divider — desktop only */}
					<div className="hidden lg:block w-px self-stretch bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent" />

					{/* Right — social cards */}
					<div ref={rightRef} className="flex flex-col gap-3 flex-1">
						{LINKS.map((link, i) => (
							<a
								key={i}
								href={link.href}
								target="_blank"
								rel="noopener noreferrer"
								className="no-underline group"
							>
								<div className="flex items-center gap-4 px-5 py-4 rounded-xl border border-white/5 transition-all duration-300 group-hover:border-white/15 group-hover:bg-white/5 group-hover:translate-x-1">
									{/* Icon */}
									<div
										className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
										style={{
											color: link.color,
											background: link.glow,
										}}
									>
										{link.icon}
									</div>

									{/* Text */}
									<div className="flex flex-col">
										<p className="text-white text-sm font-semibold">
											{link.label}
										</p>
										<p className="text-gray-500 text-xs font-mono group-hover:text-gray-400 transition-colors duration-200">
											{link.sub}
										</p>
									</div>

									{/* Arrow */}
									<div className="ml-auto text-gray-600 group-hover:text-gray-400 group-hover:translate-x-1 transition-all duration-300">
										→
									</div>
								</div>
							</a>
						))}
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="relative w-full bg-[#060010]">
				{/* Top border gradient */}
				<div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

				<div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
					{/* Left — name */}
					<p className="text-gray-500 font-mono text-sm">
						<span className="text-violet-300 font-bold">
							Mudassir Siddiqui
						</span>{" "}
					</p>

					{/* Center — copyright */}
					<p className="text-gray-600 text-xs font-mono">
						© {new Date().getFullYear()} · Built with React & GSAP
					</p>

					{/* Right — quick links */}
					<div className="flex gap-4">
						{[
							{
								icon: <FaGithub size={16} />,
								href: "https://github.com/MudassirSiddiqui54",
							},
							{
								icon: <FaLinkedinIn size={16} />,
								href: "https://www.linkedin.com/in/mudassir-siddiqui-9a3b37256/",
							},
							{
								icon: <FaInstagram size={16} />,
								href: "https://www.instagram.com/mudassir_sid2006/",
							},
						].map((item, i) => (
							<a
								key={i}
								href={item.href}
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-500 hover:text-cyan-400 transition-colors duration-200"
							>
								{item.icon}
							</a>
						))}
					</div>
				</div>
			</footer>
		</>
	);
}
