// Animation support class for Views
APT.createNamespace("APT");


APT.Animation = function() {
    if(this.constructor !== APT.Animation) return new APT.Animation();
    APT.Animation.$inherits();
    APT.Animation.$init.apply(this);
    return this;
};

APT.Animation.$inherits = function() {
    APT.inherits(APT.Animation, Object);
};

APT.Animation.$init = function() {
    // instance fields
    this._id = null;
    this._duration = 0;
    this._delay = 0;
    this.parameters = new Array();
    this.views = new Array();
    this._context = null;
    this._animationsFinishedCount = 0;
    this._willStartSelector = null;
    this._didStopSelector = null;
    this._delegate = null;
    this._viewTransition = null;
    this.viewAdds = new Array();
    this.viewAddsReference = new Array();
    this.viewRemoves = new Array();
    this._rotYINT = 0;
    this._transition = 0;
    // call base class constructor
    Object.apply(this);
};

APT.Animation.prototype.$copy = function() {
    var copyObject = new APT.Animation();
    copyObject._id = this._id;
    copyObject._duration = this._duration;
    copyObject._delay = this._delay;
    copyObject.parameters = this.parameters;
    copyObject.views = this.views;
    copyObject._context = this._context;
    copyObject._animationsFinishedCount = this._animationsFinishedCount;
    copyObject._willStartSelector = this._willStartSelector;
    copyObject._didStopSelector = this._didStopSelector;
    copyObject._delegate = this._delegate;
    copyObject._viewTransition = this._viewTransition;
    copyObject.viewAdds = this.viewAdds;
    copyObject.viewAddsReference = this.viewAddsReference;
    copyObject.viewRemoves = this.viewRemoves;
    copyObject._rotYINT = this._rotYINT;
    copyObject._transition = this._transition;
    return copyObject;
};

APT.Animation.Parameters = function() {
    return new Array();
};

APT.Animation.beginAnimationsContext = function(key, userInfo) {
    var animation = new APT.Animation();
    animation._id = key;
    animation._context = userInfo;
    return animation;
};

APT.Animation.prototype.setAnimatableProperty = function(aView, aPropertyName, aValue) {
    var index = this.views.indexOf(aView);
    if (index === -1)
    {
        index = this.views.length;
        this.parameters.push(APT.Animation.Parameters());
        this.views.push(aView);
    }
    
    this.parameters[index][aPropertyName] = aValue;
};

APT.Animation.prototype.animateAlpha = function(aView, aValue) {
    this.setAnimatableProperty(aView, "opacity", aValue);
};

APT.Animation.prototype.animateFrame = function(aView, aValue) {
    aValue = aValue.$copy();
    this.setAnimatableProperty(aView, "left", aValue.origin.x);
    this.setAnimatableProperty(aView, "top", aValue.origin.y);
    this.setAnimatableProperty(aView, "width", aValue.size.width);
    this.setAnimatableProperty(aView, "height", aValue.size.height);
};

APT.Animation.prototype.commitAnimations = function() {
    this._animationsFinishedCount = this.views.length;
    this.animationsWillStart();
    
    var animation = this;
    var eventHandler = function() {
        animation._animationsFinishedCount--;
        if (animation._animationsFinishedCount === 0)
        {
            if (animation._delegate !== null && animation._didStopSelector !== null)
            {
                (animation._delegate[animation._didStopSelector]).call(animation._delegate, animation._id, true, animation._context);
            }
            
            animation = null;
        }
    };
    
    for (var i = 0; i < this.views.length; i++)
    {
        var view = this.views[i];
        
        if (this._delay > 0)
        {
            var ind = i;
            var $that = this;
            
            window.setTimeout(function() {
                if ($that._transition !== 0)
                {
                    animation.startFlip();
                }
                
                var aView = animation.views[ind];
                aView.jQElement().animate(animation.parameters[ind], animation._duration, eventHandler);
            }, this._delay);
        }
        else 
        {
            if (this._transition !== 0)
            {
                this.startFlip();
            }
            
            view.jQElement().animate(this.parameters[i], this._duration, eventHandler);
        }
    }
    
    if (this.views.length === 0 && this._transition !== 0)
    {
        this.startFlip();
    }
};

