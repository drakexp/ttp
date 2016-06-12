$(document).ready(function(){
  $("#search").on("submit",function(e){
    e.preventDefault();
    var formData = {
      'title'              : $('input[name=title]').val(),
    };

    $.ajax({
      type: "GET",
      dataType: 'jsonp',
      crossDomain: true,  
      url: 'http://www.giantbomb.com/api/search/?',
      data: {
        api_key: 'e041195e60406514facb452057cdafdfa2f0b0fd',
        format: 'jsonp',
        query: formData.title,
        resources: 'game',
        json_callback: "gamer"
      },
    });
  });
});

function gamer(data) {
    var gameArray = data.results;
    if(gameArray.length > 5) {
      document.getElementById('results').innerText = "Showing Top 5 Results";
    }
    else {
      document.getElementById('results').innerText = "Showing " + gameArray.length + " Results";
    }
    for(var i = 0; i < (gameArray.length && 5); i++) {
      var date = "#date" + (i+1);
      var image = "#image" + (i+1);
      var title = "#title" + (i+1);
      console.log(title);
      var img = new Image();
      img.src = gameArray[i].image.medium_url;
      img.width = 200;
      $(title).text(gameArray[i].name);
      $(date).text(gameArray[i].original_release_date);
      $(image).html(img);
    }
}

