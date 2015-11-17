title: Transcoder
output: slides.html
theme: sudodoki/reveal-cleaver-theme
author:
  name: Jon Morehouse
  twitter: jonmorehouse
  url: github.com/jonmorehouse
controls: false

-- 

## Video Transcoding

Bringing self-hosted video content to BuzzFeed!

-- 

## Goals

1. self hosted video
2. support for HLS/mp4/flv outputs
3. integration with video-upload / videoapp
4. robust, scalable, etc etc

--

## Challenges

* lots of external moving parts (ios/android, videoapp, video-upload, videoapp-cms)
* integration with different cloud services (Elastic Transcoder, SQS)
* productionizing!

-- 

## Approach

* decision making up front
* 2 months of planning! Yikes!
* ops involved from day 1

-- 

## Technologies Used

* tornado
* nsq
* s3
* elastic transcoder service
* sqs/sns

--

## Transcoder Topology

![Topology](https://github.com/buzzfeed/video-infra/raw/master/docs/images/transcoder_service_topology.png)

--

## Pipeline Topology

![Topology](https://github.com/buzzfeed/video-infra/raw/master/docs/images/videoapp_topology.png)

--

## It works!

We've been using the video transcoding pipeline in the videoapp for a few weeks now :)


