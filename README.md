# Personal Website

You can visit the website at https://jonesrussell.github.io/me/.

This is my personal website, developed to resemble the look and behavior of Amiga Workbench 3.1, the last version I remember using on my Amiga 4000.

The website is built with Svelte, powered by create-svelte.

## Deploy to Github Pages

See the deployment configuration in .github/workflows/deploy.yml

## Resources

Here are some resources I used during the development:

- Svelte Introduction: https://svelte.dev/docs/introduction
- Microsoft Copilot: https://copilot.microsoft.com
- Application State Management with Svelte: https://blog.logrocket.com/application-state-management-svelte/
- Moveable Storybook: https://daybrush.com/moveable/storybook/?path=/story/introduction--page
- Amiga Workbench 3.1 Image: https://heatdamer.weebly.com/uploads/1/2/7/2/127209368/527788026_orig.png


## AI Prompt

Sometimes I find it useful to have a prompt ready to go when prodding GPTs. I also find it useful not to give the bots instructions up front. I pretty much throw shit at the wall and see if useable code is produced.

```
My app is Svelte 4.2 and it is adaptive to iniital browser sizes, devices, etc, and reactive to any changes like on resize.

I place my content in Pane's, a custom component that implements svelte-moveable 0.45, and allow the user to move and resize the Pane's.

$ tree -L 3 -I 'node_modules|build|static'
.
├── eslint.config.js
├── package.json
├── package-lock.json
├── playwright.config.mts
├── postcss.config.mjs
├── README.md
├── src
│   ├── app.css
│   ├── app.d.ts
│   ├── app.html
│   ├── components
│   │   ├── Footer.svelte
│   │   ├── Header.svelte
│   │   ├── NavBar.svelte
│   │   └── Pane
│   ├── lib
│   │   ├── images
│   │   ├── PaneManager.ts
│   │   └── types.ts
│   ├── routes
│   │   ├── about
│   │   ├── +layout.server.ts
│   │   ├── +layout.svelte
│   │   ├── +page.svelte
│   │   ├── +page.ts
│   │   └── sections
│   └── services
│       └── blogService.ts
├── svelte.config.js
├── tailwind.config.ts
├── test-results
├── tests
│   └── test.ts
├── tsconfig.json
├── vite.config.mts
└── vitest-setup.mjs
```
