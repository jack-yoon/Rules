/** 
☑️ 资源解析器  ⟦2021-1-6 17:29⟧

1️⃣ ⟦𝐬𝐞𝐫𝐯𝐞𝐫 节点⟧ ➠ 参数说明:
⦿ 𝗶𝗻𝗳𝗼=1, 开启通知提示机场 ✈️ 流量信息(如有提供);
⦿ 𝗲𝗺𝗼𝗷𝗶=1(国行设备用2)/-1, 添加/删除节点名内地区旗帜;
⦿ 𝘂𝗱𝗽=1/-1, 𝘁𝗳𝗼=1/-1, 分别强制开启(关闭) 𝐮𝐝𝐩-𝐫𝐞𝐥𝐚𝐲/𝐟𝐚𝐬𝐭-𝐨𝐩𝐞𝐧;
⦿ 𝘁𝗹𝘀13=1, 𝗰𝗲𝗿𝘁=1, 分别开启 𝐭𝐥𝐬1.3 及 𝐭𝐥𝐬 证书验证(默认关闭);
⦿ 𝗶𝗻, 𝗼𝘂𝘁, 𝗿𝗲𝗴𝗲𝘅 分别为 保留、删除、正则筛选 节点;
  ❖ 𝗶𝗻, 𝗼𝘂𝘁 中多参数(逻辑"或")用 "+", 逻辑"与"用 "." 表示;
  ❖ 𝗿𝗲𝗴𝗲𝘅 会对节点的完整信息进行匹配(类型、端口、加密等);
  ❖ 示范: "𝐢𝐧=香港.0\.2倍率+台湾&𝐨𝐮𝐭=香港%20𝐁𝐆𝐏&𝐫𝐞𝐠𝐞𝐱=(?𝐢)𝐢𝐩𝐥𝐜"
⦿ 𝗿𝗲𝗻𝗮𝗺𝗲 重命名, "旧名@新名", "前缀@", "@后缀", 用 "+" 连接多个参数;
  ❖ 删除字段: "字段1.字段2☠️", 想删除 "." 时用 "\." 替代
  ❖ 示范: "𝐫𝐞𝐧𝐚𝐦𝐞=香港@𝐇𝐊+[𝐒𝐒]@+@[1𝐗]+流量.0\.2☠️"
  ❖ 默认 emoji 先生效, 如想调换顺序, 请用 𝗿𝗿𝗻𝗮𝗺𝗲 参数
⦿ 𝗱𝗲𝗹𝗿𝗲𝗴, 利用正则表达式来删除 "节点名" 中的字段(⚠️ 慎用)
⦿ 𝗿𝗲𝗽𝗹𝗮𝗰𝗲 参数, 正则替换节点中内容, 可用于重命名/更改加密方式等
  ❖ 𝗿𝗲𝗽𝗹𝗮𝗰𝗲=𝗿𝗲𝗴𝗲𝘅1@𝘀𝘁𝗿1+𝗿𝗲𝗴𝗲𝘅2@𝘀𝘁𝗿2
  ❖ 𝗿𝗲𝗽𝗹𝗮𝗰𝗲=𝗿𝗲𝗴𝗲𝘅1@ 则等效于 𝗱𝗲𝗹𝗿𝗲𝗴 参数
⦿ 𝘀𝗼𝗿𝘁=1/-1/x/指定规则, 分别按节点名 正/逆/随机/指定规则 排序
  ❖ 指定规则是正则表达式或简单关键词, 用"<" 或 ">" 连接
  ❖ 𝘀𝗼𝗿𝘁=🇭🇰>🇸🇬>🇯🇵>🇺🇸 , 靠前排序
  ❖ 𝘀𝗼𝗿𝘁=IEPL<IPLC<BGP , 靠后排序
⦿ ⟦进阶参数⟧: 𝘀𝗳𝗶𝗹𝘁𝗲𝗿/𝘀𝗿𝗲𝗻𝗮𝗺𝗲, 传入一段 base64 编码的脚本, 可用于过滤/重命名订阅节点
  ❖ 说明: https://github.com/KOP-XIAO/QuantumultX/pull/9
----------------------------------------------------------
*/



let [link0, content0, subinfo] = [$resource.link, $resource.content, $resource.info]
const subtag = $resource.tag != undefined ? $resource.tag : "";
// 非 raw 链接的沙雕情形
content0 = content0.indexOf("DOCTYPE html") != -1 && link0.indexOf("github.com") != -1 ? ToRaw(content0) : content0 ;

//debug
//const $resource={}
//const $done=function(snt){return snt}
//parameters

var para = (link0.indexOf("http") != -1 && link0.indexOf("://") != -1) ? link0 : link0 + content0.split("\n")[0];
var para1 = para.slice(para.indexOf("#") + 1) //防止参数中其它位置也存在"#"
var mark0 = para.indexOf("#") != -1 ? true : false;
var Pinfo = mark0 && para1.indexOf("info=") != -1 ? para1.split("info=")[1].split("&")[0] : 0;
var ntf_flow = 0;
//常用量
const Base64 = new Base64Code();
const escapeRegExp = str => str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'); //处理特殊符号以便正则匹配使用
var link1 = link0.split("#")[0]
const qxpng = "https://raw.githubusercontent.com/crossutility/Quantumult-X/master/quantumult-x.png" // server sub-info link
const subinfo_link = { "open-url": "https://t.me/QuanX_API", "media-url": "https://shrtm.nu/ebAr" };
const subinfo_link1 = { "open-url": link1, "media-url": "https://shrtm.nu/uo13" } // server sub-info link(fake-nodes)
const rwrite_link = { "open-url": link1, "media-url": "https://shrtm.nu/x3o2" } // rewrite filter link
const rwhost_link = { "open-url": link1, "media-url": "https://shrtm.nu/0n5J" } // hostname filter link
const rule_link = { "open-url": link1, "media-url": "https://shrtm.nu/cpHD" } // rule filter link
const nan_link = { "open-url": link1, "media-url": qxpng } // nan error link
const bug_link = { "open-url": "https://t.me/Shawn_KOP_bot", "media-url": "https://shrtm.nu/obcB" } // bug link
const sub_link = { "open-url": link1, "media-url": "https://shrtm.nu/ebAr" } // server link


SubFlow() //流量通知


