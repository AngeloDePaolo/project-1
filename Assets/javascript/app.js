$(document).ready(function () {

    //creating date picker
    $('.datepicker').datepicker();
    $("select").formSelect();
    var selectedState;

    //button function to pull data 

    $(document).on('click', '#submit', function (event) {

        // (in addition to clicks). Prevents the page from reloading on form submit.
        event.preventDefault();
        selectedState = $("#state option:selected").text();
        selectedCity = $("#city").val();
        selectedZip = $('#zipCode').val();



        var queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=restaurants&location="+ selectedCity + selectedState + " " + selectedZip + "&limit=10&sort_by=rating";

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

                $('#content').append('<div id="contentRow" class="row">' + '<div class="card horizontal">' + '<div class="card-image waves-effect waves-block waves-light">' + '<img class="activator" src="' + img + '"></div>' + '<div class="card-content">' + '<span class="card-title activator grey-text text-darken-4">' + name + '<i class="material-icons right">More Info</i></span>' + '<div class="rating"><p>Rating:' + rating + ' Stars</p></div>' + '<div class="number"><p>Number: ' + phoneNumber + '</p></div>' + '<div class="address"><p>Address: ' + address + '</p></div></div>' + '<div class="card-reveal"><span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span><p>Here is some more information about this product that is only revealed once clicked on.</p></div></div></div>');
            }
        });
    });
});