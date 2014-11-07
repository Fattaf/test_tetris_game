
var Figure = function() {
  this.position     = [1, 1];
  this.figure_size  = [40, 40];
  this.max_disp     = 3;
  this.part_disps   = NaN;
  this.color        = NaN;

  this.drawFigure = function(context) {
    context.beginPath();
    for(var i = 0; i < this.part_disps.length; i++) {
      context.rect( (this.position[0] + this.part_disps[i][0]) * this.figure_size[0],
                    (this.position[1] + this.part_disps[i][1]) * this.figure_size[0],
                    this.figure_size[0],
                    this.figure_size[1] );
    };
    addFill(context, this.color);
    addStroke(context, 'black', 2);
  };

  // FIXME: too big rotation !!
  this.turn = function() {
    var tmp_disps = [];
    for(var i = 0; i < this.part_disps.length; i++) {
      var element1 = this.part_disps[i][1],
          element2 = this.max_disp - this.part_disps[i][0] - 1;
      tmp_disps.push([element1, element2])
    };
    this.part_disps = tmp_disps;
  };

  this.pullLeft = function(field) {
    if (_isOnField(field, this.position[0] - 1)) {
      this.position[0] -= 1;
    };
  };

  this.pullRight = function(field) {
    if (_isOnField(field, this.position[0] + 1)) {
      this.position[0] += 1;
    };
  };

  this.pullDown = function() {
    // check if figure still on field
    // check if figure is not on built part
    this.position[1] += 1;
  };

  // private functions
  var _isOnField = function(field, position) {
    return (position <= field.x_cells) && (position >= 0);
  };

  // all helpers
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
    figure.part_disps = [[0, 0], [1, 0], [2, 0], [2, 1]];
    figure.color = 'yellow';
    return figure;
  };
  // * * *
  //   *
  var figureType2 = function(figure) {
    figure.part_disps = [[0, 0], [1, 0], [2, 0], [1, 1]];
    figure.color = '#1487F8';
    return figure;
  };
  // * *
  //   * *
  var figureType3 = function(figure) {
    figure.part_disps = [[0, 0], [1, 0], [1, 1], [2, 1]];
    figure.color = '#0EEB1F';
    return figure;
  };
  // * *
  // * *
  var figureType4 = function(figure) {
    figure.part_disps = [[0, 0], [1, 0], [1, 1], [0, 1]];
    figure.color = '#FA4C23';
    return figure;
  };
  // * * * *
  //
  var figureType5 = function(figure) {
    figure.part_disps = [[0, 0], [1, 0], [2, 0], [3, 0]];
    figure.color = '#DF30D9';
    return figure;
  };
  // * * *
  // *
  var figureType6 = function(figure) {
    figure.part_disps = [[0, 0], [1, 0], [2, 0], [0, 1]];
    figure.color = '#F50000';
    return figure;
  };
  //   * *
  // * *
  var figureType7 = function(figure) {
    figure.part_disps = [[1, 0], [2, 0], [0, 1], [1, 1]];
    figure.color = '#93E508';
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
