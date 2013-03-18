APT.createNamespace("application");


application._global_1 = function() {
    if(this.constructor !== application._global_1) return new application._global_1();
    application._global_1.$inherits();
    application._global_1.$init.apply(this);
    return this;
};

application._global_1.$inherits = function() {
};

application._global_1.$init = function() {
};

// main.m
// TemperatureConverter
// Created by apps on 10/21/08.
// Copyright AppsAmuck.com 2008. All rights reserved.
application._global_1.main = function(argc, argv) {
    var pool = new Object();
    var retVal = APT.Global.ApplicationMain(argc, argv, null, null);
    
    return retVal;
};


