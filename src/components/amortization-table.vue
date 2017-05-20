<template>
  <div>
    <div class="monthly-payment">
      <span>Monthly Payment:</span>
      <span class="currency-symbol">$</span>
      <strong>{{ data.monthlyPayment | formatAsCurrency }}</strong>
    </div>

    <table>
      <thead>
        <tr>
          <th>Month #</th>
          <th>Principal Remaining</th>
          <th>Paid to Principal</th>
          <th>Paid to Interest</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="month in data.months">
          <td>{{ month.monthNumber }}</td>
          <td>
            <span class="currency-symbol">$</span>
            <span>{{ month.principalRemaining | formatAsCurrency }}</span>
          </td>
          <td>
            <span class="currency-symbol">$</span>
            <span>{{ month.principal | formatAsCurrency }}</span>
          </td>
          <td>
            <span class="currency-symbol">$</span>
            <span>{{ month.interest | formatAsCurrency }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
let formatAsCurrency = function (value) {

  const options =
    { minimumFractionDigits: 2
    , maximumFractionDigits: 2
    }

  return new Intl.NumberFormat('en-US', options).format(value)
}

export default
  { name: 'amortization-table'
  , methods: {}
  , props: { 'data': Object }
  , filters: { formatAsCurrency }
  }
</script>

<style lang="less" scoped>
.monthly-payment {
  margin-bottom: 1.0rem;
  padding: 1.0rem;
  text-align: center;
}

table {
  width: 100%;
}

th, td {
  border-bottom: 1px solid #ddd;
  padding: 0.5rem 1.0rem;
  text-align: right;
}

tr:nth-child(odd) > td {
  background-color: #f5f5f5;
}

.currency-cell {
  display: flex;
  justify-content: space-between;
}

.currency-symbol {
  color: #999;
}
</style>
