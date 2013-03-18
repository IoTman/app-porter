APT.createNamespace("APT");


APT.ActionSheetDelegate = function() {};

APT.ActionSheetDelegate.$inherits = function() {};

APT.ActionSheetDelegate.$init = function() {};

APT.ActionSheetDelegate.prototype.actionSheet_clickedButtonAtIndex = function(aActionSheet, buttonIndex) {};

APT.ActionSheet = function() {
    if(this.constructor !== APT.ActionSheet) return new APT.ActionSheet();
    APT.ActionSheet.$inherits();
    APT.ActionSheet.$init.apply(this);
    return this;
};

APT.ActionSheet.$inherits = function() {
    APT.inherits(APT.ActionSheet, APT.View);
};

APT.ActionSheet.$init = function() {
    // instance fields
    this._delegate = null;
    this._title = "";
    this._cancelButtonIndex = -1;
    this._destructiveButtonIndex = -1;
    this._firstOtherButtonIndex = -1;
    this._numberOfButtons = 0;
    this._buttons = new Array();
    // call base class constructor
    APT.View.$init.apply(this);
};

APT.ActionSheet.prototype.$copy = function() {
    var copyObject = new APT.ActionSheet();
    copyObject._delegate = this._delegate;
    copyObject._title = this._title;
    copyObject._cancelButtonIndex = this._cancelButtonIndex;
    copyObject._destructiveButtonIndex = this._destructiveButtonIndex;
    copyObject._firstOtherButtonIndex = this._firstOtherButtonIndex;
    copyObject._numberOfButtons = this._numberOfButtons;
    copyObject._buttons = this._buttons;
    return copyObject;
};

// Class constructor.
APT.ActionSheet.prototype.getRenderMarkup = function() {
    return $("<div><div data-role='dialog'></div></div>");
};

APT.ActionSheet.prototype.setJQElement = function(jqelement) {
    var screenObject = APT.Screen.CreateMainScreen();
    var view = new APT.View().initWithFrame(screenObject.applicationFrame());
    view.setBackgroundColor(APT.Color.New([1 / 2, 1 / 2, 1 / 2, 0.8]));
    var contentDiv = jqelement.trigger("create").children(1);
    contentDiv.append(this.getObjTitle(""));
    contentDiv.css("display", "inline-block");
    contentDiv.css("background", "black");
    contentDiv.css("min-height", "150px");
    contentDiv.css("width", "240px");
    contentDiv.css("text-align", APT.TextAlignment.toCSSTextAlign(APT.TextAlignment.Center));
    contentDiv.addClass("ui-dialog-contain ui-corner-all ui-overlay-shadow");
    contentDiv.addClass("ui-content-dialog");
    contentDiv.css("position", "fixed");
    contentDiv.css("top", "55%");
    contentDiv.css("left", "50%");
    contentDiv.css("margin-left", "-120px");
    contentDiv.css("margin-top", "-10px");
    view.jQElement().append(contentDiv);
    this._jqElement = view.jQElement();
    this.hide(null);
};

// Obtiene el JQObject del titulo del ActionSheet
// @Param aTitle string para seteal el titulo
// @return  el JQObject del titulo del ActionSheet
APT.ActionSheet.prototype.getObjTitle = function(aTitle) {
    var jqo;
    jqo = $("<div><h1 class='ui-actionSheet-title'>" + aTitle + "</h1></div>").trigger("create").children(1);
    return jqo;
};

// Obtiene el JQObject del Boton cancelar del ActionSheet
// @Param aCancelTitle  string a insertar como titulo del boton cancelar
// @return  el JQObject del boton cancelar del ActionSheet
APT.ActionSheet.prototype.getObjBtnCancel = function(aCancelTitle) {
    var btnCancel = APT.Button.buttonWithType(APT.ButtonType.RoundedRect);
    btnCancel.setTitle(aCancelTitle);
    btnCancel.jQElement().attr("id", "cancel");
    btnCancel.setBackgroundColor(APT.Color.DarkGray);
    btnCancel.addTarget_action_forControlEvents(this, "hide", APT.ControlEvent.vmousedown);
    
    return btnCancel.jQElement();
};

// Obtiene el JQObject del Boton destructivo del ActionSheet
// @Param aCancelTitle  String a insertar como titulo del boton destructivo
// @return  el JQObject del boton destructivo del ActionSheet
APT.ActionSheet.prototype.getObjBtnDestructive = function(aDestructiveTitle) {
    var btnDestructive = APT.Button.buttonWithType(APT.ButtonType.RoundedRect);
    btnDestructive.setTitle(aDestructiveTitle);
    btnDestructive.jQElement().attr("id", "destructive");
    btnDestructive.setBackgroundColor(APT.Color.Red);
    btnDestructive.addTarget_action_forControlEvents(this, "hide", APT.ControlEvent.vmousedown);
    
    return btnDestructive.jQElement();
};

// Obtiene el JQObject de un boton del ActionSheet
// @Param aOtherTitle  String a insertar como titulo del boton extra
// @return  el JQObject de un boton del ActionSheet
APT.ActionSheet.prototype.getObjBtnOthers = function(aOtherTitle) {
    var btnOther = APT.Button.buttonWithType(APT.ButtonType.RoundedRect);
    btnOther.setTitle(aOtherTitle);
    btnOther.jQElement().attr("id", "other");
    btnOther.addTarget_action_forControlEvents(this, "hide", APT.ControlEvent.vmousedown);
    
    return btnOther.jQElement();
};

