

    /******************************************************************************/
    /********************************* PUBLIC *************************************/
    /******************************************************************************/

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

    function sendCommand() {

        form = $('#id_led_rgb');

        led_r = $('#id_led_r').val();
        led_g = $('#id_led_g').val();
        led_b = $('#id_led_b').val();

        var body = JSON.stringify({
            "commandML": "<paid:command name=\"SET\"><paid:cmdParam name=\"FreeText\"><swe:Text><swe:value>FIZCOMMAND 99-" +
                led_r + "-" + led_g + "-" + led_b + "</swe:value></swe:Text></paid:cmdParam></paid:command>"
        });
    
        alert(body);

        var url = MashupPlatform.prefs.get('idas_server') + 'RGBS:65:FA:11:0002/command';
        MashupPlatform.http.makeRequest(url, {
                contentType: 'application/json',
                postBody: body,
                onSuccess: function () {
                    create_msg('Command sent successfully', 'success');
                },
                onFailure: function () {
                    create_msg('Error reporting the issue');
                }.bind(this)
            }
        );
    };
