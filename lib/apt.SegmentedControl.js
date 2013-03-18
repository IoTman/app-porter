APT.createNamespace("APT");


APT.SegmentedControl = function() {
    if(this.constructor !== APT.SegmentedControl) return new APT.SegmentedControl();
    APT.SegmentedControl.$inherits();
    APT.SegmentedControl.$init.apply(this);
    return this;
};

APT.SegmentedControl.$inherits = function() {
    APT.inherits(APT.SegmentedControl, APT.Control);
};

APT.SegmentedControl.$init = function() {
    // instance fields
    this._items = new Array();
    this._autoWidth = true;
    // call base class constructor
    APT.Control.$init.apply(this);
};

APT.SegmentedControl.prototype.$copy = function() {
    var copyObject = new APT.SegmentedControl();
    copyObject._items = this._items;
    copyObject._autoWidth = this._autoWidth;
    return copyObject;
};

APT.SegmentedControl.NoSegment = -1;

// Class constructor.
// Sobreescrive el metodo getRenderMarkup del APT.View para APT.SegmentedControl
APT.SegmentedControl.prototype.getRenderMarkup = function() {
    return $("<div class=\"apt_segmentedControl ui-corner-all\"></div>");
};

APT.SegmentedControl.prototype.initWithItems = function(items) {
    var aButton = null;
    for (var i = 0; i < items.length; i++)
    {
        aButton = this.createSegmentItem(items[i]);
        if (aButton !== null)
        {
            this._items.push(aButton);
        }
    }
    
    if (this._autoWidth)
    {
        this.setFrame(APT.Rect.New(0, 0, 100 * items.length, 44));
    }
    
    return this;
};

// Reemplaza el contenido del segmento indicado por la imagen pasada como parametro.
// @param image La imagen que va a reemplazar el contenido del segmento indicado.
// @param segment El indice del segmento a modificar. Los valores del parametro segment se expresan como un numero entero desde 0 a n-1 inclusive, siendo n la cantidad de segmentos. Si el valor es mayor a n-1 se considera que se quiere modificar el ultimo segmento, en cambio si el valor del parametro segment es menor que 0 el segmento a modificar es el primero.
APT.SegmentedControl.prototype.setImage_forSegmentAtIndex = function(image, segment) {
    if (this.numberOfSegments() > 0)
    {
        segment = this.standardizeSegmentIndex(segment);
        var segmentItem = this._items[segment];
        segmentItem.setTitle("");
        segmentItem.setImage(image);
    }
};

// Devuelve la magen del segmento indicado con el parametro segment. Si el segmento contiene un titulo en lugar de una imagen, entonces el metodo devuelve null.
// @param segment El indice del segmento a consultar, se expresa como un numero entero entre 0 y n-1 inclusive, siendo n la cantidad de segmentos. Si segment contiene un valor menor que 0 o mayor que n-1 el metodo devuelve null.
APT.SegmentedControl.prototype.imageForSegmentAtIndex = function(segment) {
    if (this._items.length > 0)
    {
        segment = this.standardizeSegmentIndex(segment);
        return (this._items[segment]).imageView().image();
    }
    else 
    {
        return null;
    }
};

// Reemplaza el contenido del segmento indicado por el titulo pasada como parametro.
// @param title El titulo que va a reemplazar el contenido del segmento indicado.
// @param segment El indice del segmento a modificar. Los valores del parametro segment se expresan como un numero entero desde 0 a n-1 inclusive, siendo n la cantidad de segmentos. Si el valor es mayor a n-1 se considera que se quiere modificar el ultimo segmento, en cambio si el valor del parametro segment es menor que 0 el segmento a modificar es el primero.
APT.SegmentedControl.prototype.setTitle_forSegmentAtIndex = function(title, segment) {
    if (this.numberOfSegments() > 0)
    {
        if (title === null)
        {
            title = "";
        }
        
        segment = this.standardizeSegmentIndex(segment);
        var segmentItem = this._items[segment];
        segmentItem.setTitle(title);
        segmentItem.setImage(null);
    }
};

// Devuelve el titulo del segmento indicado con el parametro segment. Si el segmento contiene una imagen en lugar de un titulo, entonces el metodo devuelve un titulo vacio (el string "").
// @param segment El indice del segmento a consultar, se expresa como un numero entero entre 0 y n-1 inclusive, siendo n la cantidad de segmentos. Si segment contiene un valor menor que 0 o mayor que n-1 el metodo devuelve null.
APT.SegmentedControl.prototype.titleForSegmentAtIndex = function(segment) {
    if (this._items.length > 0)
    {
        segment = this.standardizeSegmentIndex(segment);
        return (this._items[segment]).titleLabel().text();
    }
    else 
    {
        return null;
    }
};

