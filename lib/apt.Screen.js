APT.createNamespace("APT");


APT.Screen = function() {
    if(this.constructor !== APT.Screen) return new APT.Screen();
    APT.Screen.$inherits();
    APT.Screen.$init.apply(this);
    return this;
};

APT.Screen.$inherits = function() {
    APT.inherits(APT.Screen, Object);
};

APT.Screen.$init = function() {
    // instance fields
    this._bounds = null;
    this._applicationFrame = null;
    // call base class constructor
    Object.apply(this);
};

APT.Screen.prototype.$copy = function() {
    var copyObject = new APT.Screen();
    copyObject._bounds = this._bounds.$copy();
    copyObject._applicationFrame = this._applicationFrame.$copy();
    return copyObject;
};

// Class constructor.
// Inicializa un nuevo screen con su bounds y applicationFrame. Retorna el screen creado.
// @return       La imagen inicializada.
APT.Screen.MainScreen = function() {
    return APT.Screen.CreateMainScreen();
};

// Crea el objeto screen con su bounds y aplicationFrame. Retorna el screen creado al padre.
// @return       La imagen inicializada.
APT.Screen.CreateMainScreen = function() {
    var main = new APT.Screen();
    var w = 0;
    var h = 0;
    if (window.innerWidth === undefined)
    {
        w = document.documentElement.offsetWidth;
    }
    else 
    {
        w = window.innerWidth;
    }
    
    if (window.innerHeight === undefined)
    {
        h = document.documentElement.offsetHeight;
    }
    else 
    {
        h = window.innerHeight;
    }
    
    main._bounds = APT.Rect(APT.Point(0, 0), APT.Size(w, h));
    main._applicationFrame = APT.Rect(APT.Point(0, 0), APT.Size(w, h));
    main.setBounds(main._bounds);
    
    return main;
};

// Retorna la propiedad bounds.
APT.Screen.prototype.bounds = function() {
    return this._bounds;
};

// Retorna la propiedad applicationFrame.
APT.Screen.prototype.applicationFrame = function() {
    return this._applicationFrame;
};

// Setea las propiedades applicationFrame y bounds.
APT.Screen.prototype.setBounds = function(bounds) {
    bounds = bounds.$copy();
    this._bounds = bounds.$copy();
    this._applicationFrame = bounds.$copy();
};


