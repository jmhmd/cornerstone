/**
 * This module generates a lut for an image
 */

(function (cornerstone) {

    "use strict";

    /**
     * Creates a LUT used while rendering to convert stored pixel values to
     * display pixels
     *
     * @param image
     * @returns {Array}
     */
    function generateLut(image, windowWidth, windowCenter, invert)
    {
        if(image.lut === undefined) {
            image.lut =  new Int16Array(image.maxPixelValue - Math.min(image.minPixelValue,0)+1);
        }
        var lut = image.lut;

        var maxPixelValue = image.maxPixelValue;
        var minPixelValue = image.minPixelValue;
        var slope = image.slope;
        var intercept = image.intercept;
        var localWindowWidth = windowWidth;
        var localWindowCenter = windowCenter;

        var modalityLutValue;
        var voiLutValue;
        var clampedValue;
        var storedValue;

        // NOTE: As of Nov 2014, most javascript engines have lower performance when indexing negative indexes.
        // We improve performance by offsetting the pixel values for signed data to avoid negative indexes
        // when generating the lut and then undo it in storedPixelDataToCanvasImagedata.  Thanks to @jpambrun
        // for this contribution!

        var offset = 0;
        if(minPixelValue < 0) {
            offset = minPixelValue;
        }

        if(invert === true) {
            for(storedValue = image.minPixelValue; storedValue <= maxPixelValue; storedValue++)
            {
                modalityLutValue = storedValue * slope + intercept;
                voiLutValue = (((modalityLutValue - (localWindowCenter)) / (localWindowWidth) + 0.5) * 255.0);
                clampedValue = Math.min(Math.max(voiLutValue, 0), 255);
                lut[storedValue + (-offset)] = Math.round(255 - clampedValue);
            }
        }
        else {
            for(storedValue = image.minPixelValue; storedValue <= maxPixelValue; storedValue++)
            {
                modalityLutValue = storedValue * slope + intercept;
                voiLutValue = (((modalityLutValue - (localWindowCenter)) / (localWindowWidth) + 0.5) * 255.0);
                clampedValue = Math.min(Math.max(voiLutValue, 0), 255);
                lut[storedValue+ (-offset)] = Math.round(clampedValue);
            }
        }
    }


    // Module exports
    cornerstone.internal.generateLut = generateLut;
    cornerstone.generateLut = generateLut;
}(cornerstone));
