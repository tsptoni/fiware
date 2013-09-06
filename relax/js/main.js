/*global MashupPlatform*/

    var create_msg = function create_msg(msg, type) {
        var element = document.createElement('div');
        element.className = 'alert alert-block';
        if (type !== null) {
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

        var url = MashupPlatform.prefs.get('my_server');
        $('#console_debug').prepend("<p>GET: "+url+"</br>");
        //alert(body);
        xmlHttp = new XMLHttpRequest(); 

        MashupPlatform.http.makeRequest(url, {
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

function toggle(img)
{
    //Checking if select field is enabled
    // var button = $('#onoff');
    var code = "off";

    if (img.src.match(/switch-on.svg$/))
    {
        //Changing the select field state to disabled and changing the value of button to enable
        img.src = img.src.replace("-on", "-off");
        code = "off";
        console.log('Relax is OFF.');
        
    } else {
        img.src = img.src.replace("-off", "-on");
        code = "on";
        console.log('Relax is ON');
    }

    sendCommand(code);
};
