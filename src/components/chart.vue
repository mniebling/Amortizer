<template lang="pug">
div#chartContainer
</template>

<script>
import moment from 'moment'
import Plotly from './plotly'

const layout =
  { showlegend: false
  , margin: { t: 0 }
  , yaxis:
    { tickcolor: '#fff'
    , tickformat: '$,'
    , ticklen: 8
    }
  }

// https://github.com/plotly/plotly.js/blob/master/src/plot_api/plot_config.js#L22-L86
// https://github.com/plotly/plotly.js/blob/master/src/components/modebar/buttons.js
const options =
  { editable: false // edit titles, move annotations
  , displayModeBar: false // don't show the hover toolbar
  , scrollZoom: false // mousewheel or two finger scroll zooms the plot
  , showAxisDragHandles: false // allow dragging the axes to pan/zoom
  , showLink: false // allow user to open chart in Plotly
  }

let monthNumberToDate = function (month) {
  return moment().add(month.monthNumber, 'months').toDate()
}

let drawChart = function () {

  const createSeries = function createSeries (data, color) {
    return (
      { type: 'scatter'
      , x: data.map(monthNumberToDate)
      , y: data.map(m => m.principalRemaining)
      , line: { color }
      })
  }

  const series =
    [ createSeries(this.baseMonths, 'blue')
    , createSeries(this.comparisonMonths, 'orange')
    ]

  Plotly.newPlot('chartContainer', series, layout, options)
}

export default
  { name: 'chart'
  , methods: {}
  , props:
    { 'baseMonths': Array
    , 'comparisonMonths': Array
    }
  , watch:
    { 'baseMonths': drawChart
    , 'comparisonMonths': drawChart
    }
  }
</script>

<style lang="less" scoped>
</style>
