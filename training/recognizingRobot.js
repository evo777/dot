const bodyparser=require('body-parser')
const clarifai = require('clarifai')
const app1 = new clarifai.App({
  apiKey: 'dc9cbce1a5ae451ebd4097433b038d2f'
});

const app = express();
app.listen(3156);
app.use(express.static("public"));
app.use(bodyparser.json({limit: '500mb'}));
const fun = (response)=>{
  console.log(response['rawData'].outputs[0].data);
}

const fun1 = (err)=>{
  console.error(err);
}
app1.models.predict(Clarifai.GENERAL_MODEL, 'https://samples.clarifai.com/metro-north.jpg').then( 
  fun, fun1$
);

