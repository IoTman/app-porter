// ------------------------------------------------------ //
// 	String
// ------------------------------------------------------ //

String.prototype.apt_UTF8String = function() {
    // TODO: es ésta la semántica correcta?
    return this.split("");
};

String.prototype.apt_rangeOfString = function(str) {
    apt_range = new APT.Range();
    if (this.indexOf(str) >= 0 && str.length > 0) {
        apt_range.location = this.indexOf(str);
        apt_range.length = str.length;
    }
    else {
        apt_range.location = APT.Global.NotFound;
        apt_range.length = 0;
    }
    return apt_range;
};

String.prototype.apt_rangeOfString_options = function(str, mask) {
    var temp = this;  // string to compare
    var search = true;
    if ((mask & APT.StringOptions.CaseInsensitiveSearch) == APT.StringOptions.CaseInsensitiveSearch) {
        temp = temp.toLowerCase();
        str = str.toLowerCase();
    }
    if ((mask & APT.StringOptions.LiteralSearch) == APT.StringOptions.LiteralSearch) {
        // TODO do nothing ?
    }
    if ((mask & APT.StringOptions.BackwardsSearch) == APT.StringOptions.BackwardsSearch) {
        // TODO consiste en buscar desde atras para adelante, por eficiencia
    }
    if ((mask & APT.StringOptions.AnchoredSearch) == APT.StringOptions.AnchoredSearch) {
        if (!this.apt_hasPrefix(str))
            search = false;
    }
    if (search)
        return temp.apt_rangeOfString(str);
    else {
        retVar = new APT.Range();
        retVar.location = APT.Global.NotFound;
        retVar.length = 0;
        return retVar;
    }
};

String.prototype.apt_rangeOfString_options_range = function(str, mask, apt_range) {
    temp = this.substr(apt_range.location, apt_range.length);
    return temp.apt_rangeOfString_options(str, mask);
};

String.prototype.apt_hasPrefix = function(str) {
    if (str.length == 0)
        return false;

    temp = this.substr(0, str.length);
    if (str == temp)
        return true;

    return false;
};

String.prototype.apt_hasSuffix = function(str) {
    if (str.length == 0)
        return false;

    if (str.length > this.length)
        return false;

    temp = this.substr(this.length - str.length, this.length);
    if (str == temp)
        return true;
    return false;
};

String.prototype.apt_boolValue = function() {
    i = 0;
    while (this.charAt(i) == ' ')
        i += 1;

    c = this.charAt(i);
    if (c == 't' || c == 'T' || c == 'Y' || c == 'y')
        return true;
    else if (!isNaN(parseInt(this.substring(i))) && parseInt(this.substring(i)) != 0)
        return true;

    return false;
};

String.prototype.apt_compare = function(str) {
    if (this > str) return APT.ComparisonResult.OrderedDescending;
    if (this < str) return APT.ComparisonResult.OrderedAscending;
    return APT.ComparisonResult.OrderedSame;
};

String.prototype.apt_compare_options = function(str, mask) {
    var temp = this;  // string to compare
    if ((mask & APT.StringOptions.CaseInsensitiveSearch) == APT.StringOptions.CaseInsensitiveSearch) {
        temp = temp.toLowerCase();
        str = str.toLowerCase();
    }
    if ((mask & APT.StringOptions.LiteralSearch) == APT.StringOptions.LiteralSearch) {
        // TODO do nothing ?
    }
    if ((mask & APT.StringOptions.NumericSearch) == APT.StringOptions.NumericSearch) {
        // TODO do nothing?
    }
    return temp.apt_compare(str);
};

String.prototype.apt_stringByAppendingPathComponent = function(aString) {
    var path = this.toString();
    if (!path.apt_hasSuffix("/") && path != "")
        path = path + "/";

    return (path + aString);
};

