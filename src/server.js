import express from 'express';
import handlebars from 'express-handlebars';
import routes from './routes.js';
import path from 'path';
import 'dotenv/config';
import { connectDb } from '../services/db.js';


const app = express();

app.engine('hbs', handlebars.engine({ extname: 'hbs', runtimeOptions: { allowProtoPropertiesByDefault: true } }));
app.set('view engine', 'hbs');
app.set('views', path.join(process.cwd(), 'src', 'views'))

app.use(express.static(path.join(process.cwd(), 'public')))

connectDb()

app.use(routes)






app.listen(3000, () => console.log('server is listening on port: 3000') )


