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
const previousBtn = $('#previousBtn');
const nextBtn = $('#nextBtn');

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
            url: 'https://ytop1.com/vi/Thankyou?token=U2FsdGVkX1%2bF1FtyCSYP5qfVboRewmgFvBiMLarOjhAj243IEzjC%2bZZyN3c8ODZIAv6t%2ftljqUEacjPYLyRa7Bht%2ffELAkwwI14h1SU5EcC57FkQHssQe%2f%2faILxDZb1gFneH%2bNyQnulst2HPix3sDYKyH7RgZZdHLMvmUhY9Knw%3d&s=youtube&id=&h=1789660602593884487'
        },
        {
            name: 'Beautiful in white',
            singer: 'Hero Band',
            cd: '/assets/img/song3.jpg',
            url: 'https://ytop1.com/vi/Thankyou?token=U2FsdGVkX1%2bZokJt21DjZzRsqnmWQV0z4CS16s9n3WAFbMgEpq3U77FEex8j8pFYAlnbHd8GwNyJArKJqd2f59Hvga7XmMc7ZswK1fa%2f5Ahz0tao59RH124n8ypfZaSXmR1KCsBDxfUOAtHFk2exnhhYGORMN%2fnu0%2bS0DRzlXOU%3d&s=youtube&id=&h=1789660602593884487'
        },
        {
            name: 'Until you',
            singer: 'Shayne Ward',
            cd: '/assets/img/song4.jpg',
            url: 'https://ytop1.com/vi/Thankyou?token=U2FsdGVkX1%2bHxYQg%2bZvazqsqbCTS6hNkc2Q4AzRwEO4vucF8WFXWIoW3vz%2f7umibTBHrliiRVy2xRoXIHNMCDhhJYnBzhs1SYYbK9ADghkT8K7%2blYErf1Hc%2fUJ1x7jSz1SpS3mOnuJa8MABArPjARQ%3d%3d&s=youtube&id=&h=1789660602593884487'
        },
        {
            name: 'Pround of you',
            singer: 'fiona fung',
            cd: '/assets/img/song5.jpg',
            url: 'https://ytop1.com/vi/Thankyou?token=U2FsdGVkX18wVtSrGkfIoAFof3J5lfZxek1mlxqKSVQ9oFtz%2f0raVuAiKtKz7qa5VEe7RAtWGQSmFFEhOxx2yYaQDm9FjkZzVJmmRKNQNf8MCvhcDZVwwPeVkfQ4Pry%2bfdblJ8SPTAdwNrSMXZhpceUqchTO0DJq2CP%2fRxHWAsk%3d&s=youtube&id=&h=1789660602593884487'
        },
        {
            name: 'Butterfly',
            singer: 'Marnik, Hard Lights',
            cd: '/assets/img/song6.jpg',
            url: 'https://ytop1.com/vi/Thankyou?token=U2FsdGVkX19FP3Hl5x42QaKHulcJwWkQnuA6gtACq1i8HEv2gH1iYUdPuKZG8hNsYqrThGN%2fpfsn%2bBcBLq2%2bNWQr3iUImLyW%2bnN5XhWF3CWfacv7H9AzbtchzX%2bVUliGERdnKnGlacYtntudJvnk23YIFbq%2bEmO%2fN0%2bhrf77mxQ%3d&s=youtube&id=&h=1789660602593884487'
        },
        {
            name: 'Umbrella',
            singer: 'Ember Island, The white panda',
            cd: '/assets/img/song7.jpg',
            url: 'https://ytop1.com/vi/Thankyou?token=U2FsdGVkX19EqEkkjjwX1%2byoYvLnfth%2fdfKM0vV%2fnhyzSFJ2%2fAZxUuE9qN02ZQcZFSAW%2fSIt%2fUzcYas9PlqQrOCKxyv5NfIAAf9teXh%2bY0yaHw01asGchXA8X%2b%2byc7LVJiV6tHV5TwXug17AKG5M2I32wDNEzCuMSHmxVP0KVWfoz%2fGj3G44H0G4qVzdRDJn&s=youtube&id=&h=1789660602593884487'
        },
        {
            name: 'Don\'t watch me cry',
            singer: 'Jorja Smith',
            cd: '/assets/img/song8.png',
            url: 'https://ytop1.com/vi/Thankyou?token=U2FsdGVkX18jXomfD7kqXOQNxpp5M2pbqDG475adwpz0c6%2fDuwXohhzFIB8h6ipiRn09jBp8thrvAKA9jpAdEE34%2bc%2bbUc4f6HcXkd6Uuvk%2bJT2Zf%2f5VCePvZfosROQFWSozhsjdw%2blGr8CD0kFaCfQ%2bYo6VQKSL4d6p9nVZO9g%3d&s=youtube&id=&h=1789660602593884488'
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
        process.value = 0;
    },
    handleEvent: function() {
        _this = this,
        animate = cdThumb.animate([
            { transform: 'rotate(360deg)' }
        ],{
            duration: 10000,
            iterations: Infinity
        });
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

        // previous button and next button
        previousBtn.onclick = function() {
            _this.indexCurrent --;
            if (_this.indexCurrent < 0) {
                _this.indexCurrent = _this.songs.length - 1;
            }
            _this.loadCurrentSong();
            audio.play();
        }

        nextBtn.onclick = function() {
            _this.indexCurrent ++;
            if (_this.indexCurrent >= _this.songs.length) {
                _this.indexCurrent = 0;
            }
            _this.loadCurrentSong();
            audio.play();
        }

        audio.onended = function() {
            if (_this.isRandom) {

            } else if (_this.isRepeat) {

            } else {
                animate.cancel();
                _this.isPlay = !_this.isPlay;
                process.value = 0;
            }
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