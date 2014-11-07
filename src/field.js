var Field = function() {
  this.position = [10, 10];
  this.miniMap = [[0, 0, 0 ,0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0 ,0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0 ,0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0 ,0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0 ,0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0 ,0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0 ,0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0 ,0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0 ,0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0 ,0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0 ,0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0 ,0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0 ,0, 0, 1, 0, 0, 0, 0],
                  [0, 0, 0 ,0, 1, 1, 0, 0, 0, 0],
                  [0, 0, 0 ,1, 1, 1, 0, 0, 0, 0],
                  [0, 0, 1 ,1, 1, 1, 0, 0, 0, 0]];
  this.disp = 40;
  this.x_cells = 10;     // FIXME: refactoring
  this.y_cells = 16;     // FIXME: refactoring

  this.drawField = function(context) {
    _drawBorder(context, this);
    _drawBackgroundCells(context, this);
    _drawFilledCells(context, this);
  };

  // private functions
  var _drawBorder = function(context, field) {
    context.beginPath();
    context.rect( field.position[0] - 3,
                  field.position[1] - 3,
                  (field.x_cells * field.disp) + 6,
                  (field.y_cells * field.disp) + 6 )
    addStroke(context, '#black', 3);
  };

  var _drawBackgroundCells = function(context, field) {
    context.beginPath();
    for (var i = 0; i < field.miniMap.length; i++) {
      for(var j = 0; j < field.miniMap[i].length; j++) {
        context.rect((field.disp * j) + field.position[0],
                     (field.disp * i) + field.position[1],
                     40, 40);
      };
    };
    addFill(context, '#FFFFFF');
    addStroke(context, '#EDEDED', 1);
  };

  var _drawFilledCells = function(context, field) {
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
    addFill(context, '#9ED0FF');
    addStroke(context, 'black', 3);
  };

  // helpers
  var addFill = function(context, color) {
    context.fillStyle = color;
    context.fill();
  };

  var addStroke = function(context, color, lineWidth) {
    context.lineWidth = lineWidth;
    context.strokeStyle = color;
    context.stroke();
  };

  return this;
};
