APT.createNamespace("APT");


APT.SearchBarDelegate = function() {};

APT.SearchBarDelegate.$inherits = function() {};

APT.SearchBarDelegate.$init = function() {};

APT.SearchBarDelegate.prototype.searchBarCancelButtonClicked = function(aSearchBar) {};
APT.SearchBarDelegate.prototype.searchBar_textDidChange = function(aSearchBar, aSearchText) {};

APT.SearchBar = function() {
    if(this.constructor !== APT.SearchBar) return new APT.SearchBar();
    APT.SearchBar.$inherits();
    APT.SearchBar.$init.apply(this);
    return this;
};

APT.SearchBar.$inherits = function() {
    APT.inherits(APT.SearchBar, APT.View);
};

APT.SearchBar.$init = function() {
    // instance fields
    this._delegate = null;
    this._showsCancelButton = false;
    this._cancelBtn = null;
    // call base class constructor
    APT.View.$init.apply(this);
};

APT.SearchBar.prototype.$copy = function() {
    var copyObject = new APT.SearchBar();
    copyObject._delegate = this._delegate;
    copyObject._showsCancelButton = this._showsCancelButton;
    copyObject._cancelBtn = this._cancelBtn;
    return copyObject;
};

// Cambia el elemento HTML de JQuery
// Markup estandar de vista: <div class='style_markup_searchBar'><input data-type='search'></div>
APT.SearchBar.prototype.getRenderMarkup = function() {
    return $("<div class='style_markup_searchBar'><input data-type='search'></div>");
};

APT.SearchBar.prototype.setJQElement = function(jqelement) {
    this._jqElement = jqelement;
    this.jQElement().find("input").textinput();
    var targetObject = this;
    
    this.jQElement().find("input").on("change", function(event) {
        targetObject["searchValueChange"](event);
        event.stopPropagation();
    });
};

// Cambia el SearchBarDelegate object.
// @param aDelegate - un objetopara cargar como delegate, debe ser del tipo js::APT::SearchBarDelegateef.
APT.SearchBar.prototype.setDelegate = function(aDelegate) {
    this._delegate = aDelegate;
};

// Recupera el SearchBarDelegate object.
// @return a js::APT::SearchBarDelegateef con el objeto delegate.
APT.SearchBar.prototype.delegate = function() {
    return this._delegate;
};

// Cambia el Texto del busqueda.
// @param aText - texto a cargar en el campo de busqueda.
APT.SearchBar.prototype.setText = function(aText) {
    this.jQElement().find("input").val(aText);
};

// Recupera el Texto del busqueda.
// @return a js::Stringef con el texto de Busqueda.
APT.SearchBar.prototype.text = function() {
    return this.jQElement().find("input").val();
};

// Cambia el Texto del placeholder.
// @param aText - texto a cargar como placeholder.
APT.SearchBar.prototype.setPlaceholder = function(aText) {
    this.jQElement().find("input").attr("placeholder", aText);
};

// Recupera el Texto del placeholder.
// @return a js::Stringef con el texto del placeholder.
APT.SearchBar.prototype.placeholder = function() {
    if (this.jQElement().find("input").attr("placeholder"))
    {
        return this.jQElement().find("input").attr("placeholder");
    }
    
    return null;
};

// Cambia si se debe mostrar el boton Cancel o no.
// @param aValue - a bool indicando si debe mostrarse el boton Cancel.
APT.SearchBar.prototype.setShowsCancelButton = function(aValue) {
    if (aValue)
    {
        if (this._cancelBtn === null)
        {
            this._cancelBtn = APT.Button.buttonWithType(APT.ButtonType.RoundedRect);
            this._cancelBtn.jQElement().css("width", "100px");
            this._cancelBtn.setTitle("Cancel");
            this._cancelBtn.jQElement().addClass("btn-search-bar-cancel");
            this._cancelBtn.jQElement().css("display", "inline-block");
            
            this._cancelBtn.addTarget_action_forControlEvents(this, "cancelBtnClicked", APT.ControlEvent.vmousedown);
            var jqContent = this.jQElement();
            
            this.jQElement().find(".ui-input-search").css("position", "absolute");
            
            var theScreen = APT.Screen.MainScreen();
            var widthTemp = theScreen.applicationFrame().size.width - 140;
            
            this._jqElement.find(".ui-input-search").css("width", widthTemp);
            this._cancelBtn.jQElement().css("margin-left", widthTemp + 5);
            
            jqContent.append(this._cancelBtn.jQElement());
        }
    }
    else 
    {
        if (this._cancelBtn !== null)
        {
            this._cancelBtn.removeTarget_action_forControlEvents(this, "cancelBtnClicked", APT.ControlEvent.vmousedown);
            this._cancelBtn.jQElement().remove();
            this._cancelBtn = null;
            this._jqElement.find(".ui-input-search").css("width", APT.Screen.MainScreen().applicationFrame().size.width);
        }
    }
};

// Indica si se esta mostrando el Boton Cancel.
// @return a bool indicando si el boton Cancel se esta mostrando.
APT.SearchBar.prototype.showsCancelButton = function() {
    var result = false;
    var jqContent = this.jQElement().find(".btn-search-bar-cancel");
    result = jqContent !== null && jqContent.length !== 0;
    return result;
};

// Metodo que escucha el evento vmousedown del boton cancel.
// @param ev - el evento registrado
APT.SearchBar.prototype.cancelBtnClicked = function(ev) {
    if (this.delegate() !== null)
    {
        this.delegate().searchBarCancelButtonClicked(this);
    }
};

// Metodo que escucha el evento vmousedown del Texto de busqueda.
// @param ev - el evento registrado
APT.SearchBar.prototype.searchValueChange = function(ev) {
    if (this.delegate() !== null)
    {
        this.delegate().searchBar_textDidChange(this, this.text());
    }
};


// La clase APT.SegmentedControl provee un Control horizontal compuesto por multiples botones llamados segmentos y donde solo uno puede ser seleccionado al mismo tiempo.
// Cada segmento puede incluir una imagen o un texto. Una vez creado el SegmentedControl, se pueden deshabilitar, agregar o quitar segmentos programaticamente.
