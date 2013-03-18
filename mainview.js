APT.createNamespace("application");


// MainView.h
// TemperatureConverter
// Created by apps on 10/21/08.
// Copyright AppsAmuck.com 2008. All rights reserved.
// MainView.m
// TemperatureConverter
// Created by apps on 10/21/08.
// Copyright apps 2008. All rights reserved.
application.MainView = function() {
    if(this.constructor !== application.MainView) return new application.MainView();
    application.MainView.$inherits();
    application.MainView.$init.apply(this);
    return this;
};

application.MainView.$inherits = function() {
    APT.inherits(application.MainView, APT.View);
};

application.MainView.$init = function() {
    // instance fields
    this.celsius = null;
    this.fahrenheit = null;
    this.kelvin = null;
    // call base class constructor
    APT.View.$init.apply(this);
};

application.MainView.prototype.$copy = function() {
    var copyObject = new application.MainView();
    copyObject.celsius = this.celsius;
    copyObject.fahrenheit = this.fahrenheit;
    copyObject.kelvin = this.kelvin;
    return copyObject;
};

application.MainView.prototype.reset = function() {
    this.fahrenheit.setValue(new String("32"));
    this.celsius.setValue(new String("0"));
    this.kelvin.setValue(new String("-273.15"));
};

application.MainView.prototype.touchesBegan_withEvent = function(touches, event) {
    var touch = event.allTouches().anyObject();
    if (touch.tapCount() >= 1)
    {
        this.fahrenheit.resignFirstResponder();
        this.celsius.resignFirstResponder();
        this.kelvin.resignFirstResponder();
    }
};

application.MainView.prototype.resignResponder = function() {
    this.fahrenheit.resignFirstResponder();
    this.celsius.resignFirstResponder();
    this.kelvin.resignFirstResponder();
};

application.MainView.prototype.textFieldShouldReturn = function(textField) {
    if (textField === this.fahrenheit)
    {
        this.fahrenheit.resignFirstResponder();
        var c = 5.000000e+000 / 9.000000e+000 * (parseFloat(this.fahrenheit.value()) - 3.200000e+001);
        var k = c - 2.731500e+002;
        this.celsius.setValue(APT.Global.sprintf(new String("%2.1f"), c));
        this.kelvin.setValue(APT.Global.sprintf(new String("%2.1f"), k));
    }
    if (textField === this.celsius)
    {
        this.celsius.resignFirstResponder();
        var f = 9.000000e+000 / 5.000000e+000 * parseFloat(this.celsius.value()) + 3.200000e+001;
        var k = parseFloat(this.celsius.value()) - 2.731500e+002;
        this.fahrenheit.setValue(APT.Global.sprintf(new String("%2.1f"), f));
        this.kelvin.setValue(APT.Global.sprintf(new String("%2.1f"), k));
    }
    if (textField === this.kelvin)
    {
        this.kelvin.resignFirstResponder();
        var c = parseFloat(this.kelvin.value()) + 2.731500e+002;
        var f = 9.000000e+000 / 5.000000e+000 * c + 3.200000e+001;
        this.celsius.setValue(APT.Global.sprintf(new String("%2.1f"), c));
        this.fahrenheit.setValue(APT.Global.sprintf(new String("%2.1f"), f));
    }
    return true;
};

application.MainView.prototype.initWithFrame = function(frame) {
    frame = frame.$copy();
    if (this.$super_initWithFrame(frame))
    {
    }
    // Initialization code
    return this;
};

application.MainView.prototype.drawRect = function(rect) {
    rect = rect.$copy();
};

// Drawing code
application.MainView.prototype.dealloc = function() {
};

application.MainView.prototype.setKelvin = function(value) {
    this.kelvin = value;
};

application.MainView.prototype.setCelsius = function(value) {
    this.celsius = value;
};

application.MainView.prototype.setFahrenheit = function(value) {
    this.fahrenheit = value;
};


