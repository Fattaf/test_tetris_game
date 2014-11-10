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

  var self = this;

  this.drawField = function(context) {
    _drawBorder(context);
    _drawBackgroundCells(context);
    _drawFilledCells(context);
  };

  this.checkIfCovered = function(shape) {
    for(var i = 0; i < shape.length; i++) {
      if (this.miniMap[shape[i][1]][shape[i][0]] == 1) { return true };
    };
    return false;
  };

  this.addToCover = function(shape) {
   for(var i = 0; i < shape.length; i++) {
      this.miniMap[shape[i][1]][shape[i][0]] = 1;
    };
  };

  this.handleFullCoveredLines = function() {
    var etalon = [0,0,0,0,0,0,0,0,0,0];
    for(var i = 0; i < this.miniMap.length; i++) {
      if (_checkFullCoveredLine(this.miniMap[i])) {
        this.miniMap.splice(i,1);
        this.miniMap.unshift(etalon);
      };
    };
  };

  // private functions
  var _checkFullCoveredLine = function(line_array) {
    var count = 0,
        result = false;

    for(var i = 0; i < line_array.length; i++) {
      count += line_array[i];
    };
    if (count == line_array.length) { result = true; };
    return result;
  };

  var _drawBorder = function(context) {
    context.beginPath();
    context.rect( self.position[0] - 3,
                  self.position[1] - 3,
                  (self.x_cells * self.disp) + 6,
                  (self.y_cells * self.disp) + 6 )
    addStroke(context, '#black', 3);
  };

  var _drawBackgroundCells = function(context) {
    context.beginPath();
    for (var i = 0; i < self.miniMap.length; i++) {
      for(var j = 0; j < self.miniMap[i].length; j++) {
        context.rect((self.disp * j) + self.position[0],
                     (self.disp * i) + self.position[1],
                     40, 40);
      };
    };
    addFill(context, '#FFFFFF');
    addStroke(context, '#EDEDED', 1);
  };

  var _drawFilledCells = function(context) {
    context.beginPath();
    for (var i = 0; i < self.miniMap.length; i++) {
      for(var j = 0; j < self.miniMap[i].length; j++) {
        if (self.miniMap[i][j] == 1){
          context.rect((self.disp * j) + self.position[0],
                       (self.disp * i) + self.position[1],
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
