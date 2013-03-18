APT.createNamespace("APT");


APT.DateFormatter = function() {
    if(this.constructor !== APT.DateFormatter) return new APT.DateFormatter();
    APT.DateFormatter.$inherits();
    APT.DateFormatter.$init.apply(this);
    return this;
};

APT.DateFormatter.$inherits = function() {
    APT.inherits(APT.DateFormatter, Object);
};

APT.DateFormatter.$init = function() {
    // instance fields
    this._dateStyle = null;
    this._timeStyle = null;
    this._format = "MM/dd/yyyy hh:mma";
    // call base class constructor
    Object.apply(this);
};

APT.DateFormatter.prototype.$copy = function() {
    var copyObject = new APT.DateFormatter();
    copyObject._dateStyle = this._dateStyle;
    copyObject._timeStyle = this._timeStyle;
    copyObject._format = this._format;
    return copyObject;
};

// Class constructor.
APT.DateFormatter.prototype.dateStyle = function() {
    var style = -1;
    if (this._dateStyle !== null)
    {
        switch(this._dateStyle.valueOf())
        {
            case "MM/dd/yyyy":
                style = APT.FormatterDate.ShortStyle;
                break;
            case "MMM dd, yyyy":
                style = APT.FormatterDate.MediumStyle;
                break;
            case "MMMM dd, yyyy":
                style = APT.FormatterDate.LongStyle;
                break;
        }
    }
    
    return style;
};

APT.DateFormatter.prototype.setDateStyle = function(aStyle) {
    switch(aStyle)
    {
        case APT.FormatterDate.ShortStyle:
            this._dateStyle = "MM/dd/yyyy";
            break;
        case APT.FormatterDate.MediumStyle:
            this._dateStyle = "MMM dd, yyyy";
            break;
        case APT.FormatterDate.LongStyle:
            this._dateStyle = "MMMM dd, yyyy";
            break;
    }
    
    this._format = null;
};

APT.DateFormatter.prototype.timeStyle = function() {
    var style = -1;
    if (this._timeStyle !== null)
    {
        switch(this._timeStyle.valueOf())
        {
            case "hh:mma":
                style = APT.FormatterDate.ShortStyle;
                break;
            case "":
                style = APT.FormatterDate.MediumStyle;
                break;
            case "hh:mm:ssa":
                style = APT.FormatterDate.LongStyle;
                break;
        }
    }
    
    return style;
};

APT.DateFormatter.prototype.setTimeStyle = function(aStyle) {
    switch(aStyle)
    {
        case APT.FormatterDate.ShortStyle:
            this._timeStyle = "hh:mma";
            break;
        case APT.FormatterDate.MediumStyle:
            this._timeStyle = "";
            break;
        case APT.FormatterDate.LongStyle:
            this._timeStyle = "hh:mm:ssa";
            break;
    }
    
    this._format = null;
};

APT.DateFormatter.prototype.dateFormat = function() {
    if (this._dateStyle === null && this._timeStyle === null)
    {
        return this._format;
    }
    else 
    {
        if (this._dateStyle !== null && this._timeStyle !== null)
        {
            return this._dateStyle + " " + this._timeStyle;
        }
        else 
        {
            if (this._dateStyle !== null)
            {
                return this._dateStyle;
            }
            else 
            {
                if (this._timeStyle !== null)
                {
                    return this._timeStyle;
                }
            }
        }
    }
};

APT.DateFormatter.prototype.setDateFormat = function(aFormat) {
    this._format = aFormat;
    this._timeStyle = null;
    this._dateStyle = null;
};

APT.DateFormatter.prototype.stringFromDate = function(aDate) {
    var strDate;
    if (aDate !== null)
    {
        if (this._format !== null)
        {
            strDate = aDate.apt_format(this._format);
        }
        else 
        {
            if (this._dateStyle !== null && this._timeStyle !== null)
            {
                strDate = aDate.apt_format(this._dateStyle + " " + this._timeStyle);
            }
            else 
            {
                if (this._dateStyle !== null)
                {
                    strDate = aDate.apt_format(this._dateStyle);
                }
                else 
                {
                    if (this._timeStyle !== null)
                    {
                        strDate = aDate.apt_format(this._timeStyle);
                    }
                }
            }
        }
    }
    
    return strDate;
};


