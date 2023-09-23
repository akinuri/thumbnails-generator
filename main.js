let videoInput   = qs("#video-input");
let seekbar      = qs("#seekbar");
let seekbarMarks = qs("#seekbar-marks");
let video        = elem("video");
let seekPreview  = qs("#seek-preview");
let downloadButton = qs("#download-button");

let markCount = 6;
seekPreview.width = 400;
seekPreview.height = 200;

on(videoInput, "input", () => {
    loadVideoFromFileInput(video, videoInput, () => {
        updateSeekbar();
        let heightRatio = video.videoHeight / video.videoWidth;
        seekPreview.width  = seekPreview.dataset.width;
        seekPreview.height = (seekPreview.dataset.width * heightRatio);
        drawSpecificFrameFromVideo(video, seekPreview, 0);
    });
});

on(seekbar, "input", throttle(() => {
    drawSpecificFrameFromVideo(video, seekPreview, seekbar.value);
}, 500));

on(downloadButton, "click", () => {
    let blankDataURL = "data:,";
    let dataURL = getVideoFrameAsDataURL(video);
    if (dataURL.length > blankDataURL.length) {
        downloadViaAnchor(dataURL, "thumbnail.png");
    } else {
        alert("There is nothing to download. Have you chosen a video file?");
    }
});