// 参数获取
var Pin0 = mark0 && para1.indexOf("in=") != -1 ? (para1.split("in=")[1].split("&")[0].split("+")).map(decodeURIComponent) : null;
var Pout0 = mark0 && para1.indexOf("out=") != -1 ? (para1.split("out=")[1].split("&")[0].split("+")).map(decodeURIComponent) : null;
var Psfilter = mark0 && para1.indexOf("sfilter=") != -1 ? Base64.decode(para1.split("sfilter=")[1].split("&")[0]) : null; // script filter
var Preg = mark0 && para1.indexOf("regex=") != -1 ? decodeURIComponent(para1.split("regex=")[1].split("&")[0]) : null; //server正则过滤参数
var Pregdel = mark0 && para1.indexOf("delreg=") != -1 ? decodeURIComponent(para1.split("delreg=")[1].split("&")[0]) : null; // 正则删除参数
var Phin0 = mark0 && para1.indexOf("inhn=") != -1 ? (para1.split("inhn=")[1].split("&")[0].split("+")).map(decodeURIComponent) : null; //hostname 
var Phout0 = mark0 && para1.indexOf("outhn=") != -1 ? (para1.split("outhn=")[1].split("&")[0].split("+")).map(decodeURIComponent) : null; //hostname
var Preplace = mark0 && para1.indexOf("replace=") != -1 ? decodeURIComponent(para1.split("replace=")[1].split("&")[0]) : null; //filter/rewrite 正则替换
var Pemoji = mark0 && para1.indexOf("emoji=") != -1 ? para1.split("emoji=")[1].split("&")[0] : null;
var Pudp0 = mark0 && para1.indexOf("udp=") != -1 ? para1.split("udp=")[1].split("&")[0] : 0;
var Ptfo0 = mark0 && para1.indexOf("tfo=") != -1 ? para1.split("tfo=")[1].split("&")[0] : 0;
var Prname = mark0 && para1.indexOf("rename=") != -1 ? para1.split("rename=")[1].split("&")[0].split("+") : null;
var Psrename = mark0 && para1.indexOf("srename=") != -1 ? Base64.decode(para1.split("srename=")[1].split("&")[0]) : null; // script rename
var Prrname = mark0 && para1.indexOf("rrname=") != -1 ? para1.split("rrname=")[1].split("&")[0].split("+") : null;
var Ppolicy = mark0 && para1.indexOf("policy=") != -1 ? decodeURIComponent(para1.split("policy=")[1].split("&")[0]) : "Shawn";
var Pcert0 = mark0 && para1.indexOf("cert=") != -1 ? para1.split("cert=")[1].split("&")[0] : 0;
var Psort0 = mark0 && para1.indexOf("sort=") != -1 ? para1.split("sort=")[1].split("&")[0] : 0;
var PsortX = mark0 && para1.indexOf("sortx=") != -1 ? para1.split("sortx=")[1].split("&")[0] : 0;
var PTls13 = mark0 && para1.indexOf("tls13=") != -1 ? para1.split("tls13=")[1].split("&")[0] : 0;
var Pntf0 = mark0 && para1.indexOf("ntf=") != -1 ? para1.split("ntf=")[1].split("&")[0] : 2;
var Pb64 = mark0 && para1.indexOf("b64=") != -1 ? para1.split("b64=")[1].split("&")[0] : 0;
var emojino = [" 0️⃣ ", " 1⃣️ ", " 2⃣️ ", " 3⃣️ ", " 4⃣️ ", " 5⃣️ ", " 6⃣️ ", " 7⃣️ ", " 8⃣️ ", " 9⃣️ ", " 🔟 "]
var pfi = Pin0 ? "in=" + Pin0.join(", ") + ",  " : ""
var pfo = Pout0 ? "out=" + Pout0.join(", ") : ""
var pfihn = Phin0 ? "inhn=" + Phin0.join(", ") + ",  " : ""
var pfohn = Phout0 ? "outhn=" + Phout0.join(", ") : ""
var Pcnt =  para1.indexOf("cnt=") != -1 ? para1.split("cnt=")[1].split("&")[0] : 0;
let [flow, exptime, errornode, total] = "";

var typeU = para1.indexOf("type=") != -1 ? para1.split("type=")[1].split("&")[0] : "";
var type0 = Type_Check(content0); //  类型判断
//$notify(type0,"hh")

//flag=1,2,3分别为 server、rewrite、rule 类型
var flag = 1

try {
  total = ResourceParse();
  
} catch (err) {
    $notify("❌ 解析出现错误", "⚠️请点击发送链接反馈", err, bug_link);
}

$done({ content: total });


/**
# 以下为具体的 function

*/
//预处理，分流/重写等处理完成
function ResourceParse() {
  if (type0 == "Subs-B64Encode") {
    total = Subs2QX(Base64.decode(content0), Pudp0, Ptfo0, Pcert0, PTls13);
  } else if (type0 == "Subs") {
    total = Subs2QX(content0, Pudp0, Ptfo0, Pcert0, PTls13);
  } else if (type0 == "QuanX" || type0 == "Clash") {
    total = isQuanX(content0);
  } else if (type0 == "Surge") {
    total = Surge2QX(content0);
  } else if (type0 == "sgmodule") { // surge module 模块/含 url-regex 的 rule-set
    flag = 2 
    total = SGMD2QX(content0) // 转换 
    total = Rewrite_Filter(total, Pin0, Pout0); // 筛选过滤
    if (Preplace) { total = ReplaceReg(total, Preplace) }
    total = total.join("\n")
  } else if (type0 == "rewrite") { // rewrite 类型
    flag = 2;
    total = Rewrite_Filter(isQuanXRewrite(content0.split("\n")), Pin0, Pout0);
    if (Preplace) { total = ReplaceReg(total, Preplace) }
    total = total.join("\n")
  } else if (type0 == "Rule") {  // rule 类型, 已处理完毕
    flag = 3;
    total = Rule_Handle(content0.split("\n"), Pout0, Pin0).filter(Boolean);
    if (Preg && total.length!=0) { // 正则筛选规则 filter
    total = total.map(Regex).filter(Boolean).join("\n") 
    RegCheck(total, "分流引用", Preg)} 
    if (Preplace) { total = ReplaceReg(total, Preplace) }
    total = total.join("\n")
  } else if (content0.trim() == "") {
    $notify("‼️ 引用" + "⟦" + subtag + "⟧" + " 返回內容为空", "⁉️ 点通知跳转以确认链接是否失效", para.split("#")[0], nan_link);
    flag = 0;
  } else if (type0 == "unknown") {
    $notify("😭 未能解析, 可能是 bug ⁉️  " + "⟦" + subtag + "⟧", "👻 本解析器 暂未支持/未能识别 该订阅格式", "⚠️ 将直接导入Quantumult X \n 如认为是 BUG, 请点通知跳转反馈", bug_link);
    flag = -1;
  }
  
  //开始处理
  if (flag == 1) { //server 类型统一处理
    total = total.filter(Boolean)
    if (Pinfo == 1 && ntf_flow == 0) { //假节点类型的流量通知
      flowcheck(total)
    }
    if (Pin0 || Pout0) { total = Filter(total, Pin0, Pout0) } // in & out 
    if (Preg) { total = total.map(Regex).filter(Boolean)  // regex
      RegCheck(total, "节点订阅", Preg)} 
    if (Psfilter) { total = FilterScript(total, Psfilter) }
    if (Prrname) {
      Prn = Prrname;
      total = total.map(Rename);
    }
    if (Pemoji) { total = emoji_handle(total, Pemoji); }
    if (Prname) {
      Prn = Prname;
      total = total.map(Rename);
    }
    if (Pregdel) {
      delreg = Pregdel
      total = total.map(DelReg)
    }
    if (Preplace) { // server 类型也可用 replace 参数进行重命名操作
      total = ReplaceReg(total, Preplace)
    }
    if (Psrename) { total = RenameScript(total, Psrename) }
    if (Psort0) {
      total = QXSort(total, Psort0);
    }
    if (total.length > 0){
      if (Pcnt == 1) {$notify("Final Content" , "Nodes: " +total.length, total)}
      total = TagCheck_QX(total).join("\n") //节点名检查
      total = Base64.encode(total) //强制节点类型 base64 加密后再导入 Quantumult X
      //$done({ content: total });
    } else {
      $notify("❓❓ 友情提示", "⚠️⚠️ 解析后无有效内容", "🚥🚥 请自行检查相关参数, 或者点击通知跳转反馈", bug_link)
      total = errornode
      //$done({ content: errornode })
    }
  } else if (flag == 0){ //空/错误类型
    total = errornode
    //$done({ content: errornode })
  } else if (flag == -1){ //未知类型
    total = content0
    //$done({ content: content0 })
  } 
  return total
  
}

