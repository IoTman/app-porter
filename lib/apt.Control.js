APT.createNamespace("APT");


APT.Control = function() {
    if(this.constructor !== APT.Control) return new APT.Control();
    APT.Control.$inherits();
    APT.Control.$init.apply(this);
    return this;
};

APT.Control.$inherits = function() {
    APT.inherits(APT.Control, APT.View);
};

APT.Control.$init = function() {
    // call base class constructor
    APT.View.$init.apply(this);
};

// Class constructor.
APT.Control.prototype.setJQElement = function(jqelement) {
    var aux = $("<div></div>");
    aux.append(jqelement);
    this._jqElement = aux.trigger("create").children(1);
};

// Dispara el evento pasado como parametro en el control.
// Internamente verifica cual es el evento de javascript que corresponde al ControlEvent pasado como parametro y lo dispara mediante la funcion 'trigger' de jquery.
// @param controlEvents Uno o mas eventos del control. Ver clase ControlEvents
APT.Control.prototype.sendActionsForControlEvents = function(controlEvents) {
    if (APT.ControlEvent.vmousedown & controlEvents)
    {
        this.jQElement().trigger("vmousedown");
    }
    
    if (APT.ControlEvent.vmouseover & controlEvents)
    {
        this.jQElement().trigger("vmouseover");
    }
    
    if (APT.ControlEvent.vmouseup & controlEvents)
    {
        this.jQElement().trigger("vmouseup");
    }
    
    if (APT.ControlEvent.vmousecancel & controlEvents)
    {
        this.jQElement().trigger("vmousecancel");
    }
    
    if (APT.ControlEvent.focus & controlEvents)
    {
        this.jQElement().trigger("focus");
    }
    
    if (APT.ControlEvent.change & controlEvents)
    {
        this.jQElement().trigger("change");
    }
    
    if (APT.ControlEvent.blur & controlEvents)
    {
        this.jQElement().trigger("blur");
    }
    
    if (APT.ControlEvent.ValueChanged & controlEvents)
    {
        this.jQElement().trigger("change");
    }
};

// Vincula un objeto y una accion (un metodo a ejecutar sobre el objeto) con un tipo de evento especifico.
// Internamente verifica el evento de javascript que corresponde al ControlEvent pasado como parametro y utiliza la funcion 'on' de jquery para asignar la funcion al evento. Como es posible agregar mas de una accion a un evento, se utiliza la capacidad de la funcion 'on' de agregar nombres (por ejemplo: $('#button1').on('click.name', function() { ... }); ) a los metodos asignados a un evento en particular y asi poder eliminar independientemente las acciones con el metodo 'removeTarget_action_forControlEvents' sin afectar otras posibles acciones para el mismo evento. Particularmente el nombre que se utiliza es el nombre de la funcion a ejecutar. En el caso que se agreguen dos metodos con el mismo nombre pero de objetos distintos como accion a un evento, se eliminaran ambos al utilizar el metodo 'removeTarget_action_forControlEvents', es posible que esto cambie en el futuro.
// @param targetObject El objeto sobre el que se ejecuta la accion cuando se dispara el evento
// @param selector El nombre de un metodo a ejecutar sobre el objeto "targetObject" cuando se dispara el evento
// @param controlEvents Uno o mas eventos del control. Ver clase ControlEvents
APT.Control.prototype.addTarget_action_forControlEvents = function(targetObject, selector, controlEvents) {
    var $that = this;
    var eventHandler = function(event) {
        if (jQuery($that).attr("disabled") !== "disabled")
        {
            targetObject[selector.valueOf()](event);
        }
        
        event.stopPropagation();
    };
    
    if (selector !== null && selector !== undefined && selector.valueOf() !== "")
    {
        var eventName = "." + selector;
        
        if (APT.ControlEvent.vmousedown & controlEvents)
        {
            this.jQElement().on("vmousedown" + eventName, eventHandler);
        }
        
        if (APT.ControlEvent.vmouseover & controlEvents)
        {
            this.jQElement().on("vmouseover" + eventName, eventHandler);
        }
        
        if (APT.ControlEvent.vmouseup & controlEvents)
        {
            this.jQElement().on("vmouseup" + eventName, eventHandler);
        }
        
        if (APT.ControlEvent.vmousecancel & controlEvents)
        {
            this.jQElement().on("vmousecancel" + eventName, eventHandler);
        }
        
        if (APT.ControlEvent.focus & controlEvents)
        {
            this.jQElement().on("focus" + eventName, eventHandler);
        }
        
        if (APT.ControlEvent.change & controlEvents)
        {
            this.jQElement().on("change" + eventName, eventHandler);
        }
        
        if (APT.ControlEvent.blur & controlEvents)
        {
            this.jQElement().on("blur" + eventName, eventHandler);
        }
        
        if (APT.ControlEvent.ValueChanged & controlEvents)
        {
            this.jQElement().on("change" + eventName, eventHandler);
        }
    }
};

