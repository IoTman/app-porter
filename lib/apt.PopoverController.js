APT.createNamespace("APT");


APT.PopoverController = function() {
    if(this.constructor !== APT.PopoverController) return new APT.PopoverController();
    APT.PopoverController.$inherits();
    APT.PopoverController.$init.apply(this);
    return this;
};

APT.PopoverController.$inherits = function() {
    APT.inherits(APT.PopoverController, Object);
};

APT.PopoverController.$init = function() {
    // instance fields
    this._viewController = null;
    this._delegate = null;
    this._view = null;
    this._visible = false;
    // call base class constructor
    Object.apply(this);
    this._view = new APT.View();
    this._view.setBackgroundColor(APT.Color.Transparent);
    var popoverController = this;
    var eventHandler = function() {
        popoverController._visible = false;
        popoverController._view.jQElement().hide();
    };
    
    this._view.jQElement().on("click", eventHandler);
    
    this._view.jQElement().attr("data-role", "dialog");
};

APT.PopoverController.prototype.$copy = function() {
    var copyObject = new APT.PopoverController();
    copyObject._viewController = this._viewController;
    copyObject._delegate = this._delegate;
    copyObject._view = this._view;
    copyObject._visible = this._visible;
    return copyObject;
};

// Class constructor.
APT.PopoverController.prototype.initWithContentViewController = function(aViewController) {
    var popoverController = new APT.PopoverController();
    popoverController.setContentViewController(aViewController);
    return popoverController;
};

APT.PopoverController.prototype.setContentViewController = function(aViewController) {
    this.setContentViewControllerAnimated(aViewController, false);
};

APT.PopoverController.prototype.setContentViewControllerAnimated = function(aViewController, animated) {
    if (this._viewController !== aViewController)
    {
        if (this._viewController !== null)
        {
            if (this.popoverVisible())
            {
                var animation = APT.Animation.beginAnimationsContext(null, null);
                animation.animateAlpha(this._view, 0.5);
                animation.setAnimationDuration(400);
                animation.setAnimationDelegate(this);
                animation.setAnimationDidStopSelector("executeAnimation");
                animation.commitAnimations();
            }
            else 
            {
                var point = APT.Point.updateFromCSS((this._view.subviews()[0]).jQElement());
                var size = this.popoverContentSize();
                (this._view.subviews()[0]).removeFromSuperview();
                this._view.addSubview(aViewController.view());
                APT.Point.updateCSS((this._view.subviews()[0]).jQElement(), point);
                this.setPopoverContentSize(size);
            }
        }
        else 
        {
            this._view.addSubview(aViewController.view());
        }
        
        this._viewController = aViewController;
        this._view.setViewController(aViewController);
    }
};

APT.PopoverController.prototype.executeAnimation = function() {
    var point = APT.Point.updateFromCSS((this._view.subviews()[0]).jQElement());
    var size = this.popoverContentSize();
    (this._view.subviews()[0]).removeFromSuperview();
    this._view.addSubview(this._viewController.view());
    APT.Point.updateCSS((this._view.subviews()[0]).jQElement(), point);
    this.setPopoverContentSize(size);
    var animation = APT.Animation.beginAnimationsContext(null, null);
    animation.animateAlpha(this._view, 1);
    animation.setAnimationDuration(400);
    animation.commitAnimations();
};

APT.PopoverController.prototype.contentViewController = function() {
    return this._viewController;
};

APT.PopoverController.prototype.popoverContentSize = function() {
    return APT.Size.updateFromCSS((this._view.subviews()[0]).jQElement());
};

APT.PopoverController.prototype.setPopoverContentSize = function(aSize) {
    aSize = aSize.$copy();
    APT.Size.updateCSS((this._view.subviews()[0]).jQElement(), aSize);
};

APT.PopoverController.prototype.setPopoverContentSizeAnimated = function(aSize, animated) {
    aSize = aSize.$copy();
    if (animated)
    {
        var animation = APT.Animation.beginAnimationsContext(null, null);
        animation.setAnimatableProperty(this._view.subviews()[0], "width", aSize.width);
        animation.setAnimatableProperty(this._view.subviews()[0], "height", aSize.height);
        animation.setAnimationDuration(1000);
        animation.commitAnimations();
    }
    else 
    {
        APT.Size.updateCSS(this._view.jQElement(), aSize);
    }
};

APT.PopoverController.prototype.delegate = function() {
    return this._delegate;
};

APT.PopoverController.prototype.setDelegate = function(aDelegate) {
    this._delegate = aDelegate;
};

APT.PopoverController.prototype.dismissPopoverAnimated = function(animated) {
    this._visible = false;
    this._view.jQElement().hide();
};

APT.PopoverController.prototype.popoverVisible = function() {
    return this._visible;
};

APT.PopoverController.prototype.presentPopoverFromRectInViewPermittedArrowDirectionsAnimated = function(aRect, aView, direction, animated) {
    aRect = aRect.$copy();
    this._visible = true;
    var point = aRect.origin;
    point.y = point.y + aRect.size.height + 20;
    APT.Point.updateCSS((this._view.subviews()[0]).jQElement(), point);
    aView.jQElement().append(this._view.jQElement());
    this._view.jQElement().show();
    this._view.addSubview(this._viewController.view());
};


// DEVICE
// /La clase Device hereda de Object. Se utiliza para mantener las caracter?sticas del dispositivo donde corre la aplicaci?n como la orientaci?n.
