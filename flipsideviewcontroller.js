APT.createNamespace("application");


// FlipsideViewController.h
// TemperatureConverter
// Created by apps on 10/21/08.
// Copyright AppsAmuck.com 2008. All rights reserved.
// FlipsideViewController.m
// TemperatureConverter
// Created by apps on 10/21/08.
// Copyright AppsAmuck.com 2008. All rights reserved.
application.FlipsideViewController = function() {
    if(this.constructor !== application.FlipsideViewController) return new application.FlipsideViewController();
    application.FlipsideViewController.$inherits();
    application.FlipsideViewController.$init.apply(this);
    return this;
};

application.FlipsideViewController.$inherits = function() {
    APT.inherits(application.FlipsideViewController, APT.ViewController);
};

application.FlipsideViewController.$init = function() {
    // call base class constructor
    APT.ViewController.$init.apply(this);
};

application.FlipsideViewController.prototype.viewDidLoad = function() {
    this.view().setBackgroundColor(APT.Color._viewFlipsideBackgroundColor());
};

application.FlipsideViewController.prototype.shouldAutorotateToInterfaceOrientation = function(interfaceOrientation) {
    // Return YES for supported orientations
    return interfaceOrientation === application.Object.UIInterfaceOrientationPortrait;
};

application.FlipsideViewController.prototype.didReceiveMemoryWarning = function() {
    // Releases the view if it doesn't have a superview
    this.$super_didReceiveMemoryWarning();
};

// Release anything that's not essential, such as cached data
application.FlipsideViewController.prototype.dealloc = function() {
};


