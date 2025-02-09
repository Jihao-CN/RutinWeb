let isPlaying = false;
const audio = document.getElementById('bgm');
const audioControl = document.getElementById('audio-control');
const innerCircle = document.getElementById('inner-circle');

function togglePlayPause() {
    if (isPlaying) {
        audio.pause();
        innerCircle.style.backgroundColor = '#fff';
    } else {
        audio.play();
        innerCircle.style.backgroundColor = '#f00';
    }
    isPlaying = !isPlaying;
}

audioControl.addEventListener('click', togglePlayPause);