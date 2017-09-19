function TenisController(view, models) {
    var gameIsOn = false, gameIsPaused = false,
        isKeyPressed = false, wallReached = false, objects = {},
        figure = [], ball, racket = [], hits = {}, redrawTimer, isRandom = false,
        mappingFigureSize = {
            'small': 10,
            'normal': 12,
            'big': 15
        },
        speeds = {
            'slow': 300,
            'normal': 200,
            'fast': 100
        },
        racketSizes = {
            'small': 2,
            'normal': 3,
            'big': 4
        },
        selectedSpeed,
        _this = this,
        select = view.elements.select,
        selectSpeed = view.elements.selectSpeed,
        selectedSpeed,
        selectedSize,
        selectSize = view.elements.selectSize,
        selectRacketSize = view.elements.selectRacketSize;


    var timeoutRacket, timeoutBall;

    function restartGame() {
        view.clearSelects();
        view.elements.startBtn.removeEventListener('click', init);
        view.elements.select.removeEventListener('change', selectSizeButtonVisibility);
        view.elements.document.removeEventListener('keydown', moveRacket);
        view.elements.document.removeEventListener('keyup', stopRacket);
        clearTimeout(timeoutBall);
        clearTimeout(timeoutRacket);
        clearInterval(redrawTimer);
        view.clear();
        models.ball.reset();
        models.racket.reset();
        ball = {};
        racket = [];
        gameIsOn = false;
        gameIsPaused = false;
        view.elements.startBtn.innerHTML = "Start game";
        select.disabled = false;
        selectSpeed.disabled = false;
        selectSize.disabled = false;
        selectRacketSize.disabled = false;
        _this.startGame();
    }

    function winGame() {
        restartGame();
        alert('Congratulations! You won :-)');
    }

    function loseGame() {
        restartGame();
        alert('GameOver! Try again...');
    }

    this.startGame = function() {
        view.fillSelect(models.figure.getStructure());
        view.elements.selectSize.style.visibility = 'hidden';
        view.elements.startBtn.addEventListener('click', init);
        view.elements.select.addEventListener('change', selectSizeButtonVisibility);
    };

    function selectSizeButtonVisibility() {
        var selectedValue = view.elements.select.options[view.elements.select.selectedIndex].value;
        if(selectedValue === 'random') {
            view.elements.selectSize.style.visibility = 'visible';
        } else {
            view.elements.selectSize.style.visibility = 'hidden';
        }
    }

    function init () {
        if(!gameIsOn) {
            var selectedFigureName = select.options[select.selectedIndex].value || 'heart',
                selectedRacketSize = selectRacketSize.options[selectRacketSize.selectedIndex].value;

            selectedSpeed = selectSpeed.options[selectSpeed.selectedIndex].value,
            selectedSize = selectSize.options[selectSize.selectedIndex].value,
            isRandom = (selectedFigureName === 'heart') ? false : true;

            if(isRandom) {
                selectSize.style.visibility = 'visible';

                objects.form = models.figure.getStructure({ name: selectedFigureName,
                                                            size: mappingFigureSize[selectedSize] });
            } else {
                view.elements.selectSize.style.visibility = 'hidden';
                objects.form = models.figure.getStructure({ name: selectedFigureName, size: 0 });
            }
            objects.racket = models.racket.getStructure(racketSizes[selectedRacketSize]);
            objects.ball = models.ball.getStructure();
            objects.ball.externalBlock = objects.ball.externalBlock.slice(0, 1);

            objects.ball.internalBlock = objects.ball.internalBlock.slice(0, 1);
            redrawTimer = setInterval(redraw, 20);
            gameIsOn = true;

            view.elements.startBtn.innerHTML = "Pause game";
            view.elements.restartBtn.style.visibility = 'visible';
            view.elements.restartBtn.addEventListener('click', restartGame);
            view.elements.document.addEventListener('keydown', moveRacket);
            view.elements.document.addEventListener('keyup', stopRacket);
            select.disabled = true;
            selectSpeed.disabled = true;
            selectSize.disabled = true;
            selectRacketSize.disabled = true;
            moveBall(speeds[selectedSpeed]);
        } else {
            if(gameIsPaused) {
                resumeGame();
            } else {
                pauseGame();
            }
        }
    }

    function pauseGame() {
        gameIsPaused = true;
        view.elements.document.removeEventListener('keydown', moveRacket);
        view.elements.startBtn.innerHTML = "Continue game";
        clearTimeout(timeoutBall);
        clearInterval(redrawTimer);
    }

    function resumeGame() {
        gameIsPaused = false;
        redrawTimer = setInterval(redraw, 20);
        view.elements.document.addEventListener('keydown', moveRacket);
        view.elements.startBtn.innerHTML = "Pause game";
        moveBall(speeds[selectedSpeed]);
    }

    function redraw() {
        view.clear();
        view.draw(objects.form);
        view.draw(objects.ball, 'blue');
        view.draw(objects.racket, 'green');
    }

    function stopRacket(e) {
        if(e.keyCode == 37 || e.keyCode == 39) {
            clearTimeout(timeoutRacket);
            timeoutRacket = -1;
        }
        isKeyPressed = !isKeyPressed;
    }

    function moveRacket(e) {
        if(!isKeyPressed) {
            if(e.keyCode == 37 || e.keyCode == 39) {
                if (e.keyCode == 37) {
                    objects.racket.direction = 'left';
                } else if (e.keyCode == 39) {
                    objects.racket.direction = 'right';
                }
                objects.racket.move();
                timeoutRacket = setTimeout(function moveRacket() {
                    objects.racket.move();
                    timeoutRacket = setTimeout(moveRacket, 50);
                }, 200);
            }
            isKeyPressed = !isKeyPressed;
        }
    }

    function moveBall(speed) {
        if(!objects.ball.direction) {
            objects.ball.direction = 'eastN';
            objects.ball.counterclock = true;
        }
        objects.ball.move();

        checkIfBallReachedWall();
        checkBallHitsFigure();
        checkBallHitsRacket();

        timeoutBall = setTimeout(function () {
            if(gameIsOn) {
                moveBall(speed);
            }
        }, speed);
    }

    function checkIfBallReachedWall() {//OK
        var leftX = objects.ball.externalBlock[0].x - objects.ball.elem_size,
            leftY = objects.ball.externalBlock[0].y - objects.ball.elem_size,
            rightX = objects.ball.externalBlock[0].x + objects.ball.elem_size,
            rightY = objects.ball.externalBlock[0].y;
        wallReached = false;


        if( leftX < 0 && leftY < 0 ) {
            if(objects.ball.direction == 'westN') {
                objects.ball.oppositeDirection();
            }
        } else if(rightX > view.size.maxX && leftY < 0) {
            if(objects.ball.direction === 'eastN') {
                objects.ball.oppositeDirection();
            }
        } else if(leftX < 0) {
            wallReached = true;
            if(objects.ball.direction === 'westS') {
                objects.ball.counterclock = true;
            } else if(objects.ball.direction === 'westN') {
                objects.ball.counterclock = false;
            }
            objects.ball.mirrorDirection();
        }  else if(leftY < 0) {
            if(objects.ball.direction === 'westN') {
                objects.ball.counterclock = true;
            } else if(objects.ball.direction === 'eastN') {
                objects.ball.counterclock = false;
            }
            objects.ball.mirrorDirection();
        }  else if(rightX > view.size.maxX ) {
            wallReached = true;
            if(objects.ball.direction === 'eastN') {
                objects.ball.counterclock = true;
            } else if(objects.ball.direction === 'eastS') {
                objects.ball.counterclock = false;
            }
            objects.ball.mirrorDirection();
        }
        else if (rightY > view.size.maxY) {
            loseGame();
        }
    }

    function checkBallHitsFigure() {

        if (!figure.length) {
            generateFullFigure();
        }
        generateFullBall();//OK

        for( var i = 0; i < figure.length; i++ ) {
            checkObjectsCollapsed(ball, figure[i]);
        }
        analiseHitedElements(objects.form);
    }

    function checkObjectsCollapsed(ball, target) {
        var result = Model.compareObjects(ball, target);


        for( var key in result) {
            if(result[key]) {
                hits[key] = target.topleft;
            }
        }
    }

    function analiseHitedElements(target) {
        if(Object.keys(hits).length !== 0) {
            var hitsSided = {}, hitsCornered = {};
            for(var key in hits) {
                if(key === 'right' || key === 'left' || key === 'top' || key === 'bottom') {
                    hitsSided[key] = hits[key];
                } else {
                    hitsCornered[key] = hits[key];
                }
            }

            if(target === objects.racket) {
                analiseRacketHited(hitsSided, hitsCornered);
            } else {
                analiseFigureHited(target, hitsSided, hitsCornered);
            }
        }
        hits = {};
        figure = [];
    }

    function analiseRacketHited(hitsSided, hitsCornered) {
        if(Object.keys(hitsSided).length !== 0) {
            if( (objects.ball.direction === 'eastS' && !objects.ball.counterclock)
                || (objects.ball.direction === 'westS' && objects.ball.counterclock)) {
                objects.ball.counterclock = !objects.ball.counterclock;
            }
            for( var key in hitsSided) {
                if( key === 'top' ) {
                    if( (objects.ball.direction === 'eastS' && !objects.ball.counterclock)
                        || (objects.ball.direction === 'westS' && objects.ball.counterclock)) {
                        objects.ball.counterclock = !objects.ball.counterclock;
                    }
                } else if ( key === 'left') {
                    if(objects.ball.direction === 'eastS' && objects.ball.counterclock) {
                        objects.ball.counterclock = !objects.ball.counterclock;
                    }
                } else if ( key === 'right') {
                    if(objects.ball.direction === 'westS' && !objects.ball.counterclock) {
                        objects.ball.counterclock = !objects.ball.counterclock;
                    }
                }
                if((objects.ball.direction === 'westS' || objects.ball.direction === 'eastS')
                    && isKeyPressed && objects.racket.direction === 'left' && !wallReached) {
                    objects.ball.moveSide('left');
                } else if((objects.ball.direction === 'eastS' || objects.ball.direction === 'westS')
                    && isKeyPressed && objects.racket.direction === 'right' && !wallReached) {
                    objects.ball.moveSide('right');
                }
                objects.ball.mirrorDirection();
            }
        } else {
            if(Object.keys(hitsCornered).length !== 0) {
                for( var key in hitsCornered) {
                    if ((key === 'left_top_corner' && objects.ball.direction === 'eastS') ||
                        (key === 'right_top_corner' && objects.ball.direction === 'westS')) {
                        checkIfBallReachedWall();
                        objects.ball.oppositeDirection();
                    }
                    if (key === 'left_top_corner' && objects.ball.direction === 'westS') {
                        objects.ball.counterclock = false;
                        objects.ball.mirrorDirection();
                        checkIfBallReachedWall();
                    }
                    if(key === 'right_top_corner' && objects.ball.direction === 'eastS') {
                        objects.ball.counterclock = true;
                        objects.ball.mirrorDirection();
                        checkIfBallReachedWall();
                    }
                }
                if(isKeyPressed && objects.racket.direction === 'left' && !wallReached) {
                    objects.ball.moveSide('left');
                } else if(isKeyPressed && objects.racket.direction === 'right' && !wallReached) {
                    objects.ball.moveSide('right');
                }
            }
        }
    }

    function analiseFigureHited(target, hitsSided, hitsCornered) {
        if(Object.keys(hitsSided).length !== 0) {
            for( var key in hitsSided) {
                var isBottomCondition = (objects.ball.direction === 'eastN' && objects.ball.counterclock) ||
                        (objects.ball.direction === 'westN' && !objects.ball.counterclock),
                    isTopCondition = (objects.ball.direction === 'eastS' && !objects.ball.counterclock) ||
                        (objects.ball.direction === 'westS' && objects.ball.counterclock),
                    isLeftCondition = (objects.ball.direction === 'eastS' && objects.ball.counterclock) ||
                        (objects.ball.direction === 'eastN' && !objects.ball.counterclock),
                    isRightCondition = (objects.ball.direction === 'westS' && !objects.ball.counterclock) ||
                        (objects.ball.direction === 'westN' && objects.ball.counterclock);
                if((key === 'bottom' && isBottomCondition)
                    || (key === 'top' && isTopCondition)
                    || (key === 'left' && isLeftCondition)
                    || (key === 'right' && isRightCondition)) {
                    objects.ball.counterclock = !objects.ball.counterclock;
                }
                objects.ball.mirrorDirection();
                redrawFigure(hitsSided[key], target);
            }
        }
        var length = Object.keys(hitsCornered).length,
            i = 0;

        while(i < length && gameIsOn) {
            for( var key in hitsCornered) {
                if ((key === 'left_top_corner' && objects.ball.direction === 'eastS') ||
                    (key === 'left_bottom_corner' && objects.ball.direction === 'eastN') ||
                    (key === 'right_top_corner' && objects.ball.direction === 'westS') ||
                    (key === 'right_bottom_corner' && objects.ball.direction === 'westN')) {
                    objects.ball.oppositeDirection();
                    redrawFigure(hitsCornered[key], target);
                    checkIfBallReachedWall();
                }
            }
            i++;
        }
    }

    function redrawFigure(element, target) {
        if(element) {
            for(var j = 0; j < target.externalBlock.length; j++) {
                if(target.externalBlock[j].x == element.x &&
                    target.externalBlock[j].y == element.y) {
                    target.externalBlock.splice(j, 1);
                    target.internalBlock.splice(j, 1);
                }
            }
        }
    }

    function checkBallHitsRacket() {//OK
        generateFullBall();//OK
        generateFullRacket();//OK

        for( var i = 0; i < racket.length; i++ ) {
            checkObjectsCollapsed(ball, racket[i]);
        }
        analiseHitedElements(objects.racket);
        hits = {};
        racket = [];
    }

    function generateFullFigure() {
        var length = objects.form.externalBlock.length;
        if(length > 0) {
            for( var i = 0; i < length; i++) {
                figure.push(Model.transformToBlockObj(objects.form.externalBlock[i]));
            }
        } else {
            winGame();
        }
    }

    function generateFullBall() {//OK
        ball = Model.transformToBlockObj(objects.ball.externalBlock[0]);
    }

    function generateFullRacket() {//OK
        for( var i = 0; i < objects.racket.externalBlock.length; i++) {
            racket.push(Model.transformToBlockObj(objects.racket.externalBlock[i]));
        }
    }
}
