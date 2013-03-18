APT.createNamespace("APT");


APT.BarButtonItem = function() {
    if(this.constructor !== APT.BarButtonItem) return new APT.BarButtonItem();
    APT.BarButtonItem.$inherits();
    APT.BarButtonItem.$init.apply(this);
    return this;
};

APT.BarButtonItem.$inherits = function() {
    APT.inherits(APT.BarButtonItem, APT.BarItem);
};

APT.BarButtonItem.$init = function() {
    // instance fields
    this._defaultView = null;
    this._target = null;
    this._action = null;
    this._style = APT.BarButtonItemStyle.Plain;
    // call base class constructor
    APT.BarItem.$init.apply(this);
    this._defaultView = new APT.BarButtonDefault();
    this._defaultView.addTarget_action_forControlEvents(this, "triggerTargetAction", APT.ControlEvent.vmouseup);
};

APT.BarButtonItem.prototype.$copy = function() {
    var copyObject = new APT.BarButtonItem();
    copyObject._defaultView = this._defaultView;
    copyObject._target = this._target;
    copyObject._action = this._action;
    copyObject._style = this._style;
    return copyObject;
};

// Class constructor.
// Initializes a new item containing the specified system item.
// @param aTitle   The item?s title. If null a title is not displayed.
// @param aStyle   The style of the item. One of the constants defined
// @param aTarget  The object that receives the action message
// @param anAction The action to send to target when this item is selected.
// @return         A newly initialized item containing the specified system item.
APT.BarButtonItem.prototype.initWithTitle_target_action = function(aTitle, aTarget, anAction, aStyle) {
    this.setTitle(aTitle);
    this.setTarget(aTarget);
    this.setAction(anAction);
    this.setStyle(aStyle);
    return this;
};

// Initializes a new item containing the specified system item.
// @param aButtonSystemItem The system item to use as the first item on the bar.
// @param aTarget           The object that receives the action message
// @param anAction          The action to send to target when this item is selected.
// @return                  A newly initialized item containing the specified system item.
APT.BarButtonItem.prototype.initWithBarButtonSystemItem_target_action = function(aButtonSystemItem, aTarget, anAction) {
    this.setBarButtonSystemItem(aButtonSystemItem);
    this.setTarget(aTarget);
    this.setAction(anAction);
    return this;
};

// Gets a custom view representing the item
APT.BarButtonItem.prototype.defaultView = function() {
    return this._defaultView;
};

// Sets the title to display on the bar button.
APT.BarButtonItem.prototype.setTitle = function(aTitle) {
    this._defaultView.setText(aTitle);
};

// Gets the title to display on the bar button.
APT.BarButtonItem.prototype.title = function() {
    return this._defaultView.text();
};

// Establece un numero entero que usa la aplicacion para identificar el BarItem.
// @param tag el identificador
APT.BarButtonItem.prototype.setTag = function(tag) {
    this._defaultView.setTag(tag);
};

// Devuelve un numero entero que funciona como identificador del BarItem en la aplicacion. El valor por defecto es 0.
APT.BarButtonItem.prototype.tag = function() {
    return this._defaultView.tag();
};

// Sets the object that receives an action when the item is selected.
APT.BarButtonItem.prototype.setTarget = function(aTarget) {
    this._target = aTarget;
};

// Gets the object that receives an action when the item is selected.
APT.BarButtonItem.prototype.target = function() {
    return this._target;
};

// Sets the selector defining the action message to send to the target object when the user taps this bar button item.
APT.BarButtonItem.prototype.setAction = function(anAction) {
    this._action = anAction;
};

// Gets the selector defining the action message to send to the target object when the user taps this bar button item.
APT.BarButtonItem.prototype.action = function() {
    return this._action;
};

APT.BarButtonItem.prototype.setEnabled = function(enabled) {
    this._defaultView.setEnabled(enabled);
};

APT.BarButtonItem.prototype.isEnabled = function() {
    return this._defaultView.isEnabled();
};

