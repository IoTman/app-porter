APT.createNamespace("APT");


APT.ViewController = function() {
    if(this.constructor !== APT.ViewController) return new APT.ViewController();
    APT.ViewController.$inherits();
    APT.ViewController.$init.apply(this);
    return this;
};

APT.ViewController.$inherits = function() {
    APT.inherits(APT.ViewController, Object);
};

APT.ViewController.$init = function() {
    // instance fields
    this._navigationItem = null;
    this._navigationController = null;
    this._title = null;
    this._tabBarItem = null;
    this._tabBarController = null;
    this._toolbarItems = null;
    this._hidesBottomBarWhenPushed = true;
    this._view = null;
    // call base class constructor
    Object.apply(this);
};

APT.ViewController.prototype.$copy = function() {
    var copyObject = new APT.ViewController();
    copyObject._navigationItem = this._navigationItem;
    copyObject._navigationController = this._navigationController;
    copyObject._title = this._title;
    copyObject._tabBarItem = this._tabBarItem;
    copyObject._tabBarController = this._tabBarController;
    copyObject._toolbarItems = this._toolbarItems;
    copyObject._hidesBottomBarWhenPushed = this._hidesBottomBarWhenPushed;
    copyObject._view = this._view;
    return copyObject;
};

// Retorna el view asociado al controller en caso de no ser null, en caso contrario invoca al metodo loadView y viewDidLoad
// para que esta se cree
// @return la view asociada al controller
APT.ViewController.prototype.view = function() {
    if (this._view === null)
    {
        this.loadView();
        this.viewDidLoad();
        if (this._view !== null && this._view !== undefined)
        {
            this._view.setViewController(this);
            this.configureTouchEvents();
        }
    }
    
    return this._view;
};

APT.ViewController.prototype.configureTouchEvents = function() {
    var _viewControlerAux = this;
    
    var downevent;
    var upevent;
    var moveevent;
    var cancelevent;
    
    if (navigator.msPointerEnabled)
    {
        downevent = "MSPointerDown";
        upevent = "MSPointerUp";
        moveevent = "MSPointerMove";
        cancelevent = "MSPointerCancel";
    }
    else 
    {
        downevent = "touchstart";
        upevent = "touchend";
        moveevent = "touchmove";
        cancelevent = "touchcancel";
    }
    
    this._view.jQElement().on(downevent, function(event) {
        var arrayAux = new Array();
        var touch = null;
        
        if (eval("event.originalEvent.type == \"MSPointerDown\""))
        {
            touch = new APT.Touch(event.originalEvent.pageX, event.originalEvent.pageY);
            arrayAux[0] = touch;
        }
        else 
        {
            for (var i = 0; i < event.originalEvent.targetTouches.length; i++)
            {
                touch = new APT.Touch(event.originalEvent.targetTouches[i].clientX, event.originalEvent.targetTouches[i].clientY);
                arrayAux[i] = touch;
            }
        }
        
        var touches = APT.Set.NewWithObjects(arrayAux);
        var e = new APT.Event();
        e._evnt = event;
        _viewControlerAux.view().touchesBegan_withEvent(touches, e);
        event.stopPropagation();
    });
    
    this._view.jQElement().on(moveevent, function(event) {
        var arrayAux = new Array();
        var touch;
        
        if (eval("event.originalEvent.type == \"MSPointerMove\""))
        {
            touch = new APT.Touch(event.originalEvent.pageX, event.originalEvent.pageY);
            arrayAux[0] = touch;
        }
        else 
        {
            for (var i = 0; i < event.originalEvent.targetTouches.length; i++)
            {
                touch = new APT.Touch(event.originalEvent.targetTouches[i].clientX, event.originalEvent.targetTouches[i].clientY);
                arrayAux[i] = touch;
            }
        }
        
        var touches = APT.Set.NewWithObjects(arrayAux);
        var e = new APT.Event();
        e._evnt = event;
        _viewControlerAux.touchesMoved_withEvent(touches, e);
        event.stopPropagation();
    });
    
    this._view.jQElement().on(upevent, function(event) {
        var arrayAux = new Array();
        var touch;
        
        if (eval("event.originalEvent.type == \"MSPointerUp\""))
        {
            touch = new APT.Touch(event.originalEvent.pageX, event.originalEvent.pageY);
            arrayAux[0] = touch;
        }
        else 
        {
            for (var i = 0; i < event.originalEvent.targetTouches.length; i++)
            {
                touch = new APT.Touch(event.originalEvent.targetTouches[i].clientX, event.originalEvent.targetTouches[i].clientY);
                arrayAux[i] = touch;
            }
        }
        
        var touches = APT.Set.NewWithObjects(arrayAux);
        var e = new APT.Event();
        e._evnt = event;
        _viewControlerAux.touchesEnded_withEvent(touches, e);
        event.stopPropagation();
    });
    
    this._view.jQElement().on(cancelevent, function(event) {
        var arrayAux = new Array();
        var touch;
        
        if (eval("event.originalEvent.type == \"MSPointerCancel\""))
        {
            touch = new APT.Touch(event.originalEvent.pageX, event.originalEvent.pageY);
            arrayAux[0] = touch;
        }
        else 
        {
            for (var i = 0; i < event.originalEvent.targetTouches.length; i++)
            {
                touch = new APT.Touch(event.originalEvent.targetTouches[i].clientX, event.originalEvent.targetTouches[i].clientY);
                arrayAux[i] = touch;
            }
        }
        
        var touches = APT.Set.NewWithObjects(arrayAux);
        var e = new APT.Event();
        e._evnt = event;
        _viewControlerAux.touchesCancelled_withEvent(touches, e);
        event.stopPropagation();
    });
};

