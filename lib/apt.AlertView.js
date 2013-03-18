APT.createNamespace("APT");


APT.AlertViewDelegate = function() {};

APT.AlertViewDelegate.$inherits = function() {};

APT.AlertViewDelegate.$init = function() {};

APT.AlertViewDelegate.prototype.alertView_clickedButtonAtIndex = function(aAlertView, aIndex) {};

APT.AlertView = function() {
    if(this.constructor !== APT.AlertView) return new APT.AlertView();
    APT.AlertView.$inherits();
    APT.AlertView.$init.apply(this);
    return this;
};

APT.AlertView.$inherits = function() {
    APT.inherits(APT.AlertView, APT.View);
};

APT.AlertView.$init = function() {
    // instance fields
    this._delegate = null;
    this._arrayButtons = null;
    // call base class constructor
    APT.View.$init.apply(this);
    this._arrayButtons = new Array();
    this.setJQElement($("<div><div></div></div>").trigger("create").children(1));
    this.jQElement().css("background-color", "rgba(127, 127, 127, 0.5)");
    this.jQElement().css("width", "100%");
    this.jQElement().css("height", "100%");
    var contentDiv = $("<div><div data-role='dialog'></div></div>").trigger("create").children(1);
    contentDiv.append(this.getObjTitle(""));
    contentDiv.append(this.getObjMessage(""));
    contentDiv.css("margin", "50px 40px");
    contentDiv.css("display", "inline-block");
    contentDiv.css("background-color", "white");
    contentDiv.css("min-height", "150px");
    contentDiv.css("width", "240px");
    contentDiv.css("text-align", APT.TextAlignment.toCSSTextAlign(APT.TextAlignment.Center));
    contentDiv.addClass("ui-dialog-contain ui-corner-all ui-overlay-shadow");
    contentDiv.addClass("ui-content-dialog");
    this.jQElement().append(contentDiv);
    this.hide();
};

APT.AlertView.prototype.$copy = function() {
    var copyObject = new APT.AlertView();
    copyObject._delegate = this._delegate;
    copyObject._arrayButtons = this._arrayButtons;
    return copyObject;
};

// Class constructor.
// Obtiene el JQObject del titulo del AlertView
// @Param aTitle  a String to set in the title
// @return  el JQObject del titulo del AlertView
APT.AlertView.prototype.getObjTitle = function(aTitle) {
    var jqo;
    jqo = $("<div><h1 class='ui-alertview-title'>" + aTitle + "</h1></div>").trigger("create").children(1);
    return jqo;
};

// Obtiene el JQObject del message del AlertView
// @Param aMessage  a String to set in the message
// @return  el JQObject del message del AlertView
APT.AlertView.prototype.getObjMessage = function(aMessage) {
    var jqo;
    jqo = $("<div><p class='ui-alertview-message'>" + aMessage + "</p></div>").trigger("create").children(1);
    return jqo;
};

// Obtiene el JQObject del Boton cancelar del AlertView
// @Param aCancelTitle  a String to set like title of the cancel button
// @return  el JQObject del boton cancelar del AlertView
APT.AlertView.prototype.getObjBtnCancel = function(aCancelTitle) {
    var btnCancel = APT.Button.buttonWithType(APT.ButtonType.Custom);
    btnCancel.setTitle(aCancelTitle);
    btnCancel.jQElement().attr("id", "cancel");
    btnCancel.addTarget_action_forControlEvents(this, "hideWithEvent", APT.ControlEvent.vmousedown);
    this._arrayButtons.push(btnCancel.jQElement());
    return btnCancel.jQElement();
};

// Obtiene el JQObject de un boton del AlertView
// @Param aOtherTitle  a String to set like title of other button
// @return  el JQObject de un boton del AlertView
APT.AlertView.prototype.getObjBtnOthers = function(aOtherTitle) {
    var btnOther = APT.Button.buttonWithType(APT.ButtonType.Custom);
    btnOther.setTitle(aOtherTitle);
    btnOther.jQElement().attr("id", "other");
    btnOther.addTarget_action_forControlEvents(this, "hideWithEvent", APT.ControlEvent.vmousedown);
    this._arrayButtons.push(btnOther.jQElement());
    return btnOther.jQElement();
};

// Obtiene el indice de un boton segun su id
// @Param btnId  a String with the id
// @return  a int with the index or -1 if dont exist
APT.AlertView.prototype.getIndexForId = function(btnId) {
    var result = -1;
    for (var i = 0; i < this._arrayButtons.length; i++)
    {
        var tempObj = this._arrayButtons[i];
        var tempStr = tempObj.attr("id");
        if (tempStr.apt_isEqualsTo(btnId))
        {
            result = i;
        }
    }
    
    return result;
};

// crea y devuelve una nueva instancia del AlertView
// @return  the AlertView instance
APT.AlertView.prototype.initWithTitle_message_delegate_cancelButtonTitle_otherButtonTitles = function(aTitle, aMessage, aDelegate, cancelBtnTitle, otherBtnTitles) {
    if (aTitle !== null)
    {
        this.setTitle(aTitle);
    }
    
    if (aMessage !== null)
    {
        this.setMessage(aMessage);
    }
    
    if (cancelBtnTitle !== null)
    {
        var contentChild = this.jQElement().find(".ui-content-dialog");
        contentChild.append(this.getObjBtnCancel(cancelBtnTitle));
    }
    
    if (otherBtnTitles !== null)
    {
        var contentChild = this.jQElement().find(".ui-content-dialog");
        contentChild.append(this.getObjBtnOthers(otherBtnTitles));
    }
    
    return this;
};

// muestra la instancia del AlertView
APT.AlertView.prototype.show = function() {
    this.jQElement().show();
};

// ejecuta el metodo alertView_clickedButtonAtIndex del delegate
// con el indice del boton apretado.
APT.AlertView.prototype.hideWithEvent = function(ev) {
    var index = -1;
    if (ev !== null)
    {
        var btnId = $(ev.currentTarget).attr("id");
        index = this.getIndexForId(btnId);
    }
    
    if (this.getDelegate() !== null && index !== -1)
    {
        this.getDelegate().alertView_clickedButtonAtIndex(this, index);
    }
    
    this.hide();
};

// oculta la instancia del AlertView
APT.AlertView.prototype.hide = function() {
    this.jQElement().hide();
};

// devuelve si la instancia del AlertView es visible
APT.AlertView.prototype.isVisible = function() {
    return this.jQElement().css("display") !== "none";
};

// settea el titlulo del AlertView
APT.AlertView.prototype.setTitle = function(aTitle) {
    var titleChild = this.jQElement().find(".ui-alertview-title");
    titleChild.html(aTitle.valueOf());
};

// devuelve el titulo del AlertView.
APT.AlertView.prototype.title = function() {
    var titleChild = this.jQElement().find(".ui-alertview-title");
    return titleChild.html();
};

// settea el mensaje del AlertView
APT.AlertView.prototype.setMessage = function(message) {
    var msgChild = this.jQElement().find(".ui-alertview-message");
    msgChild.html(message.valueOf());
};

// devuelve el mensaje del AlertView.
APT.AlertView.prototype.message = function() {
    var msgChild = this.jQElement().find(".ui-alertview-message");
    return msgChild.html();
};

// settea el objeto Delegate del AlertView
APT.AlertView.prototype.setDelegate = function(aDelegate) {
    this._delegate = aDelegate;
};

// devuelve el objeto Delegate del AlertView.
APT.AlertView.prototype.getDelegate = function() {
    return this._delegate;
};


