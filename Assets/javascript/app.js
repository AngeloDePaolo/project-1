$(document).ready(function () {

    //creating date picker
    $('.datepicker').datepicker();

    //button function to pull data 
    $('.btn').on('click', function (event) {

        // (in addition to clicks). Prevents the page from reloading on form submit.
        event.preventDefault();

        var location = $('#zipCode').val().trim();

        var queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=coffee&location=" + location + "&limit=10&sort_by=distance&radius=6440";

        //ajax call to obtain data
        $.ajax({
            url: queryURL,
            headers: {
                'Authorization': 'Bearer LXDxHmJLs94_VMImPb8QvJj1gEr4EwAYvjRC--85A3OEg3axNAAs5xjWO9kzsTLNXJJdRcG92lSZhhjOUOt3qhYmKXYVNrimLcST0TQiGc8fLeQPgF_rNQtStvwnXXYx',
            },
            method: "GET",
        }).then(function (response) {

            var results = response.businesses

            // Looping over every result item
            for (var i = 0; i < results.length; i++) {

            var resultInput = $('<p>');
            var result = resultInput.append(results);
            $('#displayResults').append(result);
            }
        });
    });
});


