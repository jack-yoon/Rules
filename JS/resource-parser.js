/** 
☑️ 资源解析器 
----------------------------------------------------------
0️⃣ ⟦原始链接⟧ 后加 "#" 使用, 不同参数用 "&" 连接: 
⚠️ ☞ 𝐡𝐭𝐭𝐩𝐬://𝐦𝐲𝐬𝐮𝐛.𝐜𝐨𝐦#𝙚𝙢𝙤𝙟𝙞=1&𝙩𝙛𝙤=1&𝙞𝙣=香港+台湾
❖ 本地资源片段引用, 请将参数 "#𝗶𝗻=𝘅𝘅𝘅." 填入文件第 ① 行 ❖
❖ 🚦 支持中文, "操作" 以下特殊字符时请先替换 🚦
  ∎ "+"⇒"%2B", 空格⇒"%20", "@"⇒"%40", "&"⇒"%26", "."⇒"\."

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
----------------------------------------------------------
*/


/**
* 使用说明，
0️⃣ 在QuantumultX 配置文件中[general] 部分，加入 
resource_parser_url = https://raw.githubusercontent.com/KOP-XIAO/QuantumultX/master/Scripts/resource-parser.js
⚠️⚠️如提示"没有自定义解析器"，请长按右下角图标后点击左侧刷新按钮，更新资源，后台退出 app，直到出现解析器说明
1️⃣ 假设原始订阅连接为: https://raw.githubusercontent.com/crossutility/Quantumult-X/master/server-complete.txt , 
2️⃣ 假设你想要保留的参数为 in=tls+ss, 想要过滤的参数为 out=http+2, 请注意下面订阅链接后一定要加 ”#“ 符号
3️⃣ 则填入 Quanx 节点引用的的总链接为  https://raw.githubusercontent.com/crossutility/Quantumult-X/master/server-complete.txt#in=tls+ss&out=http+2
4️⃣ 填入上述链接, 并打开的资源解析器开关
------------------------------
*/

var link0 = $resource.link;
var content0 = $resource.content;
const subinfo = $resource.info;
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
var PTls13 = mark0 && para1.indexOf("tls13=") != -1 ? para1.split("tls13=")[1].split("&")[0] : 0;
var Pntf0 = mark0 && para1.indexOf("ntf=") != -1 ? para1.split("ntf=")[1].split("&")[0] : 2;
var Pb64 = mark0 && para1.indexOf("b64=") != -1 ? para1.split("b64=")[1].split("&")[0] : 0;
var emojino = [" 0️⃣ ", " 1⃣️ ", " 2⃣️ ", " 3⃣️ ", " 4⃣️ ", " 5⃣️ ", " 6⃣️ ", " 7⃣️ ", " 8⃣️ ", " 9⃣️ ", " 🔟 "]
var pfi = Pin0 ? "in=" + Pin0.join(", ") + ",  " : ""
var pfo = Pout0 ? "out=" + Pout0.join(", ") : ""
var pfihn = Phin0 ? "inhn=" + Phin0.join(", ") + ",  " : ""
var pfohn = Phout0 ? "outhn=" + Phout0.join(", ") : ""
var Pcnt =  para1.indexOf("cnt=") != -1 ? para1.split("cnt=")[1].split("&")[0] : 0;
var flow = "";
var exptime = "";

var typeU = para1.indexOf("type=") != -1 ? para1.split("type=")[1].split("&")[0] : "";
var type0 = Type_Check(content0); //  类型判断
//$notify(type0,"hh",content0)

//flag=1,2,3分别为 server、rewrite、rule 类型
const errornode=""
var flag = 1

try {
  ResourceParse();
} catch (err) {
    $notify("❌ 解析出现错误", "", err);
}

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
        var Prn = Prrname;
        total = total.map(Rename);
    }
    if (Pemoji) { total = emoji_handle(total, Pemoji); }
    if (Prname) {
        var Prn = Prname;
        total = total.map(Rename);
    }
    if (Pregdel) {
        var delreg = Pregdel
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
      $done({ content: total });
    } else {
      $notify("❓❓ 友情提示", "⚠️⚠️ 解析后无有效内容", "🚥🚥 请自行检查相关参数, 或者点击通知跳转反馈", bug_link)
      $done({ content: errornode })
    }
} else if (flag == 0){
  $done({ content: errornode })
} else if (flag == -1){
  $done({ content: content0 })
} else { $done({ content: total });}

