APT.createNamespace("APT");


APT.TableViewDataSource = function() {
    if(this.constructor !== APT.TableViewDataSource) return new APT.TableViewDataSource();
    APT.TableViewDataSource.$inherits();
    APT.TableViewDataSource.$init.apply(this);
    return this;
};

APT.TableViewDataSource.$inherits = function() {
    APT.inherits(APT.TableViewDataSource, Object);
};

APT.TableViewDataSource.$init = function() {
    // call base class constructor
    Object.apply(this);
};

APT.TableViewDataSource.prototype.numberOfSectionsInTableView = function(aTableView) {
};

APT.TableViewDataSource.prototype.tableView_numberOfRowsInSection = function(aTableView, section) {
};

APT.TableViewDataSource.prototype.tableView_titleForHeaderInSection = function(aTableView, section) {
};

APT.TableViewDataSource.prototype.tableView_cellForRowAtIndexPath = function(aTableView, aIndexPath) {
};


APT.TableViewDelegate = function() {
    if(this.constructor !== APT.TableViewDelegate) return new APT.TableViewDelegate();
    APT.TableViewDelegate.$inherits();
    APT.TableViewDelegate.$init.apply(this);
    return this;
};

APT.TableViewDelegate.$inherits = function() {
    APT.inherits(APT.TableViewDelegate, Object);
};

APT.TableViewDelegate.$init = function() {
    // call base class constructor
    Object.apply(this);
};

APT.TableViewDelegate.prototype.tableView_didDeselectRowAtIndexPath = function(aTableView, aIndexPath) {
};

APT.TableViewDelegate.prototype.tableView_didSelectRowAtIndexPath = function(aTableView, aIndexPath) {
};

APT.TableViewDelegate.prototype.tableView_heightForRowAtIndexPath = function(aTableView, aIndexPath) {
};

APT.TableViewDelegate.prototype.tableView_heightForHeaderInSection = function(aTableView, aSection) {
};


APT.TableView = function() {
    if(this.constructor !== APT.TableView) return new APT.TableView();
    APT.TableView.$inherits();
    APT.TableView.$init.apply(this);
    return this;
};

APT.TableView.$inherits = function() {
    APT.inherits(APT.TableView, APT.ScrollView);
};

APT.TableView.$init = function() {
    // instance fields
    this._style = 0;
    this._delegate = null;
    this._dataSource = null;
    this._arraySections = null;
    this._arraySectionsTitles = null;
    this._rowHeight = 44;
    this._sectionHeaderHeight = 25;
    this._allowsSelection = true;
    this._tableHeaderView = null;
    // call base class constructor
    APT.ScrollView.$init.apply(this);
};

APT.TableView.prototype.$copy = function() {
    var copyObject = new APT.TableView();
    copyObject._style = this._style;
    copyObject._delegate = this._delegate;
    copyObject._dataSource = this._dataSource;
    copyObject._arraySections = this._arraySections;
    copyObject._arraySectionsTitles = this._arraySectionsTitles;
    copyObject._rowHeight = this._rowHeight;
    copyObject._sectionHeaderHeight = this._sectionHeaderHeight;
    copyObject._allowsSelection = this._allowsSelection;
    copyObject._tableHeaderView = this._tableHeaderView;
    return copyObject;
};

// Cambia el elemento HTML de JQuery
// Markup estandar de vista: <div><div><ul data-role='listview'></ul></div></div>
APT.TableView.prototype.getRenderMarkup = function() {
    return $("<div><div><ul data-role='listview'></ul></div></div>");
};

APT.TableView.prototype.setJQElement = function(aObject) {
    this.setJQElementWithStyle(aObject, APT.TableViewStyle.Plain);
};

