#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema
} from '@modelcontextprotocol/sdk/types.js';
import { readdir, readFile } from 'node:fs/promises';
import { join, basename } from 'node:path';

const SPECS_DIR = join(import.meta.dirname, '..', '..', 'docs', 'specs');

async function listSpecs() {
  const files = await readdir(SPECS_DIR);
  const specs = files.filter(f => f.endsWith('.md')).map(f => f.replace('.md', ''));
  const rows = ['| Spec | First heading |', '|------|-------------|'];
  for (const name of specs) {
    const content = await readFile(join(SPECS_DIR, `${name}.md`), 'utf-8');
    const heading = content.match(/^#\s+(.+)$/m)?.[1] ?? name;
    rows.push(`| ${name} | ${heading} |`);
  }
  return rows.join('\n');
}

async function getSpec(name) {
  const files = await readdir(SPECS_DIR);
  const specs = files.filter(f => f.endsWith('.md')).map(f => f.replace('.md', ''));
  const path = join(SPECS_DIR, `${name}.md`);
  try {
    return await readFile(path, 'utf-8');
  } catch {
    return `Spec "${name}" not found. Available specs: ${specs.join(', ')}`;
  }
}

async function searchSpecs(query, maxResults = 10) {
  const files = await readdir(SPECS_DIR);
  const specs = files.filter(f => f.endsWith('.md'));
  const results = [];
  const lowerQuery = query.toLowerCase();

  for (const file of specs) {
    const content = await readFile(join(SPECS_DIR, file), 'utf-8');
    const lines = content.split('\n');
    const specName = file.replace('.md', '');

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].toLowerCase().includes(lowerQuery)) {
        const start = Math.max(0, i - 1);
        const end = Math.min(lines.length, i + 4);
        const context = lines.slice(start, end).join('\n');
        results.push(`### ${specName} (line ${i + 1})\n\`\`\`\n${context}\n\`\`\``);
        if (results.length >= maxResults) break;
      }
    }
    if (results.length >= maxResults) break;
  }

  return results.length > 0
    ? results.join('\n\n')
    : `No matches for "${query}" in any spec.`;
}

const server = new Server({ name: 'me-specs', version: '1.0.0' }, {
  capabilities: { tools: {} }
});

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'me_list_specs',
      description: 'List all subsystem specification documents. Use this to discover which specs are available before retrieving one.',
      inputSchema: { type: 'object', properties: {} }
    },
    {
      name: 'me_get_spec',
      description: 'Retrieve the full content of a subsystem spec by name. Use after me_list_specs to get detailed architecture, interfaces, and data flow for a subsystem.',
      inputSchema: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: "Spec name without .md extension, e.g. 'blog', 'theme-css', 'terminal', 'workflow'"
          }
        },
        required: ['name']
      }
    },
    {
      name: 'me_search_specs',
      description: 'Search across all specs for a keyword or phrase. Returns matching sections with surrounding context. Use when you need to find where a concept, type, or pattern is documented.',
      inputSchema: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'Search term or phrase' },
          max_results: { type: 'number', description: 'Maximum matches to return (default 10)' }
        },
        required: ['query']
      }
    }
  ]
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  let text;
  switch (name) {
    case 'me_list_specs':
      text = await listSpecs();
      break;
    case 'me_get_spec':
      text = await getSpec(args.name);
      break;
    case 'me_search_specs':
      text = await searchSpecs(args.query, args.max_results ?? 10);
      break;
    default:
      text = `Unknown tool: ${name}`;
  }

  return { content: [{ type: 'text', text }] };
});

const transport = new StdioServerTransport();
await server.connect(transport);
