let seekbar = qs("#seekbar");
let seekbarMarks = qs("#seekbar-marks");

let videoLength = 60;
let markCount   = 6;
let stepLength  = videoLength / (markCount);

let marksValues = range(0, videoLength, stepLength);
marksValues = marksValues.map(value => Math.round(value));

seekbar.max   = videoLength;
seekbar.value = Math.round(videoLength / 2);

seekbarMarks.innerHTML = null;
marksValues.forEach(value => {
    seekbarMarks.append(
        elem("option", value)
    );
});

