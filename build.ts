import type { BuildConfig } from 'bun'
import dts from 'bun-plugin-dts'

const defaultBuildConfig: BuildConfig = {
  entrypoints: ['./src/index.ts'],
  outdir: './dist',
  plugins: [dts()]
}

await Bun.build({
  ...defaultBuildConfig,
  format: 'esm',
  naming:'[dir]/[name].js'
})