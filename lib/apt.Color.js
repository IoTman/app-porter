APT.createNamespace("APT");


APT.Color = function() {
    if(this.constructor !== APT.Color) return new APT.Color();
    APT.Color.$inherits();
    APT.Color.$init.apply(this);
    return this;
};

APT.Color.$inherits = function() {
    APT.inherits(APT.Color, Object);
};

APT.Color.$init = function() {
    // instance fields
    this._red = 0;
    this._green = 0;
    this._blue = 0;
    this._alpha = 1.0;
    this._type = 0;
    // call base class constructor
    Object.apply(this);
    this._type = APT.Color.RGBA;
};

APT.Color.prototype.$copy = function() {
    var copyObject = new APT.Color();
    copyObject._red = this._red;
    copyObject._green = this._green;
    copyObject._blue = this._blue;
    copyObject._alpha = this._alpha;
    copyObject._type = this._type;
    return copyObject;
};

APT.Color.RGBA = 0;

APT.Color.WHITE_ALPHA = 1;

// Creates and returns a new Color of the specified rgbaComponents
// @param rgbaComponents the rbga values of the color object
// @return               the color at the specified rgbaComponents
APT.Color.New = function(rgbaComponents) {
    var color = new APT.Color();
    color.setComponents(rgbaComponents, APT.Color.RGBA);
    return color;
};

// Creates and returns a new Color of the specified RGBAColor
// @param red   The red value of the color object
// @param green The green value of the color object
// @param blue  The blue value of the color object
// @param alpha The opacity value of the color object, specified as a value from 0.0 to 1.0.
// @return      the color at the specified RGBAColor
APT.Color.RGBAColor = function(red, green, blue, alpha) {
    var color = new APT.Color();
    var rgbaComponents = [red, green, blue, alpha];
    color.setComponents(rgbaComponents, APT.Color.RGBA);
    return color;
};

// Creates and returns a new Color of the specified components
// @param components the rgba values of the color object
// @return               a color object using the specified opacity and grayscale values.
APT.Color.colorWithWhite = function(white, alpha) {
    var color = new APT.Color();
    var components = [white, white, white, alpha];
    color.setComponents(components, APT.Color.WHITE_ALPHA);
    return color;
};

// Sets rgba Components color
// @param rgbaComponents new rgba color Components
APT.Color.prototype.setComponents = function(rgbaComponents, aType) {
    if (rgbaComponents !== null && rgbaComponents.length === 4)
    {
        this._red = APT.Color.normalize(parseFloat(rgbaComponents[0]));
        this._green = APT.Color.normalize(parseFloat(rgbaComponents[1]));
        this._blue = APT.Color.normalize(parseFloat(rgbaComponents[2]));
        this._alpha = APT.Color.normalize(parseFloat(rgbaComponents[3]));
        this._type = aType;
    }
};

// Sets rgba Components color
// @param components new rgba color specified opacity and grayscale values
APT.Color.prototype.setComponentsWithWhite = function(components) {
    if (components !== null && components.length === 2)
    {
        this._red = APT.Color.normalize((components[0]).valueOf());
        this._green = APT.Color.normalize((components[0]).valueOf());
        this._blue = APT.Color.normalize((components[0]).valueOf());
        this._alpha = APT.Color.normalize((components[1]).valueOf());
        
        this._type = APT.Color.RGBA;
    }
};

// @param aValue
APT.Color.normalize = function(aValue) {
    if (aValue < 0.0)
    {
        return 0;
    }
    if (aValue > 1.0)
    {
        return 1;
    }
    return aValue;
};

// @param aValue
APT.Color.validate = function(aValue) {
    if (0.0 <= aValue && aValue <= 1.0)
    {
        return true;
    }
    else 
    {
        return false;
    }
};

// @param aValue
APT.Color.prototype.getHtmlValue = function() {
    switch(this._type)
    {
        case APT.Color.RGBA:
        case APT.Color.WHITE_ALPHA:
            var value = "rgba(";
            value += "" + Math.floor(this._red * 255);
            value += "," + Math.floor(this._green * 255);
            value += "," + Math.floor(this._blue * 255);
            value += "," + this._alpha + ")";
            return value;
            break;
        default:
            break;
    }
    
    return null;
};

APT.Color.Black = APT.Color.RGBAColor(0, 0, 0, 1);

APT.Color.White = APT.Color.RGBAColor(1, 1, 1, 1);

APT.Color.LightGray = APT.Color.RGBAColor(2 / 3, 2 / 3, 2 / 3, 1);

APT.Color.Blue = APT.Color.RGBAColor(0, 0, 1, 1);

APT.Color.Green = APT.Color.RGBAColor(0, 1, 0, 1);

APT.Color.Red = APT.Color.RGBAColor(1, 0, 0, 1);

APT.Color.DarkGray = APT.Color.colorWithWhite(1 / 3, 1);

APT.Color.Gray = APT.Color.colorWithWhite(1 / 2, 1);

APT.Color.Cyan = APT.Color.RGBAColor(0, 1, 1, 1);

