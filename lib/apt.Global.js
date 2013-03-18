APT.createNamespace("APT");


APT.StringEncoding = function() {
    if(this.constructor !== APT.StringEncoding) return new APT.StringEncoding();
    APT.StringEncoding.$inherits();
    APT.StringEncoding.$init.apply(this);
    return this;
};

APT.StringEncoding.$inherits = function() {
};

APT.StringEncoding.$init = function() {
    // instance fields
};

APT.StringEncoding.ASCII = 0;


APT.StringOptions = function() {
    if(this.constructor !== APT.StringOptions) return new APT.StringOptions();
    APT.StringOptions.$inherits();
    APT.StringOptions.$init.apply(this);
    return this;
};

APT.StringOptions.$inherits = function() {
};

APT.StringOptions.$init = function() {
    // instance fields
};

APT.StringOptions.CaseInsensitiveSearch = 2;

APT.StringOptions.LiteralSearch = 4;

APT.StringOptions.BackwardsSearch = 8;

APT.StringOptions.AnchoredSearch = 16;

APT.StringOptions.NumericSearch = 64;


APT.ComparisonResult = function() {
    if(this.constructor !== APT.ComparisonResult) return new APT.ComparisonResult();
    APT.ComparisonResult.$inherits();
    APT.ComparisonResult.$init.apply(this);
    return this;
};

APT.ComparisonResult.$inherits = function() {
};

APT.ComparisonResult.$init = function() {
    // instance fields
};

APT.ComparisonResult.OrderedAscending = -1;

APT.ComparisonResult.OrderedSame = 0;

APT.ComparisonResult.OrderedDescending = 1;


APT.TableViewStyle = function() {
    if(this.constructor !== APT.TableViewStyle) return new APT.TableViewStyle();
    APT.TableViewStyle.$inherits();
    APT.TableViewStyle.$init.apply(this);
    return this;
};

APT.TableViewStyle.$inherits = function() {
};

APT.TableViewStyle.$init = function() {
    // instance fields
};

APT.TableViewStyle.Plain = 0;

APT.TableViewStyle.Grouped = 1;


APT.TableViewRowAnimation = function() {
    if(this.constructor !== APT.TableViewRowAnimation) return new APT.TableViewRowAnimation();
    APT.TableViewRowAnimation.$inherits();
    APT.TableViewRowAnimation.$init.apply(this);
    return this;
};

APT.TableViewRowAnimation.$inherits = function() {
};

APT.TableViewRowAnimation.$init = function() {
    // instance fields
};

APT.TableViewRowAnimation.None = 0;


APT.TableViewCellStyle = function() {
    if(this.constructor !== APT.TableViewCellStyle) return new APT.TableViewCellStyle();
    APT.TableViewCellStyle.$inherits();
    APT.TableViewCellStyle.$init.apply(this);
    return this;
};

APT.TableViewCellStyle.$inherits = function() {
};

APT.TableViewCellStyle.$init = function() {
    // instance fields
};

APT.TableViewCellStyle.Default = 0;

APT.TableViewCellStyle.Value1 = 1;

APT.TableViewCellStyle.Value2 = 2;

APT.TableViewCellStyle.Subtitle = 3;


APT.TableViewCellAccessoryType = function() {
    if(this.constructor !== APT.TableViewCellAccessoryType) return new APT.TableViewCellAccessoryType();
    APT.TableViewCellAccessoryType.$inherits();
    APT.TableViewCellAccessoryType.$init.apply(this);
    return this;
};

APT.TableViewCellAccessoryType.$inherits = function() {
};

APT.TableViewCellAccessoryType.$init = function() {
    // instance fields
};

APT.TableViewCellAccessoryType.None = 0;

APT.TableViewCellAccessoryType.DisclosureIndicator = 1;

APT.TableViewCellAccessoryType.Checkmark = 2;


APT.TextFieldBorderStyle = function() {
    if(this.constructor !== APT.TextFieldBorderStyle) return new APT.TextFieldBorderStyle();
    APT.TextFieldBorderStyle.$inherits();
    APT.TextFieldBorderStyle.$init.apply(this);
    return this;
};

APT.TextFieldBorderStyle.$inherits = function() {
};

APT.TextFieldBorderStyle.$init = function() {
    // instance fields
};

