$(document).ready(function(){
   playlist = new Jukebox;
   playlist.addSong("Kygo - Firestone ft. Conrad Sewell");
   playlist.addSong("Alina Baraz & Galimatias - Fantasy");
   playlist.addSong("Diplo & Sleepy Tom - Be Right There");
   playlist.addSong("Drake - Hold On, Were Going Home ft. Majid Jordan");
   $(".play").click(function(e) { // play button 
      $("#songtitle").hide(); // hide current title status
      playlist.playSong();
      $("#songtitle").fadeIn(250); // fade in now playing status
   });

   $(".pause").click(function(e) { // pause button
      $("#songtitle").hide(); // hide
      playlist.pauseSong();
      $("#songtitle").fadeIn(250);  // fade in paused status
   });

   $(".next").click(function(e) { // next
      $("#songtitle").hide(); // hide
      playlist.nextSong();
      $("#songtitle").fadeIn(250); // fade in next song title
   });

   $(".stop").click(function(e) { // stop
      $("#songtitle").hide(); 
      playlist.stopSong();
      $("#songtitle").fadeIn(250); // fade in title
   });

   $(".previous").click(function(e) { // previous
      $("#songtitle").hide(); 
      playlist.prevSong();
      $("#songtitle").fadeIn(250); // fade in previous song title
   });

   $(".random").click(function(e) { // random
      $("#songtitle").hide(); 
      playlist.randSong();
      $("#songtitle").fadeIn(250); // fade in new song title
   });

   $("#upload").on("submit",function(e) {
      e.preventDefault(); 
      var mp3 = document.getElementById("mp3");
      var file = mp3.files[0]; 
      playlist.addSong("C:/MP3/"+(file.name).slice(0,-4)); // add song in this dir
      addtoPlaylist(); // add to playlist
      alert("Added song to playlist!");
   });

   $("a").click(function(e){
      var titles = document.getElementsByClassName("plisttitle");
      for(var i = 0; i < titles.length; i++) {
         document.getElementById(titles[i].id).style.color = "black";
      } // reset
      document.getElementById(this.id).style.color = "red";
      playlist.playlistSong(this.id);
   });
});

function Jukebox() {
   this.index = 0;
   this.plist = new Array();

   this.addSong = function(song) {
      this.plist.push(song);
   }

   this.playSong = function() { // play
      audio.play(); 
      // change title status text 
      document.getElementById('songtitle').innerText = 
      "Now Playing: " + this.plist[this.index%this.plist.length].replace(/^.*[\\\/]/, '');
   }

   this.pauseSong = function() { // pause
      audio.pause();
      document.getElementById('songtitle').innerText = "Paused";
   }

   this.stopSong = function() {
      audio.load();
      document.getElementById('songtitle').innerText = 
      this.plist[this.index%this.plist.length].replace(/^.*[\\\/]/, '');
   }

   this.nextSong = function() { // next
      this.index += 1; // increase index
      // playlist title select
      var titles = document.getElementsByClassName("plisttitle");
      for(var i = 0; i < titles.length; i++) {
         document.getElementById(titles[i].id).style.color = "black";
      } // reset
      document.getElementById((this.index%this.plist.length)+1).style.color = "red";
      // change audio source to next index
      audio.src = this.plist[this.index%this.plist.length] + ".mp3";
      document.getElementById('songtitle').innerText = 
      this.plist[this.index%this.plist.length].replace(/^.*[\\\/]/, '');
   }

   this.prevSong = function() {
      if(this.index == 0) this.index = this.plist.length-1; // do not want negative index 
      else this.index -= 1; // decrement index
      // playlist title select
      var titles = document.getElementsByClassName("plisttitle");
      for(var i = 0; i < titles.length; i++) {
         document.getElementById(titles[i].id).style.color = "black";
      } // reset
      document.getElementById((this.index%this.plist.length)+1).style.color = "red";
      // change audio souce to previous index
      audio.src = this.plist[this.index%this.plist.length] + ".mp3";
      document.getElementById('songtitle').innerText = 
      this.plist[this.index%this.plist.length].replace(/^.*[\\\/]/, '');
   }

   this.randSong = function() {
      this.index = Math.floor(Math.random()*(this.plist.length)) // random index from 0 to # of songs
      // playlist title select
      var titles = document.getElementsByClassName("plisttitle");
      for(var i = 0; i < titles.length; i++) {
         document.getElementById(titles[i].id).style.color = "black";
      } // reset
      document.getElementById((this.index%this.plist.length)+1).style.color = "red";
      // change audio source
      audio.src = this.plist[this.index%this.plist.length] + ".mp3";
      document.getElementById('songtitle').innerText = 
      this.plist[this.index%this.plist.length].replace(/^.*[\\\/]/, '');      
   }
   this.playlistSong = function(i) {
      this.index = i-1;
      audio.src = this.plist[this.index%this.plist.length] + ".mp3";
      document.getElementById('songtitle').innerText = 
      this.plist[this.index%this.plist.length].replace(/^.*[\\\/]/, '');      
   }
}

// code to add li to ul using code based on
// http://stackoverflow.com/questions/20673959/how-to-add-new-li-to-ul-onclick-with-javascript
function addtoPlaylist() {
  var ul = document.getElementById("playlist");
  var li = document.createElement("li");
  var a = document.createElement("a");
  a.setAttribute("href", "#");
  a.setAttribute("id",playlist.plist.length);
  a.setAttribute("class", "plisttitle");
  a.textContent = playlist.plist[playlist.plist.length-1].replace(/^.*[\\\/]/, '');
  a.addEventListener("click", function(e) {  // add click listener
   var titles = document.getElementsByClassName("plisttitle");
   for(var i = 0; i < titles.length; i++) {
      document.getElementById(titles[i].id).style.color = "black";
   } // reset
   document.getElementById(this.id).style.color = "red";
   playlist.playlistSong(this.id)});
  li.appendChild(a);
  ul.appendChild(li);
}