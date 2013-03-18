APT.createNamespace("APT");


APT.NavigationBarDelegate = function() {};

APT.NavigationBarDelegate.$inherits = function() {};

APT.NavigationBarDelegate.$init = function() {};


// NAVIGATION BAR
// La clase NavigationBar que hereda de View implementa un componente grafico para manejar la navegacion de contenido organizado jerarquicamente.
APT.NavigationBar = function() {
    if(this.constructor !== APT.NavigationBar) return new APT.NavigationBar();
    APT.NavigationBar.$inherits();
    APT.NavigationBar.$init.apply(this);
    return this;
};

APT.NavigationBar.$inherits = function() {
    APT.inherits(APT.NavigationBar, APT.View);
};

APT.NavigationBar.$init = function() {
    // instance fields
    this._title = null;
    this._prompt = null;
    this._stack = null;
    this._delegate = null;
    this._leftItemsDiv = null;
    this._centerItemsDiv = null;
    this._rightItemsDiv = null;
    this._leftItems = null;
    this._rightItems = null;
    this._backBarButtonItem = null;
    // call base class constructor
    APT.View.$init.apply(this);
};

APT.NavigationBar.prototype.$copy = function() {
    var copyObject = new APT.NavigationBar();
    copyObject._title = this._title;
    copyObject._prompt = this._prompt;
    copyObject._stack = this._stack;
    copyObject._delegate = this._delegate;
    copyObject._leftItemsDiv = this._leftItemsDiv;
    copyObject._centerItemsDiv = this._centerItemsDiv;
    copyObject._rightItemsDiv = this._rightItemsDiv;
    copyObject._leftItems = this._leftItems;
    copyObject._rightItems = this._rightItems;
    copyObject._backBarButtonItem = this._backBarButtonItem;
    return copyObject;
};

// Class constructor.
APT.NavigationBar.prototype.getRenderMarkup = function() {
    return $("<div data-role=\"header\" class=\"apt_navbar ui-header ui-bar-a\"></div>");
};

APT.NavigationBar.prototype.setJQElement = function(jqelement) {
    this._jqElement = jqelement.trigger("create");
    this._stack = APT.Global.CreateStack(null);
};

// Pushes the given navigation item onto the receiver?s stack and updates the navigation bar.
// @param aNavigationItem The navigation item to push on the stack
APT.NavigationBar.prototype.pushNavigationItem_animated = function(aNavigationItem, animated) {
    if (this._leftItemsDiv === null)
    {
        this.setNavigationItem(aNavigationItem);
    }
    
    var shouldPush = true;
    if (this._delegate !== null && eval("this._delegate.navigationBar_shouldPushItem != null && this._delegate.navigationBar_shouldPushItem != undefined && !this._delegate.navigationBar_shouldPushItem(this, aNavigationItem)"))
    {
        shouldPush = false;
    }
    
    if (shouldPush)
    {
        this._stack.push(aNavigationItem);
        aNavigationItem.setNavigationBar(this);
        this.displayItems(animated);
        
        if (this._delegate !== null && eval("this._delegate.navigationBar_didPushItem != null && this._delegate.navigationBar_didPushItem != undefined"))
        {
            eval("this._delegate.navigationBar_didPushItem(this, aNavigationItem)");
        }
    }
};

APT.NavigationBar.prototype.setNavigationItem = function(aNavigationItem) {
    this._leftItemsDiv = $(aNavigationItem.jQElement().children()[0]).clone();
    this._centerItemsDiv = $(aNavigationItem.jQElement().children()[1]).clone();
    this._rightItemsDiv = $(aNavigationItem.jQElement().children()[2]).clone();
    this._leftItemsDiv.controlgroup();
    this._leftItemsDiv.addClass("style_navigationItem");
    this._rightItemsDiv.controlgroup();
    this._rightItemsDiv.addClass("style_navigationItem");
    this._jqElement.append(this._leftItemsDiv);
    this._jqElement.append(this._centerItemsDiv);
    this._jqElement.append(this._rightItemsDiv);
    this._title = this._centerItemsDiv.find(".apt_navbar_title");
    this._prompt = this._centerItemsDiv.find(".apt_navbar_prompt");
};

