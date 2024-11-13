import { execSync } from 'child_process'

function build() {
  try {
    execSync('sass --no-source-map ./src/index.scss ./dist/index.css')
    execSync(
      'sass --no-source-map ./src/date-picker.scss ./dist/date-picker.css'
    )
    execSync(
      'sass --no-source-map ./src/time-picker.scss ./dist/time-picker.css'
    )
    execSync('sass --no-source-map ./src/calendar.scss ./dist/calendar.css')
  } catch (e) {
    console.error(e)
  }
}

build()
