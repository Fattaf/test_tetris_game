var DrawAdapter = function(canvas_div) {
  var canvas  = canvas_div;
  var context = canvas.getContext('2d');

  this.draw_image = function(src) {
    var imageObj = new Image();
    var self = this;

    imageObj.onload = function() { context.drawImage(imageObj, 70, 50); };
    imageObj.src = src;
  };

  this.clear_canvas = function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  this.addScore = function(score) {
    context.font = '30pt Roboto sans-serif';
    context.fillStyle = '#898181';
    context.fillText('Score: ' + score, 450, 100);
  };

  this.addBorder = function(start_point, end_point, color, lineWidth) {
    context.beginPath();
    context.rect(start_point[0] - 3,
                 start_point[1] - 3,
                 end_point[0] + 6,
                 end_point[1] + 6 );
    this.addStroke(context, color, lineWidth);
  };

  this.addFill = function(color) {
    context.fillStyle = color;
    context.fill();
  };

  this.addStroke = function(color, lineWidth) {
    context.lineWidth = lineWidth;
    context.strokeStyle = color;
    context.stroke();
  };

  this.addFigure = function(figure, null_x, null_y) {
    // FIXME: do something with null_x and null_y
    if (null_x === undefined) { null_x = 10; }
    if (null_y === undefined) { null_y = 10; }

    context.beginPath();
    for(var i = 0; i < figure.body.length; i++) {
      context.rect( count_position(null_x, 0, i),
                    count_position(null_y, 1, i),
                    figure.figure_size[0],
                    figure.figure_size[1]);
    }
  };

  this.addFieldBackground = function(field) {
    context.beginPath();
    forEachInMatrix(field, function(field, i, j) {
      buildRectangle(field, i, j);
    });
    this.addFill('#FFFFFF');
    this.addStroke('#EDEDED', 1);
  };

  this.drawFieldMarkedCells = function(field) {
    context.beginPath();
    forEachInMatrix(field, function(field, i, j) {
      if (field.miniMap[i][j] == 1) { buildRectangle(field, i, j); }
    });
    this.addFill('#9ED0FF');
    this.addStroke('black', 3);
  };

  // private methods
    var buildRectangle = function(field, i, j) {
      context.rect((field.disp * j) + field.position[0],
                   (field.disp * i) + field.position[1],
                   40, 40);
    };

    var forEachInMatrix = function(field, block) {
      for (var i = 0; i < field.miniMap.length; i++) {
        for(var j = 0; j < field.miniMap[i].length; j++) {
          block(field, i, j);
        }
      }
    };

    var count_position = function(null_val, index, i) {
      var sum = figure.position[index] + figure.body[i][index],
          figure_size = Math.abs(sum * figure.figure_size[index]);
      return null_val + figure_size;
    };

  return this;
};
