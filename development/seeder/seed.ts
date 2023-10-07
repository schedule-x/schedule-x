import * as fs from 'fs'
import { getCommandArguments } from './helpers/get-command-arguments.ts'
import { printCliMessage } from './helpers/print-cli-message.ts'
import { createEvents } from './helpers/create-events.ts'

const writeEventsToFile = () => {
  const events = []
  const commandArguments = getCommandArguments()
  const monthsToSeed = commandArguments.months ? commandArguments.months : []

  // Handling --months argument
  if (monthsToSeed.length) {
    for (const monthToSeed of monthsToSeed) {
      events.push(...createEvents(monthToSeed))
    }
  }

  // Handling --year argument
  if (commandArguments.year) {
    const twoDigitMonths = [
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
      '07',
      '08',
      '09',
      '10',
      '11',
      '12',
    ]

    for (const mm of twoDigitMonths) {
      events.push(...createEvents(`${commandArguments.year}.${mm}`))
    }
  }

  // Handling a run of the script with no arguments (seed current month)
  if (!monthsToSeed.length && !commandArguments.year)
    events.push(...createEvents())

  const payload = new Uint8Array(
    Buffer.from(`export const seededEvents = ${JSON.stringify(events)}`)
  )

  fs.writeFile('./development/data/seeded-events.ts', payload, (err: any) => {
    if (err) console.error(err)
    else {
      printCliMessage(monthsToSeed, commandArguments.year || null)
    }
  })
}

writeEventsToFile()