//响应头流量处理部分
function SubFlow() {
  if (Pinfo == 1 && subinfo) {
    var sinfo = subinfo.replace(/ /g, "").toLowerCase();
    var total = "总流量: " + (parseFloat(sinfo.split("total=")[1].split(",")[0]) / (1024 ** 3)).toFixed(2) + "GB";
    var usd = "已用流量: " + ((parseFloat(sinfo.indexOf("upload")!=-1?sinfo.split("upload=")[1].split(",")[0]:"0") + parseFloat(sinfo.split("download=")[1].split(",")[0])) / (1024 ** 3)).toFixed(2) + "GB"
    var left = "剩余流量: " + ((parseFloat(sinfo.split("total=")[1].split(",")[0]) / (1024 ** 3)) - ((parseFloat(sinfo.indexOf("upload")!=-1?sinfo.split("upload=")[1].split(",")[0]:"0") + parseFloat(sinfo.split("download=")[1].split(",")[0])) / (1024 ** 3))).toFixed(2) + "GB"
    if (sinfo.indexOf("expire=") != -1) {
      var epr = new Date(parseFloat(sinfo.split("expire=")[1].split(",")[0]) * 1000);
      var year = epr.getFullYear();  // 获取完整的年份(4位,1970)
      var mth = epr.getMonth() + 1 < 10 ? '0' + (epr.getMonth() + 1) : (epr.getMonth() + 1);  // 获取月份(0-11,0代表1月,用的时候记得加上1)
      var day = epr.getDate() < 10 ? "0" + (epr.getDate()) : epr.getDate();
      epr = "过期时间: " + year + "-" + mth + "-" + day
    } else {
      epr = ""; //"过期时间: ✈️ 未提供該信息" //没过期时间的显示订阅链接
    }
    var message = total + "\n" + usd + ", " + left;
    ntf_flow = 1;
    $notify("流量信息: ⟦" + subtag + "⟧", epr, message, subinfo_link)
  }
//  } else if (Pinfo ==1){
//    $notify("流量信息: ⟦" + subtag + "⟧", "", "⚠️ 该订阅链接未返回任何流量信息", subinfo_link)
//  }
}

//flowcheck-fake-server
function flowcheck(cnt) {
    for (var i = 0; i < cnt.length; i++) {
        var item = cnt[i];
        var nl = item.slice(item.indexOf("tag"))
        var nm = nl.slice(nl.indexOf("=") + 1)
        if (item.indexOf("剩余流量") != -1) {
            flow = nm
        } else if (item.indexOf("过期时间") != -1) {
            exptime = nm
        }
    }
  flow = flow? flow:"⚠️ 该订阅未返回任何流量信息"
  exptime = exptime? exptime:"⚠️ 该订阅未返回套餐时间信息"
    if (flow != "") { $notify("流量信息: ⟦" + subtag + "⟧", flow, exptime, subinfo_link1) }
}

// regex 后的检查
function RegCheck(total, typen, regpara) {
	if(total.length == 0){ 
		$notify("‼️ " + typen + "  ➟ " + "⟦" + subtag + "⟧", "⛔️ 筛选正则: regex=" + regpara, "⚠️ 筛选后剩余项为 0️⃣ , 请检查正则参数及原始链接", nan_link)
	}else if((typen != "节点订阅" && Pntf0 !=0) || (typen == "节点订阅" && Pntf0 ==1)){
		var nolist = total.length <= 10 ? emojino[total.length] : total.length
		$notify("🤖 " + typen + "  ➟ " + "⟦" + subtag + "⟧", "⛔️ 筛选正则: regex=" + regpara, "⚠️ 筛选后剩余以下" + nolist + "个匹配项 \\n ⨷ " + total.join("\n ⨷ "), sub_link)
	}
}
//判断订阅类型
function Type_Check(subs) {
    var type = "unknown"
    var RuleK = ["host,", "-suffix,", "domain,", "-keyword,", "ip-cidr,", "ip-cidr6,",  "geoip,", "user-agent,", "ip6-cidr,"];
    var DomainK = ["domain-set,"]
    var QuanXK = ["shadowsocks=", "trojan=", "vmess=", "http="];
    var SurgeK = ["=ss,", "=vmess,", "=trojan,", "=http,", "=custom,", "=https,", "=shadowsocks", "=shadowsocksr"];
    var ClashK = ["proxies:"]
    var SubK = ["dm1lc3M", "c3NyOi8v", "CnNzOi8", "dHJvamFu", "c3M6Ly", "c3NkOi8v", "c2hhZG93",,"aHR0c"];
    var RewriteK = [" url "]
    var SubK2 = ["ss://", "vmess://", "ssr://", "trojan://", "ssd://", "https://"];
    var ModuleK = ["[Script]", "[Rule]", "[URL Rewrite]", "[Map Local]", "[MITM]", "\nhttp-r"]
    var html = "DOCTYPE html"
    var subi = subs.replace(/ /g, "")
    const RuleCheck = (item) => subi.toLowerCase().indexOf(item) != -1;
    const NodeCheck = (item) => subi.toLowerCase().indexOf(item.toLowerCase()) != -1;
    const RewriteCheck = (item) => subs.indexOf(item) != -1;
    var subsn = subs.split("\n")
    if (subs.indexOf(html) != -1 && link0.indexOf("github.com" == -1)) {
      $notify("‼️ 该链接返回内容有误", "⁉️ 点通知跳转以确认链接是否失效", link0, nan_link);
      type = "web";
    }  else if (ClashK.some(NodeCheck) || typeU == "clash"){ // Clash 类型节点转换
      type = "Clash";
      content0 = Clash2QX(subs)
    } else if ((subi.indexOf("hostname=") != -1 || RewriteK.some(RewriteCheck) || subi.indexOf("pattern=") != -1) && subs.indexOf("[Proxy]") == -1 && subs.indexOf("[server_local]") == -1 && para1.indexOf("dst=filter")==-1 && subi.indexOf("securehostname") == -1 && typeU != "module") {
      type = "rewrite" //Quantumult X 类型 rewrite/ Surge Script/
    } else if ( ((ModuleK.some(RewriteCheck) || para1.indexOf("dst=rewrite") != -1) && (para1.indexOf("dst=filter") == -1) && subs.indexOf("[Proxy]") == -1) || typeU == "module") { // Surge 类型 module /rule-set(含url-regex) 类型
      type = "sgmodule"
    } else if ((RuleK.some(RuleCheck) && subs.indexOf(html) == -1 && subs.indexOf("[Proxy]") == -1 && subs.indexOf("[server_local]") == -1) || typeU == "rule" ||para1.indexOf("dst=filter")!=-1) {
      type = "Rule";
    } else if ((DomainK.some(RuleCheck) || typeU == "domain-set") && subs.indexOf("[Proxy]") == -1 ) {
      type = "Rule";
      content0 = Domain2Rule(content0) // 转换 domain-set
    } else if (subsn.length >= 1 && SubK2.some(NodeCheck) && subs.indexOf("[Proxy]") == -1 && subs.indexOf("[filter_local]") == -1) { //未b64加密的多行URI 组合订阅
      type = "Subs"
    } else if (SubK.some(NodeCheck)) {  //b64加密的订阅类型
      type = "Subs-B64Encode"
    } else if ((subi.indexOf("tag=") != -1 && QuanXK.some(NodeCheck) && subs.indexOf("[Proxy]") == -1 && subs.indexOf("[filter_local]") == -1) || typeU =="list") {
      type = "Subs" // QuanX list
    } else if (subs.indexOf("[Proxy]") != -1) {
      type = "Surge"; // Surge Profiles
    } else if ((SurgeK.some(NodeCheck)  && subs.indexOf("[Proxy]") == -1 && subs.indexOf("[filter_local]") == -1) || typeU == "list") {
      type = "Subs" // Surge proxy list
    } else if (subs.indexOf("[server_local]") != -1) {
      type = "QuanX"  // QuanX Profile
    }
    return type
}

