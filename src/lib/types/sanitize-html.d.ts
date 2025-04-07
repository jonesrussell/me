declare module 'sanitize-html' {
	interface SanitizeOptions {
		allowedTags?: string[];
		allowedAttributes?: { [key: string]: string[] };
		allowedStyles?: { [key: string]: { [key: string]: string[] } };
		allowedClasses?: { [key: string]: string[] };
		allowedSchemes?: string[];
		allowedSchemesByTag?: { [key: string]: string[] };
		allowedSchemesAppliedToAttributes?: string[];
		allowProtocolRelative?: boolean;
		allowedIframeHostnames?: string[];
		allowedIframeDomains?: string[];
		disallowedTagsMode?: 'discard' | 'escape' | 'recursiveEscape';
		enforceHtmlBoundary?: boolean;
		parseStyleAttributes?: boolean;
		allowVulnerableTags?: boolean;
		exclusiveFilter?: (frame: {
			tag: string;
			attribs: { [key: string]: string };
			text: string;
		}) => boolean;
		nonTextTags?: string[];
		parser?: {
			lowerCaseTags?: boolean;
			lowerCaseAttributeNames?: boolean;
		};
	}

	function sanitize(html: string, options?: SanitizeOptions): string;
	export default sanitize;
}
