export interface EnhancedImage {
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
	blurDataURL?: string;
	blurWidth?: number;
	blurHeight?: number;
	placeholder?: string;
	fallback?: string;
	aspectRatio?: number;
	loading?: 'eager' | 'lazy';
	decoding?: 'sync' | 'async' | 'auto';
}
