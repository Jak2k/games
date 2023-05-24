import { UserConfigExport, defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const config: UserConfigExport = {
  plugins: [react()],
};

// in production mode, the base path is /kill-the-circle/

if (process.env.NODE_ENV === "production") {
  config.base = "/who-gets-rich/";
}

// https://vitejs.dev/config/
export default defineConfig(config);
