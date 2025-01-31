import express from 'express';
import handlebars from 'express-handlebars';
import routes from './routes.js';
import path from 'path';

const app = express();

app.engine('hbs', handlebars.engine({ extname: 'hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(process.cwd(), 'src', 'views'))

app.use(express.static('public'))

app.use(routes)






app.listen(3000, () => console.log('server is listening on port: 3000') )


