APT.createNamespace("APT");


APT.Point = function(x, y) {
    if(this.constructor !== APT.Point) return new APT.Point(x, y);
    APT.Point.$inherits();
    arguments.length > 0 ? APT.Point.$init.apply(this, [x, y]) : APT.Point.$init.apply(this);
    return this;
};

APT.Point.$inherits = function() {
    APT.inherits(APT.Point, Object);
};

APT.Point.$init = function(x, y) {
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

APT.Point.prototype.$copy = function() {
    var copyObject = new APT.Point();
    copyObject.x = this.x;
    copyObject.y = this.y;
    return copyObject;
};

// Class constructor.
APT.Point.updateFromCSS = function(jqobject) {
    var x = "0";
    var y = "0";
    if (jqobject.css("left") !== undefined && jqobject.css("left") !== null)
    {
        x = jqobject.css("left").replace("px", "");
        y = jqobject.css("top").replace("px", "");
    }
    
    return APT.Point(parseFloat(x), parseFloat(y));
};

APT.Point.updateCSS = function(jqobject, point) {
    point = point.$copy();
    jqobject.css("left", point.x);
    jqobject.css("top", point.y);
};


// RANGE								From NSRange
