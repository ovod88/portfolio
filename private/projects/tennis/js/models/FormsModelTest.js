function FormsModelTest() {
    var elem_size = this.elem_size;

    var structures = {
        'line': [
            {x: -2 * elem_size, y: 16 * elem_size, quantity: 2}
        ],
        'line3': [
            {x: -3 * elem_size, y: 15 * elem_size, quantity: 3}
        ]
    };

    this.getStructure = function(name) {//OK
        if(!name) {
            return Object.keys(structures);
        }

        return this.convert(structures[name]);
    };
}

FormsModelTest.prototype = Model;
