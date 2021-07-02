var prediction = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90
});

var camera = document.getElementById("camera");

Webcam.attach("#camera");

function take_snapshot()
{
    Webcam.snap(function(data_uri)
    {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'">';
    });
}

console.log('ML5 version' , ml5.version);

var classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/IyIRClTID/model.json', modelLoaded);

function modelLoaded()
{
    console.log("Model Loaded");
}

function speak()
{
    var synth = window.speechSynthesis;
    var speak_data = "Prediction Is - " + prediction;

    var utterThis = new SpeechSynthesisUtterance(speak_data);

    synth.speak(utterThis)

}

function check()
{
    var image = document.getElementById("captured_image");
    classifier.classify(image , gotResult);
}

function gotResult(error, results)
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        prediction = results[0].label;
        speak();

        if(results[0].label == "okay")
        {
            document.getElementById("update_emoji").innerHTML = "&#128077;";
        }

        if(results[0].label == "nice")
        {
            document.getElementById("update_emoji").innerHTML = "&#128076;";
        }

        if(results[0].label == "victory")
        {
            document.getElementById("update_emoji").innerHTML = "&#9996;";
        }
    }
}