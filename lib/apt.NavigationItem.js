APT.createNamespace("APT");


APT.NavigationItem = function() {
    if(this.constructor !== APT.NavigationItem) return new APT.NavigationItem();
    APT.NavigationItem.$inherits();
    APT.NavigationItem.$init.apply(this);
    return this;
};

APT.NavigationItem.$inherits = function() {
    APT.inherits(APT.NavigationItem, Object);
};

APT.NavigationItem.$init = function() {
    // instance fields
    this._jqElement = null;
    this._title = null;
    this._titleView = null;
    this._backBarButtonItem = null;
    this._leftBarButtonItems = null;
    this._rightBarButtonItems = null;
    this._prompt = null;
    this._navigationBar = null;
    this._leftItemsSupplementBackButton = null;
    this._hidesBackButton = null;
    // call base class constructor
    Object.apply(this);
    this._leftItemsSupplementBackButton = false;
    this._hidesBackButton = false;
    this._leftBarButtonItems = new Array();
    this._rightBarButtonItems = new Array();
    if (this.jQElement() === null)
    {
        this.setJQElement(this.getRenderMarkup());
    }
};

APT.NavigationItem.prototype.$copy = function() {
    var copyObject = new APT.NavigationItem();
    copyObject._jqElement = this._jqElement;
    copyObject._title = this._title;
    copyObject._titleView = this._titleView;
    copyObject._backBarButtonItem = this._backBarButtonItem;
    copyObject._leftBarButtonItems = this._leftBarButtonItems;
    copyObject._rightBarButtonItems = this._rightBarButtonItems;
    copyObject._prompt = this._prompt;
    copyObject._navigationBar = this._navigationBar;
    copyObject._leftItemsSupplementBackButton = this._leftItemsSupplementBackButton;
    copyObject._hidesBackButton = this._hidesBackButton;
    return copyObject;
};

// El constructor de la clase.
APT.NavigationItem.prototype.getRenderMarkup = function() {
    return $("<div><div data-role=\"controlgroup\" data-type=\"horizontal\" class=\"ui-btn-left\"></div><div class=\"ui-title\"><div class=\"apt_navbar_prompt\" /><div class=\"apt_navbar_title\" /></div><div data-role=\"controlgroup\" data-type=\"horizontal\" class=\"ui-btn-right\"></div></div>");
};

APT.NavigationItem.prototype.setJQElement = function(jqelement) {
    this._jqElement = jqelement.trigger("create");
};

// Devuelve el elemento HTML de JQuery, esto puede ser util para completar la traduccion y queremos manipular el HTML u objetos
APT.NavigationItem.prototype.jQElement = function() {
    return this._jqElement;
};

// Returns a navigation item initialized with the specified title
// @param aTitle The string to set as the navigation item?s title displayed in the center of the navigation bar.
// @return       A new NavigationItem object initialized with the specified title
APT.NavigationItem.prototype.initWithTitle = function(aTitle) {
    this.setTitle(aTitle);
    return this;
};

// Sets the navigation item?s title displayed in the center of the navigation bar
APT.NavigationItem.prototype.setTitle = function(aTitle) {
    this._title = aTitle;
    if (this._navigationBar !== null)
    {
        this._navigationBar.displayCenterItems();
    }
};

// Gets the navigation item?s title displayed in the center of the navigation bar
APT.NavigationItem.prototype.title = function() {
    return this._title;
};

// Sets a custom view displayed in the center of the navigation bar when the receiver is the top item
APT.NavigationItem.prototype.setTitleView = function(aView) {
    this._titleView = aView;
};

// Gets a custom view displayed in the center of the navigation bar when the receiver is the top item
APT.NavigationItem.prototype.titleView = function() {
    return this._titleView;
};

// Sets the back bar button item
// @param aButtonItem An array of custom bar button items to display on the back side of the navigation bar.
APT.NavigationItem.prototype.setBackBarButtonItem = function(aButtonItem) {
    this._backBarButtonItem = aButtonItem;
    if (this._navigationBar !== null)
    {
        this._navigationBar.displayLeftItems(false);
    }
};

// The bar button item to use when a back button is needed on the navigation bar
APT.NavigationItem.prototype.backBarButtonItem = function() {
    return this._backBarButtonItem;
};

