APT.createNamespace("APT");


APT.View = function() {
    if(this.constructor !== APT.View) return new APT.View();
    APT.View.$inherits();
    APT.View.$init.apply(this);
    return this;
};

APT.View.$inherits = function() {
    APT.inherits(APT.View, Object);
};

APT.View.$init = function() {
    // instance fields
    this._jqElement = null;
    this._superview = null;
    this._subviews = new Array();
    this._tag = 0;
    this._viewController = null;
    this._canvas = null;
    this._backgroundColor = null;
    this._bounds = APT.Rect.New(0, 0, 0, 0);
    // call base class constructor
    Object.apply(this);
    if (this.jQElement() === null)
    {
        this.setJQElement(this.getRenderMarkup());
    }
};

APT.View.prototype.$copy = function() {
    var copyObject = new APT.View();
    copyObject._jqElement = this._jqElement;
    copyObject._superview = this._superview;
    copyObject._subviews = this._subviews;
    copyObject._tag = this._tag;
    copyObject._viewController = this._viewController;
    copyObject._canvas = this._canvas;
    copyObject._backgroundColor = this._backgroundColor;
    copyObject._bounds = this._bounds.$copy();
    return copyObject;
};

// Class constructor.
APT.View.prototype.getRenderMarkup = function() {
    return $("<div class=\"apt_view\"></div>");
};

// Inicializa el view con el tama?o y ubicacion especificado
// @param rect El cuadro que va a contener el view
// @return     El view creado en caso de no haberse producido ningun error
APT.View.prototype.initWithFrame = function(rect) {
    rect = rect.$copy();
    if (this._jqElement !== null)
    {
        this.setFrame(rect);
        return this;
    }
    
    return null;
};

// Agrega una view a la lista de subviews del objeto
// @param child La view a ser agregada, esta es insertada al final del array
APT.View.prototype.addSubview = function(child) {
    this.insertSubviewAtIndex(child, this._subviews.length);
};

// Mueve una view al frente de las subview
// @param aView La view que va a ser movida al frente de las subview.
APT.View.prototype.bringSubviewToFront = function(aView) {
    if (aView !== null && aView !== this)
    {
        var index = this.indexOfView(aView);
        
        if (index > -1 && aView !== this._subviews[this._subviews.length - 1])
        {
            aView.jQElement().insertAfter((this._subviews[this._subviews.length - 1]).jQElement());
            this._subviews.splice(index, 1);
            this._subviews.splice(this._subviews.length, 0, aView);
            // set this as current superview
            
            aView._superview = this;
            aView.setNeedsLayout();
        }
    }
};

// Mueve una view al fondo de las subview
// @param aView La view que va a ser movida al fondo de las subview.
APT.View.prototype.sendSubviewToBack = function(aView) {
    if (aView !== null && aView !== this)
    {
        var index = this.indexOfView(aView);
        
        if (index > -1 && aView !== this._subviews[0])
        {
            aView.jQElement().insertBefore((this._subviews[0]).jQElement());
            this._subviews.splice(index, 1);
            this._subviews.splice(0, 0, aView);
            // set this as current superview
            
            aView._superview = this;
            aView.setNeedsLayout();
        }
    }
};

