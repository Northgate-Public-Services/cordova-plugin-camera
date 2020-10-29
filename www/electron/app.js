// Set constraints for the video stream
// https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints/facingMode
// facingMode: "environment" or "user"
var constraints = { video: { facingMode: "environment" }, audio: false };
var track = null;

// Define constants
const cameraView = document.querySelector("#camera--view"),
    //cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger");

// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
            track = stream.getTracks()[0];
            cameraView.srcObject = stream;
        })
        .catch(function(error) {
            console.error("Oops. Something is broken.", error);
        });
}

// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    // cameraOutput.src = cameraSensor.toDataURL("image/webp");
    // cameraOutput.classList.add("taken");
    // track.stop();
    var imageData = cameraSensor.toDataURL('image/png');
    //imageData = imageData.replace('data:image/png;base64,', '');
    sessionStorage.setItem('cordova-plugin-camera-picture-base64', imageData);
    sessionStorage.setItem('cordova-plugin-camera-picture-isset', 'true');
};

// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);