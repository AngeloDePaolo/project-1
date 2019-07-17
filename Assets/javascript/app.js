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

            for(var i =0; i < response.businesses.length; i++)
            {
            var name = response.businesses[i].name;
            var rating = response.businesses[i].rating;
            var img = response.businesses[i].image_url;
            var address = response.businesses[i].location.city + " " + response.businesses[i].location.state + " " + response.businesses[i].location.address1 + " " + response.businesses[i].location.zip_code;
            var phoneNumber = response.businesses[i].display_phone;
           
            //create new div as row
            var contentInfo = $('<p>');
            //new div to put content into
    
            //new
            //img for card
            // var imgResults = contentInfo.append('<img src =' + img + '>' + '<br>');
            // var nameResults = contentInfo.append(name + " " + '<br>');
            // var addressResults = contentInfo.append(address + " " + '<br>');
            // var ratingResults = contentInfo.append('rating: ' + rating + " " + '<br>');
            // var phoneNumberResults = contentInfo.append(phoneNumber + " " + '<br>');

            $('#content').append('<div class="content col s12 m6 l4" >'+'<div class="card"><div class="card-image"><img src="' + img + '"></div>'+'<div class="card-content">'+'<span class="card-title grey-text text-darken-4">' + name + '</span>'+'<p class="card-subtitle grey-text text-darken-2">' + rating + '</p>'+'<p><a href="' + address + '" class="modal-trigger">View More</a></p>'+'</div></div></div>');

            }
        });
    });
});