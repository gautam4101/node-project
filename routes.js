const fs = require('fs');

    const requestHandler = (req,res)=>{
        const url = req.url;
        const method = req.method;
        if(url === '/'){
            res.write('<html>');
            res.write('<head><title>My first page</title></head>');
            res.write('<body><form method="POST" action="/message"><input type="text" name="messsage"><button type="submit">SEND</button></form></body>');
            res.write('</html>');
            return res.end();
        }
       if(url === '/message' && method === 'POST'){
           const body = [];
            req.on('data', (chunk)=>{
                console.log(chunk);
                body.push(chunk);
            });
            return req.on('end', ()=>{
                const parseBody = Buffer.concat(body).toString();
                const message = parseBody.split('=')[1];
                console.log(parseBody);
                fs.writeFile('message.text', message, err=>{
                    res.statusCode = 201;
                    res.setHeader('Location','/');
                    return res.end();
                });
                
            });
           
       }
        res.write('<html>');
        res.write('<head><title>My first page</title></head>');
        res.write('<body><h1>My first page</h1></body>');
        res.write('</html>');
        res.end();
    }
    //module.exports = requestHandler;
    /* module.exports = {
        handler:requestHandler,
        SomeText: "Hello some custom texrt"
    }; */
    module.exports.handler = requestHandler;
    module.exports.SomeText = "Hello some hard code";