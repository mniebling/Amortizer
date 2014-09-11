$(document).ready(function() {

  // Set up data structures and template
  var datasetInitial = {},
      datasetComparison = {},
      tmpl = $('#tmpl').html();

  // Set up chart size
  var w = 500,
      h = 250,

      // Padding
      left   = 65,
      right  = 10,
      top    = 20,
      bottom = 30;

  // Set up chart scales (for later)
  var x, y;

  // Set up the chart boundaries
  var chart = d3.select('.output-contents-chart').append('svg:svg')
                .attr('width', w)
                .attr('height', h)
                .attr('class', 'chart')
                .append('svg:g');

  // Set up line calculator function
  var line = d3.svg.line()
                   .x(function(d, i) { return x(i); })
                   .y(function(d)    { return y(d); });


  // We don't want to store formatted strings, because we'll d3-render it later
  // So let's set up a formatting lambda the template can use
  function formatValue() {

    return function(value) {

      return accounting.formatMoney(value, '$ ');
    }
  };


  // Create a data structure containing monthly payoff data
  // by looking at one of the input blocks for principal, interest, term
  function createDatasetFromInputs($inputContainer) {

    var dataset         = {},
        principal       = $inputContainer.find('.input-principal').val(),
        monthlyInterest = $inputContainer.find('.input-interest').val() / 1200,
        months          = $inputContainer.find('.input-months').val();

    dataset.fmt = formatValue;

    dataset.monthlyPayment = principal * (monthlyInterest / (1 - (Math.pow(1 + monthlyInterest, -months))));
    dataset.months = [];


    var newPrincipal = principal,
        i = 0,
        monthData = {};

    while (principal > 0) {

      var thisMonthsInterest  = principal * monthlyInterest,
          thisMonthsPrincipal = dataset.monthlyPayment - thisMonthsInterest;

      newPrincipal = principal - thisMonthsPrincipal;

      // add to dataset
      monthData = {};
      monthData.monthNumber = i;
      monthData.principalRemaining = parseFloat(principal);
      monthData.principal = thisMonthsPrincipal;
      monthData.interest = thisMonthsInterest;

      dataset.months.push(monthData);

      i++;
      principal = newPrincipal;
    }

    return dataset;
  }



  // --------------
  // EVENT HANDLERS
  // --------------

  $('#calculate').click(function() {

    // Crunch numbers and set up UI
    datasetInitial = createDatasetFromInputs($('.input-container-calculate'));

    $('.output-contents-message').hide();
    $('.input-container-compare').css('display', 'inline-block');

    console.log(datasetInitial);

    // Update inputs
    $('.input-container-calculate .input-payment').val(accounting.formatMoney(datasetInitial.monthlyPayment));

    // Draw chart
    $('.output').show();
    $('.output-contents-table').html(Mustache.render(tmpl, datasetInitial));
    drawChart(datasetInitial);
  });


  $('#compare').click(function() {

    datasetComparison = createDatasetFromInputs($('.input-container-compare'));

    drawChart(datasetComparison);
  });



  // -----------------
  // D3.JS TIME WOOOOO
  // -----------------

  function drawChart(dataset) {


    var data = dataset.months.map(function (item) {

      return item.principalRemaining;
    });


    // Scale the axes if necessary
    if (typeof(x) === 'undefined') {

      x = d3.scale.linear().domain([0, data.length]).range([left, w - right]);
      y = d3.scale.linear().domain([0, d3.max(data)]).range([h - bottom, top]);

      // Create axes
      var xAxis = d3.svg.axis()
                        .scale(x)
                        .orient('bottom');

      var yAxis = d3.svg.axis()
                        .scale(y)
                        .orient('left');

      // Draw axes
      chart.append('svg:g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + (h - bottom) + ')')
            .call(xAxis);

      chart.append('svg:g')
            .attr('class', 'y axis')
            .attr('transform', 'translate(' + left + ', 0)')
            .call(yAxis);
    }


    // Draw line
    chart.append('svg:path')
          .attr('d', line(data));
  }



  // ------------
  // AWESOME TABS
  // ------------

  $('.output-tab').on('click', function() {

      $('.output-tab').removeClass('selected');
      $(this).addClass('selected');

      $('.output-contents-chart, .output-contents-table').hide();
      $('.' + $(this).attr('data-tab-target')).show();
  });
});
