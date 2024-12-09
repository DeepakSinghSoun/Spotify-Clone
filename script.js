document.addEventListener('DOMContentLoaded', () => {
    const masterPlay = document.getElementById('masterPlay');
    const shuffle = document.querySelector('.shuffle');
    const seek = document.querySelector('#seek');
    const bar2 = document.querySelector('#bar2');
    const dot = document.querySelector('.dot');
    const currentStart = document.querySelector('#current-start');
    const currentEnd = document.querySelector('#current-end');
    const vol = document.querySelector('#vol');
    const vol_icon = document.querySelector('#vol-icon');
    const vol_bar = document.querySelector('.vol-bar');
    const vol_dot = document.querySelector('#vol-dot');
    const back = document.querySelector('#back');
    const next = document.querySelector('#next');

    const music = new Audio("/songs/1.mp3");

    let index = 1;
    const playlistPlayButtons = Array.from(document.getElementsByClassName('playListPlay')); // Convert to array
    const songCount = 60; // Total songs in your playlist

    // Play/Pause functionality with check for masterPlay
    if (masterPlay) {
        masterPlay.addEventListener('click', () => {
            if (music.paused || music.currentTime <= 0) {
                music.play();
                masterPlay.classList.add('fa-pause');
                masterPlay.classList.remove('fa-play');
            } else {
                music.pause();
                masterPlay.classList.remove('fa-pause');
                masterPlay.classList.add('fa-play');
            }
        });
    }


// Playlist buttons functionality
if (playlistPlayButtons.length > 0) {
    playlistPlayButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            const playListPlayId = event.currentTarget.id;
            index = parseInt(playListPlayId); // Use `index` as a global variable

            // If the clicked button is already playing, pause the music
            if (!music.paused && music.src.includes(`${index}.mp3`)) {
                music.pause();
                button.classList.remove('fa-pause');
                button.classList.add('fa-play');
                
                if (masterPlay) {
                    masterPlay.classList.remove('fa-pause');
                    masterPlay.classList.add('fa-play');
                }
            } else {
                // Set and play the selected song
                music.src = `/songs/${index}.mp3`;
                music.play();

                // Reset all playlist buttons to play state
                playlistPlayButtons.forEach((btn) => {
                    btn.classList.remove('fa-pause');
                    btn.classList.add('fa-play');
                });

                // Update the clicked button to pause state
                button.classList.add('fa-pause');
                button.classList.remove('fa-play');

                // Update masterPlay to pause state
                if (masterPlay) {
                    masterPlay.classList.add('fa-pause');
                    masterPlay.classList.remove('fa-play');
                }
            }
        });
    });
}



    // Update progress bar and time
    music.addEventListener('timeupdate', () => {
        if (!isNaN(music.duration)) {
            // Update duration display
            const min1 = Math.floor(music.duration / 60);
            const sec1 = Math.floor(music.duration % 60).toString().padStart(2, '0');
            if (currentEnd) currentEnd.innerText = `${min1}:${sec1}`;

            // Update current time display
            const min2 = Math.floor(music.currentTime / 60);
            const sec2 = Math.floor(music.currentTime % 60).toString().padStart(2, '0');
            if (currentStart) currentStart.innerText = `${min2}:${sec2}`;

            // Update progress bar
            const progressBar = (music.currentTime / music.duration) * 100;
            if (seek) seek.value = progressBar;
            if (bar2) bar2.style.width = `${progressBar}%`;
            if (dot) dot.style.left = `${progressBar}%`;
        }
    });

    // Seek functionality with a check for `seek`
    if (seek) {
        seek.addEventListener('change', () => {
            music.currentTime = (seek.value * music.duration) / 100;
        });
    }

    // Volume control
    if (vol) {
        vol.addEventListener('input', () => {
            const vol_val = vol.value;

            // Update volume icon
            if (vol_val == 0) {vol_icon.className = 'fa-solid fa-volume-off';}
            else if (vol_val > 50) {vol_icon.className = 'fa-solid fa-volume-high';}
            else {vol_icon.className = 'fa-solid fa-volume-low';}

            if (vol_bar) {vol_bar.style.width = `${vol_val}%`;}
            if (vol_dot) vol_dot.style.left = `${vol_val}%`;
            music.volume = vol_val / 100;
        });
    }

    // Back button functionality
    if (back) {
        back.addEventListener('click', () => {
            index = index > 1 ? index - 1 : songCount;
            music.src = `/songs/${index}.mp3`;
            music.play();
            if (masterPlay) {
                masterPlay.classList.add('fa-pause');
                masterPlay.classList.remove('fa-play');
            }
        });
    }

    // Next button functionality
    if (next) {
        next.addEventListener('click', () => {
            index = index < songCount ? index + 1 : 1;
            music.src = `/songs/${index}.mp3`;
            music.play();
            if (masterPlay) {
                masterPlay.classList.add('fa-pause');
                masterPlay.classList.remove('fa-play');
            }
        });
    }

    // Shuffle modes
    if (shuffle) {
        shuffle.addEventListener('click', () => {
            const mode = shuffle.dataset.mode || "next";
            if (mode === "next") {
                shuffle.className = 'fa-solid fa-repeat';
                shuffle.dataset.mode = 'repeat';
            } else if (mode === "repeat") {
                shuffle.className = 'fa-solid fa-shuffle';
                shuffle.dataset.mode = 'random';
            } else {
                shuffle.className = 'fa-solid fa-music';
                shuffle.dataset.mode = 'next';
            }
        });
    }

    // Music ended behavior
    music.addEventListener('ended', () => {
        const mode = shuffle?.dataset.mode || "next";
        if (mode === "repeat") {
            music.currentTime = 0;
            music.play();
        } else if (mode === "random") {
            index = Math.floor(Math.random() * songCount) + 1;
            music.src = `/songs/${index}.mp3`;
            music.play();
        } else {
            if (next) next.click();
        }
    });
});
