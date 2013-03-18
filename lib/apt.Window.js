APT.createNamespace("APT");


APT.Window = function() {
    if(this.constructor !== APT.Window) return new APT.Window();
    APT.Window.$inherits();
    APT.Window.$init.apply(this);
    return this;
};

APT.Window.$inherits = function() {
    APT.inherits(APT.Window, APT.View);
};

APT.Window.$init = function() {
    // instance fields
    this._rootViewController = null;
    this._keyWindow = false;
    this._hidden = true;
    // call base class constructor
    APT.View.$init.apply(this);
};

APT.Window.prototype.$copy = function() {
    var copyObject = new APT.Window();
    copyObject._rootViewController = this._rootViewController;
    copyObject._keyWindow = this._keyWindow;
    copyObject._hidden = this._hidden;
    return copyObject;
};

APT.Window._winActive = null;

// Class constructor.
APT.Window.prototype.getRenderMarkup = function() {
    return $("<div class=\"apt_view apt_window\" data-viewtype=\"Window\"></div>");
};

APT.Window.prototype.setJQElement = function(jqelement) {
    this._jqElement = jqelement.trigger("create");
    this._hidden = true;
    this._jqElement.css("visibility", "hidden");
};

// Inicializa el window seteando su valor visibility del window actual en visible y el de los demas window en hidden. Setea la referencia winActive al objeto actual para indicar que es window activa.
APT.Window.prototype.makeKeyAndVisible = function() {
    var obj = $(".apt_window");
    var array = obj;
    for (var i = 0; i < array.length; i++)
    {
        $(array[i]).css("visibility", "hidden");
    }
    
    this._keyWindow = true;
    this._hidden = false;
    this._jqElement.css("visibility", "visible");
    var value = parseFloat(1.0);
    this.setAlpha(value);
    if (this !== APT.Window._winActive)
    {
        this.keyWindow(this);
    }
    
    this.viewWillAppear(false);
    $("#main-page").append(this.jQElement());
    this.viewDidAppear(false);
};

// Inicializa el window seteando su valor visibility del window actual en visible y con su opacidad en 0. Setea la referencia winActive al objeto actual para indicar que es window activa.
APT.Window.prototype.makeKeyWindow = function() {
    this._keyWindow = true;
    if (this._hidden)
    {
        this._jqElement.css("visibility", "visible");
        this._hidden = false;
        var value = parseFloat(0.0);
        this.setAlpha(value);
    }
    
    if (this !== APT.Window._winActive)
    {
        this.keyWindow(this);
    }
    
    $("#main-page").append(this.jQElement());
};

// Setea puntero _winActive apuntandolo al objeto window activo.
APT.Window.prototype.keyWindow = function(win) {
    APT.Window._winActive = win;
};

// Setea el view controller.
APT.Window.prototype.setRootViewController = function(viewController) {
    this._rootViewController = viewController;
    if (viewController !== null && viewController !== undefined)
    {
        var frame = this.frame();
        if (frame.size.width > 0 && frame.size.height > 0)
        {
            viewController.view().setFrame(frame);
        }
        
        this.addSubview(viewController.view());
    }
};

// Obtiene el view controller.
// @return     El view controller
APT.Window.prototype.rootViewController = function() {
    return this._rootViewController;
};

// Devuelve si una window esta activa o no.
// @return     El bool que indica si esta activa o inactiva la window
APT.Window.prototype.isKeyWindow = function() {
    if (this === APT.Window._winActive)
    {
        return true;
    }
    else 
    {
        return false;
    }
};


