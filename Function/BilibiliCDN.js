var body = $response.body;
var urlRegex = /https?:\/\/.*\.szbdyd\.com\/(.*)/g;
body = body.replace(urlRegex, "https://upos-sz-mirrorcoso1.bilivideo.com/$1");
$done({ body });