// Selecciona el segmento indicado. Si segment es mayor al numero de segmentos menos 1 o segment es menor que 0, entonces quedan todos los segmentos sin seleccion.
// @param segment El indice del segmento a seleccionar. Es un numero entero entre 0 y n - 1 (n = numero de segmentos).
APT.SegmentedControl.prototype.setSelectedSegmentIndex = function(segment) {
    this.deselectItems();
    if (segment >= 0 && segment < this._items.length)
    {
        (this._items[segment]).jQElement().addClass("ui-btn-active");
    }
    
    this.sendActionsForControlEvents(APT.ControlEvent.ValueChanged);
};

// Devuelve un valor entre 0 y el numero de segmentos del SegmentedControl menos 1 que representa el indice del segmento seleccionado.
APT.SegmentedControl.prototype.selectedSegmentIndex = function() {
    var result = this.jQElement().children(".ui-btn-active").index();
    if (result === -1)
    {
        result = APT.SegmentedControl.NoSegment;
    }
    
    return result;
};

// Devuelve el numero de segmentos del SegmentedControl.
APT.SegmentedControl.prototype.numberOfSegments = function() {
    return this._items.length;
};

// Sobreescribe el metodo de view para calcular el tamanio de segmentos y agregar el estilo de bordes redondeados a los segmentos extremos, antes de notificar al view Controller asociado al SegmentedControl.
APT.SegmentedControl.prototype.viewDidAppear = function(animated) {
    this.calculateSegmentSize();
    this.setCorners();
    this.$super_viewDidAppear(animated);
};

// Cambia el tamanio y ubicacion del frame en la pagina
APT.SegmentedControl.prototype.setFrame = function(aFrame) {
    aFrame = aFrame.$copy();
    this.$super_setFrame(aFrame);
    this._autoWidth = false;
    this.calculateSegmentSize();
    this.setCorners();
};

// Metodo que se llama dentro del handler del evento Click de los botones (segmentos) para seleccionar el item y disparar el evento ValueChange en el SegmentedControl.
APT.SegmentedControl.prototype.fireValueChangedOnSegmentClick = function(event) {
    if (this.isEnabled())
    {
        this.deselectItems();
        $((event).currentTarget).addClass("ui-btn-active");
        this.sendActionsForControlEvents(APT.ControlEvent.ValueChanged);
    }
};

// Agrega un nuevo segmento con una imagen antes del segmento indicado.
// @param image La imagen que contiene el nuevo segmento.
// @param segment El indice del segmento expresado como numero entero entre 0 y n-1 siendo n la cantidad de segmentos del SegmentedControl. Si el valor segment es menor que 0 el segmento se agrega al principio, en cambio si el valor es mayor que n-1 el nuevo segmento se agrega al final.
APT.SegmentedControl.prototype.insertSegmentWithImage_atIndex = function(image, segment) {
    var newSegment = this.createSegmentItem(image);
    if (segment <= 0)
    {
        this._items.splice(0, 0, newSegment);
        this.jQElement().prepend(newSegment.jQElement());
    }
    else 
    {
        if (segment > this._items.length - 1)
        {
            this._items.push(newSegment);
            this.jQElement().append(newSegment);
        }
        else 
        {
            this._items.splice(segment, 0, newSegment);
            var afterButton = this._items[segment];
            newSegment.jQElement().insertBefore(afterButton.jQElement());
        }
    }
    
    this.calculateSegmentSize();
    this.setCorners();
};

// Agrega un nuevo segmento con una titulo antes del segmento indicado.
// @param title El titulo que contiene el nuevo segmento.
// @param segment El indice del segmento expresado como numero entero entre 0 y n-1 siendo n la cantidad de segmentos del SegmentedControl.  Si el valor segment es menor que 0 el segmento se agrega al principio, en cambio si el valor es mayor que n-1 el nuevo segmento se agrega al final.
APT.SegmentedControl.prototype.insertSegmentWithTitle_atIndex = function(title, segment) {
    var newSegment = this.createSegmentItem(title);
    if (segment <= 0)
    {
        this._items.splice(0, 0, newSegment);
        this.jQElement().prepend(newSegment.jQElement());
    }
    else 
    {
        if (segment > this._items.length - 1)
        {
            this._items.push(newSegment);
            this.jQElement().append(newSegment);
        }
        else 
        {
            this._items.splice(segment, 0, newSegment);
            var afterButton = this._items[segment];
            newSegment.jQElement().insertBefore(afterButton.jQElement());
        }
    }
    
    this.calculateSegmentSize();
    this.setCorners();
};

// Elimina todos los segmentos del SegmentedControl.
APT.SegmentedControl.prototype.removeAllSegments = function() {
    this._items.splice(0, this._items.length);
    this.jQElement().children().detach();
    this.calculateSegmentSize();
    this.setCorners();
};

// Elimina un segmento del SegmentedControl.
// @param segment El indice del segmento a eliminar expresado como numero entero entre 0 y n-1 siendo n la cantidad de segmentos del SegmentedControl. Si el valor segment es menor que 0 se quita el primer segmento, en cambio si el valor es mayor que n-1 se quita el ultimo segmento.
APT.SegmentedControl.prototype.removeSegmentAtIndex = function(segment) {
    if (this._items.length > 0)
    {
        segment = this.standardizeSegmentIndex(segment);
        (this._items[segment]).jQElement().detach();
        this._items.splice(segment, 1);
        this.calculateSegmentSize();
        this.setCorners();
    }
};

