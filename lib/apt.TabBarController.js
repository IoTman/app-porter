APT.createNamespace("APT");


APT.TabBarControllerDelegate = function() {};

APT.TabBarControllerDelegate.$inherits = function() {};

APT.TabBarControllerDelegate.$init = function() {};


// Esta clase implementa un ViewController especializado que provee una interfaz del tipo menu seleccionable o menu con pestanias.\n La interfaz que provee esta clase consta de una TabBar en la parte inferior de la pantalla  que funciona como menu y una vista activa que incluye el contenido personalizado a mostrar.\n Cada item de la TabBar esta asociado a un ViewController por lo que cada ves que el usuario selecciona un item en la TabBar la vista activa cambia por la de su ViewController asociado.\n La clase APT.TabBarController no esta pensada para que el programador realize subclases, sino que provee el funcionamiento completo, aunque este puede ser personalizado mediante su objeto delegado.
APT.TabBarController = function() {
    if(this.constructor !== APT.TabBarController) return new APT.TabBarController();
    APT.TabBarController.$inherits();
    APT.TabBarController.$init.apply(this);
    return this;
};

APT.TabBarController.$inherits = function() {
    APT.inherits(APT.TabBarController, APT.ViewController);
};

APT.TabBarController.$init = function() {
    // instance fields
    this._delegate = null;
    this._tabBar = new APT.TabBar();
    this._viewControllers = null;
    this._selectedViewController = null;
    this._maxTabBarItems = 5;
    this._moreNavigationController = null;
    this._moreListController = null;
    // call base class constructor
    APT.ViewController.$init.apply(this);
    this._moreListController = new APT.MoreListController();
    this._moreNavigationController = new APT.MoreNavigationController();
    this._moreNavigationController.initWithRootViewController(this._moreListController);
};

APT.TabBarController.prototype.$copy = function() {
    var copyObject = new APT.TabBarController();
    copyObject._delegate = this._delegate;
    copyObject._tabBar = this._tabBar;
    copyObject._viewControllers = this._viewControllers;
    copyObject._selectedViewController = this._selectedViewController;
    copyObject._maxTabBarItems = this._maxTabBarItems;
    copyObject._moreNavigationController = this._moreNavigationController;
    copyObject._moreListController = this._moreListController;
    return copyObject;
};

APT.TabBarController._tabBarDefaultHeight = 49;

// Constructor de la clase. Inicializa el objeto con todas las propiedades en null salvo por la propiedad TabBar.
// Devuelve un NavigationController que es utilizado para mostrar una interfaz de seleccion para los ViewControllers que no se muestran en la TabBar porque la longitud del arreglo viewControllers supera el maximo de items permitido en la TabBar (por defecto 5).
// No debe agregarse manualmente este controlador a la TabBar, la clase TabBarController agrega la pestania automaticamente, tampoco debe buscarse ni intentar agregar este controlador en el arreglo viewControllers.
// Este objeto puede utilizarse para seleccionar como activo el MoreNavigationViewController en el TabBarController o para que el delegado prevenenga su seleccion en el metodo tabBarController_shouldSelectViewController().
APT.TabBarController.prototype.moreNavigationController = function() {
    return this._moreNavigationController;
};

// Asigna un objeto delegado al TabBarController.
// @param aDelegate Un objeto que implementa la interfaz APT.TabBarControllerDelegate.
APT.TabBarController.prototype.setDelegate = function(aDelegate) {
    this._delegate = aDelegate;
};

// Devuelve el objeto delegado del TabBarController.
// @return El objeto delegado.
APT.TabBarController.prototype.delegate = function() {
    return this._delegate;
};

// Devuelve el objeto APT.TabBar asociado al controlador. El programador nunca de intentar modificar la TabBar a traves del DOM o de esta propiedad. Para agregar items a la TabBar se deben agregar uno o mas objetos del tipo apt.ViewController a la propiedad "viewControllers" de APT.TabBarController.
// @return El TabBar asociado al controlador.
APT.TabBarController.prototype.tabBar = function() {
    return this._tabBar;
};

