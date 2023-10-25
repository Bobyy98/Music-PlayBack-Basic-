console.log("Welcome to Music PlayBack");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songQueue = [];

let songs = [
    {songName: "Michael Jackson - Billie Jean", filePath: "songs/1.mp3", coverPath: "covers/billiejean.png"},
    {songName: "Dua Lipa - Levitating", filePath: "songs/2.mp3", coverPath: "covers/levitating.png"},
    {songName: "Glass Animals - Heat Waves", filePath: "songs/3.mp3", coverPath: "covers/heatwaves.png"},
    {songName: "John Newman - Love Me Again", filePath: "songs/4.mp3", coverPath: "covers/lovemeagain.png"},
    {songName: "Coldplay - Hymn For The Weekend", filePath: "songs/5.mp3", coverPath: "covers/coldplay.png"},
    {songName: "OneRepublic - Counting Stars", filePath: "songs/6.mp3", coverPath: "covers/countingstars.png"},
    {songName: "Post Malone - rockstar ft. 21 Savage", filePath: "songs/7.mp3", coverPath: "covers/rockstar.png"},
    {songName: "Sean Paul, Dua Lipa - No Lie", filePath: "songs/8.mp3", coverPath: "covers/nolie.png"},
    {songName: "The Weeknd - Starboy", filePath: "songs/9.mp3", coverPath: "covers/starboy.png"},
    {songName: "Tinie Tempah - Girls Like (Feat. Zara Larsson)", filePath: "songs/10.mp3", coverPath: "covers/girlslike.png"},
];

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

// Function to play the next song in the queue
function playNextInQueue() {
    if (songQueue.length > 0) {
        const nextSongIndex = songQueue.shift(); // Dequeue the first song index
        audioElement.src = songs[nextSongIndex].filePath;
        masterSongName.innerText = songs[nextSongIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    }
}

// Function to play the next song
function playNextSong() {
    if (songQueue.length > 0) {
        playNextInQueue(); // Play the next song in the queue
    } else if (songIndex < songs.length - 1) {
        songIndex++;
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    }
}

// Event listener for the 'ended' event
audioElement.addEventListener('ended', () => {
    playNextSong(); // Call the function to play the next song in the queue or array
});

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})



