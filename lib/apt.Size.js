APT.createNamespace("APT");


APT.Size = function(width, height) {
    if(this.constructor !== APT.Size) return new APT.Size(width, height);
    APT.Size.$inherits();
    arguments.length > 0 ? APT.Size.$init.apply(this, [width, height]) : APT.Size.$init.apply(this);
    return this;
};

APT.Size.$inherits = function() {
    APT.inherits(APT.Size, Object);
};

APT.Size.$init = function(width, height) {
    // instance fields
    this.width = 0;
    this.height = 0;
    // call base class constructor
    Object.apply(this);
    if (arguments.length > 0)
    {
        this.width = width;
        this.height = height;
    }
};

APT.Size.prototype.$copy = function() {
    var copyObject = new APT.Size();
    copyObject.width = this.width;
    copyObject.height = this.height;
    return copyObject;
};

// Class constructor.
APT.Size.updateFromCSS = function(jqobject) {
    var width = "0";
    var height = "0";
    if (jqobject.css("left") !== undefined && jqobject.css("left") !== null)
    {
        width = jqobject.css("width").replace("px", "");
        height = jqobject.css("height").replace("px", "");
    }
    
    return APT.Size(parseFloat(width), parseFloat(height));
};

APT.Size.updateCSS = function(jqobject, size) {
    size = size.$copy();
    jqobject.css("width", size.width);
    jqobject.css("height", size.height);
};


