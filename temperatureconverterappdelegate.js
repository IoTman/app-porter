APT.createNamespace("application");


// TemperatureConverterAppDelegate.h
// TemperatureConverter
// Created by apps on 10/21/08.
// Copyright AppsAmuck.com 2008. All rights reserved.
// TemperatureConverterAppDelegate.m
// TemperatureConverter
// Created by apps on 10/21/08.
// Copyright AppsAmuck.com 2008. All rights reserved.
application.TemperatureConverterAppDelegate = function() {
    if(this.constructor !== application.TemperatureConverterAppDelegate) return new application.TemperatureConverterAppDelegate();
    application.TemperatureConverterAppDelegate.$inherits();
    application.TemperatureConverterAppDelegate.$init.apply(this);
    return this;
};

application.TemperatureConverterAppDelegate.$inherits = function() {
    APT.inherits(application.TemperatureConverterAppDelegate, Object);
};

application.TemperatureConverterAppDelegate.$init = function() {
    // instance fields
    this._window = null;
    this._rootViewController = null;
    // call base class constructor
    Object.apply(this);
};

application.TemperatureConverterAppDelegate.prototype.$copy = function() {
    var copyObject = new application.TemperatureConverterAppDelegate();
    copyObject._window = this._window;
    copyObject._rootViewController = this._rootViewController;
    return copyObject;
};

application.TemperatureConverterAppDelegate.prototype.applicationDidFinishLaunching = function(_$application) {
    this._window.addSubview(this._rootViewController.view());
    this._window.makeKeyAndVisible();
};

application.TemperatureConverterAppDelegate.prototype.dealloc = function() {
};

application.TemperatureConverterAppDelegate.prototype.window = function() {
    return this._window;
};

application.TemperatureConverterAppDelegate.prototype.setWindow = function(newValue) {
    if (this._window !== newValue)
    {
        this._window = newValue;
    }
};

application.TemperatureConverterAppDelegate.prototype.rootViewController = function() {
    return this._rootViewController;
};

application.TemperatureConverterAppDelegate.prototype.setRootViewController = function(newValue) {
    if (this._rootViewController !== newValue)
    {
        this._rootViewController = newValue;
    }
};


