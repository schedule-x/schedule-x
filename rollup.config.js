import path from 'path'
import { fileURLToPath } from 'url'
import minimist from 'minimist'
import { Project } from '@lerna/project'
import { filterPackages } from '@lerna/filter-packages'
import batchPackages from '@lerna/batch-packages'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import image from '@rollup/plugin-image'
import ts from 'rollup-plugin-ts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function getSortedPackages(scope, ignore) {
  const packages = await Project.getPackages(__dirname || process.cwd())
  let filtered = filterPackages(packages, scope, ignore, false)
  const nonTSPackages = [
    '@schedule-x/theme-default',
    '@schedule-x/eslint-config',
    '@schedule-x/prettier-config',
  ];
  filtered = filtered.filter(
    (pkg) => !nonTSPackages.includes(pkg.name)
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
      resolve(),
      commonjs(),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
      }),
      image(),
    ]

    config.push({
      input,
      output: [
        {
          name,
          file: path.join(basePath, umd),
          format: 'umd',
        },
        {
          name,
          file: path.join(basePath, main),
          format: 'cjs',
          exports: 'auto',
        },
        {
          name,
          file: path.join(basePath, module),
          format: 'es',
        },
      ],
      plugins: [
        ...basePlugins,
        ts({
          tsconfig: `${basePath}/tsconfig.json`,
        }),
      ],
      external: ['preact', 'preact/hooks', '@preact/signals', 'preact/src/jsx'],
    })
  })

  return config
}

export default build