// Desvincula un objeto y una accion de uno o mas eventos del control .
// Internamente verifica cual es el evento de javascript que corresponde al ControlEvent pasado como parametro y elimina la accion ingresada de dicho evento mediante la funcion 'off' de jquery. Como es posible agregar mas de una accion a un evento, se utiliza la capacidad de la funcion 'off' de agregar nombres (por ejemplo: $('button').off('click.name'); ) a los metodos asignados a un evento en particular y asi poder eliminar independientemente las acciones asignadas con el metodo 'addTarget_action_forControlEvents' sin afectar otras posibles acciones para el mismo evento. Particularmente el nombre que se utiliza es el nombre de la funcion a ejecutar por lo tanto, si se agreguan dos metodos con el mismo nombre pero de objetos de distinto tipo como accion a un evento, se eliminaran ambos al utilizar el metodo 'removeTarget_action_forControlEvents', es posible que esto cambie en el futuro. Para mas informacion visitar: http://api.jquery.com/off/
// @param targetObject El objeto sobre el que se ejecuta la accion cuando se dispara el evento
// @param selector El metodo del objeto "targetObject" a desvincular del evento del control
// @param controlEvents Uno o mas eventos del control. Ver clase ControlEvents
APT.Control.prototype.removeTarget_action_forControlEvents = function(targetObject, selector, controlEvents) {
    var eventName = "";
    if (selector !== null && selector !== undefined)
    {
        eventName = "." + selector;
    }
    
    if (APT.ControlEvent.vmousedown & controlEvents)
    {
        this.jQElement().off("vmousedown" + eventName);
    }
    
    if (APT.ControlEvent.vmouseover & controlEvents)
    {
        this.jQElement().off("vmouseover" + eventName);
    }
    
    if (APT.ControlEvent.vmouseup & controlEvents)
    {
        this.jQElement().off("vmouseup" + eventName);
    }
    
    if (APT.ControlEvent.vmousecancel & controlEvents)
    {
        this.jQElement().off("vmousecancel" + eventName);
    }
    
    if (APT.ControlEvent.focus & controlEvents)
    {
        this.jQElement().off("focus" + eventName);
    }
    
    if (APT.ControlEvent.change & controlEvents)
    {
        this.jQElement().off("change" + eventName);
    }
    
    if (APT.ControlEvent.blur & controlEvents)
    {
        this.jQElement().off("blur" + eventName);
    }
    
    if (APT.ControlEvent.ValueChanged & controlEvents)
    {
        this.jQElement().off("change" + eventName);
    }
};

// Retorna el estado de la property enabled.
// @return     el valor de la property enabled.
APT.Control.prototype.isEnabled = function() {
    var aEnabled = this.jQElement().attr("disabled");
    if (aEnabled === "disabled")
    {
        return false;
    }
    else 
    {
        return true;
    }
};

// Modifica el valor de la property enabled.
// @param continuous El valor de la property enabled.
APT.Control.prototype.setEnabled = function(enabled) {
    if (enabled)
    {
        this.jQElement().removeClass("ui-disabled");
        this.jQElement().removeAttr("disabled");
    }
    else 
    {
        this.jQElement().addClass("ui-disabled");
        this.jQElement().attr("disabled", "disabled");
    }
};


