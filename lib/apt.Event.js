APT.Event = function() {
    if(this.constructor !== APT.Event) return new APT.Event();
    APT.Event.$inherits();
    APT.Event.$init.apply(this);
    return this;
};

APT.Event.$inherits = function() {
    APT.inherits(APT.Event, Object);
};

APT.Event.$init = function() {
    // instance fields
    this._evnt = null;
    // call base class constructor
    Object.apply(this);
};

APT.Event.prototype.$copy = function() {
    var copyObject = new APT.Event();
    copyObject._evnt = this._evnt;
    return copyObject;
};

APT.Event.prototype.typeEvent = function() {
    return APT.EventType.Touches;
};


// end Event class
// end APT namespace
// end js namespace
