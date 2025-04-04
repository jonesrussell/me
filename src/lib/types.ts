// src/lib/types.ts

export interface EnhancedImage {
	src: string;
	width: number;
	height: number;
	format: string;
	blurDataURL?: string;
	blurWidth?: number;
	blurHeight?: number;
	placeholder?: string;
	fallback?: string;
	aspectRatio?: number;
	loading?: 'eager' | 'lazy';
	decoding?: 'sync' | 'async' | 'auto';
}
