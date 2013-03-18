APT.createNamespace("APT");


APT.TableViewController = function() {
    if(this.constructor !== APT.TableViewController) return new APT.TableViewController();
    APT.TableViewController.$inherits();
    APT.TableViewController.$init.apply(this);
    return this;
};

APT.TableViewController.$inherits = function() {
    APT.inherits(APT.TableViewController, APT.ViewController);
};

APT.TableViewController.$init = function() {
    // instance fields
    this._tableView = null;
    // call base class constructor
    APT.ViewController.$init.apply(this);
};

APT.TableViewController.prototype.$copy = function() {
    var copyObject = new APT.TableViewController();
    copyObject._tableView = this._tableView;
    return copyObject;
};

// Class constructor.
// Gets The tableView that the controller manages
APT.TableViewController.prototype.tableView = function() {
    if (this._view === null)
    {
        this.view();
    }
    
    return this._tableView;
};

// Sets The tableView that the controller manages
APT.TableViewController.prototype.setTableView = function(newTableView) {
    this._tableView = newTableView;
    this._view = this._tableView;
    this._tableView.setViewController(this);
};

// init view controller with the style specified
// @param aStyle One of the UITableViewStyle possibles
APT.TableViewController.prototype.initWithStyle = function(aStyle) {
    var aFrame = APT.Rect.New(0, 0, 320, 480);
    (this.view()).initWithFrame_style(aFrame, aStyle);
    return this;
};

// DataSource's Methods
// get the number of sections of a specific tableView.
// @param aTableView - the specified tableView.
// @return a int indicating the number of sections.
APT.TableViewController.prototype.numberOfSectionsInTableView = function(aTableView) {
    return 1;
};

// get the number of rows of a specific section and tableView.
// @param  aTableView - the specified tableView.
// @param  section    - indicate the index of a section.
// @return a int indicating the number of rows in the section of the specified table.
APT.TableViewController.prototype.tableView_numberOfRowsInSection = function(aTableView, section) {
    return 0;
};

// returns the TableViewCell for the respective indexpath
// @param aTableView - the specified tableView.
// @param aIndexPath - the indexPath for the looked cell.
APT.TableViewController.prototype.tableView_cellForRowAtIndexPath = function(aTableView, aIndexPath) {
    return null;
};

// returns the TableViewCell for the respective indexpath
// @param section the number of section
APT.TableViewController.prototype.tableView_titleForHeaderInSection = function(aTableView, section) {
    return null;
};

// Delegate's Methods
// executed after a cell was selected.
// @param  aTableView - the specified tableView.
// @param  aIndexPath - the indexPath for the touched cell.
APT.TableViewController.prototype.tableView_didDeselectRowAtIndexPath = function(aTableView, aIndexPath) {
};

// executed after a cell was selected.
// @param  aTableView - the specified tableView.
// @param  aIndexPath - the indexPath for the touched cell.
APT.TableViewController.prototype.tableView_didSelectRowAtIndexPath = function(aTableView, aIndexPath) {
};

// executed when a cell was added into the table.
// @param  aTableView - the specified tableView.
// @param  aIndexPath - the indexPath for the cell to add.
APT.TableViewController.prototype.tableView_heightForRowAtIndexPath = function(aTableView, aIndexPath) {
    return aTableView.rowHeight();
};

// executed when a Header was added into the table.
// @param  aTableView - the specified tableView.
// @param  aSection - the section of the header.
APT.TableViewController.prototype.tableView_heightForHeaderInSection = function(aTableView, aSection) {
    return aTableView.sectionHeaderHeight();
};

APT.TableViewController.prototype.loadView = function() {
    this.setView(new APT.TableView());
    this._tableView.setDelegate(this);
    this._tableView.setDataSource(this);
};

APT.TableViewController.prototype.setView = function(aView) {
    this._view = aView;
    this._view.setViewController(this);
    if (this._view instanceof APT.TableView)
    {
        this._tableView = this._view;
    }
    else 
    {
        this._tableView = null;
    }
};


// TEXT FIELD
