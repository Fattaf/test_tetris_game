var Figure = function(drawAdapter) {
  this.position     = [5, 1];   //disps: [width, height]
  this.figure_size  = [40, 40];
  this.body         = NaN;
  this.color        = NaN;

  var self = this;

  this.drawFigure = function(context) {
    drawAdapter.addFigure(context, this);
    drawAdapter.addFill(context, this.color);
    drawAdapter.addStroke(context, 'black', 2);
  };

  this.countShape = function() {
    var shape = [];
    for(var i = 0; i < this.body.length; i++) {
      shape.push([this.body[i][0] + this.position[0],
                  this.body[i][1] + this.position[1]]);
    };
    return shape;
  };

  // FIXME: take a look on rotation!!
  this.turn = function(min_edge, max_edge) {
    if ((this.position[0] < max_edge - 1) && (this.position[0] > min_edge)) {
      for(var i = 0; i < this.body.length; i++) {
        this.body[i] = [this.body[i][1], -this.body[i][0]]
      };
    };
  };

  this.pullLeft = function(min_edge) {
    var new_x = _find_min_x() + this.position[0] - 1;
    if (new_x >= min_edge) {
      this.position[0] -= 1;
    };
  };

  this.pullRight = function(max_edge) {
    var new_x = _find_max_x() + this.position[0] + 1;
    if (new_x < max_edge) {
      this.position[0] += 1;
    };
  };

  this.pullDown = function(field) {
    if (_find_max_y() + this.position[1] + 1 >= field.y_cells) { return false; };
    if (_ifWillCover(field)) { return false; };
    this.position[1] += 1;
    return true;
  };

  // private methods

    var _ifWillCover = function(field) {
      var shape = self.countShape();
      return field.isWillCover(shape);
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
