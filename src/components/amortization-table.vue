<template lang="pug">
div
  table
    thead
      tr
        th Month #
        th Principal Remaining
        th Paid to Principal
        th Paid to Interest
    tbody
      tr(v-for="month in months")
        td {{ month.monthNumber }}
        td
          span.currency-symbol $
          span {{ month.principalRemaining | formatAsCurrency }}
        td
          span.currency-symbol $
          span {{ month.principal | formatAsCurrency }}
        td
          span.currency-symbol $
          span {{ month.interest | formatAsCurrency }}
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
  , props: { 'months': Array }
  , filters: { formatAsCurrency }
  }
</script>

<style lang="less" scoped>
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
  margin-right: 4px;
}
</style>