// Habilita o deshabilita un segmento del SegmentedControl. Un segmento deshabilitado no puede ser seleccionado, no recibe eventos y se muestra transparente al usuario para que lo identifique. Ademas, si se deshabilita un segmento seleccionado, este pierde la seleccion.
// @param enabled Habilita o deshabilita el segmento indicado.
// @param segment El indice del segmento a habilitar/deshabilitar expresado como numero entero entre 0 y n-1 siendo n la cantidad de segmentos del SegmentedControl. Si el valor de segment es menor que 0 se habilita/deshabilita el primer segmento, en cambio si el valor es mayor que n-1 se habilita/deshabilita el ultimo segmento.
APT.SegmentedControl.prototype.setEnabled_forSegmentAtIndex = function(enabled, segment) {
    segment = this.standardizeSegmentIndex(segment);
    var aSegmentItem = this._items[segment];
    if (enabled === false)
    {
        aSegmentItem.jQElement().removeClass("ui-btn-active");
    }
    
    aSegmentItem.setEnabled(enabled);
};

APT.SegmentedControl.prototype.isEnabledForSegmentAtIndex = function(segment) {
    segment = this.standardizeSegmentIndex(segment);
    return (this._items[segment]).isEnabled();
};

// Quita la seleccion de todos los segmentItems.
APT.SegmentedControl.prototype.deselectItems = function() {
    this.jQElement().children().removeClass("ui-btn-active");
};

// Ajusta el tamanio de los segmentos a las dimensiones del frame del SegmentedControl. Si no se ha establecido un valor a la propiedad frame, entonces se establecen por defecto 75px de largo y  44px de alto para cada segmento.
APT.SegmentedControl.prototype.calculateSegmentSize = function() {
    var width1 = parseInt(this.frame().size.width);
    var childrenWidth = 75;
    if (!this._autoWidth && width1 > 0)
    {
        childrenWidth = width1 / this.jQElement().children().length;
    }
    
    var height1 = parseInt(this.frame().size.height);
    if (this._autoWidth || height1 < 1)
    {
        height1 = 44;
    }
    
    for (var i = 0; i < this._items.length; i++)
    {
        (this._items[i]).setFrame(APT.Rect.New(i * childrenWidth, 0, childrenWidth, height1));
    }
};

// Aplica el estilo a todos los segmentos del SegmentedControl para que los extremos tengan los bordes redondeados.
APT.SegmentedControl.prototype.setCorners = function() {
    var segmentItem = null;
    for (var i = 0; i < this._items.length; i++)
    {
        segmentItem = this._items[i];
        if (i === 0)
        {
            segmentItem.jQElement().addClass("ui-corner-left");
            segmentItem.jQElement().removeClass("ui-corner-right");
        }
        else 
        {
            if (i === this._items.length - 1)
            {
                segmentItem.jQElement().removeClass("ui-corner-left");
                segmentItem.jQElement().addClass("ui-corner-right");
            }
            else 
            {
                segmentItem.jQElement().removeClass("ui-corner-left");
                segmentItem.jQElement().removeClass("ui-corner-right");
            }
        }
    }
};

// Crea un objeto APT.Button con una imagen o un titulo y devuelve el objeto inicializado. Se utiliza para crear los segmentos del SegmentedControl.
APT.SegmentedControl.prototype.createSegmentItem = function(segmentItem) {
    var aButton = null;
    if (segmentItem instanceof APT.Image)
    {
        aButton = new APT.Button();
        aButton.setImage(segmentItem);
    }
    else 
    {
        if (segmentItem instanceof String || typeof(segmentItem) === "string")
        {
            aButton = new APT.Button();
            aButton.setTitle(segmentItem);
        }
        else 
        {
            aButton = new APT.Button();
            aButton.setTitle("invalid argument");
        }
    }
    
    this.jQElement().append(aButton.jQElement());
    aButton.jQElement().addClass("apt_segmentedControl_item");
    aButton.addTarget_action_forControlEvents(this, "fireValueChangedOnSegmentClick", APT.ControlEvent.vmouseup);
    return aButton;
};

// Devuelve el mismo valor que segment si el valor ingresado se encuentra entre 0 y n-1 inclusive siendo n la cantidad de segmentos del SegmentedControl, si segment es menor que 0 el metodo devuelve 0, si segment es mayor que n-1 el metodo devuelve n-1.
APT.SegmentedControl.prototype.standardizeSegmentIndex = function(segment) {
    if (segment < 0)
    {
        segment = 0;
    }
    else 
    {
        if (segment > this.numberOfSegments() - 1)
        {
            segment = this.numberOfSegments() - 1;
        }
    }
    
    return segment;
};


// SET									From NSSet
