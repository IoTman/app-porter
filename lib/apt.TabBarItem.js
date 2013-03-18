APT.createNamespace("APT");


APT.TabBarItem = function() {
    if(this.constructor !== APT.TabBarItem) return new APT.TabBarItem();
    APT.TabBarItem.$inherits();
    APT.TabBarItem.$init.apply(this);
    return this;
};

APT.TabBarItem.$inherits = function() {
    APT.inherits(APT.TabBarItem, APT.BarItem);
};

APT.TabBarItem.$init = function() {
    // instance fields
    this._tabBarButton = new APT.TabBarButtonDefault();
    // call base class constructor
    APT.BarItem.$init.apply(this);
};

APT.TabBarItem.prototype.$copy = function() {
    var copyObject = new APT.TabBarItem();
    copyObject._tabBarButton = this._tabBarButton;
    return copyObject;
};

// Class constructor.
// Inicializa un item con un titulo, imagen y tag (numero identificador).
// @param title El texto a mostrar en el item.
// @param image La imagen a mostrar en el item.
// @param tag El numero identificador del item.
APT.TabBarItem.prototype.initWithTitle_image_tag = function(title, image, tag) {
    this._tabBarButton.initWithTitle_image_tag(title, image, tag);
    return this;
};

// Inicializa un item con un estilo por defecto del sistema, ver la clase APT.TabBarItem.
APT.TabBarItem.prototype.initWithTabBarSystemItem_tag = function(systemItem, tag) {
    this._tabBarButton.initWithTabBarSystemItem_tag(systemItem, tag);
    return this;
};

// Establece el titulo a mostrar en el BarItem.
// @param aTitle El titulo a mostrar por el item
APT.TabBarItem.prototype.setTitle = function(aTitle) {
    this._tabBarButton.setTitle(aTitle);
};

// Devuelve el titulo a mostrar en el BarItem. El valor por defecto es null.
// @return El titulo del item
APT.TabBarItem.prototype.title = function() {
    return this._tabBarButton.title();
};

// Establece el titulo a mostrar en el BarItem.
// @param aImage La imagen a mostrar por el item.
APT.TabBarItem.prototype.setImage = function(aImage) {
    this._tabBarButton.setImage(aImage);
};

// Devuelve la imagen a mostrar en el BarItem. El valor por defecto es null.
// @return La imagen del item
APT.TabBarItem.prototype.image = function() {
    return this._tabBarButton.image();
};

// Establese si el item esta habilitado o no.
// @param enabled true si el item esta habilitado
APT.TabBarItem.prototype.setEnabled = function(enabled) {
    this._tabBarButton.setEnabled(enabled);
};

// Devuelve un boolean que indica si el item esta habilitado. El valor por defecto es true
// @return true si el item esta habilitado.
APT.TabBarItem.prototype.isEnabled = function() {
    return this._tabBarButton.isEnabled();
};

// Establece un numero entero que usa la aplicacion para identificar el BarItem.
// @param tag El identificador.
APT.TabBarItem.prototype.setTag = function(tag) {
    this._tabBarButton.setTag(tag);
};

// Devuelve un numero entero que funciona como identificador del BarItem en la aplicacion. El valor por defecto es 0.
// @return El identificador del BarItem.
APT.TabBarItem.prototype.tag = function() {
    return this._tabBarButton.tag();
};

// Devuelve un objeto de la clase APT.TabBarButtonDefault que representa visualmente el TabBarItem. Este objeto es utilizado por la TabBar para dibujar el item en el DOM.
APT.TabBarItem.prototype.defaultView = function() {
    return this._tabBarButton;
};


// TABLEVIEW		        	 provide management of lists