// Sets the left bar button items
// @param aButtonItem An array of custom bar button items to display on the left side of the navigation bar.
APT.NavigationItem.prototype.setLeftBarButtonItem = function(aButtonItem) {
    this._leftBarButtonItems[0] = aButtonItem;
    if (this._navigationBar !== null)
    {
        this._navigationBar.displayLeftItems(false);
    }
};

// An array of custom bar button items to display on the left side of the navigation bar when the receiver is the top navigation item
APT.NavigationItem.prototype.leftBarButtonItem = function() {
    return this._leftBarButtonItems[0];
};

// Sets the left bar button items array
// @param aButtonItem An array of custom bar button items to display on the left side of the navigation bar.
APT.NavigationItem.prototype.setLeftBarButtonItems = function(aLeftButtonItemsArray) {
    this._leftBarButtonItems = aLeftButtonItemsArray;
    if (this._navigationBar !== null)
    {
        this._navigationBar.displayLeftItems(false);
    }
};

// An array of custom bar button items to display on the left side of the navigation bar when the receiver is the top navigation item
APT.NavigationItem.prototype.leftBarButtonItems = function() {
    return this._leftBarButtonItems;
};

// Sets the right bar button item
// @param aButtonItem A custom bar item to display on the right of the navigation bar
APT.NavigationItem.prototype.setRightBarButtonItem = function(aButtonItem) {
    this._rightBarButtonItems[0] = aButtonItem;
    if (this._navigationBar !== null)
    {
        this._navigationBar.displayRightItems(false);
    }
};

// Gets A custom bar button item displayed on the right of the navigation bar when the receiver is the top navigation item
APT.NavigationItem.prototype.rightBarButtonItem = function() {
    return this._rightBarButtonItems[0];
};

// Sets the right bar button item
// @param aButtonItem A custom bar item to display on the right of the navigation bar
APT.NavigationItem.prototype.setRightBarButtonItems = function(aRightButtonItems) {
    this._rightBarButtonItems = aRightButtonItems;
    if (this._navigationBar !== null)
    {
        this._navigationBar.displayRightItems(false);
    }
};

// Gets A custom bar button item displayed on the right of the navigation bar when the receiver is the top navigation item
APT.NavigationItem.prototype.rightBarButtonItems = function() {
    return this._rightBarButtonItems;
};

// Sets a single line of text displayed at the top of the navigation bar.
APT.NavigationItem.prototype.setPrompt = function(aPrompt) {
    this._prompt = aPrompt;
};

// Gets a single line of text displayed at the top of the navigation bar.
APT.NavigationItem.prototype.prompt = function() {
    return this._prompt;
};

// Oculta o muestra el boton BackButton de la barra de navegacion.
// @param aHidesBackButton oculta el boton BackButton si es igual a true, sino lo muestra
APT.NavigationItem.prototype.setHidesBackButton = function(aHidesBackButton) {
    this._hidesBackButton = aHidesBackButton;
};

// Indica si el boton BackButton de la barra de navegacion esta visible.
// @return true si el boton BackButton esta oculto, sino false
APT.NavigationItem.prototype.hidesBackButton = function() {
    return this._hidesBackButton;
};

// Oculta o muestra el backButtonItem de la barra de navegacion si existe algun leftBarButtonItem.
// @param aLeftItemsSupplementBackButton muestra el boton si es igual a true, sino lo oculta
APT.NavigationItem.prototype.setLeftItemsSupplementBackButton = function(aLeftItemsSupplementBackButton) {
    this._leftItemsSupplementBackButton = aLeftItemsSupplementBackButton;
};

// Indica si el boton backButtonItem de la barra de navegacion esta visible cuando existe algun leftBarButtonItem.
// @return true si el boton se muestra cuando existe algun leftBarButtonItem, sino false
APT.NavigationItem.prototype.leftItemsSupplementBackButton = function() {
    return this._leftItemsSupplementBackButton;
};

// helper methods
// Metodo auxiliar utilizado por la clase NavigationBar para agregar en cada item una instancia de la barra de navegacion a la que pertenecen.
APT.NavigationItem.prototype.setNavigationBar = function(aNavigationBar) {
    this._navigationBar = aNavigationBar;
};


// POINT								From CGPoint Struct
