# Instrumentation - outcome oriented monitoring

A tech talk I am giving at BuzzFeed on March 8th 2016.

## Overview

These slides correspond to a talk about instrumentation at scale. Distributed systems, and especially large distributed teams out grow simple logging and monitoring really quickly. 

With `statsd` and `datadog` instrumentation becomes a first class citizen. As the engineer on a system, you can instrument out a "success" and a "failure" story for different components. Metrics, and subsequently, graphs and dashboards of these metrics allow a system to be monitored, debugged and maintained from a birds eye view. Dashboards tend to tell us the _real_ story and give us the insights that we really care about.

The slides can be found [here](https://go-talks.appspot.com/github.com/jonmorehouse/instrumentation-talk/slides_3.slide)

