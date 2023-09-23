function loadVideoFromFileInput(video, fileInput, callback = null) {
    if (fileInput.files.length) {
        let file = fileInput.files[0];
        let fileURL = URL.createObjectURL(file);
        if (callback) {
            on(video, "canplay", callback, {once:true});
        }
        video.src = fileURL;
    }
}

function drawFrameFromVideo(video, canvas) {
    let context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
}

function getVideoFrameAsDataURL(video) {
    let canvas = elem("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    let context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    let dataURL = canvas.toDataURL();
    return dataURL;
}

