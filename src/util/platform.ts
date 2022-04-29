const u = navigator.userAgent;
const app = navigator.appVersion;
const trident = u.indexOf("Trident") > -1; //IE内核
const presto = u.indexOf("Presto") > -1; //opera内核
const webKit = u.indexOf("AppleWebKit") > -1; //苹果、谷歌内核
const gecko = u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1; //火狐内核
const mobile = !!u.match(/AppleWebKit.*Mobile.*/); //是否为移动终端
const ios = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
const android = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
const iPhone = u.indexOf("iPhone") > -1; //是否为iPhone或者QQHD浏览器
const iPad = u.indexOf("iPad") > -1; //是否iPad
const webApp = u.indexOf("Safari") == -1; //是否web应该程序，没有头部与底部
const weixin = u.indexOf("MicroMessenger") > -1; //是否微信
const qq = u.match(/\sQQ/i); //是否QQ
const language = navigator.language.toLowerCase();

export {
  app,
  trident,
  presto,
  webKit,
  gecko,
  mobile,
  ios,
  android,
  iPhone,
  iPad,
  webApp,
  weixin,
  qq,
  language,
};