APT.TextFieldBorderStyle.None = 0;

APT.TextFieldBorderStyle.Line = 1;

APT.TextFieldBorderStyle.Bezel = 2;

APT.TextFieldBorderStyle.RoundedRect = 3;


APT.AnimationTransition = function() {
    if(this.constructor !== APT.AnimationTransition) return new APT.AnimationTransition();
    APT.AnimationTransition.$inherits();
    APT.AnimationTransition.$init.apply(this);
    return this;
};

APT.AnimationTransition.$inherits = function() {
};

APT.AnimationTransition.$init = function() {
    // instance fields
};

APT.AnimationTransition.None = 0;

APT.AnimationTransition.FlipFromLeft = 1;

APT.AnimationTransition.FlipFromRight = 2;


APT.FormatterDate = function() {
    if(this.constructor !== APT.FormatterDate) return new APT.FormatterDate();
    APT.FormatterDate.$inherits();
    APT.FormatterDate.$init.apply(this);
    return this;
};

APT.FormatterDate.$inherits = function() {
};

APT.FormatterDate.$init = function() {
    // instance fields
};

APT.FormatterDate.ShortStyle = 1;

APT.FormatterDate.MediumStyle = 2;

APT.FormatterDate.LongStyle = 3;


APT.KeyboardType = function() {
    if(this.constructor !== APT.KeyboardType) return new APT.KeyboardType();
    APT.KeyboardType.$inherits();
    APT.KeyboardType.$init.apply(this);
    return this;
};

APT.KeyboardType.$inherits = function() {
};

APT.KeyboardType.$init = function() {
    // instance fields
};

APT.KeyboardType.Default = 0;

APT.KeyboardType.PhonePad = 1;

APT.KeyboardType.NumberPad = 2;

APT.KeyboardType.URL = 3;

APT.KeyboardType.EmailAddress = 4;


APT.DatePickerMode = function() {
    if(this.constructor !== APT.DatePickerMode) return new APT.DatePickerMode();
    APT.DatePickerMode.$inherits();
    APT.DatePickerMode.$init.apply(this);
    return this;
};

APT.DatePickerMode.$inherits = function() {
};

APT.DatePickerMode.$init = function() {
    // instance fields
};

APT.DatePickerMode.Time = 0;

APT.DatePickerMode.Date = 1;

APT.DatePickerMode.DateAndTime = 2;

APT.DatePickerMode.CountDownTimer = 3;


APT.PopoverArrowDirection = function() {
    if(this.constructor !== APT.PopoverArrowDirection) return new APT.PopoverArrowDirection();
    APT.PopoverArrowDirection.$inherits();
    APT.PopoverArrowDirection.$init.apply(this);
    return this;
};

APT.PopoverArrowDirection.$inherits = function() {
};

APT.PopoverArrowDirection.$init = function() {
    // instance fields
};

APT.PopoverArrowDirection.Up = 0;


APT.TextAlignment = function() {
    if(this.constructor !== APT.TextAlignment) return new APT.TextAlignment();
    APT.TextAlignment.$inherits();
    APT.TextAlignment.$init.apply(this);
    return this;
};

APT.TextAlignment.$inherits = function() {
};

APT.TextAlignment.$init = function() {
    // instance fields
};

APT.TextAlignment.Left = 0;

APT.TextAlignment.Center = 1;

APT.TextAlignment.Right = 2;

APT.TextAlignment.toCSSTextAlign = function(aTextAlignment) {
    switch(aTextAlignment)
    {
        
        case APT.TextAlignment.Left:
            return "left";
            break;
        case APT.TextAlignment.Center:
            return "center";
            break;
        case APT.TextAlignment.Right:
            return "right";
            break;
        default:
            return "left";
            break;
    }
};

APT.TextAlignment.parseCSSTextAlign = function(aCSSTextAlignment) {
    if (aCSSTextAlignment === undefined || aCSSTextAlignment === null)
    {
        return APT.TextAlignment.Left;
    }
    else 
    {
        switch(aCSSTextAlignment.valueOf())
        {
            
            case "left":
                return APT.TextAlignment.Left;
                break;
            case "center":
                return APT.TextAlignment.Center;
                break;
            case "right":
                return APT.TextAlignment.Right;
                break;
            default:
                return APT.TextAlignment.Left;
                break;
        }
    }
};


