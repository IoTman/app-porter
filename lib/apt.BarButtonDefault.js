APT.createNamespace("APT");


APT.BarButtonDefault = function() {
    if(this.constructor !== APT.BarButtonDefault) return new APT.BarButtonDefault();
    APT.BarButtonDefault.$inherits();
    APT.BarButtonDefault.$init.apply(this);
    return this;
};

APT.BarButtonDefault.$inherits = function() {
    APT.inherits(APT.BarButtonDefault, APT.Control);
};

APT.BarButtonDefault.$init = function() {
    // instance fields
    this._customView = null;
    this._image = null;
    this._text = null;
    this._imgJQObject = null;
    // call base class constructor
    APT.Control.$init.apply(this);
};

APT.BarButtonDefault.prototype.$copy = function() {
    var copyObject = new APT.BarButtonDefault();
    copyObject._customView = this._customView;
    copyObject._image = this._image;
    copyObject._text = this._text;
    copyObject._imgJQObject = this._imgJQObject;
    return copyObject;
};

// Class constructor.
// Override del metodo getRenderMarkup de APT.View
APT.BarButtonDefault.prototype.getRenderMarkup = function() {
    return $("<a data-role=\"button\"></a>");
};

// Sobreescribe el metodo de la superclase
// @param jqElement un jQObject que contiene el siguiene elemento del DOM "<a data-role='button'></a>"
APT.BarButtonDefault.prototype.setJQElement = function(jqElement) {
    jqElement.button();
    this._jqElement = jqElement;
};

// Devuelve el texto del boton
APT.BarButtonDefault.prototype.text = function() {
    return this._text;
};

// Asigna un texto al boton
APT.BarButtonDefault.prototype.setText = function(aText) {
    if (this._customView !== null)
    {
        this._customView.jQElement().detach();
        this._customView = null;
    }
    
    this._text = aText;
    this.showText();
};

// Devuelve la Imagen del boton
APT.BarButtonDefault.prototype.image = function() {
    return this._image;
};

// Notifies the view controller that its view is about to be added to a view hierarchy.
APT.BarButtonDefault.prototype.viewWillAppear = function(animated) {
    if (this.viewController() !== null)
    {
        this.viewController().viewWillAppear(animated);
    }
    
    this._customView.viewWillAppear(animated);
};

// Notifies the view controller that its view was added to a view hierarchy
APT.BarButtonDefault.prototype.viewDidAppear = function(animated) {
    if (this.viewController() !== null)
    {
        this.viewController().viewDidAppear(animated);
    }
    
    this._customView.viewDidAppear(animated);
};

// Notifies the view controller that its view is about to be removed from a view hierarchy
APT.BarButtonDefault.prototype.viewWillDisappear = function(animated) {
    if (this.viewController() !== null)
    {
        this.viewController().viewWillDisappear(animated);
    }
    
    this._customView.viewWillDisappear(animated);
};

// Notifies the view controller that its view was removed from a view hierarchy.
APT.BarButtonDefault.prototype.viewDidDisappear = function(animated) {
    if (this.viewController() !== null)
    {
        this.viewController().viewDidDisappear(animated);
    }
    
    this._customView.viewDidDisappear(animated);
};

// Busca el contenedor de texto dentro del elemento Button de jquery mobile y le asigna el texto que contiene el objeto APT.BarButtonDefault.
APT.BarButtonDefault.prototype.showText = function() {
    if (this._text !== null)
    {
        this.jQElement().children("span.ui-btn-inner").children("span.ui-btn-text").text(this._text.valueOf());
    }
    else 
    {
        this.jQElement().children("span.ui-btn-inner").children("span.ui-btn-text").text("");
    }
};


// BAR BUTTON ITEM
