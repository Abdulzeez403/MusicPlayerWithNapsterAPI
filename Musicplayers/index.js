 

 let  allMusic =[
  {
    name: "Besti-Ke",
    artist: "Famous1",
    img: "demo1",
    src: "Besti-Ke-Prod.-Zion-Beatz",
  },
  {
    name: "instrumental-Me-and-you",
    artist: "Famous2",
    img: "demo",
    src: "instrumental-Me-and-you-prod-by-Airkay",
  },
  {
    name: "remi",
    artist: "Famous3",
    img: "images",
    src: "remi.prod_.akiira610",
  }
 ]



  const  wrapper = document.querySelector(".container");
  musicImg = wrapper.querySelector(" img");
  musicName = wrapper.querySelector(".songDetial .name");
  musicArt = wrapper.querySelector(".songDetial .artist");
  playPauseBtn = wrapper.querySelector(".play_pause");
  musicAudio = wrapper.querySelector(".audio");
  prevBtn = wrapper.querySelector("#prev");
  nextBtn = wrapper.querySelector("#next");
  progressBar = wrapper.querySelector(".progressbar");
  progressArea = wrapper.querySelector(".progressArea");
  repeatBtn = wrapper.querySelector("#repeat");
  musicList = wrapper.querySelector('.music_list');
  showMoreBtn = wrapper.querySelector('#open');
  HideMoreBtn = musicList.querySelector('#close');

  
  

  let musicIndex =1;
  window.addEventListener('load', ()=>{
    // calling load music function once on window 
    loadMusic(musicIndex)
  })

  const  FetchngMusic = ()=>{
    const MusicApi = " https://api.napster.com/v2.1/tracks/top?apikey=ZTk2YjY4MjMtMDAzYy00MTg4LWE2MjYtZDIzNjJmMmM0YTdm ";
  
    fetch(MusicApi)
    .then(res => res.json())
    .then(data=>{
       const music_Name = data.title;
       const music_Artist = data.artist;
       const music_Img = data.src;
       const music_Audiob= data.music;

    musicImg.src =music_Audiob;

    })
  }
  FetchngMusic();

  // load music function 
  function loadMusic(indexNumb){
    musicName.innerHTML = allMusic[indexNumb - 1].name;
    musicArt.innerHTML = allMusic[indexNumb - 1].artist;
    musicImg.src =`assests/images/${allMusic[indexNumb - 1].img}.jpg`;
    musicAudio.src = `assests/songs/${allMusic[indexNumb - 1].src}.mp3`;   
  }
    

  // play or music button event 
  playPauseBtn.addEventListener("click", ()=>{
    const isMusicedPaised = wrapper.classList.contains('paused');
     isMusicedPaised ? pauseMusic() : playMusic();
     
  })
    //play misc func
    function playMusic(){
      wrapper.classList.add('paused');
      playPauseBtn.querySelector('i').className = "fas fa-pause";
      musicAudio.play();
    }
      //pause misc func
      function pauseMusic(){
        wrapper.classList.remove('paused');
      playPauseBtn.querySelector('i').className = "fas fa-play";

        musicAudio.pause();
      }
//next music func
nextBtn.addEventListener("click", nextMusic);

function nextMusic(){
  musicIndex++;
  musicIndex > allMusic.length ? musicIndex = 1: musicIndex = musicIndex;
  loadMusic(musicIndex);
}

//previous music func
prevBtn.addEventListener("click", ()=>{
  musicIndex--;
  musicIndex <  1 ?   musicIndex = allMusic.length: musicIndex = musicIndex;
  loadMusic(musicIndex);
})

