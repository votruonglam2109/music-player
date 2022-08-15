const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const song_image = $('.song-image img')
const song_name = $('.song-name')
const singer_name = $('.singer-name')
const progress_task = $('.progress')
const control = $('.control')
const toggle_btn = $('.play-toggle-btn')
const repeat_btn = $('.repeat-btn')
const precious_btn = $('.precious-btn')
const play_toggle_btn = $('.play-toggle-btn')
const next_btn = $('.next-btn')
const random_btn = $('.random-btn')
const audio = $('#audio')
const song_list = $('.song-list')

// console.log(song_image);
// console.log(song_name);
// console.log(singer_name);
// console.log(random_btn);
// console.log(next_btn);
// console.log(play_toggle_btn);
// console.log(precious_btn);
// console.log(repeat_btn);
// console.log(song_list);
// console.log(progress);
// console.log(audio);
var app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    songs: [
        {
            name: "there's no one at all",
            singer: 'Sơn Tùng M-TP',
            image: './assets/img/img1.png',
            path: './assets/songs/b1.mp3'

        },
        {
            name: "Hoa hải đường",
            singer: 'Jack',
            image: './assets/img/img11.jpg',
            path: './assets/songs/b11.mp3'

        },
        {
            name: 'Tướng quân',
            singer: 'Nhật phong',
            image: './assets/img/img2.jpg',
            path: './assets/songs/b2.mp3'

        },
        {
            name: 'Ai mang cô đơn di',
            singer: 'K-ICM ft APJ',
            image: './assets/img/img3.jpg',
            path: './assets/songs/b3.mp3'

        },

        {
            name: 'Anh nhà ở đâu thế',
            singer: ' Amee',
            image: './assets/img/img4.jpg',
            path: './assets/songs/b4.mp3'

        },
        {
            name: 'Người lạ ơi',
            singer: 'Karik, Orange, Superbrothers',
            image: './assets/img/img5.jpg',
            path: './assets/songs/b5.mp3'

        }, {
            name: 'Muộn rồi mà sao còn',
            singer: 'Sơn Tùng M-TP',
            image: './assets/img/img6.jpg',
            path: './assets/songs/b6.mp3'

        },
        {
            name: 'Đoạn tuyệt nàng đi',
            singer: ' Phát Huy T4',
            image: './assets/img/img7.jpg',
            path: './assets/songs/b7.mp3'

        },
        {
            name: 'Fly way',
            singer: 'TheFatRat',
            image: './assets/img/img8.jpg',
            path: './assets/songs/b8.mp3'

        },
        {
            name: 'never be alone',
            singer: 'TheFatRat',
            image: './assets/img/img9.jpg',
            path: './assets/songs/b9.mp3'

        },
        {
            name: 'save me',
            singer: 'Deamn',
            image: './assets/img/img10.jpg',
            path: './assets/songs/b10.mp3'

        },
    ],
    render: function () {
        var html = this.songs.map((song, index) =>
            `<div data-index = "${index}" class="item ${this.currentIndex === index ? 'active' : ''}">
                <div class="item-img">
                    <img src="${song.image}" alt="">
                </div>
                <div class="item-info">
                    <h2 class="heading">${song.name}</h2>
                    <span class="singer-name">${song.singer}</span>
                </div>
            </div>`
        );
        song_list.innerHTML = html.join('\n');
    },
    getCurrentSong: function () {
        return this.songs[this.currentIndex];
    },
    loadCurrentSong: function () {
        song_image.src = this.getCurrentSong().image
        song_name.innerText = this.getCurrentSong().name
        singer_name.innerText = this.getCurrentSong().singer
        audio.src = this.getCurrentSong().path
        this.render();
        audio.play()
        this.scrollItem();
    },
    randomSong: function(){
        var randomIndex
        do{
            randomIndex = Math.floor(Math.random()*this.songs.length);
        }while(randomIndex === this.currentIndex)
        this.currentIndex = randomIndex;
        this.loadCurrentSong()
    },
    nextSong: function () {
        this.currentIndex++;
        if (this.currentIndex > this.songs.length-1)
            this.currentIndex = 0;
        this.loadCurrentSong();
    },
    preciousSong: function () {
        this.currentIndex--;
        if (this.currentIndex < 0)
            this.currentIndex = this.songs.length-1;
        this.loadCurrentSong();
    },
    scrollItem: function () {
        setTimeout(() =>{
            $('.item.active').scrollIntoView();
        }, 250)
    },
    handleEvent: function () {
        //precious button
        precious_btn.onclick = () => {
            if (this.isRandom)
                this.randomSong();
            else
                this.preciousSong();
        }

        //next button
        next_btn.onclick = () => {
            if (this.isRandom)
                this.randomSong();
            else
                this.nextSong();
        }
        toggle_btn.onclick = () => {
            if (this.isPlaying)
                audio.pause()
            else
                audio.play()
        }
        audio.onplay = () =>{
            this.isPlaying = true;
            control.classList.add('playing')
        }
        audio.onpause = () =>{
            this.isPlaying = false;
            control.classList.remove('playing')
        }
        audio.onended = () =>{
            if(this.isRepeat)
                loadCurrentSong();
            else
                next_btn.click()
        }
        //progress task
        audio.ontimeupdate = function () {
            if (audio.duration) {
                var progress = Math.floor((audio.currentTime / audio.duration) * 100);
                progress_task.value = progress
                progress_task.setAttribute('value', progress)
                var color = `linear-gradient(90deg, #dd5e89 ${progress}% ,#f7bb97 ${progress}%)`;
                progress_task.style.background = color;
            }
        }
        //random button
        random_btn.onclick = () => {
            this.isRandom = !this.isRandom
            random_btn.classList.toggle('active')
        }
        //repeat button
        repeat_btn.onclick = () => {
            this.isRepeat = !this.isRepeat
            repeat_btn.classList.toggle('active')
        }

        //nhấn để tua
        progress_task.oninput = (e) => {
            const seeTime = audio.duration * e.target.value / 100
            audio.currentTime = seeTime
        }
        //chọn item trong list để phát
        song_list.onclick = (e) =>{
            const songElement = e.target.closest('.item:not(.active)')
            if (songElement) {
                this.currentIndex = Number(songElement.getAttribute('data-index'))
                this.loadCurrentSong()
            }
        }
    },
    start: function () {
        //this.defineCurrentSong();
        this.render();
        this.handleEvent();
        this.loadCurrentSong();
    }
}

app.start()
