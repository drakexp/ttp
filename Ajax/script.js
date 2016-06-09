$(document).ready(function(){
  $("#search").on("submit",function(e){
    e.preventDefault();
    var formData = {
      'q'              : $('input[name=q]').val(),
      'type'             : $('input[name=type]').val()
    };
    document.getElementById('top').innerText = formData.q;
    $.ajax({
      type: "GET",
      url: 'https://api.spotify.com/v1/search',
      data: formData,
      success: function (response) {
        var artistArray= response.artists.items; 
    
        for(var i = 0 ; i<artistArray.length; i++){
          for(var j = 0; j<artistArray[i].images.length; j++){
            console.log(artistArray[i].images[j].url);
             var img = new Image();
             img.src = artistArray[i].images[j].url;
             img .width = artistArray[i].images[j].width;
             img.height = artistArray[i].images[j].height;
             images.appendChild(img);
          }
        }
      }
    });
  });
});