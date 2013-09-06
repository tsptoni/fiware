function sendCommand() {

    // $('#console_debug').prepend("<p>GET: "+url+"</br>");
    // //alert(body);
    

    // MashupPlatform.http.makeRequest(url, {
    //         contentType: 'application/json',
    //         postBody: body,
    //         onSuccess: function () {
    //             //create_msg('Command sent successfully', 'success');
    //             $('#console_debug').prepend("success!\n");
    //         },
    //         onFailure: function () {
    //             //create_msg('Error reporting the issue');
    //             $('#console_debug').prepend("failure!\n");
    //         }.bind(this)
    //     }
    // );     
        var value = 15;

        (function growData() {
            setTimeout(function() {
                if (value++ < 35) {
                var warmer = google.visualization.arrayToDataTable([
                  ['Label', 'Value'],
                  ['Temperature', value],
                  ]);

                var warmer_options = {
                  width: 400, height: 300,
                  redFrom: 40, redTo: 50,
                  yellowFrom: 30, yellowTo: 40,
                  minorTicks: 5, max: 50,
                  greenColor: '#109618', greenFrom:0, greenTo: 30
                };

                var warmer_chart = new google.visualization.Gauge(document.getElementById('warmer_chart'));

                warmer_chart.draw(warmer, warmer_options);

                growData();
                }
            }, 200);
        })();

    $.ajax({
       url: "/towel",
       success: function(data){
            console.log(data + "\n");
       },
       timeout: 3000 //in milliseconds
    });
}