APT.createNamespace("APT");


APT.CharacterSet = function() {
    if(this.constructor !== APT.CharacterSet) return new APT.CharacterSet();
    APT.CharacterSet.$inherits();
    APT.CharacterSet.$init.apply(this);
    return this;
};

APT.CharacterSet.$inherits = function() {
    APT.inherits(APT.CharacterSet, Array);
};

APT.CharacterSet.$init = function() {
    // call base class constructor
    Array.$init.apply(this);
};

APT.CharacterSet = function(arg) {
    if(this.constructor !== APT.CharacterSet) return new APT.CharacterSet(arg);
    APT.CharacterSet.$inherits();
    arguments.length > 0 ? APT.CharacterSet.$init.apply(this, [arg]) : APT.CharacterSet.$init.apply(this);
    return this;
};

APT.CharacterSet.$inherits = function() {
    APT.inherits(APT.CharacterSet, Array);
};

APT.CharacterSet.$init = function(arg) {
    // call base class constructor
    Array.$init.apply(this);
};

// Class constructor.
// Class constructor.
// Returns a character set containing only the in-line whitespace characters space and tab.
// @return A character set containing only the in-line whitespace characters space and tab.
APT.CharacterSet.whitespaceCharacterSet = function() {
    return [" ", "\t"];
};

// Returns a character set containing the newline characters
// @return A character set containing the newline characters
APT.CharacterSet.newlineCharacterSet = function() {
    return ["\n"];
};


// COLOR
