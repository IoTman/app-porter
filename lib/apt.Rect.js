APT.createNamespace("APT");


APT.Rect = function(origin, size) {
    if(this.constructor !== APT.Rect) return new APT.Rect(origin, size);
    APT.Rect.$inherits();
    arguments.length > 0 ? APT.Rect.$init.apply(this, [origin, size]) : APT.Rect.$init.apply(this);
    return this;
};

APT.Rect.$inherits = function() {
    APT.inherits(APT.Rect, Object);
};

APT.Rect.$init = function(origin, size) {
    // instance fields
    this.origin = new APT.Point();
    this.size = new APT.Size();
    // call base class constructor
    Object.apply(this);
    if (arguments.length > 0)
    {
        this.origin = origin.$copy();
        this.size = size.$copy();
    }
};

APT.Rect.prototype.$copy = function() {
    var copyObject = new APT.Rect();
    copyObject.origin = this.origin.$copy();
    copyObject.size = this.size.$copy();
    return copyObject;
};

// Class constructor.
// Retorna un rectangulo con las cooredenadas y dimensiones indicadas
// @param x       x coordenada
// @param y       y coordenada
// @param width   ancho del rectangulo
// @param height  alto del rectangulo
// @return        El rectangulo con las coordenadas y dimesniones especificadas
APT.Rect.New = function(x, y, width, height) {
    return APT.Rect(APT.Point(x, y), APT.Size(width, height));
};


