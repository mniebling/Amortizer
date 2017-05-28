<template>
  <div id="chartContainer"></div>
</template>

<script>
import Plotly from './plotly'

const layout =
  { title: 'Mortgage Baseline'
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

let drawChart = function (data) {

  let series =
    { type: 'scatter'
    , x: data.months.map(m => m.monthNumber)
    , y: data.months.map(m => m.principalRemaining)
    }

  Plotly.newPlot('chartContainer', [series], layout, options)
}

export default
  { name: 'chart'
  , methods: {}
  , props: { 'data': Object }
  , watch: { 'data': drawChart }
  }
</script>

<style lang="less" scoped>
</style>
