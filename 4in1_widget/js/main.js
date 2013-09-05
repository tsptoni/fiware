/*global MashupPlatform*/


function toggle()
{
    //Checking if select field is enabled
    var button = document.getElementById("onoff");

    if (button.textContent === "ON")
    {
        //Changing the select field state to disabled and changing the value of button to enable
        button.textContent = "OFF";
        
    } else {
        button.textContent = "ON";
    }
}

(function () {

    "use strict";

    // Do a cross domain request
    MashupPlatform.http.makeRequest('http://example.com/path', {
        method: 'GET',
        onSuccess: function (response) {
            // code for the success condition
        },
        onFailure: function (response) {
            // code for the failure condition
        }
    });

    // Register a callback for an input endpoint
    MashupPlatform.wiring.registerCallback('inputendpoint', function () {
        // code for handling incoming data from inputendpoint
    });

})();