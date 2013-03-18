APT.createNamespace("APT");


APT.ViewLoader = function() {
    if(this.constructor !== APT.ViewLoader) return new APT.ViewLoader();
    APT.ViewLoader.$inherits();
    APT.ViewLoader.$init.apply(this);
    return this;
};

APT.ViewLoader.$inherits = function() {
    APT.inherits(APT.ViewLoader, Object);
};

APT.ViewLoader.$init = function() {
    // call base class constructor
    Object.apply(this);
};

APT.ViewLoader.prototype.load = function(owner) {
};

APT.ViewLoader.prototype.getSubView = function(rootView, subviewID) {
};


// WebView
