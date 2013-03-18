APT.createNamespace("APT");


APT.MoreNavigationController = function() {
    if(this.constructor !== APT.MoreNavigationController) return new APT.MoreNavigationController();
    APT.MoreNavigationController.$inherits();
    APT.MoreNavigationController.$init.apply(this);
    return this;
};

APT.MoreNavigationController.$inherits = function() {
    APT.inherits(APT.MoreNavigationController, APT.NavigationController);
};

APT.MoreNavigationController.$init = function() {
    // call base class constructor
    APT.NavigationController.$init.apply(this);
    this.setTabBarItem(new APT.TabBarItem().initWithTabBarSystemItem_tag(APT.TabBarSystemItem.More, 0));
};

// Class constructor.
// Pushes a view controller onto the receiver?s stack and updates the display.
// @param aViewController The view controller that is pushed onto the stack.
APT.MoreNavigationController.prototype.pushViewController_animated = function(aViewController, animated) {
    if (aViewController instanceof APT.NavigationController)
    {
        this.$super_pushViewController_animated((aViewController).topViewController(), animated);
    }
    else 
    {
        this.$super_pushViewController_animated(aViewController, animated);
    }
};


