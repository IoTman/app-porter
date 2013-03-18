APT.createNamespace("APT");


APT.PageControl = function() {
    if(this.constructor !== APT.PageControl) return new APT.PageControl();
    APT.PageControl.$inherits();
    APT.PageControl.$init.apply(this);
    return this;
};

APT.PageControl.$inherits = function() {
    APT.inherits(APT.PageControl, APT.Control);
};

APT.PageControl.$init = function() {
    // instance fields
    this._currentPage = 0;
    this._defersCurrentPageDisplay = false;
    this._hidesForSinglePage = false;
    this._numberOfPages = 0;
    // call base class constructor
    APT.Control.$init.apply(this);
};

APT.PageControl.prototype.$copy = function() {
    var copyObject = new APT.PageControl();
    copyObject._currentPage = this._currentPage;
    copyObject._defersCurrentPageDisplay = this._defersCurrentPageDisplay;
    copyObject._hidesForSinglePage = this._hidesForSinglePage;
    copyObject._numberOfPages = this._numberOfPages;
    return copyObject;
};

// PageControl: Permite crear y manejar el control de paginas. El control de paginas esta representado como una sucesion de puntos,
// donde cada uno corresponde a una pagina de la aplicacion. La pagina catual se identifica con el punto de color diferente al resto.
APT.PageControl.prototype.getRenderMarkup = function() {
    return $("<div data-role='controlgroup' data-type='horizontal'></div>");
};

// Cambia el elemento HTML de JQuery
// Markup estandar de vista: <div data-role='controlgroup' data-type='horizontal'></div>
APT.PageControl.prototype.setJQElement = function(jqelement) {
    var text = jqelement.text();
    jqelement.text("");
    this._jqElement = jqelement.controlgroup();
    if (text.length > 0)
    {
        this.setNumberOfPages(parseInt(text));
    }
};

// Devuelve la p?gina corriente, identificado con un punto resaltado.
// @return entero que indica la p?gina corriente.
APT.PageControl.prototype.currentPage = function() {
    return this._currentPage;
};

// Cambia la p?gina corriente.
// @param newPage indica la nueva p?gina corriente.
APT.PageControl.prototype.setCurrentPage = function(newPage) {
    this._currentPage = newPage;
    this.sendActionsForControlEvents(APT.ControlEvent.ValueChanged);
};

// Indica si la p?gina corriente se actualiza o no.
// @return boolean. si el valor es True la nueva p?gina corriente no se actualiza automaticamente al hacer click.
// si el valor es False, la nueva p?gina corriente se actualiza de inmediato.
APT.PageControl.prototype.defersCurrentPageDisplay = function() {
    return this._defersCurrentPageDisplay;
};

// Permite controlar cuando la p?gina coriente se debe mostrar.
// @param value si es True la nueva p?gina corriente no se actualiza automaticamente al hacer click.
// si value es False, la nueva p?gina corriente se actualiza de inmediato.
APT.PageControl.prototype.setDefersCurrentPageDisplay = function(value) {
    this._defersCurrentPageDisplay = value;
};

// Indica si el indicador de paginas debe mostrarse o no cuando solo hay una p?gina.
// @return boolean. devuelve TRUE si se debe ocultar el indicador de paginas cuando solo hay una p?gina.
// devuelve FALSE si se debe mostrar el indicador de paginas cuando hay solo una.
APT.PageControl.prototype.hidesForSinglePage = function() {
    return this._hidesForSinglePage;
};

// Permite controlar si el indicador de paginas debe mostrarse o no cuando solo hay una p?gina.
// @param value. si value es TRUE se debe ocultar el indicador de paginas cuando solo hay una p?gina.
// Si value es FALSE se debe mostrar el indicador de paginas cuando solo hay una.
APT.PageControl.prototype.setHidesForSinglePage = function(value) {
    this._hidesForSinglePage = value;
    if (value && this.numberOfPages() === 1)
    {
        this.setHidden(true);
    }
};

// Devuelve el numero de paginas que deben mostrarse (como puntos).
// @return int que indica la cantidad de paginas.
APT.PageControl.prototype.numberOfPages = function() {
    return this._numberOfPages;
};

// Modifica la cantidad de paginas que se muestran, como puntos, en el controlador de paginas.
// Se crea un div para cada punto que representa una p?gina a mostrar. Se cambia el atributo 'class' de cada div para distinguir la p?gina corriente (el punto seleccionado) del resto.
// Las clases que los representan se encuentras definidas en un archivo .css.
// @param pageCount indica la cantidad de paginas a mostrar.
APT.PageControl.prototype.setNumberOfPages = function(pageCount) {
    this._numberOfPages = pageCount;
    var pageControl = this;
    var srcImg;
    
    for (var i = 0; i < pageCount; i++)
    {
        srcImg = "";
        if (i === 0)
        {
            srcImg = "apt_pageControl_selectedPage";
        }
        else 
        {
            srcImg = "apt_pageControl_notSelectedPage";
        }
        
        var radio = $("<div class='" + srcImg + "' value='" + String(i) + "' " + "id='div" + String(i) + "'/>");
        var $that = this;
        var eventHandler = function(event) {
            event.stopPropagation();
            
            var val = parseInt(jQuery($that).index());
            var current = pageControl.currentPage();
            
            if ((current === val || current - 1 === val || current + 1 === val) && current !== val)
            {
                if (!pageControl.defersCurrentPageDisplay())
                {
                    jQuery($that).parent().children().attr("class", "apt_pageControl_notSelectedPage");
                    jQuery($that).attr("class", "apt_pageControl_selectedPage");
                }
                
                pageControl.setCurrentPage(val);
            }
            else 
            {
                if (current < val - 1)
                {
                    current = current + 1;
                }
                else 
                {
                    if (current > val)
                    {
                        current = current - 1;
                    }
                }
                
                event.preventDefault();
                var buttons = jQuery($that).parent().children();
                event.currentTarget = buttons[current];
                event.target = buttons[current];
                jQuery(buttons[current]).trigger("vmousedown", event);
            }
        };
        
        radio.on("vmousedown", eventHandler);
        this.jQElement().find(".ui-controlgroup-controls").append(radio);
    }
    
    this.jQElement().find(".ui-controlgroup-controls").attr("style", "margin-right: auto; margin-left: auto; width: 8em;");
};

// Devuelve el tama?o minimo que se necesita para mostrar cierta cantidad de paginas.
// @param pageCount numero de paginas para las cuales se deben calcular los limites.
APT.PageControl.prototype.sizeForNumberOfPages = function(pageCount) {
    var width = 6 * this._numberOfPages + 10 * (this._numberOfPages - 1);
    return APT.Size(width, 36);
};

// Actualiza el indicador de p?gina a la p?gina corriente.
APT.PageControl.prototype.updateCurrentPageDisplay = function() {
    this.jQElement().find(".ui-controlgroup-controls").children().attr("class", "apt_pageControl_notSelectedPage");
    $(this.jQElement().find(".ui-controlgroup-controls").children()[this.currentPage()]).attr("class", "apt_pageControl_selectedPage");
};


