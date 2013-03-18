APT.createNamespace("APT");


APT.BackBarButtonDefault = function() {
    if(this.constructor !== APT.BackBarButtonDefault) return new APT.BackBarButtonDefault();
    APT.BackBarButtonDefault.$inherits();
    APT.BackBarButtonDefault.$init.apply(this);
    return this;
};

APT.BackBarButtonDefault.$inherits = function() {
    APT.inherits(APT.BackBarButtonDefault, APT.BarButtonDefault);
};

APT.BackBarButtonDefault.$init = function() {
    // instance fields
    this._customView = null;
    // call base class constructor
    APT.BarButtonDefault.$init.apply(this);
};

APT.BackBarButtonDefault.prototype.$copy = function() {
    var copyObject = new APT.BackBarButtonDefault();
    copyObject._customView = this._customView;
    return copyObject;
};

// Class constructor.
// Override del metodo getRenderMarkup de APT.View
APT.BackBarButtonDefault.prototype.getRenderMarkup = function() {
    return $("<a data-role=\"button\" data-icon=\"arrow-l\"></a>");
};


// BarButtonDefault es un tipo especial de boton que utiliza la clas APT.NavigationBar para dibujar los elementos de la clase APT.BarButtonItem
