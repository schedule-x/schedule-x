import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import minimist from 'minimist'
import { Project } from '@lerna/project'
import { filterPackages } from '@lerna/filter-packages'
import batchPackages from '@lerna/batch-packages'
import sourcemaps from 'rollup-plugin-sourcemaps'
import typescript from 'rollup-plugin-typescript2'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import sizes from '@atomico/rollup-plugin-sizes'
import autoExternal from 'rollup-plugin-auto-external'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function getSortedPackages(scope, ignore) {
  const packages = await Project.getPackages(__dirname || process.cwd())
  let filtered = filterPackages(packages, scope, ignore, false)
  filtered = filtered.filter(
    (pkg) => !pkg.name.startsWith('@schedule-x/theme-')
  )

  return batchPackages(filtered).reduce((arr, batch) => arr.concat(batch), [])
}

async function build(commandLineArgs) {
  const config = []

  // Support --scope and --ignore globs if passed in via commandline
  const { scope, ignore } = minimist(process.argv.slice(2))
  const packages = await getSortedPackages(scope, ignore)

  // prevent rollup warning
  delete commandLineArgs.ci
  delete commandLineArgs.scope
  delete commandLineArgs.ignore

  packages.forEach((pkg) => {
    const basePath = path.relative(__dirname, pkg.location)
    const input = path.join(basePath, 'src/index.ts')
    const { name, main, umd, module } = pkg.toJSON()

    const basePlugins = [
      sourcemaps(),
      resolve(),
      commonjs(),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
      }),
      sizes(),
    ]

    config.push({
      input,
      output: [
        {
          name,
          file: path.join(basePath, umd),
          format: 'umd',
          sourcemap: true,
        },
        {
          name,
          file: path.join(basePath, main),
          format: 'cjs',
          sourcemap: true,
          exports: 'auto',
        },
        {
          name,
          file: path.join(basePath, module),
          format: 'es',
          sourcemap: true,
        },
      ],
      plugins: [
        autoExternal({
          packagePath: path.join(basePath, 'package.json'),
        }),
        ...basePlugins,
        typescript({
          tsconfig:
            './' + fs.existsSync(`${basePath}/tsconfig.json`)
              ? `${basePath}/tsconfig.json`
              : 'common/package.tsconfig.json',
        }),
      ],
    })
  })

  return config
}

export default build