APT.ButtonType = function() {
    if(this.constructor !== APT.ButtonType) return new APT.ButtonType();
    APT.ButtonType.$inherits();
    APT.ButtonType.$init.apply(this);
    return this;
};

APT.ButtonType.$inherits = function() {
};

APT.ButtonType.$init = function() {
    // instance fields
};

APT.ButtonType.Custom = 0;

APT.ButtonType.RoundedRect = 1;

APT.ButtonType.DetailDisclosure = 2;

APT.ButtonType.Info = 3;

APT.ButtonType.Add = 4;


APT.LineBreakMode = function() {
    if(this.constructor !== APT.LineBreakMode) return new APT.LineBreakMode();
    APT.LineBreakMode.$inherits();
    APT.LineBreakMode.$init.apply(this);
    return this;
};

APT.LineBreakMode.$inherits = function() {
};

APT.LineBreakMode.$init = function() {
    // instance fields
};

APT.LineBreakMode.BreakWord = 0;

APT.LineBreakMode.Normal = 2;

APT.LineBreakMode.toCSSWordWrap = function(aLineBreakMode) {
    switch(aLineBreakMode)
    {
        
        case APT.LineBreakMode.Normal:
            return "normal";
            break;
        case APT.LineBreakMode.BreakWord:
            return "break-word";
            break;
        default:
            return "break-word";
            break;
    }
};

APT.LineBreakMode.parseLineBreakMode = function(aCSSWordWrap) {
    if (aCSSWordWrap === undefined || aCSSWordWrap === null)
    {
        return APT.LineBreakMode.BreakWord;
    }
    else 
    {
        switch(aCSSWordWrap.valueOf())
        {
            
            case "normal":
                return APT.LineBreakMode.Normal;
                break;
            case "break-word":
                return APT.LineBreakMode.BreakWord;
                break;
            default:
                return APT.LineBreakMode.BreakWord;
                break;
        }
    }
};


APT.ImageOrientation = function() {
    if(this.constructor !== APT.ImageOrientation) return new APT.ImageOrientation();
    APT.ImageOrientation.$inherits();
    APT.ImageOrientation.$init.apply(this);
    return this;
};

APT.ImageOrientation.$inherits = function() {
};

APT.ImageOrientation.$init = function() {
    // instance fields
};

APT.ImageOrientation.Up = 0;

APT.ImageOrientation.Down = 1;

APT.ImageOrientation.Left = 2;

APT.ImageOrientation.Right = 3;


APT.ProgressViewStyle = function() {
    if(this.constructor !== APT.ProgressViewStyle) return new APT.ProgressViewStyle();
    APT.ProgressViewStyle.$inherits();
    APT.ProgressViewStyle.$init.apply(this);
    return this;
};

APT.ProgressViewStyle.$inherits = function() {
};

APT.ProgressViewStyle.$init = function() {
    // instance fields
};

APT.ProgressViewStyle.Default = 0;

APT.ProgressViewStyle.Bar = 1;


APT.DeviceOrientation = function() {
    if(this.constructor !== APT.DeviceOrientation) return new APT.DeviceOrientation();
    APT.DeviceOrientation.$inherits();
    APT.DeviceOrientation.$init.apply(this);
    return this;
};

APT.DeviceOrientation.$inherits = function() {
};

APT.DeviceOrientation.$init = function() {
    // instance fields
};

APT.DeviceOrientation.Unknown = 0;

APT.DeviceOrientation.Portrait = 1;

APT.DeviceOrientation.Landscape = 2;

APT.DeviceOrientation.FaceUp = 3;


APT.ActivityIndicatorViewStyle = function() {
    if(this.constructor !== APT.ActivityIndicatorViewStyle) return new APT.ActivityIndicatorViewStyle();
    APT.ActivityIndicatorViewStyle.$inherits();
    APT.ActivityIndicatorViewStyle.$init.apply(this);
    return this;
};

APT.ActivityIndicatorViewStyle.$inherits = function() {
};

APT.ActivityIndicatorViewStyle.$init = function() {
    // instance fields
};

APT.ActivityIndicatorViewStyle.WhiteLarge = 0;

APT.ActivityIndicatorViewStyle.White = 1;

