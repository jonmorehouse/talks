title: Robust Python Services
output: slides.html
theme: sudodoki/reveal-cleaver-theme
author:
  name: Jon Morehouse
  twitter: jonmorehouse
  url: github.com/jonmorehouse
controls: false

--

## Robust Python Services With Tornado

Our approach to architecting systems with composable, asynchronous python services.

--

## Growing Pains

* burned by large applications
* distributed teams working on different codebases
* avoid "code heroes"
* teams were not modeled after services

-- 

## What is a Service?

API or a Data Stream Consumer

* single purpose
* composable
* failure resilient
* scalable
* obvious

--

## Design Principles

* pragmatism and obviousness above all else
* avoid abstractions when possible
* monitor outcomes, not hosts


-- 

## Why Asynchronous?

API's are slow!

API Composition is even slower!

We have to wait on a lot of things!

-- 

## Why Not Django/Flask/Twisted?

* making Django / Flask async is hacky at best
* avoid abstractions
* balance simplicity with performance

--

## What is Tornado?

a concurrent IO toolkit

an event loop

an HTTP Server

as simple as Flask!

-- 

## Sample Flask API

~~~ python
from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello World!'

if __name__ == '__main__':
    app.run(port=8000)
~~~

--

## Sample Tornado API

~~~ python
import tornado.ioloop
import tornado.web

class MainHandler(tornado.web.RequestHandler):
  def get(self):
    self.write('Hello World')

if __name__ == '__main__':
  app = tornado.web.Application([
    (r'/', MainHandler),
  ])
  app.listen(8000)

  tornado.ioloop.IOLoop.current().start()
~~~

--

### Why not Multi   **[ process | thread ]**   ing?

* Guido says _"don't fight the GIL"_
* avoid heavy context (cpu) switches
* more cpu **!=** more throughput
* different _cpu_ - different _process_

--

## Callbacks!

~~~ python
import tornado

httpclient = tornado.httpclient.AsyncHTTPClient()

class WorkHandler(tornado.web.RequestHandler):

  def get(self):

    def callback(response):
      if response.code != 200:
        self.write(json.dumps({'status': 'red'}))
        return
      self.write(json.dumps({'status': 'green'})) 

    url = 'https://api.github.com/users/buzzfeed/repos'
    request = tornado.httpclient.HTTPRequest(url=url)
    httpclient.fetch(request, raise_errors=False, callback=callback)

~~~

--

## Coroutines!

~~~ python
import tornado

httpclient = tornado.httpclient.AsyncHTTPClient()

class WorkHandler(tornado.web.RequestHandler):

  @tornado.gen.coroutine
  def get(self):
    url = 'https://api.github.com/users/buzzfeed/repos'
    request = tornado.httpclient.HTTPRequest(url=url)
    response = yield httpclient.fetch(request, raise_errors=False)
    
    if response.code != 200:
      self.write(json.dumps({'status': 'red'}))
      return

    self.write(json.dumps({'status': 'green'}))

~~~

-- 

## Golang

Join us for our next meetup to hear about how we use these same principles to build services in Go!



