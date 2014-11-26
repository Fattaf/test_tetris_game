var Game = function(canvas) {
  this.score = 0;

  this.drawAdapter     = new DrawAdapter(canvas);
  this.field           = new Field(this.drawAdapter);
  this.figureBuilder   = new FigureBuilder(this.drawAdapter);
  this.next_figure     = this.figureBuilder.build_random_figure();
  this.figure          = this.figureBuilder.build_random_figure();

  var self = this;

  // TODO: refactoring score counts !
  this.update_score = function(count) {
    this.score += count;
  };

  this.redraw = function() {
    this.drawAdapter.clear_canvas();

    this.field.drawField();
    this.next_figure.drawFigure(270, 100);
    this.figure.drawFigure(10, 10);

    this.drawAdapter.addScore(this.score);
  };

  // TODO: implement
  this.reset_game = function() {
    console.log('Game Over!!!');
    throw "exit";
  };

  this.animate = function() {
    var self = this;

    if (this.figure.pullDown(this.field) == false) {
      handleLanding();
    };

    this.redraw();

    setTimeout(function() {
      self.animate();
    }, 1000 - this.score * 2);

    return true;
  };

  this.keydownListener = function(key) {
    switch(key) {
      case 37: // left
        this.figure.pullLeft(0, this.field);
        break;
      case 38: // up
        this.figure.turn(0, this.field.x_cells, this.field);
        break;
      case 39: // right
        this.figure.pullRight(this.field.x_cells, this.field);
      break;
      case 40: // down
        if (this.figure.pullDown(this.field) == false) {
          handleLanding();
        };
      break;
      default: return; // exit this handler for other keys
    };
  }

  // private methods
    var handleLanding = function() {
      self.field.addToCover(self.figure.countShape());
      self.update_score(1);

      var removed_lines = self.field.handleFullCoveredLines();
      self.update_score(removed_lines * 10);
      giveEncourage(removed_lines);

      self.figure = self.next_figure;
      self.next_figure = self.figureBuilder.build_random_figure();
      if (self.field.isOverfilled()) { self.reset_game(); };
    };

    var giveEncourage = function(removed_lines) {
      if (removed_lines == 2) { simpleEncourage(); };
      if (removed_lines >= 3) { greateEncourage(); };
    };

    // TODO: implement
    var simpleEncourage = function() { console.log('Good!'); };
    var greateEncourage = function() { console.log('Cool!'); };

  return this;
};
