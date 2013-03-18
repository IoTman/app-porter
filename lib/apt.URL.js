APT.createNamespace("APT");


APT.URL = function() {
    if(this.constructor !== APT.URL) return new APT.URL();
    APT.URL.$inherits();
    APT.URL.$init.apply(this);
    return this;
};

APT.URL.$inherits = function() {
    APT.inherits(APT.URL, Object);
};

APT.URL.$init = function() {
    // instance fields
    this._urlString = null;
    this._baseUrl = null;
    // call base class constructor
    Object.apply(this);
};

APT.URL.prototype.$copy = function() {
    var copyObject = new APT.URL();
    copyObject._urlString = this._urlString;
    copyObject._baseUrl = this._baseUrl;
    return copyObject;
};

// Class constructor.
// Retorna el objeto con la url especificada.
// @parameter  Una cadena con la url.
// @return  Un objeto URL inicializado.
APT.URL.URLWithString = function(URLString) {
    var url = null;
    if (APT.URL.validURL(URLString))
    {
        url = new APT.URL();
        url._urlString = URLString;
    }
    
    return url;
};

// Retorna el objeto con el path especificado.
// @parameter  Una cadena con el path a un archivo.
// @return  Un objeto URL inicializado.
APT.URL.fileURLWithPath = function(URLString) {
    var url = null;
    url = new APT.URL();
    url._urlString = URLString;
    
    return url;
};

// Retorna el objeto con el path especificado.
// @parameter  Una cadena con el path a un archivo.
// @return  Un objeto URL inicializado.
APT.URL.fileURLWithPath_isDirectory = function(URLString, isDirectory) {
    var url = null;
    url = new APT.URL();
    url._urlString = URLString;
    
    return url;
};

APT.URL.validURL = function(URLString) {
    var valid = false;
    if (URLString.indexOf("http://") > -1 || URLString.indexOf("https://") > -1 || URLString.indexOf("mailto://") > -1 || URLString.indexOf("tel:") > -1 || URLString.indexOf("sms:") > -1)
    {
        valid = true;
    }
    return valid;
};

// Retorna la url.
// @return  Una cadena con la url.
APT.URL.prototype.absoluteString = function() {
    return this._urlString;
};

APT.URL.prototype.baseURL = function() {
    return this._baseUrl;
};

APT.URL.prototype.setBaseURL = function(baseUrl) {
    this._baseUrl = baseUrl;
};