APT.TableView.prototype.setJQElementWithStyle = function(aObject, aStyle) {
    this._jqElement = aObject.page();
    this._jqElement.css("display", "block");
    this._jqElement.css("min-height", "0px");
    this.setScrollEnabled(true);
    if (aStyle !== null)
    {
        this._style = aStyle;
    }
    
    this._jqContent = this._jqElement.children(1);
    if (aStyle === APT.TableViewStyle.Grouped)
    {
        this._jqContent.attr("data-inset", "true");
    }
    
    this._jqContent.find("ul").listview();
    this.cleanDataTable();
};

// Set values and return the current instance of TableView.
// @param aFrame: a Rect indicates the frame of the TableView
// @param aTableViewStyle: a determinate style for build the TableView. Plain for default
// @return The current TableView instance.
APT.TableView.prototype.initWithFrame_style = function(aFrame, aTableViewStyle) {
    aFrame = aFrame.$copy();
    this.setJQElementWithStyle(this.jQElement(), aTableViewStyle);
    this.$super_setFrame(aFrame);
    
    return this;
};

// Get the delegate Object.
// @return a js::APT::TableViewDelegate reference.
APT.TableView.prototype.delegate = function() {
    return this._delegate;
};

// Set the delegate Object.
// @param  aDelegate the delegate object. Must be a js::APT::TableViewDelegate reference.
APT.TableView.prototype.setDelegate = function(aDelegate) {
    this._delegate = aDelegate;
};

// Get the dataSource Object.
// @return the dataSource object.
APT.TableView.prototype.dataSource = function() {
    return this._dataSource;
};

// Set the dataSource Object.
// @param  aDataSource the dataSource object.
APT.TableView.prototype.setDataSource = function(aDataSource) {
    this._dataSource = aDataSource;
};

// Get the height of the row by default.
// @return the rowHeight value.
APT.TableView.prototype.rowHeight = function() {
    return this._rowHeight;
};

// Set the rowHeight value.
// The height of the row don't change until reloadData is called.
// @param  aHeight -  a float indicating height of the row.
APT.TableView.prototype.setRowHeight = function(aHeight) {
    this._rowHeight = aHeight;
};

// Get the height of the row section header by default.
// @return the sectionHeaderHeight value.
APT.TableView.prototype.sectionHeaderHeight = function() {
    return this._sectionHeaderHeight;
};

// Set the sectionHeaderHeight value.
// @param  aHeight -  a float indicating height of the row section header.
APT.TableView.prototype.setSectionHeaderHeight = function(aHeight) {
    this._sectionHeaderHeight = aHeight;
};

// indicate if the cells can be selected.
// @return the allowsSelection value.
APT.TableView.prototype.allowsSelection = function() {
    return this._allowsSelection;
};

// Set the sectionHeaderHeight value.
// @param  value -  a bool indicating if the cells can be selected.
APT.TableView.prototype.setAllowsSelection = function(value) {
    this._allowsSelection = value;
};

// contains the header of the table.
// @return the tableHeaderView object.
APT.TableView.prototype.tableHeaderView = function() {
    return this._tableHeaderView;
};

// Set the tableHeaderView object.
// @param  aView -  a js::APT::Viewef.
APT.TableView.prototype.setTableHeaderView = function(aView) {
    if (this._tableHeaderView !== null)
    {
        this.jQElement().find("ul").css("margin-top", "0px");
        this._tableHeaderView.removeFromSuperview();
    }
    
    if (aView !== null)
    {
        aView.jQElement().addClass("header-table-view");
        var margin = 54;
        if (aView.jQElement().css("height").length > 0 && aView.jQElement().css("height") !== "0px")
        {
            margin = parseInt(aView.jQElement().css("height"));
        }
        
        this.jQElement().find("ul").css("margin-top", margin);
        this.addSubview(aView);
    }
    
    this._tableHeaderView = aView;
};

// Clean all the data from the table
APT.TableView.prototype.cleanDataTable = function() {
    var tempArr = new Array();
    this._arraySections = [tempArr];
    this._arraySectionsTitles = [""];
    this.jQElement().find("ul").empty();
};

