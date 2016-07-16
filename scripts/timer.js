
jQuery.ajax
  ({
    type: "POST",
    url: "https://demo.calendar42.com/api/v2/events/",
    headers: {
        "Accept": "application/json", "Content-type": "application/json", "add Access-Control-Allow-Origin": "https://demo.calendar42.com/api/v2/events/", "Authorization": "Token {{82044f406e4cab221b6e89a457388fd5314f35f9}}", 
    },
    dataType: "json",
    data: {"event_type": "normal", "title": "My tracked time", "start": "2016-02-16T15:00:00Z", "start_timezone": "Europe/Amsterdam", "end": "2016-06-16T18:00:00Z", "end_timezone": "Europe/Amsterdam", "rsvp_status": "attending", "user id": "f8edc3b217c42e506e964b9aad3ed4", "service id": "17c9ba1cf4f2c425173cf8c13ffc271d0772b2b7" } ,
    success: function(){
    alert('success');
  },
    error:function(error){ 
        console.log('errorMSG' + JSON.stringify(error));
    }

});


/*
jQuery.ajax
  ({
    type: "POST",
    url: "https://demo.calendar42.com/api/v2/events/",

    dataType: "jsonp",
    data: {"event_type": "normal", "title": "My tracked time", "start": "2016-02-16T15:00:00Z", "start_timezone": "Europe/Amsterdam", "end": "2016-06-16T18:00:00Z", "end_timezone": "Europe/Amsterdam", "rsvp_status": "attending", "user id": "f8edc3b217c42e506e964b9aad3ed4", "service id": "17c9ba1cf4f2c425173cf8c13ffc271d0772b2b7" } ,

    success: function (data) {
        console.log(data);
    },
    error:function(error){ 
        console.log('errorMSG' + JSON.stringify(error));
    }
});

*/



jQuery(function() {
    
    var hours = minutes = seconds = milliseconds = 0;
    var prev_hours = prev_minutes = prev_seconds = prev_milliseconds = undefined;
    var timeUpdate;
    
    // Start button onClick
    jQuery('#start').click(function(){
        // Start button
        if(jQuery(this).text() == "Start"){  // check button label
            jQuery(this).html("<span class='ui-button-text'>Start</span>");
            updateTime(0,0,0,0);
        }
        // End button
        jQuery('#end').click(function(){
        if(jQuery(this).text() == "End"){
            clearInterval(timeUpdate);
            jQuery(this).html("<span class='ui-button-text'>End</span>");
       }
           
    });
    
    // Reset button onClick
    jQuery('#reset').click(function(){
        if(timeUpdate) clearInterval(timeUpdate);
        setStopwatch(0,0,0,0);
        jQuery("#start").html("<span class='ui-button-text'>Start</span>");      
    });
    
    // Update time in stopwatch periodically - every 25ms
    function updateTime(prev_hours, prev_minutes, prev_seconds, prev_milliseconds){
        var startTime = new Date();    // fetch current time
        
        timeUpdate = setInterval(function () {
            var timeElapsed = new Date().getTime() - startTime.getTime();    // calculate the time elapsed in milliseconds
            
            // calculate hours                
            hours = parseInt(timeElapsed / 1000 / 60 / 60) + prev_hours;
            
            // calculate minutes
            minutes = parseInt(timeElapsed / 1000 / 60) + prev_minutes;
            if (minutes > 60) minutes %= 60;
            
            // calculate seconds
            seconds = parseInt(timeElapsed / 1000) + prev_seconds;
            if (seconds > 60) seconds %= 60;
            
            // calculate milliseconds 
            milliseconds = timeElapsed + prev_milliseconds;
            if (milliseconds > 1000) milliseconds %= 1000;
            
            // set the stopwatch
            setStopwatch(hours, minutes, seconds, milliseconds);
            
        }, 25); // update time in stopwatch after every 25ms
        
    }
    
    // Set the time in stopwatch
    function setStopwatch(hours, minutes, seconds, milliseconds){
        jQuery("#hours").html(prependZero(hours, 2));
        jQuery("#minutes").html(prependZero(minutes, 2));
        jQuery("#seconds").html(prependZero(seconds, 2));
       jQuery("#milliseconds").html(prependZero(milliseconds, 3));
    }
    
    // Prepend zeros to the digits in stopwatch
    function prependZero(time, length) {
        time = new String(time);    // stringify time
        return new Array(Math.max(length - time.length + 1, 0)).join("0") + time;
    }
  });
});