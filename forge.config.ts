import type { ForgeConfig } from "@electron-forge/shared-types";
import { MakerSquirrel } from "@electron-forge/maker-squirrel";
import { MakerZIP } from "@electron-forge/maker-zip";
import { VitePlugin } from "@electron-forge/plugin-vite";

import path from 'path'

const config: ForgeConfig = {
  packagerConfig: {
    executableName: "sand0",
    icon: path.join(__dirname, "src", "assets", "icon"),
  },
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({
      name: "sand0",
      authors: "sand0",
      loadingGif: path.join(__dirname, "src", "assets", "installing_win.gif"),
      description:
        "Un lanzador de anuncios increíblemente rápido y totalmente extensible que le permite ver análisis, crear con IA, compartir resultados y mucho más.",
    }),
    new MakerZIP({}, ["darwin"]),
  ],
  publishers: [
    {
      name: "@electron-forge/publisher-github",
      config: {
        repository: {
          owner: "Octaviocossy",
          name: "sand0-desktop-app",
        },
      },
    },
  ],
  plugins: [
    new VitePlugin({
      // `build` can specify multiple entry builds, which can be Main process, Preload scripts, Worker process, etc.
      // If you are familiar with Vite configuration, it will look really familiar.
      build: [
        {
          // `entry` is just an alias for `build.lib.entry` in the corresponding file of `config`.
          entry: "src/main.ts",
          config: "vite.main.config.ts",
        },
        {
          entry: "src/preload.ts",
          config: "vite.preload.config.ts",
        },
      ],
      renderer: [
        {
          name: "main_window",
          config: "vite.renderer.config.ts",
        },
      ],
    }),
  ],
};

export default config;