// Add a Section title into the table
APT.TableView.prototype.addTableViewSection = function(aSectionName, aSectionHeight) {
    var sectionName = $("<div><li data-role='list-divider'></li></div>").trigger("create").children(1);
    sectionName.text(aSectionName.valueOf());
    sectionName.css("height", aSectionHeight);
    this.jQElement().find("ul").append(sectionName);
    this.jQElement().find("ul").listview("refresh");
};

// Get the index into the DOM for the IndexPath given
// @param  aIndexPath - the given IndexPath
APT.TableView.prototype.getIndexInDOM = function(aIndexPath) {
    var result = 0;
    if (aIndexPath.section() > 0)
    {
        for (var i = 0; i < aIndexPath.section(); i++)
        {
            result = result + this.numberOfRowsInSection(i);
        }
    }
    
    if (this._style !== APT.TableViewStyle.Plain)
    {
        result = result + aIndexPath.section() + 1;
    }
    
    result = result + aIndexPath.row();
    return result;
};

// Add a Cell into the table
// @param aCell - the cell to insert
// @param aIndex - the IndexPath where the cell must be inserted
APT.TableView.prototype.addCell_ForIndex = function(aCell, aIndex) {
    if (aIndex.section() === this._arraySections.length)
    {
        this._arraySections[aIndex.section()] = new Array();
    }
    
    var arrayRows = this._arraySections[aIndex.section()];
    var tempLength = arrayRows.length;
    if (aIndex.row() <= tempLength)
    {
        arrayRows.splice(aIndex.row(), 0, aCell);
        var domIndex = this.getIndexInDOM(aIndex);
        if (aIndex.section() === this._arraySections.length - 1 && aIndex.row() === tempLength)
        {
            this.addSubview(aCell);
        }
        else 
        {
            var tempCell = this.jQElement().find("ul").children(1).eq(domIndex);
            aCell.jQElement().insertBefore(tempCell);
        }
        
        this._jqContent.find("ul").listview("refresh");
    }
    
    aCell.setTableView(this);
};

// get the number of sections of this table
// @return a int indicating the number of sections
APT.TableView.prototype.numberOfSections = function() {
    return this._arraySections.length;
};

// get the number of rows of a specific section
// @param  aSection indicate the index of a section
// @return a int indicating the number of rows in the section
APT.TableView.prototype.numberOfRowsInSection = function(aSection) {
    var result = 0;
    if (aSection < this._arraySections.length)
    {
        var tempArray = this._arraySections[aSection];
        result = tempArray.length;
    }
    
    return result;
};

// get the cell on a indexPath
// @param  aIndexPath indicate the indexPath of the cell
// @return a TableViewCell allocated in that IndexPath or null if dont exist
APT.TableView.prototype.cellForRowAtIndexPath = function(aIndexPath) {
    var result = null;
    if (aIndexPath.section() < this._arraySections.length)
    {
        var rowsArray = this._arraySections[aIndexPath.section()];
        if (aIndexPath.row() < rowsArray.length)
        {
            result = rowsArray[aIndexPath.row()];
        }
    }
    
    return result;
};

