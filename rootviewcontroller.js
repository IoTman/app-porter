APT.createNamespace("application");


// RootViewController.h
// TemperatureConverter
// Created by apps on 10/21/08.
// Copyright AppsAmuck.com 2008. All rights reserved.
// RootViewController.m
// TemperatureConverter
// Created by apps on 10/21/08.
// Copyright AppsAmuck.com 2008. All rights reserved.
application.RootViewController = function() {
    if(this.constructor !== application.RootViewController) return new application.RootViewController();
    application.RootViewController.$inherits();
    application.RootViewController.$init.apply(this);
    return this;
};

application.RootViewController.$inherits = function() {
    APT.inherits(application.RootViewController, APT.ViewController);
};

application.RootViewController.$init = function() {
    // instance fields
    this._infoButton = null;
    this._mainViewController = null;
    this._flipsideViewController = null;
    this._flipsideNavigationBar = null;
    // call base class constructor
    APT.ViewController.$init.apply(this);
};

application.RootViewController.prototype.$copy = function() {
    var copyObject = new application.RootViewController();
    copyObject._infoButton = this._infoButton;
    copyObject._mainViewController = this._mainViewController;
    copyObject._flipsideViewController = this._flipsideViewController;
    copyObject._flipsideNavigationBar = this._flipsideNavigationBar;
    return copyObject;
};

// Set up the navigation bar
application.RootViewController.prototype.toggleView = function() {
    // This method is called when the info or Done button is pressed.
    // It flips the displayed view from the main view to the flipside view and vice-versa.
    if (this._flipsideViewController === null)
    {
        this.loadFlipsideViewController();
    }
    
    var mainView = this._mainViewController.view();
    var flipsideView = this._flipsideViewController.view();
    
    var animation = APT.Animation.beginAnimationsContext(null, null);
    animation.setAnimationDuration(1 * 1000);
    animation.setAnimationTransitionForViewCache(((mainView.superview()) ? (APT.AnimationTransition.FlipFromRight) : (APT.AnimationTransition.FlipFromLeft)), this.view());
    if (mainView.superview() !== null)
    {
        this._flipsideViewController.viewWillAppear(true);
        
        this._mainViewController.viewWillDisappear(true);
        
        animation.animateRemove(mainView);
        animation.animateRemove(this._infoButton);
        animation.animateAddSubview(this.view(), flipsideView);
        
        animation.animateAddSubview(flipsideView, this._flipsideNavigationBar);
        this._mainViewController.viewDidDisappear(true);
        this._flipsideViewController.viewDidAppear(true);
    }
    else 
    {
        this._mainViewController.viewWillAppear(true);
        
        this._flipsideViewController.viewWillDisappear(true);
        
        animation.animateRemove(flipsideView);
        animation.animateRemove(this._flipsideNavigationBar);
        animation.animateAddSubview(this.view(), mainView);
        
        animation.animateAddSubview(this._mainViewController.view(), this._infoButton);
        this._flipsideViewController.viewDidDisappear(true);
        this._mainViewController.viewDidAppear(true);
    }
    
    animation.commitAnimations();
};

application.RootViewController.prototype.viewDidLoad = function() {
    var viewController = new application.MainViewController().initWithNibName_bundle(new String("MainView"), null);
    this.setMainViewController(viewController);
    
    this.view().insertSubviewBelowSubview(this._mainViewController.view(), this._infoButton);
};

application.RootViewController.prototype.loadFlipsideViewController = function() {
    var viewController = new application.FlipsideViewController().initWithNibName(new String("FlipsideView"));
    this.setFlipsideViewController(viewController);
    
    var aNavigationBar = new APT.NavigationBar().initWithFrame(APT.Rect(APT.Point(0.000000e+000, 0.000000e+000), APT.Size(3.200000e+002, 4.400000e+001)));
    aNavigationBar.setBarStyle(APT.BarStyle.Black);
    this.setFlipsideNavigationBar(aNavigationBar);
    
    var buttonItem = new APT.BarButtonItem().initWithBarButtonSystemItem_target_action(APT.BarButtonSystemItem.Done, this, "toggleView");
    var navigationItem = new APT.NavigationItem().initWithTitle(new String("Temperature Converter"));
    
    navigationItem.setRightBarButtonItem(buttonItem);
    this._flipsideNavigationBar.pushNavigationItem_animated(navigationItem, false);
};

application.RootViewController.prototype.shouldAutorotateToInterfaceOrientation = function(interfaceOrientation) {
    // Return YES for supported orientations
    return interfaceOrientation === application.Object.UIInterfaceOrientationPortrait;
};

application.RootViewController.prototype.didReceiveMemoryWarning = function() {
    // Releases the view if it doesn't have a superview
    this.$super_didReceiveMemoryWarning();
};

// Release anything that's not essential, such as cached data
application.RootViewController.prototype.dealloc = function() {
};

application.RootViewController.prototype.infoButton = function() {
    return this._infoButton;
};

application.RootViewController.prototype.setInfoButton = function(newValue) {
    if (this._infoButton !== newValue)
    {
        this._infoButton = newValue;
    }
};

application.RootViewController.prototype.mainViewController = function() {
    return this._mainViewController;
};

application.RootViewController.prototype.setMainViewController = function(newValue) {
    if (this._mainViewController !== newValue)
    {
        this._mainViewController = newValue;
    }
};

application.RootViewController.prototype.flipsideNavigationBar = function() {
    return this._flipsideNavigationBar;
};

application.RootViewController.prototype.setFlipsideNavigationBar = function(newValue) {
    if (this._flipsideNavigationBar !== newValue)
    {
        this._flipsideNavigationBar = newValue;
    }
};

application.RootViewController.prototype.flipsideViewController = function() {
    return this._flipsideViewController;
};

application.RootViewController.prototype.setFlipsideViewController = function(newValue) {
    if (this._flipsideViewController !== newValue)
    {
        this._flipsideViewController = newValue;
    }
};