// Pops the top item from the receiver?s stack and updates the navigation bar
// @return The top item that was popped
APT.NavigationBar.prototype.popNavigationItemAnimated = function(animated) {
    var poppedItem = this._stack.head();
    if (poppedItem === null)
    {
        return null;
    }
    
    var shouldPop = true;
    if (this._delegate !== null && eval("this._delegate.navigationBar_shouldPopItem != null && this._delegate.navigationBar_shouldPopItem != undefined && ! this._delegate.navigationBar_shouldPopItem(this, poppedItem)"))
    {
        shouldPop = false;
    }
    
    if (shouldPop)
    {
        this._stack.pop();
        poppedItem.setNavigationBar(null);
        this.displayItems(animated);
        
        if (this._delegate !== null && eval("this._delegate.navigationBar_didPopItem != null && this._delegate.navigationBar_didPopItem != undefined"))
        {
            eval("this._delegate.navigationBar_didPopItem(this, poppedItem)");
        }
    }
    
    return poppedItem;
};

// The navigation item at the top of the navigation bar?s stack
// @return The navigation item
APT.NavigationBar.prototype.topItem = function() {
    return this._stack.head();
};

// The navigation item that is immediately below the topmost item on navigation bar?s stack.
// @return The navigation item that is immediately below the topmost ite
APT.NavigationBar.prototype.backItem = function() {
    return this._stack.second();
};

// Sets the navigation bar?s delegate object
APT.NavigationBar.prototype.setDelegate = function(aDelegate) {
    this._delegate = aDelegate;
};

// Gets the navigation bar?s delegate object
APT.NavigationBar.prototype.delegate = function() {
    return this._delegate;
};

// Replaces the navigation items currently managed by the navigation bar with the specified items.
// @param itemArray
APT.NavigationBar.prototype.setItems = function(itemArray) {
    this.setItems_animated(itemArray, false);
};

// Reemplaza los valores de la pila de NavigationItems con los objetos contenidos en el array pasado como parametro
// @param itemArray El arreglo de NavigationItems
// @param animated true si el cambio es animado, sino false
APT.NavigationBar.prototype.setItems_animated = function(itemArray, animated) {
    if (this._leftItemsDiv === null && itemArray.length > 0)
    {
        this.setNavigationItem(itemArray.objectAtIndex(0));
    }
    
    this._stack = APT.Global.CreateStack(itemArray);
    this.displayItems(animated);
};

// An array of navigation items managed by the navigation bar
APT.NavigationBar.prototype.items = function() {
    return this._stack;
};

// Actualiza el titulo de la barra de navegacion.
APT.NavigationBar.prototype.displayCenterItems = function() {
    this.setupTitle();
};

// Actualiza el estado de los botones a la izquierda de la barra de navegacion.
// @param animated true si se realiza el cambio con animacion, sino false.
APT.NavigationBar.prototype.displayLeftItems = function(animated) {
    var topItem = this._stack.head();
    if (topItem.leftBarButtonItems() !== null && topItem.leftBarButtonItems() !== undefined)
    {
        this.setupLeftItems(topItem.leftBarButtonItems(), animated);
    }
};

// Actualiza el estado de los botones a la derecha de la barra de navegacion.
// @param animated true si se realiza el cambio con animacion, sino false.
APT.NavigationBar.prototype.displayRightItems = function(animated) {
    var topItem = this._stack.head();
    
    if (topItem.rightBarButtonItems() !== null && topItem.rightBarButtonItems() !== undefined)
    {
        this.setupRightItems(topItem.rightBarButtonItems(), animated);
    }
};

// Actualiza el estado de la barra de navegacion con los valores del ultimo NavigationItem de la pila de navegacion.
APT.NavigationBar.prototype.displayItems = function(animated) {
    if (this._stack.length > 0)
    {
        var topItem = this._stack.head();
        var backItem = this._stack.second();
        
        this.setupBackButton();
        this.setupTitle();
        this.setupLeftItems(topItem.leftBarButtonItems(), animated);
        this.setupRightItems(topItem.rightBarButtonItems(), animated);
    }
};

