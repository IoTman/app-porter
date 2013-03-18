APT.createNamespace("APT");


APT.PickerViewDataSource = function() {};

APT.PickerViewDataSource.$inherits = function() {};

APT.PickerViewDataSource.$init = function() {};

APT.PickerViewDataSource.prototype.numberOfComponentsInPickerView = function(aPickerView) {};
APT.PickerViewDataSource.prototype.pickerView_numberOfRowsInComponent = function(aPickerView, component) {};

APT.PickerViewDelegate = function() {};

APT.PickerViewDelegate.$inherits = function() {};

APT.PickerViewDelegate.$init = function() {};


APT.PickerView = function() {
    if(this.constructor !== APT.PickerView) return new APT.PickerView();
    APT.PickerView.$inherits();
    APT.PickerView.$init.apply(this);
    return this;
};

APT.PickerView.$inherits = function() {
    APT.inherits(APT.PickerView, APT.View);
};

APT.PickerView.$init = function() {
    // instance fields
    this._parameters = new Array();
    this._picker = new Array();
    this._delegate = null;
    this._dataSource = null;
    // call base class constructor
    APT.View.$init.apply(this);
    this._parameters["preset"] = new String("select");
    this._parameters["theme"] = new String("default");
    this._parameters["display"] = new String("inline");
    this._parameters["mode"] = new String("scroller");
    this._parameters["inputClass"] = new String("i-txt");
};

APT.PickerView.prototype.$copy = function() {
    var copyObject = new APT.PickerView();
    copyObject._parameters = this._parameters;
    copyObject._picker = this._picker;
    copyObject._delegate = this._delegate;
    copyObject._dataSource = this._dataSource;
    return copyObject;
};

// int _numberOfComponents;
// Class constructor.
APT.PickerView.prototype.getRenderMarkup = function() {
    return $("<div><div style='float:left;'><select style=\"display:none\"></div></div>");
};

// Cambia el elemento HTML de JQuery
// Markup estandar de vista: <div><div style='float:left;'><select style=\"display:none\"></div></div>
APT.PickerView.prototype.setJQElement = function(jqelement) {
    this._jqElement = jqelement.trigger("create");
};

// Devuelve en n?mero de componentes del pickerView.
// @return n?mero de componentes.
APT.PickerView.prototype.numberOfComponents = function() {
    return this.getDataSource().numberOfComponentsInPickerView(this);
};

// Devuelve el n?mero de filas del componente pasado por par?metro
// @Param component int con indice del componente
// @return cantidad de filas de un componente.
APT.PickerView.prototype.numberOfRowsInComponent = function(component) {
    return this.getDataSource().pickerView_numberOfRowsInComponent(this, component);
};

// Devuelve el ancho y alto predefenidos para cada fila y columna.
// @Param component int con indice del componente.
// @return un size que representa los limites de cada elemento del pickerView.
APT.PickerView.prototype.rowSizeForComponent = function(component) {
    var height = 0;
    var width = 0;
    if (eval("this.getDelegate()[\"pickerView_rowHeightForComponent\"] != undefined"))
    {
        height = parseFloat(eval("this.getDelegate()[\"pickerView_rowHeightForComponent\"](this, component)"));
        this._parameters["height"] = new String(height);
    }
    else 
    {
        height = 40;
    }
    
    if (eval("this.getDelegate()[\"pickerView_widthForComponent\"] != undefined"))
    {
        width = parseFloat(eval("this.getDelegate()[\"pickerView_widthForComponent\"](this, component)"));
        this._parameters["width"] = new String(width);
    }
    else 
    {
        width = 80;
    }
    
    return APT.Size(height, width);
};

// Agregamos funcionalidad al evento onChange
APT.PickerView.prototype.addTarget_action_forControlEvents = function(targetObject, selector, controlEvents) {
    var eventHandler = function(event) {
        targetObject[selector.valueOf()](event);
    };
    
    this._parameters["onChange"] = eventHandler;
    this.jQElement().scroller("destroy");
    var eventName = "." + selector;
    (this.jQElement().scroller(this._parameters)).on("change" + eventName, eventHandler);
};

// Removemos el evento onChange
APT.PickerView.prototype.removeTarget_action_forControlEvents = function(targetObject, selector, controlEvents) {
    this._parameters["onChange"] = null;
    this.jQElement().scroller("destroy");
    var eventName = "." + selector;
    (this.jQElement().scroller(this._parameters)).off("change" + eventName);
};

