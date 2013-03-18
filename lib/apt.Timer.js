APT.createNamespace("APT");


APT.Timer = function() {
    if(this.constructor !== APT.Timer) return new APT.Timer();
    APT.Timer.$inherits();
    APT.Timer.$init.apply(this);
    return this;
};

APT.Timer.$inherits = function() {
    APT.inherits(APT.Timer, Object);
};

APT.Timer.$init = function() {
    // instance fields
    this._userInfo = null;
    // call base class constructor
    Object.apply(this);
};

APT.Timer.prototype.$copy = function() {
    var copyObject = new APT.Timer();
    copyObject._userInfo = this._userInfo;
    return copyObject;
};

// Crea y retorna un nuevo Timer. Implementacion de los metodos setInterval o setTimeout seg?n cual corresponda.
// @return un Timer inicializado.
APT.Timer.enable = function(anInterval, anObject, aCallback, aUserInfo, repeats) {
    var timer = new APT.Timer();
    timer._userInfo = aUserInfo;
    if (repeats)
    {
        
        window.setInterval(function() {
            anObject[aCallback.valueOf()].apply(anObject);
        }, anInterval);
    }
    else 
    {
        
        window.setTimeout(function() {
            anObject[aCallback.valueOf()].apply(anObject);
        }, anInterval);
    }
    
    return timer;
};

APT.Timer.prototype.userInfo = function() {
    return this._userInfo;
};