// 检查节点名字(重复以及空名)等QuanX 不允许的情形
function TagCheck_QX(content) {
    var Olist = content
    var Nlist = []
    var nmlist = []
    var nulllist = []; //记录空名字节点
    var duplist = [];  //记录重名节点
    var no = 0;
    for (var i = 0; i < Olist.length; i++) {
        var item = Olist[i] ? Olist[i] : ""
        if (item.replace(/ /gm, "").indexOf("tag=") != -1) {
            var nl = item.slice(item.indexOf("tag"))
            var nm = nl.slice(nl.indexOf("=") + 1)
            if (nm == "") { //空名字
                nm = " [" + item.split("=")[0] + "] " + item.split("=")[1].split(",")[0].split(":")[0]
                item = item.split("tag")[0] + "tag=" + nm.replace("shadowsocks", "ss")
                nulllist.push(nm.replace("shadowsocks", "ss"))
            }
            var ni = 0
            while (nmlist.indexOf(nm) != -1) { //重名
                nm = ni <= 10 ? nm.split(" ⌘")[0] + " ⌘" + emojino[ni] : nm.split(" ⌘")[0] + " ⌘" + ni
                item = item.split("tag")[0] + "tag=" + nm
                ni = ni + 1
            }
            if (ni != 0) { duplist.push(nm) }
            nmlist.push(nm)
            ni = 0
            Nlist.push(item)
        }// if "tag="
    } // for
    if (nulllist.length >= 1) {
        no = nulllist.length <= 10 ? emojino[nulllist.length] : nulllist.length;
        $notify("⚠️ 引用" + "⟦" + subtag + "⟧" + " 内有" + no + "个空节点名 ", "✅ 已将节点“类型+IP”设为节点名", " ⨁ " + nulllist.join("\n ⨁ "), nan_link)
    }
    if (duplist.length >= 1) {
        no = duplist.length <= 10 ? emojino[duplist.length] : duplist.length;
        $notify("⚠️ 引用" + "⟦" + subtag + "⟧" + " 内有" + no + "个重复节点名 ", "✅ 已添加⌘符号作为区分:", " ⨁ " + duplist.join("\n ⨁ "), nan_link)
    }
    return Nlist
}

function Trim(item) {
    return item.trim()
}