// settea el objeto Delegate del PickerView. Se realiza la carga del componente.
// @Param aDelegate delegado a setear
APT.PickerView.prototype.setDelegate = function(aDelegate) {
    this._delegate = aDelegate;
    if (this._delegate !== null)
    {
        var pickerView = this;
        var $that = this;
        var eventHandler = function() {
            var aux = jQuery($that).scroller("getValue");
            var comp = 0;
            
            for (var i = 0; i < pickerView._picker.length; i++)
            {
                if ($that === pickerView._picker[i].find("select")[0])
                {
                    comp = i;
                    break;
                }
            }
            
            aux = aux[0].replace("_", "");
            
            pickerView._delegate.pickerView_didSelectRow_inComponent(pickerView, parseInt(aux), comp);
        };
        
        this._parameters["onChange"] = eventHandler;
        this.jQElement().find("select").scroller("destroy");
        (this.jQElement().find("select").scroller(this._parameters)).on("change", eventHandler);
    }
};

// Devuelve el objeto Delegate del PickerView.
// @return PickerViewDelegate que es el delegado del pickerView.
APT.PickerView.prototype.getDelegate = function() {
    return this._delegate;
};

APT.PickerView.prototype.selectRowInComponentAnimated = function(row, component, animated) {
    var values = ["_" + row];
    if (animated)
    {
        $(this.jQElement().find("select")[component]).scroller("setValue", values, false, 1);
    }
    else 
    {
        $(this.jQElement().find("select")[component]).scroller("setValue", values);
    }
};

APT.PickerView.prototype.selectedRowInComponent = function(component) {
    var aux = $(this.jQElement().find("select")[component]).scroller("getValue");
    return parseInt((aux[0]).replace("_", ""));
};

// settea el objeto data source del PickerView
// @Param aDataSource DataSource a setear
APT.PickerView.prototype.setDataSource = function(aDataSource) {
    this._dataSource = aDataSource;
};

// devuelve el objeto data source del PickerView.
// @return PickerViewDataSource que es el data source del pickerView.
APT.PickerView.prototype.getDataSource = function() {
    return this._dataSource;
};

APT.PickerView.prototype.pickerView_didSelectRow_inComponent = function(aPickerView, row, aIndexComponent) {
};

// override js.view method.
APT.PickerView.prototype.viewDidAppear = function(animated) {
    this.reloadAllComponents();
    this.$super_viewDidAppear(animated);
};

// Recarga todos los componentes del pickerview.
APT.PickerView.prototype.reloadAllComponents = function() {
    var title;
    
    if (this.getDataSource() !== null && eval("this.getDataSource()[\"pickerView_numberOfRowsInComponent\"] != undefined"))
    {
        this.jQElement().css("width", "100%");
        this.jQElement().scroller("destroy");
        var cantComponent = this.getDataSource().numberOfComponentsInPickerView(this);
        for (var i = 0; i < cantComponent; i++)
        {
            if (i === 0)
            {
                $(this.jQElement().children(1)).remove();
            }
            
            this._picker.push(this.getRenderMarkup().children(1));
            this.jQElement().append(this._picker[i]);
            
            if (eval("this.getDataSource()[\"pickerView_numberOfRowsInComponent\"] != undefined"))
            {
                var cantRows = this.getDataSource().pickerView_numberOfRowsInComponent(this, i);
                if (this.getDelegate() !== null)
                {
                    for (var j = 0; j < cantRows; j++)
                    {
                        if (eval("this.getDelegate()[\"pickerView_titleForRow_forComponent\"] != undefined"))
                        {
                            title = eval("this.getDelegate()[\"pickerView_titleForRow_forComponent\"](this, j, i)");
                            var jqPicker = $("<option value=\"" + j + "\">" + title + "</option>");
                            $(this.jQElement().find("select")[i]).append(jqPicker);
                        }
                    }
                }
            }
            
            $(this.jQElement().find("select")[i]).scroller(this._parameters);
            this.jQElement().find("input").css("display", "none");
            $(".dw").css("background", "transparent");
            $(".dw").css("margin", "0px");
            $(".dw").css("padding", "0px");
            $(".dwl").css("display", "none");
        }
    }
};


