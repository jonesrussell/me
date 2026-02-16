import { tick } from 'svelte';
import hljs from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import css from 'highlight.js/lib/languages/css';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import php from 'highlight.js/lib/languages/php';
import plaintext from 'highlight.js/lib/languages/plaintext';
import python from 'highlight.js/lib/languages/python';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';

// Register languages (explicit imports for tree-shaking)
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('css', css);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('json', json);
hljs.registerLanguage('php', php);
hljs.registerLanguage('plaintext', plaintext);
hljs.registerLanguage('python', python);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('xml', xml);

export function highlightCode(node: HTMLElement) {
  async function highlight() {
    await tick();

    const codeBlocks = node.querySelectorAll('pre code');
    codeBlocks.forEach((block) => {
      const htmlBlock = block as HTMLElement;

      if (htmlBlock.children.length > 0) {
        htmlBlock.textContent = htmlBlock.textContent || '';
      }

      const langMatch = htmlBlock.className.match(/language-(\w+)/);
      const lang = langMatch?.[1];
      if (!lang || !hljs.getLanguage(lang)) {
        htmlBlock.className = 'language-plaintext';
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
