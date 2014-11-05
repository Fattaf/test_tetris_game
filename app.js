// movement
//
var animate = function(figure, field, canvas, context) {
  var disp_step = 40;
  figure.position[1] += disp_step;
  // clear
  context.clearRect(0, 0, canvas.width, canvas.height);
  // draw

  field.drawField(context);
  figure.drawFigure(context);
  // request new frame
  setTimeout(function() {
    animate(figure, field, canvas, context);
  }, 1000)
}

// main script
//
window.onload = function () {
  var canvas = document.getElementById('playground');
  var context = canvas.getContext('2d');

  var field = new Field();
  var figureBuilder = new FigureBuilder()
  var figure = figureBuilder.build_random_figure();

  field.drawField(context);
  figure.drawFigure(context);

  // setTimeout(function() {
  //   animate(figure, field, canvas, context);
  // }, 1000);
}
