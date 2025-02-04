import config from './config/config.js' 
import app from './server/express.js'
import mongoose from 'mongoose' 
import path from 'path';
mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri, { useNewUrlParser: true,

useUnifiedTopology: true } )

 .then(() => {
console.log("Connected to the database!");
})

mongoose.connection.on('error', () => {
throw new Error(`unable to connect to database: ${config.mongoUri}`) 
})

app.use(express.static('./client/build'));
/*app.use(express.static(path.join(CURRENT_WORKING_DIR, "dist/app")));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "index.html"))
})*/

app.set('port', process.env.PORT || 5000);
console.log("++++++++++++++++" + app.get('port'));

app.listen(config.port, (err) => { 
if (err) {
console.log(err) 
}
console.info('Server started on port %s.', config.port) 
})

