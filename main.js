let videoInput   = qs("#video-input");
let seekbar      = qs("#seekbar");
let seekbarMarks = qs("#seekbar-marks");
let video        = elem("video");
let seekPreview  = qs("#seek-preview");
let downloadButton = qs("#download-button");

on(videoInput, "input", () => {
    loadVideoFromFileInput(video, videoInput, () => {
        let heightRatio = video.videoHeight / video.videoWidth;
        seekPreview.width  = seekPreview.dataset.width;
        seekPreview.height = (seekPreview.dataset.width * heightRatio);
        video.currentTime = video.duration / 2;
        setTimeout(() => {
            drawFrameFromVideo(video, seekPreview);
        }, 100);
    });
});

on(downloadButton, "click", () => {
    let blankDataURL = "data:,";
    let dataURL = getVideoFrameAsDataURL(video);
    if (dataURL.length > blankDataURL.length) {
        downloadViaAnchor(dataURL, "thumbnail.png");
    } else {
        alert("There is nothing to download. Have you chosen a video file?");
    }
});


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

