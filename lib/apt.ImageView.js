APT.createNamespace("APT");


APT.ImageView = function() {
    if(this.constructor !== APT.ImageView) return new APT.ImageView();
    APT.ImageView.$inherits();
    APT.ImageView.$init.apply(this);
    return this;
};

APT.ImageView.$inherits = function() {
    APT.inherits(APT.ImageView, APT.View);
};

APT.ImageView.$init = function() {
    // instance fields
    this._image = null;
    // call base class constructor
    APT.View.$init.apply(this);
};

APT.ImageView.prototype.$copy = function() {
    var copyObject = new APT.ImageView();
    copyObject._image = this._image;
    return copyObject;
};

// Class constructor.
APT.ImageView.prototype.getRenderMarkup = function() {
    return $("<img></img>");
};

// Cambia el elemento HTML de Jquery
// Markup estandar: <img></img>
APT.ImageView.prototype.setJQElement = function(jqElement) {
    var aux = $("<div></div>");
    aux.append(jqElement);
    this._jqElement = aux.trigger("create").children(1);
    if (this.jQElement().attr("src") !== undefined)
    {
        this._image = APT.Image.imageNamed(this.jQElement().attr("src"));
    }
};

// Inicializa un imageView con un image especifico. Completa el img, en html, con el src a la imagen recibida.
// @param   Un objeto image, que posee el path a la imagen, que se mostrar? en el imageView
// @return  Un objeto imageView inicializado.
APT.ImageView.prototype.initWithImage = function(anImage) {
    this._image = anImage;
    if (this._image !== null)
    {
        var src = this._image.name();
        this.jQElement().attr("src", src.valueOf());
    }
    
    return this;
};

// Retorna la propiedad image. Este ser? el objeto imagen mostrado en el view.
// @return  El objeto image.
APT.ImageView.prototype.image = function() {
    return this._image;
};

// Setea la propiedad image. Completa el img, en html, con el src a la imagen recibida.
// @param   Un objeto image, que posee el path a la imagen, que se mostrar? en el imageView
APT.ImageView.prototype.setImage = function(aImage) {
    this._image = aImage;
    if (aImage !== null)
    {
        var src = aImage.name();
        this.jQElement().attr("src", src.valueOf());
    }
    else 
    {
        this.jQElement().attr("src", "");
    }
};


// INDEXPATH
