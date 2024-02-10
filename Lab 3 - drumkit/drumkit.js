let channel = 0;
const channels = [[], [], [], []];
document.addEventListener('keydown', onKeyDown);
const KeyToSound = {
    'q': document.querySelector('#boom'),
    'w': document.querySelector('#clap'),
    'e': document.querySelector('#hihat'),
    'a': document.querySelector('#kick'),
    's': document.querySelector('#openhat'),
    'd': document.querySelector('#ride'),
    'z': document.querySelector('#snare'),
    'x': document.querySelector('#tink'),
    'c': document.querySelector('#tom'),
};

function onKeyDown(event) {
    const sound = KeyToSound[event.key];
    if (sound) {
        playSound(sound);
        insertSoundToChannel(sound.id);
    }
}

function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}

function insertSoundToChannel(soundId) {
    const currentChannel = channels[channel];
    if (currentChannel.length === 0) {
        currentChannel.push({ sound: soundId, sleep: 0, timestamp: Date.now() });
    } else {
        const lastSoundTimestamp = currentChannel[currentChannel.length - 1].timestamp;
        const sleep = Math.max(Date.now() - lastSoundTimestamp, 0);
        currentChannel.push({ sound: soundId, sleep, timestamp: Date.now() });
    }
}

function setChannel(val) {
    channel = val;
}

function play() {
    const playableChannels = document.querySelectorAll('input[name=isChannelChecked]:checked');
    playableChannels.forEach(checkbox => {
        channels[parseInt(checkbox.id)].forEach(y => {
            setTimeout(() => {
                const sound = document.getElementById(y.sound);
                if (sound) {
                    playSound(sound);
                }
            }, y.sleep);
        });
    });
}
