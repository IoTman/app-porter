APT.createNamespace("APT");


APT.TabBarButtonDefault = function() {
    if(this.constructor !== APT.TabBarButtonDefault) return new APT.TabBarButtonDefault();
    APT.TabBarButtonDefault.$inherits();
    APT.TabBarButtonDefault.$init.apply(this);
    return this;
};

APT.TabBarButtonDefault.$inherits = function() {
    APT.inherits(APT.TabBarButtonDefault, APT.Control);
};

APT.TabBarButtonDefault.$init = function() {
    // instance fields
    this._image = null;
    this._title = null;
    this._tabBarSystemItem = -1;
    this._paddingHeightMultiplier = 0.1;
    // call base class constructor
    APT.Control.$init.apply(this);
    this.setImage(null);
    this.setTitle(null);
};

APT.TabBarButtonDefault.prototype.$copy = function() {
    var copyObject = new APT.TabBarButtonDefault();
    copyObject._image = this._image;
    copyObject._title = this._title;
    copyObject._tabBarSystemItem = this._tabBarSystemItem;
    copyObject._paddingHeightMultiplier = this._paddingHeightMultiplier;
    return copyObject;
};

// Override del metodo getRenderMarkup de APT.View
APT.TabBarButtonDefault.prototype.getRenderMarkup = function() {
    return $("<li class=\"style_tabbarbuttondefault\"><a data-role=\"button\" ></a><li>");
};

// Cambia el elemento HTML de JQuery
// Markup estandar de vista: <div class=\"apt_view\"></div>
APT.TabBarButtonDefault.prototype.setJQElement = function(jqElement) {
    this._jqElement = jqElement;
    this.jQElement().find("a").button();
    this.jQElement().find("a").buttonMarkup({"icon" : "star"});
    this.jQElement().find("a").buttonMarkup({"iconpos" : "top"});
    this.jQElement().find("a").buttonMarkup({"iconshadow" : false});
    this.jQElement().find("a").buttonMarkup({"corners" : false});
    
    if (jqElement.css("background-image") !== undefined && jqElement.css("background-image").length > 0)
    {
        var image = APT.Image.imageNamed(jqElement.attr("background-image"));
        this.setImage(image);
    }
    
    this.ajustStylesInnerElements();
};

APT.TabBarButtonDefault.prototype.initWithTitle_image_tag = function(title, image, tag) {
    this.setTitle(title);
    this.setImage(image);
    this.setTag(tag);
    return this;
};

APT.TabBarButtonDefault.prototype.initWithTabBarSystemItem_tag = function(systemItem, tag) {
    this._tabBarSystemItem = -1;
    switch(systemItem)
    {
        case APT.TabBarSystemItem.More:
            this.jQElement().find("a").find(".ui-icon").css("background-image", "");
            this.jQElement().find("a").find(".ui-icon").css("background-color", "");
            this.jQElement().find("a").find(".ui-icon").addClass("apt_tabBarItemIcon_more");
            this.setTitle("More");
            this._tabBarSystemItem = APT.TabBarSystemItem.More;
            break;
        default:
            this.setImage(null);
            this.setTitle(null);
            break;
    }
    
    this._image = null;
    this._title = null;
    this.setTag(tag);
    return this;
};

// Cambia el tamanio y ubicacion del frame en la pagina
APT.TabBarButtonDefault.prototype.setHeight = function(aHeight) {
    var cssHeight = new String(aHeight) + "px";
    this.jQElement().find("a").css("height", cssHeight);
    
    var buttonInner = this.jQElement().find("a").children(".ui-btn-inner");
    buttonInner.css("height", cssHeight);
    
    var buttonText = buttonInner.children(".ui-btn-text");
    var textHeight = 18;
    var topMargin = parseInt(cssHeight) - textHeight;
    buttonText.css("top", new Number(topMargin).toString() + "px");
    
    var buttonIcon = buttonInner.children(".ui-icon");
    var paddingSize = parseInt(topMargin * this._paddingHeightMultiplier);
    buttonIcon.css("height", new Number(topMargin - paddingSize * 2).toString() + "px");
    buttonIcon.css("padding-top", new Number(paddingSize).toString() + "px");
    buttonIcon.css("padding-bottom", new Number(paddingSize).toString() + "px");
};

APT.TabBarButtonDefault.prototype.setTitle = function(title) {
    if (!this.isTabBarSystemItem())
    {
        if (title !== null && title !== undefined)
        {
            this._title = title;
            this.jQElement().find("a").find(".ui-btn-text").text(title);
        }
        else 
        {
            this._title = null;
            this.jQElement().find("a").find(".ui-btn-text").text("");
        }
    }
};

APT.TabBarButtonDefault.prototype.title = function() {
    return this._title;
};

APT.TabBarButtonDefault.prototype.setImage = function(image) {
    if (!this.isTabBarSystemItem())
    {
        var iconContainer = this.jQElement().find("a").find(".ui-icon");
        if (image !== null && image !== undefined)
        {
            this._image = image;
            iconContainer.css("background-image", "url(" + image.name() + ")");
            iconContainer.css("background-color", "transparent");
        }
        else 
        {
            this._image = null;
            iconContainer.css("background-image", "none");
            iconContainer.css("background-color", "transparent");
        }
    }
};

