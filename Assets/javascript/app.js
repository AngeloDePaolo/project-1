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


        var queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=restaurants&location=" + selectedState + "&limit=10&sort_by=rating";

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
            var resultInput = $('<p>');
            var nameResults = resultInput.append(name + " ");
            var ratingResults = resultInput.append('rating: ' + rating);
            $('.section').append(resultInput);
            }
        });
    });
});