// set the progress width
musicAudio.addEventListener('timeupdate',(e)=>{
  const currentTime= e.target.currentTime;
  const duration = e.target.duration;
  let progressWidth = (currentTime / duration) * 100;
  progressBar.style.width =`${progressWidth}%`;
  
  let musicCurrentTime = wrapper.querySelector('.current'),
  musicDuration = wrapper.querySelector(".duration");
  musicAudio.addEventListener('loadeddata', ()=>{
   
    //update song total duration
    let audioDuration = musicAudio.duration;
    let totalMin = Math.floor(audioDuration / 60);
    let totalSec = Math.floor(audioDuration % 60);
    if (totalSec < 10){
      // add 0 if sec is less than 10
      totalSec = `0${totalSec}`;
    }
    musicDuration.innerText = `${totalMin}:${totalSec}`;
  });

      //update song total duration
      // let audioCurrent = musicAudio.currentTime;
      let currentMin = Math.floor(currentTime / 60);
      let currentSec = Math.floor(currentTime % 60);
      if (currentSec < 10){
        // add 0 if sec is less than 10
        currentSec = `0${currentSec}`;
      }
      musicCurrentTime.innerText = `${currentMin}:${currentSec}`;

  });

  //upadte player song current time according to the progresss bar width

  progressArea.addEventListener('click',(e)=>{
    // getting width of progress bar
    let progresswidthvalue = progressArea.clientWidth; 
    //getting offset x value;
    let clickedOffSetX = e.offsetX;
    let songDuration = musicAudio.duration ;

    musicAudio.currentTime = (clickedOffSetX / progresswidthvalue) * songDuration;
    playMusic();

  })

  // stuffle song accofing to the icon  
  repeatBtn.addEventListener('click', ()=>{
    //first we get the innerText of the icon then we'll change accordingly
    //let change the repear on click
    let getText = repeatBtn.className;
   switch(getText){
    case 'fa fa-repeat':
      repeatBtn.className = 'fas fa-eye';
      repeatBtn.setAttribute('title', "Song Looped");
      break;

    case "fas fa-eye":
      repeatBtn.className = 'fas fa-eye-slash';
      repeatBtn.setAttribute('title', "Playback Looped");
      break;

    case 'fas fa-eye-slash':
      repeatBtn.className = "fa fa-repeat";
      repeatBtn.setAttribute('title', "playlist Looped");
      break;
   }
  });

  //abover we just chamge the icons and lets work on the functionality
  //after the song ended
  musicAudio.addEventListener('ended', ()=>{
    // we'll do accoring to the icon means of user has set icon to looop songthen we'll repeat
    // the current song and swill do further accordingly
    let getText = repeatBtn.className;
    switch(getText){
     case 'fa fa-repeat':
      nextMusic();
       break;
 
     case "fas fa-eye":
     musicAudio.currentTime = 0;
     loadMusic(indexNumb);
       break;
 
     case 'fas fa-eye-slash':
      let randIndex = Math.floor((math.random() * allMusic.length) + 1);
      do{
        randIndex = Math.floor((math.random() * allMusic.length) + 1);
      } while(musicIndex == randIndex);
      musicIndex = randIndex;
      loadMusic(musicIndex);
      playMusic(); 
       break;
    }


  })
  // displaying music list
  showMoreBtn.addEventListener('click', ()=>{
    musicList.classList.toggle('show');
  })

  HideMoreBtn.addEventListener('click',()=>{
    musicList.classList.toggle('show');
  })


  //all music to be map
  mapMusic=wrapper.querySelector(".music_container");
  for (let index = 0; index < allMusic.length; index++) {
    const musicTag =`
    <div class="music_content">
    <div class="songDetialList">
    <h4>${allMusic[index].name}</h4>
     <p>${allMusic[index].artist}</p>
    </div>
    <audio 
    class="${allMusic[index].src}.mp3" 
    src="assests/songs/${allMusic[index].src}.mp3">
    </audio>

    <div class="time">
    <h6"${allMusic[index].src}" class ="audio-duration">0:00</h6>
    </div>
    </div>
    </div> `
    mapMusic.insertAdjacentHTML('beforeend', musicTag);
    let AudioTag = mapMusic.querySelector(`.${allMusic[index].src}`);
    let AudioDuration = mapMusic.querySelector(`#${allMusic[index].src}`);
    
    AudioTag.addEventListener("loadeddata", ()=>{
       //update song total duration
    let audioDuration = AudioTag.duration;
    let totalMin = Math.floor(audioDuration / 60);
    let totalSec = Math.floor(audioDuration % 60);
    if (totalSec < 10){
      // add 0 if sec is less than 10
      totalSec = `0${totalSec}`;
    }
    AudioTag.innerText = `${totalMin}:${totalSec}`;

    })
  }


  




