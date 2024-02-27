import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class', '[data-mantine-color-scheme="dark"]'],
  corePlugins: {
    preflight: false,
  },
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {},
  plugins: [],
};
export default config;
