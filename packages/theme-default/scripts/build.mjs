import { execSync } from 'child_process'

function build() {
  try {
    execSync('sass ./src/index.scss ./dist/index.css')
    execSync('sass ./src/date-picker.scss ./dist/date-picker.css')
    execSync('sass ./src/time-picker.scss ./dist/time-picker.css')
    execSync('sass ./src/calendar.scss ./dist/calendar.css')
  } catch (e) {
    console.error(e)
  }
}

build()
