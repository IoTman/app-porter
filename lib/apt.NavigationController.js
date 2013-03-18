APT.createNamespace("APT");


APT.NavigationControllerDelegate = function() {};

APT.NavigationControllerDelegate.$inherits = function() {};

APT.NavigationControllerDelegate.$init = function() {};

APT.NavigationControllerDelegate.prototype.navigationController_willShowViewController_animated = function(arg1, arg2, arg3) {};
APT.NavigationControllerDelegate.prototype.navigationController_didShowViewController_animated = function(arg1, arg2, arg3) {};

// NAVIGATION CONTROLLER
// Es una especializacion de la clase APT.ViewController que implementa la funcionalidad necesaria para manejar contenido organizado jerarquicamente.
// Al contrario que lo que sucede con la clase APT.ViewController, el programador rara ves necesita crear una subclase de APT.NavigationController ya que esta brinda toda la funcionalidad necesaria para administrar y mostrar el contenido.
APT.NavigationController = function() {
    if(this.constructor !== APT.NavigationController) return new APT.NavigationController();
    APT.NavigationController.$inherits();
    APT.NavigationController.$init.apply(this);
    return this;
};

APT.NavigationController.$inherits = function() {
    APT.inherits(APT.NavigationController, APT.ViewController);
};

APT.NavigationController.$init = function() {
    // instance fields
    this._stack = null;
    this._delegate = null;
    this._navigationBar = null;
    this._navigationBarHidden = false;
    this._topViewController = null;
    this._visibleViewController = null;
    this._rootViewController = null;
    this._poppingStarted = false;
    this._toolbar = null;
    this._toolbarHidden = false;
    this._lastHidesBottomBarWhenPushed = false;
    // call base class constructor
    APT.ViewController.$init.apply(this);
    this._navigationBar = new APT.NavigationBar();
    this._navigationBar.setDelegate(null);
    this._poppingStarted = false;
    this._stack = APT.Global.CreateStack(new Array());
    this._toolbar = new APT.ToolBar();
    this._toolbarHidden = true;
    this._navigationBarHidden = false;
    this._lastHidesBottomBarWhenPushed = true;
};

APT.NavigationController.prototype.$copy = function() {
    var copyObject = new APT.NavigationController();
    copyObject._stack = this._stack;
    copyObject._delegate = this._delegate;
    copyObject._navigationBar = this._navigationBar;
    copyObject._navigationBarHidden = this._navigationBarHidden;
    copyObject._topViewController = this._topViewController;
    copyObject._visibleViewController = this._visibleViewController;
    copyObject._rootViewController = this._rootViewController;
    copyObject._poppingStarted = this._poppingStarted;
    copyObject._toolbar = this._toolbar;
    copyObject._toolbarHidden = this._toolbarHidden;
    copyObject._lastHidesBottomBarWhenPushed = this._lastHidesBottomBarWhenPushed;
    return copyObject;
};

APT.NavigationController._navigationBarHeight = 44;

APT.NavigationController._toolbarHeight = 44;

// Class constructor.
// Initializes and returns a newly created navigation controller
// @param aViewController The view controller that resides at the bottom of the navigation stack
// @return                The initialized navigation controller object or null if there was a problem initializing the object
APT.NavigationController.prototype.initWithRootViewController = function(aViewController) {
    if (aViewController === null || aViewController === undefined)
    {
        return null;
    }
    else 
    {
        this.setViewControllers([aViewController]);
        return this;
    }
    
    return this;
};

