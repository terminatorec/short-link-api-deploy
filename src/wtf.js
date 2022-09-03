{"openapi":"3.0.2","info":{"title":"FastAPI","version":"0.1.0"},"paths":{"/register":{"post":{"summary":"Register","operationId":"register_register_post","parameters":[{"required":true,"schema":{"title":"Username","type":"string"},"name":"username","in":"query"},{"required":true,"schema":{"title":"Password","type":"string"},"name":"password","in":"query"}],"responses":{"200":{"description":"Successful Response","content":{"application/json":{"schema":{}}}},"422":{"description":"Validation Error","content":{"application/json":{"schema":{"$ref":"#/components/schemas/HTTPValidationError"}}}}}}},"/login":{"post":{"summary":"Log In","operationId":"log_in_login_post","requestBody":{"content":{"application/x-www-form-urlencoded":{"schema":{"$ref":"#/components/schemas/Body_log_in_login_post"}}},"required":true},"responses":{"200":{"description":"Successful Response","content":{"application/json":{"schema":{}}}},"422":{"description":"Validation Error","content":{"application/json":{"schema":{"$ref":"#/components/schemas/HTTPValidationError"}}}}}}},"/squeeze":{"post":{"summary":"Squeeze","operationId":"squeeze_squeeze_post","parameters":[{"required":true,"schema":{"title":"Link","maxLength":65536,"minLength":1,"type":"string","format":"uri"},"name":"link","in":"query"}],"responses":{"200":{"description":"Successful Response","content":{"application/json":{"schema":{"$ref":"#/components/schemas/Link"}}}},"422":{"description":"Validation Error","content":{"application/json":{"schema":{"$ref":"#/components/schemas/HTTPValidationError"}}}}},"security":[{"OAuth2PasswordBearer":[]}]}},"/statistics":{"get":{"summary":"Statistics","operationId":"statistics_statistics_get","parameters":[{"required":false,"schema":{"title":"Order","type":"array","items":{"enum":["asc_short","asc_target","asc_counter","desc_short","desc_target","desc_counter"],"type":"string"},"default":[]},"name":"order","in":"query"},{"required":false,"schema":{"title":"Offset","type":"integer","default":0},"name":"offset","in":"query"},{"required":false,"schema":{"title":"Limit","type":"integer","default":0},"name":"limit","in":"query"}],"responses":{"200":{"description":"Successful Response","content":{"application/json":{"schema":{"title":"Response Statistics Statistics Get","type":"array","items":{"$ref":"#/components/schemas/Link"}}}}},"422":{"description":"Validation Error","content":{"application/json":{"schema":{"$ref":"#/components/schemas/HTTPValidationError"}}}}},"security":[{"OAuth2PasswordBearer":[]}]}},"/s/{key}":{"get":{"summary":"Redirect","operationId":"redirect_s__key__get","parameters":[{"required":true,"schema":{"title":"Key","type":"string"},"name":"key","in":"path"}],"responses":{"307":{"description":"Successful Response"},"422":{"description":"Validation Error","content":{"application/json":{"schema":{"$ref":"#/components/schemas/HTTPValidationError"}}}}}}}},"components":{"schemas":{"Body_log_in_login_post":{"title":"Body_log_in_login_post","required":["username","password"],"type":"object","properties":{"grant_type":{"title":"Grant Type","pattern":"password","type":"string"},"username":{"title":"Username","type":"string"},"password":{"title":"Password","type":"string"},"scope":{"title":"Scope","type":"string","default":""},"client_id":{"title":"Client Id","type":"string"},"client_secret":{"title":"Client Secret","type":"string"}}},"HTTPValidationError":{"title":"HTTPValidationError","type":"object","properties":{"detail":{"title":"Detail","type":"array","items":{"$ref":"#/components/schemas/ValidationError"}}}},"Link":{"title":"Link","required":["id","short","target","counter"],"type":"object","properties":{"id":{"title":"Id","type":"integer"},"short":{"title":"Short","type":"string"},"target":{"title":"Target","maxLength":65536,"minLength":1,"type":"string","format":"uri"},"counter":{"title":"Counter","type":"integer"}}},"ValidationError":{"title":"ValidationError","required":["loc","msg","type"],"type":"object","properties":{"loc":{"title":"Location","type":"array","items":{"type":"string"}},"msg":{"title":"Message","type":"string"},"type":{"title":"Error Type","type":"string"}}}},"securitySchemes":{"OAuth2PasswordBearer":{"type":"oauth2","flows":{"password":{"scopes":{},"tokenUrl":"login"}}}}}}