// POPUP
let popup = document.createElement("div");
popup.id="popup";
popup.style.width="95%";
popup.style.height="70%";
popup.style.backgroundColor="rgb(0, 0, 0, 0.9)";
popup.style.position="absolute";
popup.style.top="50px";
popup.style.left="20px";
popup.style.zIndex="1";
popup.style.borderRadius="10px";
let popupText = document.createElement("label");
popupText.innerHTML="WARNING";
popupText.style.color="red";
popupText.style.fontFamily="Arial";
popupText.style.fontSize="xx-large";
popupText.style.fontWeight="800";
popupText.style.position="absolute";
popupText.style.textAlign="center"
popupText.style.width="100%";
popupText.style.top="50px";
popup.appendChild(popupText);
let popupText2 = document.createElement("span");
popupText2.innerHTML="All the songs present in this mp3 are downloaded by external websites and not made by me, the're all remixed in order to avoid the copytight, and of course, everyone can customize the code and add their own songs.";
popupText2.style.color="white";
popupText2.style.fontFamily="Arial";
popupText2.style.fontSize="medium";
popupText2.style.fontWeight="800";
popupText2.style.position="absolute";
popupText2.style.top="200px";
popupText2.style.textAlign="center";
let popupButton = document.createElement("button");
popupButton.innerHTML="OK bruh";
popupButton.style.border="solid red";
popupButton.style.borderWidth="3px";
popupButton.style.background="transparent";
popupButton.style.color="white";
popupButton.style.borderRadius="4px";
popupButton.style.fontWeight="800";
popupButton.style.position="absolute";
popupButton.style.width="100px";
popupButton.style.height="50px";
popupButton.style.top="70%";
popupButton.style.left="40%";
popupButton.setAttribute("onclick","closePopup()")
popup.appendChild(popupText);
popup.appendChild(popupText2);
popup.appendChild(popupButton);
document.body.appendChild(popup);

function closePopup(){
    document.getElementById("popup").remove();
}


var audio = document.getElementById("canzone");
var tempo = document.getElementById("time");
var search = document.getElementById("search");
var barraSearch = document.getElementById("barra");
var volume = document.getElementById("volumeimg");
var barraVolume = document.getElementById("volume");
var valoreDaCercare;
var cronologia =[];
var playlistSelezionata = [];

audio.addEventListener("timeupdate",AutoUpdateTime);
audio.addEventListener("loadedmetadata",ChangeDuration);
audio.addEventListener("ended",nextSong);
tempo.addEventListener("input",ChangePosition);
document.getElementById("searchBar").addEventListener("input",updateValue);
document.getElementById("searchBar").addEventListener("input",Search);
document.getElementById("volumeBar").addEventListener("input",updateVolume);

function songSelect(x){
    audio.src="music/"+x+".mp3";
    audio.play();
    cronologia.splice(0,0,x);
    alert(cronologia);
    if(document.getElementById("pause")){
        document.getElementById("pause").id="play";
        document.getElementById("play").onclick=Play;
        document.getElementById("play").src="image/pause_button.png";
    }

    // Rimuovi la stringa dall'array
    let indice = playlistSelezionata.indexOf(x);
    if (indice !== -1) {
        playlistSelezionata.splice(indice, 1);
    } else {
        null;
    }
}

function Pause(){
    audio.play();
    document.getElementById("pause").id="play";
    document.getElementById("play").onclick=Play;
    document.getElementById("play").src="image/pause_button.png";
}

function Play(){
    audio.pause();
    document.getElementById("play").id="pause";
    document.getElementById("pause").onclick=Pause;
    document.getElementById("pause").src="image/play_button.png";
}

// Funzioni per la timebar 

function AutoUpdateTime(){
    tempo.value=audio.currentTime;
    document.getElementById("startTime").innerHTML=convertiSecondiInMinuti(tempo.value)
}

function ChangePosition(){
    audio.currentTime=tempo.value;
}

function convertiSecondiInMinuti(secondi) {
    const minuti = Math.floor(secondi / 60);
    const secondiRimanenti = secondi % 60;
    const formatoMinutiSecondi = `${String(minuti).padStart(2,0)}:`+Math.round(`${String(secondiRimanenti).padStart(2,0)}`);
    return formatoMinutiSecondi;
}

function ChangeDuration(){
    tempo.max=audio.duration;
    document.getElementById("endTime").innerHTML=convertiSecondiInMinuti(tempo.max)
}

