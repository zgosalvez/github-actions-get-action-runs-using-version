import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';

function isActionsModule(id) {
  return id.includes('/node_modules/@actions/');
}

export default {
  input: 'src/index.js',
  moduleContext(id) {
    if (isActionsModule(id)) {
      return 'globalThis';
    }

    return undefined;
  },
  onwarn(warning, warn) {
    if (
      warning.code === 'THIS_IS_UNDEFINED' &&
      isActionsModule(warning.id ?? '')
    ) {
      return;
    }

    if (
      warning.code === 'CIRCULAR_DEPENDENCY' &&
      warning.ids?.every((id) => isActionsModule(id))
    ) {
      return;
    }

    warn(warning);
  },
  output: {
    file: 'dist/index.js',
    format: 'esm',
    sourcemap: true,
  },
  external: ['fs', 'node:fs'],
  plugins: [
    nodeResolve({
      preferBuiltins: true,
    }),
    commonjs(),
  ],
};
