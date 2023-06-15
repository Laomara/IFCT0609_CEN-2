const http = require('http');
const colours = require('./colours.js')

let endpoints = ["albumes", "artistas", "posts", "tracks", "usuarios"]

http.createServer(function (req, res) {
  let esEndpointValido =
  endpoints.includes(req.url.replaceAll("/","")) // true si es endpoint de endpoints
  let url = req.url
  let endpoint = req.url.replaceAll("/","")
  if(esEndpointValido){
     console.log(colours.fg.FgGreen, `200. URL: ${url}`)
  // TODO: colocar un switch para manejar las rutas
    res.writeHead(200, { 'Content-Type': 'text/html; charset = UTF-8' })
    res.write("<h1>Albumes</h1>")
    res.end()
  }else if(req.url == "/"){
    console.log(colours.fg.FgGreen, `200. URL: ${url}
    lista de endpoints`)
    res.writeHead(200, { 'Content-Type': 'text/html; charset = UTF-8' })
    let html = generarHTML()
    res.write(html)
    res.end() 
  }else {
    console.error(colours.fg.FgRed, `404. URL: ${url}
    no encontrada`)
  }
}).listen(8080, () => { console.log("Servidor en ejecución en http://localhost:8080") })

function generarHTML() {
  let arr = ["albumes", "artistas", "posts", "tracks", "usuarios"]
  let baseUrl = "http://localhost:8080"
  let html = ""
  html += "<h1>Endpoints</h1>"
  for(let i = 0; i<endpoints.length; i++){
    let enlace = baseUrl + "/" + endpoints[i] 
    html += `<a href=${enlace} target="_blank">${endpoints[i]}</a><br>`
  }
  return html
}