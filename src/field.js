var Field = function(drawAdapter) {
  this.position = [10, 10];
  this.miniMap = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
  this.disp = 40;
  this.x_cells = 10;     // FIXME: refactoring
  this.y_cells = 16;     // FIXME: refactoring

  var self = this;

  this.drawField = function() {
    var end_point = [(self.x_cells * self.disp), (self.y_cells * self.disp)]

    drawAdapter.addBorder(self.position, end_point, 'black', 3);
    drawAdapter.addFieldBackground(this);
    drawAdapter.drawFieldMarkedCells(this);
  };

  this.isWillCover = function(shape) {
    for(var i = 0; i < shape.length; i++) {
      var element = this.miniMap[shape[i][1]][shape[i][0]];
      if (element == 1) { return true };
    };
    return false;
  };

  this.addToCover = function(shape) {
   for(var i = 0; i < shape.length; i++) {
      this.miniMap[shape[i][1]][shape[i][0]] = 1;
    };
  };

  this.handleFullCoveredLines = function() {
    var etalon = [0,0,0,0,0,0,0,0,0,0],
        removed_lines = 0;
    for(var i = 0; i < this.miniMap.length; i++) {
      if (_checkFullCoveredLine(this.miniMap[i])) {
        this.miniMap.splice(i,1);
        this.miniMap.unshift(etalon);
        removed_lines++;
      };
    };
    return removed_lines;
  };

  this.isOverfilled = function() {
    for(var i = 0; i < this.miniMap[1].length; i++) {
      if(this.miniMap[1][i] > 0) { return true; };
    };
    return false;
  };


  // private methods
    var _checkFullCoveredLine = function(line_array) {
      var count = sumLine(line_array);
      if (count == line_array.length) { return true; };
      return false;
    };

    var sumLine = function(line_array) {
      var count = 0;
      for(var i = 0; i < line_array.length; i++) {
        count += line_array[i];
      };
      return count;
    };

  return this;
};
