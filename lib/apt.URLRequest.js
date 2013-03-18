APT.createNamespace("APT");


APT.URLRequest = function() {
    if(this.constructor !== APT.URLRequest) return new APT.URLRequest();
    APT.URLRequest.$inherits();
    APT.URLRequest.$init.apply(this);
    return this;
};

APT.URLRequest.$inherits = function() {
    APT.inherits(APT.URLRequest, Object);
};

APT.URLRequest.$init = function() {
    // instance fields
    this._url = null;
    // call base class constructor
    Object.apply(this);
    this._url = new APT.URL();
};

APT.URLRequest.prototype.$copy = function() {
    var copyObject = new APT.URLRequest();
    copyObject._url = this._url;
    return copyObject;
};

// Class constructor.
// Crea y retorna un objeto URLRequest con la url especificada
// @param aUrl url que va a contener el objeto URLRequest
// @return un objeto URLRequest con la url especificada
APT.URLRequest.requestWithURL = function(aUrl) {
    var urlRequest = new APT.URLRequest();
    urlRequest._url = aUrl;
    return urlRequest;
};

// Retorna el objeto url
APT.URLRequest.prototype.url = function() {
    return this._url;
};


// VIEW