// Devuelve una copia del array de objetos APT.ViewController. Por defecto devuelve null.
// @return Un arreglo con los ViewControllers agregados al TabBarController.
APT.TabBarController.prototype.viewControllers = function() {
    if (this._viewControllers !== null && this._viewControllers !== undefined)
    {
        return this._viewControllers.slice(0);
    }
    else 
    {
        return null;
    }
};

// Elimina todos los viewControllers del controlador y establece los nuevos incluidos en el arreglo "viewControlles" pasado como parametro. Ademas modifica los items de la TabBar segun los valores de la propiedad "tabBarItem" de cada ViewController incluido en el arreglo. El orden de los items de la tabBar es el mismo que el orden en el arreglo. Por ultimo asocia los ViewControllers con el TabBarController.
// @param viewControllers Un arreglo con los ViewControllers a agregar al TabBarController.
APT.TabBarController.prototype.setViewControllers = function(viewControllers) {
    if (viewControllers !== null && viewControllers !== undefined)
    {
        this._viewControllers = viewControllers.slice(0);
        this._moreListController.setViewControllers(this._viewControllers);
        this._moreNavigationController.popToRootViewControllerAnimated(false);
        var items = new Array();
        if (viewControllers.length > this._maxTabBarItems)
        {
            for (var i = 0; i < this._maxTabBarItems - 1; i++)
            {
                (this._viewControllers[i]).setTabBarController(this);
                items.push((this._viewControllers[i]).tabBarItem());
            }
            
            items.push(this._moreNavigationController.tabBarItem());
        }
        else 
        {
            for (var i = 0; i < this._viewControllers.length; i++)
            {
                (this._viewControllers[i]).setTabBarController(this);
                items.push((this._viewControllers[i]).tabBarItem());
            }
        }
        
        this._tabBar.setItems(items);
        this.setSelectedIndex(0);
    }
};

// Devuelve el ViewController asociado a la pestania seleccionada en la TabBar del TabBarController.
// @return El ViewController seleccionado.
APT.TabBarController.prototype.selectedViewController = function() {
    return this._selectedViewController;
};

// Selecciona un ViewController en el TabBarController, esto provoca que se seleccione el item asociado en la TabBar y se muestre la vista del ViewController en la pantalla.
// Si el parametro selectedViewController no esta incluido en el arreglo viewControllers, se selecciona el elemento 0 de viewControllers.
// Si el parametro selectedViewController es nulo se selecciona el elemento 0 del arreglo viewControllers pero se asigna null a la propiedad selectedViewController.
// Si el arreglo viewControllers es nulo se asigna null a selectedViewController sin importar el valor asignado.
// @param selectedViewController El ViewController a seleccionar.
APT.TabBarController.prototype.setSelectedViewController = function(selectedViewController) {
    var index = 0;
    
    if (this.isSelectableViewController(selectedViewController))
    {
        this.selectController(selectedViewController);
    }
    else 
    {
        if (this.areViewControllers())
        {
            this._selectedViewController = this._viewControllers[0];
            this._tabBar.setSelectedItem(this._selectedViewController.tabBarItem());
            this.showContentViewController(this._selectedViewController, true);
            if (selectedViewController === null)
            {
                this._selectedViewController = null;
            }
        }
        else 
        {
            this._selectedViewController = null;
        }
    }
};

// Devuelve el indice en el arreglo viewControllers del ViewController seleccionado.
// Si a la propiedad selectedViewController se le asigna un valor null o el arreglo viewControllers es null, entonces el metodo devuelve APT.Global.NotFound (-1).
// @return El indice del ViewController seleccionado, representado como un numero entero de 0 a n-1 siendo n la longitud del arreglo viewControllers.
APT.TabBarController.prototype.selectedIndex = function() {
    var result = APT.Global.NotFound;
    if (this.areViewControllers() && this._selectedViewController !== null && this._selectedViewController !== undefined)
    {
        result = this._viewControllers.indexOf(this._selectedViewController);
    }
    
    return result;
};

