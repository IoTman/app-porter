APT.createNamespace("APT");


APT.Set = function() {
    if(this.constructor !== APT.Set) return new APT.Set();
    APT.Set.$inherits();
    APT.Set.$init.apply(this);
    return this;
};

APT.Set.$inherits = function() {
    APT.inherits(APT.Set, Object);
};

APT.Set.$init = function() {
    // instance fields
    this._array = null;
    // call base class constructor
    Object.apply(this);
    this._array = new Array();
};

APT.Set.prototype.$copy = function() {
    var copyObject = new APT.Set();
    copyObject._array = this._array;
    return copyObject;
};

// Class constructor. Creates an empty set.
// Returns the number of members in the set.
// @return The number of members in the set.
APT.Set.prototype.length = function() {
    return this._array.length;
};

// Creates and returns a set containing the objects in a given array
// @param arr objects in a given array
APT.Set.NewWithObjects = function(arr) {
    var ret = new APT.Set();
    
    for (var i = 0; i < arr.length; i++)
    {
        if (ret._array.indexOf(arr[i]) === -1)
        {
            ret._array.push(arr[i]);
        }
    }
    
    return ret;
};

// Returns an array containing the set?s members, or an empty array if the set has no members
APT.Set.prototype.allObjects = function() {
    // returns a copy
    var ret = new Array();
    ret = this._array.apt_copy();
    return ret;
};

// Returns one of the objects in the set, or null if the set contains no objects.
// @return One of the objects in the set, or null if the set contains no objects
APT.Set.prototype.anyObject = function() {
    return this._array[0];
    // number can be random
};


// SIZE								From CGSize Struct