APT.Animation.prototype.setAnimationDelegate = function(aDelegate) {
    this._delegate = aDelegate;
};

APT.Animation.prototype.animationDelegate = function() {
    return this._delegate;
};

APT.Animation.prototype.animationsWillStart = function() {
    if (this._delegate !== null && this._willStartSelector !== null)
    {
        (this._delegate[this._willStartSelector]).call(this._delegate, this._id, this._context);
    }
};

APT.Animation.prototype.setAnimationDelay = function(aDelay) {
    this._delay = aDelay;
};

APT.Animation.prototype.setAnimationDuration = function(aDuration) {
    this._duration = aDuration;
};

APT.Animation.prototype.setAnimationWillStartSelector = function(selector) {
    this._willStartSelector = selector;
};

APT.Animation.prototype.setAnimationDidStopSelector = function(selector) {
    this._didStopSelector = selector;
};

APT.Animation.prototype.setAnimationTransitionForViewCache = function(aTransition, aView) {
    this._transition = aTransition;
    this._viewTransition = aView;
};

APT.Animation.prototype.animateAddSubview = function(aView, aViewAdd) {
    this.viewAddsReference.push(aView);
    this.viewAdds.push(aViewAdd);
};

APT.Animation.prototype.animateRemove = function(aViewRemove) {
    this.viewRemoves.push(aViewRemove);
};

APT.Animation.prototype.startFlip = function() {
    window.clearInterval(this._rotYINT);
    var animation = this;
    
    var change = true;
    var ny = 0;
    
    this._rotYINT = window.setInterval(function() {
        if (animation._transition === APT.AnimationTransition.FlipFromLeft)
        {
            if (ny < 90 && change)
            {
                ny = ny + 1;
            }
            else 
            {
                change = false;
                ny = ny - 1;
            }
            
            animation.flipFromLeft(ny);
        }
        else 
        {
            if (animation._transition === APT.AnimationTransition.FlipFromRight)
            {
                if (ny > -90 && change)
                {
                    ny = ny - 1;
                }
                else 
                {
                    change = false;
                    ny = ny + 1;
                }
                
                animation.flipFromRight(ny);
            }
        }
    }, this._duration / 200);
};

APT.Animation.prototype.flipFromLeft = function(degree) {
    var rotate = "rotateY(" + degree + "deg)";
    
    this._viewTransition.jQElement().css("transform", rotate);
    this._viewTransition.jQElement().css("webkitTransform", rotate);
    this._viewTransition.jQElement().css("OTransform", rotate);
    this._viewTransition.jQElement().css("MozTransform", rotate);
    
    if (degree === 90)
    {
        for (var i = 0; i < this.viewRemoves.length; i++)
        {
            (this.viewRemoves[i]).removeFromSuperview();
        }
        
        for (var i = 0; i < this.viewAdds.length; i++)
        {
            (this.viewAddsReference[i]).addSubview(this.viewAdds[i]);
        }
    }
    
    if (degree === 0)
    {
        window.clearInterval(this._rotYINT);
    }
};

APT.Animation.prototype.flipFromRight = function(degree) {
    var rotate = "rotateY(" + degree + "deg)";
    
    this._viewTransition.jQElement().css("transform", rotate);
    this._viewTransition.jQElement().css("webkitTransform", rotate);
    this._viewTransition.jQElement().css("OTransform", rotate);
    this._viewTransition.jQElement().css("MozTransform", rotate);
    
    if (degree === -90)
    {
        for (var i = 0; i < this.viewRemoves.length; i++)
        {
            (this.viewRemoves[i]).removeFromSuperview();
        }
        
        for (var i = 0; i < this.viewAdds.length; i++)
        {
            (this.viewAddsReference[i]).addSubview(this.viewAdds[i]);
        }
    }
    
    if (degree === 0)
    {
        window.clearInterval(this._rotYINT);
    }
};


// ACTIONSHEET
// /La clase ActionSheet hereda de View. Se la utiliza para mostrar una pantalla que permita realizar acciones, a traves de botones, sobre una ventana principal, bloqueando la pantalla inferior. Posee un delegado ActionSheetDelegate, para implementar la funcionalidad de cada bot?n.
