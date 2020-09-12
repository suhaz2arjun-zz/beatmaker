class DrumKit {
    constructor() {
        this.pads = document.querySelectorAll('.pad');
        this.playButton = document.querySelector('.play')
        this.kickAudio = document.querySelector(".kick-sound");
        this.currentKick = './sounds/kick_1';
        this.currentSnare = './sounds/snare_1';
        this.currentHithat = './sounds/hithat_bass';
        this.snareAudio = document.querySelector(".snare-sound");
        this.hithatAudio = document.querySelector(".hithat-sound");
        this.index = 0;
        this.bpm = 150;
        this.isPlaying = null;
        this.selects = document.querySelectorAll('select');
        this.muteBtns = document.querySelectorAll('.mute');
        this.tempoSlider = document.querySelector('.tempo-slider')

    }
    repeat() {
        let step = this.index % 8;
        const activeBars = document.querySelectorAll(`.b${step}`);
        //Loop over the pads
        activeBars.forEach(bar => {
            bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
            //Check if pads are active
            if (bar.classList.contains('active')) {
                //check each sound
                if (bar.classList.contains('kick-pad')) {
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play();
                }
                if (bar.classList.contains('snare-pad')) {
                    this.snareAudio.currentTime = 0;

                    this.snareAudio.play();
                }
                if (bar.classList.contains('hithat-pad')) {
                    this.hithatAudio.currentTime = 0;
                    this.hithatAudio.play();
                }


            }
        })
        this.index++;

    }
    start() {
        const interval = (60 / this.bpm) * 1000;
        //check if it's playing
        if (!this.isPlaying) {
            this.isPlaying = setInterval(() => {
                this.repeat();
            }, interval);

        } else {
            clearInterval(this.isPlaying);
            this.isPlaying = null;

        }
    }
    activePad() {
        this.classList.toggle("active");
    }
    updateBtn() {
        if (!this.isPlaying) {
            this.playButton.innerText = 'Stop';
            this.playButton.classList.add('active');
        } else {
            this.playButton.innerText = 'Play';
            this.playButton.classList.remove('active');

        }
    }
    changeSound(e) {
        const selectionName = e.target.name;
        const selectionValue = e.target.value;
        console.log(selectionValue);
        console.log(selectionName);
        switch (selectionName) {
            case "kick-select":
                this.kickAudio.src = selectionValue;
                break;
            case "snare-select":
                this.snareAudio.src = selectionValue;
                break;
            case "hithat-select":
                this.hithatAudio.src = selectionValue;
                break;
        }
    }

    mute(e) {
        const muteIndex = e.target.getAttribute('data-track');
        e.target.classList.toggle('active');
        if (e.target.classList.contains('active')) {
            switch (muteIndex) {
                case "0":
                    this.kickAudio.volume = 0;
                    break;
                case "1":
                    this.snareAudio.volume = 0;
                    break;
                case "2":
                    this.hithatAudio.volume = 0;
                    break;

            }
        } else {
            switch (muteIndex) {
                case "0":
                    this.kickAudio.volume = 1;
                    break;
                case "1":
                    this.snareAudio.volume = 1;
                    break;
                case "2":
                    this.hithatAudio.volume = 1;
                    break;


            }
        }
    }
    changeTempo(e) {
        const tempoText = document.querySelector('.tempo-nr');
        tempoText.innerText = e.target.value;
    }
    updateTempo(e){
        this.bpm = e.target.value;

        clearInterval(this.isPlaying);
        this.isPlaying=null;
        const playButton=document.querySelector('.play');
        if(playButton.classList.contains('active')){
           this.start(); 
         }

     }
}

const drumKit = new DrumKit();

drumKit.pads.forEach(pad => {
    pad.addEventListener('click', drumKit.activePad);
    pad.addEventListener('animationend', function () {
        this.style.animation = "";
        // console.log(this)
    })
})

drumKit.playButton.addEventListener('click', () => {
    drumKit.updateBtn();
    drumKit.start();

});

drumKit.selects.forEach(select => {
    select.addEventListener('change', function (e) {
        drumKit.changeSound(e);
    })
})

drumKit.muteBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        drumKit.mute(e);
    })
})

drumKit.tempoSlider.addEventListener('input', function (e) {
    drumKit.changeTempo(e);
})
drumKit.tempoSlider.addEventListener('change', function (e) {
    drumKit.updateTempo(e);
})