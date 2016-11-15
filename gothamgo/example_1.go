package main

import (
	"net/http"
	"net/http/httputil"
)

func handler(rw http.ResponseWriter, req *http.Request) {
	// fetch the upstream for this request
	upstream, err := fetchUpstream(req)
	if err != nil {
		return writeErrResponse(err, rw)
	}

	// authenticate this request for the specified upstream
	if err := authenticate(req, upstream); err != nil {
		return writeErrResponse(err, rw)
	}

	if err := checkRateLimit(req, upstream); err != nil {
		return writeErrResponse(err, rw)
	}

	httputil.ReverseProxy(req)
}
