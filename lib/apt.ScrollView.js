APT.createNamespace("APT");


APT.ScrollView = function() {
    if(this.constructor !== APT.ScrollView) return new APT.ScrollView();
    APT.ScrollView.$inherits();
    APT.ScrollView.$init.apply(this);
    return this;
};

APT.ScrollView.$inherits = function() {
    APT.inherits(APT.ScrollView, APT.View);
};

APT.ScrollView.$init = function() {
    // instance fields
    this._delegate = null;
    this._jqContent = null;
    // call base class constructor
    APT.View.$init.apply(this);
};

APT.ScrollView.prototype.$copy = function() {
    var copyObject = new APT.ScrollView();
    copyObject._delegate = this._delegate;
    copyObject._jqContent = this._jqContent;
    return copyObject;
};

// Class constructor.
APT.ScrollView.prototype.getRenderMarkup = function() {
    return $("<div class=\"apt_scrollview\" data-viewtype=\"ScrollView\" data-role=\"scrollview\"><div class=\"apt_scrollview2\"></div></div>");
};

// Cambia el elemento HTML de JQuery
// Markup estandar de vista: <div class=\"apt_scrollview\" data-viewtype=\"ScrollView\" data-role=\"scrollview\"><div class=\"apt_scrollview2\"></div></div>
APT.ScrollView.prototype.setJQElement = function(jqelement) {
    this._jqElement = jqelement.trigger("create");
    this._jqContent = this._jqElement.children(1);
};

// Cambia el estado del scroll
// @param enabled si 'true' se el componente tiene scroll, en caso contrarion no
APT.ScrollView.prototype.setScrollEnabled = function(enabled) {
    if (enabled)
    {
        this.jQElement().css("overflow", "auto");
    }
    else 
    {
        this.jQElement().css("overflow", "hidden");
    }
};

// Retorna el estado del scroll
// @return 'true' se el componente tiene scroll, en caso contrarion no
APT.ScrollView.prototype.scrollEnabled = function() {
    var scroll = this.jQElement().css("overflow");
    switch(scroll.valueOf())
    {
        case "scroll":
        case "auto":
            return true;
            break;
        case "hidden":
            return false;
            break;
    }
};

// Cambia las coordenadas donde se va a ubicar el scroll
// @param point    coordenadas de origen del scrool
// @param animated true hace el efecto de desplazamiento del scroll, en caso contrario aparece en las coordenadas indicadas
APT.ScrollView.prototype.setContentOffsetAnimated = function(point, animated) {
    point = point.$copy();
    if (animated)
    {
        var animation = APT.Animation.beginAnimationsContext(null, null);
        animation.setAnimatableProperty(this, "scrollTop", parseFloat(point.y));
        animation.setAnimatableProperty(this, "scrollLeft", parseFloat(point.x));
        animation.setAnimationDuration(1000);
        
        animation.commitAnimations();
    }
    else 
    {
        this.jQElement().scrollTop(parseInt(point.y));
        this.jQElement().scrollLeft(parseInt(point.x));
    }
};

// Cambia las coordenadas donde se va a ubicar el scroll
// @param point coordenadas de origen del scrool
APT.ScrollView.prototype.setContentOffset = function(point) {
    point = point.$copy();
    this.jQElement().scrollTop(parseInt(point.y));
    this.jQElement().scrollLeft(parseInt(point.x));
};

// Retorna las coordenadas donde se encuentra el scroll
// @return coordenadas en las que se encuentra el scroll
APT.ScrollView.prototype.contentOffset = function() {
    var x = this.jQElement().scrollLeft();
    var y = this.jQElement().scrollTop();
    return APT.Point(parseInt(x), parseInt(y));
};

// Cambia el tamanio del content size
// @param size longuitudes del content
APT.ScrollView.prototype.setContentSize = function(size) {
    size = size.$copy();
    APT.Size.updateCSS(this._jqContent, size);
};

// Retorna el tamanio del content size
// @return longuitudes del content
APT.ScrollView.prototype.contentSize = function() {
    return APT.Size.updateFromCSS(this._jqContent);
};

// Cambia el scrollView delegate object
APT.ScrollView.prototype.setDelegate = function(aDelegate) {
    this._delegate = aDelegate;
};

// Recupera el scrollView delegate object
APT.ScrollView.prototype.delegate = function() {
    return this._delegate;
};

// Inserta una view en el indice especificado
// @param aView   La view que se desea insertar
// @param anIndex El indice del array en el que uno desea insertar la view
APT.ScrollView.prototype.insertSubviewAtIndex = function(aView, anIndex) {
    var len = this.subviews().length;
    if (aView !== null && aView !== this && anIndex >= 0 && anIndex <= len)
    {
        // if  aView already has a superview, remove from it
        if (aView.superview() !== null)
        {
            aView.removeFromSuperview();
        }
        
        var notifyFlag = this.isInDom() && !aView.isInDom();
        
        if (notifyFlag)
        {
            aView.viewWillAppear(false);
        }
        // insert aView
        
        if (anIndex === len)
        {
            this._jqContent.append(aView.jQElement());
            this._subviews.push(aView);
        }
        else 
        {
            aView.jQElement().insertBefore((this.subviews()[anIndex]).jQElement());
            this._subviews.splice(anIndex, 0, aView);
        }
        
        if (notifyFlag)
        {
            aView.viewDidAppear(false);
        }
        // set this as current superview
        
        aView._superview = this;
        aView.setNeedsLayout();
    }
};

// Inserta una view en el indice especificado sin notificar al ViewController
// @param aView   La view que se desea insertar
// @param anIndex El indice del array en el que uno desea insertar la view
APT.ScrollView.prototype.insertSubviewAtIndexWithoutNotifying = function(aView, anIndex) {
    var len = this._subviews.length;
    if (aView !== null && aView !== this && anIndex >= 0 && anIndex <= len)
    {
        if (aView.superview() !== null)
        {
            aView.removeFromSuperviewWithoutNotifying();
        }
        
        if (anIndex === len)
        {
            this._jqContent.append(aView.jQElement());
            this._subviews.push(aView);
        }
        else 
        {
            aView.jQElement().insertBefore((this._subviews[anIndex]).jQElement());
            this._subviews.splice(anIndex, 0, aView);
        }
        
        aView._superview = this;
        aView.setNeedsLayout();
    }
};

APT.ScrollView.prototype.scrollRectToVisible = function(rect, animated) {
    rect = rect.$copy();
    var point = this.contentOffset();
    
    var x = 0;
    var y = 0;
    
    if (point.x < rect.origin.x)
    {
        x = parseInt(rect.origin.x + rect.size.width - this.frame().size.width);
    }
    else 
    {
        if (point.x > rect.origin.x)
        {
            x = parseInt(rect.origin.x);
        }
    }
    
    if (point.y < rect.origin.y)
    {
        y = parseInt(rect.origin.y + rect.size.height - this.frame().size.height);
    }
    else 
    {
        if (point.y > rect.origin.y)
        {
            y = parseInt(rect.origin.y);
        }
    }
    
    this.setContentOffsetAnimated(APT.Point(x, y), animated);
};


