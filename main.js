var SpeechRecognition = window.webkitSpeechRecognition;

var recognition = new SpeechRecognition();

function start() {
    document.getElementById("textbox").innerHTML = "";
    recognition.start();
}
recognition.onresult = function (event) {
    console.log(event);
    var content = event.results[0][0].transcript;
    console.log(content, typeof (content));
    document.getElementById("textbox").innerHTML = content;
    if ((content.includes("selfie")) || (content.includes("pic") || (content.includes("picture")))) {
        speak();
    }
}

function speak() {
    var synth = window.speechSynthesis;
    // speak_data=document.getElementById("textbox").value;
    speak_data = "taking your Selfie in 5 seconds";
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
    Webcam.attach(camera);

    setTimeout(function(){
        take_snapshot();
        save();
    },5000);
}

camera = document.getElementById("camera");

Webcam.set({
    width: 360,
    height: 250,
    image_format: "jpeg",
    jpeg_quality: 90
});

function take_snapshot() {
    Webcam.snap(function (data_uri) { document.getElementById("result").innerHTML = '<img id="selfie_image" src="' + data_uri + '"/>'; });
}

function save(){
    link=document.getElementById("link");
    image=document.getElementById("selfie_image").src;
    link.href=image;
    link.click();
    document.getElementById("logo_img").src=image;
}
