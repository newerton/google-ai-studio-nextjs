import path from 'node:path';

const buildBiomeCheckCommand = (filenames) => {
  const files = filenames.map((f) => path.relative(process.cwd(), f)).join(' ');
  return `npx @biomejs/biome check --write --files-ignore-unknown=true ${files}`;
};

const buildBiomeFormatCommand = (filenames) => {
  const files = filenames.map((f) => path.relative(process.cwd(), f)).join(' ');

  return `npx @biomejs/biome format --write ${files}`;
};

const config = {
  '*.{js,jsx,ts,tsx}': [buildBiomeCheckCommand],
  '*.{json,css}': [buildBiomeFormatCommand],
};

export default config;
