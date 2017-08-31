function BallModel() {
    var ballObj;
    var elem_size = this.elem_size;
    var directions = {
        'eastN': function() {
                this.externalBlock[0].x += elem_size;
                this.internalBlock[0].x += elem_size;
                this.externalBlock[0].y -= elem_size;
                this.internalBlock[0].y -= elem_size;
        },
        'eastS': function() {
                this.externalBlock[0].x += elem_size;
                this.internalBlock[0].x += elem_size;
                this.externalBlock[0].y += elem_size;
                this.internalBlock[0].y += elem_size;
        },
        'westN': function() {
                this.externalBlock[0].x -= elem_size;
                this.internalBlock[0].x -= elem_size;
                this.externalBlock[0].y -= elem_size;
                this.internalBlock[0].y -= elem_size;
        },
        'westS': function() {
                this.externalBlock[0].x -= elem_size;
                this.internalBlock[0].x -= elem_size;
                this.externalBlock[0].y += elem_size;
                this.internalBlock[0].y += elem_size;
        },
        'left': function() {
            this.externalBlock[0].x -= elem_size;
            this.internalBlock[0].x -= elem_size;
        },
        'right': function() {
            this.externalBlock[0].x += elem_size;
            this.internalBlock[0].x += elem_size;
        }
    };

    var structure = [{x: elem_size, y: 26 * elem_size, quantity: 1}];

    this.reset = function () {
        ballObj = null;
    };

    this.getStructure = function() {

        if(!ballObj) {
            ballObj = this.convert(structure);
        }

        ballObj.move = function() {
            directions[this.direction].apply(this);
        };

        ballObj.moveSide = function (direction) {
            if(this.direction === 'eastS') {
                directions[direction].apply(this);
            } else {
                directions[direction].apply(this);
            }
        };

        ballObj.mirrorDirection = function() {//OK
            if(this.counterclock) {
                switch (this.direction) {
                    case 'eastN':
                        this.direction = 'westN';
                        break;
                    case 'westN':
                        this.direction = 'westS';
                        break;
                    case 'westS':
                        this.direction = 'eastS';
                        break;
                    case 'eastS':
                        this.direction = 'eastN';
                        break;
                }
            } else {
                switch (this.direction) {
                    case 'eastN':
                        this.direction = 'eastS';
                        break;
                    case 'westN':
                        this.direction = 'eastN';
                        break;
                    case 'eastS':
                        this.direction = 'westS';
                        break;
                    case 'westS':
                        this.direction = 'westN';
                        break;
                }
            }
        };

        ballObj.oppositeDirection = function () {
            this.counterclock = !this.counterclock;

            if(this.direction == 'eastN') {
                this.direction = 'westS';
            } else if(this.direction == 'westN') {
                this.direction = 'eastS';
            } else if(this.direction == 'eastS' ) {
                this.direction = 'westN';
            } else {
                this.direction = 'eastN';
            }

        };


        return ballObj;
    };
}

BallModel.prototype = Model;