// Pushes a view controller onto the receiver?s stack and updates the display.
// @param aViewController The view controller that is pushed onto the stack.
APT.NavigationController.prototype.pushViewController_animated = function(aViewController, animated) {
    if (aViewController === null || aViewController === undefined || aViewController.view() === null || aViewController.view() === undefined)
    {
        return;
    }
    else 
    {
        var currentViewController = this._stack.head();
        this._stack.push(aViewController);
        aViewController.setNavigationController(this);
        this._topViewController = aViewController;
        
        this._lastHidesBottomBarWhenPushed = this._topViewController.hidesBottomBarWhenPushed();
        
        this.pushNavigationItemOfController(aViewController, animated);
        
        if (this._delegate !== null)
        {
            this._delegate.navigationController_willShowViewController_animated(this, aViewController, animated);
        }
        
        if (currentViewController !== null && currentViewController !== undefined)
        {
            this.popToLeft(currentViewController, animated);
        }
        
        this.pushToLeft(aViewController, animated);
        
        if (this._delegate !== null)
        {
            this._delegate.navigationController_didShowViewController_animated(this, aViewController, animated);
        }
    }
};

// Pops the top view controller from the navigation stack and updates the display.
// @return The view controller that was popped from the stack
APT.NavigationController.prototype.popViewControllerAnimated = function(animated) {
    var viewController = null;
    if (this._stack.length > 1)
    {
        this._poppingStarted = true;
        this._navigationBar.popNavigationItemAnimated(animated);
        viewController = this.popController(animated);
        this.fixVisibleTitle();
    }
    
    return viewController;
};

// Pops all the view controllers on the stack except the root view controller and updates the display.
// @return An array of view controllers that are popped from the stack.
APT.NavigationController.prototype.popToRootViewControllerAnimated = function(animated) {
    return this.popToViewController_animated(this._rootViewController, animated);
};

// Pops view controllers until the specified view controller is at the top of the navigation stack.
// @param aViewController The view controller that you want to be at the top of the stack.
// @return                An array containing the view controllers that were popped from the stack.
APT.NavigationController.prototype.popToViewController_animated = function(aViewController, animated) {
    var viewControllers = new Array();
    if (aViewController === null)
    {
        return viewControllers;
    }
    
    var index = this._stack.indexOf(aViewController);
    
    if (this._stack.length > 1 && index >= 0)
    {
        viewControllers = this._stack.apt_removeObjects(index + 1, this._stack.length - 1);
        var currentViewController = this._topViewController;
        this._topViewController = this._stack.head();
        
        this._lastHidesBottomBarWhenPushed = this._topViewController.hidesBottomBarWhenPushed();
        
        this.popToRight(currentViewController, animated);
        
        if (this._delegate !== null)
        {
            this._delegate.navigationController_willShowViewController_animated(this, this._topViewController, animated);
        }
        
        this.pushToRight(this._topViewController, animated);
        
        this.setNavigationItems(animated);
        
        if (this._delegate !== null)
        {
            this._delegate.navigationController_didShowViewController_animated(this, this._topViewController, animated);
        }
    }
    
    for (var i = 0; i < viewControllers.length; i++)
    {
        var vc = viewControllers[i];
        vc.setNavigationController(null);
    }
    
    return viewControllers;
};

// Replaces the view controllers currently managed by the navigation controller with the specified items.
// @param viewControllers The view controllers to place in the stack. The front-to-back order of the controllers in this array represents the new bottom-to-top order of the controllers in the navigation stack.
APT.NavigationController.prototype.setViewControllers = function(viewControllers) {
    if (viewControllers !== null && viewControllers.length > 0)
    {
        this._stack = APT.Global.CreateStack(viewControllers);
        this._rootViewController = this._stack[0];
        this._topViewController = this._stack[this._stack.length - 1];
        for (var i = 0; i < this._stack.length; i++)
        {
            var vc = this._stack[i];
            vc.setNavigationController(this);
        }
        
        this._toolbar.setItems(this._topViewController.toolbarItems());
    }
    
    this.layoutSubviews(true);
};

// Sobreescribe el metodo loadView de la clase ViewController, crea el objeto view que contiene los ViewControllers asociados.
APT.NavigationController.prototype.loadView = function() {
    this.setView(new APT.View());
    this.view().jQElement().addClass("apt_navigationView");
    this.view().addSubview(this._navigationBar);
};