// Reload all the data from source.
APT.TableView.prototype.reloadData = function() {
    if (this.dataSource() !== null)
    {
        this.cleanDataTable();
        var aIndexPath;
        var cantSections = 1;
        if (this.dataSource()["numberOfSectionsInTableView"] instanceof Function)
        {
            cantSections = this.dataSource().numberOfSectionsInTableView(this);
        }
        
        var tempSectionHeight = this.sectionHeaderHeight();
        var tempRowHeight = this.rowHeight();
        for (var i = 0; i < cantSections; i++)
        {
            var cantRows = this.dataSource().tableView_numberOfRowsInSection(this, i);
            if (this.delegate() !== null && this.delegate()["tableView_heightForHeaderInSection"] instanceof Function)
            {
                tempSectionHeight = this.delegate().tableView_heightForHeaderInSection(this, i);
            }
            
            if (this.dataSource()["tableView_titleForHeaderInSection"] instanceof Function)
            {
                var sectionName = this.dataSource().tableView_titleForHeaderInSection(this, i);
                
                if (sectionName !== null)
                {
                    this.addTableViewSection(sectionName.valueOf(), tempSectionHeight);
                }
            }
            
            for (var j = 0; j < cantRows; j++)
            {
                aIndexPath = APT.IndexPath.indexPathForRow_inSection(j, i);
                if (this.delegate() !== null && this.delegate()["tableView_heightForRowAtIndexPath"] instanceof Function)
                {
                    tempRowHeight = this.delegate().tableView_heightForRowAtIndexPath(this, aIndexPath);
                }
                
                var aCell = this.dataSource().tableView_cellForRowAtIndexPath(this, aIndexPath);
                aCell.jQElement().css("height", tempRowHeight);
                if (tempRowHeight <= 44)
                {
                    aCell.jQElement().find("a").css("padding", 0);
                    aCell.jQElement().find(".apt_view").css("padding-top", 0);
                }
                
                this.addCell_ForIndex(aCell, aIndexPath);
            }
        }
    }
};

// Insert a row with the cell in the specific indexPath.
// @param aIndexPaths - an Array of IndexPaths where the cells will be inserted
// @anAnimation - a int indicating if which animation use (ignored)
APT.TableView.prototype.insertRowsAtIndexPaths_withRowAnimation = function(aIndexPaths, anAnimation) {
    var tempRowHeight = this.rowHeight();
    for (var i = 0; i < aIndexPaths.length; i++)
    {
        var aIndex = aIndexPaths[i];
        if (aIndex.section() < this._arraySections.length)
        {
            if (this.delegate() !== null && this.delegate()["tableView_heightForRowAtIndexPath"] instanceof Function)
            {
                tempRowHeight = this.delegate().tableView_heightForRowAtIndexPath(this, aIndex);
            }
            
            var aCell = this.dataSource().tableView_cellForRowAtIndexPath(this, aIndex);
            aCell.jQElement().css("height", tempRowHeight);
            if (tempRowHeight <= 44)
            {
                aCell.jQElement().find("a").css("padding", 0);
                aCell.jQElement().find(".apt_view").css("padding-top", 0);
            }
            
            this.addCell_ForIndex(aCell, aIndex);
        }
    }
};

// Delete rows with the cell all the data from source.
// @param aIndexPaths - an Array of IndexPaths where the cells will be removed
// @anAnimation - a int indicating if which animation use (ignored)
APT.TableView.prototype.deleteRowsAtIndexPaths_withRowAnimation = function(aIndexPaths, anAnimation) {
    for (var i = 0; i < aIndexPaths.length; i++)
    {
        var aIndex = aIndexPaths[i];
        if (aIndex.section() < this._arraySections.length)
        {
            var arrayRows = this._arraySections[aIndex.section()];
            if (aIndex.row() < arrayRows.length)
            {
                var aCell = arrayRows[aIndex.row()];
                aCell.setTableView(null);
                arrayRows.splice(aIndex.row(), 1);
                var domIndex = this.getIndexInDOM(aIndex);
                var tempCell = this.jQElement().find("ul").children(1).eq(domIndex);
                tempCell.remove();
                this.jQElement().find("ul").listview("refresh");
            }
        }
    }
};

// get the respective indexPath for the selected row.
// @return the indexPath of the selected row or null if no found a selected cell.
APT.TableView.prototype.indexPathForSelectedRow = function() {
    for (var i = 0; i < this._arraySections.length; i++)
    {
        var arrayRows = this._arraySections[i];
        for (var j = 0; j < arrayRows.length; j++)
        {
            var aCell = arrayRows[j];
            if (aCell.isSelected())
            {
                return APT.IndexPath.indexPathForRow_inSection(j, i);
            }
        }
    }
    
    return null;
};

