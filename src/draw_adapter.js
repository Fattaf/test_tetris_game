var DrawAdapter = function(canvas_div) {
  // this.canvas = canvas_div;
  // this.context = canvas.getContext('2d');

  this.addBorder = function(context, start_point, end_point, color, lineWidth) {
    context.beginPath();
    context.rect( start_point[0] - 3,
                  start_point[1] - 3,
                  end_point[0] + 6,
                  end_point[1] + 6 );
    this.addStroke(context, color, lineWidth);
  };

  this.addFill = function(context, color) {
    context.fillStyle = color;
    context.fill();
  };

  this.addStroke = function(context, color, lineWidth) {
    context.lineWidth = lineWidth;
    context.strokeStyle = color;
    context.stroke();
  };

  this.addFigure = function(context, figure) {
    context.beginPath();
    for(var i = 0; i < figure.body.length; i++) {
      var new_x = Math.abs((figure.position[0] + figure.body[i][0]) * figure.figure_size[0]),
          new_y = Math.abs((figure.position[1] + figure.body[i][1]) * figure.figure_size[1]);
      context.rect(new_x, new_y, figure.figure_size[0], figure.figure_size[1]);
    };
  };

  this.addFieldBackground = function(context, field) {
    context.beginPath();
    for (var i = 0; i < field.miniMap.length; i++) {
      for(var j = 0; j < field.miniMap[i].length; j++) {
        context.rect((field.disp * j) + field.position[0],
                     (field.disp * i) + field.position[1],
                     40, 40);
      };
    };
    this.addFill(context, '#FFFFFF');
    this.addStroke(context, '#EDEDED', 1);
  };

  this.drawFieldMarkedCells = function(context, field) {
    context.beginPath();
    for (var i = 0; i < field.miniMap.length; i++) {
      for(var j = 0; j < field.miniMap[i].length; j++) {
        if (field.miniMap[i][j] == 1){
          context.rect((field.disp * j) + field.position[0],
                       (field.disp * i) + field.position[1],
                       40, 40);
        };
      };
    };
    this.addFill(context, '#9ED0FF');
    this.addStroke(context, 'black', 3);
  };

  return this;
};
