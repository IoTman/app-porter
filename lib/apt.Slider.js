APT.createNamespace("APT");


APT.Slider = function() {
    if(this.constructor !== APT.Slider) return new APT.Slider();
    APT.Slider.$inherits();
    APT.Slider.$init.apply(this);
    return this;
};

APT.Slider.$inherits = function() {
    APT.inherits(APT.Slider, APT.Control);
};

APT.Slider.$init = function() {
    // instance fields
    this._continuous = true;
    this._targetObject = new Array();
    this._selector = new Array();
    // call base class constructor
    APT.Control.$init.apply(this);
};

APT.Slider.prototype.$copy = function() {
    var copyObject = new APT.Slider();
    copyObject._continuous = this._continuous;
    copyObject._targetObject = this._targetObject;
    copyObject._selector = this._selector;
    return copyObject;
};

// Cambia el elemento HTML de JQuery
// Markup estandar de vista: <div><input type=\"range\" value=\"0\" min=\"0\" max=\"1\" data-highlight=\"true\" style=\"display:none;\"/></div>
APT.Slider.prototype.getRenderMarkup = function() {
    return $("<div><input type=\"range\" value=\"0\" min=\"0\" max=\"1\" data-highlight=\"true\" style=\"display:none;\"/></div>");
};

// Inicializa el componente slider
APT.Slider.prototype.setJQElement = function(jqelement) {
    this._jqElement = jqelement.trigger("create");
    this.jQElement().find("input").slider();
};

// Modifica el avance del componente slider.
// @param value El valor que indica la posici?n del slider.
APT.Slider.prototype.setValue = function(value) {
    for (var i = 0; i < this._selector.length; i++)
    {
        this.removeTarget_action_forControlEventsPrivate(this._targetObject[i], this._selector[i], APT.ControlEvent.ValueChanged);
    }
    
    var jqSlider = this.jQElement().find("input");
    jqSlider.val(new String(value));
    jqSlider.slider("refresh");
    for (var i = 0; i < this._selector.length; i++)
    {
        this.addTarget_action_forControlEventsPrivate(this._targetObject[i], this._selector[i], APT.ControlEvent.ValueChanged);
    }
};

// Retorna el estado de avance del componente slider.
// @return     el valor que indica la posici?n del slider.
APT.Slider.prototype.value = function() {
    var jqSlider = this.jQElement().find("input");
    return parseFloat(jqSlider.val());
};

// Retorna el valor del limite inferior del componente slider.
// @return     el valor que indica el limite inferior del componente slider.
APT.Slider.prototype.minimumValue = function() {
    var jqSlider = this.jQElement().find("input");
    return parseFloat(jqSlider.attr("min"));
};

// Modifica el limite inferior del componente slider.
// @param minimumValue El valor que representa el limite inferior del componente slider.
APT.Slider.prototype.setMinimumValue = function(minimumValue) {
    var jqSlider = this.jQElement().find("input");
    jqSlider.attr("min", new String(minimumValue));
    jqSlider.slider("refresh");
};

// Retorna el limite superior del componente slider.
// @return     el valor que indica el limite superior del componente slider.
APT.Slider.prototype.maximumValue = function() {
    var jqSlider = this.jQElement().find("input");
    return parseFloat(jqSlider.attr("max"));
};

// Modifica el limite superior del componente slider.
// @param maximumValue El valor que representa el limite superior del componente slider.
APT.Slider.prototype.setMaximumValue = function(maximumValue) {
    var jqSlider = this.jQElement().find("input");
    jqSlider.attr("max", new String(maximumValue));
    jqSlider.slider("refresh");
};

// Retorna el estado de la property continuous.
// @return     el valor de la property continuous.
APT.Slider.prototype.continuous = function() {
    return this._continuous;
};

// Modifica el valor de la property continuous.
// @param continuous El valor de la property continuous.
APT.Slider.prototype.setContinuous = function(continuous) {
    this._continuous = continuous;
    for (var i = 0; i < this._selector.length; i++)
    {
        this.removeTarget_action_forControlEventsPrivate(this._targetObject[i], this._selector[i], APT.ControlEvent.ValueChanged);
    }
    
    for (var i = 0; i < this._selector.length; i++)
    {
        this.addTarget_action_forControlEventsPrivate(this._targetObject[i], this._selector[i], APT.ControlEvent.ValueChanged);
    }
};