APT.ActivityIndicatorViewStyle.Gray = 2;


APT.ControlState = function() {
    if(this.constructor !== APT.ControlState) return new APT.ControlState();
    APT.ControlState.$inherits();
    APT.ControlState.$init.apply(this);
    return this;
};

APT.ControlState.$inherits = function() {
};

APT.ControlState.$init = function() {
    // instance fields
};

APT.ControlState.Normal = 0;

APT.ControlState.Highlighted = 1;

APT.ControlState.Disabled = 2;

APT.ControlState.Selected = 4;

APT.ControlState.Application = 0x00FF0000;

APT.ControlState.Reserved = 0xFF000000;


APT.ControlEvent = function() {
    if(this.constructor !== APT.ControlEvent) return new APT.ControlEvent();
    APT.ControlEvent.$inherits();
    APT.ControlEvent.$init.apply(this);
    return this;
};

APT.ControlEvent.$inherits = function() {
};

APT.ControlEvent.$init = function() {
    // instance fields
};

APT.ControlEvent.vmousedown = 1 << 0;

// UIControlEventTouchDown
APT.ControlEvent.TouchDownRepeat = 1 << 1;

// UIControlEventTouchDownRepeat
APT.ControlEvent.vmouseover = 1 << 2;

// UIControlEventTouchDragInside
APT.ControlEvent.TouchDragOutside = 1 << 3;

// UIControlEventTouchDragOutside
APT.ControlEvent.TouchDragEnter = 1 << 4;

// UIControlEventTouchDragEnter
APT.ControlEvent.TouchDragExit = 1 << 5;

// UIControlEventTouchDragExit
APT.ControlEvent.vmouseup = 1 << 6;

// UIControlEventTouchUpInside
APT.ControlEvent.TouchUpOutside = 1 << 7;

// UIControlEventTouchUpOutside
APT.ControlEvent.vmousecancel = 1 << 8;

// UIControlEventTouchCancel
APT.ControlEvent.ValueChanged = 1 << 12;

// UIControlEventValueChanged
APT.ControlEvent.focus = 1 << 16;

// UIControlEventEditingDidBegin
APT.ControlEvent.EditingChanged = 1 << 17;

// UIControlEventEditingChanged
APT.ControlEvent.change = 1 << 18;

// UIControlEventEditingDidEnd
APT.ControlEvent.blur = 1 << 19;

// UIControlEventEditingDidEndOnExit
APT.ControlEvent.AllTouchEvents = 0x00000FFF;

// UIControlEventAllTouchEvents
APT.ControlEvent.AllEditingEvents = 0x000F0000;

// UIControlEventAllEditingEvents
APT.ControlEvent.ApplicationReserved = 0x0F000000;

// UIControlEventApplicationReserved
APT.ControlEvent.SystemReserved = 0xF0000000;

// UIControlEventSystemReserved
APT.ControlEvent.AllEvents = 0xFFFFFFFF;

// UIControlEventAllEvents

APT.BarButtonItemStyle = function() {
    if(this.constructor !== APT.BarButtonItemStyle) return new APT.BarButtonItemStyle();
    APT.BarButtonItemStyle.$inherits();
    APT.BarButtonItemStyle.$init.apply(this);
    return this;
};

APT.BarButtonItemStyle.$inherits = function() {
};

APT.BarButtonItemStyle.$init = function() {
    // instance fields
};

APT.BarButtonItemStyle.Plain = 0;

APT.BarButtonItemStyle.Bordered = 1;

APT.BarButtonItemStyle.Done = 2;


APT.BarStyle = function() {
    if(this.constructor !== APT.BarStyle) return new APT.BarStyle();
    APT.BarStyle.$inherits();
    APT.BarStyle.$init.apply(this);
    return this;
};

APT.BarStyle.$inherits = function() {
};

APT.BarStyle.$init = function() {
    // instance fields
};

APT.BarStyle.Default = 0;

APT.BarStyle.Black = 1;


APT.TabBarSystemItem = function() {
    if(this.constructor !== APT.TabBarSystemItem) return new APT.TabBarSystemItem();
    APT.TabBarSystemItem.$inherits();
    APT.TabBarSystemItem.$init.apply(this);
    return this;
};