function Loop(){
    document.getElementById("noloop").id="loop";
    document.getElementById("loop").src="image/selectedloop.png"
    document.getElementById("loop").onclick=noLoop;
    audio.loop=true;
}

function noLoop(){
    document.getElementById("loop").id="noloop";
    document.getElementById("noloop").src="image/deselectedloop.png"
    document.getElementById("noloop").onclick=Loop;
    audio.loop=false;
}

function Casual(){
    document.getElementById("nocasual").id="casual";
    document.getElementById("casual").src="image/casualselected.png"
    document.getElementById("casual").onclick=noCasual;
    playlistSelezionata.sort(function() {
        return Math.random() - 0.5;
    });
}

function noCasual(){
    document.getElementById("casual").id="nocasual";
    document.getElementById("nocasual").src="image/casualdeselected.png"
    document.getElementById("nocasual").onclick=Casual;
    playlistSelezionata.sort();
}

function searchBarAnimationIn(){
    document.getElementById("searchBar").style.visibility="visible";
    document.getElementById("searchBar").style.width="100%";
    document.getElementById("resultContainer").style.height="150px";
    document.getElementById("resultContainer").style.width="90%";
    document.getElementById("resultContainer").style.visibility="visible";
}

function searchBarAnimationOut(){
    document.getElementById("searchBar").style.visibility="hidden";
    document.getElementById("searchBar").style.width="30px";
    document.getElementById("resultContainer").style.height="0px";
    document.getElementById("resultContainer").style.width="0px";
    document.getElementById("resultContainer").style.visibility="hidden";
}

function volumeBarAnimationIn(){
    document.getElementById("volumeBar").style.visibility="visible";
    document.getElementById("volumeBar").style.width="190px";
}

function volumeBarAnimationOut(){
    document.getElementById("volumeBar").style.visibility="hidden";
    document.getElementById("volumeBar").style.width="0px";
}

// Lista di tutte le canzoni
const songs = ['DANGEROUS', 'Dreams', 'Fade', 'Fearless', 'GODSLAYER', 'Harder, Better, Faster, Stronger', 'Heroes Tonight', 'Ignite', 'On On', 'Purpose', 'Rise Up', 'Rockabye', 'Royalty', 'Stressed Out', 'Stuck', 'The River', 'The Spectre', 'Where We Started', 'Why We Lose']
// Aggiorna il valore della barra di ricerca
function updateValue(e) {
    valoreDaCercare = e.target.value;
}
    
function Search(){
    // Rimozione ricerca precedente
    for(let i=0;i<500;i++){
        if(document.getElementById("r"+i)){
            document.getElementById("r"+i).remove();
        }
        else{
            break;
        }
    }
    // Ricerca
    let ricerca = songs.map(s => s.toLowerCase()).filter(item => item.includes(valoreDaCercare.toLowerCase()));
    let lista=ricerca.toString().split(",");
    for(i=0; i<lista.length; i++){
        let p = document.createElement("button");
        p.id="r"+i;
        p.className="songs";
        p.draggable="true";
        p.setAttribute("ondragstart","startDrag(event)");
        p.setAttribute("ondragend","dragInterrupted()");
        p.innerHTML=lista[i].charAt(0).toUpperCase()+lista[i].slice(1);
        document.getElementById("resultContainer").appendChild(p);
    }
    for(i=0; i<lista.length; i++){
        document.getElementById("r"+i).setAttribute("onclick","songSelect('"+lista[i]+"')");
    }
    // Pulizia in casa di barra di ricerca vuota
    if(!valoreDaCercare){
        for(let i=0;i<500;i++){
            if(document.getElementById("r"+i)){
                document.getElementById("r"+i).remove();
            }
            else{
                break;
            }
        }
    }
}

function updateVolume(){
    audio.volume=document.getElementById("volumeBar").value;
    if(audio.volume<=0.33){
        document.getElementById("volumeImg").src="image/volume1.png";
    }
    if(audio.volume>0.33 && audio.volume<=0.66){
        document.getElementById("volumeImg").src="image/volume2.png";
    }
    if(audio.volume>0.66){
        document.getElementById("volumeImg").src="image/volume3.png";
    }
    if(audio.volume==0){
        document.getElementById("volumeImg").src="image/stereomuted.png";
    }
}

