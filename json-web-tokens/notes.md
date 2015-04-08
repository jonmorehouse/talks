# JWT

- pronounced jot
- http://self-issued.info/docs/draft-ietf-oauth-json-web-token.html#ExampleJWT

# Claim

Claim can be seen as access to a resource

# Token Advantages

- cross domain / cors - cookie lives in the header
- stateless - jwt holds all information for the user
- flexible - no need for cookie containers on mobile
- performance - all you need to do is decrypt the token
- multitiered server - you can pass the api token around as an authentication means

#JWT 

- url safe contract between two parties
  - allows claim to be passed between two parties
- claims in a JWT are encoded as Jso
- JSON is used as the paylod of a Json Web Signature (plain text that is encrypted) 
- this is either signed or MACed and/or encrypted
- IETF JWT draft 25

# Structure

<base64-encodedheader>.<base64-encoded-claim>.<base64 encoded signature>

- all parts are base64 encoded
- header = how is this encrypted
- claim = encoded claim
- signature = mac signature

# JWT Signature (ie: the middle piece)

- HMACSHA256( base64(urlencode(header) + "." + base64(urlencode(payload), "secret") )

# Header 

~~~ json
{
 "typ":
 "alg": 
}
~~~

# ieft claims

- iss - issuer of claim
- exp - utc unix time where token was issued at
- iat - utc unix time when token expires
- jti - unique identifier for jwt
- sub - subject of token

# Disadvantages

- tokens can get long
- hard to blacklist 
  - shorter timeout periods
- can make logouts etc tricky

# OAuth

Token authentication is very similar to oauth. The idea that "throwaway" tokens are generated frequently with short timeouts has been around for a while. A refresh token requires a client_id and client_secret to generate a long lasting JWT.

# Flow

1. base64 encode a header, base64 encode a claim / body
2. build a signature so you know you can trust the claim
3. the claim is easily reverse engineered...

# InnerService Communication

- api layer has a token registry
  - can validate / invalidate the token with that registry

- token is now included in requests to the rest of the system, and assuming those services have ameaningful way of decoding the token (aka they know the key) then basic information can be passed around securely and easily

- this could be useful for logging 

## Further Reading

* https://tools.ietf.org/html/draft-ietf-oauth-json-web-token-32
* https://auth0.com/blog/2015/03/31/critical-vulnerabilities-in-json-web-token-libraries/
* https://neosmart.net/blog/2015/using-hmac-signatures-to-avoid-database-writes/
* http://jose.readthedocs.org/en/latest/