// 用于某些奇葩用户不使用 raw 链接的问题
function rawtest(cnt) {
  var Preg0 = RegExp(".*js-file-line\".*?\<\/td\>", "i")
  if (Preg0.test(cnt)) {
    return cnt.replace(/(.*js-file-line\"\>)(.*?)(\<\/td\>)/g,"$2").trim()
  }
}

function ToRaw(cnt) {
  cnt = cnt.split("\n").map(rawtest).filter(Boolean).join("\n")
  var rawlink = link0.replace("github.com","raw.githubusercontent.com").replace("/blob","")
  $notify( "⚠️⚠️ 将尝试解析该资源" + "⟦" + subtag + "⟧" , "🚥 请正确使用GitHub的 raw 链接" , "❌ 你的链接："+link0+"\n✅ 正确链接："+rawlink, {"open-url":rawlink})
  return cnt
}


//url-regex 转换成 Quantumult X
function URX2QX(subs) {
    var nrw = []
    var rw = ""
    subs = subs.split("\n")
    var NoteK = ["//", "#", ";"];  //排除注释项
    for (var i = 0; i < subs.length; i++) {
        const notecheck = (item) => subs[i].indexOf(item) == 0
        if (!NoteK.some(notecheck)) {
        if (subs[i].slice(0, 9) == "URL-REGEX") {  // regex 类型
            rw = subs[i].replace(/ /g, "").split(",REJECT")[0].split("GEX,")[1] + " url " + "reject-200"
            nrw.push(rw)
        } else if (subs[i].indexOf("data=") != -1 && subs.indexOf("[Map Local]") != -1){ // Map Local 类型
            rw = subs[i].replace(/ /g, "").split("data=")[0] + " url " + "reject-dict"
            nrw.push(rw)
        } 
    }
    }
    return nrw
}

//script&rewrite 转换成 Quantumult X
function SCP2QX(subs) {
    var nrw = []
    var rw = ""
    subs = subs.split("\n")
    for (var i = 0; i < subs.length; i++) {
        if (subs[i].slice(0, 8) == "hostname") {
            hn = subs[i].replace(/\%.*\%/g, "")
            nrw.push(hn)
        }
        var SC = ["type=", ".js", "pattern=", "script-path="]
        var NoteK = ["//", "#", ";"]; //排除注释项
        const sccheck = (item) => subs[i].indexOf(item) != -1
        const notecheck = (item) => subs[i].indexOf(item) == 0
        if (!NoteK.some(notecheck)){
          if (SC.every(sccheck)) { // surge js 新格式
            ptn = subs[i].replace(/\s/gi,"").split("pattern=")[1].split(",")[0]
            js = subs[i].replace(/\s/gi,"").split("script-path=")[1].split(",")[0]
            type = subs[i].replace(/\s/gi,"").split("type=")[1].split(",")[0].trim()
            if (type == "http-response" && subs[i].indexOf("requires-body=1") != -1) {
              type = "script-response-body "
            } else if (type == "http-response" && subs[i].indexOf("requires-body=1") == -1) {
              type = "script-response-header "
            } else if (type == "http-request" && subs[i].indexOf("requires-body=1") != -1) {
              type = "script-request-body "
            } else if (type == "http-request" && subs[i].indexOf("requires-body=1") == -1) {
              type = "script-request-header "
            } else {type = "" }
            if (type != "") {
              rw = ptn + " url " + type + js
              nrw.push(rw)
            }
          } else if (subs[i].indexOf(" 302") != -1 || subs[i].indexOf(" 307") != -1) { //rewrite 302&307 复写
            rw = subs[i].split(" ")[0] + " url " + subs[i].split(" ")[2] + " " + subs[i].split(" ")[1]
            nrw.push(rw)
          } else if(subs[i].split(" ")[2] == "header") { // rewrite header 类型
            var pget = subs[i].split(" ")[0].split(".com")[1]
            var pgetn = subs[i].split(" ")[1].split(".com")[1]
            rw = subs[i].split(" ")[0] + " url request-header ^GET " + pget +"(.+\\r\\n)Host:.+(\\r\\n) request-header GET " + pgetn + "$1Host: " + subs[i].split(" ")[1].split("://")[1].split(".com")[0] + ".com$2"
            nrw.push(rw)
          } else if(subs[i].indexOf(" - reject") != -1) { // rewrite reject 类型
            rw = subs[i].split(" ")[0] + " url reject-200"
            nrw.push(rw)
          } else if (subs[i].indexOf("script-path") != -1) { //surge js 旧写法
            type = subs[i].replace(/\s+/g," ").split(" ")[0]
            js = subs[i].split("script-path")[1].split("=")[1].split(",")[0]
            ptn = subs[i].replace(/\s+/g," ").split(" ")[1]
            if (type == "http-response" && subs[i].indexOf("requires-body=1") != -1) {
              type = "script-response-body "
            } else if (type == "http-response" && subs[i].indexOf("requires-body=1") == -1) {
              type = "script-response-header "
            } else if (type == "http-request" && subs[i].indexOf("requires-body=1") != -1) {
              type = "script-request-body "
            } else if (type == "http-request" && subs[i].indexOf("requires-body=1") == -1) {
              type = "script-request-header "
            } else {type = "" }
            if (type != "") {
              rw = ptn + " url " + type + js
              nrw.push(rw)
            }
            
          }
        }

    }
    return nrw
}
// 如果 URL-Regex 跟 rewrite/script 都需要
function SGMD2QX(subs) {
    var nrw0 = URX2QX(subs)
    var nrw1 = SCP2QX(subs)
    var nrwt = [...nrw0, ...nrw1]
    return nrwt
}

//Rewrite过滤，使用+连接多个关键词(逻辑"或"):in 为保留，out 为排除
function Rewrite_Filter(subs, Pin, Pout) {
    var Nlist = [];
    var noteK = ["//", "#", ";"];
    var hnc = 0;
    var dwrite = []
    var hostname = ""
    for (var i = 0; i < subs.length; i++) {
        subi = subs[i].trim();
        var subii = subi.replace(/ /g, "")
        if (subi != "") {
            const notecheck = (item) => subi.indexOf(item) == 0
            if (noteK.some(notecheck)) { // 注释项跳过 
                continue;
            } else if (hnc == 0 && subii.indexOf("hostname=") == 0) { //hostname 部分
                hostname = (Phin0 || Phout0) ? HostNamecheck(subi, Phin0, Phout0) : subi;//hostname 部分
            } else if (subii.indexOf("hostname=") != 0) { //rewrite 部分
                var inflag = Rcheck(subi, Pin);
                var outflag = Rcheck(subi, Pout);
                if (outflag == 1 || inflag == 0) {
                    dwrite.push(subi); //out 命中
                } else if (outflag == 0 && inflag != 0) { //out 未命中 && in 未排除
                    Nlist.push(subi);
                } else if (outflag == 2 && inflag != 0) { //无 out 参数 && in 未排除
                    Nlist.push(subi);
                }
            }
        }
    }
    if (Pntf0 != 0) {
        nowrite = dwrite.length <= 10 ? emojino[dwrite.length] : dwrite.length
        no1write = Nlist.length <= 10 ? emojino[Nlist.length] : Nlist.length
        if (Pin0 && no1write != " 0️⃣ ") { //有 in 参数就通知保留项目
            $notify("🤖 " + "重写引用  ➟ " + "⟦" + subtag + "⟧", "⛔️ 筛选参数: " + pfi + pfo, "☠️ 重写 rewrite 中保留以下" + no1write + "个匹配项:" + "\n ⨷ " + Nlist.join("\n ⨷ "), rwrite_link)
        } else if (dwrite.length > 0) {
            $notify("🤖 " + "重写引用  ➟ " + "⟦" + subtag + "⟧", "⛔️ 筛选参数: " + pfi + pfo, "☠️ 重写 rewrite 中已禁用以下" + nowrite + "个匹配项:" + "\n ⨷ " + dwrite.join("\n ⨷ "), rwrite_link)
        }
    }
    if (Nlist.length == 0) { $notify("🤖 " + "重写引用  ➟ " + "⟦" + subtag + "⟧", "⛔️ 筛选参数: " + pfi + pfo, "⚠️ 筛选后剩余rewrite规则数为 0️⃣ 条, 请检查参数及原始链接", nan_link) }
    if(Preg){ Nlist = Nlist.map(Regex).filter(Boolean) // regex to filter rewrites
    	RegCheck(Nlist, "重写引用", Preg) }
    if (hostname != "") { Nlist.push(hostname) }
    return Nlist
}

// 主机名处理
function HostNamecheck(content, parain, paraout) {
    var hname = content.replace(/ /g, "").split("=")[1].split(",");
    var nname = [];
    var dname = []; //删除项
    for (var i = 0; i < hname.length; i++) {
        dd = hname[i]
        const excludehn = (item) => dd.indexOf(item) != -1;
        if (paraout && paraout != "") { //存在 out 参数时
            if (!paraout.some(excludehn)) { //out 未命中🎯️
                if (parain && parain != "") {
                    if (parain.some(excludehn)) { //Pin 命中🎯️
                        nname.push(hname[i])
                    } else {
                        dname.push(hname[i])
                    } //Pin 未命中🎯️的记录
                } else { nname.push(hname[i]) }	//无in 参数		
            } else { dname.push(hname[i]) } //out 参数命中
        } else if (parain && parain != "") { //不存在 out，但有 in 参数时
            if (parain.some(excludehn)) { //Pin 命中🎯️
                nname.push(hname[i])
            } else { dname.push(hname[i]) }
        } else {
            nname.push(hname[i])
        }
    } //for j
    if (Pntf0 != 0) {
        if (paraout || parain) {
            var noname = dname.length <= 10 ? emojino[dname.length] : dname.length
            var no1name = nname.length <= 10 ? emojino[nname.length] : nname.length
            if (parain && no1name != " 0️⃣ ") {
                $notify("🤖 " + "重写引用  ➟ " + "⟦" + subtag + "⟧", "⛔️ 筛选参数: " + pfihn + pfohn, "☠️ 主机名 hostname 中已保留以下" + no1name + "个匹配项:" + "\n ⨷ " + nname.join(","), rwhost_link)
            } else if (dname.length > 0) {
                $notify("🤖 " + "重写引用  ➟ " + "⟦" + subtag + "⟧", "⛔️ 筛选参数: " + pfihn + pfohn, "☠️ 主机名 hostname 中已删除以下" + noname + "个匹配项:" + "\n ⨷ " + dname.join(","), rwhost_link)
            }
        }
    }
    if (nname.length == 0) {
        $notify("🤖 " + "重写引用  ➟ " + "⟦" + subtag + "⟧", "⛔️ 筛选参数: " + pfihn + pfohn, "⚠️ 主机名 hostname 中剩余 0️⃣ 项, 请检查参数及原始链接", nan_link)
    }
    if(Preg){ nname = nname.map(Regex).filter(Boolean) 
    	RegCheck(nname, "主机名", Preg) }
    hname = "hostname=" + nname.join(", ");
    return hname
}


//对.的特殊处理(in/out & rename中)
function Dot2(cnt) {
    cnt = cnt ? cnt.replace(/\\\./g, "这是个点") : ""
    return cnt
}

function ToDot(cnt) {
    cnt = cnt ? cnt.replace(/这是个点/g, ".") : ""
    return cnt
}

//正则筛选, 完整内容匹配
function Regex(content) {
    var Preg0 = RegExp(Preg, "i")
    cnt = content //.split("tag=")[1]
    if (Preg0.test(cnt)) {
        return content
    }
}

// 判断节点过滤的函数
function Scheck(content, param) {
    name = content.split("tag=")[1].toUpperCase()
    param = param ? param.map(Dot2) : param // 对符号.的特殊处理
    if (param) {
        var flag = 0;
        for (var i = 0; i < param.length; i++) {
            var params = param[i].split(".").map(ToDot);
            const checkpara = (item) => name.indexOf(item.toUpperCase()) != -1;
            if (params.every(checkpara)) {
                flag = 1
            }
        }//for
        return flag
    } else { //if param
        return 2
    }
}

//节点过滤，使用+连接多个关键词(逻辑"或"):in 为保留，out 为排除, "与"逻辑请用符号"."连接
function Filter(servers, Pin, Pout) {
    var Nlist = [];
    var Delist = [];
    var Nname = [];
    servers = servers.filter(Boolean)
    for (var i = 0; i < servers.length; i++) {
        if (Scheck(servers[i], Pin) != 0 && Scheck(servers[i], Pout) != 1) {
            Nlist.push(servers[i])
            Nname.push(servers[i].replace(/ /g, "").split("tag=")[1])
        } else { Delist.push(servers[i].replace(/ /g, "").split("tag=")[1]) } //记录未被保留节点
    }//for
    var no = Delist.length <= 10 ? emojino[Delist.length] : Delist.length;
    var no1 = Nlist.length <= 10 ? emojino[Nlist.length] : Nlist.length;
    if (Pntf0 == 1 && Delist.length >= 1) {//通知部分
        if (Pin && no1 > 0) { //有 in 参数就通知保留部分
            $notify("👥 引用" + "⟦" + subtag + "⟧" + " 开始节点筛选", "🕹 筛选关键字: " + pfi + pfo, "☠️ 已保留以下 " + no1 + "个节点\n" + Nname.join(", "), sub_link);
        } else if (Pout && no > 0) {
            $notify("👥 引用" + "⟦" + subtag + "⟧" + " 开始节点筛选", "🕹 筛选关键字: " + pfi + pfo, "☠️ 已删除以下 " + no + "个节点\n" + Delist.join(", "), sub_link);
        }
    } else if (no1 == 0 || no1 == null) { //无剩余节点时强制通知
        $notify("‼️ ⟦" + subtag + "⟧" + "筛选后节点数为0️⃣", "⚠️ 请自行检查原始链接以及筛选参数", link0, sub_link);
    }
    return Nlist
}

function FilterScript(servers, script) {
    $notify("🤖 启用脚本进行筛选", "", script);
    try {
        const $ = Tools();
        eval(script);
        // extract server tags
        const nodes = Tools().getNodeInfo(servers);
        const IN = filter(nodes);
        const res = servers.filter((_, i) => IN[i]);
        if (res.length === 0) {
            $notify("‼️ ⟦" + subtag + "⟧" + "筛选后节点数为0️⃣", "⚠️ 请自行检查原始链接以及筛选参数", link0, sub_link);
        }
        return res;
    } catch (err) {
        $notify("❌ 脚本筛选出现错误", "", err);
        return servers;
    }
}

// 纠正部分不规范的写法(没有把 tag 写在最后)
function QXFix(cntf) {
  var cnti = cntf.replace(/tag\s+\=/,"tag=").replace("chacha20-poly","chacha20-ietf-poly")
  var hd = cnti.split("tag=")[0]
  var tag = "tag="+cnti.split("tag=")[1].split(",")[0]
  var tail = cnti.split(tag+",")
  cnti = tail.length<=1?  cntf : cntf //String(hd + tail[1] +"," + tag)
  return cnti
}

// 用于过滤非节点部分（比如整份配置中其它内容）,同时纠正部分不规范的写法(没有把 tag 写在最后)
function isQuanX(content) {
    var cnts = content.split("\n");
    var nlist = []
    for (var i = 0; i < cnts.length; i++) {
        var cnti = cnts[i];
        if (cnti.indexOf("=") != -1 && cnti.indexOf("tag") != -1) {
            var cnt = cnti.split("=")[0].trim()
            if (cnt == "http" || cnt == "shadowsocks" || cnt == "trojan" || cnt == "vmess") {
                nlist.push(QXFix(cnti))
            }
        }
    }
    return nlist
}




//根据节点名排序(不含emoji 部分)
function QXSort(content, para) {
    var nlist = content;//.split("\n");
    if (para == 1) {
        return nlist.sort(ToTag)
    } else if (para == -1) {
        return nlist.sort(ToTagR)
    } else if(para == "x") {
        return shuffle(nlist)
    } else if(para == "0") {
        return nlist
    } else {
      return Sort_KWD (nlist,para) //关键词排序
    }
}
//正序
function ToTag(elem1, elem2) {
    var tag1 = elem1.split("tag")[1].split("=")[1].trim()
    var tag2 = elem2.split("tag")[1].split("=")[1].trim()
    res = tag1 > tag2 ? 1 : -1
    return res
}
//逆序
function ToTagR(elem1, elem2) {
    var tag1 = elem1.split("tag")[1].split("=")[1].trim()
    var tag2 = elem2.split("tag")[1].split("=")[1].trim()
    res = tag1 > tag2 ? -1 : 1
    return res
}
// 随机洗牌排序
function shuffle(arr) {
    var input = arr;
    for (var i = input.length - 1; i >= 0; i--) {
        var randomIndex = Math.floor(Math.random() * (i + 1));
        var itemAtIndex = input[randomIndex];
        input[randomIndex] = input[i];
        input[i] = itemAtIndex;
    }
    return input;
}

//根据指定规则排序
function Sort_KWD (cnt,strs) {
  strlist = strs.indexOf("<") != -1 ? strs.split("<"):strs.split(">")
  regj = strlist.map(item => RegExp(item, "i"))
  //dir = PsortX
  dir = strs.indexOf("<") != -1 ? -1:1
  var arr =  new Array(strlist.length+1);   //表格有n行
  for(var i = 0;i < arr.length; i++){
    arr[i] = [];    //每行有列
  }
  for (var i =0; i<cnt.length ; i++) {
    flag = 0
    for (var j=0; j<strlist.length ; j++){
      if(regj[j].test(cnt[i])) {
        arr[j].push(cnt[i])
        flag = 1
        break
      } 
    }
    if (flag != 1){
      arr[strlist.length].push(cnt[i]) } // 不匹配项
  }
  //console.log(arr)
  arr = PsortX == -1? arr.map(item => item.sort(ToTagR)):arr
  arr = PsortX == 1? arr.map(item => item.sort(ToTag)):arr
  newarr = MixArr(arr,dir)
  return newarr
}

function MixArr(cnt,dir){
  var cnt0=[]
  for (i=0; i<cnt.length-1; i++){
    //console.log(dir)
    cnt0 = dir ==1? cnt0.concat(cnt[i]):cnt0.concat(cnt[cnt.length-2-i])
  }
  cnt0 = dir ==1? cnt0.concat(cnt[cnt.length-1].sort(ToTag)):(cnt[cnt.length-1].sort(ToTagR)).concat(cnt0)
  return cnt0
}


//正则删除节点名内的字符
function DelReg(content) {
    delreg = RegExp(delreg, "gmi")
    cnt0 = content.split("tag=")[0]
    cnt1 = content.split("tag=")[1]
    cnt = cnt0 + "tag=" + cnt1.replace(delreg, "")
    return cnt
}

//节点重命名
function Rename(str) {
    var server = str;
    if (server.indexOf("tag=") != -1) {
        hd = server.split("tag=")[0]
        name = server.split("tag=")[1].split(",")[0].trim()
        tail = server.split("tag=")[1].split(",").length <=1 ? "" : server.split("tag=")[1].split(name)[1]
        for (var i = 0; i < Prn.length; i++) {
            nname = Prn[i].split("@")[1] ? decodeURIComponent(Prn[i].split("@")[1]) : Prn[i].split("@")[1];
            oname = Prn[i].split("@")[0] ? decodeURIComponent(Prn[i].split("@")[0]) : Prn[i].split("@")[0];
            if (oname && nname) { //重命名
                var rn = escapeRegExp(oname)
                name = name.replace(new RegExp(rn, "gmi"), nname)
            } else if (oname && nname == "") {//前缀
                var nemoji = emoji_del(name)
                if ((Pemoji == 1 || Pemoji == 2) && Prname ) { //判断是否有重复 emoji，有则删除旧有
                    name = name.replace(name.split(" ")[0] + " ", name.split(" ")[0] + " " + oname)
                } else { name = oname + name }
            } else if (nname && oname == "") {//后缀
                name = name + nname
            } else if (oname && oname.indexOf("☠️") != -1) { //删除特定字符，多字符用.连接
                hh = Dot2(oname.slice(0, oname.length - 2)).split(".") //符号.的特殊处理
                for (j = 0; j < hh.length; j++) {
                    var nn = escapeRegExp(ToDot(hh[j]))
                    var del = new RegExp(nn, "gmi");
                    name = name.replace(del, "")
                }
            } else if (oname == "" && nname == "") { //仅有@时，删除@符号
                name = name.replace(/@/g, "")
            } else {
                name = name
            }
            nserver = hd + "tag=" + name + tail
        }
    } return nserver
}

function RenameScript(servers, script) {
    $notify("🤖 启用脚本进行重命名", "", script);
    try {
        const $ = Tools().rename;
        // extract server tags
        const nodes = Tools().getNodeInfo(servers);
        eval(script);
        const newNames = rename(nodes);
        // rename nodes
        return servers.map((s, i) => s.split("tag=")[0] + "tag=" + newNames[i]);
    } catch (err) {
        $notify("❌ 脚本重命名出现错误", "", err);
        return servers;
    }

}

//删除 emoji 
function emoji_del(str) {
    return str.replace(/[\uD83C][\uDDE6-\uDDFF][\uD83C][\uDDE6-\uDDFF]/g, "").trim();//unescape(escape(str).replace(/\%uD.{3}/g, ''));
}

//为节点名添加 emoji
function get_emoji(source, sname) {
    var cnt = source;
    var flag = 0;
    for (var key in cnt) {
        dd = cnt[key]
        for (i in dd) {
            if (sname.indexOf(dd[i]) != -1) {
                flag = 1;
                nname = key + " " + sname.replace(/[\uD83C][\uDDE6-\uDDFF][\uD83C][\uDDE6-\uDDFF]/g, "").trim(); // use regex to remove the original flag
                return nname
            }
        }
    }
    if (flag == 0) { return "🏴‍☠️ " + sname.replace(/[\uD83C][\uDDE6-\uDDFF][\uD83C][\uDDE6-\uDDFF]/g, "").trim() }
}

//emoji 处理
function emoji_handle(servers, Pemoji) {
    var nlist = []
    var ser0 = servers
    for (var i = 0; i < ser0.length; i++) {
        if (ser0[i].indexOf("tag=") != -1) {
            var oname = ser0[i].split("tag=")[1].trim();
            var hd = ser0[i].split("tag=")[0];
            var nname = oname;//emoji_del(oname);
            var Lmoji = { "🏳️‍🌈": ["流量", "时间", "应急", "过期", "Bandwidth", "expire"], "🇦🇹": ["奥地利", "Austria", "维也纳"], "🇦🇺": ["AU", "Australia", "Sydney", "澳大利亚", "澳洲", "墨尔本", "悉尼"], "🇧🇪": ["BE", "比利时"], "🇧🇬": ["保加利亚", "Bulgaria"], "🇧🇷": ["BR", "Brazil", "巴西", "圣保罗"], "🇨🇦": ["Canada","CANADA", "Waterloo", "加拿大", "蒙特利尔", "温哥华", "楓葉", "枫叶", "滑铁卢", "多伦多"], "🇨🇭": ["瑞士", "苏黎世", "Switzerland"], "🇩🇪": ["DE", "German", "GERMAN", "德国", "德國", "法兰克福","京德"], "🇩🇰": ["丹麦"], "🇪🇸": ["ES", "西班牙", "Spain"], "🇪🇺": ["EU", "欧盟", "欧罗巴"], "🇫🇮": ["Finland", "芬兰", "赫尔辛基"], "🇫🇷": ["FR", "France", "法国", "法國", "巴黎"], "🇬🇧": ["UK", "GB", "England", "United Kingdom", "英国", "伦敦", "英"], "🇲🇴": ["MO", "Macao", "澳门", "澳", "CTM"], "🇰🇿": ["哈萨克斯坦"], "🇭🇺": ["匈牙利", "Hungary"], "🇭🇰": ["HK", "Hongkong", "Hong Kong", "HongKong", "HONG KONG","香港", "深港", "沪港", "呼港", "HKT", "HKBN", "HGC", "WTT", "CMI", "穗港", "京港", "港"], "🇮🇩": ["Indonesia", "印尼", "印度尼西亚", "雅加达"], "🇮🇪": ["Ireland", "IRELAND", "爱尔兰", "都柏林"], "🇮🇳": ["India", "INDIA","印度", "孟买", "Mumbai"], "🇰🇵": ["KP", "朝鲜"], "🇰🇷": ["KR", "Korea", "KOR", "韩国", "首尔", "韩", "韓"], "🇱🇻": ["Latvia", "Latvija", "拉脱维亚"], "🇲🇽️": ["MEX", "MX", "墨西哥"], "🇲🇾": ["MY", "Malaysia","MALAYSIA", "马来西亚", "吉隆坡"], "🇳🇱": ["NL", "Netherlands", "荷兰", "荷蘭", "尼德蘭", "阿姆斯特丹"], "🇵🇭": ["PH", "Philippines", "菲律宾"], "🇷🇴": ["RO", "罗马尼亚"], "🇷🇺": ["RU", "Russia", "俄罗斯", "俄国", "俄羅斯", "伯力", "莫斯科", "圣彼得堡", "西伯利亚", "新西伯利亚", "京俄", "杭俄"], "🇸🇦": ["沙特", "迪拜"], "🇸🇪": ["SE", "Sweden"], "🇸🇬": ["SG", "Singapore","SINGAPORE", "新加坡", "狮城", "沪新", "京新", "泉新", "穗新", "深新", "杭新", "广新"], "🇹🇭": ["TH", "Thailand", "泰国", "泰國", "曼谷"], "🇹🇷": ["TR", "Turkey", "土耳其", "伊斯坦布尔"], "🇹🇼": ["TW", "Taiwan","TAIWAN", "台湾", "台北", "台中", "新北", "彰化", "CHT", "台", "HINET"], "🇺🇸": ["US", "USA", "America", "United States", "美国", "美", "京美", "波特兰", "达拉斯", "俄勒冈", "凤凰城", "费利蒙", "硅谷", "矽谷", "拉斯维加斯", "洛杉矶", "圣何塞", "圣克拉拉", "西雅图", "芝加哥", "沪美", "哥伦布", "纽约"], "🇻🇳": ["VN", "越南", "胡志明市"], "🇮🇹": ["Italy", "IT", "Nachash", "意大利", "米兰", "義大利"], "🇿🇦": ["South Africa", "南非"], "🇦🇪": ["United Arab Emirates", "阿联酋"], "🇯🇵": ["JP", "Japan","JAPAN", "日", "日本", "东京", "大阪", "埼玉", "沪日", "穗日", "川日", "中日", "泉日", "杭日", "深日", "辽日", "广日"], "🇦🇷": ["AR", "阿根廷"], "🇳🇴": ["Norway", "挪威", "NO"], "🇨🇳": ["CN", "China", "回国", "中国", "江苏", "北京", "上海", "广州", "深圳", "杭州", "徐州", "青岛", "宁波", "镇江", "back"] }
            if (Pemoji == 1) {
                str1 = JSON.stringify(Lmoji)
                aa = JSON.parse(str1)
                var nname = get_emoji(aa, nname)
            } else if (Pemoji == 2) {
                str1 = JSON.stringify(Lmoji)
                bb = JSON.parse(str1.replace(/🇹🇼/g, " 🇭🇰"))
                var nname = get_emoji(bb, nname)
            } else if (Pemoji == -1) {
                nname = emoji_del(oname);
            }
            var nserver = hd + "tag=" + nname.replace(" ️", " ").trim()
            nlist.push(nserver)
        }
    }
    return nlist
}

// 用于过滤非节点部分（比如整份配置中其它内容）
function isSurge(content) {
  if (content.indexOf("=") != -1) {
    cnt = content.split("=")[1].split(",")[0].trim()
    if (cnt == "http" || cnt == "ss" || cnt == "trojan" || cnt == "vmess" || cnt == "custom") {
        return content
    }
  }
}
// 用于参数检查
function paraCheck(content, para) {
  content=content.replace(/ /g,"")
  if (content.indexOf(para+"=") == -1) {
    return "false"
  } else {
      //console.log(para)
    return content.split(para+"=")[1].split(",")[0].trim()
  }
}

// UDP/TFO 参数 (强制 surge/quanx 类型转换)
function XUDP(cnt,pudp) {
    var udp = pudp == 1? "udp-relay=true, " : "udp-relay=false, "
    if(cnt.indexOf("udp-relay") != -1){
        var cnt0 = cnt.replace(RegExp("udp\-relay.*?\,", "gmi"), udp)
    }else{
        var cnt0 = cnt.replace(new RegExp("tag.*?\=", "gmi"), udp+"tag=")
    }
    return cnt0
}

function XTFO(cnt,ptfo) {
    var tfo = ptfo == 1? "fast-open=true, " : "fast-open=false, "
    if(cnt.indexOf("fast-open") != -1){
        var cnt0 = cnt.replace(RegExp("fast\-open.*?\,", "gmi"), tfo)
    }else{
        var cnt0 = cnt.replace(RegExp("tag.*?\=", "gmi"), tfo+"tag=")
    }
    return cnt0
}

//比较完美的一款 base64 encode/decode 工具
/*
 *  base64.js: https://github.com/dankogai/js-base64#readme
 *
 *  Licensed under the BSD 3-Clause License.
 *    http://opensource.org/licenses/BSD-3-Clause
 *
 *  References:
 *    http://en.wikipedia.org/wiki/Base64
 */
//base64 完毕
function Base64Code() {
    // constants
    var b64chars
        = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    var b64tab = function (bin) {
        var t = {};
        for (var i = 0, l = bin.length; i < l; i++) t[bin.charAt(i)] = i;
        return t;
    }(b64chars);
    var fromCharCode = String.fromCharCode;
    // encoder stuff
    var cb_utob = function (c) {
        if (c.length < 2) {
            var cc = c.charCodeAt(0);
            return cc < 0x80 ? c
                : cc < 0x800 ? (fromCharCode(0xc0 | (cc >>> 6))
                    + fromCharCode(0x80 | (cc & 0x3f)))
                    : (fromCharCode(0xe0 | ((cc >>> 12) & 0x0f))
                        + fromCharCode(0x80 | ((cc >>> 6) & 0x3f))
                        + fromCharCode(0x80 | (cc & 0x3f)));
        } else {
            var cc = 0x10000
                + (c.charCodeAt(0) - 0xD800) * 0x400
                + (c.charCodeAt(1) - 0xDC00);
            return (fromCharCode(0xf0 | ((cc >>> 18) & 0x07))
                + fromCharCode(0x80 | ((cc >>> 12) & 0x3f))
                + fromCharCode(0x80 | ((cc >>> 6) & 0x3f))
                + fromCharCode(0x80 | (cc & 0x3f)));
        }
    };
    var re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
    var utob = function (u) {
        return u.replace(re_utob, cb_utob);
    };
    var cb_encode = function (ccc) {
        var padlen = [0, 2, 1][ccc.length % 3],
            ord = ccc.charCodeAt(0) << 16
                | ((ccc.length > 1 ? ccc.charCodeAt(1) : 0) << 8)
                | ((ccc.length > 2 ? ccc.charCodeAt(2) : 0)),
            chars = [
                b64chars.charAt(ord >>> 18),
                b64chars.charAt((ord >>> 12) & 63),
                padlen >= 2 ? '=' : b64chars.charAt((ord >>> 6) & 63),
                padlen >= 1 ? '=' : b64chars.charAt(ord & 63)
            ];
        return chars.join('');
    };
    var btoa = function (b) {
        return b.replace(/[\s\S]{1,3}/g, cb_encode);
    };
    // var _encode = function(u) {
    // 	var isUint8Array = Object.prototype.toString.call(u) === '[object Uint8Array]';
    // 	return isUint8Array ? u.toString('base64')
    // 		: btoa(utob(String(u)));
    // }
    this.encode = function (u) {
        var isUint8Array = Object.prototype.toString.call(u) === '[object Uint8Array]';
        return isUint8Array ? u.toString('base64')
            : btoa(utob(String(u)));
    }
    var uriencode = function (u, urisafe) {
        return !urisafe
            ? _encode(u)
            : _encode(String(u)).replace(/[+\/]/g, function (m0) {
                return m0 == '+' ? '-' : '_';
            }).replace(/=/g, '');
    };
    var encodeURI = function (u) { return uriencode(u, true) };
    // decoder stuff
    var re_btou = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g;
    var cb_btou = function (cccc) {
        switch (cccc.length) {
            case 4:
                var cp = ((0x07 & cccc.charCodeAt(0)) << 18)
                    | ((0x3f & cccc.charCodeAt(1)) << 12)
                    | ((0x3f & cccc.charCodeAt(2)) << 6)
                    | (0x3f & cccc.charCodeAt(3)),
                    offset = cp - 0x10000;
                return (fromCharCode((offset >>> 10) + 0xD800)
                    + fromCharCode((offset & 0x3FF) + 0xDC00));
            case 3:
                return fromCharCode(
                    ((0x0f & cccc.charCodeAt(0)) << 12)
                    | ((0x3f & cccc.charCodeAt(1)) << 6)
                    | (0x3f & cccc.charCodeAt(2))
                );
            default:
                return fromCharCode(
                    ((0x1f & cccc.charCodeAt(0)) << 6)
                    | (0x3f & cccc.charCodeAt(1))
                );
        }
    };
    var btou = function (b) {
        return b.replace(re_btou, cb_btou);
    };
    var cb_decode = function (cccc) {
        var len = cccc.length,
            padlen = len % 4,
            n = (len > 0 ? b64tab[cccc.charAt(0)] << 18 : 0)
                | (len > 1 ? b64tab[cccc.charAt(1)] << 12 : 0)
                | (len > 2 ? b64tab[cccc.charAt(2)] << 6 : 0)
                | (len > 3 ? b64tab[cccc.charAt(3)] : 0),
            chars = [
                fromCharCode(n >>> 16),
                fromCharCode((n >>> 8) & 0xff),
                fromCharCode(n & 0xff)
            ];
        chars.length -= [0, 0, 2, 1][padlen];
        return chars.join('');
    };
    var _atob = function (a) {
        return a.replace(/\S{1,4}/g, cb_decode);
    };
    var atob = function (a) {
        return _atob(String(a).replace(/[^A-Za-z0-9\+\/]/g, ''));
    };
    // var _decode = buffer ?
    // 	buffer.from && Uint8Array && buffer.from !== Uint8Array.from
    // 	? function(a) {
    // 		return (a.constructor === buffer.constructor
    // 				? a : buffer.from(a, 'base64')).toString();
    // 	}
    // 	: function(a) {
    // 		return (a.constructor === buffer.constructor
    // 				? a : new buffer(a, 'base64')).toString();
    // 	}
    // 	: function(a) { return btou(_atob(a)) };
    var _decode = function (u) {
        return btou(_atob(u))
    }
    this.decode = function (a) {
        return _decode(
            String(a).replace(/[-_]/g, function (m0) { return m0 == '-' ? '+' : '/' })
                .replace(/[^A-Za-z0-9\+\/]/g, '')
        ).replace(/&gt;/g, ">").replace(/&lt;/g, "<");
    };
}

/***********************************************************************************************/
function Tools() {
  const filter = (src, ...regex) => {
      const initial = [...Array(src.length).keys()].map(() => false);
      return regex.reduce((a, expr) => OR(a, src.map(item => expr.test(item))), initial)
  }

  const rename = {
      replace: (src, old, now) => {
          return src.map(item => item.replace(old, now));
      },

      delete: (src, ...args) => {
          return src.map(item => args.reduce((now, expr) => now.replace(expr, ''), item));
      },

      trim: (src) => {
          return src.map(item => item.trim().replace(/[^\S\r\n]{2,}/g, ' '));
      }
  }

  const getNodeInfo = servers => {
      const nodes = {
          names: servers.map(s => s.split("tag=")[1]),
          types: servers.map(s => {
              const type = s.match(/^(vmess|trojan|shadowsocks|http)=/);
              return type ? type[1] : 'unknown';
          })
      };
      return nodes;
  }


  return {
      filter, rename, getNodeInfo
  }
}

function AND(...args) {
  return args.reduce((a, b) => a.map((c, i) => b[i] && c));
}

function OR(...args) {
  return args.reduce((a, b) => a.map((c, i) => b[i] || c))
}

function NOT(array) {
  return array.map(c => !c);
}