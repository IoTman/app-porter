APT.createNamespace("APT");


APT.Switch = function() {
    if(this.constructor !== APT.Switch) return new APT.Switch();
    APT.Switch.$inherits();
    APT.Switch.$init.apply(this);
    return this;
};

APT.Switch.$inherits = function() {
    APT.inherits(APT.Switch, APT.Control);
};

APT.Switch.$init = function() {
    // call base class constructor
    APT.Control.$init.apply(this);
};

// Class constructor
APT.Switch.prototype.getRenderMarkup = function() {
    return $("<div><select data-role=\"slider\"><option value=\"off\">Off</option><option value=\"on\">On</option></select></div>");
};

// Cambia el elemento HTML de JQuery
// Markup estandar de vista: <div><select data-role=\"slider\"><option value=\"off\">Off</option><option value=\"on\">On</option></select></div>
APT.Switch.prototype.setJQElement = function(jqelement) {
    this._jqElement = jqelement.trigger("create");
    jqelement.find("select").slider();
};

// Inicializa y retorna el componente switch con las cooredenadas indicadas, el size es descartado
// @param rect El cuadro en el que va a contener el componente el size es descartado
// @return     el componente inicializado en las cordenadas x y especificadas
APT.Switch.prototype.initWithFrame = function(rect) {
    rect = rect.$copy();
    this.jQElement().css("position", "absolute");
    this.setFrame(rect);
    this.layoutSubviews();
    
    return this;
};

// Sobreescribe el comportamiento de View para que el componente no pueda redimencionarce.
APT.Switch.prototype.setFrame = function(aFrame) {
    aFrame = aFrame.$copy();
    this._jqElement.css("position", "absolute");
    APT.Point.updateCSS(this._jqElement, aFrame.origin);
    APT.Size.updateCSS(this._jqElement, APT.Size(94, 42));
    
    this.layoutSubviews();
};

// Sobreescribe el comportamiento de View para que el componente no pueda redimencionarce.
APT.Switch.prototype.setBounds = function(aRect) {
    aRect = aRect.$copy();
    // do nothing
};

// Modifica el estado del componente.
APT.Switch.prototype.setOn = function(on) {
    if (this.isInDom())
    {
        if (on)
        {
            this.jQElement().find("select").val("on");
        }
        else 
        {
            this.jQElement().find("select").val("off");
        }
        
        this.jQElement().find("select").slider("refresh");
    }
    else 
    {
        var aux = this.getRenderMarkup();
        if (on)
        {
            aux.find("option[value='on']").attr("selected", "selected");
        }
        
        var frame = this.frame();
        this.setJQElement(aux);
        this.initWithFrame(frame);
    }
};

// Retorna el estado del componente.
APT.Switch.prototype.on = function() {
    var value = false;
    if (this.jQElement().find("select").val() === "on")
    {
        value = true;
    }
    return value;
};


// SLIDER
// /La clase Slider hereda de Control.