// Selecciona un ViewController y su TabBarItem asociado segun el indice en el arreglo viewControllers.
// Si el indice es menor que 0 o mayor que la longitud del arreglo viewControllers entonces se selecciona el ViewController de indice 0.
// @param selectedIndex El indice del ViewController a seleccionar en el arreglo viewControllers.
APT.TabBarController.prototype.setSelectedIndex = function(selectedIndex) {
    if (this.areViewControllers())
    {
        if (selectedIndex < 0 || selectedIndex >= this._viewControllers.length)
        {
            selectedIndex = 0;
        }
        
        if (this._viewControllers.length > this._maxTabBarItems && selectedIndex >= this._maxTabBarItems - 1)
        {
            this._tabBar.setSelectedItem(this._moreNavigationController.tabBarItem());
            this._selectedViewController = this._viewControllers[selectedIndex];
            this._moreNavigationController.popToRootViewControllerAnimated(false);
            this._moreNavigationController.pushViewController_animated(this._selectedViewController, false);
            this.showContentViewController(this._moreNavigationController, true);
        }
        else 
        {
            this._tabBar.setSelectedItem((this._viewControllers[selectedIndex]).tabBarItem());
            this._selectedViewController = this._viewControllers[selectedIndex];
            this.showContentViewController(this._selectedViewController, true);
        }
    }
};

// La clase APT.TabBarController implementa el protocolo APT.TabBarDelegate y es asignado como delegado de su TabBar. Este metodo actualiza el ViewController activo cada ves que un item de la TabBar es seleccionado.
// @param tabBar La TabBar asociada al TabBarController.
// @param item El objeto tabBarItem seleccionado en la TabBar.
APT.TabBarController.prototype.tabBar_didSelectItem = function(tabBar, item) {
    this.setSelectedIndexNotifyingDelegate(tabBar, item);
};

// Sobreescribe el metodo heredado de la clase APT.ViewController. Inicializa las propiedades view y tabBar del TabBarController.
APT.TabBarController.prototype.loadView = function() {
    this.setView(new APT.View());
    this.view().jQElement().addClass("apt_tabBarControllerView");
    var screenBounds = APT.Screen.MainScreen().bounds();
    this.view().initWithFrame(screenBounds);
    var tabBarY = screenBounds.size.height - APT.TabBarController._tabBarDefaultHeight;
    this._tabBar.initWithFrame(APT.Rect.New(0, tabBarY, screenBounds.size.width, APT.TabBarController._tabBarDefaultHeight));
    this._tabBar.setDelegate(this);
    this.view().addSubview(this._tabBar);
};

// Sobreescribe el metodo heredado de la clase APT.ViewController. Muestra el view controller seleccionado antes de agregar al DOM a la propiedad view del TabBarController.
APT.TabBarController.prototype.viewWillAppear = function(animated) {
    var selectedViewController = this.selectedViewController();
    if (selectedViewController !== null && selectedViewController !== undefined)
    {
        if (this._viewControllers.length > this._maxTabBarItems && this._viewControllers.indexOf(selectedViewController) >= this._maxTabBarItems - 1)
        {
            this.showContentViewController(this._moreNavigationController, false);
        }
        else 
        {
            this.showContentViewController(selectedViewController, false);
        }
    }
    else 
    {
        if (this.areViewControllers())
        {
            this._tabBar.setSelectedItem((this._viewControllers[0]).tabBarItem());
            this.showContentViewController(this._viewControllers[0], false);
        }
    }
};

// Verifica que el objeto viewController se encuentra en el arreglo viewControllers.
// @param viewController El objeto ViewController.
// @return Devuelve true si el objeto viewController esta incluido en el arreglo viewControllers, de lo contrario devuelve false. En caso de que el arreglo vieControllers sea nulo devuelve false.
APT.TabBarController.prototype.isSelectableViewController = function(viewController) {
    var result = false;
    if (this.areViewControllers() && viewController !== null && viewController !== undefined)
    {
        result = this._viewControllers.indexOf(viewController) >= 0 || this._moreNavigationController === viewController;
    }
    
    return result;
};

// Verifica que el arreglo viewControllers sea distinto de null y que tenga al menos un elemento.
// return Devuelve true si el arreglo viewControllers contiene elementos, de lo contrario devuelve false.
APT.TabBarController.prototype.areViewControllers = function() {
    return this._viewControllers !== null && this._viewControllers !== undefined && this._viewControllers.length > 0;
};

