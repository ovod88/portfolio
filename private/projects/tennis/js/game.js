var view = new gameView();

Model.middleX = view.size.middleX;
Model.maxX = view.size.maxX;
Model.maxY = view.size.maxY;

var figure = new FormsModel();
var racket = new RacketModel();
var ball = new BallModel();

var controller = new TenisController(view, {
                                            'figure' : figure,
                                            'racket': racket,
                                            'ball': ball
                                            });

controller.startGame();
