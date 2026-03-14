const https = require('https');

https.get('https://mirii-sewing.online/', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        if (data.includes('.home .entry-title')) {
            console.log("CSS found in HTML!");
        } else {
            console.log("CSS NOT found :(");
        }
    });
});
