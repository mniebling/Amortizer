<template lang="pug">
div
  div.sentence
    span The baseline loan will be paid off in:
    span.for-base {{ basePayoffDate | asReadableDate }}
  div.sentence(v-if="comparisonPayoffDate")
    span The comparison will be paid off in:
    span.for-comparison {{ comparisonPayoffDate | asReadableDate }}
  div.sentence(v-if="difference") The difference is {{ difference }} months.
</template>


<script>
import moment from 'moment'

const difference = function () {
  const diff = moment(this.basePayoffDate).diff(moment(this.comparisonPayoffDate), 'months')
  return Math.abs(diff)
}

const asReadableDate = function (date) {
  return moment(date).format('MMMM YYYY') // aka "January 2024"
}

export default
  { name: 'payoff-date'
  , computed: { difference }
  , filters: { asReadableDate }
  , props:
    { 'basePayoffDate': Date
    , 'comparisonPayoffDate': Date
    }
  }
</script>


<style lang="less" scoped>
.sentence {
  font-size: 16px;

  &:not(:last-of-type) {
    margin-bottom: 10px;
  }

  & > span {
    margin-right: 4px;
  }
}

.for-base {
  color: blue;
}

.for-comparison {
  color: orange;
}
</style>
