song="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreleftWrist=0;
scorerightWrist=0;
function preload(){
    song=loadSound("music.mp3");
}
function setup(){
    canvas=createCanvas(500,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on("pose",gotPoses);


}
function modelLoaded(){
    console.log("model has been initilized");
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        scoreleftWrist=results[0].pose.keypoints[9].score;
        scorerightWrist=results[0].pose.keypoints[10].score;
        console.log("left wrist score:"+scoreleftWrist+" right wrist score:"+scorerightWrist);
       

        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("the x position of the left wrist is="+leftWristX+"the y position of the left wrist is="+leftWristY);
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("the x position of the right wrist is="+rightWristX+"the y position of the right wrist is="+rightWristY);
    }
    function draw(){
    image(video,0,0,500,500);
    fill("#ff0000");
    stroke("#000000");
    console.log("scoreleftwrist"+scoreleftWrist);
    
    if(scorerightWrist>0.2)
    {
    circle(rightWristY,rightWristX);
    if(rightWristY >0 && rightWristY<=100){
        document.getElementById("speed").innerHTML ="Speed:0.5x";
        song.rate(0.5);
    }
    else if(rightWristY>100&&rightWristY<=200){
        document.getElementById("speed").innerHTML="Speed:1x";
        song.rate(1);
    }
    else if(rightWristY>200&&rightWristY<=300){
        document.getElementById("speed").innerHTML="Speed:1.5x";
        song.rate(1.5);
    }
    else if(rightWristY>300&&rightWristY<=400){
        document.getElementById("speed").innerHTML="Speed:2x";
        song.rate(2);
    }
    else if(rightWristY>400&&rightWristY<=500){
        document.getElementById("speed").innerHTML="Speed:2.5x";
        song.rate(2.5);
    }}
    if(scoreleftWrist >0.2){
    circle(leftWristX,leftWristY,20);
    int_leftWristY = Number(leftWristY);
    remove_decimals= floor (int_leftWristY);
    volume=remove_decimals/500;
    document.getElementById("volume").innerHTML="volume ="+volume;
    song.setVolume(volume);
    }
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

    
