/*global MashupPlatform*/

    var create_msg = function create_msg(msg, type) {
        var element = document.createElement('div');
        element.className = 'alert alert-block';
        if (type != null) {
            type = 'alert_' + type;
        } else {
            type = 'alert_error';
        }
        element.classList.add();
        element.textContent = msg;
        document.body.appendChild(element);
        setTimeout(function () {
            document.body.removeChild(element);
        }, 3000);
    };

    function sendCommand(code) {

        var body = JSON.stringify({
            "commandML": "<paid:command name=\"SET\"><paid:cmdParam name=\"FreeText\"><swe:Text><swe:value>FIZCOMMAND " + code + "</swe:value></swe:Text></paid:cmdParam></paid:command>"
        });

        var url = MashupPlatform.prefs.get('idas_server');
        $('#console_debug').prepend("POST: "+url+"\n");
        $('#console_debug').prepend("DATA: "+body+"\n");

        MashupPlatform.http.makeRequest("http://10.10.22.210:7777", {
                contentType: 'application/json',
                postBody: body,
                onSuccess: function () {
                    //create_msg('Command sent successfully', 'success');
                    $('#console_debug').prepend("success!\n");
                },
                onFailure: function () {
                    //create_msg('Error reporting the issue');
                    $('#console_debug').prepend("failure!\n");
                }.bind(this)
            }
        );
    };

function toggle()
{
    //Checking if select field is enabled
    var button = document.getElementById("onoff");
    var code = "0";

    if (button.textContent === "ON")
    {
        //Changing the select field state to disabled and changing the value of button to enable
        button.textContent = "OFF";
        code = "0";
        
    } else {
        button.textContent = "ON";
        code = "255";
    }

    sendCommand(code);
};
