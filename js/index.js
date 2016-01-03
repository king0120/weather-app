$(document).ready(function() {
  //Creating Variables to be used later
  var $cityName;
  var $weatherMain;
  var $weatherDescription;
  var $units = "imperial";
  var $tStyle = " Fahrenheit";
  var $weatherPic;
  var $currentCity;
$.getJSON("http://ipinfo.io/json", function(response) {
    //Current location info from ipinfo
    console.log(response.city, response.country);
    $currentCity = response.city;
    $.getJSON('http://api.openweathermap.org/data/2.5/weather', {
        APPID: "03d186981605d1e062c234348033eefe",
        q: $currentCity,
        units: $units
      },
      function (weatherReport) {
        //Variables taking info from Open Weather
        $cityName = "<p>The current weather in <br>" + weatherReport.name + ", " + response.region + " is...</p>";
        $weatherMain = weatherReport.main.temp;
        $weatherDescription = weatherReport.weather[0].main;
        $weatherPic = "<img src='http://openweathermap.org/img/w/'";

        //Writes to the document
        $('#cityName').html($cityName);
        $('#temperature').text($weatherMain + '°' + $tStyle);
        $('#weatherStyle p').html(weatherReport.weather[0].description);
        $('#weatherPic').html('<img src= "http://openweathermap.org/img/w/' + weatherReport.weather[0].icon + '.png">');

        //Generates background based on weather
        switch ($weatherDescription) {
          case "Clouds":
            $('body').css("background-image", "url('http://i.imgur.com/JaajGKM.jpg')");
            break;
          case "Rain":
            $('body').css("background-image", "");
            $('body').css("background-image", 'url(http://cdni.wired.co.uk/1240x826/s_v/Storm-2--Wired-19sep13_REX_Marko-Korosec_b_1240x826.jpg)');
            break;
          case "Drizzle":
            $('body').css("background-image", "");
            $('body').css("background-image", 'url(http://img07.deviantart.net/ea88/i/2012/198/6/b/drizzle__by_niki91-d57kcpt.jpg)');
            break;
          case "Thunderstorm":
            $('body').css("background-image", "");
            $('body').css("background-image", 'url(https://www.ngdc.noaa.gov/hazard/icons/quiz/thunderstorms.jpg)');
            break;
          case "Snow":
            $('body').css("background-image", "");
            $('body').css("background-image", 'url(        https://upload.wikimedia.org/wikipedia/commons/4/4a/Snow_on_the_mountains_of_Southern_California.jpg)');
            break;
          default:
            $('body').css("background-image", "");
            $('body').css("background-image", 'url(http://www.4cleanair.org/sites/default/files/committees_items/clear-sky.jpg)');

        }

        if (parseInt($weatherMain) >= 80) {
          $('#tempPic').html("<img src='http://i.imgur.com/IGfnCQN.png'>");
        } else if (parseInt($weatherMain) >= 32) {
          $('#tempPic').html("<img src='http://i.imgur.com/c1baR7a.png'>");
        } else {
          $('#tempPic').html("<img src='http://i.imgur.com/EofQ8sd.png'>");
        }//end temp pic

      });
  });
  //Adds functionality to F and C buttons.  Default is Fahrenheit.
  $('.cf button').click(
    function() {
      $(".cf button").removeClass("selected");
      $(this).addClass('selected');
      if ($('#cel').hasClass('selected')) {
        $units = "metric";
        $tStyle = " Celcius";
        $('form').trigger('submit');
      } else {
        $units = "imperial";
        $tStyle = ' Fahrenheit';
        $('form').trigger('submit');
      }
    }
  );

  //start AJAX
  $('form').submit(function(event) {
    event.preventDefault(); //keeps page from reloading
    var $search = $('#search');
    var weatherAPI = 'http://api.openweathermap.org/data/2.5/weather?APPID=03d186981605d1e062c234348033eefe';

    //data used is City, Country.  Want to add optional Zip Code or City ID
    var data = {
      q: $search.val(),
      units: $units
    };

    //begin AJAX function
    function showWeather(weatherReport) {
      //Variables taking info from Open Weather
      $cityName = "<p>The current weather in <br>" + weatherReport.name + " is...</p>";
      $weatherMain = weatherReport.main.temp;
      $weatherDescription = weatherReport.weather[0].main;
      $weatherPic = "<img src='http://openweathermap.org/img/w/'";

      //Writes to the document
      $('#cityName').html($cityName);
      $('#temperature').text($weatherMain + '°' + $tStyle);
      $('#weatherStyle p').html(weatherReport.weather[0].description);
      $('#weatherPic').html('<img src= "http://openweathermap.org/img/w/' + weatherReport.weather[0].icon + '.png">');

      //Test of an if statement that can show photos for interactivity.
      if ($units === "imperial") {
        if (parseInt($weatherMain) >= 80) {
          $('#tempPic').html("<img src='http://i.imgur.com/IGfnCQN.png'>");
        } else if (parseInt($weatherMain) >= 32) {
          $('#tempPic').html("<img src='http://i.imgur.com/c1baR7a.png'>");
        } else {
          $('#tempPic').html("<img src='http://i.imgur.com/EofQ8sd.png'>");
        }
      } else {
        if (parseInt($weatherMain) >= 25) {
          $('#tempPic').html("<img src='http://i.imgur.com/IGfnCQN.png'>");
        } else if (parseInt($weatherMain) >= 0) {
          $('#tempPic').html("<img src='http://i.imgur.com/c1baR7a.png'>");
        } else {
          $('#tempPic').html("<img src='http://i.imgur.com/EofQ8sd.png'>");
        }
      }

      //Changes background depending on weather conditions.  add more else if statements
      if ($weatherDescription === "Clouds") {
        $('body').css("background-image", "url('http://i.imgur.com/JaajGKM.jpg')");
      } else if ($weatherDescription === "Rain") {
        $('body').css("background-image", "");
        $('body').css("background-image", 'url(http://cdni.wired.co.uk/1240x826/s_v/Storm-2--Wired-19sep13_REX_Marko-Korosec_b_1240x826.jpg)');
      } else if ($weatherDescription === "Drizzle") {
        $('body').css("background-image", "");
        $('body').css("background-image", 'url(http://img07.deviantart.net/ea88/i/2012/198/6/b/drizzle__by_niki91-d57kcpt.jpg)');
      } else if ($weatherDescription === "Thunderstorm") {
        $('body').css("background-image", "");
        $('body').css("background-image", 'url(https://www.ngdc.noaa.gov/hazard/icons/quiz/thunderstorms.jpg)');
      } else if ($weatherDescription === "Snow") {
        $('body').css("background-image", "");
        $('body').css("background-image", 'url(        https://upload.wikimedia.org/wikipedia/commons/4/4a/Snow_on_the_mountains_of_Southern_California.jpg)');
      } else {
        $('body').css("background-image", "");
        $('body').css("background-image", 'url(http://www.4cleanair.org/sites/default/files/committees_items/clear-sky.jpg)');
      }

    }
    //process the JSON
    $.getJSON(weatherAPI, data, showWeather);

  });

});