APT.Color.Yellow = APT.Color.RGBAColor(1, 1, 0, 1);

APT.Color.Magenta = APT.Color.RGBAColor(1, 0, 1, 1);

APT.Color.Orange = APT.Color.RGBAColor(1, 1 / 2, 0, 1);

APT.Color.Purple = APT.Color.RGBAColor(1 / 2, 0, 1 / 2, 1);

APT.Color.Brown = APT.Color.RGBAColor(6 / 10, 4 / 10, 2 / 10, 1);

APT.Color.Transparent = APT.Color.RGBAColor(0, 0, 0, 0);

APT.Color.prototype.getRed = function() {
    return this._red;
};

APT.Color.prototype.getGreen = function() {
    return this._green;
};

APT.Color.prototype.getBlue = function() {
    return this._blue;
};

APT.Color.prototype.getAlpha = function() {
    return this._alpha;
};

APT.Color.prototype.getWhite = function() {
    return this._red;
};

APT.Color.prototype.isValidWhiteAlpha = function() {
    return this._type === APT.Color.WHITE_ALPHA;
};

APT.Color.prototype.getWhite_alpha = function(white, alpha) {
    return this.isValidWhiteAlpha();
};

// Check if RGBA components are valid values to construct a color
// @param red, green, blue, alpha
APT.Color.isValidRed_green_blue_alpha = function(red, green, blue, alpha) {
    if (APT.Color.validate(red) && APT.Color.validate(green) && APT.Color.validate(blue) && APT.Color.validate(alpha))
    {
        return true;
    }
    else 
    {
        return false;
    }
};

// Devuelve 0 (APT.Color.RGBA) o 1 (APT.Color.WHITE_ALPHA) segun si el color fue creado como rgba o white-alpha
APT.Color.prototype.getColorType = function() {
    return this._type;
};

// Recibe un string con un color en formato css 'rgb(x1,x2,x3)') o 'rgba(x1,x2,x3,a)' y devuelve un array de strings con los valores [x1,x2,x3] o [x1,x2,x3,a] respectivamente.
// @param cssStringColor el valor
APT.Color.prototype.parseRgbValues = function(cssStringColor) {
    var cssColorType = cssStringColor.substring(0, 4);
    var auxStr = null;
    var arrayRgb = new Array();
    if (cssColorType === "rgb(")
    {
        auxStr = cssStringColor.substring(4, cssStringColor.length - 1);
        arrayRgb[0] = auxStr.substring(0, auxStr.indexOf(","));
        
        auxStr = auxStr.substring((arrayRgb[0]).length + 1);
        arrayRgb[1] = auxStr.substring(0, auxStr.indexOf(","));
        
        auxStr = auxStr.substring((arrayRgb[1]).length + 1);
        arrayRgb[2] = auxStr.trim();
    }
    else 
    {
        if (cssColorType === "rgba")
        {
            auxStr = cssStringColor.substring(5, cssStringColor.length - 1);
            arrayRgb[0] = auxStr.substring(0, auxStr.indexOf(","));
            
            auxStr = auxStr.substring((arrayRgb[0]).length + 1);
            arrayRgb[1] = auxStr.substring(0, auxStr.indexOf(","));
            
            auxStr = auxStr.substring((arrayRgb[1]).length + 1);
            arrayRgb[2] = auxStr.substring(0, auxStr.indexOf(","));
            
            auxStr = auxStr.substring((arrayRgb[2]).length + 1);
            arrayRgb[3] = auxStr.trim();
        }
    }
    
    for (var i = 0; i < arrayRgb.length; i++)
    {
        arrayRgb[i] = (arrayRgb[i]).trim();
    }
    
    return arrayRgb;
};

APT.Color.prototype.updateFromCSS = function(cssStringColor, cssStringOpacity) {
    if (cssStringColor !== this.getHtmlValue())
    {
        var rgbArray = this.parseRgbValues(cssStringColor);
        
        if (rgbArray.length === 4)
        {
            this.setComponents(rgbArray, this.getColorType());
        }
        else 
        {
            if (rgbArray.length === 3)
            {
                var auxArray = new Array();
                auxArray[0] = rgbArray[0];
                auxArray[1] = rgbArray[1];
                auxArray[2] = rgbArray[2];
                auxArray[3] = cssStringOpacity;
                this.setComponents(auxArray, this.getColorType());
            }
        }
    }
    
    return this;
};


// COLOR SPACE
APT.ColorSpace = function() {
    if(this.constructor !== APT.ColorSpace) return new APT.ColorSpace();
    APT.ColorSpace.$inherits();
    APT.ColorSpace.$init.apply(this);
    return this;
};

APT.ColorSpace.$inherits = function() {
    APT.inherits(APT.ColorSpace, Object);
};

APT.ColorSpace.$init = function() {
    // call base class constructor
    Object.apply(this);
};

APT.ColorSpace.prototype.createColor = function(components) {
    return APT.Color.New(components);
};


// CONTROL
// La clase Control que hereda de la clase View sirve de clase base para todos los objetos de control como botones, textField, text etc.
