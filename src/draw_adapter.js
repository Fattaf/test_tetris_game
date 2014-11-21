var DrawAdapter = function(canvas_div) {
  this.canvas = canvas_div;
  this.context = this.canvas.getContext('2d');

  this.clear_canvas = function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };

  this.addScore = function(score) {
    // FIXME: change font
    this.context.font = 'italic 30pt Calibri';
    this.context.fillText('Score: ' + score, 420, 100);
  };

  this.addBorder = function(start_point, end_point, color, lineWidth) {
    this.context.beginPath();
    this.context.rect(start_point[0] - 3,
                      start_point[1] - 3,
                      end_point[0] + 6,
                      end_point[1] + 6 );
    this.addStroke(this.context, color, lineWidth);
  };

  this.addFill = function(color) {
    this.context.fillStyle = color;
    this.context.fill();
  };

  this.addStroke = function(color, lineWidth) {
    this.context.lineWidth = lineWidth;
    this.context.strokeStyle = color;
    this.context.stroke();
  };

  this.addFigure = function(figure) {
    // FIXME: do something with null_x and null_y
    var null_x = 10;
    var null_y = 10;

    this.context.beginPath();
    for(var i = 0; i < figure.body.length; i++) {
      var new_x = null_x + Math.abs((figure.position[0] + figure.body[i][0]) * figure.figure_size[0]),
          new_y = null_y + Math.abs((figure.position[1] + figure.body[i][1]) * figure.figure_size[1]);
      this.context.rect(new_x, new_y, figure.figure_size[0], figure.figure_size[1]);
    };
  };

  this.addFieldBackground = function(field) {
    this.context.beginPath();
    for (var i = 0; i < field.miniMap.length; i++) {
      for(var j = 0; j < field.miniMap[i].length; j++) {
        this.context.rect((field.disp * j) + field.position[0],
                          (field.disp * i) + field.position[1],
                          40, 40);
      };
    };
    this.addFill('#FFFFFF');
    this.addStroke('#EDEDED', 1);
  };

  this.drawFieldMarkedCells = function(field) {
    this.context.beginPath();
    for (var i = 0; i < field.miniMap.length; i++) {
      for(var j = 0; j < field.miniMap[i].length; j++) {
        if (field.miniMap[i][j] == 1){
          this.context.rect((field.disp * j) + field.position[0],
                            (field.disp * i) + field.position[1],
                            40, 40);
        };
      };
    };
    this.addFill('#9ED0FF');
    this.addStroke('black', 3);
  };

  return this;
};