// Sobreescribe el metodo de ViewController para establecer los datos de la barra de navegacion
APT.NavigationController.prototype.viewWillAppear = function(animated) {
    this._topViewController = this._stack.head();
    if (this._topViewController !== null)
    {
        this.view().addSubview(this._topViewController.view());
        this.setNavigationItems(false);
    }
    
    this.layoutSubviews(false);
};

// Devuelve un arreglo con todos los ViewControllers que estan actualmente en la pila de navegacion
// @return la pila de navegacion
APT.NavigationController.prototype.viewControllers = function() {
    return this._stack.apt_copy();
};

// Asigna un delegado o null si el controlador no necesita un delegado.
// @param aDelegate un objeto que implemente la interfaz APT.NavigationControllerDelegate
APT.NavigationController.prototype.setDelegate = function(aDelegate) {
    this._delegate = aDelegate;
};

// Devuelve el objeto delegado
APT.NavigationController.prototype.delegate = function() {
    return this._delegate;
};

// Devuelve el ultimo controlador de vista agregado a la pila de navegacion.
APT.NavigationController.prototype.topViewController = function() {
    return this._topViewController;
};

// Asigna un TabBarController al NavigationController. Este metodo no debe ser utilizado por el programador ya que es utilizado internamente por la clase TabBarController.
// @param aTabBarController El TabBarController a asociar con el ViewController.
APT.NavigationController.prototype.setTabBarController = function(aTabBarController) {
    this.$super_setTabBarController(aTabBarController);
    for (var i = 0; i < this._stack.length; i++)
    {
        (this._stack[i]).setTabBarController(this.tabBarController());
    }
};

// Metodo auxiliar que es utilizado en el metodo pushViewController_animated para establecer los datos de la barra de navegacion.
// @param aViewController el nuevo controlador que se agrega a la pila
// @param animated true para animar el cambio en la barra de navegacion, false si no se desea animar el cambio.
APT.NavigationController.prototype.pushNavigationItemOfController = function(aViewController, animated) {
    var backButtonItem = new APT.BarButtonItem();
    backButtonItem.setTarget(this);
    backButtonItem.setTitle("Back");
    backButtonItem.setAction("popViewControllerAnimated");
    aViewController.navigationItem().setBackBarButtonItem(backButtonItem);
    this._navigationBar.pushNavigationItem_animated(aViewController.navigationItem(), animated);
    this.fixVisibleTitle();
};

// Metodo auxiliar que se utiliza al quitar uno o mas controladores de la pila de navegacion para establecer los datos de la barra de navegacion.
// @param animated true para animar el cambio en la barra de navegacion, false si no se desea animar el cambio.
APT.NavigationController.prototype.popController = function(animated) {
    var viewController = this._stack.pop();
    
    this._topViewController = this._stack.head();
    
    this._lastHidesBottomBarWhenPushed = this._topViewController.hidesBottomBarWhenPushed();
    
    this.popToRight(viewController, animated);
    
    if (this._delegate !== null)
    {
        this._delegate.navigationController_willShowViewController_animated(this, this._topViewController, animated);
    }
    
    this.pushToRight(this._topViewController, animated);
    
    if (this._delegate !== null)
    {
        this._delegate.navigationController_didShowViewController_animated(this, this._topViewController, animated);
    }
    
    return viewController;
};

// Devuelve un arreglo con todos los NavigationItems de los controladores agregados en la pila de navegacion. Se utiliza para agregar los NavigationItems a la NavigationBar.
APT.NavigationController.prototype.getNavigationItems = function() {
    var items = new Array();
    for (var i = 0; i < this._stack.length; i++)
    {
        var vc = this._stack[i];
        items.push(vc.navigationItem());
    }
    
    return items;
};

