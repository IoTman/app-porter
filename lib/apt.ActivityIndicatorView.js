APT.createNamespace("APT");


APT.ActivityIndicatorView = function() {
    if(this.constructor !== APT.ActivityIndicatorView) return new APT.ActivityIndicatorView();
    APT.ActivityIndicatorView.$inherits();
    APT.ActivityIndicatorView.$init.apply(this);
    return this;
};

APT.ActivityIndicatorView.$inherits = function() {
    APT.inherits(APT.ActivityIndicatorView, APT.View);
};

APT.ActivityIndicatorView.$init = function() {
    // instance fields
    this._hidesWhenStopped = true;
    this._animating = false;
    this._style = APT.ActivityIndicatorViewStyle.WhiteLarge;
    // call base class constructor
    APT.View.$init.apply(this);
};

APT.ActivityIndicatorView.prototype.$copy = function() {
    var copyObject = new APT.ActivityIndicatorView();
    copyObject._hidesWhenStopped = this._hidesWhenStopped;
    copyObject._animating = this._animating;
    copyObject._style = this._style;
    return copyObject;
};

// Cambia el elemento HTML de JQuery
// Markup estandar: <div></div>
APT.ActivityIndicatorView.prototype.getRenderMarkup = function() {
    return $("<div></div>");
};

APT.ActivityIndicatorView.prototype.setJQElement = function(jqelement) {
    this._jqElement = $(".ui-loader");
    if (jqelement.attr("id") !== undefined)
    {
        this.jQElement().attr("id", jqelement.attr("id"));
        this.jQElement().attr("data-apt-class", jqelement.attr("data-apt-class"));
    }
};

// Inicializa y retorna un activityIndicatorView con el style especificado de indicador
// @param aStyle style del activityIndicator
// @return       un activityIndicatorView con el style especificado
APT.ActivityIndicatorView.prototype.initWithActivityIndicatorStyle = function(aStyle) {
    this.setStyle(aStyle);
    return this;
};

// Inicia la Animacion del objeto
APT.ActivityIndicatorView.prototype.startAnimating = function() {
    $(".ui-icon-loading").css("background-image", "url(lib/images/ajax-loader.gif)");
    $("html").addClass("ui-loading");
    this.jQElement().attr("display", "block");
    this._animating = true;
};

// Detiene la Animacion del objeto
APT.ActivityIndicatorView.prototype.stopAnimating = function() {
    this._animating = false;
    if (this._hidesWhenStopped)
    {
        this.setHidden(true);
        $("html").removeClass("ui-loading");
        this.jQElement().attr("display", "none");
        this.jQElement().find(".ui-icon-loading").css("margin", "20px");
    }
    else 
    {
        this.setHidden(false);
        $(".ui-icon-loading").css("background-image", "url(lib/images/ajax-loader.png)");
    }
};

// Indica si la animacion esta activa o no
APT.ActivityIndicatorView.prototype.isAnimating = function() {
    return this._animating;
};

// Indica si la animacion debe desaparcer al detenerse
// @return true en caso de tener que dasaparecer, en caso contrario falso
APT.ActivityIndicatorView.prototype.hidesWhenStopped = function() {
    return this._hidesWhenStopped;
};

// Cambia si la animacion debe desaparcer al detenerse
// @param value true en caso de tener que dasaparecer, en caso contrario falso
APT.ActivityIndicatorView.prototype.setHidesWhenStopped = function(value) {
    this._hidesWhenStopped = value;
};

// Retorna el style actual de la animacion
APT.ActivityIndicatorView.prototype.style = function() {
    return this._style;
};

// Cambia el style de la animacion
// @param aStyle style del activityIndicator
APT.ActivityIndicatorView.prototype.setStyle = function(aStyle) {
    this._style = aStyle;
    var loader = $("span.ui-icon.ui-icon-loading");
    switch(aStyle)
    {
        case APT.ActivityIndicatorViewStyle.White:
            loader.css("width", 30);
            loader.css("height", 30);
            loader.css("background-size", "100%");
            break;
        case APT.ActivityIndicatorViewStyle.Gray:
            break;
        case APT.ActivityIndicatorViewStyle.WhiteLarge:
        default:
            loader.css("width", 46);
            loader.css("height", 46);
            loader.css("background-size", "100%");
            break;
    }
};


