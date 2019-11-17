console.log("New York Times Article Search Started")
let search_term, num_records, start_year, end_year;
var resultsDiv = $("#results_div")

$("#search_button").on("click", function() {
    execute_query();
})

$("#Clear_button").click( function() {
    console.log("Clear button clicked")
    resultsDiv.empty();

})

function execute_query(){
    search_term = $("#search_term").val().trim();
    num_records = $("#num_records").val().trim();
    start_year = $("#start_year").val().trim();
    end_year = $("#end_year").val().trim();

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
        console.log(response.response.docs);
        add_results(response.response.docs)
    }).fail(function(response){
        console.log(response);
        alert("Query Failed");
    })
}

function add_results(results){
    console.log(results)
    let card, card_body, article_title, article_author, article_abstract, article_url;

    results.forEach(result => {
        console.log(result)
        card = $("<div>").addClass("card");
        card_body = $("<div>").addClass("card-body");
        article_title = $("<h5>").addClass("card-title").text(result.headline.main);
        article_author = $("<h6>").addClass("card-subtitle mb2 text-muted").text(result.byline.original);
        article_abstract = $("<p>").addClass("card-text").text(result.abstract);
        article_url = $("<a>").addClass("card-link");
        article_url.attr("href", result.web_url);
        article_url.attr("target", "_blank");
        article_url.text("Link to Article");

        resultsDiv.prepend(card);
        card.append(card_body);
        card_body.append(article_title);
        card_body.append(article_author);
        card_body.append(article_abstract);
        card_body.append(article_url);
    })

}