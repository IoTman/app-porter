APT.IndexPath = function() {
    if(this.constructor !== APT.IndexPath) return new APT.IndexPath();
    APT.IndexPath.$inherits();
    APT.IndexPath.$init.apply(this);
    return this;
};

APT.IndexPath.$inherits = function() {
    APT.inherits(APT.IndexPath, Object);
};

APT.IndexPath.$init = function() {
    // instance fields
    this._indexPath = null;
    this._section = 0;
    this._row = 0;
    // call base class constructor
    Object.apply(this);
    this._indexPath = new Array();
};

APT.IndexPath.prototype.$copy = function() {
    var copyObject = new APT.IndexPath();
    copyObject._indexPath = this._indexPath;
    copyObject._section = this._section;
    copyObject._row = this._row;
    return copyObject;
};

// Class constructor.
// Returns an Object IndexPath initialized with a specified row and section.
// @param aRow to put in the first position.
// @param aSection to put in the first position.
// @return An initialized IndexPath object.
APT.IndexPath.indexPathForRow_inSection = function(aRow, aSection) {
    var aIndexPath = new APT.IndexPath();
    
    aIndexPath._section = aSection;
    aIndexPath._row = aRow;
    
    return aIndexPath;
};

// Returns an Object IndexPath initialized with a specified index.
// @param The index to put in the first position.
// @return An initialized IndexPath object.
APT.IndexPath.prototype.initWithIndex = function(anIndex) {
    this._indexPath = [anIndex];
    
    return this;
};

// Returns the length on the indexPath array.
// @return the length of the _indexPath array.
APT.IndexPath.prototype.length = function() {
    return this._indexPath.length;
};

// Returns the number of row.
// @return the row number.
APT.IndexPath.prototype.row = function() {
    return this._row;
};

// Returns the number of section.
// @return the section number.
APT.IndexPath.prototype.section = function() {
    return this._section;
};

// Returns the result of compare this IndexPath with the IndexPath passed
// the result can be une of the Comparisionresult constants.
// @return a int representing a ComparisionResult
APT.IndexPath.prototype.compare = function(anotherPath) {
    var lengthTemp = (((anotherPath.length() < this.length())) ? (anotherPath.length()) : (this.length()));
    var resultTemp = APT.ComparisonResult.OrderedSame;
    for (var i = 0; i < lengthTemp; i++)
    {
        var thisObjectTemp = parseInt(this._indexPath.objectAtIndex(i));
        var anotherPathObjectTemp = parseInt(anotherPath._indexPath.objectAtIndex(i));
        if (thisObjectTemp > anotherPathObjectTemp)
        {
            resultTemp = APT.ComparisonResult.OrderedDescending;
            break;
        }
        else 
        {
            if (thisObjectTemp < anotherPathObjectTemp)
            {
                resultTemp = APT.ComparisonResult.OrderedAscending;
                break;
            }
        }
    }
    
    if (resultTemp === APT.ComparisonResult.OrderedSame)
    {
        if (this.length() < anotherPath.length())
        {
            resultTemp = APT.ComparisonResult.OrderedDescending;
        }
        else 
        {
            if (this.length() > anotherPath.length())
            {
                resultTemp = APT.ComparisonResult.OrderedAscending;
            }
        }
    }
    
    return resultTemp;
};


// end IndexPath class
// end APT namespace
// end js namespace
// LABEL
// La clase Label hereda de APT.View y se utiliza para mostrar una o mas lineas de texto en la pantalla. Se implementa en html como un div contenedor con un div contenido que contiene un texto de solo lectura y esta centrado verticalmente en el contenedor mediante javascript.
