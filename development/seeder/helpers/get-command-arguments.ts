export const getCommandArguments = () => {
  const argumentsEnteredByUser = process.argv
  const argumentsToReturn: { months?: string[]; year?: string } = {}

  for (const arg of argumentsEnteredByUser) {
    // Add a months' argument, as a list, such as: 2022.01&2022.02&2022.03
    // For January, February and March 2022
    if (arg.includes('--months=')) {
      argumentsToReturn.months = arg.split('=')[1].split(' ')
    }

    if (arg.includes('--year')) {
      argumentsToReturn.year = arg.split('=')[1]
    }
  }

  return argumentsToReturn
}
