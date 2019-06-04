const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/api/students', (req, res) => {
    res.send([
        {
            'id': 1,
            'name': 'Bob',
            'image': 'sadsd'
        
        }],
    
    );
});

app.listen(port, () => console.log(`Listening on port ${port}`))