// Sets the bar button item style.
APT.BarButtonItem.prototype.setStyle = function(aStyle) {
    this._style = aStyle;
    if (aStyle === APT.BarButtonItemStyle.Plain)
    {
        this.defaultView().setBackgroundColor(APT.Color.Transparent);
        
        this.defaultView().jQElement().css("border-top-color", "transparent");
        this.defaultView().jQElement().css("border-left-color", "transparent");
        this.defaultView().jQElement().css("border-right-color", "transparent");
        this.defaultView().jQElement().css("border-bottom-color", "transparent");
        this.defaultView().jQElement().css("color", "white");
    }
    else 
    {
        if (aStyle === APT.BarButtonItemStyle.Done)
        {
            this.defaultView().jQElement().buttonMarkup({"theme" : "b"});
        }
    }
};

// Gets the bar button item style.
APT.BarButtonItem.prototype.style = function() {
    return this._style;
};

// Helper methods
APT.BarButtonItem.prototype.setBarButtonSystemItem = function(aBarButtonSystemItem) {
    this._style = aBarButtonSystemItem;
    switch(aBarButtonSystemItem)
    {
        case APT.BarButtonSystemItem.Done:
            this.setTitle("Done");
            break;
        case APT.BarButtonSystemItem.Cancel:
            this.setTitle("Cancel");
            break;
        case APT.BarButtonSystemItem.Edit:
            this.setTitle("Edit");
            break;
        case APT.BarButtonSystemItem.Save:
            this.setTitle("Save");
            break;
        case APT.BarButtonSystemItem.Add:
            this.setTitle("Add");
            break;
        case APT.BarButtonSystemItem.FlexibleSpace:
            this.setTitle(new APT.View());
            break;
        case APT.BarButtonSystemItem.FixedSpace:
            this.setTitle(new APT.View());
            break;
        case APT.BarButtonSystemItem.Compose:
            this.setTitle("Compose");
            break;
        case APT.BarButtonSystemItem.Reply:
            this.setTitle("Reply");
            break;
        case APT.BarButtonSystemItem.Action:
            this.setTitle("Action");
            break;
        case APT.BarButtonSystemItem.Organize:
            this.setTitle("Organize");
            break;
        case APT.BarButtonSystemItem.Bookmarks:
            this.setTitle("Bookmarks");
            break;
        case APT.BarButtonSystemItem.Search:
            this.setTitle("Search");
            break;
        case APT.BarButtonSystemItem.Refresh:
            this.setTitle("Refresh");
            break;
        case APT.BarButtonSystemItem.Stop:
            this.setTitle("Stop");
            break;
        case APT.BarButtonSystemItem.Camera:
            this.setTitle("Camera");
            break;
        case APT.BarButtonSystemItem.Trash:
            this.setTitle("Trash");
            break;
        case APT.BarButtonSystemItem.Play:
            this.setTitle("Play");
            break;
        case APT.BarButtonSystemItem.Pause:
            this.setTitle("Pause");
            break;
        case APT.BarButtonSystemItem.Rewind:
            this.setTitle("Rewind");
            break;
        case APT.BarButtonSystemItem.FastForward:
            this.setTitle("FastForward");
            break;
        case APT.BarButtonSystemItem.Undo:
            this.setTitle("Undo");
            break;
        case APT.BarButtonSystemItem.Redo:
            this.setTitle("Redo");
            break;
        case APT.BarButtonSystemItem.PageCurl:
            this.setTitle("Next Page");
            break;
        default:
            this._style = 0;
            break;
    }
};

APT.BarButtonItem.prototype.triggerTargetAction = function(event) {
    if (this._target !== null && this._action !== null && this._action !== "")
    {
        (this._target[this._action.valueOf()])(event);
    }
};


// APT.BarItem en una super-clase abstracta de la que heredan los items agregados a una barra (APT.NavigationBar, APT.TabBar, etc).
// Los BarItems son componentes similares a un boton, se puede establecer un titulo o una imagen a mostrar, pueden disparar eventos a traves de un objeto "target" y un metodo "action" y ademas pueden deshabilitarse.
