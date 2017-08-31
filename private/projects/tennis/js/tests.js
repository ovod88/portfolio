var view = new gameView();
Model.middleX = view.size.middleX;
Model.maxX = view.size.maxX;
Model.maxY = view.size.maxY;

var figureTest = new FormsModelTest();
var racket = new RacketModel();
var ball = new BallModel();

QUnit.test( "gameView elements access", function( assert ) {
    assert.ok(view.testingelements.canvasElem, "Canvas exists! --> " + view.testingelements.canvasElem );
    assert.ok(view.testingelements.drawContext, "Canvas context exists! --> " + view.testingelements.drawContext );
    assert.ok(view.testingelements.drawingField, "Drawing div exists! --> " + view.testingelements.drawingField );
    assert.equal(view.testingelements.drawingWidth, "450px", "width is 450px" );
    assert.equal(view.testingelements.drawingHeight, "450px", "height is 450px" );
    assert.equal(view.testingelements.middleLineX, "225", "Middle X is correct" );
    assert.equal(view.size.maxX, 450, 'MaxX is correct');
    assert.equal(view.size.maxY, 450, 'MaxY is correct');
});


QUnit.test( "figure line model testing", function( assert ) {
    assert.equal(figureTest.getStructure()[0], "line", 'Get structure works without parameters' );
    var line = figureTest.getStructure('line');
    assert.ok(line.externalBlock.length, 'External block exists');
    assert.ok(line.internalBlock.length, 'Internal block exists');
    console.log(line.externalBlock);
    assert.ok(line.externalBlock[0].x == 195.5 && line.externalBlock[0].y == 240.5, 'The most left point is ok');
    assert.ok(line.externalBlock[1].x == 240.5 && line.externalBlock[1].y == 240.5, 'The most right point is ok');
    assert.ok(line.externalBlock[2].x == 210.5 && line.externalBlock[2].y == 240.5, 'The second most left point is ok');
    assert.ok(line.externalBlock[3].x == 225.5 && line.externalBlock[3].y == 240.5, 'The second most right point is ok');
});

QUnit.test( "figure line3 model testing", function( assert ) {
    assert.equal(figureTest.getStructure()[1], "line3", 'Get structure works without parameters' );
    var line3 = figureTest.getStructure('line3');
    assert.ok(line3.externalBlock.length, 'External block exists');
    assert.ok(line3.internalBlock.length, 'Internal block exists');
    assert.ok(line3.externalBlock[0].x == 180.5 && line3.externalBlock[0].y == 225.5, 'The most left point is ok');
    assert.ok(line3.externalBlock[1].x == 255.5 && line3.externalBlock[1].y == 225.5, 'The most right point is ok');
    assert.ok(line3.externalBlock[2].x == 195.5 && line3.externalBlock[2].y == 225.5, 'The second most left point is ok');
    assert.ok(line3.externalBlock[3].x == 240.5 && line3.externalBlock[3].y == 225.5, 'The second most right point is ok');
    assert.ok(line3.externalBlock[4].x == 210.5 && line3.externalBlock[4].y == 225.5, 'The central left point is ok');
    assert.ok(line3.externalBlock[5].x == 225.5 && line3.externalBlock[3].y == 225.5, 'The central right point is ok');
});
