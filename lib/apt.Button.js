APT.createNamespace("APT");


APT.Button = function() {
    if(this.constructor !== APT.Button) return new APT.Button();
    APT.Button.$inherits();
    APT.Button.$init.apply(this);
    return this;
};

APT.Button.$inherits = function() {
    APT.inherits(APT.Button, APT.Control);
};

APT.Button.$init = function() {
    // instance fields
    this._label = null;
    this._imageView = null;
    this._buttonType = 0;
    // call base class constructor
    APT.Control.$init.apply(this);
};

APT.Button.prototype.$copy = function() {
    var copyObject = new APT.Button();
    copyObject._label = this._label;
    copyObject._imageView = this._imageView;
    copyObject._buttonType = this._buttonType;
    return copyObject;
};

// Class constructor.
// Override del metodo getRenderMarkup del js::APT::View
APT.Button.prototype.getRenderMarkup = function() {
    return $("<a data-role='button' data-theme='c' ></a>");
};

// Cambia el elemento HTML de JQuery
// Markup estandar: <a data-role='button' data-theme='c' ></a>
APT.Button.prototype.setJQElement = function(aObject) {
    this.setJQElementAndType(aObject, -1);
};

// Genera el setJQElement insertando el tipo correspondiente si es necesario.
// @param   aObject - a JQObject to set into the jqElement.
// @param   aType   - a int indicating the type or -1 for no types.
APT.Button.prototype.setJQElementAndType = function(aObject, aType) {
    var text = aObject.text();
    this._buttonType = aType;
    this._jqElement = aObject;
    
    this._imageView = new APT.ImageView();
    
    this._label = new APT.Label();
    if (text.length > 0)
    {
        this._label.setText(text);
        this.jQElement().text("");
    }
    
    this.jQElement().append(this._label.jQElement());
    this._label.setBackgroundColor(APT.Color.Transparent);
    this._label.setTextAlignment(APT.TextAlignment.Center);
    
    switch(aType)
    {
        
        case APT.ButtonType.Info:
            this.jQElement().attr("data-icon", "info");
            this.jQElement().attr("data-iconpos", "right");
            break;
        case APT.ButtonType.Add:
            this.jQElement().attr("data-icon", "plus");
            this.jQElement().attr("data-iconpos", "right");
            break;
        case APT.ButtonType.Custom:
            break;
        case APT.ButtonType.RoundedRect:
            break;
        case APT.ButtonType.DetailDisclosure:
            break;
        default:
            break;
    }
    
    this.jQElement().button();
    this.standardizeMarginAndPaddingFormInnerSpan();
    this.jQElement().addClass("apt_button");
    
    if (aType !== APT.ButtonType.RoundedRect)
    {
        this.jQElement().buttonMarkup({"corners" : false});
        this.jQElement().buttonMarkup({"shadow" : false});
    }
    
    this.jQElement().find(".ui-btn-inner").css("border-top", "0px solid white");
};

// Cambia el tamanio y ubicacion del frame en la pagina
APT.Button.prototype.setFrame = function(aFrame) {
    aFrame = aFrame.$copy();
    this.$super_setFrame(aFrame);
    this.standardizeMarginAndPaddingFormInnerSpan();
    this.adjustImageSize();
    this.adjustLabelSize();
};

// crea y devuelve una nueva instancia del boton de un tipo especifico
// @return      el boton del tipo especificado
APT.Button.buttonWithType = function(buttonType) {
    var button = new APT.Button();
    button.setJQElementAndType(button.getRenderMarkup(), buttonType);
    return button;
};

// obtiene el tipo de boton
// @return  el tipo de boton
APT.Button.prototype.buttonType = function() {
    return this._buttonType;
};

// asigna el titulo del boton
// @param titleText  el texto a asignar
APT.Button.prototype.setTitle = function(titleText) {
    if (this._label !== null)
    {
        this._label.setText(titleText);
        this.adjustLabelSize();
    }
};

// obtiene el titulo del boton.
// @return  el texto del titulo.
APT.Button.prototype.title = function() {
    var result = null;
    if (this._label !== null)
    {
        result = this._label.text();
    }
    
    return result;
};

APT.Button.prototype.setImage = function(aImage) {
    if (this._imageView !== null)
    {
        if (this._imageView.image() === null)
        {
            this._imageView.setImage(aImage);
            this.jQElement().children(1).before(this._imageView.jQElement());
        }
        else 
        {
            this._imageView.setImage(aImage);
        }
        
        this.adjustImageSize();
    }
};

