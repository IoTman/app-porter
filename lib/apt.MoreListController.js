APT.createNamespace("APT");


APT.MoreListController = function() {
    if(this.constructor !== APT.MoreListController) return new APT.MoreListController();
    APT.MoreListController.$inherits();
    APT.MoreListController.$init.apply(this);
    return this;
};

APT.MoreListController.$inherits = function() {
    APT.inherits(APT.MoreListController, APT.TableViewController);
};

APT.MoreListController.$init = function() {
    // instance fields
    this._viewControllers = null;
    this._visibleViewControllers = new Array();
    this._numberOfViewControllersInTabBar = 4;
    // call base class constructor
    APT.TableViewController.$init.apply(this);
    this.setTitle("More");
};

APT.MoreListController.prototype.$copy = function() {
    var copyObject = new APT.MoreListController();
    copyObject._viewControllers = this._viewControllers;
    copyObject._visibleViewControllers = this._visibleViewControllers;
    copyObject._numberOfViewControllersInTabBar = this._numberOfViewControllersInTabBar;
    return copyObject;
};

// Class constructor.
APT.MoreListController.prototype.setViewControllers = function(viewControllers) {
    this._viewControllers = viewControllers;
    if (this.areVisibleViewControllers())
    {
        this._visibleViewControllers = this._viewControllers.slice(this._numberOfViewControllersInTabBar);
    }
};

APT.MoreListController.prototype.viewControllers = function() {
    return this._viewControllers;
};

APT.MoreListController.prototype.setNumberOfViewControllersInTabBar = function(numberOfViewControllersInTabBar) {
    this._numberOfViewControllersInTabBar = numberOfViewControllersInTabBar;
};

APT.MoreListController.prototype.numberOfViewControllersInTabBar = function() {
    return this._numberOfViewControllersInTabBar;
};

// Implementa el metodo del dataSource del TableView.
APT.MoreListController.prototype.numberOfSectionsInTableView = function(aTableView) {
    return 1;
};

// Implementa el metodo del dataSource del TableView.
APT.MoreListController.prototype.tableView_numberOfRowsInSection = function(aTableView, section) {
    return this._visibleViewControllers.length;
};

// Implementa el metodo del delegate del TableView.
APT.MoreListController.prototype.tableView_cellForRowAtIndexPath = function(aTableView, aIndexPath) {
    var cell = new APT.TableViewCell().initWithStyle_reuseIdentifier(APT.TableViewCellStyle.Default);
    var viewController = this._visibleViewControllers[aIndexPath.row()];
    cell.textLabel().setText(viewController.tabBarItem().title());
    cell.imageView().setImage(viewController.tabBarItem().image());
    cell.setAccessoryType(APT.TableViewCellAccessoryType.DisclosureIndicator);
    return cell;
};

// Implementa el metodo del delegate del TableView.
APT.MoreListController.prototype.tableView_didSelectRowAtIndexPath = function(aTableView, aIndexPath) {
    var viewController = this._visibleViewControllers[aIndexPath.row()];
    this.navigationController().pushViewController_animated(viewController, true);
};

// Metodo de utilidad que verifica aya al menos un ViewController para mostrar en la lista.
APT.MoreListController.prototype.areVisibleViewControllers = function() {
    return this._viewControllers !== null && this._viewControllers !== undefined && this._viewControllers.length - this._numberOfViewControllersInTabBar > 0;
};


// Es una especializacion de la clase APT.NavigationController que implementa la funcionalidad necesaria para manejar los ViewControllers de un TabBarController que no se muestran en la TabBar.
// Esta clase es utilizada internamente por APT.TabBarController y no debe ser manipulada por el programador directamente.
