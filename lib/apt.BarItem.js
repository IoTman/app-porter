APT.createNamespace("APT");


APT.BarItem = function() {
    if(this.constructor !== APT.BarItem) return new APT.BarItem();
    APT.BarItem.$inherits();
    APT.BarItem.$init.apply(this);
    return this;
};

APT.BarItem.$inherits = function() {
    APT.inherits(APT.BarItem, Object);
};

APT.BarItem.$init = function() {
    // call base class constructor
    Object.apply(this);
};

// Class constructor.
// Establece el titulo a mostrar en el BarItem.
// @param aTitle el titulo a mostrar por el item
APT.BarItem.prototype.setTitle = function(aTitle) {
    // must implement this method in subclass
};

// Devuelve el titulo a mostrar en el BarItem. El valor por defecto es null.
// @return el titulo del item
APT.BarItem.prototype.title = function() {
    return null;
};

// Establese si el item esta habilitado o no.
// @param enabled true si el item esta habilitado
APT.BarItem.prototype.setEnabled = function(enabled) {
    // must implement this method in subclass
};

// Devuelve un boolean que indica si el item esta habilitado. El valor por defecto es true
// @return true si el item esta habilitado
APT.BarItem.prototype.isEnabled = function() {
    return true;
};

// Establece un numero entero que usa la aplicacion para identificar el BarItem.
// @param tag el identificador
APT.BarItem.prototype.setTag = function(tag) {
    // must implement this method in subclass
};

// Devuelve un numero entero que funciona como identificador del BarItem en la aplicacion. El valor por defecto es 0.
APT.BarItem.prototype.tag = function() {
    return 0;
};


// Bundle - 				    La clase bundle hereda de object. Se utiliza esta clase para obtener la ruta al directorio de la aplicaci?n, o para validar la existencia de un un archivo en una ruta determinada.
