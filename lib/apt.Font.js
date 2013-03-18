APT.createNamespace("APT");


APT.Font = function() {
    if(this.constructor !== APT.Font) return new APT.Font();
    APT.Font.$inherits();
    APT.Font.$init.apply(this);
    return this;
};

APT.Font.$inherits = function() {
    APT.inherits(APT.Font, Object);
};

APT.Font.$init = function() {
    // instance fields
    this._pointSize = 0;
    this._familyName = null;
    this._fontName = null;
    this._style = null;
    this._fontWeight = null;
    // call base class constructor
    Object.apply(this);
    this._fontName = "Helvetica";
    this._familyName = "Helvetica";
    this._style = APT.Font.NORMAL;
    this._fontWeight = APT.Font.NORMAL;
    this._pointSize = 12;
};

APT.Font.prototype.$copy = function() {
    var copyObject = new APT.Font();
    copyObject._pointSize = this._pointSize;
    copyObject._familyName = this._familyName;
    copyObject._fontName = this._fontName;
    copyObject._style = this._style;
    copyObject._fontWeight = this._fontWeight;
    return copyObject;
};

APT.Font.OBLIQUE = "Oblique";

APT.Font.BOLD = "Bold";

APT.Font.BOLD_OBLIQUE = "BoldOblique";

APT.Font.ITALIC = "Italic";

APT.Font.BOLD_ITALIC = "BoldItalic";

APT.Font.NORMAL = "normal";

// Crea una fuente con el nombre y tamanio especificados
// @param familyName Nombre de la fuente
// @param fontSize   tamanio que va a contener la fuente
APT.Font.fontWithNameSize = function(familyName, fontSize) {
    var font = new APT.Font();
    font._fontName = familyName;
    var index = familyName.indexOf("-");
    
    if (index > -1)
    {
        font._familyName = familyName.slice(0, index);
        var name = familyName.slice(index + 1);
        
        switch(name.valueOf())
        {
            case APT.Font.OBLIQUE.valueOf():
                font._style = "oblique";
                break;
            case APT.Font.BOLD.valueOf():
                font._fontWeight = "bold";
                break;
            case APT.Font.BOLD_OBLIQUE.valueOf():
                font._fontWeight = "bold";
                font._style = "oblique";
                break;
            case APT.Font.ITALIC.valueOf():
                font._style = "italic";
                break;
            case APT.Font.BOLD_ITALIC.valueOf():
                font._style = "italic";
                font._fontWeight = "bold";
                break;
        }
    }
    else 
    {
        font._familyName = familyName;
    }
    
    font._pointSize = fontSize;
    return font;
};

// Crea una fuente "Helvetica", epecificando el tamanio de la misma
// @param fontSize tamanio que va a contener la fuente
APT.Font.systemFontOfSize = function(fontSize) {
    var font = new APT.Font();
    font._pointSize = fontSize;
    return font;
};

// Crea una fuente "Helvetica" en negrita
// @param fontSize tamanio que va a contener la fuente
APT.Font.boldSystemFontOfSize = function(fontSize) {
    var font = new APT.Font();
    font._pointSize = fontSize;
    font._fontName = "Helvetica-Bold";
    font._fontWeight = "bold";
    return font;
};

// Crea una fuente "Helvetica" con cursiva
// @param fontSize tamanio que va a contener la fuente
APT.Font.italicSystemFontOfSize = function(fontSize) {
    var font = new APT.Font();
    font._fontName = "Helvetica-Oblique";
    font._pointSize = fontSize;
    font._style = "oblique";
    return font;
};

// Hace una copia de la fuente original cambiando solo el tamanio y la retorna
// @param fontSize size que va a tener la nueva fuente
// @return         Una copia de la fuente con distinto tamanio
APT.Font.prototype.fontWithSize = function(fontSize) {
    var font = new APT.Font();
    font._fontName = this._fontName;
    font._familyName = this._familyName;
    font._style = this._style;
    font._fontWeight = this._fontWeight;
    font._pointSize = fontSize;
    return font;
};

APT.Font.prototype.size = function() {
    return this._pointSize;
};

APT.Font.prototype.setSize = function(size) {
    this._pointSize = size;
};

APT.Font.prototype.familyName = function() {
    return this._familyName;
};

APT.Font.prototype.setFamilyName = function(family) {
    this._familyName = family;
};

APT.Font.prototype.fontName = function() {
    return this._fontName;
};

APT.Font.prototype.setFontName = function(fontName) {
    this._fontName = fontName;
};

APT.Font.prototype.style = function() {
    return this._style;
};

APT.Font.prototype.setStyle = function(style) {
    this._style = style;
};

APT.Font.prototype.fontWeight = function() {
    return this._fontWeight;
};

APT.Font.prototype.setFontWeight = function(fontWeight) {
    this._fontWeight = fontWeight;
};

APT.Font.prototype.updateFromCSS = function(jqobject) {
    this.setSize(parseFloat(jqobject.css("font-size")));
    this.setFamilyName(jqobject.css("font-family"));
    this.setFontWeight(jqobject.css("font-weight"));
    this.setStyle(jqobject.css("font-style"));
    
    if (jqobject.css("font-weight") === "bold")
    {
        if (jqobject.css("font-style") === "italic")
        {
            this.setFontName(jqobject.css("font-family") + "-" + APT.Font.BOLD_ITALIC);
        }
        else 
        {
            if (jqobject.css("font-style") === "oblique")
            {
                this.setFontName(jqobject.css("font-family") + "-" + APT.Font.BOLD_OBLIQUE);
            }
            else 
            {
                this.setFontName(jqobject.css("font-family") + "-" + APT.Font.BOLD);
            }
        }
    }
    else 
    {
        if (jqobject.css("font-style") === "oblique")
        {
            this.setFontName(jqobject.css("font-family") + "-" + APT.Font.OBLIQUE);
        }
        else 
        {
            if (jqobject.css("font-style") === "italic")
            {
                this.setFontName(jqobject.css("font-family") + "-" + APT.Font.ITALIC);
            }
        }
    }
    
    return this;
};

APT.Font.prototype.updateCSS = function(jqobject) {
    jqobject.css("font-size", this.size());
    jqobject.css("font-family", this.familyName());
    jqobject.css("font-style", this.style());
    jqobject.css("font-weight", this.fontWeight());
};


// Timer class					public class Timer inherits js::Object
// {
// public:
// static void enable(double anInterval, js::Object*ref anObject, js::String*ref aCallback, bool repeats)
// {
// if (repeats)
// {
// js::global::window.setInterval(
// js::global::F {
// function() {
// anObject[aCallback.valueOf()].apply(anObject);
// };
// }, anInterval);
// }
// else
// {
// js::global::window.setTimeout(
// js::global::F {
// function() {
// anObject[aCallback.valueOf()].apply(anObject);
// };
// }, anInterval);
// }
// }
// }
// GLOBAL STRUCTS, ENUMS, etc
