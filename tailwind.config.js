/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // Tailwind v4 uses CSS-first configuration via @theme in src/index.css.
  // This file is retained for editor/tooling compatibility only.
  // Do not add colors here — use @theme in src/index.css instead.
  theme: {
    extend: {},
  },
}
