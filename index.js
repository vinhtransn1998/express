require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')

const userRouter = require('./routes/users-route');
const authRouter = require('./routes/auth-route');
const productRouter = require('./routes/product-route');

const authMiddlewares = require('./middlewares/auth.middlewares');

const port = 4000

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SIGN_COOKIES))

app.use('/users', authMiddlewares.requireAuth, userRouter);
app.use('/product', productRouter);
app.use('/auth', authRouter)
app.get('/', authMiddlewares.requireAuth, (req, res) => {
    res.render('index', { name: "Web" });
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})