// Cambia el view asociado al controller
// @param newView nueva view
APT.ViewController.prototype.setView = function(newView) {
    if (newView !== null && newView !== undefined)
    {
        this._view = newView;
        newView.setViewController(this);
        this.configureTouchEvents();
    }
};

// Crea la view y la asocia al controller
APT.ViewController.prototype.loadView = function() {
};

// Devuelve el NavigationItem asociado al ViewController cuando es aniadido a un NavigationController.
APT.ViewController.prototype.navigationItem = function() {
    if (this._navigationItem === null)
    {
        this._navigationItem = new APT.NavigationItem();
        this._navigationItem.setTitle(this.title());
    }
    
    return this._navigationItem;
};

// Cambia el titulo de los NavigationItem y TabBarItem asociados al ViewController.
APT.ViewController.prototype.setTitle = function(aTitle) {
    this._title = aTitle;
    if (this._navigationItem !== null)
    {
        this.navigationItem().setTitle(aTitle);
    }
    
    if (this._tabBarItem !== null)
    {
        this.tabBarItem().setTitle(aTitle);
    }
    
    if (this.isNavigationRoot())
    {
        this._navigationController.setTitle(aTitle);
    }
};

// Recupera el titulo del ViewController.
APT.ViewController.prototype.title = function() {
    return this._title;
};

// Asigna un NavigationController al ViewController. Este metodo no debe ser utilizado por el programador ya que es utilizado internamente por la clase NavigationController.
APT.ViewController.prototype.setNavigationController = function(aNavigationController) {
    this._navigationController = aNavigationController;
    if (aNavigationController === null || aNavigationController === undefined)
    {
        this.setTabBarController(null);
    }
    else 
    {
        if (aNavigationController.tabBarController() !== null && aNavigationController.tabBarController() !== undefined)
        {
            this.setTabBarController(aNavigationController.tabBarController());
        }
    }
};

// Devuelve el NavigationController asociado al ViewController o null si no esta asociado a ningun NavigationController.
// @return el NavigationController.
APT.ViewController.prototype.navigationController = function() {
    return this._navigationController;
};

// Devuelve el TabBarItem asociado al ViewController cuando es agregado a un TabBarController. Por defecto el objeto TabBarItem es creado la primera ves que se accede al metodo tabBarItem() y contiene el mismo titulo que el ViewController. Este metodo no debe utilizarse si el ViewController no esta asociado a un TabBarController.
APT.ViewController.prototype.tabBarItem = function() {
    if (this._tabBarItem === null)
    {
        this._tabBarItem = new APT.TabBarItem();
        this._tabBarItem.setTitle(this.title());
    }
    
    return this._tabBarItem;
};