// change the selected state of a cell.
// @param aIndex - the indexPath of the cell.
// @param animated - a bool indicating if should be animated (ignorated).
// @param selected - a bool to set in the cell's selected property.
APT.TableView.prototype.selectRowAtIndexPath_animated_select = function(aIndex, animated, selected) {
    if (aIndex.section() < this._arraySections.length)
    {
        var arrayRows = this._arraySections[aIndex.section()];
        if (aIndex.row() < arrayRows.length)
        {
            var aCell = arrayRows[aIndex.row()];
            aCell.setSelected(selected);
        }
    }
};

// Mark the target cell as selected and unmark the others cells.
// @param ev - event from browser.
APT.TableView.prototype.selectChange = function(ev) {
    if (ev !== null && this.allowsSelection())
    {
        var aCell = $(ev.currentTarget);
        for (var i = 0; i < this._arraySections.length; i++)
        {
            var rowArr = this._arraySections[i];
            for (var j = 0; j < rowArr.length; j++)
            {
                var aCelltemp = rowArr[j];
                if (aCelltemp !== null && aCelltemp.jQElement()[0] === aCell[0])
                {
                    aCelltemp.setSelected(true);
                    if (this.delegate() !== null && this.delegate()["tableView_didSelectRowAtIndexPath"] instanceof Function)
                    {
                        var aIndexPath = APT.IndexPath.indexPathForRow_inSection(j, i);
                        this.delegate().tableView_didSelectRowAtIndexPath(this, aIndexPath);
                    }
                }
                else 
                {
                    if (aCelltemp.isSelected())
                    {
                        if (this.delegate() !== null && this.delegate()["tableView_didDeselectRowAtIndexPath"] instanceof Function)
                        {
                            var aIndexPath = APT.IndexPath.indexPathForRow_inSection(j, i);
                            this.delegate().tableView_didDeselectRowAtIndexPath(this, aIndexPath);
                        }
                        
                        aCelltemp.setSelected(false);
                    }
                }
            }
        }
    }
};

// get the _style property
// @return a int indicating the style of the table.
APT.TableView.prototype.style = function() {
    this._style;
};

// override js.view method
APT.TableView.prototype.viewWillAppear = function(animated) {
    this.$super_viewWillAppear(animated);
    this.reloadData();
};

// Cambia la implementacion de Scroll para que no se pueda cambiar el contetentSize
// @param size
APT.TableView.prototype.setContentSize = function(size) {
    size = size.$copy();
    // do nothing
};

// Cambia la implementacion de Scroll para que no se pueda cambiar el contetentSize
// @return APT.Size(0, 0)
APT.TableView.prototype.contentSize = function() {
    return APT.Size(0, 0);
};

APT.TableView.prototype.dequeueReusableCellWithIdentifier = function() {
    return null;
};

APT.TableView.prototype.insertSubviewAtIndex = function(aView, anIndex) {
    var len = this.subviews().length;
    if (aView !== null && aView !== this && anIndex >= 0 && anIndex <= len)
    {
        // if  aView already has a superview, remove from it
        if (aView.superview() !== null)
        {
            aView.removeFromSuperview();
        }
        
        var notifyFlag = this.isInDom() && !aView.isInDom();
        
        if (notifyFlag)
        {
            aView.viewWillAppear(false);
        }
        // insert aView
        
        if (anIndex === len)
        {
            if (eval("aView.jQElement()[0] instanceof HTMLLIElement"))
            {
                this._jqContent.find("ul").append(aView.jQElement());
            }
            else 
            {
                this.jQElement().append(aView.jQElement());
            }
            
            this._subviews.push(aView);
        }
        else 
        {
            aView.jQElement().insertBefore((this.subviews()[anIndex]).jQElement());
            this._subviews.splice(anIndex, 0, aView);
        }
        
        if (notifyFlag)
        {
            aView.viewDidAppear(false);
        }
        // set this as current superview
        
        aView._superview = this;
        aView.setNeedsLayout();
    }
};


// TABLEVIEWCELL			  provide management of each cell
