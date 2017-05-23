let bufferBateria;

window.addEventListener('load', function(e) {
  let requestBuffer = new XMLHttpRequest();
  requestBuffer.open("GET",'sounds/bateria.mp3',true);
  requestBuffer.responseType= 'arraybuffer';
  requestBuffer.onload = function(){
      context.decodeAudioData(requestBuffer.response, function(b){
        buffer = b;
      });
  };
  requestBuffer.send();
});

var tmpPausaBateria;
let sourceBateria;
var gainNodeBateria = context.createGain();
gainNodeBateria.gain.value = 1.0;

let botaoPlayBateria = document.getElementById('botaoPlayBateria');
botaoPlayBateria.addEventListener('click',function(e) {
  sourceBateria = context.createBufferSource();
  sourceBateria.bufferBateria = bufferBateria;
  sourceBateria.loop = true;
  sourceBateria.connect (gainNodeBateria);
  gainNodeBateria.connect(context.destination);
  if (tmpPausaBateria) {
      tmpInicioBateria = Date.now() - tmpPausaBateria;
      sourceBateria.start(0, tmpPausaBateria / 1000);
  }
  else {
      tmpInicioBateria = Date.now();
      sourceBateria.start(0);
  }
},false);

let botaoPauseBateria = document.getElementById('botaoPauseBateria');
botaoPauseBateria.addEventListener('click',function(e){
    sourceBateria.stop(0);
    tmpPausaBateria = Date.now() - tmpInicioBateria;
},false);

let controleVolumeBateria =  document.getElementById('volumeBateria');
controleVolumeBateria.value = 1.0;
controleVolumeBateria.addEventListener("input", function(e){
    gainNodeBateria.gain.value = controleVolumeBateria.value;
}, false);
