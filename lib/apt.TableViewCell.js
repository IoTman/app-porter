APT.createNamespace("APT");


APT.TableViewCell = function() {
    if(this.constructor !== APT.TableViewCell) return new APT.TableViewCell();
    APT.TableViewCell.$inherits();
    APT.TableViewCell.$init.apply(this);
    return this;
};

APT.TableViewCell.$inherits = function() {
    APT.inherits(APT.TableViewCell, APT.View);
};

APT.TableViewCell.$init = function() {
    // instance fields
    this._contentView = null;
    this._style = 0;
    this._imageView = null;
    this._textLabel = null;
    this._detailTextLabel = null;
    this._table = null;
    this._selected = false;
    // call base class constructor
    APT.View.$init.apply(this);
};

APT.TableViewCell.prototype.$copy = function() {
    var copyObject = new APT.TableViewCell();
    copyObject._contentView = this._contentView;
    copyObject._style = this._style;
    copyObject._imageView = this._imageView;
    copyObject._textLabel = this._textLabel;
    copyObject._detailTextLabel = this._detailTextLabel;
    copyObject._table = this._table;
    copyObject._selected = this._selected;
    return copyObject;
};

// Cambia el elemento HTML de JQuery
// Markup estandar de vista: <li data-icon='false'><a></a></li>
APT.TableViewCell.prototype.getRenderMarkup = function() {
    return $("<li data-icon='false'><a></a></li>");
};

APT.TableViewCell.prototype.setJQElement = function(aObject) {
    this._jqElement = aObject.trigger("create");
};

APT.TableViewCell.prototype.init = function() {
    return this.initWithStyle_reuseIdentifier(APT.TableViewCellStyle.Default);
};

// Set values and return the current instance of TableViewCell.
// @param aIdentifier: a string used to identify the TableViewCell instance for reuse. can be null.
// @param aTableViewCellStyle: a determinate style for build the TableViewCell. Default for default
// @return The current TableViewCell instance.
APT.TableViewCell.prototype.initWithStyle_reuseIdentifier = function(aTableViewCellStyle) {
    this._contentView = new APT.View();
    this._contentView.setBackgroundColor(APT.Color.Transparent);
    this.addSubview(this._contentView);
    
    this._textLabel = new APT.Label();
    this._textLabel.jQElement().css("padding-left", 10);
    
    switch(aTableViewCellStyle)
    {
        case APT.TableViewCellStyle.Default:
            this._imageView = new APT.ImageView();
            this._imageView.jQElement().css("max-width", "44px");
            this._imageView.jQElement().css("max-height", "44px");
            this._imageView.jQElement().css("padding-left", 5);
            
            this._textLabel.jQElement().css("padding-top", 12);
            this._textLabel.setFont(APT.Font.boldSystemFontOfSize(12));
            this._contentView.jQElement().css("display", "-webkit-inline-box");
            break;
        case APT.TableViewCellStyle.Value1:
            this._textLabel.jQElement().css("padding-top", 12);
            this._textLabel.setTextAlignment(APT.TextAlignment.Left);
            this._textLabel.setFont(APT.Font.boldSystemFontOfSize(12));
            
            this._detailTextLabel = new APT.Label();
            this._detailTextLabel.setTextAlignment(APT.TextAlignment.Right);
            this._detailTextLabel.jQElement().css("padding-top", 12);
            this._detailTextLabel.setTextColor(APT.Color.Blue);
            this._detailTextLabel.font().setSize(9);
            break;
        case APT.TableViewCellStyle.Value2:
            this._contentView.jQElement().css("display", "-webkit-inline-box");
            this._textLabel.jQElement().css("padding-top", 12);
            this._textLabel.setTextColor(APT.Color.Blue);
            this._textLabel.font().setSize(9);
            
            this._detailTextLabel = new APT.Label();
            this._detailTextLabel.jQElement().css("padding-top", 12);
            this._detailTextLabel.jQElement().css("padding-left", 10);
            this._detailTextLabel.setFont(APT.Font.boldSystemFontOfSize(12));
            break;
        case APT.TableViewCellStyle.Subtitle:
            this._imageView = new APT.ImageView();
            this._imageView.jQElement().css("max-width", "44px");
            this._imageView.jQElement().css("max-height", "44px");
            this._imageView.jQElement().css("padding-left", 5);
            this._imageView.jQElement().css("position", "absolute");
            
            this._textLabel.jQElement().css("padding-top", 5);
            this._textLabel.setFont(APT.Font.boldSystemFontOfSize(12));
            
            this._detailTextLabel = new APT.Label();
            this._detailTextLabel.jQElement().css("padding-left", 10);
            this._detailTextLabel.jQElement().css("padding-top", 5);
            this._detailTextLabel.font().setSize(9);
            break;
    }
    
    this._style = aTableViewCellStyle;
    return this;
};

