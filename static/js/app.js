// Select all the elements in the HTML page
// and assign them to a variable
let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = -1;
let isPlaying = false;
let updateTimer;


function record() {
  //location.reload(true);
  //window.location.reload(true)
  window.location.href = window.location.href
  //$window.location.href = currentUrl + '?' + new Date().getTime();
  //setInterval(click, 8000);
}

function click()
{
  //$("#mic").click();
  document.getElementById("mic").click();
}

function ZoomScreen200() {
document.body.style.zoom="200%"
 }

function pageScroll() {
        window.scrollBy(0,70); // horizontal and vertical scroll increments
        scrolldelay = setTimeout('pageScroll()',10000); // scrolls every 10000 milliseconds
}
function pageScrollSlow() {
        clearTimeout(scrolldelay);
}

// Create new audio element
let curr_track = document.createElement('audio');
track_index = Number(document.getElementById('data').innerHTML)
// Define the tracks that have to be played
let track_list = [

{
	name: "Cover Assembly",
	artist: "version 1",
	image: "C:/Users/Gjeethwani/PycharmProjects/pythonProject/speechtest/mp3/output1.pdf",
	path: "static/music/CSAF.mp3"
},
{
	name: "Final Mech",
	artist: "version 1",
	image: "C:/Users/Gjeethwani/PycharmProjects/pythonProject/speechtest/mp3/output1.pdf",
	path: "static/music/FinalMech.mp3"
},
{
	name: "Integrity Critical",
	artist: "version 1",
	image: "C:/Users/Gjeethwani/PycharmProjects/pythonProject/speechtest/mp3/output1.pdf",
	path: "static/music/integrity_critical.mp3"
},
{
	name: "Windows Assembly",
	artist: "version 1",
	image: "C:/Users/Gjeethwani/PycharmProjects/pythonProject/speechtest/mp3/output1.pdf",
	path: "static/music/Window_Critical.mp3"
},
];
function runSpeechRecognition() {
    // get output div reference
    var output = document.getElementById("output");
    // get action element reference
    var action = document.getElementById("action");
          // new speech recognition object
          var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
          var recognition = new SpeechRecognition();

          recognition.onstart = function() {

//          var items = ['tell me', 'listening', 'yo','all ears','what up'];
//          var item = items[Math.floor(Math.random() * items.length)];
//          var xyz = new SpeechSynthesisUtterance();
//          var voices = window.speechSynthesis.getVoices();
//          xyz.lang = 'en-GB';
//          xyz.voice = voices[2];
//          xyz.text = item;
//          window.speechSynthesis.speak(xyz);

          };

          recognition.onspeechend = function() {
              recognition.stop();
          }

          // This runs when the speech recognition service returns result
          recognition.onresult = function(event) {
              var transcript = event.results[0][0].transcript;
              var confidence = event.results[0][0].confidence;
              console.log(transcript);
              console.log(confidence);
              var play_sound = ["play", "lay", "played", "played"];
              var pause_sound = ["pause", "was", "stop", "boss", "stomp","no"];
              var next = ["next","yes"];
              var back = ["back", "previous","smack"];
              var pauseclk = ["boys clock","boss clock","what's clock","pause clock","bostick","plus clock","Plus","Westbrook","voice clock","Boys Club","plus lock","was clock","colesaw"];
//              var zoom_in = ["zoom in", "lay", "played", "played"];
//              var zoom_out = ["zoom out", "lay", "played", "played"];
//              var scroll_down = ["school loan", "sciullo", "crudo", "cool down",
//              "stone","down","go down","pluto","noodle","poodle","slow down","move down","moto"];
//              var scroll_up = ["up", "go up", "cup", "pull up","his pup","move up"];
              var final_mechanical = ["play final", "play final mech", "final", "play final","start final"];
              var integrity_critical = ["critical steps for integrity","integrity","critical integrity"];
              var cover_assembly = ["cover", "play cover", "play cover assembly", "start cover","start covers","start Google"];
              var back_page = ["last page","Backpage","back page","last page","ostrich","previous page"];
              var next_page = ["next page","x-rayed","x-ray","continue","next Bridge","next.","next Week","next Ridge","text Paige","Eastridge"]
              if(transcript=="start clock")
              {
              document.getElementById("start_clock").click();
              }
              if(pauseclk.includes(transcript))
              {
              document.getElementById("pause_clock").click();
              }
              if(transcript=="stop clock")
              {
              document.getElementById("stop_clock").click();
              }
              if(integrity_critical.includes(transcript))
              {
                track_index = 2;
                loadTrack(track_index);
                document.getElementById("pp").click();
              }
              if(final_mechanical.includes(transcript))
              {
                track_index = 1;
                loadTrack(track_index);
                document.getElementById("pp").click();
              }
              if(cover_assembly.includes(transcript))
              {
                track_index = 0;
                loadTrack(track_index);
                playTrack();
              }
              else if(pause_sound.includes(transcript))
              {
                pauseTrack();
                pageScrollSlow();
              }
              else if(play_sound.includes(transcript))
              {
                playTrack();
                pageScroll();
              }
              else if(next.includes(transcript))
              {
                document.getElementById("down").click();
              }
              else if(back.includes(transcript))
              {
                document.getElementById("up").click();
              }
              else if(next_page.includes(transcript))
              {
                document.getElementById("next").click();
              }
              else if(back_page.includes(transcript))
              {
                document.getElementById("back").click();
              }

//              output.innerHTML = "<b>Text:</b> " + transcript + "<br/> <b>Confidence:</b> " + confidence*100+"%";
//              output.classList.remove("hide");
          };

           // start recognition
           recognition.start();
   }



