APT.createNamespace("APT");


APT.TextFieldDelegate = function() {};

APT.TextFieldDelegate.$inherits = function() {};

APT.TextFieldDelegate.$init = function() {};

APT.TextFieldDelegate.prototype.textFieldShouldReturn = function(aTextField) {};

APT.TextField = function() {
    if(this.constructor !== APT.TextField) return new APT.TextField();
    APT.TextField.$inherits();
    APT.TextField.$init.apply(this);
    return this;
};

APT.TextField.$inherits = function() {
    APT.inherits(APT.TextField, APT.Control);
};

APT.TextField.$init = function() {
    // instance fields
    this._textColor = null;
    this._font = null;
    this._delegate = null;
    // call base class constructor
    APT.Control.$init.apply(this);
};

APT.TextField.prototype.$copy = function() {
    var copyObject = new APT.TextField();
    copyObject._textColor = this._textColor;
    copyObject._font = this._font;
    copyObject._delegate = this._delegate;
    return copyObject;
};

// Class constructor.
APT.TextField.prototype.getRenderMarkup = function() {
    return $("<input type='text' value=''/>");
};

// Cambia el elemento HTML de JQuery
// Markup estandar de vista: <input type='text' value=''/>
APT.TextField.prototype.setJQElement = function(jqelement) {
    this._jqElement = jqelement.textinput();
    this.setFont(new APT.Font());
    this.setTextAlignment(APT.TextAlignment.Left);
    this.setTextColor(APT.Color.Black);
    this.setBorderStyle(APT.TextFieldBorderStyle.None);
    this.jQElement().css("padding-top", "5px");
    this.jQElement().css("padding-bottom", "5px");
    this.jQElement().css("padding-left", "5px");
    this.jQElement().css("padding-right", "5px");
};

// Recuperamos el valor del TextField
APT.TextField.prototype.value = function() {
    return this.jQElement().val();
};

// Cambiamos el valor del textField
APT.TextField.prototype.setValue = function(aText) {
    this.jQElement().val(aText);
};

// Devuelve la alineacion del texto.
// @return la alineacion del texto
APT.TextField.prototype.textAlignment = function() {
    return APT.TextAlignment.parseCSSTextAlign(this.jQElement().css("text-align"));
};

// Cambia la alineacion del texto
// @param anAlignment valor que nos permite alinear el texto dentro del textField
APT.TextField.prototype.setTextAlignment = function(anAlignment) {
    this.jQElement().css("text-align", APT.TextAlignment.toCSSTextAlign(anAlignment));
};

APT.TextField.prototype.keyboardType = function() {
    var keyboardType = this.jQElement().attr("type");
    switch(keyboardType.valueOf())
    {
        case "text":
            return APT.KeyboardType.Default;
            break;
        case "tel":
            return APT.KeyboardType.PhonePad;
            break;
        case "number":
            return APT.KeyboardType.NumberPad;
            break;
        case "url":
            return APT.KeyboardType.URL;
            break;
        case "email":
            return APT.KeyboardType.EmailAddress;
            break;
    }
};

APT.TextField.prototype.setKeyboardType = function(keyboardType) {
    var clone = this.jQElement().clone();
    
    switch(keyboardType)
    {
        case APT.KeyboardType.Default:
            clone.attr("type", "text");
            break;
        case APT.KeyboardType.PhonePad:
            clone.attr("type", "tel");
            break;
        case APT.KeyboardType.NumberPad:
            clone.attr("type", "number");
            break;
        case APT.KeyboardType.URL:
            clone.attr("type", "url");
            break;
        case APT.KeyboardType.EmailAddress:
            clone.attr("type", "email");
            break;
    }
    
    clone.insertBefore(this.jQElement());
    
    this.jQElement().remove();
    
    this._jqElement = clone.textinput();
};

// Devuelve el border style del componente
// @return la border style del componente
APT.TextField.prototype.borderStyle = function() {
    var box_shadow = this.jQElement().css("box-shadow");
    var border_radius = this.jQElement().css("border-radius").replace("px", "").replace("em", "");
    var border = this.jQElement().css("border");
    
    var borderStyle = border.split(" ");
    var borderAux;
    for (var i = 0; i < borderStyle.length; i++)
    {
        if ((borderStyle[i]).indexOf("px") >= 0 || (borderStyle[i]).indexOf("em") >= 0)
        {
            borderAux = (borderStyle[i]).replace("px", "").replace("em", "");
            break;
        }
    }
    
    if (parseFloat(border_radius) > 0)
    {
        return APT.TextFieldBorderStyle.RoundedRect;
    }
    else 
    {
        if (box_shadow !== "none")
        {
            return APT.TextFieldBorderStyle.Bezel;
        }
        else 
        {
            if (parseFloat(borderAux) > 0)
            {
                return APT.TextFieldBorderStyle.Line;
            }
            else 
            {
                return APT.TextFieldBorderStyle.None;
            }
        }
    }
};

