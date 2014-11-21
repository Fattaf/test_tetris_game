var Figure = function(drawAdapter) {
  this.position     = [5, 1];   //disps: [width, height]
  this.figure_size  = [40, 40];
  this.body         = NaN;
  this.color        = NaN;

  var self = this;

  this.drawFigure = function() {
    drawAdapter.addFigure(this);
    drawAdapter.addFill(this.color);
    drawAdapter.addStroke('black', 2);
  };

  this.turn = function(min_edge, max_edge, field) {
    if ((this.position[0] >= max_edge - 1) || (this.position[0] <= min_edge)) { return false; };

    var tmp_body = this.buildTurn(),
           shape = _countAnyShape(tmp_body);

    if (field.isWillCover(shape)) { return false; };

    this.body = tmp_body;
    return true;
  };

  this.pullLeft = function(min_edge, field) {
    var new_x = _find_min_x() + this.position[0] - 1;

    if (_ifWillCover(field, [-1, 0])) { return false; };
    if (new_x < min_edge) { return false; };
    this.position[0] -= 1;
    return true;
  };

  this.pullRight = function(max_edge, field) {
    var new_x = _find_max_x() + this.position[0] + 1;

    if (_ifWillCover(field, [1, 0])) { return false; };
    if (new_x >= max_edge) { return false; };
    this.position[0] += 1;
    return true;
  };

  this.pullDown = function(field) {
    var new_y = _find_max_y() + this.position[1] + 1;

    if (_ifWillCover(field, [0, 1])) { return false; };
    if (new_y >= field.y_cells) { return false; };
    this.position[1] += 1;
    return true;
  };

  this.buildTurn = function() {
    var new_body = []
    for(var i = 0; i < this.body.length; i++) {
      new_body.push([this.body[i][1], -this.body[i][0]])
    };
    return new_body;
  };

  // private methods
    var _ifWillCover = function(field, step) {
      var shape = _countShape(step);
      return field.isWillCover(shape);
    };

    var _countShape = function(step) {
      if (step === undefined) { step = [0, 0] };
      var shape = [];
      for(var i = 0; i < self.body.length; i++) {
        shape.push([self.body[i][0] + step[0] + self.position[0],
                    self.body[i][1] + step[1] + self.position[1]]);
      };
      return shape;
    };

    var _countAnyShape = function(body) {
      var shape = [];
      for(var i = 0; i < body.length; i++) {
        shape.push([body[i][0] + self.position[0],
                    body[i][1] + self.position[1]]);
      };
      return shape;
    };

    // TODO: refactoring
    var _find_max_x = function() {
      var tmp_array = [];
      for(var i = 0; i < self.body.length; i++) {
        tmp_array.push(self.body[i][0])
      };
      return Math.max.apply(null, tmp_array)
    };

    var _find_max_y = function() {
      var tmp_array = [];
      for(var i = 0; i < self.body.length; i++) {
        tmp_array.push(self.body[i][1])
      };
      return Math.max.apply(null, tmp_array)
    };

    var _find_min_x = function() {
      var tmp_array = [];
      for(var i = 0; i < self.body.length; i++) {
        tmp_array.push(self.body[i][0])
      };
      return Math.min.apply(null, tmp_array)
    };

  return this;
};
