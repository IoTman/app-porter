APT.createNamespace("APT");


APT.Image = function() {
    if(this.constructor !== APT.Image) return new APT.Image();
    APT.Image.$inherits();
    APT.Image.$init.apply(this);
    return this;
};

APT.Image.$inherits = function() {
    APT.inherits(APT.Image, Object);
};

APT.Image.$init = function() {
    // instance fields
    this._name = null;
    this._size = null;
    this._scale = null;
    // call base class constructor
    Object.apply(this);
};

APT.Image.prototype.$copy = function() {
    var copyObject = new APT.Image();
    copyObject._name = this._name;
    copyObject._size = this._size.$copy();
    copyObject._scale = this._scale;
    return copyObject;
};

// Class constructor.
// Inicializa una nueva imagen con su nombre y escala. Retorna la imagen creada.
// @param aName  Nombre de la imagen.
// @return       La imagen inicializada.
APT.Image.imageNamed = function(aName) {
    var image = new APT.Image();
    image.setName(aName);
    var length = image._name.length;
    
    if (image._name.substring(length - 3) === "@2x")
    {
        image._scale = parseFloat(2.0);
    }
    else 
    {
        image._scale = parseFloat(1.0);
    }
    
    image._size = APT.Size(0, 0);
    return image;
};

// Retorna la variable auxiliar name
APT.Image.prototype.name = function() {
    return this._name;
};

// Setea la variable auxiliar name
APT.Image.prototype.setName = function(aName) {
    this._name = aName;
};

// Inicializa una nueva imagen con su nombre desde un path especifico. Retorna la imagen creada.
// @param aPath  Path de la imagen.
// @return       La imagen inicializada.
APT.Image.imageWithContentsOfFile = function(aPath) {
    var image = new APT.Image();
    image.setName(aPath);
    image._size = APT.Size(0, 0);
    return image;
};

// Inicializa un View utilizando un punto determinado.
APT.Image.prototype.drawAtPoint = function(point) {
    point = point.$copy();
    var view = new APT.View();
    var rect = APT.Rect.New(0, 0, 50, 90);
    view = view.initWithFrame(rect);
    view.setCenter(point);
    point = view.center();
};

// Inicializa un View utilizando un rectangulo determinado.
APT.Image.prototype.drawInRect = function(rec) {
    rec = rec.$copy();
    var view = new APT.View();
    var rect = APT.Rect.New(0, 0, 50, 90);
    view = view.initWithFrame(rect);
};

// Devuelve el ancho y alto de una imagen.
APT.Image.prototype.size = function() {
    if (this._size.width === 0)
    {
        var imageView = new APT.ImageView();
        imageView.setImage(this);
        imageView.jQElement().hide();
        imageView.jQElement().appendTo("#main-page");
        
        var h = imageView.jQElement().css("height");
        var w = imageView.jQElement().css("width");
        
        imageView.jQElement().detach();
        this._size = APT.Size(w, h);
    }
    
    return this._size;
};

// Retorna la propiedad scale.
APT.Image.prototype.scale = function() {
    return this._scale;
};

// Devuelve la orientaci?n de la imagen.
APT.Image.prototype.imageOrientation = function() {
    return APT.ImageOrientation.Up;
};


// IMAGE VIEW					La clase image view hereda de view. Se utiliza esta clase para mostrar una imagen dentro de un view. Se implementa en html con un div contenedor y un img contenido en el mismo. Por javascript se setea el src.
