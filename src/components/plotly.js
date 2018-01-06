// Only bundle the needed chart types.
// For more info: https://github.com/plotly/plotly.js#modules
import Plotly from 'plotly.js/lib/core'
import Scatter from 'plotly.js/lib/scatter'

Plotly.register([ Scatter ])

export default Plotly
