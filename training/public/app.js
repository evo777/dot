//*camera*//
const video = document.getElementById("video");
navigator.mediaDevices.getUserMedia({
  video:true,
  audio:false,
  width:800,
  height:600
}).then((mediaStream) =>{
  video.srcObject=mediaStream;
   video.play();
}).catch((err)=>{
  console.log("err");
});

 //* submit your name*//
const click = document.getElementById("click")
  click.onclick=()=>{
    const name = document.getElementById("text").value;
  
      /*taking picture*/
      const canvas = document.getElementById("canvas");

    const width = video.getBoundingClientRect().width;
    canvas.width=width;
    console.log(width);
      const context = canvas.getContext("2d");
      context.drawImage(video,0,0,width,300);
      const dataURL=canvas.toDataURL('image/png').replace('data:image/png;base64,',"");
      const pic = new XMLHttpRequest();
      pic.open('post','/predict');

      pic.setRequestHeader('Content-type','application/json');
      pic.send(JSON.stringify({data:dataURL,name}));
};
