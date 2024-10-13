[rewrite_local]
^https:\/\/.*\.bilivideo\.cn\/.*\.m3u8$ url script-response-body pcdn_replacer.js

[mitm]
hostname = *.bilivideo.cn, *.mcdn.bilivideo.cn, *.szbdyd.com


const cdnDomain = "upos-sz-mirrorcoso1.bilivideo.com"; // 你要替换的CDN域名

function replaceP2PUrl(url) {
    try {
        const urlObj = new URL(url);
        if (urlObj.hostname.endsWith(".mcdn.bilivideo.cn")) {
            urlObj.host = cdnDomain;
            console.log(`更换视频源: ${urlObj.hostname} -> ${urlObj.host}`);
        } else if (urlObj.hostname.endsWith(".szbdyd.com")) {
            urlObj.host = urlObj.searchParams.get('xy_usource') || cdnDomain;
            console.log(`更换视频源: ${urlObj.hostname} -> ${urlObj.host}`);
        }
        return urlObj.toString();
    } catch (e) {
        console.error("URL替换失败: ", e);
        return url;
    }
}

// 拦截并修改请求的 URL
const body = $response.body;
if (body) {
    let modifiedBody = body.replace(/https:\/\/.*\.mcdn\.bilivideo\.cn/g, (match) => replaceP2PUrl(match));
    $done({ body: modifiedBody });
} else {
    $done({});
}
