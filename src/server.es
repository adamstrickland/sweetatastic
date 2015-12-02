import path from "path";
import express from "express";

let app = express();

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => { res.redirect('/index.html'); });

app.listen(app.get('port'), () => { console.log(`Server started: http://localhost:${app.get("port")}/`); });

export default app;