// Muestra la vista del ViewController pasado como parametro en la interfaz del TabBarController. Este metodo es utilizado internamente por la clase cada ves que se cambia el ViewController seleccionado, ya sea por respuesta a la accion del usuario sobre la TabBar o porque se modifica programaticamente.
// @param viewController El ViewController que se desea mostrar, este objeto debe estar incluido en el arreglo viewControllers del objeto TabBarController.
// @param checkViewInDom Si es true el metodo debe verificar que la propiedad view del TabBarController se encuentra en el DOM antes de realizar alguna accion, en caso de recibir false el metodo no realiza ninguna verificacion y siempre ejecuta la accion.
APT.TabBarController.prototype.showContentViewController = function(viewController, checkViewInDom) {
    if (!checkViewInDom || this.view().isInDom())
    {
        var instanceOfTabBar = false;
        for (var i = 0; i < this.view().subviews().length; i++)
        {
            instanceOfTabBar = this.view().subviews()[i] instanceof APT.TabBar;
            if (!instanceOfTabBar)
            {
                (this.view().subviews()[i]).removeFromSuperview();
            }
        }
        
        if (viewController.view() !== null && viewController.view() !== undefined)
        {
            var contentHeight = this.view().frame().size.height - APT.TabBarController._tabBarDefaultHeight;
            viewController.view().setFrame(APT.Rect.New(0, 0, this.view().frame().size.width, contentHeight));
            this.view().addSubview(viewController.view());
        }
    }
};

// Verifica que el delegado sea distinto de null o undefined
APT.TabBarController.prototype.existDelegate = function() {
    return eval("this._delegate != null && this._delegate != undefined");
};

// Verifica que el metodo opcional tabBarController_shouldSelectViewController del protocolo APT.TabBarControllerDelegate este implementado en el objeto delegado.
APT.TabBarController.prototype.existDelegateShouldSelectViewControllerMethod = function() {
    return eval("this._delegate[\"tabBarController_shouldSelectViewController\"] != null && this._delegate[\"tabBarController_shouldSelectViewController\"] != undefined");
};

// Indica si un ViewController puede ser activado cuando el usuario selecciona un item en la TabBar. El metodo verifica que exista el objeto delegado y que implemente el metodo opcional tabBarController_shouldSelectViewController.
APT.TabBarController.prototype.mustActivateViewController = function(viewController) {
    return !this.existDelegateShouldSelectViewControllerMethod() || eval("this._delegate.tabBarController_shouldSelectViewController(this,  viewController)");
};

// Verifica que el metodo opcional tabBarController_didSelectViewController del protocolo APT.TabBarControllerDelegate este implementado en el objeto delegado.
APT.TabBarController.prototype.delegateHasDidSelectViewControllerMethod = function() {
    return eval("this._delegate[\"tabBarController_didSelectViewController\"] != null && this._delegate[\"tabBarController_didSelectViewController\"] != undefined");
};

// Consulta al objeto delegado si un ViewController puede pasar a estar activo en el TabBarController, en caso afirmativo selecciona el ViewController y notifica al delegado esta accion. Este metodo nunca debe ser utilizado por el programador, es utilizado internamente por el TabBarController para manejar la seleccion de un item de la TabBar por parte de un usuario de la aplicacion.
// @param tabBar La TabBar donde el usuario selecciona el item.
// @param item El TabBarItem seleccionado en la TabBar.
APT.TabBarController.prototype.setSelectedIndexNotifyingDelegate = function(tabBar, item) {
    var index = tabBar.items().indexOf(item);
    var viewController = null;
    
    if (this._moreNavigationController.tabBarItem() === item)
    {
        viewController = this._moreNavigationController;
    }
    else 
    {
        viewController = this.viewControllers()[index];
    }
    
    if (this.existDelegate())
    {
        if (this.mustActivateViewController(viewController))
        {
            this.setSelectedViewController(viewController);
            if (this.delegateHasDidSelectViewControllerMethod())
            {
                eval("this._delegate.tabBarController_didSelectViewController(this, viewController)");
            }
        }
        else 
        {
            viewController = this.selectedViewController();
            if (viewController === null || viewController === undefined)
            {
                viewController = this.viewControllers()[0];
            }
            
            tabBar.setSelectedItem(viewController.tabBarItem());
        }
    }
    else 
    {
        this.setSelectedViewController(viewController);
    }
};