// Cambia el style borde del componente
// @param anBorderStyle valor que nos permite cambiar el borde dentro del textField
APT.TextField.prototype.setBorderStyle = function(anBorderStyle) {
    switch(anBorderStyle)
    {
        case APT.TextFieldBorderStyle.None:
            this.jQElement().css("box-shadow", "none");
            this.jQElement().css("-webkit-box-shadow", "none");
            this.jQElement().css("webkit-border-radius", "0");
            this.jQElement().css("border-radius", "0");
            this.jQElement().css("border", "0");
            break;
        case APT.TextFieldBorderStyle.Line:
            this.jQElement().css("border", "1px solid black");
            this.jQElement().css("box-shadow", "none");
            this.jQElement().css("-webkit-box-shadow", "none");
            this.jQElement().css("webkit-border-radius", "0");
            this.jQElement().css("border-radius", "0");
            break;
        case APT.TextFieldBorderStyle.Bezel:
            this.jQElement().css("box-shadow", "inset 0 1px 4px rgba(0,0,0,.2)");
            this.jQElement().css("-webkit-box-shadow", "inset 0 1px 4px rgba(0,0,0,.2)");
            this.jQElement().css("webkit-border-radius", "0");
            this.jQElement().css("border-radius", "0");
            this.jQElement().css("border", "0");
            break;
        case APT.TextFieldBorderStyle.RoundedRect:
            this.jQElement().css("border", "0");
            this.jQElement().css("box-shadow", "none");
            this.jQElement().css("-webkit-box-shadow", "none");
            this.jQElement().css("webkit-border-radius", ".6em");
            this.jQElement().css("border-radius", ".6em");
            break;
    }
};

// Recuperamos el color de la fuente del textField
// @return  color de la fuente que tiene el textField
APT.TextField.prototype.textColor = function() {
    return this._textColor.updateFromCSS(this.jQElement().css("color"), this.jQElement().css("opacity"));
};

// Cambia el color de la fuente del textField
// @param aColor color que se desea que tenga el textField
APT.TextField.prototype.setTextColor = function(aColor) {
    this._textColor = aColor;
    this.jQElement().css("color", aColor.getHtmlValue().valueOf());
};

// Recuperamos el placeHolder del textField
// @return el placeHolder que tiene el textField
APT.TextField.prototype.placeHolder = function() {
    if (this.jQElement().attr("placeholder"))
    {
        return this.jQElement().attr("placeholder");
    }
    
    return null;
};

// Cambia el placeHolder del textField
// @param aPlaceHolder placeHolder que se desea que tenga el textField
APT.TextField.prototype.setPlaceHolder = function(aPlaceHolder) {
    this.jQElement().attr("placeholder", aPlaceHolder);
};

// Recuperamos la fuente del textField
// @return la fuente que tiene el textField
APT.TextField.prototype.font = function() {
    return this._font.updateFromCSS(this.jQElement());
};

// Cambia la fuente del textField
// @param aFont fuente que se desea que tenga el textField
APT.TextField.prototype.setFont = function(aFont) {
    this._font = aFont;
    this._font.updateCSS(this.jQElement());
};

// Cambia el textField delegate object
APT.TextField.prototype.setDelegate = function(aDelegate) {
    this._delegate = aDelegate;
    if (aDelegate !== null)
    {
        var textField = this;
        
        this.jQElement()[0].onkeydown = function(e) {
            var keyCode = e.keyCode;
            if (keyCode === 13)
            {
                textField.delegate().textFieldShouldReturn(textField);
            }
        };
    }
};

// Obtiene el textField delegate object
APT.TextField.prototype.delegate = function() {
    return this._delegate;
};

// Cambiamos el textField indicando si el textview es editable o no
// @param editable en caso de verdadero es editable, en caso contrario no
APT.TextField.prototype.setEditable = function(editable) {
    if (editable)
    {
        this.jQElement().removeAttr("readonly");
    }
    else 
    {
        this.jQElement().attr("readonly", "readonly");
    }
};

// Recuperamos el valor del textField si es editable o no
// @return verdadero en caso de ser editable, false el en el otro caso
APT.TextField.prototype.isEditable = function() {
    if (this.jQElement().attr("readonly"))
    {
        return false;
    }
    
    return true;
};

APT.TextField.prototype.becomeFirstResponder = function() {
    this.jQElement().focus();
    return true;
};

APT.TextField.prototype.resignFirstResponder = function() {
    if (this.jQElement().is(":focus"))
    {
        this.jQElement().blur();
        return true;
    }
    
    return false;
};

// Recupero las coordenadas y tamanio del view
APT.TextField.prototype.frame = function() {
    var point = APT.Point.updateFromCSS(this._jqElement);
    var size = APT.Size.updateFromCSS(this._jqElement);
    if (this.isInDom())
    {
        size.width = size.width + parseInt(this.jQElement().css("padding-left")) + parseInt(this.jQElement().css("padding-right")) + parseInt(this.jQElement().css("border-left-width")) + parseInt(this.jQElement().css("border-right-width"));
        size.height = size.height + parseInt(this.jQElement().css("padding-top")) + parseInt(this.jQElement().css("padding-bottom")) + parseInt(this.jQElement().css("border-top-width")) + parseInt(this.jQElement().css("border-bottom-width"));
    }
    
    return APT.Rect(point, size);
};


// end textField class
// end APT namespace
// end js namespace
// Text View (text area)
