import moment from 'moment'

/**
 * Given an array of months, returns a string representing the payoff month.
 */
export default function getPayoffDate (tableData) {

  if (!tableData.length) {
    throw new TypeError('tableData must be an array')
  }

  const lastMonthIndex = tableData.length - 1
  const totalMonths = tableData[lastMonthIndex].monthNumber

  const endDate = moment().add(totalMonths, 'months').toDate()

  return endDate
}
