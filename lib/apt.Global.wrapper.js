// TODO : move all code from this file to Meta D++ !!!

APT.Global.ApplicationMain = function (argc, argv, principalClassName, delegateClassName) {
    console.log("APT.ApplicationMain");
    if (delegateClassName !== undefined && delegateClassName !== null) {
        var delegate = new window["application"][delegateClassName];
        APT.ApplicationBase.sharedApplication().setDelegate(delegate);
        delegate.application_didFinishLaunchingWithOptions(this, null);

        $(window)[0].onblur = function () {            
            delegate.applicationWillResignActive(app);
        };

        $(window)[0].onfocus = function () {           
            delegate.applicationDidBecomeActive(app);
        };

        $(window)[0].onbeforeunload = function () {
            delegate.applicationWillTerminate(app);
        };

        var downevent;
        var upevent;
        var moveevent;
        var cancelevent;

        if(navigator.msPointerEnabled) {
            downevent = "MSPointerDown";
            upevent = "MSPointerUp";
            moveevent = "MSPointerMove"; 
            cancelevent = "MSPointerCancel"; 
        } else {
            downevent = "touchstart";
            upevent = "touchend";
            moveevent = "touchmove"; 
            cancelevent = "touchcancel"; 
        }
        
        $(window).on(downevent, function(event) {
            APT.ApplicationBase.sharedApplication().touchesBegan_withEvent(null, event);
        });

        $(window).on(moveevent, function (event) {
            APT.ApplicationBase.sharedApplication().touchesMoved_withEvent(null, event);
        });

        $(window).on(upevent, function (event) {
            APT.ApplicationBase.sharedApplication().touchesEnded_withEvent(null, event);
        });

        $(window).on(cancelevent, function (event) {
            APT.ApplicationBase.sharedApplication().touchesCancelled_withEvent(null, event);
        });
    }
    else {
        var app = new application.Application();
        app.exec();
    }
    return 1;
};

APT.Global.sprintf = function(format){
    function formatObject(element, formatStr) {
        // TODO: formatear de acuerdo al Tipo, obtenido con Object(element)
        return element;
    };

    var regexp = /(\%\d*\.?\d*[dDiuUxXoOfeEgGcsSpLaAFztj@])/g; // check letters
    str = format;
    str = str.replace("%%", "%");

    for (i = 1; i < arguments.length; i++) {
        match = regexp.exec(format);
        if (match == null) break;
        str = str.replace(match[1], formatObject(arguments[i], match[1]));

    }
    return str;
};

APT.Global.apt_log = function (msg) {
    if (msg.indexOf("TIMEOUT#") == 0) {
        APT.__wait_for_send_data = parseInt(msg.substring(8));
    }
    else {
        if ($("#apt-log").length == 0) {
            $("<div/>", { id: "apt-log" }).appendTo("body");
        }
        $("<p/>", { "text": msg.toString() }).appendTo("#apt-log");
    }
};

APT.Global.loadView = function (view, viewFileName) {

    var path = location.href.split("/").splice(3, location.href.split("/").length - 4).join("/") + "/";

    loadCSS = function (content) {
        var style = "<style>" + content + "</style>";
        $("head").append(style);
    };

    // load css
    if (viewFileName.indexOf(".html") === viewFileName.length - 5) {

        var css = new XMLHttpRequest();
        var cssFile = viewFileName.substring(0, viewFileName.length - 4) + "css";

        console.log("Loading " + cssFile);

        css.open("GET", path + cssFile, false);

        css.send();

        loadCSS(css.response);
    }

    // load html
    var xml = new XMLHttpRequest();

    console.log("Loading " + viewFileName);

    xml.open("GET", path + viewFileName, false);

    $.mobile.showPageLoadingMsg();

    xml.send();

    // find first inner element of body
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(xml.response, "text/xml");
    var root = xmlDoc.getElementsByTagName("body")[0];
    for (index in root.childNodes) {
        if (root.childNodes[index].nodeType === 1) {
            root = root.childNodes[index];
            break;
        }
    }

    var className = root.attributes["data-apt-class"];

    if (className.value != "TableView" && $(root).children().length > 0) {
        view.processNodes($(root), view);
        view._jqElement = view._jqElement.children();
        view._subviews = view._subviews[0]._subviews;
    } else {
        view._jqElement.attr("id", root.attributes["id"].value);
    }

    $.mobile.hidePageLoadingMsg();

    console.log("View " + viewFileName + " loaded");
    return view;
}