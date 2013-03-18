APT.createNamespace("APT");


APT.ProgressView = function() {
    if(this.constructor !== APT.ProgressView) return new APT.ProgressView();
    APT.ProgressView.$inherits();
    APT.ProgressView.$init.apply(this);
    return this;
};

APT.ProgressView.$inherits = function() {
    APT.inherits(APT.ProgressView, APT.View);
};

APT.ProgressView.$init = function() {
    // call base class constructor
    APT.View.$init.apply(this);
};

// Class constructor.
APT.ProgressView.prototype.getRenderMarkup = function() {
    return $("<div></div>");
};

// Cambia el elemento HTML de JQuery
// Markup estandar de vista: <div></div>
APT.ProgressView.prototype.setJQElement = function(jqelement) {
    var value = jqelement.text();
    this._jqElement = jqelement.text("").progressbar();
    if (value.length > 0)
    {
        this.setProgress(parseFloat(value));
    }
};

// Inicializa y retorna un progressView con el style especificado.
// @param aStyle style del progressView
// @return       un progressView con el style especificado
APT.ProgressView.prototype.initWithProgressViewStyle = function(aStyle) {
    this.setProgressViewStyle(aStyle);
    return this;
};

// Devuelve el estilo de la barra deprogreso.
APT.ProgressView.prototype.progressViewStyle = function() {
    if (this.jQElement().css("background") === "blue")
    {
        return APT.ProgressViewStyle.Bar;
    }
    else 
    {
        return APT.ProgressViewStyle.Default;
    }
};

// Modifica el estilo del progressView.
// @param aStyle El valor que indica el estilo del progressView.
APT.ProgressView.prototype.setProgressViewStyle = function(aStyle) {
    switch(aStyle)
    {
        
        case APT.ProgressViewStyle.Default:
            this.jQElement().find(".ui-widget-header").css("background", "blue");
            this.jQElement().css("background", "white");
            break;
        case APT.ProgressViewStyle.Bar:
            this.jQElement().find(".ui-widget-header").css("background", "white");
            this.jQElement().css("background", "blue");
            break;
    }
};

// Modifica el avance del componente progressView.
// @param value El valor que indica la posici?n del progressView.
APT.ProgressView.prototype.setProgress = function(value) {
    this._jqElement.progressbar("option", "value", value * 100);
};

// Retorna el estado de avance del componente progressView.
// @return     el valor que indica la posici?n del progressView.
APT.ProgressView.prototype.progress = function() {
    var progress = parseFloat(this._jqElement.progressbar("option", "value"));
    return progress / 100;
};

// Anima el avance del componente progressView.
// @param value El valor que indica la posici?n del progressView.
APT.ProgressView.prototype.animateProgressBar = function(value) {
    var value2 = new String(value * 100);
    value2 = value2 + "%";
    this._jqElement.find(".ui-progressbar-value").css("width", "0").animate({"width" : value2}, {"queue" : false});
};

// Modifica el avance del componente progressView con o sin animaci?n.
// @param value El valor que indica la posici?n del progressView.
// @param animated TRUE-indica que el cambio ser? animado.
// FALSE-indica que el cambio ser? inmediato, sin animaci?n.
APT.ProgressView.prototype.setProgressAnimated = function(value, animated) {
    if (animated)
    {
        this._jqElement.progressbar("option", "value", value * 100);
        this.animateProgressBar(value);
    }
    else 
    {
        this._jqElement.progressbar("option", "value", value * 100);
    }
};


