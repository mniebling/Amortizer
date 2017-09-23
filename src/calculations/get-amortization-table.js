// Create a data structure containing monthly payoff data
// given principal, annual interest rate (apr), and monthly payment.
//
// Returns an empty array if the values aren't all present.
// Throws an error if the payment is too small (the principal will never be
// entirely paid off).
export default function getAmortizationTable (principal, apr, payment) {

  if (!principal || !apr || !payment) {
    return []
  }

  const monthlyInterest = apr / 1200

  let months = []
  let newPrincipal = principal
  let i = 0
  let monthData = {}

  // Is the payment too small?
  const firstMonthInterest = principal * monthlyInterest

  if (payment <= firstMonthInterest) {
    throw new Error('PaymentTooSmallError')
  }

  // Construct the table
  while (principal > 0) {

    let thisMonthsInterest  = principal * monthlyInterest
    let thisMonthsPrincipal = payment - thisMonthsInterest

    newPrincipal = principal - thisMonthsPrincipal

    // Add to dataset
    monthData = {}
    monthData.monthNumber = i
    monthData.principalRemaining = parseFloat(principal)
    monthData.principal = thisMonthsPrincipal
    monthData.interest = thisMonthsInterest

    months.push(monthData)

    i++;
    principal = newPrincipal
  }

  return months
}
