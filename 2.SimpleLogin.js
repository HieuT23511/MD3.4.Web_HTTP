const http = require(`http`)
const server = http.createServer((req, res)=>{
    let txt = ``;
    if(req.url === `/login`){
        txt = `Login success...`
    } else {
        txt = `Login fail...`
    }
    res.end(txt);
})
server.listen(8080, `localhost`, ()=>{
    console.log(`Server is running...`)
})
