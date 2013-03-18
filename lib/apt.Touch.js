APT.createNamespace("APT");


APT.Touch = function(x, y) {
    if(this.constructor !== APT.Touch) return new APT.Touch(x, y);
    APT.Touch.$inherits();
    arguments.length > 0 ? APT.Touch.$init.apply(this, [x, y]) : APT.Touch.$init.apply(this);
    return this;
};

APT.Touch.$inherits = function() {
    APT.inherits(APT.Touch, Object);
};

APT.Touch.$init = function(x, y) {
    // instance fields
    this.x = 0;
    this.y = 0;
    // call base class constructor
    Object.apply(this);
    if (arguments.length > 0)
    {
        this.x = x;
        this.y = y;
    }
};

APT.Touch.prototype.$copy = function() {
    var copyObject = new APT.Touch();
    copyObject.x = this.x;
    copyObject.y = this.y;
    return copyObject;
};

APT.Touch.prototype.locationInView = function() {
    return APT.Point(this.x, this.y);
};


// URL
// La clase URL hereda de object. Se utiliza esta clase para mantener y manipular una URL.