APT.TabBarSystemItem.$inherits = function() {
};

APT.TabBarSystemItem.$init = function() {
    // instance fields
};

APT.TabBarSystemItem.More = 0;

APT.TabBarSystemItem.Favorites = 1;

APT.TabBarSystemItem.Featured = 2;

APT.TabBarSystemItem.TopRated = 3;

APT.TabBarSystemItem.Recents = 4;

APT.TabBarSystemItem.Contacts = 5;

APT.TabBarSystemItem.History = 6;

APT.TabBarSystemItem.Bookmarks = 7;

APT.TabBarSystemItem.Search = 8;

APT.TabBarSystemItem.Downloads = 9;

APT.TabBarSystemItem.MostRecent = 10;

APT.TabBarSystemItem.MostViewed = 11;


APT.BarButtonSystemItem = function() {
    if(this.constructor !== APT.BarButtonSystemItem) return new APT.BarButtonSystemItem();
    APT.BarButtonSystemItem.$inherits();
    APT.BarButtonSystemItem.$init.apply(this);
    return this;
};

APT.BarButtonSystemItem.$inherits = function() {
};

APT.BarButtonSystemItem.$init = function() {
    // instance fields
};

APT.BarButtonSystemItem.Done = 0;

APT.BarButtonSystemItem.Cancel = 1;

APT.BarButtonSystemItem.Edit = 2;

APT.BarButtonSystemItem.Save = 3;

APT.BarButtonSystemItem.Add = 4;

APT.BarButtonSystemItem.FlexibleSpace = 5;

APT.BarButtonSystemItem.FixedSpace = 6;

APT.BarButtonSystemItem.Compose = 7;

APT.BarButtonSystemItem.Reply = 8;

APT.BarButtonSystemItem.Action = 9;

APT.BarButtonSystemItem.Organize = 10;

APT.BarButtonSystemItem.Bookmarks = 11;

APT.BarButtonSystemItem.Search = 12;

APT.BarButtonSystemItem.Refresh = 13;

APT.BarButtonSystemItem.Stop = 14;

APT.BarButtonSystemItem.Camera = 15;

APT.BarButtonSystemItem.Trash = 16;

APT.BarButtonSystemItem.Play = 17;

APT.BarButtonSystemItem.Pause = 18;

APT.BarButtonSystemItem.Rewind = 19;

APT.BarButtonSystemItem.FastForward = 20;

APT.BarButtonSystemItem.Undo = 21;

APT.BarButtonSystemItem.Redo = 22;

APT.BarButtonSystemItem.PageCurl = 23;


APT.EventType = function() {
    if(this.constructor !== APT.EventType) return new APT.EventType();
    APT.EventType.$inherits();
    APT.EventType.$init.apply(this);
    return this;
};

APT.EventType.$inherits = function() {
};

APT.EventType.$init = function() {
    // instance fields
};

APT.EventType.Touches = 0;

APT.EventType.Motion = 1;

APT.EventType.RemoteControl = 2;


// GLOBAL								methods, enums, constants
APT.Global = function() {
    if(this.constructor !== APT.Global) return new APT.Global();
    APT.Global.$inherits();
    APT.Global.$init.apply(this);
    return this;
};

APT.Global.$inherits = function() {
};

APT.Global.$init = function() {
    // instance fields
};

APT.Global.NotFound = -1;

APT.Global.createUserObject = function(className) {
    var constructor = window["application"][className];
    var obj = Object.create(constructor.prototype);
    constructor.apply(obj);
    return obj;
};

APT.Global.isMemberOfClass = function(obj1, classObj) {
    return obj1.constructor === classObj;
};

APT.Global.conformsToProtocol = function(protocolName) {
    // TODO conforms to protocol not yet supported
    return true;
};

APT.Global.isEqual = function(obj1, obj2) {
    if (obj1["isEqual"] instanceof Function)
    {
        return (obj1["isEqual"])(obj2);
    }
    else 
    {
        return obj1 === obj2;
    }
};

APT.Global.hash = function(obj1) {
    if (obj1["hash"] instanceof Function)
    {
        return (obj1["hash"])();
    }
    else 
    {
        return obj1;
    }
};


// *************** Stack ***************** //
// TODO : Change this
// For Caculator Demo
// IMAGE
