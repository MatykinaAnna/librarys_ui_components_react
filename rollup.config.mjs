import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import url from "rollup-plugin-url";
import terser from '@rollup/plugin-terser';
import { dts } from "rollup-plugin-dts";
import svg from 'rollup-plugin-svg'

export default [{
  input: 'src/index.ts',
  output:[
    {
      file: 'dist/cjs/index.js',
      format: 'cjs'
    },
    // {
    //   file: 'dist/esm/index.js',
    //   format: 'esm'
    // }
  ],
  external: ['react'],
  plugins: [
    typescript({
        tsconfig: './tsconfig.json',
        exclude: ['**/*.stories.tsx']
    }),
    postcss({
      extract: 'index.css',
      modules: true,
      use: ['sass'],
      minimize: true
    }),
    url(),
    terser(),
    svg()
  ]
},
{
  input: 'dist/esm/src/index.d.ts',
  output: [{file: 'dist/index.d.ts', format: 'esm'}],
  external: [/\.(css|scss)$/],
  plugins: [dts()]
}
];