function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();

//  track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent = "PLAYING " + (Number(track_index) + 1) + " OF " + track_list.length;

  updateTimer = setInterval(seekUpdate, 1000);
//  curr_track.addEventListener("ended", nextTrack);
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// Load the first track in the tracklist
if (track_index != -1)
    loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) {playTrack();}
  else {pauseTrack();}
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}
seek_time = "00:00"
setInterval(tracktime, 7000);
scount = 1
function tracktime()
{
if(curr_time.textContent != "00:00")
    {
    if(seek_time==curr_time.textContent) { pageScrollSlow(); scount = 1;}
    if(seek_time!=curr_time.textContent && scount ==1) { pageScroll(); scount = 0; }
    seek_time = curr_time.textContent;
    //setInterval(tracktime, 8000);
    }
}

var startTimerButton = document.querySelector('.startTimer');
var pauseTimerButton = document.querySelector('.pauseTimer');
var timerDisplay = document.querySelector('.timer');
var startTime;
var updatedTime;
var difference;
var tInterval;
var savedTime;
var paused = 0;
var running = 0;
function startTimer(){
  if(!running){
    startTime = new Date().getTime();
    tInterval = setInterval(getShowTime, 1);
// change 1 to 1000 above to run script every second instead of every millisecond.
// one other change will be needed in the getShowTime() .

    paused = 0;
    running = 1;
timerDisplay.style.background = "#FF0000";
    timerDisplay.style.cursor = "auto";
    timerDisplay.style.color = "yellow";
    startTimerButton.classList.add('lighter');
    pauseTimerButton.classList.remove('lighter');
    startTimerButton.style.cursor = "auto";
    pauseTimerButton.style.cursor = "pointer";
  }
}
function pauseTimer(){
  if (!difference){
    // if timer never started, don't allow pause button to do anything
  } else if (!paused) {
    clearInterval(tInterval);
    savedTime = difference;
    paused = 1;
    running = 0;
    timerDisplay.style.background = "#A90000";
    timerDisplay.style.color = "#690000";
    timerDisplay.style.cursor = "pointer";
    startTimerButton.classList.remove('lighter');
    pauseTimerButton.classList.add('lighter');
    startTimerButton.style.cursor = "pointer";
    pauseTimerButton.style.cursor = "auto";
  } else {
// if the timer was already paused, when they click pause again, start the timer again
startTimer();
  }
}
function resetTimer(){
  getFinalTime();
  clearInterval(tInterval);
  savedTime = 0;
  difference = 0;
  paused = 0;
  running = 0;
  timerDisplay.innerHTML = 'Start Clock!';
  timerDisplay.style.background = "#A90000";
  timerDisplay.style.color = "#fff";
  timerDisplay.style.cursor = "pointer";
  startTimerButton.classList.remove('lighter');
  pauseTimerButton.classList.remove('lighter');
  startTimerButton.style.cursor = "pointer";
  pauseTimerButton.style.cursor = "auto";
}
function getFinalTime()
{
  updatedTime = new Date().getTime();
  if (savedTime){
    difference = (updatedTime - startTime) + savedTime;
  } else {
    difference =  updatedTime - startTime;
  }
  // var days = Math.floor(difference / (1000 * 60 * 60 * 24));
  var hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((difference % (1000 * 60)) / 1000);
  var milliseconds = Math.floor((difference % (1000 * 60)) / 100);
  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;
  milliseconds = (milliseconds < 100) ? (milliseconds < 10) ? "00" + milliseconds : "0" + milliseconds : milliseconds;
  alert("Time taken " + hours + ' hours ' + minutes + ' Minutes ' ) ;
}
function getShowTime(){
  updatedTime = new Date().getTime();
  if (savedTime){
    difference = (updatedTime - startTime) + savedTime;
  } else {
    difference =  updatedTime - startTime;
  }
  // var days = Math.floor(difference / (1000 * 60 * 60 * 24));
  var hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((difference % (1000 * 60)) / 1000);
  var milliseconds = Math.floor((difference % (1000 * 60)) / 100);
  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;
  milliseconds = (milliseconds < 100) ? (milliseconds < 10) ? "00" + milliseconds : "0" + milliseconds : milliseconds;
  timerDisplay.innerHTML = hours + ':' + minutes + ':' + seconds ;
}