// Establece los NavigationItems de los controladores agregados en la pila de navegacion en la barra de navegacion.
// @param animated true si se desea animacion, false si no se desea animacion
APT.NavigationController.prototype.setNavigationItems = function(animated) {
    this._navigationBar.setItems_animated(this.getNavigationItems(), animated);
    this.fixVisibleTitle();
};

// Establese el titulo del ultimo controlador agregado a la pila como titulo de la barra de navegacion.
APT.NavigationController.prototype.fixVisibleTitle = function() {
    this._navigationBar.displayCenterItems();
};

// Devuelve el objeto NavigationBar que maneja el NavigationController.
APT.NavigationController.prototype.bar = function() {
    return this._navigationBar;
};

// Devuelve el primer objeto de la pila de navegacion.
APT.NavigationController.prototype.rootViewController = function() {
    return this._rootViewController;
};

APT.NavigationController.prototype.toolbar = function() {
    return this._toolbar;
};

APT.NavigationController.prototype.isToolbarHidden = function() {
    return this._toolbarHidden || this._lastHidesBottomBarWhenPushed;
};

APT.NavigationController.prototype.setToolbarHidden = function(toolbarHidden) {
    this.setToolbarHidden_animated(toolbarHidden, false);
};

APT.NavigationController.prototype.setToolbarHidden_animated = function(toolbarHidden, animated) {
    if (this._view !== null && this.view().isInDom() && this.isToolbarHidden() !== toolbarHidden)
    {
        var contentX = 0;
        var contentY = 0;
        var contentWidth = parseInt(this.view().frame().size.width);
        var contentHeight = parseInt(this.view().frame().size.height);
        
        var toolbarY = this.view().frame().size.height - APT.NavigationController._toolbarHeight;
        
        if (!this._navigationBarHidden)
        {
            contentY = APT.NavigationController._navigationBarHeight;
            contentHeight = contentHeight - APT.NavigationController._navigationBarHeight;
        }
        
        if (animated)
        {
            if (toolbarHidden)
            {
                this.removeToolbarAnimated(contentHeight, toolbarY);
            }
            else 
            {
                contentHeight = contentHeight - APT.NavigationController._toolbarHeight;
                this.addToolbarAnimated(contentHeight, toolbarY);
            }
        }
        else 
        {
            if (toolbarHidden)
            {
                this._navigationBar.removeFromSuperview();
            }
            else 
            {
                if (!this._toolbar.isInDom())
                {
                    this.view().addSubview(this._toolbar);
                }
                
                contentHeight = contentHeight - APT.NavigationController._toolbarHeight;
            }
            
            this._topViewController.view().setFrame(APT.Rect.New(contentX, contentY, contentWidth, contentHeight));
            this._toolbar.setFrame(APT.Rect.New(0, toolbarY, this.view().frame().size.width, APT.NavigationController._toolbarHeight));
        }
    }
    
    this._toolbarHidden = toolbarHidden;
    this._lastHidesBottomBarWhenPushed = toolbarHidden;
};

APT.NavigationController.prototype.isNavigationBarHidden = function() {
    return this._navigationBarHidden;
};

APT.NavigationController.prototype.setNavigationBarHidden = function(navigationBarHidden) {
    this.setNavigationBarHidden_animated(navigationBarHidden, false);
};

