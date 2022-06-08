/**1.render songs
2.loadCurrentSong
2.scroll cd
3.play, pause, seek
4.next, previous
5.repeat, random
6. play song
7. scrollIntoView
**/
const $ = document.querySelector.bind(document);
const player = $('.player');
const cdThumb = $('.player__cd-thumb-wrap');
const dashboard = $('.player__dashboard');
const process = $('.player__process');
const playlist = $('#playlist');
const repeatBtn = $('#repeatBtn');
const randomBtn = $('#randomBtn');
const playBtn = $('#playBtn');
const imageSong = $('.player__cd-thumb');
const nameSong = $('.player__name');
const singerSong = $('.player__singer');
const audio = $('#audio');

const app = {
    indexCurrent: 0,
    isRepeat: false,
    isRandom: false,
    isPlay: false,
    songs: [
        {
            name: 'Take me to your heart',
            singer: 'Jin Chi',
            cd: '/assets/img/song1.jpg',
            url: 'https://ytop1.com/vi/Thankyou?token=U2FsdGVkX19m%2f0b%2bXuMH4a5looZdu%2bbxN1TVCS9OIBChVKJchDmZzJB6pzsUj0LNiU1dlaIa5BAU9uzRi%2fuZapfreaqrtSierYmk19RtJPDCO7h2QMigy9j7tw99Gkq0JzefBS06OBCi9of0WKxThP1bcfH6o%2bf2mmDGrwlX%2b%2bWRtNr0%2buOKTrWBLN2UzaUzgjpEFmLimbtv2wI%2b1Yo13cvzFLJ9k9gBH2ux%2f4BnDZU%3d&s=youtube&id=&h=1789660602593884464'
        },
        {
            name: 'Only love',
            singer: 'Jin Chi',
            cd: '/assets/img/song2.jpg',
            url: ''
        },
        {
            name: 'Beautiful in white',
            singer: 'Hero Band',
            cd: '/assets/img/song3.jpg',
            url: ''
        },
        {
            name: 'Until you',
            singer: 'Shayne Ward',
            cd: '/assets/img/song4.jpg',
            url: ''
        },
        {
            name: 'Pround of you',
            singer: 'fiona fung',
            cd: '/assets/img/song5.jpg',
            url: ''
        },
        {
            name: 'Butterfly',
            singer: 'Marnik, Hard Lights',
            cd: '/assets/img/song6.jpg',
            url: ''
        },
        {
            name: 'Umbrella',
            singer: 'Ember Island, The white panda',
            cd: '/assets/img/song7.jpg',
            url: ''
        },
        {
            name: 'Don\'t watch me cry',
            singer: 'Jorja Smith',
            cd: '/assets/img/song8.png',
            url: ''
        },
    ],
    render: function() {
        const htmls = this.songs.map(function(song) {
            return `
                    <li class="song">
                        <div class="song__cd-thumb" style="background-image: url('${song.cd}');"></div>
                        <div class="song__info">
                            <h5 class="song__name">${song.name}</h5>
                            <span class="song__singer">${song.singer}</span>
                        </div>
                        <span class="song__time">5:00</span>
                        <span class="song__ellipsis"><i class="fa-solid fa-ellipsis"></i></span>
                    </li>
                `
        });
        playlist.innerHTML = htmls.join('\n');
    },
    defineproperties: function() {
        //definition a new property to app
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.indexCurrent];
            }
        })
    },
    loadCurrentSong: function() {
        imageSong.style.backgroundImage = `url('${this.currentSong.cd}')`;
        nameSong.textContent = this.currentSong.name;
        singerSong.textContent = this.currentSong.singer;
        audio.src = this.currentSong.url;
    },
    handleEvent: function() {
        _this = this,
        animate = cdThumb.animate([
            { transform: 'rotate(360deg)' }
        ],10000);
        animate.pause();

        // handle events
        document.onscroll = function() {
            const scrollY = window.scrollY;
            let newSize = 250 - scrollY;
            if (newSize < 0) {
                newSize = 0;
            } 
            cdThumb.style.width = newSize + 'px';
            cdThumb.style.height = newSize + 'px';
            cdThumb.style.opacity = newSize / 250;
        }

        // repeat and random
        repeatBtn.onclick = function() {
            // check the random button
            _this.isRepeat = !_this.isRepeat;
            this.classList.toggle('active', _this.isRepeat);
            if (_this.isRandom) {
                _this.isRandom = !_this.isRandom;
                randomBtn.classList.toggle('active', _this.isRandom);
            }
        }


        randomBtn.onclick = function() {
            _this.isRandom = !_this.isRandom;
            this.classList.toggle('active', _this.isRandom);
            if (_this.isRepeat) {
                _this.isRepeat = !_this.isRepeat;
                repeatBtn.classList.toggle('active', _this.isRepeat);
            }
        }

        // play
        playBtn.onclick = function() {
            _this.isPlay = !_this.isPlay;
            _this.isPlay ? audio.play() : audio.pause();
            // if (_this.isPlay) {
            //     audio.play();
            //     player.classList.add('playing', _this.isPlay);
            // } else {
            //     audio.pause();
            //     player.classList.remove('playing', _this.isPlay);
            // }
        }

        audio.onplay = function() {
            player.classList.add('playing');
            animate.play();
            
        }

        audio.onpause = function() {
            player.classList.remove('playing');
            animate.pause();
        }

        // update the process input 
        audio.ontimeupdate = function() {
            const currentTime = audio.currentTime;
            const duration = audio.duration;
            if (isNaN(duration)) return;
            process.value = Math.ceil(currentTime*100 / duration);
        }

        //seek
        process.oninput = function() {
            const duration = audio.duration;
            const seekTime = process.value * duration / 100;
            audio.currentTime = seekTime;
        }
    },
    start: function() {
        this.defineproperties();
        this.loadCurrentSong();
        this.handleEvent();
        this.render();
    }
}

app.start();