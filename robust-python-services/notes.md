1. BuzzFeed has a highly distributed team, this influences how we build software. Obviousness and simplicity are some of the most important traits our software can have.

2. We tend to build alot of http apis and ETL streams. We strategically choose to build workers in places where we can monitor backpressure and failure at a highlevel. For instance, we have a stream of data that gets written into a database and by monitoring how much work is left to be written into the database at any time we can immediately diagnose whether or not the database is having performance problems.

3. Our services tend to be simple scripts that are just a few files big. We prefer to avoid abstractions and have minimal shared code between services whenever it makes sense. Its alot easier to copy and paste a little bit of code around than to have to dig through a mountain of abstractions. (We learned this lesson the hard way). We tend to write what I'd like to refer to as "read-only" code haha

4. As we moved towards a world where we compose many smaller services we've found ourselves leaning less and less on Django. Rather, we choose to build basic apis in Tornado (which has the nice side effect that our workers use the same framework). 

5. Tornado is an IO framework which leverages an eventloop and pythons non-blocking socket api. It gives us concurrency without the overhead of switching processes or trying to fight against the GIL. If we need more cpu power, we almost always end up supervising different instances of the same service on different cpus on a host.

6. Asynchronous code is really good at waiting on things. One of the tradeoffs of composing services like we do (SOA) is that we end up doing alot of HTTP / worker requests. Asynchronous code is essentially code that is optimized for two things: 1.) waiting on a lot of things at once and 2.) switching contexts really really quickly when work is ready to be processed

7. Again, most of our work is IO bound, not cpu bound (nature of distributed systems). Throwing more CPU cycles at the problem is going to make much difference and will only complicate our code and provide slower context switches (ie: when some network work at the kernel level is finished and ready to be processed). Python is built to be run as a single process (for most cases) and things such as multiprocessing and threading provide big context switches.

8. Some code! 
  Just to walk through a simple script that we write - take it back to the beginning when you were just learning python

9. Questions / Feedback

