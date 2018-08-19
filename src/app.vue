<template lang="pug">
div.app-container
  card
    strong.para Welcome to the Visual Mortgage Calculator.
    div.para Enter your mortgage info below to see when it'll be paid off.

  card.for-inputs
    div.input-column.for-base
      currency-input(
        label="Principal"
        left-widget="$"
        v-model="base.principal"
        v-on:input="computeAmortizationData"
        )
      currency-input(
        label="Annual Interest Rate (APR)"
        right-widget="%"
        v-model="base.interest"
        v-on:input="computeAmortizationData"
        )
      currency-input(
        label="Monthly Payment"
        left-widget="$"
        v-model="base.payment"
        v-on:input="computeAmortizationData"
        )
      span.hint(v-if="paymentTooSmall") That payment is too small!

    div.input-column.for-comparison
      currency-input(
        label="Principal"
        left-widget="$"
        v-model="comparison.principal"
        v-on:input="computeAmortizationData"
        )
      currency-input(
        label="Annual Interest Rate (APR)"
        right-widget="%"
        v-model="comparison.interest"
        v-on:input="computeAmortizationData"
        )
      currency-input(
        label="Monthly Payment"
        left-widget="$"
        v-model="comparison.payment"
        v-on:input="computeAmortizationData"
        )

  card(v-bind:class="{ 'is-hidden': !showResults }")
    payoff-date(
      v-bind:basePayoffDate="base.payoffDate"
      v-bind:comparisonPayoffDate="comparison.payoffDate"
      )

  card(v-bind:class="{ 'is-hidden': !showResults }")
    chart(
      v-bind:baseMonths="base.tableData"
      v-bind:comparisonMonths="comparison.tableData"
      )

  card(v-bind:class="{ 'is-hidden': !showResults }")
    amortization-table(v-bind:months="base.tableData")
</template>

<script>
import getAmortizationTable from './calculations/get-amortization-table'
import getPayoffDate from './calculations/get-payoff-date'

import AmortizationTable from './components/amortization-table.vue'
import Card from './components/card.vue'
import Chart from './components/chart.vue'
import CurrencyInput from './components/currency-input.vue'
import PayoffDate from './components/payoff-date.vue'


const computeAmortizationData = function () {

  try {
    this.base.tableData = getAmortizationTable(this.base.principal, this.base.interest, this.base.payment)
    this.base.payoffDate = getPayoffDate(this.base.tableData)

    this.comparison.tableData = getAmortizationTable(this.comparison.principal, this.comparison.interest, this.comparison.payment)
    this.comparison.payoffDate = getPayoffDate(this.comparison.tableData)

    this.paymentTooSmall = false
  }
  catch (err) {
    if (err.message === 'PaymentTooSmallError') {
      this.paymentTooSmall = true
    }
  }
}

const showResults = function showResults () {
  if (this.paymentTooSmall) { return false }
  return this.base.principal && this.base.interest && this.base.payment
}


export default
  { name: 'app'
  , data: () => (
    { base:
      { interest: null
      , payment: null
      , payoffDate: null
      , principal: null
      , tableData: []
      }
    , comparison:
      { interest: null
      , payment: null
      , payoffDate: null
      , principal: null
      , tableData: []
      }
    , paymentTooSmall: false
    })
  , components:
    { AmortizationTable
    , Card
    , Chart
    , CurrencyInput
    , PayoffDate
    }
  , computed:
    { showResults
    }
  , methods:
    { computeAmortizationData
    }
  }
</script>

<style>
html {
  box-sizing: border-box;
  font-size: 62.5%; /* 0.1rem = 1px */
}

*, *:before, *:after {
  box-sizing: inherit;
}

body {
  background-color: #f5f5f5;
  font-size: 1.4rem;
}
</style>

<style lang="less" scoped>
.app-container {
  align-items: center;
  display: flex;
  flex-direction: column;

  @media (min-width: 450px) {
    padding: 0 2rem 2rem 2rem;
  }
}

.card.for-inputs {
  display: flex;
}

.para {
  display: block;

  &:not(:last-child) {
    margin-bottom: 10px;
  }
}

.hint {
  color: #999;
}

.input-column {
  width: 50%;
}
</style>
