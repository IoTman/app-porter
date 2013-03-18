APT.createNamespace("APT");


APT.Range = function(location, length) {
    if(this.constructor !== APT.Range) return new APT.Range(location, length);
    APT.Range.$inherits();
    arguments.length > 0 ? APT.Range.$init.apply(this, [location, length]) : APT.Range.$init.apply(this);
    return this;
};

APT.Range.$inherits = function() {
    APT.inherits(APT.Range, Object);
};

APT.Range.$init = function(location, length) {
    // instance fields
    this.location = 0;
    this.length = 0;
    // call base class constructor
    Object.apply(this);
    if (arguments.length > 0)
    {
        this.location = location;
        this.length = length;
    }
};

APT.Range.prototype.$copy = function() {
    var copyObject = new APT.Range();
    copyObject.location = this.location;
    copyObject.length = this.length;
    return copyObject;
};

// Class constructor.

// RECT								From CGRect Struct
