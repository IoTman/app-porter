APT.createNamespace("application");


// FlipsideView.h
// TemperatureConverter
// Created by apps on 10/21/08.
// Copyright AppsAmuck.com 2008. All rights reserved.
// FlipsideView.m
// TemperatureConverter
// Created by apps on 10/21/08.
// Copyright AppsAmuck.com 2008. All rights reserved.
application.FlipsideView = function() {
    if(this.constructor !== application.FlipsideView) return new application.FlipsideView();
    application.FlipsideView.$inherits();
    application.FlipsideView.$init.apply(this);
    return this;
};

application.FlipsideView.$inherits = function() {
    APT.inherits(application.FlipsideView, APT.View);
};

application.FlipsideView.$init = function() {
    // call base class constructor
    APT.View.$init.apply(this);
};

application.FlipsideView.prototype.showMeTheWay = function() {
    APT.ApplicationBase.sharedApplication().openURL(APT.URL.URLWithString(new String("http://www.AppsAmuck.com/")));
};

application.FlipsideView.prototype.initWithFrame = function(frame) {
    frame = frame.$copy();
    if (this.$super_initWithFrame(frame))
    {
    }
    // Initialization code
    return this;
};

application.FlipsideView.prototype.drawRect = function(rect) {
    rect = rect.$copy();
};

// Drawing code
application.FlipsideView.prototype.dealloc = function() {
};