/**
# 以下为具体的 function

*/

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
    total = Rewrite_Filter(content0.split("\n"), Pin0, Pout0);
    if (Preplace) { total = ReplaceReg(total, Preplace) }
    total = total.join("\n")
  } else if (type0 == "Rule") {  // rule 类型, 已处理完毕
    flag = 3;
    total = Rule_Handle(content0.split("\n"), Pout0, Pin0).filter(Boolean);
    if (Preg && total.length!=0) { // 正则筛选规则 filter
    total = total.map(Regex).filter(Boolean).join("\n") 
    if (Preplace) { total = ReplaceReg(total, Preplace) }
    RegCheck(total, "分流引用", Preg)} 
    total = total.join("\n")
  } else if (content0.trim() == "") {
    $notify("‼️ 引用" + "⟦" + subtag + "⟧" + " 返回內容为空", "⁉️ 点通知跳转以确认链接是否失效", para.split("#")[0], nan_link);
    flag = 0;
  } else if (type0 == "unknown") {
    $notify("😭 未能解析, 可能是 bug ⁉️  " + "⟦" + subtag + "⟧", "👻 本解析器 暂未支持/未能识别 该订阅格式", "⚠️ 将直接导入Quantumult X \n 如认为是 BUG, 请点通知跳转反馈", bug_link);
    flag = -1;
  } else { flag = 0 }
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
    var SubK = ["dm1lc3M", "c3NyOi8v", "CnNzOi8", "dHJvamFu", "c3M6Ly", "c3NkOi8v", "c2hhZG93"];
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
    }  else if (ClashK.some(NodeCheck)){ // Clash 类型节点转换
      type = "Clash";
      content0 = Clash2QX(subs)
    } else if ( (ModuleK.some(RewriteCheck) || para1.indexOf("dst=rewrite") != -1) && (para1.indexOf("dst=filter") == -1) && subs.indexOf("[Proxy]") == -1) { // Surge 类型 module /rule-set(含url-regex) 类型
      type = "sgmodule"
    } else if ((subi.indexOf("hostname=") != -1 || RewriteK.some(RewriteCheck)) && subs.indexOf("[Proxy]") == -1 && subs.indexOf("[server_local]") == -1 && subs.indexOf("\nhttp-r") == -1 && para1.indexOf("dst=filter")==-1) {
      type = "rewrite" //Quantumult X 类型 rewrite
    } else if (RuleK.some(RuleCheck) && subs.indexOf(html) == -1 && subs.indexOf("[Proxy]") == -1 && subs.indexOf("[server_local]") == -1) {
      type = "Rule";
    } else if ((DomainK.some(RuleCheck) || typeU == "domain-set") && subs.indexOf("[Proxy]") == -1 ) {
      type = "Rule";
      content0 = Domain2Rule(content0) // 转换 domain-set
    } else if (subsn.length >= 1 && SubK2.some(NodeCheck) && subs.indexOf("[Proxy]") == -1 && subs.indexOf("[filter_local]") == -1) { //未b64加密的多行URI 组合订阅
      type = "Subs"
    } else if (SubK.some(NodeCheck)) {  //b64加密的订阅类型
      type = "Subs-B64Encode"
    } else if (subi.indexOf("tag=") != -1 && QuanXK.some(NodeCheck) && subs.indexOf("[Proxy]") == -1 && subs.indexOf("[filter_local]") == -1) {
      type = "Subs" // QuanX list
    } else if (subs.indexOf("[Proxy]") != -1) {
      type = "Surge"; // Surge Profiles
    } else if (SurgeK.some(NodeCheck)  && subs.indexOf("[Proxy]") == -1 && subs.indexOf("[filter_local]") == -1) {
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
            var Lmoji = { "🏳️‍🌈": ["流量", "时间", "应急", "过期", "Bandwidth", "expire"], "🇦🇹": ["奥地利", "Austria", "维也纳"], "🇦🇺": ["AU", "Australia", "Sydney", "澳大利亚", "澳洲", "墨尔本", "悉尼"], "🇧🇪": ["BE", "比利时"], "🇧🇬": ["保加利亚", "Bulgaria"], "🇧🇷": ["BR", "Brazil", "巴西", "圣保罗"], "🇨🇦": ["Canada", "Waterloo", "加拿大", "蒙特利尔", "温哥华", "楓葉", "枫叶", "滑铁卢", "多伦多"], "🇨🇭": ["瑞士", "苏黎世", "Switzerland"], "🇩🇪": ["DE", "German", "GERMAN", "德国", "德國", "法兰克福"], "🇩🇰": ["丹麦"], "🇪🇸": ["ES", "西班牙", "Spain"], "🇪🇺": ["EU", "欧盟", "欧罗巴"], "🇫🇮": ["Finland", "芬兰", "赫尔辛基"], "🇫🇷": ["FR", "France", "法国", "法國", "巴黎"], "🇬🇧": ["UK", "GB", "England", "United Kingdom", "英国", "伦敦", "英"], "🇲🇴": ["MO", "Macao", "澳门", "澳", "CTM"], "🇰🇿": ["哈萨克斯坦"], "🇭🇺": ["匈牙利", "Hungary"], "🇭🇰": ["HK", "Hongkong", "Hong Kong", "HongKong", "香港", "深港", "沪港", "呼港", "HKT", "HKBN", "HGC", "WTT", "CMI", "穗港", "京港", "港"], "🇮🇩": ["Indonesia", "印尼", "印度尼西亚", "雅加达"], "🇮🇪": ["Ireland", "爱尔兰", "都柏林"], "🇮🇳": ["India", "印度", "孟买", "Mumbai"], "🇰🇵": ["KP", "朝鲜"], "🇰🇷": ["KR", "Korea", "KOR", "韩国", "首尔", "韩", "韓"], "🇱🇻": ["Latvia", "Latvija", "拉脱维亚"], "🇲🇽️": ["MEX", "MX", "墨西哥"], "🇲🇾": ["MY", "Malaysia", "马来西亚", "吉隆坡"], "🇳🇱": ["NL", "Netherlands", "荷兰", "荷蘭", "尼德蘭", "阿姆斯特丹"], "🇵🇭": ["PH", "Philippines", "菲律宾"], "🇷🇴": ["RO", "罗马尼亚"], "🇷🇺": ["RU", "Russia", "俄罗斯", "俄国", "俄羅斯", "伯力", "莫斯科", "圣彼得堡", "西伯利亚", "新西伯利亚", "京俄", "杭俄"], "🇸🇦": ["沙特", "迪拜"], "🇸🇪": ["SE", "Sweden"], "🇸🇬": ["SG", "Singapore", "新加坡", "狮城", "沪新", "京新", "泉新", "穗新", "深新", "杭新", "广新"], "🇹🇭": ["TH", "Thailand", "泰国", "泰國", "曼谷"], "🇹🇷": ["TR", "Turkey", "土耳其", "伊斯坦布尔"], "🇹🇼": ["TW", "Taiwan", "台湾", "台北", "台中", "新北", "彰化", "CHT", "台", "HINET"], "🇺🇸": ["US", "USA", "America", "United States", "美国", "美", "京美", "波特兰", "达拉斯", "俄勒冈", "凤凰城", "费利蒙", "硅谷", "矽谷", "拉斯维加斯", "洛杉矶", "圣何塞", "圣克拉拉", "西雅图", "芝加哥", "沪美", "哥伦布", "纽约"], "🇻🇳": ["VN", "越南", "胡志明市"], "🇮🇹": ["Italy", "IT", "Nachash", "意大利", "米兰", "義大利"], "🇿🇦": ["South Africa", "南非"], "🇦🇪": ["United Arab Emirates", "阿联酋"], "🇯🇵": ["JP", "Japan", "日", "日本", "东京", "大阪", "埼玉", "沪日", "穗日", "川日", "中日", "泉日", "杭日", "深日", "辽日", "广日"], "🇦🇷": ["AR", "阿根廷"], "🇳🇴": ["Norway", "挪威", "NO"], "🇨🇳": ["CN", "China", "回国", "中国", "江苏", "北京", "上海", "广州", "深圳", "杭州", "徐州", "青岛", "宁波", "镇江", "back"] }
            if (Pemoji == 1) {
                str1 = JSON.stringify(Lmoji)
                aa = JSON.parse(str1)
                var nname = get_emoji(aa, nname)
            } else if (Pemoji == 2) {
                str1 = JSON.stringify(Lmoji)
                bb = JSON.parse(str1.replace(/🇹🇼/g, " 🇨🇳"))
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

