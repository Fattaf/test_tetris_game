var DrawAdapter = function(canvas_div) {
  var canvas  = canvas_div;
  var context = canvas.getContext('2d');

  this.draw_image = function(src) {
    var imageObj = new Image();
    var self = this;

    imageObj.onload = function() { context.drawImage(imageObj, 70, 50); };
    imageObj.src = src;
  };

  this.clear_canvas = function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  this.addScore = function(score) {
    context.font = '30pt Roboto sans-serif';
    context.fillStyle = '#898181';
    context.fillText('Score: ' + score, 450, 100);
  };

  this.addBorder = function(start_point, end_point, color, lineWidth) {
    context.beginPath();
    context.rect(start_point[0] - 3,
                 start_point[1] - 3,
                 end_point[0] + 6,
                 end_point[1] + 6 );
    this.addStroke(context, color, lineWidth);
  };

  this.addFill = function(color) {
    context.fillStyle = color;
    context.fill();
  };

  this.addStroke = function(color, lineWidth) {
    context.lineWidth = lineWidth;
    context.strokeStyle = color;
    context.stroke();
  };

  this.addFigure = function(figure, null_x, null_y) {
    // FIXME: do something with null_x and null_y
    if (null_x === undefined) { null_x = 10; }
    if (null_y === undefined) { null_y = 10; }

    context.beginPath();
    for(var i = 0; i < figure.body.length; i++) {
      context.rect( null_x + count_position(figure, 0, i),
                    null_y + count_position(figure, 1, i),
                    figure.figure_size[0],
                    figure.figure_size[1]);
    }
  };

  this.addFieldBackground = function(field) {
    context.beginPath();
    forEachInMatrix(field, function(field, i, j) {
      buildRectangle(field, i, j);
    });
    this.addFill('#FFFFFF');
    this.addStroke('#EDEDED', 1);
  };

  this.drawFieldMarkedCells = function(field) {
    context.beginPath();
    forEachInMatrix(field, function(field, i, j) {
      if (field.miniMap[i][j] == 1) { buildRectangle(field, i, j); }
    });
    this.addFill('#9ED0FF');
    this.addStroke('black', 3);
  };

  // private methods
    var buildRectangle = function(field, i, j) {
      context.rect((field.disp * j) + field.position[0],
                   (field.disp * i) + field.position[1],
                   40, 40);
    };

    var forEachInMatrix = function(field, block) {
      for (var i = 0; i < field.miniMap.length; i++) {
        for(var j = 0; j < field.miniMap[i].length; j++) {
          block(field, i, j);
        }
      }
    };

    var count_position = function(figure, index, i) {
      var sum = figure.position[index] + figure.body[i][index];
      return Math.abs(sum * figure.figure_size[index]);
    };

  return this;
};
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
    var end_point = [(self.x_cells * self.disp), (self.y_cells * self.disp)];

    drawAdapter.addBorder(self.position, end_point, 'black', 3);
    drawAdapter.addFieldBackground(this);
    drawAdapter.drawFieldMarkedCells(this);
  };

  this.isWillCover = function(shape) {
    for(var i = 0; i < shape.length; i++) {
      var element = this.miniMap[shape[i][1]][shape[i][0]];
      if (element == 1) { return true; }
    }
    return false;
  };

  this.addToCover = function(shape) {
   for(var i = 0; i < shape.length; i++) {
      this.miniMap[shape[i][1]][shape[i][0]] = 1;
    }
  };

  this.handleFullCoveredLines = function() {
    var etalon = [0,0,0,0,0,0,0,0,0,0],
        removed_lines = 0;
    for(var i = 0; i < this.miniMap.length; i++) {
      if (_checkFullCoveredLine(this.miniMap[i])) {
        this.miniMap.splice(i,1);
        this.miniMap.unshift(etalon);
        removed_lines++;
      }
    }
    return removed_lines;
  };

  this.isOverfilled = function() {
    for(var i = 0; i < this.miniMap[1].length; i++) {
      if(this.miniMap[1][i] > 0) { return true; }
    }
    return false;
  };


  // private methods
    var _checkFullCoveredLine = function(line_array) {
      var count = sumLine(line_array);
      if (count == line_array.length) { return true; }
      return false;
    };

    var sumLine = function(line_array) {
      var count = 0;
      for(var i = 0; i < line_array.length; i++) {
        count += line_array[i];
      }
      return count;
    };

  return this;
};
 var Figure = function(drawAdapter) {
  this.position     = [5, 1];   //disps: [width, height]
  this.figure_size  = [40, 40];
  this.body         = NaN;
  this.color        = NaN;

  var self = this;

  this.drawFigure = function(disp_x, disp_y) {
    drawAdapter.addFigure(this, disp_x, disp_y);
    drawAdapter.addFill(this.color);
    drawAdapter.addStroke('black', 2);
  };

  this.turn = function(min_edge, max_edge, field) {
    if ((this.position[0] >= max_edge - 1) || (this.position[0] <= min_edge)) { return false; }

    var tmp_body = this.buildTurn(),
           shape = _countAnyShape(tmp_body);

    if (field.isWillCover(shape)) { return false; }

    this.body = tmp_body;
    return true;
  };

  this.pullLeft = function(min_edge, field) {
    var new_x = _find_min_x() + this.position[0] - 1;

    if (_ifWillCover(field, [-1, 0])) { return false; }
    if (new_x < min_edge) { return false; }
    this.position[0] -= 1;
    return true;
  };

  this.pullRight = function(max_edge, field) {
    var new_x = _find_max_x() + this.position[0] + 1;

    if (_ifWillCover(field, [1, 0])) { return false; }
    if (new_x >= max_edge) { return false; }
    this.position[0] += 1;
    return true;
  };

  this.pullDown = function(field) {
    var new_y = _find_max_y() + this.position[1] + 1;

    if (new_y >= field.y_cells) { return false; }
    if (_ifWillCover(field, [0, 1])) { return false; }
    this.position[1] += 1;
    return true;
  };

  this.buildTurn = function() {
    var new_body = [];
    for(var i = 0; i < this.body.length; i++) {
      new_body.push([this.body[i][1], -this.body[i][0]]);
    }
    return new_body;
  };

  this.countShape = function(step) {
    if (step === undefined) { step = [0, 0]; }
    var shape = [];
    for(var i = 0; i < this.body.length; i++) {
      shape.push([this.body[i][0] + step[0] + this.position[0],
                  this.body[i][1] + step[1] + this.position[1]]);
    }
    return shape;
  };

  // private methods
    var _ifWillCover = function(field, step) {
      var shape = self.countShape(step);
      return field.isWillCover(shape);
    };


    var _countAnyShape = function(body) {
      var shape = [];
      for(var i = 0; i < body.length; i++) {
        shape.push([body[i][0] + self.position[0],
                    body[i][1] + self.position[1]]);
      }
      return shape;
    };

    // TODO: refactoring
    var _find_max_x = function() {
      var tmp_array = [];
      for(var i = 0; i < self.body.length; i++) {
        tmp_array.push(self.body[i][0]);
      }
      return Math.max.apply(null, tmp_array);
    };

    var _find_max_y = function() {
      var tmp_array = [];
      for(var i = 0; i < self.body.length; i++) {
        tmp_array.push(self.body[i][1]);
      }
      return Math.max.apply(null, tmp_array);
    };

    var _find_min_x = function() {
      var tmp_array = [];
      for(var i = 0; i < self.body.length; i++) {
        tmp_array.push(self.body[i][0]);
      }
      return Math.min.apply(null, tmp_array);
    };

  return this;
};
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
        }
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
 var Game = function(canvas, imgs_bucket) {
  this.score = 0;
  this.is_active = true;
  this.imgs_bucket = imgs_bucket;

  // private attributes
  var draw_adapter    = new DrawAdapter(canvas);
  var field           = new Field(draw_adapter);
  var figure_builder  = new FigureBuilder(draw_adapter);
  var next_figure     = figure_builder.build_random_figure();
  var figure          = figure_builder.build_random_figure();
  var self            = this;

  this.redraw = function() {
    draw_adapter.clear_canvas();

    field.drawField();
    next_figure.drawFigure(295, 150);
    figure.drawFigure(10, 10);

    draw_adapter.addScore(this.score);
  };

  this.animate = function() {
    if (this.is_active === false) { return false; }
    if (figure.pullDown(field) === false) { handleLanding(); }

    this.redraw();

    var new_speed = 1000 - this.score * 2;
    setTimeout(function() { self.animate(); }, new_speed);
    return true;
  };

  this.keydownListener = function(key) {
    if (this.is_active === false) { return false; }

    switch(key) {
      case 37: // left
        figure.pullLeft(0, field);
        break;
      case 38: // up
        figure.turn(0, field.x_cells, field);
        break;
      case 39: // right
        figure.pullRight(field.x_cells, field);
        break;
      case 40: // down
        if (figure.pullDown(field) === false) { handleLanding(); }
        break;
      default: return; // exit this handler for other keys
    }

    this.redraw();
  };

  // private methods
    var gameOver = function() {
      self.is_active = false;
      draw_adapter.draw_image(self.imgs_bucket.game_over);
    };

    var addScorePerLine = function(lines_count) {
      self.score += lines_count * 10;
    };

    var addScorePerFigure = function() {
      self.score += 1;
    };

    var renewFigure = function() {
      figure = next_figure;
      next_figure = figure_builder.build_random_figure();
    };

    var giveEncourage = function(removed_lines) {
      if (removed_lines == 2) { simpleEncourage(); }
      if (removed_lines >= 3) { greateEncourage(); }
    };

    // TODO: implement
    var simpleEncourage = function() { console.log('Good!'); };
    // TODO: implement
    var greateEncourage = function() { console.log('Cool!'); };

    var handleRemovingLines = function() {
      var removed_lines = field.handleFullCoveredLines();

      addScorePerLine(removed_lines);
      giveEncourage(removed_lines);
    };

    var handleLanding = function() {
      field.addToCover(figure.countShape());
      addScorePerFigure();

      handleRemovingLines();
      renewFigure();

      if (field.isOverfilled()) { gameOver(); }
    };

  return this;
};
 $(document).ready(function() {
  var canvas = $('#playground')[0];
  var imgs_bucket = {
    'simlpe_encorage': 'http://dc482.4shared.com/img/vpr5IWZY/s3/137a688eb20/awesome_face_17.gif',
    'great_encorage': 'http://fc00.deviantart.net/fs70/i/2011/044/5/8/my___awesome___face_by_daemonofdecay-d39fhp5.png',
    'game_over': 'http://typesetting.californiafonts.com/fonts/game-over/game-over.jpg'
  };

  var game = new Game(canvas, imgs_bucket);
  game.animate();

  $(document).on("keydown", function(event) {
    game.keydownListener(event.which);
  });

});
