var iframeElement = document.querySelector('iframe');
var widget = SC.Widget(iframeElement);
var playing = false;

var song_uris = {
    "0": "midnight",
    "1": "1am",
    "2": "2am",
    "3": "3am",
    "4": "4am",
    "5": "5am",
    "6": "6am",
    "7": "7am",
    "8": "8am",
    "9": "9am",
    "10": "10am",
    "11": "11am",
    "12": "noon",
    "13": "1pm",
    "14": "2pm",
    "15": "3pm",
    "16": "4pm",
    "17": "5pm",
    "18": "6pm",
    "19": "7pm",
    "20": "8pm",
    "21": "9pm",
    "22": "10pm",
    "23": "11pm"
}

function clickHandler() {
    const play = document.getElementsByClassName('play-symbol');
    const pause = document.getElementsByClassName('pause-symbol');
    const changeVisibility = (htmlCollection, visibility) => {
        for (let i = 0; i < htmlCollection.length; i++) {
            htmlCollection[i].style.display = visibility;
        }
    }

    if (playing) {
        widget.pause();
        changeVisibility(play, 'inline');
        changeVisibility(pause, 'none');
    } else {
        widget.play();
        changeVisibility(play, 'none');
        changeVisibility(pause, 'inline');
    }
    playing = !playing;
}

// this will run periodically (setInterval), to check if the hour has passed
// and then run the passed callback function parameter
function detectHourChange(callback) {
    let currentHour;

    setInterval(() => {
        const newHour = new Date().getHours();

        if (newHour != currentHour) {
            currentHour = newHour;
            callback(currentHour);
        }
    }, 1000); // Checking every second
}

// When the hour changes, load the new song for that hour
detectHourChange((hour) => {
    // load appropriate song for system time
    let url = "https://soundcloud.com/vgmplanet/" + song_uris[hour];
    widget.load(url, {
        callback: () => {
            // after the new song finishes loading, play it if the playback is not paused
            if (playing) {
                widget.play();
            }
        }
    });
})

// loop music: When the song finishes, start again
widget.bind(SC.Widget.Events.FINISH, function () {
    widget.play();
})

// Move clock pointers
setInterval(() => {
    d = new Date(); //object of date()
    hr = d.getHours();
    min = d.getMinutes();
    sec = d.getSeconds();
    hr_rotation = 30 * hr + min / 2; //converting current time
    min_rotation = 6 * min;
    sec_rotation = 6 * sec;

    hour.style.transform = `rotate(${hr_rotation}deg)`;
    minute.style.transform = `rotate(${min_rotation}deg)`;
    second.style.transform = `rotate(${sec_rotation}deg)`;
}, 1000);

// Space and Enter to play/pause
document.addEventListener('keydown', function (event) {

    if (event.code === 'Space' || event.code === 'Enter') {
        event.preventDefault();
        document.getElementById('play-pause').click();
    }
});