// Get the text into the cell
// @return the string showed in the cell.
APT.TableViewCell.prototype.textLabel = function() {
    if (this._contentView !== null && this._contentView.indexOfView(this._textLabel) === -1)
    {
        this._contentView.addSubview(this._textLabel);
        if (this._contentView.indexOfView(this._detailTextLabel) > -1 && (this._style === APT.TableViewCellStyle.Value1 || this._style === APT.TableViewCellStyle.Value2))
        {
            this._contentView.exchangeSubviewAtIndexWithSubviewAtIndex(this._contentView.indexOfView(this._detailTextLabel), this._contentView.indexOfView(this._textLabel));
        }
    }
    
    return this._textLabel;
};

// Get the text into the cell
// @return the string showed in the cell.
APT.TableViewCell.prototype.detailTextLabel = function() {
    if (this._detailTextLabel)
    {
        if (this._contentView !== null && this._contentView.indexOfView(this._detailTextLabel) === -1)
        {
            this._contentView.addSubview(this._detailTextLabel);
        }
    }
    
    return this._detailTextLabel;
};

// Get the text into the cell
// @return the string showed in the cell.
APT.TableViewCell.prototype.imageView = function() {
    if (this._contentView !== null && this._contentView.indexOfView(this._imageView) === -1)
    {
        this._contentView.addSubview(this._imageView);
        if (this._contentView.indexOfView(this._textLabel) > -1)
        {
            this._contentView.exchangeSubviewAtIndexWithSubviewAtIndex(this._contentView.indexOfView(this._textLabel), this._contentView.indexOfView(this._imageView));
        }
        
        if (this._style === APT.TableViewCellStyle.Subtitle)
        {
            this._textLabel.jQElement().css("margin-left", 50);
            this._detailTextLabel.jQElement().css("margin-left", 50);
        }
    }
    
    return this._imageView;
};

// Get the text into the cell
// @return the string showed in the cell.
APT.TableViewCell.prototype.contentView = function() {
    return this._contentView;
};

// Set the text into the cell
// @param aText: the string to show in the cell.
APT.TableViewCell.prototype.setText = function(aText) {
    this.textLabel().setText(aText.valueOf());
};

// Get the text into the cell
// @return the string showed in the cell.
APT.TableViewCell.prototype.text = function() {
    if (this._textLabel !== null)
    {
        return this._textLabel.text();
    }
    
    return null;
};

// Get the accessoryType to the cell
// @return a int indicating the accessoryType.
APT.TableViewCell.prototype.accessoryType = function() {
    var result = 0;
    var tempStr = this.jQElement().attr("data-icon");
    switch(tempStr.valueOf())
    {
        case "false":
            result = APT.TableViewCellAccessoryType.None;
            break;
        case "arrow-r":
            result = APT.TableViewCellAccessoryType.DisclosureIndicator;
            break;
        case "check":
            result = APT.TableViewCellAccessoryType.Checkmark;
            break;
    }
    
    return result;
};

// Set the accessoryType to the cell
// @param aType - a int indicating the accessoryType.
APT.TableViewCell.prototype.setAccessoryType = function(aType) {
    switch(aType)
    {
        case APT.TableViewCellAccessoryType.None:
            this.jQElement().attr("data-icon", "false");
            break;
            
        case APT.TableViewCellAccessoryType.DisclosureIndicator:
            this.jQElement().attr("data-icon", "arrow-r");
            break;
            
        case APT.TableViewCellAccessoryType.Checkmark:
            this.jQElement().attr("data-icon", "check");
            break;
    }
};

// Set a tableView as container
// @param aTable - a tableView who contains this cell.
APT.TableViewCell.prototype.setTableView = function(aTable) {
    this._table = aTable;
    if (aTable !== null)
    {
        var obj = this._table;
        
        this._jqElement.on("vmousedown", function(event) {
            obj["selectChange"](event);
            event.stopPropagation();
        });
    }
    else 
    {
        var obj = this._table;
        this._jqElement.off("vmousedown");
    }
};

// Set as selected this Cell
// @param aValue - a bool indicating if the cell is selected or not.
APT.TableViewCell.prototype.setSelected = function(aValue) {
    this._selected = aValue;
    if (aValue)
    {
        this.jQElement().addClass("selectedCell");
    }
    else 
    {
        this.jQElement().removeClass("selectedCell");
    }
};

// Get the _selected property
// @return a bool idicating if the cell is selected.
APT.TableViewCell.prototype.isSelected = function() {
    return this._selected;
};


// TABLEVIEWCONTROLLER	                                 Administrate the table view providing a default implementation of DataSource Methods
