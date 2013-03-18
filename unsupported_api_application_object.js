APT.createNamespace("application");


application.Object = function() {
    if(this.constructor !== application.Object) return new application.Object();
    application.Object.$inherits();
    application.Object.$init.apply(this);
    return this;
};

application.Object.$inherits = function() {
};

application.Object.$init = function() {
    // instance fields
};

application.Object.UIInterfaceOrientationPortrait = function() {
    throw "Not implemented field: application.Object.UIInterfaceOrientationPortrait";
}();


