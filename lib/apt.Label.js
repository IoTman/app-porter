APT.createNamespace("APT");


APT.Label = function() {
    if(this.constructor !== APT.Label) return new APT.Label();
    APT.Label.$inherits();
    APT.Label.$init.apply(this);
    return this;
};

APT.Label.$inherits = function() {
    APT.inherits(APT.Label, APT.View);
};

APT.Label.$init = function() {
    // instance fields
    this._jqLabel = null;
    this._textColor = null;
    this._font = null;
    this._numberOfLines = 0;
    // call base class constructor
    APT.View.$init.apply(this);
};

APT.Label.prototype.$copy = function() {
    var copyObject = new APT.Label();
    copyObject._jqLabel = this._jqLabel;
    copyObject._textColor = this._textColor;
    copyObject._font = this._font;
    copyObject._numberOfLines = this._numberOfLines;
    return copyObject;
};

// Class constructor.
APT.Label.prototype.getRenderMarkup = function() {
    return $("<div class=\"apt_view apt_label_background\"><div class=\"apt_label\"></div></div>");
};

// Cambia el elemento HTML de Jquery
// Markup estandar: <div class=\"apt_view apt_label_background\"><div class=\"apt_label\"></div></div>
APT.Label.prototype.setJQElement = function(jqelement) {
    var text = jqelement.text();
    this._jqElement = jqelement.trigger("create");
    this._jqLabel = this._jqElement.children(1);
    
    this.setBackgroundColor(APT.Color.Transparent);
    this.setFont(new APT.Font());
    this.setTextAlignment(APT.TextAlignment.Left);
    this.setEnabled(true);
    if (text.length > 0)
    {
        this.setText(text);
    }
    else 
    {
        this.setText("");
    }
    
    //this.setTextColor(APT.Color.Black);
    this.setNumberOfLines(1);
    this.setLineBreakMode(this.lineBreakMode());
};

// Modifica el texto del label.
APT.Label.prototype.setText = function(aText) {
    if (aText !== null && aText !== undefined)
    {
        this._jqLabel.text(aText.valueOf());
    }
};

// Devuelve el texto del label.
APT.Label.prototype.text = function() {
    return new String(this._jqLabel.text());
};

// Devuelve la alineacion del texto.
// @return la alineacion del texto
APT.Label.prototype.textAlignment = function() {
    return APT.TextAlignment.parseCSSTextAlign(this._jqLabel.css("text-align"));
};

// Cambia la alineacion del texto
// @param anAlignment valor que nos permite alinear el texto dentro del label
APT.Label.prototype.setTextAlignment = function(anAlignment) {
    this._jqLabel.css("text-align", APT.TextAlignment.toCSSTextAlign(anAlignment));
};

// Sets the enabled state to use when drawing the label?s text.
APT.Label.prototype.setEnabled = function(enabled) {
    if (enabled)
    {
        this.jQElement().fadeTo(0.0, 1.0);
    }
    else 
    {
        if (this.isEnabled())
        {
            this.jQElement().fadeTo(0.0, 0.5);
        }
    }
};

// Gets the enabled state to use when drawing the label?s text.
APT.Label.prototype.isEnabled = function() {
    return parseFloat(this.jQElement().css("opacity")) > 0.5;
};

// Modifica el color del texto.
APT.Label.prototype.setTextColor = function(aColor) {
    this._textColor = aColor;
    this._jqLabel.css("color", aColor.getHtmlValue().valueOf());
};

// Devuelve el color del texto.
APT.Label.prototype.textColor = function() {
    return this._textColor.updateFromCSS(this._jqLabel.css("color"), this._jqLabel.css("opacity"));
};

// Modifica el m?ximo n?mero de lineas que puede tener el texto.
APT.Label.prototype.setNumberOfLines = function(numberOfLines) {
    var labelFontSizeStr = this._jqLabel.css("font-size");
    var labelLineHeightInt = parseInt(parseInt(labelFontSizeStr) * 1.5);
    var unity = labelFontSizeStr.substring(labelFontSizeStr.length - 2);
    if (numberOfLines > 0)
    {
        this._numberOfLines = numberOfLines;
        var labelHeight = this._numberOfLines * labelLineHeightInt;
        this._jqLabel.css("height", Number(labelHeight).toString() + unity);
        this._jqLabel.css("line-height", Number(labelLineHeightInt).toString() + unity);
    }
    else 
    {
        this._numberOfLines = 0;
        this._jqLabel.css("height", "");
        this._jqLabel.css("line-height", Number(labelLineHeightInt).toString() + unity);
    }
    
    this.verticalAlignCenter();
};

// Devuelve el m?ximo n?mero de lineas que puede tener el texto.
APT.Label.prototype.numberOfLines = function() {
    return this._numberOfLines;
};

// Devuelve el objeto fuente que da formato al texto
APT.Label.prototype.font = function() {
    return this._font.updateFromCSS(this._jqLabel);
};

// Modifica el objeto fuente que da formato al texto
APT.Label.prototype.setFont = function(aFont) {
    if (aFont !== null)
    {
        this._font = aFont;
        this._font.updateCSS(this._jqLabel);
    }
    
    this.setNumberOfLines(this._numberOfLines);
};

APT.Label.prototype.lineBreakMode = function() {
    return APT.LineBreakMode.parseLineBreakMode(this._jqLabel.css("word-wrap"));
};

// Modifica el modo en que se envuelve y se trunca el texto de la etiqueta.
APT.Label.prototype.setLineBreakMode = function(lineBreakMode) {
    this._jqLabel.css("word-wrap", APT.LineBreakMode.toCSSWordWrap(lineBreakMode));
};

// Este metodo alinea el texto verticalmente en el centro.
APT.Label.prototype.verticalAlignCenter = function() {
    var divHeightStr = this.jQElement().css("height");
    var divHeightInt = parseInt(divHeightStr);
    var labelHeightStr = this._jqLabel.css("height");
    var labelHeightInt = parseInt(labelHeightStr);
    var labelMarginTop = (divHeightInt - labelHeightInt) / 2;
    if (labelMarginTop < 0)
    {
        this._jqLabel.css("margin-top", "0px");
    }
    else 
    {
        this._jqLabel.css("margin-top", parseInt(labelMarginTop) + "px");
    }
};

// Cambia el tamanio y ubicacion del frame en la pagina
APT.Label.prototype.setFrame = function(aFrame) {
    aFrame = aFrame.$copy();
    this.$super_setFrame(aFrame);
    
    this.verticalAlignCenter();
};

// Sobrescribe el metodo para centrar verticalmente el texto del label y luego llamar a la implementacion de la superclase.
APT.Label.prototype.viewDidAppear = function(animated) {
    this.verticalAlignCenter();
    this.$super_viewDidAppear(animated);
};


// La clase APT.MoreListController implementa un TableViewController especializado que es utilizado internamente por la clase APT.TabBarController para manejar la navegacion por los viewControllers que no estan incluidos en la TabBar.
// Esta clase no debe ser utilizada directamente por el programador.