String.prototype.apt_trim = function(chars) {
    str = this;
    next = false;
    min = -1;
    max = str.length;

    do {
        min += 1;
        next = false;
        for (j in chars) {
            if (str[min] == chars[j]) {
                next = true;
            }
        }
    } while (next == true);

    do {
        max -= 1;
        next = false;
        for (j in chars) {
            if (str[max] == chars[j]) {
                next = true;
            }
        }
    } while (next == true);

    return str.substring(min, max + 1);
};

String.prototype.apt_isEqualsTo = function(str) {
    if (str == null || str == undefined) {
        return false;
    }
    else {
        return this.valueOf() === str.valueOf();
    }
};

String.NewWithDataUsingEncoding = function(data, encoding) {
    var a = new String();
    var b = data.bytes();

    if (encoding == APT.StringEncoding.ASCII) {
        for (i = 0; i < b.length; i++) {
            a += String.fromCharCode(b[i]);
        }
    }
    else {
        throw { Message: "Encoding not supported exception" };
    }
    return a;
};

String.prototype.apt_dataUsingEncoding = function(enc) {
    var ret = new APT.Data();
    ret.data = new Array();
    if (enc == APT.StringEncoding.ASCII) {
        for (i = 0; i < this.length; i++) {
            ret.data.push(this.charCodeAt(i));
        }
    }
    else {
        throw { Message: "Encoding not supported exception" };
    }
    return ret;
};

// ------------------------------------------------------ //
// 	Array
// ------------------------------------------------------ //

Array.prototype.apt_copy = function() {
    b = [];
    for (i = 0; i < this.length; i++) {
        b[i] = this[i];
    }
    return b;
};

Array.prototype.objectAtIndex = function(index) {
    return this[index];
};

Array.prototype.apt_description = function() {
    /* 
    Objective-C NSArray description message returns:
			
    If 'a' contains {"1", "2", "3", "4",...} 

			[a description] is:
    (
    1
    2
    3
    4
    ...
    )
    each value has four (4) blank spaces at left.
    */
    var rv = "(\n";
    for (i = 0; i < this.length; i++) {
        rv += "    " + this[i] + "\n";
    }
    rv += ")";

    return rv;
};

Array.prototype.apt_addObjectsFromArray = function(b) {
    for (i = 0; i < b.length; i++) {
        this.push(b[i]);
    }
};

Array.prototype.apt_removeObjects = function(from, howMany) {
    return this.splice(from, howMany);
}

// ------------------------------------------------------ //
// 	Number
// ------------------------------------------------------ //

Number.prototype.apt_isEqualsToNumber = function(numb) {
    if (numb == null || numb == undefined) {
        return false;
    }
    else {
        return this.valueOf() === numb.valueOf();
    }
};



// *************** Stack ***************** //

APT.Global.CreateStack = function (anArray) 
{
    var obj = [];
    
	if(anArray!== undefined && anArray!==null && anArray.length>0) 
	{
	    obj = anArray;
	}
	
	obj.head = function ()
	{
		if (this.length == 0) return null;
		return this[this.length - 1];
	};

	obj.second = function()
	{
		if (this.length < 2) return null;
		return this[this.length - 2];
	};
	
	return obj;
};

// ------------------------------------------------------ //
// 	Date
// ------------------------------------------------------ //

Date.prototype.apt_description = function() {
    month = parseInt(this.getMonth());
    month++;
    date = this.getDate();
    if (parseInt(date) < 10) {
        date = "0" + date;
    }
    hour = this.toTimeString().substr(0, 8);
    gmt = this.toTimeString().substr(12, 5);
    
    return this.getFullYear() + "-" + month + "-" + date + " " + hour + gmt;
};

Date.prototype.apt_compare = function(dat) {
    if (this < dat) return APT.ComparisonResult.OrderedAscending;
    if (this > dat) return APT.ComparisonResult.OrderedDescending;
    return APT.ComparisonResult.OrderedSame;
}

Date.prototype.apt_format = function (aFormat) {
    return $.format.date(this, aFormat);
}