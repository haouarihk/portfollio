import { staticAdapter } from "@builder.io/qwik-city/adapters/static/vite";
import { _TextEncoderStream_polyfill } from "@builder.io/qwik-city/middleware/request-handler";
import { extendConfig } from "@builder.io/qwik-city/vite";
import baseConfig from "../../vite.config";

// Bun does not ship TextEncoderStream; polyfill it so SSG works when
// building with Bun (harmless when building with Node).
globalThis.TextEncoderStream ||= _TextEncoderStream_polyfill;

export default extendConfig(baseConfig, () => {
  return {
    build: {
      ssr: true,
      rollupOptions: {
        input: ["@qwik-city-plan"],
      },
    },
    plugins: [
      staticAdapter({
        origin: "https://haouarihk.com",
      }),
    ],
  };
});