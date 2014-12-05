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
