APT.createNamespace("APT");


APT.Enumerator = function() {
    if(this.constructor !== APT.Enumerator) return new APT.Enumerator();
    APT.Enumerator.$inherits();
    APT.Enumerator.$init.apply(this);
    return this;
};

APT.Enumerator.$inherits = function() {
    APT.inherits(APT.Enumerator, Object);
};

APT.Enumerator.$init = function() {
    // instance fields
    this.end = 0;
    this.i = 0;
    this.arrRef = null;
    // call base class constructor
    Object.apply(this);
};

APT.Enumerator.prototype.$copy = function() {
    var copyObject = new APT.Enumerator();
    copyObject.end = this.end;
    copyObject.i = this.i;
    copyObject.arrRef = this.arrRef;
    return copyObject;
};

// Creates an enumeration from an array
// @param arr values ??to be inserted into the enumeration
// @return the enumerator from values
APT.Enumerator.New = function(arr) {
    var ret = new APT.Enumerator();
    ret.end = arr.length;
    ret.arrRef = arr;
    ret.i = 0;
    return ret;
};

// Returns next object in enumeration or null if we reached the end
APT.Enumerator.prototype.nextObj = function() {
    if (this.i >= this.arrRef.length)
    {
        return null;
    }
    return this.arrRef[this.i++];
};

// Indicates whether I reach the end of the enumeration
APT.Enumerator.prototype.atEnd = function() {
    if (this.i >= this.arrRef.length)
    {
        return true;
    }
    else 
    {
        return false;
    }
};


// FONT
