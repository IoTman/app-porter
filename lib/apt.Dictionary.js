APT.createNamespace("APT");


APT.Dictionary = function() {
    if(this.constructor !== APT.Dictionary) return new APT.Dictionary();
    APT.Dictionary.$inherits();
    APT.Dictionary.$init.apply(this);
    return this;
};

APT.Dictionary.$inherits = function() {
    APT.inherits(APT.Dictionary, Object);
};

APT.Dictionary.$init = function() {
    // call base class constructor
    Object.apply(this);
};

// To retrieve the value associated with a given key
// @param key. The key for which to return the corresponding value
// @return     value associated with key, or null if no value is associated with Key.
APT.Dictionary.prototype.objectFor = function(key) {
    if (this[key] === undefined)
    {
        return null;
    }
    
    return this[key];
};

// Allows dictionaries to be enumerated using foreach
// @return the enumerator from values
APT.Dictionary.prototype.getEnumerator = function() {
    var keys = Object.keys(this);
    var values = new Array();
    
    for (var i = 0; i < keys.length; i++)
    {
        values.push(this[keys[i]]);
    }
    
    return APT.Enumerator.New(values);
};

// Returns an array of all values in dictionary
// @return A new array containing the dictionary?s values, or an empty array if the dictionary has no entries.
APT.Dictionary.prototype.allValues = function() {
    var keys = Object.keys(this);
    var values = new Array();
    
    for (var i = 0; i < keys.length; i++)
    {
        values.push(this[keys[i]]);
    }
    
    return values;
};

// Clear all values in dictionary
APT.Dictionary.prototype.clear = function() {
    var keys = Object.keys(this);
    for (var i = 0; i < keys.length; i++)
    {
        delete this[keys[i]];
    }
};

// Store object in dictionary for key
// @param value value associated with key
// @param key.  La clave para el valor correspondiente
APT.Dictionary.prototype.setValueForKey = function(value, key) {
    if (value === undefined || value === null)
    {
        delete this[key];
    }
    else 
    {
        this[key] = value;
    }
};

// Remove objects matching key
// @param key.
APT.Dictionary.prototype.removeObjectForKey = function(key) {
    delete this[key];
};


// ENUMERATOR							From NSEnumerator
