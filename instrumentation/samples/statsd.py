#!/usr/bin/env python
import tornado.web

from statsd import StatsClient

statsd = StatsClient()


class TranscoderJob(tornado.web.RequestHandler):

    @tornado.gen.coroutine
    def post(self):
        ###
        # create a new job
        ###
        with statsd.timer('transcoder.create_job.db'):
            # do some stuff
            self.write_to_database()
            
        statsd.incr('create_job.finished')
        self.finish('ok')
