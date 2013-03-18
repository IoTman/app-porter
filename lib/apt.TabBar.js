APT.createNamespace("APT");


APT.TabBarDelegate = function() {};

APT.TabBarDelegate.$inherits = function() {};

APT.TabBarDelegate.$init = function() {};

// Mensaje que se le envia al objeto delegado de una TabBar cuando el usuario selecciona un item. Este metodo es requerido, esto quiere decir que toda clase que implemente la interfaz TabBarDelegate debe implementar este metodo.
// @param tabBar El objeto APT.TabBar sobre el que se selecciona un item.
// @param item El objeto APT.TabBarItem seleccionado.
APT.TabBarDelegate.prototype.tabBar_didSelectItem = function(tabBar, item) {};

// La clase APT.TabBar encapsula un elemento de Navbar de jquery Mobile para implementar el comportamiento de la clase UITabBar de IOS.
// Representa un control con 2 o mas botones llamados items donde solo se puede seleccionar un item.
// El uso mas comun de APT.TabBar es como menu de navegacion de la aplicacion.
APT.TabBar = function() {
    if(this.constructor !== APT.TabBar) return new APT.TabBar();
    APT.TabBar.$inherits();
    APT.TabBar.$init.apply(this);
    return this;
};

APT.TabBar.$inherits = function() {
    APT.inherits(APT.TabBar, APT.View);
};

APT.TabBar.$init = function() {
    // instance fields
    this._items = new Array();
    this._delegate = null;
    this._autoHeight = true;
    // call base class constructor
    APT.View.$init.apply(this);
    this.setDelegate(null);
};

APT.TabBar.prototype.$copy = function() {
    var copyObject = new APT.TabBar();
    copyObject._items = this._items;
    copyObject._delegate = this._delegate;
    copyObject._autoHeight = this._autoHeight;
    return copyObject;
};

// Override del metodo getRenderMarkup de APT.View
APT.TabBar.prototype.getRenderMarkup = function() {
    return $("<div data-role=\"navbar\"><ul class=\"style_tabbar\"></ul></div>");
};

// Cambia el elemento HTML de JQuery
// Markup estandar de vista: <div class=\"apt_view\"></div>
APT.TabBar.prototype.setJQElement = function(jqElement) {
    this._jqElement = jqElement.navbar();
};

// Establese los items mostrados en la TabBar.
// @param items El arreglo de TabBarItems.
APT.TabBar.prototype.setItems = function(items) {
    this._items = items;
    this._jqElement.find("ul").children().detach();
    
    var percentageWidth = 100;
    if (items.length > 0)
    {
        percentageWidth = parseInt(100 / items.length);
    }
    
    var aTabBarItem = null;
    var liJQuery = null;
    var thisTabBar = this;
    for (var i = 0; i < this._items.length; i++)
    {
        aTabBarItem = this._items[i];
        var $that = this;
        
        aTabBarItem.defaultView().jQElement().on("vclick", function(event) {
            var item;
            for (var i = 0; i < thisTabBar.items().length; i++)
            {
                if (thisTabBar.items()[i].defaultView().jQElement()[0] === $that)
                {
                    item = thisTabBar.items()[i];
                    break;
                }
            }
            
            thisTabBar.setSelectedItem(item);
            if (thisTabBar.delegate() !== null)
            {
                thisTabBar.delegate().tabBar_didSelectItem(thisTabBar, item);
            }
            
            event.stopPropagation();
        });
        
        if (i === this._items.length - 1)
        {
            percentageWidth = 100 - percentageWidth * (this._items.length - 1);
        }
        
        $(aTabBarItem.defaultView().jQElement()[0]).css("width", new Number(percentageWidth).toString() + "%");
        $(aTabBarItem.defaultView().jQElement()[0]).appendTo(this.jQElement().find("ul"));
    }
    
    this.adjustHeight();
};

// Devuelve un arreglo con los items de la TabBar.
APT.TabBar.prototype.items = function() {
    return this._items.slice(0);
};

// Asigna un objeto delegado a la TabBar.
// @param aDelegate Un objeto que implementa la interfaz APT.TabBarDelegate.
APT.TabBar.prototype.setDelegate = function(aDelegate) {
    this._delegate = aDelegate;
};

// Devuelve el objeto delegado de la TabBar
APT.TabBar.prototype.delegate = function() {
    return this._delegate;
};

// Devuelve el item seleccionado en la barra. El valor por defecto es null (ningun item seleccionado).
APT.TabBar.prototype.selectedItem = function() {
    var result = null;
    
    for (var i = 0; i < this._items.length; i++)
    {
        if ((this._items[i]).defaultView().jQElement().find("a").hasClass("ui-btn-active"))
        {
            result = this._items[i];
            break;
        }
    }
    
    return result;
};

// Selecciona un item de la TabBar. Si recibe null se quita la seleccion de los items de la barra. Envia un mensaje al delegado de la TabBar mediante el metodo tabBar_didSelectItem de la interfaz APT.TabBarDelegate.
// @param selectedItem El item a seleccionar.
APT.TabBar.prototype.setSelectedItem = function(selectedItem) {
    this.deselectItems();
    if (selectedItem !== null && selectedItem !== undefined)
    {
        selectedItem.defaultView().jQElement().find("a").addClass("ui-btn-active");
    }
};

// Cambia el tamanio y ubicacion del frame en la pagina y ajusta la altura de los items de la barra.
APT.TabBar.prototype.setFrame = function(aFrame) {
    aFrame = aFrame.$copy();
    this.$super_setFrame(aFrame);
    this._autoHeight = false;
    this.adjustHeight();
};

// Quita la seleccion de todos los segmentItems.
APT.TabBar.prototype.deselectItems = function() {
    this.jQElement().find("a").removeClass("ui-btn-active");
};

// Ajusta la altura de todos los componentes internos de la TabBar.
APT.TabBar.prototype.adjustHeight = function() {
    if (!this._autoHeight)
    {
        this.jQElement().find("ul").css("height", Number(this.frame().size.height).toString() + "px");
        this.jQElement().find("li").css("height", Number(this.frame().size.height).toString() + "px");
        var tabItem = null;
        for (var i = 0; i < this._items.length; i++)
        {
            tabItem = this._items[i];
            tabItem.defaultView().setHeight(parseInt(this.frame().size.height));
        }
    }
};


// TabBarButtonDefault es un tipo especial de boton que utiliza la clas APT.TabBar para dibujar los elementos de la clase APT.TabBarButtonItem
