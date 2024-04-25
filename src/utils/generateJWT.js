const crypt = require("crypto");

export default function generateJWT(key, secret, username) {
  var body = {
    uid: key,
    exp: Math.floor(new Date().getTime() / 1000) + 3600,
    iat: Math.floor(new Date().getTime() / 1000) - 10,
    username: username,
  };
  var header = {
    alg: "HS256",
    typ: "JWT",
  };
  var token = [];
  token[0] = base64url(JSON.stringify(header));
  token[1] = base64url(JSON.stringify(body));
  token[2] = genTokenSign(token, secret);
  return token.join(".");
}

function genTokenSign(token, secret) {
  if (token.length != 2) {
    return;
  }
  var hash = crypt
    .createHmac("sha256", secret)
    .update(token.join("."))
    .digest("base64");

  return urlConvertBase64(hash);
}

function base64url(input) {
  var base64String = btoa(input);
  return urlConvertBase64(base64String);
}

function urlConvertBase64(input) {
  var output = input.replace(/=+$/, "");
  output = output.replace(/\+/g, "-");
  output = output.replace(/\//g, "_");
  return output;
}
