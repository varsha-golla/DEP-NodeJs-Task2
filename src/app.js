const express = require('express');
const users = require('./routers/users');
const app = express();
app.use(express.json());

app.use('/users', users);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App listening on port: ${port}`);
});