APT.NavigationController.prototype.setNavigationBarHidden_animated = function(navigationBarHidden, animated) {
    if (this._view !== null && this.view().isInDom() && this._navigationBarHidden !== navigationBarHidden)
    {
        var contentX = 0;
        var contentY = 0;
        var contentWidth = parseInt(this.view().frame().size.width);
        var contentHeight = parseInt(this.view().frame().size.height);
        
        var toolbarY = this.view().frame().size.height - APT.NavigationController._toolbarHeight;
        
        if (!this.isToolbarHidden())
        {
            contentHeight = contentHeight - APT.NavigationController._toolbarHeight;
        }
        
        if (animated)
        {
            if (navigationBarHidden)
            {
                this.removeNavigationBarAnimated(contentHeight, contentY);
            }
            else 
            {
                contentY = APT.NavigationController._navigationBarHeight;
                contentHeight = contentHeight - APT.NavigationController._navigationBarHeight;
                this.addNavigationBarAnimated(contentHeight, contentY);
            }
        }
        else 
        {
            if (navigationBarHidden)
            {
                this._navigationBar.removeFromSuperview();
            }
            else 
            {
                if (!this._navigationBar.isInDom())
                {
                    this.view().addSubview(this._navigationBar);
                }
                
                contentY = APT.NavigationController._navigationBarHeight;
                contentHeight = contentHeight - APT.NavigationController._navigationBarHeight;
            }
            
            this._topViewController.view().setFrame(APT.Rect.New(contentX, contentY, contentWidth, contentHeight));
            this._navigationBar.setFrame(APT.Rect.New(0, 0, this.view().frame().size.width, APT.NavigationController._navigationBarHeight));
        }
    }
    
    this._navigationBarHidden = navigationBarHidden;
};

APT.NavigationController.prototype.removeNavigationBarAnimated = function(contentHeight, contentY) {
    this._topViewController.view().jQElement().animate({"top" : Number(contentY).toString(), "height" : Number(contentHeight).toString() + "px"}, "fast");
    
    var thisNavigationBar = this._navigationBar;
    
    this._navigationBar.jQElement().animate({"top" : "-" + Number(APT.NavigationController._navigationBarHeight).toString() + "px"}, "fast", function() {
        thisNavigationBar.removeFromSuperview();
    });
};

APT.NavigationController.prototype.addNavigationBarAnimated = function(contentHeight, contentY) {
    this._navigationBar.setFrame(APT.Rect.New(0, -APT.NavigationController._navigationBarHeight, this.view().frame().size.width, APT.NavigationController._navigationBarHeight));
    this.view().addSubview(this._navigationBar);
    
    this._topViewController.view().jQElement().animate({"top" : Number(contentY).toString() + "px", "height" : Number(contentHeight).toString() + "px"}, "fast");
    
    this._navigationBar.jQElement().animate({"top" : Number(0).toString() + "px"}, "fast");
};

APT.NavigationController.prototype.removeToolbarAnimated = function(contentHeight, toolbarY) {
    this._topViewController.view().jQElement().animate({"height" : Number(contentHeight).toString() + "px"}, "fast");
    var thisToolbar = this._toolbar;
    
    this._toolbar.jQElement().animate({"top" : Number(toolbarY + APT.NavigationController._toolbarHeight).toString() + "px"}, "fast", function() {
        thisToolbar.removeFromSuperview();
    });
};

APT.NavigationController.prototype.addToolbarAnimated = function(contentHeight, toolbarY) {
    this._toolbar.setFrame(APT.Rect.New(0, toolbarY + APT.NavigationController._toolbarHeight, this.view().frame().size.width, APT.NavigationController._toolbarHeight));
    this.view().addSubview(this._toolbar);
    
    this._topViewController.view().jQElement().animate({"height" : Number(contentHeight).toString() + "px"}, "fast");
    
    this._toolbar.jQElement().animate({"top" : Number(toolbarY).toString() + "px"}, "fast");
};

