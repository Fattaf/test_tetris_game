
var Figure = function() {
  this.position     = [50, 50];
  this.figure_size  = [40, 40];
  this.part_disps   = NaN;
  this.color        = NaN;

  this.drawFigure = function(context) {
    context.beginPath();
    for(var i = 0; i < this.part_disps.length; i++) {
      context.rect( this.position[0] + this.part_disps[i][0],
                    this.position[1] + this.part_disps[i][1],
                    this.figure_size[0],
                    this.figure_size[1] );
    };
    context.fillStyle = this.color;
    context.fill();
    context.lineWidth = 3;
    context.strokeStyle = 'black';
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
    figure.part_disps = [[0, 0], [40, 0], [80, 0], [80, 40]];
    figure.color = 'yellow';
    return figure;
  };
  // * * *
  //   *
  var figureType2 = function(figure) {
    figure.part_disps = [[0, 0], [40, 0], [80, 0], [40, 40]];
    figure.color = '#1487F8';
    return figure;
  };
  // * *
  //   * *
  var figureType3 = function(figure) {
    figure.part_disps = [[0, 0], [40, 0], [40, 40], [80, 40]];
    figure.color = '#0EEB1F';
    return figure;
  };
  // * *
  // * *
  var figureType4 = function(figure) {
    figure.part_disps = [[0, 0], [40, 0], [40, 40], [0, 40]];
    figure.color = '#FA4C23';
    return figure;
  };
  // * * * *
  //
  var figureType5 = function(figure) {
    figure.part_disps = [[0, 0], [40, 0], [80, 0], [120, 0]];
    figure.color = '#DF30D9';
    return figure;
  };
  // * * *
  // *
  var figureType6 = function(figure) {
    figure.part_disps = [[0, 0], [40, 0], [80, 0], [0, 40]];
    figure.color = '#F50000';  //'#E9181C';
    return figure;
  };
  //   * *
  // * *
  var figureType7 = function(figure) {
    figure.part_disps = [[40, 0], [80, 0], [0, 40], [40, 40]];
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
