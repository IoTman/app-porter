APT.createNamespace("application");


application.FlipsideViewLoader = function() {
    if(this.constructor !== application.FlipsideViewLoader) return new application.FlipsideViewLoader();
    application.FlipsideViewLoader.$inherits();
    application.FlipsideViewLoader.$init.apply(this);
    return this;
};

application.FlipsideViewLoader.$inherits = function() {
    APT.inherits(application.FlipsideViewLoader, APT.ViewLoader);
};

application.FlipsideViewLoader.$init = function() {
    // call base class constructor
    APT.ViewLoader.$init.apply(this);
};

application.FlipsideViewLoader.prototype.load = function(owner) {
    var FlipsideView_372490531 = owner;
    
    var FlipsideView_242216480 = new application.FlipsideView();
    APT.Global.loadView(FlipsideView_242216480, "FlipsideView_242216480.html");
    
    FlipsideView_372490531.setView(FlipsideView_242216480);
    
    var FlipsideView_568091496 = (FlipsideView_242216480).findViewById("FlipsideView_568091496");
    FlipsideView_568091496.addTarget_action_forControlEvents(FlipsideView_242216480, "showMeTheWay", APT.ControlEvent.vmouseup);
};


application.MainViewLoader = function() {
    if(this.constructor !== application.MainViewLoader) return new application.MainViewLoader();
    application.MainViewLoader.$inherits();
    application.MainViewLoader.$init.apply(this);
    return this;
};

application.MainViewLoader.$inherits = function() {
    APT.inherits(application.MainViewLoader, APT.ViewLoader);
};

application.MainViewLoader.$init = function() {
    // call base class constructor
    APT.ViewLoader.$init.apply(this);
};

application.MainViewLoader.prototype.load = function(owner) {
    var MainView_372490531 = owner;
    
    var MainView_169245649 = new application.MainView();
    APT.Global.loadView(MainView_169245649, "MainView_169245649.html");
    
    var MainView_588386899 = (MainView_169245649).findViewById("MainView_588386899");
    MainView_169245649.setKelvin(MainView_588386899);
    MainView_588386899.setDelegate(MainView_169245649);
    var MainView_274355449 = (MainView_169245649).findViewById("MainView_274355449");
    MainView_169245649.setCelsius(MainView_274355449);
    MainView_274355449.setDelegate(MainView_169245649);
    var MainView_1048325611 = (MainView_169245649).findViewById("MainView_1048325611");
    MainView_169245649.setFahrenheit(MainView_1048325611);
    MainView_1048325611.setDelegate(MainView_169245649);
    MainView_372490531.setView(MainView_169245649);
    var MainView_1000893985 = (MainView_169245649).findViewById("MainView_1000893985");
    MainView_1000893985.addTarget_action_forControlEvents(MainView_169245649, "reset", APT.ControlEvent.vmouseup);
};


application.MainWindowLoader = function() {
    if(this.constructor !== application.MainWindowLoader) return new application.MainWindowLoader();
    application.MainWindowLoader.$inherits();
    application.MainWindowLoader.$init.apply(this);
    return this;
};

application.MainWindowLoader.$inherits = function() {
    APT.inherits(application.MainWindowLoader, APT.ViewLoader);
};

application.MainWindowLoader.$init = function() {
    // call base class constructor
    APT.ViewLoader.$init.apply(this);
};

application.MainWindowLoader.prototype.load = function(owner) {
    var MainWindow_841351856 = owner;
    
    var MainWindow_664661524 = new application.TemperatureConverterAppDelegate();
    var MainWindow_636070164 = new application.RootViewController();
    
    var MainWindow_380026005 = new APT.Window();
    APT.Global.loadView(MainWindow_380026005, "MainWindow_380026005.html");
    var MainWindow_282269593 = new APT.View();
    APT.Global.loadView(MainWindow_282269593, "MainWindow_282269593.html");
    
    var MainWindow_328191559 = MainWindow_282269593.findViewById("MainWindow_328191559");
    MainWindow_636070164.setInfoButton(MainWindow_328191559);
    MainWindow_664661524.setRootViewController(MainWindow_636070164);
    MainWindow_664661524.setWindow(MainWindow_380026005);
    MainWindow_841351856.setDelegate(MainWindow_664661524);
    MainWindow_636070164.setView(MainWindow_282269593);
    (MainWindow_636070164).viewDidLoad();
    MainWindow_328191559.addTarget_action_forControlEvents(MainWindow_636070164, "toggleView", APT.ControlEvent.vmouseup);
    if ((MainWindow_664661524).window().subviews().length > 0)
    {
        (MainWindow_664661524).window().makeKeyAndVisible();
    }
};


application.Application = function(argc, argv, principalClassName, delegate) {
    if(this.constructor !== application.Application) return new application.Application(argc, argv, principalClassName, delegate);
    application.Application.$inherits();
    arguments.length > 0 ? application.Application.$init.apply(this, [argc, argv, principalClassName, delegate]) : application.Application.$init.apply(this);
    return this;
};

application.Application.$inherits = function() {
    APT.inherits(application.Application, APT.ApplicationBase);
};

application.Application.$init = function(argc, argv, principalClassName, delegate) {
    // call base class constructor
    APT.ApplicationBase.$init.apply(this);
    if (arguments.length > 0)
    {
    }
};

application.Application.prototype.initialize = function() {
    var loader = new application.MainWindowLoader();
    loader.load(this);
};

application.Application.prototype.getLoader = function(aLoaderName) {
    var viewLoader = null;
    if (aLoaderName === "FlipsideViewLoader")
    {
        viewLoader = new application.FlipsideViewLoader();
    }
    if (aLoaderName === "MainViewLoader")
    {
        viewLoader = new application.MainViewLoader();
    }
    if (aLoaderName === "MainWindowLoader")
    {
        viewLoader = new application.MainWindowLoader();
    }
    
    return viewLoader;
};


