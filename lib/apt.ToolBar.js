APT.ToolBar = function() {
    if(this.constructor !== APT.ToolBar) return new APT.ToolBar();
    APT.ToolBar.$inherits();
    APT.ToolBar.$init.apply(this);
    return this;
};

APT.ToolBar.$inherits = function() {
    APT.inherits(APT.ToolBar, APT.View);
};

APT.ToolBar.$init = function() {
    // instance fields
    this._items = null;
    // call base class constructor
    APT.View.$init.apply(this);
};

APT.ToolBar.prototype.$copy = function() {
    var copyObject = new APT.ToolBar();
    copyObject._items = this._items;
    return copyObject;
};

// Class constructor.
APT.ToolBar.prototype.getRenderMarkup = function() {
    return $("<div data-role='controlgroup' data-type='horizontal' class='apt_navbar ui-header ui-bar-b'></div>");
};

APT.ToolBar.prototype.setJQElement = function(jqelement) {
    this._jqElement = jqelement.controlgroup();
    this._jqElement.css("margin", "0px");
};

// Obtiene el estilo de la barra.
// @return un entero que indica el estilo de la barra.
APT.ToolBar.prototype.barStyle = function() {
    if (this._jqElement.hasClass("ui-bar-b"))
    {
        return APT.BarStyle.Default;
    }
    else 
    {
        return APT.BarStyle.Black;
    }
};

// Cambia el estilo de la barra
// @param value entero que representa el nuevo estilo de la barra.
APT.ToolBar.prototype.setBarStyle = function(value) {
    if (value === APT.BarStyle.Default)
    {
        this._jqElement.removeClass("ui-bar-a");
        this._jqElement.addClass("ui-bar-b");
    }
    else 
    {
        this._jqElement.removeClass("ui-bar-b");
        this._jqElement.addClass("ui-bar-a");
    }
};

// Obtiene el conjunto de items de la barra.
// @return un arreglo con los items, instancias de buttonItems, que contiene la barra.
APT.ToolBar.prototype.items = function() {
    return this._items;
};

// Cambia los items de la barra animando los cambios.
// @param anArray arreglo con los items que se mostrar?n en la barra.
// @param animated booleano que anima la transicion de los elementos si se establece en YES, de lo contrario no lo hace.
APT.ToolBar.prototype.setItems_animated = function(anArray, animated) {
    var item = null;
    this._items = anArray;
    this.jQElement().children().detach();
    
    if (this._items !== null && this._items !== undefined)
    {
        for (var i = 0; i < this._items.length; i++)
        {
            item = this._items[i];
            var itemView = item.defaultView();
            itemView.jQElement().css("margin", "5px");
            this.jQElement().append(itemView.jQElement());
        }
    }
};

// Cambia los items de la barra sin animar los cambios.
// @param anArray arreglo con los items que se mostrar?n en la barra.
APT.ToolBar.prototype.setItems = function(anArray) {
    this.setItems_animated(anArray, false);
};


// end Toolbar class
// end APT namespace
// end js namespace
// PROGRESSVIEW
// /La clase proegressView hereda de View. Se utiliza para representar el estado de avance de una acci?n
