const Hapi = require('hapi')
const server = Hapi.server({
  port: 3000,
  host: 'localhost'
})

server.route({
  method: 'GET',
  path: '/hi',
  handler: (request, h) => {
    return 'Hello, world!'
  }
})

server.start()
