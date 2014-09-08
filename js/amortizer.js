$(document).ready(function() {

  var datasetInitial = {},
      datasetComparison = {},
      tmpl = $('#tmpl').html();


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

    $('.output-contents-table').html(Mustache.render(tmpl, datasetInitial));

    drawChart(datasetInitial);
  });


  $('#compare').click(function() {

    datasetInitial = createDatasetFromInputs($('.input-container-compare'));

    drawChart(datasetComparison);
  });



  // -----------------
  // D3.JS TIME WOOOOO
  // -----------------

  function drawChart(dataset) {


    var data = datasetInitial.months.map(function (item) {

      return item.principalRemaining;
    });


    // Set up bounds & margins
    var m = [10, 10, 10, 10],
        w = 500 - m[1] - m[3],
        h = 250 - m[0] - m[2],
        x = d3.scale.linear().domain([0, data.length]).range([0, w]),
        y = d3.scale.linear().domain([0, d3.max(data)]).range([h, 0]);

    // Set up the chart
    var graph = d3.select('.output-contents-chart').append('svg:svg')
                 .attr('width', w + m[1] + m[3] + 75)
                 .attr('height', h + m[0] + m[2])
                 .append('svg:g')
                 .attr('transform', 'translate(75, 0)');

    // Set up line calculator function
    var line = d3.svg.line()
                  .x(function(d, i) { return x(i); })
                  .y(function(d)    { return y(d); });

    // Create axes
    var xAxis = d3.svg.axis().scale(x).tickSize(-h).tickSubdivide(true);
    var yAxis = d3.svg.axis().scale(y).ticks(4).orient('left');

    // Draw axes
    graph.append('svg:g')
          .attr('class', 'x axis')
          .attr('transform', 'translate(0,' + h + ')')
          .call(xAxis);

    graph.append('svg:g')
          .attr('class', 'y axis')
          .call(yAxis);

    // Draw line
    graph.append('svg:path')
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
