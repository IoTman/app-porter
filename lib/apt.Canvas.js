APT.createNamespace("APT");


APT.Canvas = function() {
    if(this.constructor !== APT.Canvas) return new APT.Canvas();
    APT.Canvas.$inherits();
    APT.Canvas.$init.apply(this);
    return this;
};

APT.Canvas.$inherits = function() {
    APT.inherits(APT.Canvas, APT.View);
};

APT.Canvas.$init = function() {
    // call base class constructor
    APT.View.$init.apply(this);
    this._jqElement = $("<div><canvas></canvas></div>").trigger("create").children(1);
};

// Class constructor.
// Sets the width and height of the canvas
// @param aFrame
APT.Canvas.prototype.setFrame = function(aFrame) {
    aFrame = aFrame.$copy();
    this.jQElement().attr("width", "" + aFrame.size.width);
    this.jQElement().attr("height", "" + aFrame.size.height);
};


// CHARACTERSET						From NSCharacterSet
