import image from '@rollup/plugin-image';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import terser from '@rollup/plugin-terser';
import { dts } from "rollup-plugin-dts";
import postcssUrl from 'postcss-url';


export default [{
  input: 'src/index.ts',
  output:[
    {
      dir: 'dist',
      format: 'cjs',
      entryFileNames: 'cjs/index.js'
    },
    // {
    //   file: 'dist/esm/index.js',
    //   format: 'esm'
    // }
  ],
  external: ['react'],
  plugins: [
    image({
      include: ['**/*.svg', '**/*.png', '**/*.jpg'] // Четко указываем, что обрабатывать
    }),
    typescript({
        tsconfig: './tsconfig.json',
        exclude: ['**/*.stories.tsx']
    }),
    postcss({
      extract: 'index.css',
      modules: true,
      use: ['sass'],
      minimize: true,
      plugins: [
      postcssUrl({
        url: 'inline',   // Переводит картинки из url() в base64-строку прямо в CSS
        maxSize: 10,     // Лимит в Кб. Картинки меньше этого объема встроятся в CSS
        fallback: 'copy' // Картинки больше 10 Кб просто скопируются в папку dist
      })
    ]
    }),
    terser(),
  ]
},
{
  input: 'dist/cjs/src/index.d.ts',
  output: [{file: 'dist/index.d.ts', format: 'cjs'}],
  external: [/\.(css|scss)$/],
  plugins: [dts()],
}
];