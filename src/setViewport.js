/**
 * This module contains functions to deal with getting and setting the viewport for an enabled element
 */
(function (cornerstone) {

    "use strict";

    function setViewport(element, viewport) {

        var enabledElement = cornerstone.getEnabledElement(element);

        enabledElement.viewport.scale = viewport.scale;
        enabledElement.viewport.translation.x = viewport.translation.x;
        enabledElement.viewport.translation.y = viewport.translation.y;
        enabledElement.viewport.voi.windowWidth = viewport.voi.windowWidth;
        enabledElement.viewport.voi.windowCenter = viewport.voi.windowCenter;
        enabledElement.viewport.invert = viewport.invert;
        enabledElement.viewport.pixelReplication = viewport.pixelReplication;
        enabledElement.viewport.rotation = viewport.rotation;
        enabledElement.viewport.hflip = viewport.hflip;
        enabledElement.viewport.vflip = viewport.vflip;

        // prevent window width from being < 1
        if(enabledElement.viewport.voi.windowWidth < 1) {
            enabledElement.viewport.voi.windowWidth = 1;
        }
        // prevent scale from getting too small
        if(enabledElement.viewport.scale < 0.0001) {
            enabledElement.viewport.scale = 0.25;
        }

        if(enabledElement.viewport.rotation===360 || enabledElement.viewport.rotation===-360) {
            enabledElement.viewport.rotation = 0;
        }

        // Force the image to be updated since the viewport has been modified
        cornerstone.updateImage(element);
    }


    // module/private exports
    cornerstone.setViewport = setViewport;

}(cornerstone));