// Inserta una view en el indice especificado
// @param aView   La view que se desea insertar
// @param anIndex El indice del array en el que uno desea insertar la view
APT.View.prototype.insertSubviewAtIndex = function(aView, anIndex) {
    var len = this._subviews.length;
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
            this._jqElement.append(aView.jQElement());
            this._subviews.push(aView);
        }
        else 
        {
            aView.jQElement().insertBefore((this._subviews[anIndex]).jQElement());
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

// Busca y retorna la view de acuerdo al id del elemento HTML especificado, en caso de no encotrarla retorna nulo
// @param viewId   El id del elemento HTML
// @return         La view de acuerdo al indice especificado
APT.View.prototype.findViewById = function(viewId) {
    if (this._jqElement === undefined || this._jqElement === null)
    {
        return null;
    }
    
    if (this._jqElement.attr("id") === viewId)
    {
        return this;
    }
    
    var len = this._subviews.length;
    for (var i = 0; i < len; i++)
    {
        var temp = (this._subviews[i]).findViewById(viewId);
        if (temp !== null)
        {
            return temp;
        }
    }
    
    return null;
};

// Inserta una view encima de otra view especificada
// @param aView            La view que va a ser insertada
// @param aSiblingSubview  view que va a estar relacionada a la nuevas view.
APT.View.prototype.insertSubviewAboveSubview = function(aView, aSiblingSubview) {
    var index = this.indexOfView(aSiblingSubview);
    if (index >= 0)
    {
        this.insertSubviewAtIndex(aView, index + 1);
    }
};

// Inserta una view en un indice mas bajo del array de otra view especificada
// @param aView            La view que va a ser insertada
// @param aSiblingSubview  view que va a estar relacionada a la nuevas view.
APT.View.prototype.insertSubviewBelowSubview = function(aView, aSiblingSubview) {
    var index = this.indexOfView(aSiblingSubview);
    if (index >= 0)
    {
        this.insertSubviewAtIndex(aView, index);
    }
};

// Borra la vista de la jerarquia de subviews del la vista padre
APT.View.prototype.removeFromSuperview = function() {
    if (this.superview() !== null && this.superview().jQElement() !== null)
    {
        var index = this._superview.indexOfView(this);
        if (index > -1)
        {
            this._superview._subviews.splice(index, 1);
        }
        
        this.viewWillDisappear(false);
        this.jQElement().detach();
        this._superview = null;
        
        this.viewDidDisappear(false);
    }
};

// Indica si la view especificada esta contenida dentro de las subviews
// @param aView La view que vamos a analizar.
// @return      Verdadero en caso de encontrar la view especificada dentro de las subviews
APT.View.prototype.isDescendantOfView = function(aView) {
    if (aView !== null)
    {
        var index = aView.indexOfView(this);
        if (index > -1 || this === aView)
        {
            return true;
        }
    }
    
    return false;
};

// Intercambia  las views de acuerdo a los indices especificados en la subview
// @param index1 Indice de la primera subview a intercambiar
// @param index2 Indice de la segunda subview a intercambiar
APT.View.prototype.exchangeSubviewAtIndexWithSubviewAtIndex = function(index1, index2) {
    if (index1 > -1 && index1 < this._subviews.length && index2 > -1 && index2 < this._subviews.length)
    {
        var aView = this._subviews[index1];
        var aView2 = this._subviews[index2];
        
        aView.removeFromSuperview();
        aView2.removeFromSuperview();
        
        this.insertSubviewAtIndex(aView2, index1);
        this.insertSubviewAtIndex(aView, index2);
    }
};

APT.View.prototype.setUserInteractionEnabled = function(enabled) {
    if (enabled)
    {
        this._jqElement.removeAttr("disabled");
    }
    else 
    {
        this._jqElement.attr("disabled", "disabled");
    }
};

// Cambia el tamanio y ubicacion del frame en la pagina
APT.View.prototype.setFrame = function(aFrame) {
    aFrame = aFrame.$copy();
    this._bounds.size = aFrame.size.$copy();
    
    this._jqElement.css("position", "absolute");
    APT.Point.updateCSS(this._jqElement, aFrame.origin);
    APT.Size.updateCSS(this._jqElement, aFrame.size);
    
    this.layoutSubviews();
};

// Recupero las coordenadas y tamanio del view
APT.View.prototype.frame = function() {
    var point = APT.Point.updateFromCSS(this._jqElement);
    var size = APT.Size.updateFromCSS(this._jqElement);
    return APT.Rect(point, size);
};

// Cambia el tamanio del view pero conservando el mismo center
APT.View.prototype.setBounds = function(aRect) {
    aRect = aRect.$copy();
    this._bounds = aRect.$copy();
    
    var center = this.center();
    
    var x = center.x - aRect.size.width / 2;
    var y = center.y - aRect.size.height / 2;
    
    var point = APT.Point(x, y);
    var size = APT.Size(aRect.size.width, aRect.size.height);
    
    this.setFrame(APT.Rect(point, size));
    
    this._jqElement.css("position", "absolute");
    APT.Point.updateCSS(this._jqElement, APT.Point(x, y));
    APT.Size.updateCSS(this._jqElement, aRect.size);
    
    this.layoutSubviews();
};

// Obtengo el bounds del frame
APT.View.prototype.bounds = function() {
    return this._bounds;
};

// Retorna el objeto window si esta contenido dentro de la subviews. En caso de no contener window devuleve null
APT.View.prototype.window = function() {
    var len = this._subviews.length;
    for (var i = 0; i < len; i++)
    {
        var temp = this._subviews[i];
        var attr = temp._jqElement.attr("data-viewtype");
        if (attr !== undefined && attr === "Window")
        {
            return temp;
        }
    }
    
    if (this._superview !== null && this._superview !== undefined)
    {
        var attr = this._superview._jqElement.attr("data-viewtype");
        if (attr !== undefined && attr === "Window")
        {
            return this._superview;
        }
        else 
        {
            return this._superview.window();
        }
    }
    
    return null;
};

// Cambiamos el centro del view si este no es nulo
APT.View.prototype.setCenter = function(point) {
    point = point.$copy();
    var frameAux = this.frame();
    
    var x = point.x - frameAux.size.width / 2;
    var y = point.y - frameAux.size.height / 2;
    
    this.setFrame(APT.Rect.New(x, y, frameAux.size.width, frameAux.size.height));
    
    this._jqElement.css("position", "absolute");
    APT.Point.updateCSS(this._jqElement, APT.Point(x, y));
    APT.Size.updateCSS(this._jqElement, frameAux.size);
    
    this.layoutSubviews();
};

// Recuperamos el centro del frame, si este en nulo devolvemos 0.0
APT.View.prototype.center = function() {
    var frameAux = this.frame();
    
    var x = frameAux.origin.x + frameAux.size.width / 2;
    var y = frameAux.origin.y + frameAux.size.height / 2;
    
    return APT.Point(x, y);
};

// Retorna la view en toda la jerarquia de hijos incluyendo la view actual
// @param aTag El tag de la view que deseamos buscar
// @return     la view en caso de encontrar el tag
APT.View.prototype.viewWithTag = function(aTag) {
    if (this._tag === aTag)
    {
        return this;
    }
    var len = this._subviews.length;
    for (var i = 0; i < len; i++)
    {
        var view = (this._subviews[i]).viewWithTag(aTag);
        if (view !== null)
        {
            return view;
        }
    }
    
    return null;
};

// Llama a drawRect para view que customizen el renderizado
APT.View.prototype.layoutSubviews = function() {
    if (this._canvas !== null)
    {
        this._canvas.setFrame(this.frame());
    }
    
    this.drawRect(this.frame());
};

// Cambia el valor de transparencia Alpha de la view
APT.View.prototype.setAlpha = function(value) {
    this._jqElement.css("opacity", value);
};

// Retorna el valor de transparencia Alpha
APT.View.prototype.alpha = function() {
    var alpha = 1;
    if (this._jqElement.css("opacity") !== null)
    {
        alpha = parseFloat(this._jqElement.css("opacity"));
    }
    
    return alpha;
};

// Llama al metodo layoutSubviews
APT.View.prototype.setNeedsLayout = function() {
    // this implementation differs from Cocoa. In Cocoa this method
    // invalidates the layout of the view, and then calls
    // layoutSubviews() in the next drawing cycle.
    // Here layoutSubviews() is called directly.
    this.layoutSubviews();
};

// Retorna una copia superficial (shallow copy) del array de subviews
APT.View.prototype.subviews = function() {
    return this._subviews.slice(0);
};

APT.View.prototype.drawRect = function(rect) {
    rect = rect.$copy();
    // default implementation does nothing
};

APT.View.prototype.setNeedsDisplay = function() {
    this.drawRect(this.frame());
};

// getter and setters
APT.View.prototype.superview = function() {
    return this._superview;
};

// Cambia el identificador del objeto
APT.View.prototype.setTag = function(aTag) {
    this._tag = aTag;
};

// Recupero el identificador del objeto
APT.View.prototype.tag = function() {
    return this._tag;
};

// Cambia el del hidden
APT.View.prototype.setHidden = function(hidden) {
    if (hidden)
    {
        this._jqElement.hide();
    }
    else 
    {
        this._jqElement.show();
        this._jqElement.css("display", "block");
    }
};

// Recupera el valor del hidden
APT.View.prototype.isHidden = function() {
    return !(this._jqElement.is(":visible") || this._jqElement.css("display") === "block") || this._jqElement.css("display") === "none" || this._jqElement.css("visibility") === "hidden";
};

// Cambia el background color
APT.View.prototype.setBackgroundColor = function(aColor) {
    this._backgroundColor = aColor;
    if (aColor !== null)
    {
        this.jQElement().css("background-color", aColor.getHtmlValue().valueOf());
        this.jQElement().css("background", aColor.getHtmlValue().valueOf());
    }
};

// Recupera el valor del background
APT.View.prototype.backgroundColor = function() {
    if (this._backgroundColor !== null)
    {
        return this._backgroundColor.updateFromCSS(this.jQElement().css("background-color"), this.jQElement().css("opacity"));
    }
    
    return null;
};

// Devuelve el elemento HTML de JQuery, esto puede ser util para completar la traduccion y queremos manipular el HTML u objetos
APT.View.prototype.jQElement = function() {
    return this._jqElement;
};

// Cambia el elemento HTML de JQuery
// Markup estandar de vista: <div class=\"apt_view\"></div>
APT.View.prototype.setJQElement = function(jqElement) {
    var aux = $("<div></div>");
    aux.append(jqElement);
    
    this._jqElement = aux.trigger("create").children(1);
    this._jqElement.css("display", "block");
    if (this._jqElement.css("background-color") !== undefined)
    {
        var colAux = new APT.Color();
        colAux.updateFromCSS(this.jQElement().css("background-color"), this.jQElement().css("opacity"));
        this.setBackgroundColor(colAux);
    }
    // this.configureTouchEvents(this);
};

// Private method to configure the touch callbacks
APT.View.prototype.configureTouchEvents = function(view) {
    var downevent;
    var upevent;
    var moveevent;
    var cancelevent;
    var _aux = view;
    
    if (navigator.msPointerEnabled)
    {
        downevent = "MSPointerDown";
        upevent = "MSPointerUp";
        moveevent = "MSPointerMove";
        cancelevent = "MSPointerCancel";
    }
    else 
    {
        downevent = "touchstart";
        upevent = "touchend";
        moveevent = "touchmove";
        cancelevent = "touchcancel";
    }
    
    view._jqElement.on(downevent, function(event) {
        var e = new APT.Event();
        e._evnt = event;
        _aux.touchesBegan_withEvent(null, e);
        event.stopPropagation();
    });
    
    view._jqElement.on(moveevent, function(event) {
        var e = new APT.Event();
        e._evnt = event;
        _aux.touchesMoved_withEvent(null, e);
        event.stopPropagation();
    });
    
    view._jqElement.on(upevent, function(event) {
        var e = new APT.Event();
        e._evnt = event;
        _aux.touchesEnded_withEvent(null, e);
        event.stopPropagation();
    });
    
    view._jqElement.on(cancelevent, function(event) {
        var e = new APT.Event();
        e._evnt = event;
        _aux.touchesCancelled_withEvent(null, e);
        event.stopPropagation();
    });
    
    return view;
};

// Private method that takes care of insert subviews if they're included in the markup
APT.View.prototype.processNodes = function(dom, container) {
    
    dom.each(function(index, element) {
        var className = element.attributes["data-apt-class"];
        
        if (className !== undefined)
        {
            var subview = Object.create(APT[className.value]());
            var items;
            
            var markup = subview.getRenderMarkup();
            
            for (var i = 0; i < element.attributes.length; i++)
            {
                if (element.attributes[i].name !== "type")
                {
                    markup = markup.attr(element.attributes[i].name, element.attributes[i].nodeValue);
                }
            }
            
            var aux = jQuery(element).clone();
            
            switch(className.value)
            {
                case "Switch":
                    // buscamos si la option On esta seleccionada o no
                    if (aux.find("option[value='on']").attr("selected") !== "false")
                    {
                        markup.find("option[value='on']").attr("selected", "selected");
                    }
                    
                    break;
                    
                case "Slider":
                    // dentro del div buscamos el input y dentro de este el maximo, minimo y valor por defecto
                    var input = aux.find("input");
                    
                    markup.find("input").attr("max", input.attr("max"));
                    markup.find("input").attr("min", input.attr("min"));
                    markup.find("input").val(input.attr("value"));
                    break;
                    
                case "NavigationItem":
                    // buscamos los left y right BarButtonItem y se lo setteamos al item
                    var left = aux.find(".ui-btn-left");
                    var aButtonItem;
                    if (left.length === 1)
                    {
                        aButtonItem = new APT.BarButtonItem();
                        aButtonItem.defaultView().jQElement().attr("id", jQuery(left.children()[0]).attr("id"));
                        aButtonItem.setTitle(jQuery(left.children()[0]).text());
                        subview.setLeftBarButtonItem(aButtonItem);
                    }
                    
                    var right = aux.find(".ui-btn-right");
                    if (right.length === 1)
                    {
                        aButtonItem = new APT.BarButtonItem();
                        aButtonItem.defaultView().jQElement().attr("id", jQuery(right.children()[0]).attr("id"));
                        aButtonItem.setTitle(jQuery(right.children()[0]).text());
                        subview.setRightBarButtonItem(aButtonItem);
                    }
                    
                    var title = aux.find(".apt_navbar_title").text();
                    var prompt = aux.find(".apt_navbar_prompt").text();
                    
                    subview.initWithTitle(title);
                    subview.setPrompt(prompt);
                    
                    break;
                case "SearchBar":
                    // dentro del div buscamos el input y dentro de este el placeholder y valor por defecto
                    var input = aux.find("input");
                    
                    markup.find("input").attr("placeholder", input.attr("placeholder"));
                    markup.find("input").val(input.attr("value"));
                    break;
                    
                case "TabBar":
                case "ToolBar":
                    items = new Array();
                    container.processNodes(aux.children(), items);
                    break;
                    
                default:
                    var children = aux.children().detach();
                    var text = null;
                    
                    if (aux.text() !== undefined && aux.text().trim().length > 0)
                    {
                        markup.text(aux.text());
                    }
                    
                    var i = 0;
                    for (i = 0; i < children.length; i++)
                    {
                        if (jQuery(children[i]).text() !== undefined && jQuery(children[i]).text().trim().length > 0)
                        {
                            text = jQuery(children[i]).text();
                            break;
                        }
                    }
                    
                    if (text !== undefined && markup.children()[i] !== undefined)
                    {
                        jQuery(markup.children()[i]).text(text);
                    }
                    
                    break;
            }
            
            subview.setJQElement(markup);
            
            if (container instanceof APT.TableViewCell)
            {
                if (container.contentView() === null)
                {
                    container._contentView = subview;
                    container._contentView.setBackgroundColor(APT.Color.Transparent);
                    container.addSubview(subview);
                }
            }
            else 
            {
                if (container instanceof APT.NavigationBar && className.value !== "NavigationBar")
                {
                    container.pushNavigationItem_animated(subview, false);
                }
                else 
                {
                    if (container instanceof APT.TableView)
                    {
                        container.setTableHeaderView(subview);
                    }
                    else 
                    {
                        if (container instanceof Array)
                        {
                            if (subview instanceof APT.TabBarButtonDefault)
                            {
                                var tabBarItem = new APT.TabBarItem();
                                tabBarItem._tabBarButton = subview;
                                container.push(tabBarItem);
                            }
                            else 
                            {
                                if (subview instanceof APT.BarButtonDefault)
                                {
                                    var item = new APT.BarButtonItem();
                                    item._defaultView = subview;
                                    container.push(item);
                                }
                            }
                        }
                        else 
                        {
                            if (subview instanceof APT.TableViewCell)
                            {
                                container._jqElement.children("a").remove();
                            }
                            else 
                            {
                                if (subview instanceof APT.TabBar || subview instanceof APT.ToolBar)
                                {
                                    subview.setItems(items);
                                }
                            }
                            
                            container.addSubview(subview);
                        }
                    }
                }
            }
            
            console.log(className.value);
            // Recursive calling in case of child of childs
            
            if (jQuery(element).children().length > 0 && className.value === "View" || className.value === "ScrollView" || className.value === "TableViewCell" || className.value === "TableView" || className.value === "NavigationBar")
            {
                container.processNodes(jQuery(element).children(), subview);
            }
        }
    });
};

APT.View.prototype.setViewController = function(aViewController) {
    this._viewController = aViewController;
};

APT.View.prototype.viewController = function() {
    return this._viewController;
};

// Recupera el indice de la view, -1 en caso contrario
// @param aView La view a la cual queremos saber el indice
// @return      El indice del la view, -1 en caso contrario
APT.View.prototype.indexOfView = function(aView) {
    var len = this._subviews.length;
    for (var i = 0; i < len; i++)
    {
        if (this._subviews[i] === aView)
        {
            return i;
        }
    }
    
    return -1;
};

// Notifies the view controller that its view is about to be added to a view hierarchy.
APT.View.prototype.viewWillAppear = function(animated) {
    var subviewsLength = this._subviews.length;
    var subviewsArray = this._subviews.slice(0, subviewsLength);
    for (var i = 0; i < subviewsLength; i++)
    {
        var subview = subviewsArray[i];
        subview.viewWillAppear(animated);
    }
    
    if (this._viewController !== null)
    {
        this._viewController.viewWillAppear(animated);
    }
};

// Notifies the view controller that its view was added to a view hierarchy
APT.View.prototype.viewDidAppear = function(animated) {
    var subviewsLength = this._subviews.length;
    var subviewsArray = this._subviews.slice(0, subviewsLength);
    for (var i = 0; i < subviewsLength; i++)
    {
        var subview = subviewsArray[i];
        subview.viewDidAppear(animated);
    }
    
    if (this._viewController !== null)
    {
        this._viewController.viewDidAppear(animated);
    }
};

// Notifies the view controller that its view is about to be removed from a view hierarchy
APT.View.prototype.viewWillDisappear = function(animated) {
    var subviewsLength = this._subviews.length;
    var subviewsArray = this._subviews.slice(0, subviewsLength);
    for (var i = 0; i < subviewsLength; i++)
    {
        var subview = subviewsArray[i];
        subview.viewWillDisappear(animated);
    }
    
    if (this._viewController !== null)
    {
        this._viewController.viewWillDisappear(animated);
    }
};

// Notifies the view controller that its view was removed from a view hierarchy.
APT.View.prototype.viewDidDisappear = function(animated) {
    var subviewsLength = this._subviews.length;
    var subviewsArray = this._subviews.slice(0, subviewsLength);
    for (var i = 0; i < subviewsLength; i++)
    {
        var subview = subviewsArray[i];
        subview.viewDidDisappear(animated);
    }
    
    if (this._viewController !== null)
    {
        this._viewController.viewDidDisappear(animated);
    }
};

APT.View.prototype.removeFromSuperviewWithoutNotifying = function() {
    if (this.superview() !== null && this.superview().jQElement() !== null)
    {
        var index = this._superview.indexOfView(this);
        if (index > -1)
        {
            this._superview._subviews.splice(index, 1);
        }
        
        this.jQElement().detach();
        this._superview = null;
    }
};

APT.View.prototype.HTMLCanvas = function() {
    if (this._canvas === null)
    {
        this._canvas = new APT.Canvas();
        this.addSubview(this._canvas);
        this.layoutSubviews();
    }
    
    return this._canvas.jQElement()[0];
};

// Agrega una view a la lista de subviews del objeto sin notificar al ViewController
// @param child La view a ser agregada, esta es insertada al final del array
APT.View.prototype.addSubviewWithoutNotifying = function(child) {
    this.insertSubviewAtIndexWithoutNotifying(child, this._subviews.length);
};

// Inserta una view en el indice especificado sin notificar al ViewController
// @param aView   La view que se desea insertar
// @param anIndex El indice del array en el que uno desea insertar la view
APT.View.prototype.insertSubviewAtIndexWithoutNotifying = function(aView, anIndex) {
    var len = this._subviews.length;
    if (aView !== null && aView !== this && anIndex >= 0 && anIndex <= len)
    {
        if (aView.superview() !== null)
        {
            aView.removeFromSuperviewWithoutNotifying();
        }
        
        if (anIndex === len)
        {
            this._jqElement.append(aView.jQElement());
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

// Evento que se dispara cuando se toca el objeto
// @param touches
// @param e
APT.View.prototype.touchesBegan_withEvent = function(touches, e) {
};

// Evento que se dispara cuando se mueve un objeto a lo largo de la superficie
// @param touches
// @param e
APT.View.prototype.touchesMoved_withEvent = function(touches, e) {
};

// Evento que se dispara cuando se deja de tocar el objeto
// @param touches
// @param e
APT.View.prototype.touchesEnded_withEvent = function(touches, e) {
};

// Evento que se dispara cuando se interrumpe el touch event por algun evento externo
// @param touches
// @param e
APT.View.prototype.touchesCancelled_withEvent = function(touches, e) {
};

// Permite darle el foco a un elemento en caso de rotornar true, falso en caso contrario
APT.View.prototype.becomeFirstResponder = function() {
    return false;
};

// Permite sacar el foco a un elemento en caso de rotornar true, falso en caso contrario
APT.View.prototype.resignFirstResponder = function() {
    return false;
};

// Verifica si el widget esta agregado al dom
APT.View.prototype.isInDom = function() {
    return this.jQElement().parents("body").length === 1;
};


// VIEWCONTROLLER
