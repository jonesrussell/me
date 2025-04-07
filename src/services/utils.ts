export function sanitizeText(text: string): string {
    return text.replace(/<[^>]*>/g, '').trim();
}

export function truncateDescription(text: string, maxLength = 280): string {
    if (!text || text.length <= maxLength) return text;

    // Try to find a natural sentence break
    const truncated = text.slice(0, maxLength);
    const sentenceMatch = truncated.match(/(.*?[.!?])\s/);

    if (sentenceMatch) {
        return sentenceMatch[1] + '...';
    }

    // If no sentence break found, try to break at a word boundary
    const wordBoundary = truncated.lastIndexOf(' ');
    if (wordBoundary > maxLength * 0.8) { // Only break if we're keeping most of the text
        return truncated.slice(0, wordBoundary) + '...';
    }

    // If we can't find a good break point, just truncate
    return truncated + '...';
}

export function formatDate(dateString: string): string {
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            throw new Error('Invalid date');
        }
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    } catch (error) {
        console.error('Error formatting date:', error);
        return dateString;
    }
}

export function extractFirstMeaningfulParagraph(content: string): string {
    const paragraphs = content.match(/<p>(.*?)<\/p>/g) || [];

    // Find the first non-greeting paragraph
    for (const paragraph of paragraphs) {
        const text = sanitizeText(paragraph.replace(/<p>|<\/p>/g, ''));
        if (!text.match(/^(Ahnii!|Hello|Hi|Hey|Greetings)/i)) {
            return text;
        }
    }

    // If no suitable paragraph found, use the first paragraph
    if (paragraphs.length > 0) {
        const firstParagraph = paragraphs[0];
        if (firstParagraph) {
            return sanitizeText(firstParagraph.replace(/<p>|<\/p>/g, ''));
        }
