# My create-svelte website

https://jonesrussell.github.io/me/

Everything I needed to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/main/packages/create-svelte).

## Created project

If you're seeing this, I already did this step. Hooray!

```bash
# created a new project in myapp
npm create svelte@latest myapp
```

## Developing

Once I created a project I installed dependencies with `npm install`, then started a development server:

```bash
npm run dev
```

## Building

I create production versions of my app:

```bash
npm run build
```

Sometimes I preview the production build with `npm run preview`.

> To deploy my app, I installed a Github pages [adapter](https://www.sveltesociety.dev/packages?category=sveltekit-adapters#svelte-adapter-github) for your target environment.

## AI Prompt
I've found it useful to have a prompt ready to go when prodding GPTs. I also find it useful not to give the bots instructions up front when a bot isn't producing working code.

```
i need my Svelte 4.2 app to be adaptive to iniital browser sizes, devices, etc, and reactive to any changes like on resize.

I place my content in Pane's, a custom component that implements svelte-moveable 0.45, and allow the user to move and resize the Pane's.

Should I update my PaneManager to keep track of and query the browser or should I create a new component or util?

$ tree -L 3 -I 'node_modules|build|static'
.
├── eslint.config.js
├── package.json
├── package-lock.json
├── playwright.config.mts
├── postcss.config.mjs
├── README.md
├── src
│   ├── app.css
│   ├── app.d.ts
│   ├── app.html
│   ├── components
│   │   ├── Footer.svelte
│   │   ├── Header.svelte
│   │   ├── NavBar.svelte
│   │   └── Pane
│   ├── lib
│   │   ├── images
│   │   ├── PaneManager.ts
│   │   └── types.ts
│   ├── routes
│   │   ├── about
│   │   ├── +layout.server.ts
│   │   ├── +layout.svelte
│   │   ├── +page.svelte
│   │   ├── +page.ts
│   │   └── sections
│   └── services
│       └── blogService.ts
├── svelte.config.js
├── tailwind.config.ts
├── test-results
├── tests
│   └── test.ts
├── tsconfig.json
├── vite.config.mts
└── vitest-setup.mjs
```