// Dibuja el backButton de la NavigationBar segun los datos en el NavigationItem actual.
APT.NavigationBar.prototype.setupBackButton = function() {
    if (this._stack.length > 1)
    {
        var topItem = this._stack.head();
        var aBarButtonItem = topItem.backBarButtonItem();
        this._backBarButtonItem = new APT.BackBarButtonDefault();
        if (aBarButtonItem !== null && aBarButtonItem !== undefined && aBarButtonItem.title() !== null && aBarButtonItem.title() !== undefined)
        {
            this._backBarButtonItem.setText(aBarButtonItem.title().valueOf());
            this._backBarButtonItem.addTarget_action_forControlEvents(aBarButtonItem, "triggerTargetAction", APT.ControlEvent.vmouseup);
        }
        else 
        {
            this._backBarButtonItem.setText("Back");
            this._backBarButtonItem.addTarget_action_forControlEvents(this, "_apt_NavigationItem_backButtonClicked", APT.ControlEvent.vmouseup);
        }
    }
    else 
    {
        this._backBarButtonItem = null;
    }
};

// Dibuja el titulo de la barra de navegacion segun los datos en el NavigationItem actual.
APT.NavigationBar.prototype.setupTitle = function() {
    var topItem = this._stack.head();
    this._prompt.children().detach();
    this._title.children().detach();
    if (topItem.prompt() !== null && topItem.prompt().trim().length > 0)
    {
        this._prompt.text(topItem.prompt().valueOf());
    }
    else 
    {
        this._prompt.text("");
    }
    
    if (topItem.titleView() !== null)
    {
        this._title.append(topItem.titleView().jQElement());
    }
    else 
    {
        if (topItem.title() !== null && topItem.title().trim().length > 0)
        {
            this._title.text(topItem.title().valueOf());
        }
        else 
        {
            this._title.text("");
        }
    }
};

// Dibuja los BarButtonItems de la derecha en la barra de navegacion segun los datos en el NavigationItem actual.
// @param rightButtonItems El vector de BarButtonItems a mostrar a la derecha en la barra de navegacion.
// @param animated Indica si el cambio es animado o no.
APT.NavigationBar.prototype.setupRightItems = function(rightButtonItems, animated) {
    var thisNavBar = this;
    
    if (animated)
    {
        
        this._rightItemsDiv.fadeOut(200, function() {
            thisNavBar.removeRightItems();
            if (rightButtonItems !== null && rightButtonItems !== undefined)
            {
                thisNavBar.addRightItems(rightButtonItems, animated);
            }
        });
    }
    else 
    {
        this._rightItemsDiv.hide();
        this.removeRightItems();
        if (rightButtonItems !== null && rightButtonItems !== undefined)
        {
            thisNavBar.addRightItems(rightButtonItems, animated);
        }
    }
};

// Dibuja los BarButtonItems de la izquierda en la barra de navegacion segun los datos en el NavigationItem actual.
// @param rightButtonItems El vector de BarButtonItems a mostrar a la izquierda en la barra de navegacion.
// @param animated Indica si el cambio es animado o no.
APT.NavigationBar.prototype.setupLeftItems = function(leftButtonItems, animated) {
    var thisNavBar = this;
    if (animated)
    {
        
        this._leftItemsDiv.fadeOut(200, function() {
            thisNavBar.removeLeftItems();
            if (leftButtonItems !== null && leftButtonItems !== undefined)
            {
                thisNavBar.addLeftItems(leftButtonItems, animated);
            }
        });
    }
    else 
    {
        this._leftItemsDiv.hide();
        thisNavBar.removeLeftItems();
        if (leftButtonItems !== null && leftButtonItems !== undefined)
        {
            thisNavBar.addLeftItems(leftButtonItems, animated);
        }
    }
};

// Metodo a agregar como action del BackButtonItem de la barra de navegacion.
APT.NavigationBar.prototype._apt_NavigationItem_backButtonClicked = function() {
    this.popNavigationItemAnimated(false);
};

// Sobrescribe el metodo para dar formato a la navigation bar una ves que se agrega al DOM
APT.NavigationBar.prototype.viewDidAppear = function(animated) {
    this.$super_viewDidAppear(animated);
    this.displayItems(animated);
};

// Elimina los botones de la izquierda en la barra de navegacion.
APT.NavigationBar.prototype.removeLeftItems = function() {
    this._leftItemsDiv.children().detach();
};

APT.NavigationBar.prototype.addBackButtonItem = function(aBarButtonItem) {
    aBarButtonItem.defaultView().jQElement().hide();
    this._leftItemsDiv.prepend(aBarButtonItem.defaultView().jQElement());
    aBarButtonItem.defaultView().jQElement().show();
};

// Elimina los botones de la derecha en la barra de navegacion.
APT.NavigationBar.prototype.removeRightItems = function() {
    this._rightItemsDiv.children().detach();
};

