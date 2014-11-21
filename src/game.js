var Game = function(canvas) {
  this.score = 0;

  this.drawAdapter     = new DrawAdapter(canvas);
  this.field           = new Field(this.drawAdapter);
  this.figureBuilder   = new FigureBuilder(this.drawAdapter);
  this.figure          = this.figureBuilder.build_random_figure();


  this.update_score = function(removed_lines) {
    this.score += removed_lines * 10;
  };

  this.redraw = function() {
    this.drawAdapter.clear_canvas();

    this.field.drawField();
    this.figure.drawFigure();
    this.drawAdapter.addScore(this.score);
  };

  this.reset_game = function() {
    alert('Game Over!!!');
  };

  this.animate = function() {};

  this.keydownListener = function(key) {
    switch(key) {
      case 37: // left
        this.figure.pullLeft(0);
        break;
      case 38: // up
        this.figure.turn(0, this.field.x_cells);
        break;
      case 39: // right
        this.figure.pullRight(this.field.x_cells);
      break;
      case 40: // down
        if (this.figure.pullDown(this.field) == false) {
          this.field.addToCover(this.figure.countShape());

          this.figure = this.figureBuilder.build_random_figure();

          var removed_lines = this.field.handleFullCoveredLines();
          this.update_score(removed_lines);

          if (this.field.isOverfilled()) { this.reset_game(); };
        };
      break;
      default: return; // exit this handler for other keys
    };
  }
};
