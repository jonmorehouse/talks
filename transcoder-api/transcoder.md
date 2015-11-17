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

BuzzFeed does self hosted videos!

-- 

## Goals

1. self hosted video
2. support hls/flv/mp4
3. video-upload/videoapp 

--

## Challenges

### _lots of moving parts_

* videoapp (ios/android)
* video-upload
* videoapp-cms

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

## API design

* public interface for triggering jobs
* state stored internally
* external workers communicate state via HTTP

-- 

## Worker Design

* work dispensed by NSQ
* state communicated back via HTTP
* easy to test individual components

--

## Pipeline Topology

![Topology](https://github.com/buzzfeed/video-infra/raw/master/docs/images/videoapp_topology.png)

--

## It works!

We've been using the video transcoding pipeline in the videoapp for a few weeks now :)


