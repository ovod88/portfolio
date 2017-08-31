function gameView (){

    var canvasElem = document.querySelector('canvas'),
        drawContext = canvasElem.getContext("2d"),
        drawingField = document.querySelector('.game_field'),
        drawingFieldStyle = getComputedStyle(drawingField),
        drawingWidth = drawingFieldStyle.width,
        drawingHeight = drawingFieldStyle.height,
        middleLineX = Math.round(parseInt(drawingWidth)/2);

    if(!canvasElem.hasAttribute('width')) {
        canvasElem.setAttribute('width', drawingWidth);
    }
    if(!canvasElem.hasAttribute('height')) {
        canvasElem.setAttribute('height', drawingHeight);
    }

    this.fillSelect = function(options) {
        for( var i = 0; i < options.length; i++) {
            var opt = document.createElement('option');
            opt.innerHTML = options[i];
            opt.value = options[i];
            this.elements.select.appendChild(opt);
        }
    };

    this.clearSelects = function() {
        while(this.elements.select.lastChild.id != 'default') {
            this.elements.select.removeChild(this.elements.select.lastChild);
        }
        this.elements.selectSpeed.selectedIndex = 0;
        this.elements.selectRacketSize.selectedIndex = 0;
        this.elements.selectSize.selectedIndex = 0;
    };

    this.size = {
      middleX : middleLineX,
      maxX: parseInt(drawingWidth),
      maxY: parseInt(drawingHeight)
    };

    this.elements = {
        startBtn:   document.querySelector('#start_game'),
        restartBtn: document.querySelector('#restart_game'),
        select: document.querySelector('#select_form'),
        document : document,
        selectSize: document.querySelector('#select_size'),
        selectSpeed: document.querySelector('#select_speed'),
        selectRacketSize: document.querySelector('#select_racket_size')
    };

    this.testingelements = {
        canvasElem: canvasElem,
        drawContext: drawContext,
        drawingField: drawingField,
        drawingWidth: drawingWidth,
        drawingHeight: drawingHeight,
        middleLineX: middleLineX
    };

    function drawElement(extList, innerList, ext_size, inner_size) {
        var length = extList.length;

        for(var i = 0; i < length; i++) {
            drawContext.rect(extList[i].x, extList[i].y, ext_size, ext_size);
            drawContext.fillRect(innerList[i].x, innerList[i].y,
                                            inner_size, inner_size);
        }

        drawContext.stroke();
    }
    this.clear = function(obj) {
        if(obj) {
            for(var i = 0; i < obj.externalBlock.length; i++) {
                drawContext.clearRect(obj.externalBlock[i].x, obj.externalBlock[i].y, obj.elem_size + 0.5, obj.elem_size + 0.5);
            }
        } else {
            drawContext.clearRect(0, 0, parseInt(drawingWidth), parseInt(drawingHeight));
        }
    };

    this.draw = function(obj, color) {

        var elem_size = obj.elem_size,
            inner_elem_size = obj.inner_elem_size,
            color = color || '#000';

        drawContext.beginPath();
        drawContext.strokeStyle = color;
        drawContext.fillStyle = color;
        drawElement(obj.externalBlock, obj.internalBlock, elem_size, inner_elem_size);

        drawContext.stroke();
        drawContext.closePath();
    };
}
