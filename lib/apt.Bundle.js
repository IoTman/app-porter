APT.createNamespace("APT");


APT.Bundle = function() {
    if(this.constructor !== APT.Bundle) return new APT.Bundle();
    APT.Bundle.$inherits();
    APT.Bundle.$init.apply(this);
    return this;
};

APT.Bundle.$inherits = function() {
    APT.inherits(APT.Bundle, Object);
};

APT.Bundle.$init = function() {
    // instance fields
    this._path = null;
    // call base class constructor
    Object.apply(this);
};

APT.Bundle.prototype.$copy = function() {
    var copyObject = new APT.Bundle();
    copyObject._path = this._path;
    return copyObject;
};

// Class constructor.
// Inicializa un bundle con un path definido como la ruta al directorio de la aplicaci?n.
// @return  Un objeto bundle inicializado.
APT.Bundle.mainBundle = function() {
    var bundle = new APT.Bundle();
    bundle._path = window.location.toString();
    
    var a = bundle._path.split("/").length;
    
    bundle._path = bundle._path.replace(bundle._path.split("/")[a - 1], "");
    return bundle;
};

// Retorna path completo a un archivo especifico en una ruta determinada.
// @return  El path completo al archivo si este existe, sino retorna null.
APT.Bundle.pathForResource_ofType_inDirectory = function(fileName, fileExt, dirPath) {
    var _pathName;
    
    if (fileExt === null || fileExt === "")
    {
        _pathName = dirPath + fileName;
    }
    else 
    {
        _pathName = dirPath + fileName + "." + fileExt;
    }
    
    return _pathName;
};

// Retorna path completo a un archivo especifico.
// @return  El path completo al archivo si este existe, sino retorna null.
APT.Bundle.prototype.pathForResource_ofType = function(fileName, fileExt) {
    var _pathName;
    _pathName = this._path + fileName + "." + fileExt;
    
    return _pathName;
};

// Retorna path completo a un archivo especifico.
// @return  El path completo al archivo si este existe, sino retorna null.
APT.Bundle.prototype.resourcePath = function() {
    return this._path;
};

APT.Bundle.prototype.loadNibNamedOwner = function(aNibName, aViewController) {
    var className = aNibName + "Loader";
    var loader = APT.Global.createUserObject(className);
    loader.load(aViewController);
    aViewController.viewDidLoad();
};


// BUTTON  - is an encapsulation for jquery button object