// Inicializa un ActionSheet con su titulo, su delegado y sus botones.
// @param aTitle: string a insertar como titulo del actionSheet
// @param aDelegate: delegado del tipo actionSheetDelegate, puede ser nulo
// @param aCancelButtonTitle: string a insertar como titulo del boton cencelar
// @param aDestructiveButtonTitle: string a insertar como titulo del boton destructivo
// @param aOtherButton: string a insertar como titulo del boton extra
// @param endButton: string a insertar como titulo del boton endButton
// @return el objeto ActionSheet inicializado
APT.ActionSheet.prototype.initWithTitle_delegate_cancelButtonTitle_destructiveButtonTitle_otherButtonTitles = function(aTitle, aDelegate, aCancelButtonTitle, aDestructiveButtonTitle, aOtherButton, endButton) {
    var actionSheet = new APT.ActionSheet();
    
    this._delegate = aDelegate;
    
    if (aTitle !== null)
    {
        this._title = aTitle;
    }
    else 
    {
        this._title = "";
    }
    
    if (aDestructiveButtonTitle !== null)
    {
        this._buttons.push(new String("destructiveButtonIndex"));
    }
    
    if (aOtherButton !== null)
    {
        this._buttons.push(new String("firstOtherButtonIndex"));
    }
    
    if (aCancelButtonTitle !== null)
    {
        this._buttons.push(new String("cancelButtonIndex"));
    }
    
    for (var i = 0; i < this._buttons.length; i++)
    {
        switch((this._buttons[i]).valueOf())
        {
            
            case "destructiveButtonIndex":
                this._destructiveButtonIndex = i;
                var contentChild = this.jQElement().find(".ui-content-dialog");
                contentChild.append(this.getObjBtnDestructive(aDestructiveButtonTitle));
                break;
                
            case "firstOtherButtonIndex":
                this._firstOtherButtonIndex = i;
                var contentChild = this.jQElement().find(".ui-content-dialog");
                contentChild.append(this.getObjBtnOthers(aOtherButton));
                break;
                
            case "cancelButtonIndex":
                this._cancelButtonIndex = i;
                var contentChild = this.jQElement().find(".ui-content-dialog");
                contentChild.append(this.getObjBtnCancel(aCancelButtonTitle));
                break;
        }
    }
    
    return this;
};

// Metodo interno que responde al evento click en los botones del actionSheet.
// @param ev: object con el jqElement del boton seleccionado
APT.ActionSheet.prototype.hide = function(ev) {
    var index = -1;
    
    if (ev !== null)
    {
        var btnId = $(ev.currentTarget).attr("id");
        
        switch(btnId.valueOf())
        {
            
            case "destructive":
                index = this._destructiveButtonIndex;
                break;
            case "other":
                index = this._firstOtherButtonIndex;
                break;
            case "cancel":
                index = this._cancelButtonIndex;
                break;
        }
    }
    
    if (this.getDelegate() !== null && index !== -1)
    {
        this.getDelegate().actionSheet_clickedButtonAtIndex(this, index);
    }
    
    this.jQElement().hide();
};

// Propiedad para setear el titlulo del Actionsheet.
// @param aTitle: string con el titulo a insertar en el ActionSheet
APT.ActionSheet.prototype.setTitle = function(aTitle) {
    this._title = aTitle;
    var title = this.jQElement().find(".ui-actionSheet-title");
    title.html(aTitle.valueOf());
};

// devuelve el titulo del Actionsheet.
// @return: titulo del actionSheet
APT.ActionSheet.prototype.title = function() {
    return this._title;
};

// inserta el ActionSheet en un view
// @param view: view donde insertar el ActionSheet
APT.ActionSheet.prototype.showInView = function(view) {
    view.addSubview(this);
    this.jQElement().show();
};

// Devuelve el numero total de botones.
// @return: numero de botones
APT.ActionSheet.prototype.numberOfButtons = function() {
    return this._numberOfButtons;
};

// Propiedad de acceso al indice del boton cancelar
// @return: indice del boton cancelar
APT.ActionSheet.prototype.cancelButtonIndex = function() {
    return this._cancelButtonIndex;
};

// Propiedad de seteo del indice del boton cancelar.
// @param aIndex: indice del boton.
APT.ActionSheet.prototype.setCancelButtonIndex = function(aIndex) {
    this._cancelButtonIndex = aIndex;
};

// Propiedad de acceso al indice del boton destructivo
// @return: indice del boton destructivo
APT.ActionSheet.prototype.destructiveButtonIndex = function() {
    return this._destructiveButtonIndex;
};

// Propiedad de seteo del indice del boton destructivo.
// @param aIndex: indice del boton.
APT.ActionSheet.prototype.setDestructiveButtonIndex = function(aIndex) {
    this._destructiveButtonIndex = aIndex;
};

// Propiedad de acceso al indice del boton extra
// @return: indice del boton extra
APT.ActionSheet.prototype.firstOtherButtonIndex = function() {
    return this._firstOtherButtonIndex;
};

// Propiedad de seteo del indice del boton extra.
// @param aIndex: indice del boton.
APT.ActionSheet.prototype.setFirstOtherButtonIndex = function(aIndex) {
    this._firstOtherButtonIndex = aIndex;
};

// settea el objeto Delegate del ActionSheet
APT.ActionSheet.prototype.setDelegate = function(aDelegate) {
    this._delegate = aDelegate;
};

// devuelve el objeto Delegate del ActionSheet.
APT.ActionSheet.prototype.getDelegate = function() {
    return this._delegate;
};

APT.ActionSheet.prototype.actionSheet_clickedButtonAtIndex = function(aActionSheet, buttonIndex) {
};


// AlertView - is a popup
