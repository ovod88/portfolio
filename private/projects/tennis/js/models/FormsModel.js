function FormsModel() {
    var elem_size = this.elem_size;

    var structures = {
        'heart': [
            {x: -6 * elem_size, y: 2 * elem_size, quantity: 3},
            {x: -8 * elem_size, y: 3 * elem_size, quantity: 6},
            {x: -9 * elem_size, y: 4 * elem_size, quantity: 8},
            {x: -9 * elem_size, y: 5 * elem_size, quantity: 9},
            {x: -9 * elem_size, y: 6 * elem_size, quantity: 9},
            {x: -8 * elem_size, y: 7 * elem_size, quantity: 8},
            {x: -8 * elem_size, y: 8 * elem_size, quantity: 8},
            {x: -7 * elem_size, y: 9 * elem_size, quantity: 7},
            {x: -7 * elem_size, y: 10 * elem_size, quantity: 7},
            {x: -6 * elem_size, y: 11 * elem_size, quantity: 6},
            {x: -6 * elem_size, y: 12 * elem_size, quantity: 6},
            {x: -5 * elem_size, y: 13 * elem_size, quantity: 5},
            {x: -4 * elem_size, y: 14 * elem_size, quantity: 4},
            {x: -3 * elem_size, y: 15 * elem_size, quantity: 3},
            {x: -1 * elem_size, y: 16 * elem_size, quantity: 1}
        ],
        'random' : function(size) {
            var random_structure = [];
            for(var i = 0; i < size; i++) {
                var randNum = getRandomArbitrary( -size, 0);
                random_structure.push({
                    x: randNum * elem_size, y: (2 + i) * elem_size, quantity: getRandomArbitrary(1, Math.abs(randNum) + 1)
                });
            }

            return random_structure;
        }
    };

    function getRandomArbitrary(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    this.getStructure = function(options) {
        if(options) {
            if(options.size) {
                return this.convert(structures[options.name](options.size));
            } else {
                return this.convert(structures[options.name]);
            }
        } else {
            return Object.keys(structures);
        }
    };
}

FormsModel.prototype = Model;