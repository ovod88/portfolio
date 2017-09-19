function RacketModel() {
    var racketObj;
    var elem_size = this.elem_size;

    var structure = function(size) {

        return [{x: -size * elem_size, y: 27 * elem_size, quantity: size}];
    };

    this.reset = function () {
        racketObj = null;
    };

    this.getStructure = function(size) {

        if(!racketObj) {
            racketObj = this.convert(structure(size));
        }

        racketObj.move = function() {
            if(!isWallReached()) {
                if(this.direction === 'left' ) {
                    for( var i = 0; i < racketObj.externalBlock.length; i++) {
                        this.externalBlock[i].x -= elem_size;
                        this.internalBlock[i].x -= elem_size;
                    }
                } else if (this.direction === 'right') {
                    for( var i = 0; i < racketObj.externalBlock.length; i++) {
                        this.externalBlock[i].x += elem_size;
                        this.internalBlock[i].x += elem_size;
                    }
                }
            }
        };

        return racketObj;
    };

    function isWallReached() {
        if((maxPointX() > view.size.maxX - elem_size && racketObj.direction === 'right')
            || (minPointX() - elem_size < 0 && racketObj.direction === 'left') ) {
            return true;
        }

        return false;
    }

    function maxPointX() {
        var max = 0;
        for( var index = 0; index <  racketObj.externalBlock.length; index++) {
            if(racketObj.externalBlock[index].x > max) {
                max = racketObj.externalBlock[index].x;
            }
        }

        return max;
    }

    function minPointX() {
        var newLength = racketObj.externalBlock.length - 1;
        var min = racketObj.externalBlock[newLength].x;

        for( var index = 0; index < newLength; index++) {
            if(racketObj.externalBlock[index].x < min) {
                min = racketObj.externalBlock[index].x;
            }
        }

        return min;
    }
}

RacketModel.prototype = Model;
