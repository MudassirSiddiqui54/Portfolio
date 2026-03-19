import { useState } from "react";
import Dock from "@/components/ui/Dock.jsx";
import {
	House,
	User,
	FolderGit2,
	Wrench,
	Mail,
	GraduationCap,
} from "lucide-react";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Navbar({ startAnimation = false }) {
	const navRef = useRef(null);
	const [activeSection, setActiveSection] = useState("hero");
	const [isNavVisible, setIsNavVisible] = useState(true);
	const lastScrollY = useRef(0);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;

			if (currentScrollY === 0) {
				setIsNavVisible(true);
			} else if (currentScrollY > lastScrollY.current) {
				setIsNavVisible(false);
			} else if (currentScrollY < lastScrollY.current) {
				setIsNavVisible(true);
			}

			lastScrollY.current = currentScrollY;
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []); // ← empty deps, runs once

	useEffect(() => {
		if (isNavVisible) {
			if (navRef.current) {
				navRef.current.style.visibility = "visible";
				navRef.current.style.pointerEvents = "auto";
			}
		}

		gsap.to(navRef.current, {
			y: isNavVisible ? 0 : -100,
			duration: 0.3,
			ease: "power2.out",
			onComplete: () => {
				if (!isNavVisible && navRef.current) {
					navRef.current.style.visibility = "hidden";
					navRef.current.style.pointerEvents = "none";
				}
			},
		});
	}, [isNavVisible]);

	const NAV_ITEMS = [
		{
			id: "hero",
			icon: <House size={18} />,
			label: "Home",
			onClick: () =>
				document
					.getElementById("hero")
					?.scrollIntoView({ behavior: "smooth" }),
		},
		{
			id: "about",
			icon: <User size={18} />,
			label: "About",
			onClick: () =>
				document
					.getElementById("about")
					?.scrollIntoView({ behavior: "smooth" }),
		},
		{
			id: "education",
			icon: <GraduationCap size={18} />,
			label: "Education",
			onClick: () =>
				document
					.getElementById("education")
					?.scrollIntoView({ behavior: "smooth" }),
		},
		{
			id: "skills",
			icon: <Wrench size={18} />,
			label: "Skills",
			onClick: () =>
				document
					.getElementById("skills")
					?.scrollIntoView({ behavior: "smooth" }),
		},
		{
			id: "projects",
			icon: <FolderGit2 size={18} />,
			label: "Projects",
			onClick: () =>
				document.getElementById("projects")?.scrollInto -
				View({ behavior: "smooth" }),
		},

		{
			id: "contact",
			icon: <Mail size={18} />,
			label: "Contact",
			onClick: () =>
				document
					.getElementById("contact")
					?.scrollIntoView({ behavior: "smooth" }),
		},
	];

	useEffect(() => {
		const sections = [
			"hero",
			"about",
			"education",
			"skills",
			"projects",
			"contact",
		];

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveSection(entry.target.id);
					}
				});
			},
			{ threshold: 0.4 },
		);

		sections.forEach((id) => {
			const el = document.getElementById(id);
			if (el) observer.observe(el);
		});

		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		if (!startAnimation) return;

		// Set initial state via GSAP, not CSS
		gsap.set(navRef.current, { y: -80, opacity: 0 });

		gsap.to(navRef.current, {
			y: 0,
			opacity: 1,
			duration: 0.8,
			ease: "power3.out",
			delay: 0.3,
		});
	}, [startAnimation]);

	return (
		<div
			ref={navRef}
			className="fixed top-4 left-1/2 -translate-x-1/2 z-50 opacity-0"
		>
			<div className="hidden md:block">
				<Dock
					items={NAV_ITEMS}
					panelHeight={64}
					dockHeight={64}
					baseItemSize={50}
					magnification={70}
					activeId={activeSection}
				/>
			</div>
			<div className="block md:hidden">
				<Dock
					items={NAV_ITEMS}
					panelHeight={48}
					dockHeight={48}
					baseItemSize={34}
					magnification={48}
					activeId={activeSection}
				/>
			</div>
		</div>
	);
}
