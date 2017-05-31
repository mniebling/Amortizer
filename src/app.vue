<template>
  <div class="app-container">
    <card>
      <strong class="para">Welcome to the Visual Mortgage Calculator.</strong>
      <div class="para">Enter your mortgage info below to see when it'll be paid off.</div>
    </card>

    <card>
      <currency-input
        label="Principal"
        left-widget="$"
        v-model="base.principal"
      ></currency-input>
      <currency-input
        label="Annual Interest Rate (APR)"
        right-widget="%"
        v-model="base.interest"
      ></currency-input>
      <currency-input
        label="Monthly Payment"
        left-widget="$"
        v-model="base.payment"
      ></currency-input>
    </card>

    <card v-bind:class="{ 'is-hidden': !showResults }">
      <chart v-bind:months="amortizationTableData"></chart>
    </card>

    <card v-bind:class="{ 'is-hidden': !showResults }">
      <amortization-table v-bind:months="amortizationTableData"></amortization-table>
    </card>
  </div>
</template>

<script>
import getAmortizationTable from './calculations/get-amortization-table'

import AmortizationTable from './components/amortization-table.vue'
import Card from './components/card.vue'
import Chart from './components/chart.vue'
import CurrencyInput from './components/currency-input.vue'

let amortizationTableData = function () {
  return getAmortizationTable(this.base.principal, this.base.interest, this.base.payment)
}

let showResults = function () {
  return this.base.principal && this.base.interest && this.base.payment
}

export default
  { name: 'app'
  , data: () => (
    { base:
      { interest: null
      , payment: null
      , principal: null
      }
    })
  , components:
    { AmortizationTable
    , Card
    , Chart
    , CurrencyInput
    }
  , computed:
    { amortizationTableData
    , showResults
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

.para {
  display: block;

  &:not(:last-child) {
    margin-bottom: 10px;
  }
}
</style>