// Asigna un TabBariTem al ViewController.
APT.ViewController.prototype.setTabBarItem = function(aTabBarItem) {
    this._tabBarItem = aTabBarItem;
};

// Devuelve el TabBarController asociado al ViewController cuando es agregado a un TabBarController, si el ViewController no esta asociado a un TabBarController, devuelve null.
// @return el TabBarController asociado.
APT.ViewController.prototype.tabBarController = function() {
    return this._tabBarController;
};

// Asigna un TabBarController al ViewController. Este metodo no debe ser utilizado por el programador ya que es utilizado internamente por la clase TabBarController.
// @param aTabBarController El TabBarController a asociar con el ViewController.
APT.ViewController.prototype.setTabBarController = function(aTabBarController) {
    this._tabBarController = aTabBarController;
};

// Inicializa el controller con el nombre del nib file especificado
// @param aNibName El nombre dek nib File
// @return viewController
APT.ViewController.prototype.initWithNibName = function(aNibName) {
    var className = aNibName + "Loader";
    var loader = APT.Global.createUserObject(className);
    loader.load(this);
    this.viewDidLoad();
    this.configureTouchEvents();
    return this;
};

APT.ViewController.prototype.didReceiveMemoryWarning = function() {
    // default implementation does nothing
};

APT.ViewController.prototype.viewDidLoad = function() {
    // default implementation does nothing
};

APT.ViewController.prototype.viewDidUnload = function() {
    // default implementation does nothing
};

APT.ViewController.prototype.viewWillAppear = function(animated) {
    // default implementation does nothing
};

APT.ViewController.prototype.viewDidAppear = function(animated) {
    // default implementation does nothing
};

APT.ViewController.prototype.viewWillDisappear = function(animated) {
    // default implementation does nothing
};

APT.ViewController.prototype.viewDidDisappear = function(animated) {
    // default implementation does nothing
};

// Evento que se dispara cuando se toca el objeto
// @param touches
// @param e
APT.ViewController.prototype.touchesBegan_withEvent = function(touches, e) {
};

// Evento que se dispara cuando se mueve un objeto a lo largo de la superficie
// @param touches
// @param e
APT.ViewController.prototype.touchesMoved_withEvent = function(touches, e) {
};

// Evento que se dispara cuando se deja de tocar el objeto
// @param touches
// @param e
APT.ViewController.prototype.touchesEnded_withEvent = function(touches, e) {
};

// Evento que se dispara cuando se interrumpe el touch event por algun evento externo
// @param touches
// @param e
APT.ViewController.prototype.touchesCancelled_withEvent = function(touches, e) {
};

// Permite darle el foco a un elemento en caso de rotornar true, falso en caso contrario
APT.ViewController.prototype.becomeFirstResponder = function() {
    return false;
};

// Permite sacar el foco a un elemento en caso de rotornar true, falso en caso contrario
APT.ViewController.prototype.resignFirstResponder = function() {
    return false;
};

APT.ViewController.prototype.toolbarItems = function() {
    return this._toolbarItems;
};

APT.ViewController.prototype.setToolbarItems = function(toolbarItems) {
    this._toolbarItems = toolbarItems;
};

APT.ViewController.prototype.hidesBottomBarWhenPushed = function() {
    return this._hidesBottomBarWhenPushed;
};

APT.ViewController.prototype.setHidesBottomBarWhenPushed = function(hidesBottomBarWhenPushed) {
    this._hidesBottomBarWhenPushed = hidesBottomBarWhenPushed;
};

APT.ViewController.prototype.isNavigationRoot = function() {
    var result = false;
    if (this._navigationController !== null && this._navigationController !== undefined)
    {
        var viewControllers = this._navigationController.viewControllers();
        if (viewControllers !== null && viewControllers.length > 0)
        {
            result = viewControllers[0] === this;
        }
    }
    
    return result;
};


