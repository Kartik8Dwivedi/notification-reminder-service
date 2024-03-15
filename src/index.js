const {PORT} = require('./config/serverConfig');
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const apiRoutes = require('./routes/index');
const db = require('./models/index')

const app = express();

const startServer = () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use('/api', apiRoutes);

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);

        if(process.env.DB_SYNC){
            db.sequelize.sync({alter:true})
        }
    });
}

startServer();