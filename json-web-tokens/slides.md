title: JSON Web Tokens
output: slides.html
theme: sudodoki/reveal-cleaver-theme

--
## JSON Web Token

"A JSON Web Token (JWT) is a compact URL-safe means of representing claims to be transferred between two parties." - JWT.io

--

## Outline

--

## What is a JWT?

1. a token generated from 3 parts:
  - JOSE header 
  - claim
  - signature

2. a means for passing around *trusted* claims

--

## State as a passable entity

~~~ json
{
  "account_id": "55",
}
~~~

~~~ bash
$ curl -H 'X-APIToken: 'eyJhbGciOiJI.eyJhY2NvdW50.3xycKTQssS0O' http://buzzfeed.com/api
~~~

--

## Random Fact ...

JWT is pronounced as "jot"

--

## Claims 

the "content" in the JWT

--

there are 7 registered claims (according to IEFT draft):

~~~ json
{
  "iss": "issuer claim", 
  "sub": "subject",
  "aud": "audience - who should be using this?",
  "exp": "expiration time",
  "nbf": "not before time, states that this is a delayed token",
  "iat": "issued at time",
  "jti": "jti (JWT ID) claim ***",
}
~~~

--

## You can add whatever you want to a JWT, though...

~~~ json
{
  "account_id": 55,
  "admin": true,
  "platform": "ios"
}

~~~

--

## What makes up a JWT?

~~~ python
".".join(header, claim, signature)
~~~

--

## 1. Header

base64 encoded JSON object describing how the token is signed

JOSE Header = Javascript Object Signing and Encryption

~~~ json
{
  "typ": "mime-type"
  "alg": "usually HMAC SHA-256"
}
~~~

~~~ python
b64Encode(json.dumps(header))
~~~

--

## 2. Claims

~~~ json
{
  "account_id": "55", 

  "iss": "issuer claim", 
  "sub": "subject",
  "aud": "mobile_ios_app",

  "exp": "2016-08-05_13:25:06",
  "iat": "2015-04-08_13:25:06",
  "jti": "1020"
}
~~~

~~~ python
b64encode(json.dumps(claim))
~~~


~~~
$ eyJzdWIiOiAic3ViamVjdCIsICJhdWQiOiAibW9iaWxlX2lvc19hcHAiLCAiaXNzIjogImlzc3VlciBjbGFpbSIsICJqdGkiOiAiMTAyMCIsICJleHAiOiAiMjAxNi0wOC0wNV8xMzoyNTowNiIsICJpYXQiOiAiMjAxNS0wNC0wOF8xMzoyNTowNiIsICJhY2NvdW50X2lkIjogIjU1In0=
~~~
-- 

## 3. Signature

HMAC SHA-256 of the claim + header

~~~ python
from base64 import b64encode
import json
import hmac
import hashlib

encoded_header = b64encode(json.dumps(header))
encoded_claims = b64encode(json.dumps(claims))

digest = hmac.new("your secret key", 
  msg=".".join((encoded_header, encoded_claims)), 
  digestmod=hashlib.sha256).digest())

signature = base64.b64encode(digest).decode()

~~~


--

## Signature as Security

Signature is used to verify that the claim was not modified in transit.

~~~ python
# claim component can be easily decrypted and modified
unencrypted_claim = b64decode(token.split(".")[1])
unencrypted_claim['admin'] = True

new_claim = b64encode(json.dumps(unencrypted_claim))

# piece together the token
token = "".join(token.split(".")[0], new_claim, token.split(".")[2])
~~~

--

##  Security Vulnerability

*none* is a valid value for "alg" in the encryption header, signifying trust without any encryption/signing required.

~~~ json
{
  "typ": "JWT",
  "alg": "None",
}
~~~

Don't do this (see previous slide). In fact, check that any library you use handles encryption accordingly.

-- 

## Short Lived Tokens

* short expiration time means that compromised keys are only usable for a small time period
* no need for a token store / blacklist

--

## Refresh/Access Token + JWT

* refresh tokens are **only** granted with a `client_id` `client_secret` combination
* access tokens are short lived. A compromised token is only usable for a few minutes at most
* refresh tokens **only** used for requesting a new access_token

--

## Stateless ... what?

* context for a request lives in the JWT 
  * logged_in?
  * account_id
  * admin privileges?
  * acl
* `curl -H "X-Token: jwt"` - the token header inherently lives *inside* the request
* no need for a *session_table*
* user session therefore lives inside of the token

-- 

## General Use Cases

1. pass authentication information between backend services
2. mobile / *cookieless* usage of an authenticated service
3. one off / non-persistable events (password resets)
4. flexibility - HTTP is the only requirement for api usage

--

## Mobile

No need for any extra logic for storing / adding in cookie information to the request on mobile

~~~ swift
func saveTokenWithResponse(response: NSHTTPURLResponse) {
  if let token = httpResponse.allHeaderFields["X-Token"] as? String {
      SSKeychain.setPassword(token, forService: "buzzfeed-video", account: "api-token")
  }
}

func addTokenToRequest(request: NSMutableURLRequest) {
  if let token = SSKeychain.passwordForService('api-token', account: "api-token") {
      request.addValue(token, forHTTPHeaderField: "X-Token")
  }
}

~~~

-- 

## Further Reading





