APT.TextView = function() {
    if(this.constructor !== APT.TextView) return new APT.TextView();
    APT.TextView.$inherits();
    APT.TextView.$init.apply(this);
    return this;
};

APT.TextView.$inherits = function() {
    APT.inherits(APT.TextView, APT.ScrollView);
};

APT.TextView.$init = function() {
    // instance fields
    this._textColor = null;
    this._font = null;
    // call base class constructor
    APT.ScrollView.$init.apply(this);
};

APT.TextView.prototype.$copy = function() {
    var copyObject = new APT.TextView();
    copyObject._textColor = this._textColor;
    copyObject._font = this._font;
    return copyObject;
};

// Class constructor.
APT.TextView.prototype.getRenderMarkup = function() {
    return $("<textarea></textarea>");
};

// Cambia el elemento HTML de JQuery
// Markup estandar de vista: <textarea></textarea>
APT.TextView.prototype.setJQElement = function(jqelement) {
    this._jqElement = jqelement.textinput();
    this.setFont(new APT.Font());
    this.setTextAlignment(APT.TextAlignment.Left);
    this.setTextColor(APT.Color.Black);
    this.jQElement().css("padding-top", "5px");
    this.jQElement().css("padding-bottom", "5px");
    this.jQElement().css("padding-left", "5px");
    this.jQElement().css("padding-right", "5px");
    this.jQElement().css("border-top-width", "1px");
    this.jQElement().css("border-bottom-width", "1px");
    this.jQElement().css("border-left-width", "1px");
    this.jQElement().css("border-right-width", "1px");
    this.jQElement().css("resize", "none");
};

// Recuperamos el texto contenido dentro del textview
APT.TextView.prototype.text = function() {
    return this.jQElement().html();
};

// Cambiamos el texto dentro del textview
// @param aText texto que se desea que tenga el textview
APT.TextView.prototype.setText = function(aText) {
    if (aText !== undefined && aText !== null)
    {
        this.jQElement().html(aText.valueOf());
    }
};

// Recuperamos el valor del textView si es editable o no
// @return verdadero en caso de ser editable, false el en el otro caso
APT.TextView.prototype.isEditable = function() {
    if (this.jQElement().attr("readonly"))
    {
        return false;
    }
    
    return true;
};

// Cambiamos el textview indicando si el textview es editable o no
// @param editable en caso de verdadero es editable, en caso contrario no
APT.TextView.prototype.setEditable = function(editable) {
    if (editable)
    {
        this.jQElement().removeAttr("readonly");
    }
    else 
    {
        this.jQElement().attr("readonly", "readonly");
    }
};

// Devuelve la alineacion del texto.
// @return la alineacion del texto
APT.TextView.prototype.textAlignment = function() {
    return APT.TextAlignment.parseCSSTextAlign(this.jQElement().css("text-align"));
};

// Cambia la alineacion del texto
// @param anAlignment valor que nos permite alinear el texto dentro del textView
APT.TextView.prototype.setTextAlignment = function(anAlignment) {
    this.jQElement().css("text-align", APT.TextAlignment.toCSSTextAlign(anAlignment));
};

// Recuperamos el color de la fuente del textView
// @return  color de la fuente que tiene el textView
APT.TextView.prototype.textColor = function() {
    return this._textColor.updateFromCSS(this.jQElement().css("color"), this.jQElement().css("opacity"));
};

// Cambia el color de la fuente del textView
// @param aColor color que se desea que tenga el textView
APT.TextView.prototype.setTextColor = function(aColor) {
    this._textColor = aColor;
    this.jQElement().css("color", aColor.getHtmlValue().valueOf());
};

// Recuperamos la fuente del textview
// @return la fuente que tiene el textView
APT.TextView.prototype.font = function() {
    return this._font.updateFromCSS(this.jQElement());
};

// Cambia la fuente del textView
// @param aFont fuente que se desea que tenga el textView
APT.TextView.prototype.setFont = function(aFont) {
    this._font = aFont;
    this._font.updateCSS(this.jQElement());
};

// Indica si el TextView tiene texto
// @return  verdadero en caso de contener, false en caso de ser nulo y cuando el texto esta vacio
APT.TextView.prototype.hasText = function() {
    var text = this.jQElement().html();
    if (text !== null && text.length > 0)
    {
        return true;
    }
    
    return false;
};

APT.TextView.prototype.becomeFirstResponder = function() {
    this.jQElement().focus();
    return true;
};

APT.TextView.prototype.resignFirstResponder = function() {
    if (this.jQElement().is(":focus"))
    {
        this.jQElement().blur();
        return true;
    }
    
    return false;
};

// Sobreescribe el metodo de APT.Scroll. No realiza ninguna accion.
// @param size longuitudes del content
APT.TextView.prototype.setContentSize = function(size) {
    size = size.$copy();
    // do nothing
};

// Retorna el tamanio del content size. Obtiene las cordenadas de las propiedades overflow-X y overflow-Y del elemento HTML textarea.
// @return un APT.Size con el tamanio del texto
APT.TextView.prototype.contentSize = function() {
    return APT.Size(0, 0);
};

// Recupero las coordenadas y tamanio del view
APT.TextView.prototype.frame = function() {
    var point = APT.Point.updateFromCSS(this._jqElement);
    var size = APT.Size.updateFromCSS(this._jqElement);
    if (this.isInDom())
    {
        size.width = size.width + parseInt(this.jQElement().css("padding-left")) + parseInt(this.jQElement().css("padding-right")) + parseInt(this.jQElement().css("border-left-width")) + parseInt(this.jQElement().css("border-right-width"));
        size.height = size.height + parseInt(this.jQElement().css("padding-top")) + parseInt(this.jQElement().css("padding-bottom")) + parseInt(this.jQElement().css("border-top-width")) + parseInt(this.jQElement().css("border-bottom-width"));
    }
    
    return APT.Rect(point, size);
};


// end TextView class
// end APT namespace
// end js namespace
// Timer
