// vitest.config.ts
import { svelte } from "file:///workspaces/me/node_modules/@sveltejs/vite-plugin-svelte/src/index.js";
import { fileURLToPath } from "url";
import { mergeConfig } from "file:///workspaces/me/node_modules/vite/dist/node/index.js";
var __vite_injected_original_import_meta_url = "file:///workspaces/me/vitest.config.ts";
var viteConfig = {
  plugins: [
    svelte({
      hot: !process.env.VITEST,
      compilerOptions: {
        dev: true,
        css: "injected",
        runes: true
      }
    })
  ],
  resolve: {
    alias: {
      $lib: fileURLToPath(new URL("./src/lib", __vite_injected_original_import_meta_url)),
      $app: fileURLToPath(
        new URL("./node_modules/@sveltejs/kit/src/runtime/app", __vite_injected_original_import_meta_url)
      ),
      __sveltekit: fileURLToPath(
        new URL("./node_modules/@sveltejs/kit/src/runtime", __vite_injected_original_import_meta_url)
      )
    },
    conditions: process.env.VITEST ? ["browser"] : void 0
  }
};
var vitestConfig = {
  test: {
    include: ["src/**/*.{test,spec}.{js,ts,svelte}"],
    environment: "jsdom",
    setupFiles: ["src/test/setup.ts"],
    globals: true,
    deps: {
      optimizer: {
        web: {
          include: ["^svelte", "@sveltejs/kit"]
        }
      }
    },
    css: true,
    reporters: ["verbose"],
    pool: "forks",
    isolate: false
  }
};
var vitest_config_default = mergeConfig(viteConfig, vitestConfig);
export {
  vitest_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZXN0LmNvbmZpZy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi93b3Jrc3BhY2VzL21lXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvd29ya3NwYWNlcy9tZS92aXRlc3QuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy93b3Jrc3BhY2VzL21lL3ZpdGVzdC5jb25maWcudHNcIjtpbXBvcnQgeyBzdmVsdGUgfSBmcm9tICdAc3ZlbHRlanMvdml0ZS1wbHVnaW4tc3ZlbHRlJztcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGggfSBmcm9tICd1cmwnO1xuaW1wb3J0IHsgbWVyZ2VDb25maWcgfSBmcm9tICd2aXRlJztcblxuY29uc3Qgdml0ZUNvbmZpZyA9IHtcblx0cGx1Z2luczogW1xuXHRcdHN2ZWx0ZSh7XG5cdFx0XHRob3Q6ICFwcm9jZXNzLmVudi5WSVRFU1QsXG5cdFx0XHRjb21waWxlck9wdGlvbnM6IHtcblx0XHRcdFx0ZGV2OiB0cnVlLFxuXHRcdFx0XHRjc3M6ICdpbmplY3RlZCcsXG5cdFx0XHRcdHJ1bmVzOiB0cnVlXG5cdFx0XHR9XG5cdFx0fSlcblx0XSxcblx0cmVzb2x2ZToge1xuXHRcdGFsaWFzOiB7XG5cdFx0XHQkbGliOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjL2xpYicsIGltcG9ydC5tZXRhLnVybCkpLFxuXHRcdFx0JGFwcDogZmlsZVVSTFRvUGF0aChcblx0XHRcdFx0bmV3IFVSTCgnLi9ub2RlX21vZHVsZXMvQHN2ZWx0ZWpzL2tpdC9zcmMvcnVudGltZS9hcHAnLCBpbXBvcnQubWV0YS51cmwpXG5cdFx0XHQpLFxuXHRcdFx0X19zdmVsdGVraXQ6IGZpbGVVUkxUb1BhdGgoXG5cdFx0XHRcdG5ldyBVUkwoJy4vbm9kZV9tb2R1bGVzL0BzdmVsdGVqcy9raXQvc3JjL3J1bnRpbWUnLCBpbXBvcnQubWV0YS51cmwpXG5cdFx0XHQpXG5cdFx0fSxcblx0XHRjb25kaXRpb25zOiBwcm9jZXNzLmVudi5WSVRFU1QgPyBbJ2Jyb3dzZXInXSA6IHVuZGVmaW5lZFxuXHR9XG59O1xuXG5jb25zdCB2aXRlc3RDb25maWcgPSB7XG5cdHRlc3Q6IHtcblx0XHRpbmNsdWRlOiBbJ3NyYy8qKi8qLnt0ZXN0LHNwZWN9Lntqcyx0cyxzdmVsdGV9J10sXG5cdFx0ZW52aXJvbm1lbnQ6ICdqc2RvbScsXG5cdFx0c2V0dXBGaWxlczogWydzcmMvdGVzdC9zZXR1cC50cyddLFxuXHRcdGdsb2JhbHM6IHRydWUsXG5cdFx0ZGVwczoge1xuXHRcdFx0b3B0aW1pemVyOiB7XG5cdFx0XHRcdHdlYjoge1xuXHRcdFx0XHRcdGluY2x1ZGU6IFsnXnN2ZWx0ZScsICdAc3ZlbHRlanMva2l0J11cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cdFx0Y3NzOiB0cnVlLFxuXHRcdHJlcG9ydGVyczogWyd2ZXJib3NlJ10sXG5cdFx0cG9vbDogJ2ZvcmtzJyxcblx0XHRpc29sYXRlOiBmYWxzZVxuXHR9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBtZXJnZUNvbmZpZyh2aXRlQ29uZmlnLCB2aXRlc3RDb25maWcpO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFnTyxTQUFTLGNBQWM7QUFDdlAsU0FBUyxxQkFBcUI7QUFDOUIsU0FBUyxtQkFBbUI7QUFGMEcsSUFBTSwyQ0FBMkM7QUFJdkwsSUFBTSxhQUFhO0FBQUEsRUFDbEIsU0FBUztBQUFBLElBQ1IsT0FBTztBQUFBLE1BQ04sS0FBSyxDQUFDLFFBQVEsSUFBSTtBQUFBLE1BQ2xCLGlCQUFpQjtBQUFBLFFBQ2hCLEtBQUs7QUFBQSxRQUNMLEtBQUs7QUFBQSxRQUNMLE9BQU87QUFBQSxNQUNSO0FBQUEsSUFDRCxDQUFDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1IsT0FBTztBQUFBLE1BQ04sTUFBTSxjQUFjLElBQUksSUFBSSxhQUFhLHdDQUFlLENBQUM7QUFBQSxNQUN6RCxNQUFNO0FBQUEsUUFDTCxJQUFJLElBQUksZ0RBQWdELHdDQUFlO0FBQUEsTUFDeEU7QUFBQSxNQUNBLGFBQWE7QUFBQSxRQUNaLElBQUksSUFBSSw0Q0FBNEMsd0NBQWU7QUFBQSxNQUNwRTtBQUFBLElBQ0Q7QUFBQSxJQUNBLFlBQVksUUFBUSxJQUFJLFNBQVMsQ0FBQyxTQUFTLElBQUk7QUFBQSxFQUNoRDtBQUNEO0FBRUEsSUFBTSxlQUFlO0FBQUEsRUFDcEIsTUFBTTtBQUFBLElBQ0wsU0FBUyxDQUFDLHFDQUFxQztBQUFBLElBQy9DLGFBQWE7QUFBQSxJQUNiLFlBQVksQ0FBQyxtQkFBbUI7QUFBQSxJQUNoQyxTQUFTO0FBQUEsSUFDVCxNQUFNO0FBQUEsTUFDTCxXQUFXO0FBQUEsUUFDVixLQUFLO0FBQUEsVUFDSixTQUFTLENBQUMsV0FBVyxlQUFlO0FBQUEsUUFDckM7QUFBQSxNQUNEO0FBQUEsSUFDRDtBQUFBLElBQ0EsS0FBSztBQUFBLElBQ0wsV0FBVyxDQUFDLFNBQVM7QUFBQSxJQUNyQixNQUFNO0FBQUEsSUFDTixTQUFTO0FBQUEsRUFDVjtBQUNEO0FBRUEsSUFBTyx3QkFBUSxZQUFZLFlBQVksWUFBWTsiLAogICJuYW1lcyI6IFtdCn0K
