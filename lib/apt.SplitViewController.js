APT.createNamespace("APT");


APT.SplitViewController = function() {
    if(this.constructor !== APT.SplitViewController) return new APT.SplitViewController();
    APT.SplitViewController.$inherits();
    APT.SplitViewController.$init.apply(this);
    return this;
};

APT.SplitViewController.$inherits = function() {
    APT.inherits(APT.SplitViewController, APT.ViewController);
};

APT.SplitViewController.$init = function() {
    // instance fields
    this._viewControllers = null;
    this._delegate = null;
    // call base class constructor
    APT.ViewController.$init.apply(this);
};

APT.SplitViewController.prototype.$copy = function() {
    var copyObject = new APT.SplitViewController();
    copyObject._viewControllers = this._viewControllers;
    copyObject._delegate = this._delegate;
    return copyObject;
};

// Class constructor.
// Retorna  el array de viewControllers del object
APT.SplitViewController.prototype.viewControllers = function() {
    return this._viewControllers;
};

// Cambia el array de viewControllers del objeto SplitViewController, el viewController en el indice 0 es mostrado
// en la izquierda de la pantalla, mientras que el indice 0 o mayor sobre la derecha
APT.SplitViewController.prototype.setViewControllers = function(aViewControllers) {
    var viewController;
    var aView;
    if (this._viewControllers === null)
    {
        this.setView(new APT.View());
        for (var i = 0; i < aViewControllers.length; i++)
        {
            viewController = aViewControllers[i];
            aView = viewController.view();
            if (i === 0)
            {
                aView.jQElement().css("width", "20%");
                aView.jQElement().css("float", "left");
            }
            else 
            {
                aView.jQElement().css("width", "80%");
                aView.jQElement().css("float", "right");
            }
            
            aView.jQElement().css("top", 0);
            aView.jQElement().css("height", "100%");
            aView.jQElement().css("position", "relative");
            this.view().addSubview(aView);
        }
    }
    else 
    {
        viewController = aViewControllers[1];
        aView = viewController.view();
        var aViewAux = this.view().subviews()[1];
        if (this.view().subviews()[1] !== aView)
        {
            aViewAux.removeFromSuperview();
            aView.jQElement().css("width", "80%");
            aView.jQElement().css("float", "right");
            aView.jQElement().css("top", 0);
            aView.jQElement().css("height", "100%");
            aView.jQElement().css("position", "relative");
            this.view().insertSubviewAtIndex(aView, 1);
        }
    }
    
    this._viewControllers = aViewControllers;
};

// Cambia el SplitViewController delegate object
APT.SplitViewController.prototype.setDelegate = function(aDelegate) {
    this._delegate = aDelegate;
};

// Retorna el SplitViewController delegate object
APT.SplitViewController.prototype.delegate = function() {
    return this._delegate;
};

APT.SplitViewController.prototype.presentsWithGesture = function() {
    return true;
};

APT.SplitViewController.prototype.presentsWithGesture = function(hidden) {
};


