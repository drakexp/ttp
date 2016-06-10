$(document).ready(function(){
   if(Cookies.get("namekey")!= null) {
      document.getElementById('welcome').innerText = Cookies.get("namekey");
   }
   else{
      $("img").fadeOut(4000);
   }
})

function setName() {
   var name = document.getElementById('name').value;
   Cookies.set("namekey", name);
}