APT.TabBarButtonDefault.prototype.image = function() {
    return this._image;
};

APT.TabBarButtonDefault.prototype.ajustStylesInnerElements = function() {
    this.jQElement().find("a").css("margin-top", "0px");
    this.jQElement().find("a").css("margin-bottom", "0px");
    this.jQElement().find("a").css("margin-right", "0px");
    this.jQElement().find("a").css("margin-left", "0px");
    this.jQElement().find("a").css("pading-top", "0px");
    this.jQElement().find("a").css("pading-bottom", "0px");
    this.jQElement().find("a").css("pading-right", "0px");
    this.jQElement().find("a").css("pading-left", "0px");
    this.jQElement().find("a").css("-webkit-box-shadow", "none");
    this.jQElement().find("a").css("box-shadow", "none");
    
    var buttonInner = this.jQElement().find("a").children(".ui-btn-inner");
    buttonInner.css("padding-top", "0px");
    buttonInner.css("padding-bottom", "0px");
    buttonInner.css("padding-left", "0px");
    buttonInner.css("padding-right", "0px");
    buttonInner.css("margin-top", "0px");
    buttonInner.css("margin-bottom", "0px");
    buttonInner.css("margin-left", "0px");
    buttonInner.css("margin-right", "0px");
    
    var buttonIcon = buttonInner.children(".ui-icon");
    buttonIcon.css("background-position", "0px 0px");
    buttonIcon.css("top", "0px");
    buttonIcon.css("left", "0px");
    buttonIcon.css("text-align", "center");
    var paddingPercentage = parseInt(100 * this._paddingHeightMultiplier);
    buttonIcon.css("padding-left", new Number(paddingPercentage).toString() + "%");
    buttonIcon.css("padding-right", new Number(paddingPercentage).toString() + "%");
    buttonIcon.css("width", new Number(100 - paddingPercentage * 2).toString() + "%");
    buttonIcon.css("margin-top", "0px");
    buttonIcon.css("margin-bottom", "0px");
    buttonIcon.css("margin-left", "0px");
    buttonIcon.css("margin-right", "0px");
    buttonIcon.css("position", "absolute");
    buttonIcon.css("background-position", "center center");
    buttonIcon.css("background-origin", "content-box");
    buttonIcon.css("background-size", "contain");
    buttonIcon.css("-webkit-border-radius", "0px");
    buttonIcon.css("border-radius", "0px");
    
    var buttonText = buttonInner.children(".ui-btn-text");
    buttonText.css("left", "0px");
    buttonText.css("padding-top", "0px");
    buttonText.css("padding-bottom", "0px");
    buttonText.css("padding-left", "0px");
    buttonText.css("padding-right", "0px");
    buttonText.css("margin-top", "0px");
    buttonText.css("margin-bottom", "0px");
    buttonText.css("margin-left", "0px");
    buttonText.css("margin-right", "0px");
    buttonText.css("position", "absolute");
    buttonText.css("width", "100%");
};

APT.TabBarButtonDefault.prototype.isTabBarSystemItem = function() {
    return this._tabBarSystemItem >= 0 && this._tabBarSystemItem <= 11;
};


// La interfaz a implementar por el delegado de un objeto del tipo APT.TabBarController. Esta interfaz consta de dos metodos opcionales detallados a continuacion: \n
// bool tabBarController_shouldSelectViewController(APT.TabBarController tabBarController, APT.ViewController viewController);\n
// Consulta al objeto delegado si un controlador de vista en particular puede pasar a estar activo. El TabBarController asociado al delegado llama a este metodo cada ves que el usuario selecciona un item en la TabBar para consultar si el item es seleccionable, no asi cuando el ViewController activo se define programaticamente mediante los metodos setSelectedViewController y setSelectedIndex de la clase APT.TabBarController.
// La implementacion de este metodo en el objeto es opcional.
// -param tabBarController El TabBarController que envia el mensaje al delegado.
// -param viewController El controlador de vista a activar, este objeto puede ser el mismo que esta actualmente activo en el TabBarController si el usuario selecciona un item nuevamente en la TabBar.
// -return El metodo debe devolver false si el ViewController no puede pasar a estar activo, en ese caso no se muestra la vista del controlador y no se selecciona el item correspondiente en la TabBar. En caso de devolver true el TabBarController funciona normalmente.
// \n
// void tabBarController_didSelectViewController(APT.TabBarController tabBarController, APT.ViewController viewController)
// Indica al objeto delegado que un ViewController ha pasado a estar activo en el TabBarController. El TabBarController asociado al delegado llama a este metodo cada ves que el usuario selecciona un item en la TabBar para consultar si el item es seleccionable, no asi cuando el ViewController activo se define programaticamente mediante los metodos setSelectedViewController y setSelectedIndex de la clase APT.TabBarController.
// La implementacion de este metodo en el objeto es opcional.
// -param tabBarController El TabBarController que envia el mensaje al delegado.
// -param viewController El controlador de vista que se ha activado, este objeto puede ser el mismo que estubo anteriormente activo en el TabBarController si el usuario selecciona un item nuevamente en la TabBar.
