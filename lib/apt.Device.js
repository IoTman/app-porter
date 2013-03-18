APT.createNamespace("APT");


APT.Device = function() {
    if(this.constructor !== APT.Device) return new APT.Device();
    APT.Device.$inherits();
    APT.Device.$init.apply(this);
    return this;
};

APT.Device.$inherits = function() {
    APT.inherits(APT.Device, Object);
};

APT.Device.$init = function() {
    // instance fields
    this._orientation = APT.DeviceOrientation.Unknown;
    this._notification = false;
    // call base class constructor
    Object.apply(this);
};

APT.Device.prototype.$copy = function() {
    var copyObject = new APT.Device();
    copyObject._orientation = this._orientation;
    copyObject._notification = this._notification;
    return copyObject;
};

// Class constructor.
// Setea la orientaci?n del dispositivo.
// @param orientation indica la orientaci?n del dispositivo.
APT.Device.prototype.setOrientation = function(orientation) {
    if (this._notification)
    {
        this._orientation = orientation;
    }
};

// Retorna la orientaci?n del dispositivo.
// @return     el valor que indica la orientaci?n.
APT.Device.prototype.orientation = function() {
    if (this._notification)
    {
        return this._orientation;
    }
    else 
    {
        return APT.DeviceOrientation.Unknown;
    }
};

// Activa la generaci?n de notificaciones seteando la propiedad notification.
APT.Device.prototype.beginGeneratingDeviceOrientationNotifications = function() {
    var $that = this;
    
    $(window).on("orientationchange", function(event) {
        if (event.orientation)
        {
            if (event.orientation === "portrait")
            {
                alert("Portrait");
                $that.setOrientation(APT.DeviceOrientation.Portrait);
            }
            else 
            {
                if (event.orientation === "landscape")
                {
                    alert("landscape");
                    $that.setOrientation(APT.DeviceOrientation.Landscape);
                }
                else 
                {
                    $that.setOrientation(APT.DeviceOrientation.Unknown);
                }
            }
        }
        else 
        {
            $that.setOrientation(APT.DeviceOrientation.Unknown);
        }
        
        event.stopPropagation();
    });
    
    this._notification = true;
};

// Finaliza la generaci?n de notificaciones seteando la propiedad notification.
APT.Device.prototype.endGeneratingDeviceOrientationNotifications = function() {
    $(window).off("orientationchange");
    this._notification = false;
    this._orientation = APT.DeviceOrientation.Unknown;
};

// Retorna la propiedad notification.
// @return     el valor que indica si las notificaciones estan activadas o no.
APT.Device.prototype.generatesDeviceOrientationNotifications = function() {
    return this._notification;
};

APT.Device.currentDevice = function() {
    var device = new APT.Device();
    device._notification = APT.Device._notification;
    device._orientation = APT.Device._orientation;
    return device;
};


