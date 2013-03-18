APT.createNamespace("APT");


APT.Data = function() {
    if(this.constructor !== APT.Data) return new APT.Data();
    APT.Data.$inherits();
    APT.Data.$init.apply(this);
    return this;
};

APT.Data.$inherits = function() {
    APT.inherits(APT.Data, Object);
};

APT.Data.$init = function() {
    // instance fields
    this.data = null;
    // call base class constructor
    Object.apply(this);
};

APT.Data.prototype.$copy = function() {
    var copyObject = new APT.Data();
    copyObject.data = this.data;
    return copyObject;
};

// Creates and returns a new Data of the specified values and length
// @param arg   array of values
// @param len   length of array the values
// @return      the data at the specified values
APT.Data.NewWithBytesLen = function(arg, len) {
    var ret = new APT.Data();
    ret.data = new Array();
    
    for (var i = 0; i < len; i++)
    {
        ret.data.push(String(arg[i]).charCodeAt(0));
    }
    
    return ret;
};

// Creates and returns a new Data of the specified values
// @param arg   array of values
// @return      the data at the specified values
APT.Data.NewWithData = function(arg) {
    var ret = new APT.Data();
    ret.data = arg.data;
    return ret;
};

// Gets the value of the data converted to hexadecimal
// @return      a string converted to hexadecimal
APT.Data.prototype.description = function() {
    var ret = new String();
    ret += "<";
    for (var i = 0; i < this.data.length; i++)
    {
        ret += this.data[i].toString(16);
    }
    
    ret += ">";
    return ret;
};

// Returns a Data length
// @return      the data length
APT.Data.prototype.length = function() {
    return this.data.length;
};

// Returns a Data array
// @return      the data array
APT.Data.prototype.bytes = function() {
    return this.data;
};