// Agrega los RightButtonItems al DOM a la derecha en la barra de navegacion. Los items se agregan de derecha a izquierda, esto es, el item 0 del arreglo es el item ubicado mas a la derecha entre los RightBarButtonitems y el ultimo item del arreglo es el ubicado mas a la izquierda entre los RightBarButtonitems.
// @param rightButtonItems El arreglo de BarButtonItems a ser agregado a la derecha de la barra de navegacion.
// @param animated Indica si el cambio es animado o no.
APT.NavigationBar.prototype.addRightItems = function(rightButtonItems, animated) {
    if (rightButtonItems !== null && rightButtonItems.length > 0)
    {
        var barButtonItem1 = null;
        for (var i = 0; i < rightButtonItems.length; i++)
        {
            barButtonItem1 = rightButtonItems[i];
            this.addRightItem(barButtonItem1);
        }
        
        if (animated)
        {
            var thisRightItemsDiv = this._rightItemsDiv;
            
            this._rightItemsDiv.fadeIn(200, function() {
                //thisRightItemsDiv.controlgroup();
            });
        }
        else 
        {
            this._rightItemsDiv.show();
            //this._rightItemsDiv.controlgroup();
        }
    }
};

// Agrega un ButtonItem al DOM a la derecha en la barra de navegacion. Si ya existen items a la derecha, el nuevo item se agrega a la izquierda de los agregados anteriormente.
// @param aBarButtonItem El BarButtonItem a ser agregado a la derecha de la barra de navegacion.
APT.NavigationBar.prototype.addRightItem = function(aBarButtonItem) {
    aBarButtonItem.defaultView().jQElement().show();
    this._rightItemsDiv.prepend(aBarButtonItem.defaultView().jQElement());
};

// Agrega los LeftButtonItems al DOM a la derecha en la barra de navegacion. Los items se agregan de izquierda a derecha, esto es, el item 0 del arreglo es el item ubicado mas a la izquierda entre los LeftBarButtonitems y el ultimo item del arreglo es el ubicado mas a la izquierda entre los LeftBarButtonItems.
// @param leftButtonItems El arreglo de BarButtonItems a ser agregado a la izquierda de la barra de navegacion.
// @param animated Indica si el cambio es animado o no.
APT.NavigationBar.prototype.addLeftItems = function(leftButtonItems, animated) {
    var topItem = this._stack.head();
    
    if (leftButtonItems !== null && leftButtonItems.length > 0)
    {
        if (topItem.leftItemsSupplementBackButton() && !topItem.hidesBackButton())
        {
            this.addBackButtonItem();
        }
        
        var barButtonItem1 = null;
        for (var i = 0; i < leftButtonItems.length; i++)
        {
            barButtonItem1 = leftButtonItems[i];
            this.addLeftItem(barButtonItem1);
        }
    }
    else 
    {
        if (!topItem.hidesBackButton())
        {
            this.addBackButtonItem();
        }
    }
    
    if (animated)
    {
        var thisLeftItemsDiv = this._leftItemsDiv;
        
        this._leftItemsDiv.fadeIn(200, function() {
            //thisLeftItemsDiv.controlgroup();
        });
    }
    else 
    {
        this._leftItemsDiv.show();
        //this._leftItemsDiv.controlgroup();
    }
};

// Agrega un BarButtonItem al DOM a la derecha en la barra de navegacion. Si ya existen items a la derecha, el nuevo item se agrega a la izquierda de los agregados anteriormente.
// @param aBarButtonItem El BarButtonItem a ser agregado a la derecha de la barra de navegacion.
APT.NavigationBar.prototype.addLeftItem = function(aBarButtonItem) {
    aBarButtonItem.defaultView().jQElement().show();
    this._leftItemsDiv.append(aBarButtonItem.defaultView().jQElement());
};

// Si el valor de la propiedad hidesBackButton del NavigationItem actual es igual a false entonces agrega el BackButtonItem al DOM, en caso de ser verdadera el metodo no realiza ninguna accion.
APT.NavigationBar.prototype.addBackButtonItem = function() {
    var topItem = this._stack.head();
    if (this._backBarButtonItem !== null && !topItem.hidesBackButton())
    {
        this._leftItemsDiv.prepend(this._backBarButtonItem.jQElement());
    }
};


