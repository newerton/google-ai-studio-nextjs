module.exports = {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {},
    'postcss-preset-mantine': {},
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
  },
};
