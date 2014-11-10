var Figure = function(drawAdapter) {
  this.position     = [5, 0];   //disps: [width, height]
  this.figure_size  = [40, 40];
  this.body         = NaN;
  this.color        = NaN;

  var self = this;

  this.drawFigure = function(context) {
    drawAdapter.addFigure(context, this);
    drawAdapter.addFill(context, this.color);
    drawAdapter.addStroke(context, 'black', 2);
  };

  // TODO: refactoring
  this.countShape = function() {
    var shape = [];
    for(var i = 0; i < this.body.length; i++) {
      shape.push([this.body[i][0] + this.position[0],
                  this.body[i][1] + this.position[1]]);
    };
    return shape;
  };
  // TODO: refactoring
  this.countDownShape = function() {
    var shape = [];
    for(var i = 0; i < this.body.length; i++) {
      shape.push([this.body[i][0] + this.position[0],
                  this.body[i][1] + this.position[1] + 1]);
    };
    return shape;
  };

  // FIXME: take a look on rotation!!
  this.turn = function() {
    for(var i = 0; i < this.body.length; i++) {
      this.body[i] = [this.body[i][1], -this.body[i][0]]
    };
  };

  this.pullLeft = function(edge) {
    if (_find_min_x() + this.position[0] - 1 >= edge) {
      this.position[0] -= 1;
    };
  };

  this.pullRight = function(edge) {
    if (_find_max_x() + this.position[0] + 1 < edge) {
      this.position[0] += 1;
    };
  };

  this.pullDown = function(field) {
    if (_find_max_y() + this.position[1] + 1 >= field.y_cells) { return false; };
    if (_if_will_cover(field)) { return false; };
    this.position[1] += 1;
    return true;
  };

  // private methods

    var _if_will_cover = function(field) {
      var shape = self.countDownShape();
      return field.checkIfCovered(shape);
    };

    // TODO: refactoring
    var _find_max_x = function() {
      var max_x = self.body[0][0];
      for(var i = 1; i < self.body.length; i++) {
        if (max_x < self.body[i][0]) {
          max_x = self.body[i][0];
        };
      };
      return max_x;
    };

    var _find_max_y = function() {
      var max_y = self.body[0][1];
      for(var i = 1; i < self.body.length; i++) {
        if (max_y < self.body[i][1]) {
          max_y = self.body[i][1];
        };
      };
      return max_y;
    };

    var _find_min_x = function() {
      var min_x = self.body[0][0];
      for(var i = 1; i < self.body.length; i++) {
        if (min_x > self.body[i][0]) {
          min_x = self.body[i][0];
        };
      };
      return min_x;
    };

  return this;
};
