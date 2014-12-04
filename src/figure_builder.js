var FigureBuilder = function(drawAdapter) {

  this.build = function(type) {
    var figure = new Figure(drawAdapter);
    return figureTypes[type](figure);
  };

  this.build_random_figure = function() {
    var figure = new Figure(drawAdapter);
    var number = Math.floor((Math.random() * 10) % 7) + 1;
    return figureTypes['figureType' + number](figure);
  };

  //private methods

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

      figure.buildTurn = function() {
        var new_body = [];
        for(var i = 0; i < this.body.length; i++) {
          new_body.push([this.body[i][1], this.body[i][0]]);
        };
        return new_body;
      };

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
};
