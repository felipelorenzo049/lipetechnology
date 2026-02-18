'use client';
import type React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type GradientBackgroundProps = React.ComponentProps<'div'> & {
	gradients?: string[];
	animationDuration?: number;
	animationDelay?: number;
	enableCenterContent?: boolean;
	overlay?: boolean;
	overlayOpacity?: number;
};

const Default_Gradients = [
	"linear-gradient(135deg, hsl(216 33% 10%) 0%, hsl(220 78% 35%) 50%, hsl(168 55% 30%) 100%)",
	"linear-gradient(135deg, hsl(220 78% 30%) 0%, hsl(216 33% 10%) 50%, hsl(20 100% 30%) 100%)",
	"linear-gradient(135deg, hsl(168 55% 25%) 0%, hsl(220 78% 32%) 50%, hsl(216 33% 10%) 100%)",
	"linear-gradient(135deg, hsl(216 33% 10%) 0%, hsl(20 80% 28%) 50%, hsl(220 78% 30%) 100%)",
	"linear-gradient(135deg, hsl(220 78% 28%) 0%, hsl(168 55% 28%) 50%, hsl(216 33% 10%) 100%)",
];

export function GradientBackground({
	children,
	className = '',
	gradients = Default_Gradients,
	animationDuration = 8,
	animationDelay = 0.5,
	overlay = false,
	overlayOpacity = 0.3,
}: GradientBackgroundProps) {
	return (
		<div className={cn('relative overflow-hidden', className)}>
			{/* Animated gradient background */}
			<motion.div
				className="absolute inset-0 w-full h-full"
				animate={{
					background: gradients,
				}}
				transition={{
					duration: animationDuration,
					repeat: Infinity,
					repeatType: 'reverse',
					ease: 'easeInOut',
					delay: animationDelay,
				}}
			/>

			{/* Optional overlay */}
			{overlay && (
				<div
					className="absolute inset-0 w-full h-full bg-black"
					style={{ opacity: overlayOpacity }}
				/>
			)}

			{/* Content wrapper */}
			{children && (
				<div className="relative z-10">
					{children}
				</div>
			)}
		</div>
	);
}
