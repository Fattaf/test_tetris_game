var Figure = function() {
  this.position     = [5, 1];   //[width, height]
  this.figure_size  = [40, 40];
  this.body         = NaN;
  this.color        = NaN;

  var self = this;

  this.drawFigure = function(context) {
    context.beginPath();
    addFigure(context, this);
    addFill(context, this.color);
    addStroke(context, 'black', 2);
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

  // private functions
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

  // all helpers
  var addFigure = function(context) {
    for(var i = 0; i < self.body.length; i++) {
      var new_x = Math.abs((self.position[0] + self.body[i][0]) * self.figure_size[0]),
          new_y = Math.abs((self.position[1] + self.body[i][1]) * self.figure_size[1]);
      context.rect(new_x, new_y, self.figure_size[0], self.figure_size[1]);
    };
  };

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

var FigureBuilder = function() {
  this.build = function(type) {
    var figure = new Figure();
    return figureTypes[type](figure);
  };

  this.build_random_figure = function() {
    var figure = new Figure();
    var number = Math.floor((Math.random() * 10) % 7) + 1;
    return figureTypes['figureType' + number](figure);
  };
  // * * *
  //     *
  var figureType1 = function(figure) {
    figure.color = 'yellow';
    figure.body = [[-1, 0], [0, 0], [1, 0], [1, 1]];
    return figure;
  };
  // * * *
  //   *
  var figureType2 = function(figure) {
    figure.color = '#1487F8';
    figure.body = [[-1, 0], [0, 0], [1, 0], [0, 1]];
    return figure;
  };
  // * *
  //   * *
  var figureType3 = function(figure) {
    figure.color = '#0EEB1F';
    figure.body = [[-1, 0], [0, 0], [0, 1], [1, 1]];
    return figure;
  };
  // * *
  // * *
  var figureType4 = function(figure) {
    figure.color = '#FA4C23';
    figure.body = [[-1, 0], [0, 0], [0, 1], [-1, 1]];
    figure.turn = function() { return true; };
    return figure;
  };
  // * * * *
  //
  var figureType5 = function(figure) {
    figure.color = '#DF30D9';
    figure.body = [[-1, 0], [0, 0], [1, 0], [2, 0]];
    return figure;
  };
  // * * *
  // *
  var figureType6 = function(figure) {
    figure.color = '#F50000';
    figure.body = [[-1, 0], [0, 0], [1, 0], [-1, 1]];
    return figure;
  };
  //   * *
  // * *
  var figureType7 = function(figure) {
    figure.color = '#93E508';
    figure.body = [[0, 0], [1, 0], [-1, 1], [0, 1]];
    return figure;
  };

  var figureTypes = {
    'figureType1': figureType1,
    'figureType2': figureType2,
    'figureType3': figureType3,
    'figureType4': figureType4,
    'figureType5': figureType5,
    'figureType6': figureType6,
    'figureType7': figureType7,
  };

  return this;
}
