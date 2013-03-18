APT.createNamespace("APT");


APT.DatePicker = function() {
    if(this.constructor !== APT.DatePicker) return new APT.DatePicker();
    APT.DatePicker.$inherits();
    APT.DatePicker.$init.apply(this);
    return this;
};

APT.DatePicker.$inherits = function() {
    APT.inherits(APT.DatePicker, APT.Control);
};

APT.DatePicker.$init = function() {
    // instance fields
    this._maximumDate = null;
    this._minimumDate = null;
    this._date = null;
    this._parameters = new Array();
    // call base class constructor
    APT.Control.$init.apply(this);
};

APT.DatePicker.prototype.$copy = function() {
    var copyObject = new APT.DatePicker();
    copyObject._maximumDate = this._maximumDate;
    copyObject._minimumDate = this._minimumDate;
    copyObject._date = this._date;
    copyObject._parameters = this._parameters;
    return copyObject;
};

// Cambia el elemento HTML de JQuery
// Markup estandar de vista: <div><input type='text' style='display:none'/></div>
APT.DatePicker.prototype.getRenderMarkup = function() {
    return $("<div><input type='text' style='display:none'/></div>");
};

APT.DatePicker.prototype.setJQElement = function(jqelement) {
    this._date = new Date();
    var text = jqelement.text();
    if (text.length > 0)
    {
        var mode = parseInt(text);
        switch(mode)
        {
            case 0:
                this._parameters["preset"] = new String("time");
                break;
            case 1:
                this._parameters["preset"] = new String("date");
                break;
            case 2:
                this._parameters["preset"] = new String("datetime");
                break;
        }
        
        jqelement.text("");
    }
    else 
    {
        this._parameters["preset"] = new String("datetime");
    }
    
    this._jqElement = jqelement.trigger("create");
    
    this._parameters["theme"] = new String("ios");
    this._parameters["display"] = new String("inline");
    this._parameters["mode"] = new String("scroller");
    
    this.jQElement().scroller(this._parameters);
};

// Recuperamos el valor del date
APT.DatePicker.prototype.date = function() {
    var mode = this._parameters["preset"];
    var aux;
    if (this.jQElement().scroller("getDate") === undefined)
    {
        this.setDate(this._date, false);
    }
    
    aux = this.jQElement().scroller("getDate");
    
    switch(mode.valueOf())
    {
        case "datetime":
            this._date = aux;
            break;
        case "time":
            this._date.setMinutes(aux.getMinutes());
            this._date.setHours(aux.getHours());
            break;
        case "date":
            this._date.setDate(aux.getDate());
            this._date.setMonth(aux.getMonth());
            this._date.setFullYear(aux.getFullYear());
            break;
    }
    
    return this._date;
};

// Cambiamos el valor del date de acuerdo al modo que estemos viendo
APT.DatePicker.prototype.setDate = function(aDate, animated) {
    this._date = aDate;
    var mode = this._parameters["preset"];
    this.rebootComponent();
    
    switch(mode.valueOf())
    {
        case "datetime":
            if (animated)
            {
                this.jQElement().scroller("setDate", aDate, false, 1);
            }
            else 
            {
                this.jQElement().scroller("setDate", aDate, false);
            }
            
            break;
        case "time":
            var min = aDate.getMinutes();
            var hh = aDate.getHours();
            var ampm = 0;
            if (hh > 12)
            {
                hh = hh - 12;
                ampm = 1;
            }
            
            var values = [hh, min, ampm];
            if (animated)
            {
                this.jQElement().scroller("setValue", values, false, 1);
            }
            else 
            {
                this.jQElement().scroller("setValue", values);
            }
            
            break;
        case "date":
            var day = aDate.getDate();
            var month = aDate.getMonth();
            var year = aDate.getFullYear();
            aDate = new Date(month + "/" + day + "/" + year);
            if (animated)
            {
                this.jQElement().scroller("setDate", aDate, false, 1);
            }
            else 
            {
                this.jQElement().scroller("setDate", aDate, false);
            }
            
            break;
    }
};

// Devuelve la fecha maxima que puede contener el componente
// @return la fecha maxima del componente
APT.DatePicker.prototype.maximumDate = function() {
    return this._maximumDate;
};

// Cambia la fecha maxima del componente
// @param aMaximumDate valor que nos permite cambiar la fecha
APT.DatePicker.prototype.setMaximumDate = function(aMaximumDate) {
    this._maximumDate = aMaximumDate;
    this._parameters["maxDate"] = this._maximumDate;
    this.rebootComponent();
};

// Devuelve la fecha minima que puede contener el componente
// @return la fecha minima del componente
APT.DatePicker.prototype.minimumDate = function() {
    return this._minimumDate;
};

// Cambia la fecha minima del componente
// @param aMinimumDate valor que nos permite cambiar la fecha
APT.DatePicker.prototype.setMinimumDate = function(aMinimumDate) {
    this._minimumDate = aMinimumDate;
    this._parameters["minDate"] = this._minimumDate;
    this.rebootComponent();
};

// Devuelve el modo en el que estamos visualizando el componente
// @return el modo en el que estamos visualizando el componente
APT.DatePicker.prototype.datePickerMode = function() {
    var mode = this._parameters["preset"];
    switch(mode.valueOf())
    {
        case "datetime":
            return APT.DatePickerMode.DateAndTime;
            break;
        case "time":
            return APT.DatePickerMode.Time;
            break;
        case "date":
            return APT.DatePickerMode.Date;
            break;
    }
};

// Cambiamos el modo con el que visualizamos el componente
APT.DatePicker.prototype.setDatePickerMode = function(aDatePickerMode) {
    var mode;
    switch(aDatePickerMode)
    {
        case APT.DatePickerMode.DateAndTime:
            mode = "datetime";
            break;
        case APT.DatePickerMode.Time:
            mode = "time";
            break;
        case APT.DatePickerMode.Date:
            mode = "date";
            break;
    }
    
    this._parameters["preset"] = mode;
    this.rebootComponent();
};

// Agregamos funcionalidad al evento onChange
APT.DatePicker.prototype.addTarget_action_forControlEvents = function(targetObject, selector, controlEvents) {
    var eventHandler = function(event) {
        targetObject[selector.valueOf()](event);
    };
    
    this._parameters["onChange"] = eventHandler;
    this.jQElement().scroller("destroy");
    var eventName = "." + selector;
    (this.jQElement().scroller(this._parameters)).on("change" + eventName, eventHandler);
};

// Removemos el evento onChange
APT.DatePicker.prototype.removeTarget_action_forControlEvents = function(targetObject, selector, controlEvents) {
    this._parameters["onChange"] = null;
    this.jQElement().scroller("destroy");
    var eventName = "." + selector;
    (this.jQElement().scroller(this._parameters)).off("change" + eventName);
};

APT.DatePicker.prototype.rebootComponent = function() {
    this.jQElement().scroller("destroy");
    this.jQElement().scroller(this._parameters);
};


// DICTIONARY							From NSDictionary
