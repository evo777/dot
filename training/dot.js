const express = require('express');
const fs = require('fs');
const bodyparser = require('body-parser');
const googleTTS = require('google-tts-api');
const app = express();
app.use(express.static('public'));
app.use(bodyparser.json({limit: '500mb'}));
app.listen(4406);

let obj={};
app.post('/madhu',(req,res)=>{
  let name= `${req.body.name}`

  if(!obj[name]){
    obj[name]=[];
  }
});

app.post('/pic',(req,res)=>{
  let pic = req.body.data.replace('data:image/png;base64');
  obj[name].push(pic);
});

app.post('/predict',(req,resp)=>{
  console.log("post request works");
  console.log(req.body.data.substr(0,200));
  app1.models.predict('dot', req.body.data)
    .then((res) => {
      if(res['outputs'][0].data['concepts'][0].value > 0.10){
        let msg = `hey ${res['outputs'][0].data['concepts'][0].id}, how are you doing, welcome to garagescript`
       googleTTS(msg, 'en', 1).then((url) => {
            resp.json({url:url})
       });
        console.log(msg);
      console.log(res['outputs'][0].data['concepts'][0].id);
      }else{
        resp.json({url:"out of database"})
      }
    })
    .catch((err)=>{
      console.log(err.data)
    });

})

app.post('/train',(req,res)=>{
  console.log("post request works");
  app1.inputs.create({
    base64: req.body.data,
    concepts: [
      {
        id:req.body.name ,

        value: true
      }
    ]
  }).then(() => {
    console.log('AMAZEBALLS');
    app1.models.train("dot").then(
      function(response) {
        console.log(`WOWSERZ HERE'S THE RESPONSE: `, response);
      },
      function(err) {
        console.log(`OH NO. HERE'S WHAT HAPPENED: `, err);
      }
    )
  })
  res.send("done")
})

const clarifai = require('clarifai')
const app1 = new clarifai.App({
  apiKey: 'dc9cbce1a5ae451ebd4097433b038d2f'
});

app.get('/test',(req,res)=>{
  res.json({url:'test'})
});
