APT.createNamespace("APT");


APT.WebView = function() {
    if(this.constructor !== APT.WebView) return new APT.WebView();
    APT.WebView.$inherits();
    APT.WebView.$init.apply(this);
    return this;
};

APT.WebView.$inherits = function() {
    APT.inherits(APT.WebView, APT.View);
};

APT.WebView.$init = function() {
    // instance fields
    this._delegate = null;
    this._request = null;
    // call base class constructor
    APT.View.$init.apply(this);
};

APT.WebView.prototype.$copy = function() {
    var copyObject = new APT.WebView();
    copyObject._delegate = this._delegate;
    copyObject._request = this._request;
    return copyObject;
};

// Cambia el elemento HTML de JQuery
// Markup estandar de vista: <div></div>
APT.WebView.prototype.getRenderMarkup = function() {
    return $("<div></div>");
};

APT.WebView.prototype.setJQElement = function(jqelement) {
    this._jqElement = jqelement.trigger("create");
    this._request = new APT.URLRequest();
};

// Agrega elementos HTML dentro de la pagina
// @param htmlString elementos que se quieren agregar dentro de la pagina
// @param url        base de la url
APT.WebView.prototype.loadHTMLString_baseURL = function(htmlString, url) {
    this._request.url().setBaseURL(url);
    var html = $(htmlString.valueOf());
    this.jQElement().append(html);
};

// Embebe dentro de la pagina un iframe con la url especificada
// @param urlRequest objeto que contiene la ubicacion de la url a ser cargada
APT.WebView.prototype.loadRequest = function(urlRequest) {
    this._request = urlRequest;
    var iframe = $("<div><iframe></iframe></div>").trigger("create").children(1);
    iframe.attr("src", urlRequest.url().absoluteString());
    this.jQElement().append(iframe);
};

// Retorna el resultado de la accion a ejecutar
// @param aScript script que se desea ejecutar
// @return resultado del script ejecutado
APT.WebView.prototype.stringByEvaluatingJavaScriptFromString = function(aScript) {
    return eval("document.frames[0]." + aScript.valueOf());
};

// Cambia el webview delegate object
APT.WebView.prototype.setDelegate = function(aDelegate) {
    this._delegate = aDelegate;
};

// Obtiene el webview delegate object
APT.WebView.prototype.delegate = function() {
    return this._delegate;
};


// MAINWINDOW						La clase window hereda de view. Se utiliza para contener las aplicaciones en pantalla y recibir sus eventos. Permite la posibilidad de manejar ventanas activas y no activas, y visibles y no visibles.
