interface EnhancedImage {
	sources: {
		'image/webp': string;
		'image/jpeg': string;
	};
	img: {
		src: string;
		width: number;
		height: number;
		alt: string;
	};
}

declare module '*.jpeg?enhanced' {
	const value: EnhancedImage;
	export default value;
}

declare module '*.jpg?enhanced' {
	const value: EnhancedImage;
	export default value;
}

declare module '*.png?enhanced' {
	const value: EnhancedImage;
	export default value;
}

declare module '*.gif?enhanced' {
	const value: EnhancedImage;
	export default value;
}

declare module '*.webp?enhanced' {
	const value: EnhancedImage;
	export default value;
}

declare module '*.svg?enhanced' {
	const value: EnhancedImage;
	export default value;
}