APT.Button.prototype.image = function() {
    var result = null;
    if (this._imageView !== null)
    {
        result = this._imageView.image();
    }
    
    return result;
};

APT.Button.prototype.imageView = function() {
    return this._imageView;
};

// obtiene el titulo del boton.
// @return  el texto del titulo del estado especificado
APT.Button.prototype.titleLabel = function() {
    return this._label;
};

// asigna el color del titulo del boton.
// @param titleText     el color a asignar
APT.Button.prototype.setTitleColor = function(titleColor) {
    if (this._label !== null)
    {
        this._label.setTextColor(titleColor);
    }
};

// obtiene el color del boton del estado especificado
// @return  el color del titulo del estado especificado
APT.Button.prototype.titleColor = function() {
    var result = null;
    if (this._label !== null)
    {
        result = this._label.textColor();
    }
    
    return result;
};

// obtiene la fuente del boton
// @return      la fuente del boton
APT.Button.prototype.font = function() {
    var result = null;
    if (this._label !== null)
    {
        result = this._label.font();
    }
    
    return result;
};

// setea la fuente del boton
// @param aFont    la fuente a setear
APT.Button.prototype.setFont = function(aFont) {
    if (this._label !== null)
    {
        this._label.setFont(aFont);
    }
};

// Get the Button text
// @return      the button text
APT.Button.prototype.text = function() {
    var result = null;
    if (this._label !== null)
    {
        result = this._label.text();
    }
    
    return result;
};

// Set the Button text
// @param aTitle a new text from button
APT.Button.prototype.setText = function(aTitle) {
    if (this._label !== null)
    {
        this._label.setText(aTitle);
    }
};

// Cambia el background color
APT.Button.prototype.setBackgroundColor = function(aColor) {
    this.$super_setBackgroundColor(aColor);
    this.jQElement().css("border-top", "0px");
    this.jQElement().css("border-left", "0px");
    this.jQElement().css("border-right", "0px");
    this.jQElement().css("border-bottom", "0px");
};

// Sobrescribe el metodo de APT.View
APT.Button.prototype.viewDidAppear = function(animated) {
    this.adjustLabelSize();
    this.adjustImageSize();
    this._label.viewDidAppear(animated);
    this._imageView.viewDidAppear(animated);
    this.$super_viewDidAppear(animated);
};

// Ajusta el tamanio de la imagen interna del boton segun el tamanio del boton.
APT.Button.prototype.adjustImageSize = function() {
    if (this.imageView() !== null)
    {
        var buttonHeightStr = this.jQElement().css("height");
        var buttonHeight = parseInt(buttonHeightStr);
        var imageHeight = 0;
        
        var buttonInnerSpanPaddingTop = parseInt(this.jQElement().find(".ui-btn-inner").css("padding-top"));
        var buttonInnerSpanPaddingBottom = parseInt(this.jQElement().find(".ui-btn-inner").css("padding-bottom"));
        
        var marginTopImage = 0;
        if (this.imageView().image() !== null)
        {
            marginTopImage = buttonInnerSpanPaddingTop;
            imageHeight = buttonHeight - (buttonInnerSpanPaddingTop + buttonInnerSpanPaddingBottom);
        }
        
        this.imageView().jQElement().css("margin-top", new String(marginTopImage) + "px");
        this._imageView.jQElement().css("height", imageHeight);
        this._imageView.jQElement().css("vertical-align", "top");
        this.jQElement().children(1).css("display", "inline-table");
    }
};

// Ajusta el tamanio del label interno del boton segun el tamanio del boton.
APT.Button.prototype.adjustLabelSize = function() {
    if (this._label !== null)
    {
        var buttonInnerSpanPaddingTop = parseInt(this.jQElement().find(".ui-btn-inner").css("padding-top"));
        var buttonInnerSpanPaddingBottom = parseInt(this.jQElement().find(".ui-btn-inner").css("padding-bottom"));
        var tempHeight = parseInt(this.jQElement().css("height"));
        var labelHeight = tempHeight - (buttonInnerSpanPaddingTop + buttonInnerSpanPaddingBottom);
        var labelHeightStr = Number(labelHeight).toString() + "px";
        this._label.jQElement().css("height", labelHeightStr);
        this._label.verticalAlignCenter();
    }
};

APT.Button.prototype.standardizeMarginAndPaddingFormInnerSpan = function() {
    var buttonInner = this.jQElement().children(".ui-btn-inner");
    buttonInner.css("margin-top", "0px");
    buttonInner.css("margin-bottom", "0px");
    buttonInner.css("padding-top", "9px");
    buttonInner.css("padding-bottom", "9px");
};


// CANVAS
