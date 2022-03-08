let sGrafica1 =document.getElementById('grafica1');

var data = {
    // A labels array that can contain any sort of values
    labels: ['dia1', 'dia2', 'dia3', 'dia4', 'dia5', 'dia6', 'dia7'],
    // Our series array that contains series objects or in this case series data arrays
    series: [
      [5, 8, 4, 5, 1, 8, 10]
    ]
  };
  var options = {
    width: 300,
    height: 200
  };
  
  // Create a new line chart object where as first parameter we pass in a selector
  // that is resolving to our chart container element. The Second parameter
  // is the actual data object.
  new Chartist.Line('.ct-chart', data, 
    {low: 0,
    showArea: true});