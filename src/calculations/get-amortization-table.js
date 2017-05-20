// Create a data structure containing monthly payoff data
// given principal, annual interest rate (apr), and term in months.
export default function getAmortizationTable (principal, apr, term) {

  let dataset = {}
  const monthlyInterest = apr / 1200

  dataset.monthlyPayment = principal * (monthlyInterest / (1 - (Math.pow(1 + monthlyInterest, -term))))
  dataset.months = []

  let newPrincipal = principal
  let i = 0
  let monthData = {}

  while (principal > 0) {

    let thisMonthsInterest  = principal * monthlyInterest
    let thisMonthsPrincipal = dataset.monthlyPayment - thisMonthsInterest

    newPrincipal = principal - thisMonthsPrincipal

    // Add to dataset
    monthData = {}
    monthData.monthNumber = i
    monthData.principalRemaining = parseFloat(principal)
    monthData.principal = thisMonthsPrincipal
    monthData.interest = thisMonthsInterest

    dataset.months.push(monthData)

    i++;
    principal = newPrincipal
  }

  return dataset
}
