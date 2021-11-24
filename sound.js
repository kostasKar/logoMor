var logoSounds = (function(){

  const audioInputElementId = 'soundinp';
  var loadedSounds = {};
  var currentSoundIndex = 1;
  var AudioContext;
  var audioCtx;
  var mediaStreamDest;  

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

     if (Object.keys(loadedSounds).length === 0){
       AudioContext = window.AudioContext || window.webkitAudioContext;
       audioCtx = new AudioContext();
       mediaStreamDest = audioCtx.createMediaStreamDestination();
     }

    
    let sourceNode = audioCtx.createMediaElementSource(sound);
    sourceNode.connect(mediaStreamDest);
    sourceNode.connect(audioCtx.destination);

    var deleteButton = document.createElement("button");
    deleteButton.className = "fa fa-times deleteSoundButton";
    deleteButton.onclick = function() {removeSound(this.parentNode.id)};
    soundDiv.appendChild(deleteButton);

    return sound;
    
  };

  function renameSound(el){
    var oldName = el.name;
    var newName = el.value.toLowerCase();
    if (oldName === newName){return;}
    loadedSounds[newName] = loadedSounds[oldName];
    delete loadedSounds[oldName];
    el.name = newName;
    el.value = newName;
  };

  function removeSound(name){
    var element = document.getElementById(name);
    element.parentNode.removeChild(element);
    var soundName =  Object.keys(loadedSounds).filter(soundName => loadedSounds[soundName].gid === name);
    delete loadedSounds[soundName[0]];
  };

  return {

    getMediaStreamDest: function(){
      return mediaStreamDest;
    },

    soundExists: function(name){
      return (name in loadedSounds);
    },

    getAudio: function(name){
      return loadedSounds[name];
    },

    openSoundFile: function() {
      document.getElementById(audioInputElementId).click();
    },

    readSoundFile: function(e) {
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
    },

    stopAllAudio: function(){
      for (var soundName in loadedSounds){
        loadedSounds[soundName].pause();
        loadedSounds[soundName].currentTime = 0;
      }
    }

  }



})();