// Metodo auxiliar que ajusta el tamanio de la barra de navegacion y del objeto View asociado al NavigationController.
// @param checkInDom Si recibe true indica que se debe checkear que la porpiedad view del navigationController se encuentre en el DOM antes de realizar alguna accion, si es falso el metodo siempre ejecuta sus cambios.
APT.NavigationController.prototype.layoutSubviews = function(checkViewInDom) {
    var navigationBarRect = APT.Rect.New(0, 0, this.view().frame().size.width, APT.NavigationController._navigationBarHeight);
    var toolbarRect = APT.Rect.New(0, this.view().frame().size.height - APT.NavigationController._toolbarHeight, this.view().frame().size.width, APT.NavigationController._toolbarHeight);
    this._navigationBar.setFrame(navigationBarRect);
    this._toolbar.setFrame(toolbarRect);
    this._topViewController = this._stack.head();
    
    if (!checkViewInDom || this.view().isInDom())
    {
        var contentY = 0;
        var contentX = 0;
        var contentWidth = parseInt(this.view().frame().size.width);
        var contentHeight = parseInt(this.view().frame().size.height);
        
        if (this._navigationBarHidden)
        {
            this._navigationBar.removeFromSuperview();
        }
        else 
        {
            if (!this._navigationBar.isInDom())
            {
                this.view().addSubview(this._navigationBar);
            }
            
            contentY = APT.NavigationController._navigationBarHeight;
            contentHeight = contentHeight - APT.NavigationController._navigationBarHeight;
        }
        
        this._toolbar.setItems(this._topViewController.toolbarItems());
        
        if (this.isToolbarHidden())
        {
            this._toolbar.removeFromSuperview();
        }
        else 
        {
            if (!this._toolbar.isInDom())
            {
                this.view().addSubview(this._toolbar);
            }
            
            contentHeight = contentHeight - APT.NavigationController._toolbarHeight;
        }
        
        this._topViewController.view().setFrame(APT.Rect.New(contentX, contentY, contentWidth, contentHeight));
    }
};

// Metodo auxiliar utilizado en el metodo pushViewController_animated para sacar de la ventana la vista del controlador anterior al ultimo de la pila.
// @param aViewController el controlador a retirar de la vista
// @param animated true si el cambio es animado, sino false
APT.NavigationController.prototype.popToLeft = function(aViewController, animated) {
    aViewController.view().viewWillDisappear(animated);
    if (animated)
    {
        
        aViewController.view().jQElement().animate({"left" : "-" + this.view().jQElement().css("width")}, "fast", function() {
            aViewController.view().removeFromSuperviewWithoutNotifying();
        });
        
        var thisToolbar = this._toolbar;
        if (this._toolbar.isInDom() === true && this.isToolbarHidden() === true)
        {
            var thisTopViewController = this._topViewController;
            
            this._toolbar.jQElement().animate({"left" : "-" + this.view().jQElement().css("width")}, "fast", function() {
                thisToolbar.setItems(thisTopViewController.toolbarItems());
                thisToolbar.removeFromSuperview();
            });
        }
        else 
        {
            thisToolbar.setItems(this._topViewController.toolbarItems());
        }
        
        aViewController.view().viewDidDisappear(animated);
    }
    else 
    {
        this._toolbar.setItems(this._topViewController.toolbarItems());
        aViewController.view().removeFromSuperviewWithoutNotifying();
        aViewController.view().viewDidDisappear(animated);
    }
};

// Metodo auxiliar utilizado en el metodo popViewControllerAnimated para sacar de la ventana la vista del ultimo controlador de la pila.
// @param aViewController el controlador a retirar de la vista
// @param animated true si el cambio es animado, sino false
APT.NavigationController.prototype.popToRight = function(aViewController, animated) {
    aViewController.view().viewWillDisappear(animated);
    if (animated)
    {
        
        aViewController.view().jQElement().animate({"left" : this.view().jQElement().css("width")}, "fast", function() {
            aViewController.view().removeFromSuperviewWithoutNotifying();
            aViewController.setNavigationController(null);
        });
        
        if (this._toolbar.isInDom() === false && this.isToolbarHidden() === false)
        {
            this._toolbar.jQElement().css("left", new Number(-this.view().frame().size.width).toString() + "px");
            this._toolbar.setItems(this._topViewController.toolbarItems());
            this.view().addSubview(this._toolbar);
            
            this._toolbar.jQElement().animate({"left" : "0px"}, "fast");
        }
        else 
        {
            this._toolbar.setItems(this._topViewController.toolbarItems());
        }
        
        aViewController.view().viewDidDisappear(animated);
    }
    else 
    {
        aViewController.view().removeFromSuperviewWithoutNotifying();
        this._toolbar.setItems(this._topViewController.toolbarItems());
        aViewController.view().viewDidDisappear(animated);
        aViewController.setNavigationController(null);
    }
};

