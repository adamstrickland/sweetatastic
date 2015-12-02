import path from "path";
import express from "express";

let app = express();

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => { res.redirect('/index.html'); });

app.get('/app.js', (req, res) => { res.sendFile(path.join(__dirname, '../build/app.js')); });

app.listen(app.get('port'), () => { console.log(`Server Started!!!: http://localhost:${app.get("port")}/`); });

export default app;
