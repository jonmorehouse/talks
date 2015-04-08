import json
from base64 import b64encode

test = {
  "account_id": "55", 

  "iss": "issuer claim", 
  "sub": "subject",
  "aud": "mobile_ios_app",

  "exp": "2016-08-05_13:25:06",
  "iat": "2015-04-08_13:25:06",
  "jti": "1020"
}


print b64encode(json.dumps(test))

