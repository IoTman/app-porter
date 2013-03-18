APT.createNamespace("application");


// MainViewController.h
// TemperatureConverter
// Created by apps on 10/21/08.
// Copyright AppsAmuck.com 2008. All rights reserved.
// MainViewController.m
// TemperatureConverter
// Created by apps on 10/21/08.
// Copyright AppsAmuck.com 2008. All rights reserved.
application.MainViewController = function() {
    if(this.constructor !== application.MainViewController) return new application.MainViewController();
    application.MainViewController.$inherits();
    application.MainViewController.$init.apply(this);
    return this;
};

application.MainViewController.$inherits = function() {
    APT.inherits(application.MainViewController, APT.ViewController);
};

application.MainViewController.$init = function() {
    // call base class constructor
    APT.ViewController.$init.apply(this);
};

application.MainViewController.prototype.initWithNibName_bundle = function(nibNameOrNil, nibBundleOrNil) {
    if (this.$super_initWithNibName(nibNameOrNil))
    {
    }
    // Custom initialization
    return this;
};

// If you need to do additional setup after loading the view, override viewDidLoad.
// - (void)viewDidLoad {
// }
application.MainViewController.prototype.shouldAutorotateToInterfaceOrientation = function(interfaceOrientation) {
    // Return YES for supported orientations
    return interfaceOrientation === application.Object.UIInterfaceOrientationPortrait;
};

application.MainViewController.prototype.didReceiveMemoryWarning = function() {
    // Releases the view if it doesn't have a superview
    this.$super_didReceiveMemoryWarning();
};

// Release anything that's not essential, such as cached data
application.MainViewController.prototype.dealloc = function() {
};


