import { tick } from 'svelte';
import hljs from 'highlight.js/lib/core';
import php from 'highlight.js/lib/languages/php';
import xml from 'highlight.js/lib/languages/xml';
import typescript from 'highlight.js/lib/languages/typescript';

// Register languages
hljs.registerLanguage('php', php);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('typescript', typescript);

export function highlightCode(node: HTMLElement) {
  async function highlight() {
    await tick();

    const codeBlocks = node.querySelectorAll('pre code');
    codeBlocks.forEach((block) => {
      const htmlBlock = block as HTMLElement;

      if (htmlBlock.children.length > 0) {
        htmlBlock.textContent = htmlBlock.textContent || '';
      }

      if (!htmlBlock.classList.contains('hljs')) {
        hljs.highlightElement(htmlBlock);
      }
    });
  }

  // Initial highlight
  highlight();

  // Re-highlight when content changes
  const observer = new MutationObserver(highlight);
  observer.observe(node, {
    childList: true,
    subtree: true
  });

  return {
    destroy() {
      observer.disconnect();
    }
  };
}
