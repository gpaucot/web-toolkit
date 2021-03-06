import http from 'http'
import { cyan } from 'colors/safe'
import createApp from './app'

const baseUrl = getBaseUrl(process.env.BASE_URL)
const app = createApp()

const host = '0.0.0.0'
const port = 3000

http.createServer((req, res) => {
  if (!(new RegExp(`^${baseUrl}`)).test(req.url)) {
    res.writeHead(302, {
      'Location': baseUrl,
    })
    res.end()
  } else {
    req.url = req.url.replace(baseUrl, '/')
    app(req, res)
  }
}).listen(port, host, () => {
  console.log(`Server ${cyan('running')} on ${cyan(`http://${host}:${port}`)}`)
})

function getBaseUrl(baseUrl) {
  let base = baseUrl || '/'
  if (base === '') base = '/'
  if (base.slice(-1) !== '/') base += '/'
  return base
}
