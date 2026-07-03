//iss file ka main kaam server ko start krna 

const app = require('./src/app'); //server ko import krdia taki server.js file m use kr ske

app.listen(3000, () => {
    console.log('server is running on port 3000');
})     