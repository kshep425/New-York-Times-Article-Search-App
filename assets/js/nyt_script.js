console.log("New York Times Article Search Started")
let search_term, num_records, start_year, end_year;

$("#search_button").on("click", function() {
    execute_query();
})

function execute_query(){
    search_term = $("#search_term").val().trim();
    num_records = $("#num_records").val().trim();
    start_year = $("#start_year").val().trim();
    end_year = $("#end_year").val().trim();

    // search_term = "news";
    // num_records = "5";
    // start_year = "19810401";
    // end_year = "19810430";

    console.log("Search Terms: ");
    console.log("search_term: " + search_term);
    console.log("num_records: " + num_records);
    console.log("start_year: " + start_year);
    console.log("end_year: " + end_year);

    // https://api.nytimes.com/svc/search/v2/articlesearch.json?begin_date=19810401&end_date=19810430&q=news&api-key=gWZiyiD6GBMUzuq0ygbz6m10xPEfuC8O
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=gWZiyiD6GBMUzuq0ygbz6m10xPEfuC8O&sort=newest&q=" + search_term + "&page=" + num_records;

    if (start_year !=""){
        queryURL = queryURL + "&begin_date=" + start_year
    }

    if (end_year != ""){

        queryURL = queryURL + "&end_date=" + end_year
    }

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function(response) {
        console.log(response);
    }).fail(function(response){
        console.log(response);
        alert("Query Failed");
    })
}