/*
README：https://github.com/yichahucha/surge/tree/master
 */

const launchAdUrl1 = "/interface/sdk/sdkad.php";
const launchAdUrl2 = "/wbapplua/wbpullad.lua";
const launchAdUrl3 = "v1/ad/preload";

function modifyMain(url, data) {
	if(url.indexOf(launchAdUrl1) > -1) {
		let temp = data.match(/\{.*\}/);
		if(!temp) 
			return data;
		data = JSON.parse(temp);
		if (data.ads) data.ads = [];
		if (data.background_delay_display_time) 
			data.background_delay_display_time = 60 * 60 * 24 * 1000;
		if (data.show_push_splash_ad) 
			data.show_push_splash_ad = false;
		return JSON.stringify(data) + 'OK';
	}
	if(url.indexOf(launchAdUrl2) > -1) {
		data = JSON.parse(data);
		if (data.cached_ad && data.cached_ad.ads) {
			data.cached_ad.ads = [];
		}
		return JSON.stringify(data);
	}
	if(url.indexOf(launchAdUrl3) > -1) {
		let temp = data.match(/\{.*\}/);
		if(!temp) 
			return data;
		data = JSON.parse(temp);
		if (!data.ads)
        	return data;
		for (let t of(data.last_ad_show_interval = 86400, data.ads)){
			t.start_time = 2681574400; 
			t.end_time = 2681660799;
			t.display_duration = 0;
			t.daily_display_cnt = 0; 
			t.total_display_cnt = 0;
		}
		return JSON.stringify(data);
	}
	return data;
}

var body = $response.body;
var url = $request.url;
body = modifyMain(url, body);

$done({ body });
