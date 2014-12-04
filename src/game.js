var Game = function(canvas, imgs_bucket) {
  this.score = 0;
  this.is_active = true;
  this.imgs_bucket = imgs_bucket;

  // private attributes
  var drawAdapter     = new DrawAdapter(canvas);
  var field           = new Field(drawAdapter);
  var figureBuilder   = new FigureBuilder(drawAdapter);
  var next_figure     = figureBuilder.build_random_figure();
  var figure          = figureBuilder.build_random_figure();
  var self            = this;

  this.redraw = function() {
    drawAdapter.clear_canvas();

    field.drawField();
    next_figure.drawFigure(270, 100);
    figure.drawFigure(10, 10);

    drawAdapter.addScore(this.score);
  };

  this.animate = function() {
    if (this.is_active == false) { return false; };
    if (figure.pullDown(field) == false) { handleLanding(); };

    this.redraw();

    var new_speed = 1000 - this.score * 2;
    setTimeout(function() { self.animate(); }, new_speed);
    return true;
  };

  this.keydownListener = function(key) {
    if (this.is_active == false) { return false; };

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
        if (figure.pullDown(field) == false) { handleLanding(); };
        break;
      default: return; // exit this handler for other keys
    };

    this.redraw();
  };

  // private methods
    var gameOver = function() {
      self.is_active = false;
      drawAdapter.draw_image(self.imgs_bucket['game_over']);
    };

    var addScorePerLine = function(lines_count) {
      self.score += lines_count * 10;
    };

    var addScorePerFigure = function() {
      self.score += 1;
    };

    var renew_figure = function() {
      figure = next_figure;
      next_figure = figureBuilder.build_random_figure();
    };

    var giveEncourage = function(removed_lines) {
      if (removed_lines == 2) { simpleEncourage(); };
      if (removed_lines >= 3) { greateEncourage(); };
    };

    // TODO: implement
    var simpleEncourage = function() { console.log('Good!'); };
    var greateEncourage = function() { console.log('Cool!'); };

    var handleRemovedLinesScore = function(removed_lines) {
      addScorePerLine(removed_lines);
      giveEncourage(removed_lines);
    };

    var handleLanding = function() {
      field.addToCover(figure.countShape());
      addScorePerFigure();

      var removed_lines = field.handleFullCoveredLines();
      handleRemovedLinesScore(removed_lines);
      renew_figure();

      if (field.isOverfilled()) { gameOver(); };
    };

  return this;
};
