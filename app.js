const app = require("express")();
const errors = require('./config/errors')

const authRoutes = require('./routes/auth');
const index = require('./routes/index');
const places = require('./routes/places')
const products = require('./routes/products')

require('./passport/serializers');
require('./passport/local');
require('./config/express')(app)

app.use('/', authRoutes);
app.get('/', (req,res) => {console.log(req.user)
res.render('index',{user:req.user})});
app.use('/', places);
app.use('/', products)
app.use(errors)
module.exports = app;
