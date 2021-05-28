var loadedSounds = {};
var currentSoundIndex = 1;


function openSoundFile() {
  document.getElementById('soundinp').click();
}

function readSoundFile(e) {
  var file = e.target.files[0];
  if (!file) return;
  var reader = new FileReader();

  reader.onload = function(e) {
    var name = "sound" + currentSoundIndex++;
    var audioFile = createListEntryForSound(name, e.target.result);
    audioFile.gid = name;
    loadedSounds[name] = audioFile;
    //audioFile.play();
  }

  reader.readAsDataURL(file);
}



function createListEntryForSound(name, src){
  var container = document.getElementById("soundsDiv");
  var soundDiv = document.createElement("div");
  soundDiv.className  = "soundDiv";
  soundDiv.id = name;
  var soundName = document.createElement("input");
  soundName.className = "soundName codeFont";
  soundName.value = name;
  soundName.name = name;
  soundName.onchange = function() {renameSound(this)};
  
  container.appendChild(soundDiv);
  soundDiv.appendChild(soundName);

  var sound      = document.createElement('audio');
  sound.id       = name + "audio";
  sound.controls = 'controls';
  sound.src      = src;
  sound.type     = 'audio';
  soundDiv.appendChild(sound);

  // var playButton = document.createElement("button");
  // playButton.className = "fa fa-play playSoundButton"
  // playButton.onclick = function() {var soundName =  Object.keys(loadedSounds).filter(soundName => loadedSounds[soundName].gid === name); loadedSounds[soundName[0]].play()};
  // soundDiv.appendChild(playButton);

  // var stopButton = document.createElement("button");
  // stopButton.className = "fa fa-stop stopSoundButton"
  // stopButton.onclick = function() {var soundName =  Object.keys(loadedSounds).filter(soundName => loadedSounds[soundName].gid === name); loadedSounds[soundName[0]].pause(); loadedSounds[soundName[0]].currentTime = 0;};
  // soundDiv.appendChild(stopButton);

  var deleteButton = document.createElement("button");
  deleteButton.className = "fa fa-times deleteSoundButton";
  deleteButton.onclick = function() {removeSound(this.parentNode.id)};
  soundDiv.appendChild(deleteButton);

  return sound;
  
}


function renameSound(el){
  var oldName = el.name;
  var newName = el.value.toLowerCase();
  if (oldName === newName){return;}
  loadedSounds[newName] = loadedSounds[oldName];
  delete loadedSounds[oldName];
  el.name = newName;
  el.value = newName;
}


function removeSound(name){
  var element = document.getElementById(name);
  element.parentNode.removeChild(element);
  var soundName =  Object.keys(loadedSounds).filter(soundName => loadedSounds[soundName].gid === name);
  delete loadedSounds[soundName[0]];
}

function stopAllAudio(){
  for (var soundName in loadedSounds){
    loadedSounds[soundName].pause();
    loadedSounds[soundName].currentTime = 0;
  }
}