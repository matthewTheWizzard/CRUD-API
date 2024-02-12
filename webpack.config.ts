import { resolve } from 'path';
import ESLintPlugin from 'eslint-webpack-plugin';

export default {
  mode: 'production',
  target: 'node',
  entry: resolve(__dirname, 'src', 'index'),
  output: { clean: true, filename: 'index.js' },
  resolve: { extensions: ['.ts', '.js'] },
  module: { rules: [{ test: /\.ts$/i, loader: 'ts-loader' }] },
  plugins: [new ESLintPlugin({ extensions: ['ts'], fix: false })],
};