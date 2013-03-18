APT.createNamespace("APT");


APT.Responder = function() {};

APT.Responder.$inherits = function() {};

APT.Responder.$init = function() {};

APT.Responder.prototype.touchesBegan_withEvent = function(touches, e) {};
APT.Responder.prototype.touchesMoved_withEvent = function(touches, e) {};
APT.Responder.prototype.touchesEnded_withEvent = function(touches, e) {};
APT.Responder.prototype.touchesCancelled_withEvent = function(touches, e) {};
APT.Responder.prototype.becomeFirstResponder = function() {};
APT.Responder.prototype.resignFirstResponder = function() {};

// SCREEN							Esta clase hereda de object. Se utiliza para mantener el rectangulo que representa las dimensiones de la pantalla.
