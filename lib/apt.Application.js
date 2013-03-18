APT.createNamespace("APT");


APT.ApplicationDelegate = function() {
    if(this.constructor !== APT.ApplicationDelegate) return new APT.ApplicationDelegate();
    APT.ApplicationDelegate.$inherits();
    APT.ApplicationDelegate.$init.apply(this);
    return this;
};

APT.ApplicationDelegate.$inherits = function() {
    APT.inherits(APT.ApplicationDelegate, Object);
};

APT.ApplicationDelegate.$init = function() {
    // instance fields
    this._window = null;
    // call base class constructor
    Object.apply(this);
};

APT.ApplicationDelegate.prototype.$copy = function() {
    var copyObject = new APT.ApplicationDelegate();
    copyObject._window = this._window;
    return copyObject;
};

APT.ApplicationDelegate.prototype.window = function() {
    return this._window;
};

APT.ApplicationDelegate.prototype.setWindow = function(aWindow) {
    this._window = aWindow;
};

APT.ApplicationDelegate.prototype.application_didFinishLaunchingWithOptions = function(arg1, arg2) {
    // Base do nothing
};

APT.ApplicationDelegate.prototype.applicationDidFinishLaunching = function(arg1) {
    // Base do nothing
};

APT.ApplicationDelegate.prototype.applicationDidBecomeActive = function(arg1) {
    // Base do nothing
};

APT.ApplicationDelegate.prototype.applicationWillResignActive = function(arg1) {
    // Base do nothing
};

APT.ApplicationDelegate.prototype.applicationDidEnterBackground = function(arg1) {
    // Base do nothing
};

APT.ApplicationDelegate.prototype.applicationWillEnterForeground = function(arg1) {
    // Base do nothing
};

APT.ApplicationDelegate.prototype.applicationWillTerminate = function(arg1) {
    // Base do nothing
};


APT.ApplicationBase = function() {
    if(this.constructor !== APT.ApplicationBase) return new APT.ApplicationBase();
    APT.ApplicationBase.$inherits();
    APT.ApplicationBase.$init.apply(this);
    return this;
};

APT.ApplicationBase.$inherits = function() {
    APT.inherits(APT.ApplicationBase, Object);
};

APT.ApplicationBase.$init = function() {
    // instance fields
    this._delegate = null;
    // call base class constructor
    Object.apply(this);
};

APT.ApplicationBase.prototype.$copy = function() {
    var copyObject = new APT.ApplicationBase();
    copyObject._delegate = this._delegate;
    return copyObject;
};

APT.ApplicationBase._application = new APT.ApplicationBase();

APT.ApplicationBase.prototype.delegate = function() {
    return this._delegate;
};

APT.ApplicationBase.prototype.setDelegate = function(newDelegate) {
    this._delegate = newDelegate;
};

APT.ApplicationBase.prototype.initialize = function() {
    // Base do nothing
};

APT.ApplicationBase.prototype.exec = function() {
    this.initialize();
    if (this.delegate() !== null)
    {
        if (eval("this.delegate()[\"application_didFinishLaunchingWithOptions\"] != undefined"))
        {
            this.delegate().application_didFinishLaunchingWithOptions(this, null);
        }
        else 
        {
            this.delegate().applicationDidFinishLaunching(this);
        }
    }
};

// Retorna la instancia de la aplicacion
APT.ApplicationBase.sharedApplication = function() {
    return APT.ApplicationBase._application;
};

// Retorna true en caso de poder abrir la URL
APT.ApplicationBase.prototype.openURL = function(url) {
    if (url !== undefined && url !== null)
    {
        window.open(url.absoluteString());
        return true;
    }
    
    return false;
};

APT.ApplicationBase.prototype.touchesBegan_withEvent = function(touches, e) {
};

APT.ApplicationBase.prototype.touchesMoved_withEvent = function(touches, e) {
};

APT.ApplicationBase.prototype.touchesEnded_withEvent = function(touches, e) {
};

APT.ApplicationBase.prototype.touchesCancelled_withEvent = function(touches, e) {
};

APT.ApplicationBase.prototype.becomeFirstResponder = function() {
    return false;
};

APT.ApplicationBase.prototype.resignFirstResponder = function() {
    return false;
};


// BackBarButtonDefault es un tipo especial de boton que utiliza la clas APT.NavigationBar para dibujar el elemento BackBarButtonItem por defecto de la barra de navegacion.