// Metodo heredado de UIControl. Se sobreescribe para modificar funcionalidad de agregado los eventos vmouseup y ControlEventValueChanged. Actualiza adem?s el array _selector y _targetObject.
APT.Slider.prototype.addTarget_action_forControlEvents = function(targetObject, selector, controlEvents) {
    if (APT.ControlEvent.ValueChanged & controlEvents)
    {
        this._targetObject.push(targetObject);
        this._selector.push(selector);
    }
    
    if (!this._continuous)
    {
        var $that = this;
        var eventHandler = function(event) {
            if (jQuery($that).attr("disable") !== "disable")
            {
                targetObject[selector.valueOf()](event);
            }
        };
        
        if (selector !== null && selector !== undefined && selector.valueOf() !== "")
        {
            var eventName = "." + selector;
            if (APT.ControlEvent.ValueChanged & controlEvents)
            {
                var children = this.jQElement().find(".ui-slider");
                this.jQElement().on("vmouseup" + eventName, eventHandler);
                children.on("vmouseup" + eventName, eventHandler);
            }
            else 
            {
                this.$super_addTarget_action_forControlEvents(targetObject, selector, controlEvents);
            }
        }
    }
    else 
    {
        this.$super_addTarget_action_forControlEvents(targetObject, selector, controlEvents);
    }
};

// Metodo heredado de UIControl. Se sobreescribe para modificar funcionalidad para eventos vmouseup o ControlEventValueChanged.
APT.Slider.prototype.sendActionsForControlEvents = function(controlEvents) {
    if (!this._continuous)
    {
        if (APT.ControlEvent.ValueChanged & controlEvents)
        {
            this.jQElement().trigger("vmouseup");
        }
    }
    else 
    {
        this.$super_sendActionsForControlEvents(controlEvents);
    }
};

// Metodo heredado de UIControl. Se sobreescribe para modificar funcionalidad de remover los eventos vmouseup o ControlEventValueChanged. Actualiza adem?s el array _selector y _targetObject.
APT.Slider.prototype.removeTarget_action_forControlEvents = function(targetObject, selector, controlEvents) {
    if (this._selector.length === 0 && selector !== null && selector !== undefined && selector.valueOf() !== "")
    {
        this.$super_removeTarget_action_forControlEvents(targetObject, selector, controlEvents);
    }
    
    for (var i = 0; i < this._selector.length; i++)
    {
        if (this._selector[i] === selector && this._targetObject[i] === targetObject)
        {
            if (!this._continuous && (APT.ControlEvent.ValueChanged & controlEvents))
            {
                if (selector !== null && selector !== undefined && selector.valueOf() !== "")
                {
                    var eventName = "." + selector;
                    var children = this.jQElement().find(".ui-slider");
                    this.jQElement().off("vmouseup" + eventName);
                    children.off("vmouseup" + eventName);
                }
            }
            else 
            {
                this.$super_removeTarget_action_forControlEvents(targetObject, selector, controlEvents);
            }
            
            this._selector.splice(i, 1);
            this._targetObject.splice(i, 1);
        }
    }
};

// Metodo auxiliar. Se utiliza para dar soporte a los metodos setContinuous y setValue activando la escucha de todos los eventos ControlEventValueChanged o mouseUp. Se llamar? tantas veces como items tenga el array _selector.
APT.Slider.prototype.addTarget_action_forControlEventsPrivate = function(targetObject, selector, controlEvents) {
    if (!this._continuous)
    {
        var $that = this;
        var eventHandler = function(event) {
            if (jQuery($that).attr("disable") !== "disable")
            {
                targetObject[selector.valueOf()](event);
            }
        };
        
        if (selector !== null && selector !== undefined && selector.valueOf() !== "")
        {
            var eventName = "." + selector;
            if (APT.ControlEvent.ValueChanged & controlEvents)
            {
                var children = this.jQElement().find(".ui-slider");
                this.jQElement().on("vmouseup" + eventName, eventHandler);
                children.on("vmouseup" + eventName, eventHandler);
            }
            else 
            {
                this.$super_addTarget_action_forControlEvents(targetObject, selector, controlEvents);
            }
        }
    }
    else 
    {
        this.$super_addTarget_action_forControlEvents(targetObject, selector, controlEvents);
    }
};

// Metodo auxiliar. Se utiliza para dar soporte a los metodos setContinuous y setValue desactivando la escucha de todos los eventos ControlEventValueChanged o mouseUp. Se llamar? tantas veces como items tenga el array _selector.
APT.Slider.prototype.removeTarget_action_forControlEventsPrivate = function(targetObject, selector, controlEvents) {
    if (!this._continuous)
    {
        if (selector !== null && selector !== undefined && selector.valueOf() !== "")
        {
            var eventName = "." + selector;
            if (APT.ControlEvent.ValueChanged & controlEvents)
            {
                var children = this.jQElement().find(".ui-slider");
                this.jQElement().off("vmouseup" + eventName);
                children.off("vmouseup" + eventName);
            }
            else 
            {
                this.$super_removeTarget_action_forControlEvents(targetObject, selector, controlEvents);
            }
        }
    }
    else 
    {
        this.$super_removeTarget_action_forControlEvents(targetObject, selector, controlEvents);
    }
};


