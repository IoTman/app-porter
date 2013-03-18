// TODO : move all code from this file to Meta D++ !!!

APT.Graphics2D = function() { };


APT.Graphics2D.addEllipseInRect = function(aContext, aRect) {

    aContext.save();
    var aspectRatio = aRect.size.width / aRect.size.height;
    aContext.scale(aspectRatio, 1);
    var centerX = (2 * aRect.origin.x + aRect.size.width) / (aspectRatio * 2);
    var centerY = (2 * aRect.origin.y + aRect.size.height) / 2;
    var radius = aRect.size.width / (aspectRatio * 2);
    aContext.arc(centerX, centerY, radius, 0, Math.PI * 2, false);
    aContext.restore();
}