// Selecciona como activo al viewController agregado como parametro, selecciona su pesta?a asociada en la TabBar y muestra su view segun corresponda.
// En el caso que el viewController se encuentre dentro de los controladores manejados por el MoreNavigationController, se selecciona el viewController, se agrega el controlador al MoreNavigationController y se muestra la vista de este ultimo, ademas se selecciona la pesta?a More.
// El objeto MoreNavigationController puede ser seleccionado directamente, en ese caso el metodo verifica que el MoreNavigationController no tenga agregado un ViewController y establese como seleccionado al MoreNavigationController del TabBarController y se asigna el valor APT.Global.NotFound a la propiedad selectedIndex .
// Si en cambio el MoreNavigationController tiene agregado un ViewController, el metodo actua igual que si recibiera el ViewController directamente.
// Este metodo no debe ser utilizado directamente por el programador.
// @param viewController El ViewController a seleccionar como activo en el TabBarController.
APT.TabBarController.prototype.selectController = function(viewController) {
    if (viewController === this._moreNavigationController)
    {
        this._tabBar.setSelectedItem(this._moreNavigationController.tabBarItem());
        if (this._moreNavigationController.topViewController() === this._moreListController)
        {
            this._selectedViewController = this._moreNavigationController;
        }
        else 
        {
            this._selectedViewController = this._moreNavigationController.topViewController();
        }
        
        this.showContentViewController(this._moreNavigationController, true);
    }
    else 
    {
        if (this._viewControllers.length > this._maxTabBarItems && this._viewControllers.indexOf(viewController) >= this._maxTabBarItems - 1)
        {
            this._tabBar.setSelectedItem(this._moreNavigationController.tabBarItem());
            this._selectedViewController = viewController;
            this._moreNavigationController.popToRootViewControllerAnimated(false);
            this._moreNavigationController.pushViewController_animated(viewController, false);
            this.showContentViewController(this._moreNavigationController, true);
        }
        else 
        {
            this._tabBar.setSelectedItem(viewController.tabBarItem());
            this._selectedViewController = viewController;
            this.showContentViewController(this._selectedViewController, true);
        }
    }
};

// void removeHoverClassFromButtons(js::APT::Viewef controllerView)
// {
// js::JQObjectef buttonHoverOrPushedList = controllerView.jQElement().find("[class^='ui-btn-hover-'],[class' ui-btn-hover-'],[class^='ui-btn-down-'],[class' ui-btn-down-']");
// buttonHoverOrPushedList.each(
// js::global::F {
// function () {
// js::JQObjectef thisJQObject = js::global::jQuery(this);
// js::DomElementef thisDomElement = this;
// if ((thisJQObject.@is("[class^='ui-btn-hover-']") || thisJQObject.@is("[class^=' ui-btn-hover-']"))
// && (thisJQObject.@is("[class^='ui-btn-down-']") || thisJQObject.@is("[class^=' ui-btn-down-']"))) {
// js::Stringef oldClassName = thisDomElement.className;
// js::Stringef newClassName = oldClassName.replace("ui-btn-hover-", "ui-btn-up-");
// //newClassName = newClassName.replace(new js::RegExp("/\ui-btn-down-.\b/g"), "");
// thisDomElement.className = newClassName;
// } else {
// thisJQObject[0].className = thisJQObject[0].className.replace("ui-btn-hover-"), "ui-btn-up-");
// thisJQObject[0].className = thisJQObject[0].className.replace("ui-btn-down-"), "ui-btn-up-");
// }
// };
// }
// );
// }

// La clase TabBarItem hereda de la clase APT.BarItem y representa un item o boton (BarItem) de la clase APT.TabBar. Los TabBarItems funcionan como RadioButtons de html es decir que solo puede haber un boton seleccionado al mismo tiempo dentro del mismo TabBar. La clase APT.TabBarItem consta de dos metodos inicializadores, initWithTitle_image_tag para crear un boton personalizado.