// Metodo auxiliar utilizado en el metodo pushViewController_animated para sacar de la ventana la vista del controlador anterior al ultimo de la pila.
// @param aViewController el controlador para agregar en la vista
// @param animated true si el cambio es animado, sino false
APT.NavigationController.prototype.pushToLeft = function(aViewController, animated) {
    aViewController.view().viewWillAppear(animated);
    
    var contentY = 0;
    var contentX = 0;
    var contentWidth = parseInt(this.view().frame().size.width);
    var contentHeight = parseInt(this.view().frame().size.height);
    
    if (this._navigationBarHidden === false)
    {
        contentY = APT.NavigationController._navigationBarHeight;
        contentHeight = contentHeight - APT.NavigationController._navigationBarHeight;
    }
    
    if (this.isToolbarHidden() === false)
    {
        contentHeight = contentHeight - APT.NavigationController._toolbarHeight;
    }
    
    if (animated)
    {
        aViewController.view().setFrame(APT.Rect.New(contentWidth, contentY, contentWidth, contentHeight));
        aViewController.view().jQElement().show();
        this.view().addSubviewWithoutNotifying(aViewController.view());
        
        aViewController.view().jQElement().animate({"left" : new Number(contentX).toString() + "px"}, "fast", function() {
            aViewController.view().viewDidAppear(animated);
        });
    }
    else 
    {
        aViewController.view().setFrame(APT.Rect.New(contentX, contentY, contentWidth, contentHeight));
        aViewController.view().jQElement().show();
        this.view().addSubviewWithoutNotifying(aViewController.view());
        aViewController.view().viewDidAppear(animated);
    }
};

// Metodo auxiliar utilizado en el metodo popViewControllerAnimated para mostrar en la ventana la vista del controlador anterior al ultimo de la pila.
// @param aViewController el controlador para agregar en la vista
// @param animated true si el cambio es animado, sino false
APT.NavigationController.prototype.pushToRight = function(aViewController, animated) {
    aViewController.view().viewWillAppear(animated);
    
    aViewController.view().viewWillAppear(animated);
    
    var contentY = 0;
    var contentX = 0;
    var contentWidth = parseInt(this.view().frame().size.width);
    var contentHeight = parseInt(this.view().frame().size.height);
    
    if (this._navigationBarHidden === false)
    {
        contentY = APT.NavigationController._navigationBarHeight;
        contentHeight = contentHeight - APT.NavigationController._navigationBarHeight;
    }
    
    if (this.isToolbarHidden() === false)
    {
        contentHeight = contentHeight - APT.NavigationController._toolbarHeight;
    }
    
    if (animated)
    {
        aViewController.view().setFrame(APT.Rect.New(-contentWidth, contentY, contentWidth, contentHeight));
        aViewController.view().jQElement().show();
        this.view().addSubviewWithoutNotifying(aViewController.view());
        var thisToolbar = this._toolbar;
        
        aViewController.view().jQElement().animate({"left" : new Number(contentX).toString() + "px"}, "fast", function() {
            thisToolbar.setItems(aViewController.toolbarItems());
            aViewController.view().viewDidAppear(animated);
        });
    }
    else 
    {
        aViewController.view().setFrame(APT.Rect.New(contentX, contentY, contentWidth, contentHeight));
        aViewController.view().jQElement().show();
        aViewController.view().jQElement().css("left", "0px");
        this.view().addSubviewWithoutNotifying(aViewController.view());
        this._toolbar.setItems(this._topViewController.toolbarItems());
        aViewController.view().viewDidAppear(animated);
    }
};


// NAVIGATION ITEM
// La clase NavigationItem encapsula informacion de un ViewController agregado a un NavigationController.
