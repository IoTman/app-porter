
function $$main(args) {
    // For Debug
    $(window).load(function() {   
        try
        {
            for (var n = 1; n < 30; n++) {
                if (application["_global_" + n] != undefined && application["_global_" + n].main != undefined) {
                    application["_global_" + n].main();
                }
            }
        }
        catch(e)
        {
            APT.Global.apt_log("TEST #__EXCEPTION_ERROR__#");
            APT.Global.apt_log("Exception: " + e.toString());
            APT.Global.apt_log("Stack: " + e.stack.toString());
            APT.Global.apt_log("FAIL");
        }
        send_data();
    });
}


function APT(){}

APT.__wait_for_send_data = 0;

function send_data() {
    setTimeout(function () {
        var url = 'http://localhost:8081/testWS/functionaltest/addResultOfTestSuite?callback=?';
        $.getJSON(
			url,
			{ "result": $("#apt-log").html() },
			function (result) {
			    console.log(result);
			}
		);
    }, APT.__wait_for_send_data);
}

APT.createNamespace = function(name) {
	if(window[name] === undefined){
		window[name] = new Object();
	}
};

APT.inherits = function (derivedObject, baseClass) {
    if (derivedObject.$meta === undefined) {
        derivedObject.$meta = { baseClasses: [baseClass] };
        // call base class inheritance constructor
        if (baseClass.$inherits !== undefined) baseClass.$inherits();
    }
    else {
        if (derivedObject.$meta.baseClasses.indexOf(baseClass) >= 0) return;
        derivedObject.$meta.baseClasses.push(baseClass);
    }
    // add dummy super method
    derivedObject.prototype["$super"] = function() { return this; };
    // reference to base class
    derivedObject.prototype.$_baseClass = baseClass.prototype;
    // copy prototype
    if (derivedObject.prototype === undefined) {
        derivedObject.prototype = new Object();
    }
    for (var name in baseClass.prototype) {
        if (typeof baseClass.prototype[name] !== "function") continue;

        if (derivedObject.prototype[name] === undefined) derivedObject.prototype[name] = baseClass.prototype[name];
        // base function
        if (name != "$_baseClass" && name.indexOf("$super") !== 0) {
            derivedObject.prototype["$super_" + name] = (function(name) {
                return function() {
                    var tmp = this.$_baseClass;
                    if (this.$_baseClass !== undefined && this.$_baseClass.$_baseClass != undefined) {
                        this.$_baseClass = this.$_baseClass.$_baseClass;
                    }
                    var ret = tmp[name].apply(this, arguments);
                    this.$_baseClass = tmp;
                    return ret;
                }
            })(name);
        }
    }
};