var newp;
function playList(x){
    // Reset musica
    document.getElementById("box1").remove();
    let newBox = document.createElement("div");
    newBox.id="box1";
    document.body.appendChild(newBox);
    if (x=="tutta"){ // Italia playlist
        playlistSelezionata=['DANGEROUS', 'Fade', 'Fearless', 'GODSLAYER', 'Harder, Better, Faster, Stronger', 'Heroes Tonight', 'Ignite', 'On On', 'Purpose', 'Rise Up', 'Rockabye', 'Royalty', 'Stressed Out', 'Stuck', 'The River', 'The Spectre', 'Where We Started', 'Why We Lose']
    }
    if (x=="pl1"){ // Eminem playlist
        playlistSelezionata=['Fearless', 'Harder, Better, Faster, Stronger', 'Heroes Tonight',"Ignite"]
    }
    if (x=="pl2"){ // Phonk playlist
        playlistSelezionata=['Stressed Out', 'On On', 'Rise Up']
    }
    if (x=="pl3"){ // Preferiti da me playlist
        playlistSelezionata=['Rockabye', 'Royalty', 'The River']
    }
    if (x=="pl4"){ // Italia playlist
        playlistSelezionata=['The Spectre', 'Where We Started', 'Why We Lose']
    }
    playlistSelezionata.sort();
    for(i=0;i<playlistSelezionata.length;i++){
        newp = document.createElement("button");
        newp.className="songs";
        newp.id="n"+i;
        newp.draggable="true";
        newp.setAttribute("ondragstart","startDrag(event)");
        newp.setAttribute("ondragend","dragInterrupted()");
        newp.setAttribute("onclick","songSelect('"+playlistSelezionata[i]+"')");
        newp.innerHTML=playlistSelezionata[i];
        document.getElementById("box1").appendChild(newp);   
    }
}

// Funzioni per il trascinamento

var oggettoRicevuto;


function allowDrop1(event) {
    event.preventDefault();
    document.getElementById("dragHereToNext1").style.backgroundColor="white";
    document.getElementById("dragHereToNext1").style.color="red";
}

function allowDrop2(event) {
    event.preventDefault();
    document.getElementById("dragHereToNext2").style.backgroundColor="white";
    document.getElementById("dragHereToNext2").style.color="red";
}

function dragLeave1() {
    document.getElementById("dragHereToNext1").style.backgroundColor="red";
    document.getElementById("dragHereToNext1").style.color="white";
}

function dragLeave2() {
    document.getElementById("dragHereToNext2").style.backgroundColor="red";
    document.getElementById("dragHereToNext2").style.color="white";
}

function startDrag(event) {
    event.dataTransfer.setData("text/plain", event.target.id);
    document.getElementById("dragHereToNext1").style.width="50%";
    document.getElementById("dragHereToNext1").style.left="0px";
    document.getElementById("dragHereToNext1").style.color="white";
    document.getElementById("dragHereToNext2").style.width="50%";
    document.getElementById("dragHereToNext2").style.right="0px";
    document.getElementById("dragHereToNext2").style.color="white";
}

function handleDrop1(event) {
    event.preventDefault();
    const oggettoId = event.dataTransfer.getData("text/plain");
    const oggetto = document.getElementById(oggettoId);
    oggettoRicevuto = oggetto;
    playlistSelezionata.splice(0,0,oggetto.innerHTML);
}

function handleDrop2(event) {
    event.preventDefault();
    const oggettoId = event.dataTransfer.getData("text/plain");
    const oggetto = document.getElementById(oggettoId);
    oggettoRicevuto = oggetto;
    playlistSelezionata.splice(playlistSelezionata.length,0,oggetto.innerHTML);
}

function dragInterrupted(){
    document.getElementById("dragHereToNext1").style.width="0%";
    document.getElementById("dragHereToNext1").style.left="25%";
    document.getElementById("dragHereToNext1").style.color="black"
    document.getElementById("dragHereToNext1").style.backgroundColor="red";
    document.getElementById("dragHereToNext2").style.width="0%";
    document.getElementById("dragHereToNext2").style.right="25%";
    document.getElementById("dragHereToNext2").style.color="black"
    document.getElementById("dragHereToNext2").style.backgroundColor="red";
}

function nextSong(){
    
    if(playlistSelezionata[0]){
        audio.src="music/"+playlistSelezionata[0]+".mp3";
        audio.play();
    }
    if(playlistSelezionata[1]){
        playlistSelezionata.shift();
    }else{
        playlistSelezionata=[];
    }
    if(document.getElementById("pause")){
        document.getElementById("pause").onclick=Pause;
        document.getElementById("pause").src="image/pause_button.png"
        return 0;
    }
    else{
        document.getElementById("play").src="image/pause_button.png"
    }
}

function Back(){
    playlistSelezionata.splice(0,0,cronologia[0]);
    cronologia.shift();
    nextSong();
}