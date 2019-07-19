$(document).ready(function () {

    //creating date picker
    $('.datepicker').datepicker();
    $("select").formSelect();
    var selectedState;

    //button function to pull data 

    $(document).on('click', '#submit', function (event) {

        // (in addition to clicks). Prevents the page from reloading on form submit.
        $("#content").html("");
        event.preventDefault();
        selectedState = $("#state option:selected").text();
        selectedCity = $("#city").val();
        selectedZip = $('#zipCode').val();

        var APIKey = "d2f6cebcdd5a345807c7261778eaadb4";
        var weatherQueryURL = "https://api.openweathermap.org/data/2.5/forecast?" +
            "q=" + selectedCity + "&units=imperial&appid=" + APIKey;
        // We store all of the retrieved data inside of an object called "response"
        $.ajax({
            url: weatherQueryURL,
            method: "GET"
        }).then(function (response) {

            // Log the queryURL
            console.log(queryURL);

            // Log the resulting object
            console.log(response);
            var day;
            $(".city").html(response.city.name + " Weather Details");

            for (day = 0; day < 5; day++) {

                var temp_minDaily = response.list[day * 8].main.temp_min;
                var cnt = 8;

                for (var i = 1; i < cnt; i++) {
                    //console.log(response.list[i].main.temp_min);           
                    if (response.list[day * 8 + i].main.temp_min < temp_minDaily) { temp_minDaily = response.list[day * 8 + i].main.temp_min };
                };

                var temp_maxDaily = response.list[day].main.temp_max;
                for (var i = 1; i < cnt; i++) {
                    //console.log(response.list[i].main.temp_max);           
                    if (response.list[day * 8 + i].main.temp_max > temp_maxDaily) { temp_maxDaily = response.list[day * 8 + i].main.temp_max };
                };

                var humididtyAll = 0;
                for (var i = 0; i < cnt; i++) {
                    humididtyAll += response.list[day * 8].main.humidity;
                }
                humididtyAll = humididtyAll / cnt;

                console.log(temp_minDaily);
                console.log(temp_maxDaily);
                console.log(humididtyAll + "%");

                // Transfer content to HTML
                $('.day' + day + 'weather').html('Weather Info of Day ' + parseInt(day + 1) +
                    '<div class="minTemp lineBreak">' + "<img class='weatherIcons' src='Assets/images/mintempicon.png' alt='minimum temperature icon'>Min: " + (Math.round(temp_minDaily)) + "&#176;" + "F" + '</div>' +
                    '<div class="maxTemp lineBreak">' + "<img class='weatherIcons' src='Assets/images/maxtempicon.png'>Max: " + (Math.round(temp_maxDaily)) + "&#176;" + "F" + '</div>' +
                    '<div class="humidity lineBreak">' + "<img class='weatherIcons' src='Assets/images/humidityicon.png'>Humidity: " + (Math.round(humididtyAll)) + "%" + '</div>' +
                    '<div class="weather lineBreak">' + "<img class='weatherIcons' src='Assets/images/skiesicon.png'>Skies: " + response.list[day * 8].weather[0].description + '</div>' +
                    '<div class="wind lineBreak">' + "<img class='weatherIcons' src='Assets/images/windicon.png'>Wind Speed: " + response.list[day * 8].wind.speed + " mph" + '</div>'
                );
            }
        });


        var queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=restaurants&location=" + selectedCity + selectedState + " " + selectedZip + "&limit=10&sort_by=rating";

        console.log(queryURL);
        //ajax call to obtain data
        $.ajax({
            url: queryURL,
            headers: {
                'Authorization': 'Bearer LXDxHmJLs94_VMImPb8QvJj1gEr4EwAYvjRC--85A3OEg3axNAAs5xjWO9kzsTLNXJJdRcG92lSZhhjOUOt3qhYmKXYVNrimLcST0TQiGc8fLeQPgF_rNQtStvwnXXYx',
            },
            method: "GET",
        }).then(function (response) {

            for (var i = 0; i < response.businesses.length; i++) {
                var name = response.businesses[i].name;
                var rating = response.businesses[i].rating;
                var img = response.businesses[i].image_url;
                var address = response.businesses[i].location.city + " " + response.businesses[i].location.state + " " + response.businesses[i].location.address1 + " " + response.businesses[i].location.zip_code;
                var phoneNumber = response.businesses[i].display_phone;
                var price = response.businesses[i].price;
                var url = response.businesses[i].url;

                $('#content').append('<div id="contentRow" class="row">' + '<div class="card horizontal">' + '<div class="card-image waves-effect waves-block waves-light">' + '<img class="activator" src="' + img + '"></div>' + '<div class="card-content">' + '<span class="card-title activator grey-text text-darken-4">' + name + '<i class="material-icons right">More Info</i></span>' + '<div class="rating"><p>Rating: ' + rating + ' Stars</p></div>' + '<div class="number"><p>Number: ' + phoneNumber + '</p></div>' + '<div class="address"><p>Address: ' + address + '</p></div></div>' + '<div class="card-reveal"><span class="card-title grey-text text-darken-4">' + name + '<i class="material-icons right">close</i></span><p>'+ 'price level: ' + price + '<br>' + '<a href =' + url +'>Yelp Page</a>' +  '</p></div></div></div>');

            }
        });
    });
});