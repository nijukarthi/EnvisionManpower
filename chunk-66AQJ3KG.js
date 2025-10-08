import{$ as Mn,$a as W,Ab as xi,Ac as Zt,B as Ro,Bb as pt,Cb as ht,Db as ft,Dc as F,E as Lo,Eb as gt,Ec as Oi,Fb as Rn,Gb as Ko,Hb as he,Hc as xt,Ib as q,Ic as er,J as Po,Jb as fe,Jc as tr,Lb as V,Lc as _,Mb as Ge,Mc as Ke,Nb as We,Ob as ce,P as Vo,Pb as qo,Qa as O,Qb as se,Ra as Uo,Rb as ae,S as j,Sa as Et,Sb as Ii,T as In,Tb as Yo,U as ie,Ua as ze,V as v,Va as D,Vb as Zo,W as L,Wb as mt,Xa as Yt,Xb as Xo,Y as U,Yb as k,Z as oe,Zb as At,_ as f,_b as Ft,a as S,ab as P,b as de,ba as Bo,bb as w,ca as $o,cb as kn,d as xn,da as Dt,db as C,ea as Ct,eb as Ho,fa as Se,fb as J,g as wi,gc as x,ha as On,hb as Q,ia as re,ib as Nn,ic as Tt,j as pe,ja as Ai,jc as Ln,lb as Fi,ma as X,mb as zo,n as ko,o as Si,pa as jo,pb as K,qa as Ee,qb as wt,ra as y,rb as St,s as dt,ta as Ae,tb as Go,ub as Wo,uc as Qo,vb as M,wb as Fe,wc as Mi,xa as _t,xb as Te,xc as Jo,y as No,yb as xe,yc as Ie,zb as Ti,zc as ee}from"./chunk-VXTH6N44.js";var or=null;function bt(){return or}function rl(t){or??=t}var ki=class{},Xt=(()=>{class t{historyGo(e){throw new Error("")}static \u0275fac=function(i){return new(i||t)};static \u0275prov=v({token:t,factory:()=>f(rr),providedIn:"platform"})}return t})(),sl=new U(""),rr=(()=>{class t extends Xt{_location;_history;_doc=f(re);constructor(){super(),this._location=window.location,this._history=window.history}getBaseHrefFromDOM(){return bt().getBaseHref(this._doc)}onPopState(e){let i=bt().getGlobalEventTarget(this._doc,"window");return i.addEventListener("popstate",e,!1),()=>i.removeEventListener("popstate",e)}onHashChange(e){let i=bt().getGlobalEventTarget(this._doc,"window");return i.addEventListener("hashchange",e,!1),()=>i.removeEventListener("hashchange",e)}get href(){return this._location.href}get protocol(){return this._location.protocol}get hostname(){return this._location.hostname}get port(){return this._location.port}get pathname(){return this._location.pathname}get search(){return this._location.search}get hash(){return this._location.hash}set pathname(e){this._location.pathname=e}pushState(e,i,o){this._history.pushState(e,i,o)}replaceState(e,i,o){this._history.replaceState(e,i,o)}forward(){this._history.forward()}back(){this._history.back()}historyGo(e=0){this._history.go(e)}getState(){return this._history.state}static \u0275fac=function(i){return new(i||t)};static \u0275prov=v({token:t,factory:()=>new t,providedIn:"platform"})}return t})();function Pn(t,n){return t?n?t.endsWith("/")?n.startsWith("/")?t+n.slice(1):t+n:n.startsWith("/")?t+n:`${t}/${n}`:t:n}function nr(t){let n=t.search(/#|\?|$/);return t[n-1]==="/"?t.slice(0,n-1)+t.slice(n):t}function Me(t){return t&&t[0]!=="?"?`?${t}`:t}var It=(()=>{class t{historyGo(e){throw new Error("")}static \u0275fac=function(i){return new(i||t)};static \u0275prov=v({token:t,factory:()=>f(sr),providedIn:"root"})}return t})(),Vn=new U(""),sr=(()=>{class t extends It{_platformLocation;_baseHref;_removeListenerFns=[];constructor(e,i){super(),this._platformLocation=e,this._baseHref=i??this._platformLocation.getBaseHrefFromDOM()??f(re).location?.origin??""}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(e){this._removeListenerFns.push(this._platformLocation.onPopState(e),this._platformLocation.onHashChange(e))}getBaseHref(){return this._baseHref}prepareExternalUrl(e){return Pn(this._baseHref,e)}path(e=!1){let i=this._platformLocation.pathname+Me(this._platformLocation.search),o=this._platformLocation.hash;return o&&e?`${i}${o}`:i}pushState(e,i,o,r){let s=this.prepareExternalUrl(o+Me(r));this._platformLocation.pushState(e,i,s)}replaceState(e,i,o,r){let s=this.prepareExternalUrl(o+Me(r));this._platformLocation.replaceState(e,i,s)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(e=0){this._platformLocation.historyGo?.(e)}static \u0275fac=function(i){return new(i||t)(oe(Xt),oe(Vn,8))};static \u0275prov=v({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),ar=(()=>{class t{_subject=new pe;_basePath;_locationStrategy;_urlChangeListeners=[];_urlChangeSubscription=null;constructor(e){this._locationStrategy=e;let i=this._locationStrategy.getBaseHref();this._basePath=ul(nr(ir(i))),this._locationStrategy.onPopState(o=>{this._subject.next({url:this.path(!0),pop:!0,state:o.state,type:o.type})})}ngOnDestroy(){this._urlChangeSubscription?.unsubscribe(),this._urlChangeListeners=[]}path(e=!1){return this.normalize(this._locationStrategy.path(e))}getState(){return this._locationStrategy.getState()}isCurrentPathEqualTo(e,i=""){return this.path()==this.normalize(e+Me(i))}normalize(e){return t.stripTrailingSlash(ll(this._basePath,ir(e)))}prepareExternalUrl(e){return e&&e[0]!=="/"&&(e="/"+e),this._locationStrategy.prepareExternalUrl(e)}go(e,i="",o=null){this._locationStrategy.pushState(o,"",e,i),this._notifyUrlChangeListeners(this.prepareExternalUrl(e+Me(i)),o)}replaceState(e,i="",o=null){this._locationStrategy.replaceState(o,"",e,i),this._notifyUrlChangeListeners(this.prepareExternalUrl(e+Me(i)),o)}forward(){this._locationStrategy.forward()}back(){this._locationStrategy.back()}historyGo(e=0){this._locationStrategy.historyGo?.(e)}onUrlChange(e){return this._urlChangeListeners.push(e),this._urlChangeSubscription??=this.subscribe(i=>{this._notifyUrlChangeListeners(i.url,i.state)}),()=>{let i=this._urlChangeListeners.indexOf(e);this._urlChangeListeners.splice(i,1),this._urlChangeListeners.length===0&&(this._urlChangeSubscription?.unsubscribe(),this._urlChangeSubscription=null)}}_notifyUrlChangeListeners(e="",i){this._urlChangeListeners.forEach(o=>o(e,i))}subscribe(e,i,o){return this._subject.subscribe({next:e,error:i??void 0,complete:o??void 0})}static normalizeQueryParams=Me;static joinWithSlash=Pn;static stripTrailingSlash=nr;static \u0275fac=function(i){return new(i||t)(oe(It))};static \u0275prov=v({token:t,factory:()=>al(),providedIn:"root"})}return t})();function al(){return new ar(oe(It))}function ll(t,n){if(!t||!n.startsWith(t))return n;let e=n.substring(t.length);return e===""||["/",";","?","#"].includes(e[0])?e:n}function ir(t){return t.replace(/\/index.html$/,"")}function ul(t){if(new RegExp("^(https?:)?//").test(t)){let[,e]=t.split(/\/\/[^\/]+/);return e}return t}var cl=(()=>{class t extends It{_platformLocation;_baseHref="";_removeListenerFns=[];constructor(e,i){super(),this._platformLocation=e,i!=null&&(this._baseHref=i)}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(e){this._removeListenerFns.push(this._platformLocation.onPopState(e),this._platformLocation.onHashChange(e))}getBaseHref(){return this._baseHref}path(e=!1){let i=this._platformLocation.hash??"#";return i.length>0?i.substring(1):i}prepareExternalUrl(e){let i=Pn(this._baseHref,e);return i.length>0?"#"+i:i}pushState(e,i,o,r){let s=this.prepareExternalUrl(o+Me(r))||this._platformLocation.pathname;this._platformLocation.pushState(e,i,s)}replaceState(e,i,o,r){let s=this.prepareExternalUrl(o+Me(r))||this._platformLocation.pathname;this._platformLocation.replaceState(e,i,s)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(e=0){this._platformLocation.historyGo?.(e)}static \u0275fac=function(i){return new(i||t)(oe(Xt),oe(Vn,8))};static \u0275prov=v({token:t,factory:t.\u0275fac})}return t})(),fr={ADP:[void 0,void 0,0],AFN:[void 0,"\u060B",0],ALL:[void 0,void 0,0],AMD:[void 0,"\u058F",2],AOA:[void 0,"Kz"],ARS:[void 0,"$"],AUD:["A$","$"],AZN:[void 0,"\u20BC"],BAM:[void 0,"KM"],BBD:[void 0,"$"],BDT:[void 0,"\u09F3"],BHD:[void 0,void 0,3],BIF:[void 0,void 0,0],BMD:[void 0,"$"],BND:[void 0,"$"],BOB:[void 0,"Bs"],BRL:["R$"],BSD:[void 0,"$"],BWP:[void 0,"P"],BYN:[void 0,void 0,2],BYR:[void 0,void 0,0],BZD:[void 0,"$"],CAD:["CA$","$",2],CHF:[void 0,void 0,2],CLF:[void 0,void 0,4],CLP:[void 0,"$",0],CNY:["CN\xA5","\xA5"],COP:[void 0,"$",2],CRC:[void 0,"\u20A1",2],CUC:[void 0,"$"],CUP:[void 0,"$"],CZK:[void 0,"K\u010D",2],DJF:[void 0,void 0,0],DKK:[void 0,"kr",2],DOP:[void 0,"$"],EGP:[void 0,"E\xA3"],ESP:[void 0,"\u20A7",0],EUR:["\u20AC"],FJD:[void 0,"$"],FKP:[void 0,"\xA3"],GBP:["\xA3"],GEL:[void 0,"\u20BE"],GHS:[void 0,"GH\u20B5"],GIP:[void 0,"\xA3"],GNF:[void 0,"FG",0],GTQ:[void 0,"Q"],GYD:[void 0,"$",2],HKD:["HK$","$"],HNL:[void 0,"L"],HRK:[void 0,"kn"],HUF:[void 0,"Ft",2],IDR:[void 0,"Rp",2],ILS:["\u20AA"],INR:["\u20B9"],IQD:[void 0,void 0,0],IRR:[void 0,void 0,0],ISK:[void 0,"kr",0],ITL:[void 0,void 0,0],JMD:[void 0,"$"],JOD:[void 0,void 0,3],JPY:["\xA5",void 0,0],KHR:[void 0,"\u17DB"],KMF:[void 0,"CF",0],KPW:[void 0,"\u20A9",0],KRW:["\u20A9",void 0,0],KWD:[void 0,void 0,3],KYD:[void 0,"$"],KZT:[void 0,"\u20B8"],LAK:[void 0,"\u20AD",0],LBP:[void 0,"L\xA3",0],LKR:[void 0,"Rs"],LRD:[void 0,"$"],LTL:[void 0,"Lt"],LUF:[void 0,void 0,0],LVL:[void 0,"Ls"],LYD:[void 0,void 0,3],MGA:[void 0,"Ar",0],MGF:[void 0,void 0,0],MMK:[void 0,"K",0],MNT:[void 0,"\u20AE",2],MRO:[void 0,void 0,0],MUR:[void 0,"Rs",2],MXN:["MX$","$"],MYR:[void 0,"RM"],NAD:[void 0,"$"],NGN:[void 0,"\u20A6"],NIO:[void 0,"C$"],NOK:[void 0,"kr",2],NPR:[void 0,"Rs"],NZD:["NZ$","$"],OMR:[void 0,void 0,3],PHP:["\u20B1"],PKR:[void 0,"Rs",2],PLN:[void 0,"z\u0142"],PYG:[void 0,"\u20B2",0],RON:[void 0,"lei"],RSD:[void 0,void 0,0],RUB:[void 0,"\u20BD"],RWF:[void 0,"RF",0],SBD:[void 0,"$"],SEK:[void 0,"kr",2],SGD:[void 0,"$"],SHP:[void 0,"\xA3"],SLE:[void 0,void 0,2],SLL:[void 0,void 0,0],SOS:[void 0,void 0,0],SRD:[void 0,"$"],SSP:[void 0,"\xA3"],STD:[void 0,void 0,0],STN:[void 0,"Db"],SYP:[void 0,"\xA3",0],THB:[void 0,"\u0E3F"],TMM:[void 0,void 0,0],TND:[void 0,void 0,3],TOP:[void 0,"T$"],TRL:[void 0,void 0,0],TRY:[void 0,"\u20BA"],TTD:[void 0,"$"],TWD:["NT$","$",2],TZS:[void 0,void 0,2],UAH:[void 0,"\u20B4"],UGX:[void 0,void 0,0],USD:["$"],UYI:[void 0,void 0,0],UYU:[void 0,"$"],UYW:[void 0,void 0,4],UZS:[void 0,void 0,2],VEF:[void 0,"Bs",2],VND:["\u20AB",void 0,0],VUV:[void 0,void 0,0],XAF:["FCFA",void 0,0],XCD:["EC$","$"],XOF:["F\u202FCFA",void 0,0],XPF:["CFPF",void 0,0],XXX:["\xA4"],YER:[void 0,void 0,0],ZAR:[void 0,"R"],ZMK:[void 0,void 0,0],ZMW:[void 0,"ZK"],ZWD:[void 0,void 0,0]},ji=function(t){return t[t.Decimal=0]="Decimal",t[t.Percent=1]="Percent",t[t.Currency=2]="Currency",t[t.Scientific=3]="Scientific",t}(ji||{});var le=function(t){return t[t.Format=0]="Format",t[t.Standalone=1]="Standalone",t}(le||{}),N=function(t){return t[t.Narrow=0]="Narrow",t[t.Abbreviated=1]="Abbreviated",t[t.Wide=2]="Wide",t[t.Short=3]="Short",t}(N||{}),ge=function(t){return t[t.Short=0]="Short",t[t.Medium=1]="Medium",t[t.Long=2]="Long",t[t.Full=3]="Full",t}(ge||{}),me={Decimal:0,Group:1,List:2,PercentSign:3,PlusSign:4,MinusSign:5,Exponential:6,SuperscriptingExponent:7,PerMille:8,Infinity:9,NaN:10,TimeSeparator:11,CurrencyDecimal:12,CurrencyGroup:13};function gr(t){return he(t)[q.LocaleId]}function mr(t,n,e){let i=he(t),o=[i[q.DayPeriodsFormat],i[q.DayPeriodsStandalone]],r=we(o,n);return we(r,e)}function br(t,n,e){let i=he(t),o=[i[q.DaysFormat],i[q.DaysStandalone]],r=we(o,n);return we(r,e)}function yr(t,n,e){let i=he(t),o=[i[q.MonthsFormat],i[q.MonthsStandalone]],r=we(o,n);return we(r,e)}function vr(t,n){let i=he(t)[q.Eras];return we(i,n)}function Qt(t,n){let e=he(t);return we(e[q.DateFormat],n)}function Jt(t,n){let e=he(t);return we(e[q.TimeFormat],n)}function en(t,n){let i=he(t)[q.DateTimeFormat];return we(i,n)}function Ve(t,n){let e=he(t),i=e[q.NumberSymbols][n];if(typeof i>"u"){if(n===me.CurrencyDecimal)return e[q.NumberSymbols][me.Decimal];if(n===me.CurrencyGroup)return e[q.NumberSymbols][me.Group]}return i}function Dr(t,n){return he(t)[q.NumberFormats][n]}function dl(t){return he(t)[q.Currencies]}function Cr(t){if(!t[q.ExtraData])throw new j(2303,!1)}function _r(t){let n=he(t);return Cr(n),(n[q.ExtraData][2]||[]).map(i=>typeof i=="string"?Ni(i):[Ni(i[0]),Ni(i[1])])}function Er(t,n,e){let i=he(t);Cr(i);let o=[i[q.ExtraData][0],i[q.ExtraData][1]],r=we(o,n)||[];return we(r,e)||[]}function we(t,n){for(let e=n;e>-1;e--)if(typeof t[e]<"u")return t[e];throw new j(2304,!1)}function Ni(t){let[n,e]=t.split(":");return{hours:+n,minutes:+e}}function wr(t,n,e="en"){let i=dl(e)[t]||fr[t]||[],o=i[1];return n==="narrow"&&typeof o=="string"?o:i[0]||t}var pl=2;function Sr(t){let n,e=fr[t];return e&&(n=e[2]),typeof n=="number"?n:pl}var hl=/^(\d{4,})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/,Bn={},fl=/((?:[^BEGHLMOSWYZabcdhmswyz']+)|(?:'(?:[^']|'')*')|(?:G{1,5}|y{1,4}|Y{1,4}|M{1,5}|L{1,5}|w{1,2}|W{1}|d{1,2}|E{1,6}|c{1,6}|a{1,5}|b{1,5}|B{1,5}|h{1,2}|H{1,2}|m{1,2}|s{1,2}|S{1,3}|z{1,4}|Z{1,5}|O{1,4}))([\s\S]*)/;function Ar(t,n,e,i){let o=El(t);n=qe(e,n)||n;let s=[],a;for(;n;)if(a=fl.exec(n),a){s=s.concat(a.slice(1));let c=s.pop();if(!c)break;n=c}else{s.push(n);break}let l=o.getTimezoneOffset();i&&(l=Tr(i,l),o=_l(o,i));let u="";return s.forEach(c=>{let d=Dl(c);u+=d?d(o,e,l):c==="''"?"'":c.replace(/(^'|'$)/g,"").replace(/''/g,"'")}),u}function zn(t,n,e){let i=new Date(0);return i.setFullYear(t,n,e),i.setHours(0,0,0),i}function qe(t,n){let e=gr(t);if(Bn[e]??={},Bn[e][n])return Bn[e][n];let i="";switch(n){case"shortDate":i=Qt(t,ge.Short);break;case"mediumDate":i=Qt(t,ge.Medium);break;case"longDate":i=Qt(t,ge.Long);break;case"fullDate":i=Qt(t,ge.Full);break;case"shortTime":i=Jt(t,ge.Short);break;case"mediumTime":i=Jt(t,ge.Medium);break;case"longTime":i=Jt(t,ge.Long);break;case"fullTime":i=Jt(t,ge.Full);break;case"short":let o=qe(t,"shortTime"),r=qe(t,"shortDate");i=$n(en(t,ge.Short),[o,r]);break;case"medium":let s=qe(t,"mediumTime"),a=qe(t,"mediumDate");i=$n(en(t,ge.Medium),[s,a]);break;case"long":let l=qe(t,"longTime"),u=qe(t,"longDate");i=$n(en(t,ge.Long),[l,u]);break;case"full":let c=qe(t,"fullTime"),d=qe(t,"fullDate");i=$n(en(t,ge.Full),[c,d]);break}return i&&(Bn[e][n]=i),i}function $n(t,n){return n&&(t=t.replace(/\{([^}]+)}/g,function(e,i){return n!=null&&i in n?n[i]:e})),t}function Oe(t,n,e="-",i,o){let r="";(t<0||o&&t<=0)&&(o?t=-t+1:(t=-t,r=e));let s=String(t);for(;s.length<n;)s="0"+s;return i&&(s=s.slice(s.length-n)),r+s}function gl(t,n){return Oe(t,3).substring(0,n)}function Y(t,n,e=0,i=!1,o=!1){return function(r,s){let a=ml(t,r);if((e>0||a>-e)&&(a+=e),t===3)a===0&&e===-12&&(a=12);else if(t===6)return gl(a,n);let l=Ve(s,me.MinusSign);return Oe(a,n,l,i,o)}}function ml(t,n){switch(t){case 0:return n.getFullYear();case 1:return n.getMonth();case 2:return n.getDate();case 3:return n.getHours();case 4:return n.getMinutes();case 5:return n.getSeconds();case 6:return n.getMilliseconds();case 7:return n.getDay();default:throw new j(2301,!1)}}function $(t,n,e=le.Format,i=!1){return function(o,r){return bl(o,r,t,n,e,i)}}function bl(t,n,e,i,o,r){switch(e){case 2:return yr(n,o,i)[t.getMonth()];case 1:return br(n,o,i)[t.getDay()];case 0:let s=t.getHours(),a=t.getMinutes();if(r){let u=_r(n),c=Er(n,o,i),d=u.findIndex(h=>{if(Array.isArray(h)){let[p,m]=h,E=s>=p.hours&&a>=p.minutes,g=s<m.hours||s===m.hours&&a<m.minutes;if(p.hours<m.hours){if(E&&g)return!0}else if(E||g)return!0}else if(h.hours===s&&h.minutes===a)return!0;return!1});if(d!==-1)return c[d]}return mr(n,o,i)[s<12?0:1];case 3:return vr(n,i)[t.getFullYear()<=0?0:1];default:let l=e;throw new j(2302,!1)}}function jn(t){return function(n,e,i){let o=-1*i,r=Ve(e,me.MinusSign),s=o>0?Math.floor(o/60):Math.ceil(o/60);switch(t){case 0:return(o>=0?"+":"")+Oe(s,2,r)+Oe(Math.abs(o%60),2,r);case 1:return"GMT"+(o>=0?"+":"")+Oe(s,1,r);case 2:return"GMT"+(o>=0?"+":"")+Oe(s,2,r)+":"+Oe(Math.abs(o%60),2,r);case 3:return i===0?"Z":(o>=0?"+":"")+Oe(s,2,r)+":"+Oe(Math.abs(o%60),2,r);default:throw new j(2302,!1)}}}var yl=0,Hn=4;function vl(t){let n=zn(t,yl,1).getDay();return zn(t,0,1+(n<=Hn?Hn:Hn+7)-n)}function Fr(t){let n=t.getDay(),e=n===0?-3:Hn-n;return zn(t.getFullYear(),t.getMonth(),t.getDate()+e)}function Ri(t,n=!1){return function(e,i){let o;if(n){let r=new Date(e.getFullYear(),e.getMonth(),1).getDay()-1,s=e.getDate();o=1+Math.floor((s+r)/7)}else{let r=Fr(e),s=vl(r.getFullYear()),a=r.getTime()-s.getTime();o=1+Math.round(a/6048e5)}return Oe(o,t,Ve(i,me.MinusSign))}}function Un(t,n=!1){return function(e,i){let r=Fr(e).getFullYear();return Oe(r,t,Ve(i,me.MinusSign),n)}}var Li={};function Dl(t){if(Li[t])return Li[t];let n;switch(t){case"G":case"GG":case"GGG":n=$(3,N.Abbreviated);break;case"GGGG":n=$(3,N.Wide);break;case"GGGGG":n=$(3,N.Narrow);break;case"y":n=Y(0,1,0,!1,!0);break;case"yy":n=Y(0,2,0,!0,!0);break;case"yyy":n=Y(0,3,0,!1,!0);break;case"yyyy":n=Y(0,4,0,!1,!0);break;case"Y":n=Un(1);break;case"YY":n=Un(2,!0);break;case"YYY":n=Un(3);break;case"YYYY":n=Un(4);break;case"M":case"L":n=Y(1,1,1);break;case"MM":case"LL":n=Y(1,2,1);break;case"MMM":n=$(2,N.Abbreviated);break;case"MMMM":n=$(2,N.Wide);break;case"MMMMM":n=$(2,N.Narrow);break;case"LLL":n=$(2,N.Abbreviated,le.Standalone);break;case"LLLL":n=$(2,N.Wide,le.Standalone);break;case"LLLLL":n=$(2,N.Narrow,le.Standalone);break;case"w":n=Ri(1);break;case"ww":n=Ri(2);break;case"W":n=Ri(1,!0);break;case"d":n=Y(2,1);break;case"dd":n=Y(2,2);break;case"c":case"cc":n=Y(7,1);break;case"ccc":n=$(1,N.Abbreviated,le.Standalone);break;case"cccc":n=$(1,N.Wide,le.Standalone);break;case"ccccc":n=$(1,N.Narrow,le.Standalone);break;case"cccccc":n=$(1,N.Short,le.Standalone);break;case"E":case"EE":case"EEE":n=$(1,N.Abbreviated);break;case"EEEE":n=$(1,N.Wide);break;case"EEEEE":n=$(1,N.Narrow);break;case"EEEEEE":n=$(1,N.Short);break;case"a":case"aa":case"aaa":n=$(0,N.Abbreviated);break;case"aaaa":n=$(0,N.Wide);break;case"aaaaa":n=$(0,N.Narrow);break;case"b":case"bb":case"bbb":n=$(0,N.Abbreviated,le.Standalone,!0);break;case"bbbb":n=$(0,N.Wide,le.Standalone,!0);break;case"bbbbb":n=$(0,N.Narrow,le.Standalone,!0);break;case"B":case"BB":case"BBB":n=$(0,N.Abbreviated,le.Format,!0);break;case"BBBB":n=$(0,N.Wide,le.Format,!0);break;case"BBBBB":n=$(0,N.Narrow,le.Format,!0);break;case"h":n=Y(3,1,-12);break;case"hh":n=Y(3,2,-12);break;case"H":n=Y(3,1);break;case"HH":n=Y(3,2);break;case"m":n=Y(4,1);break;case"mm":n=Y(4,2);break;case"s":n=Y(5,1);break;case"ss":n=Y(5,2);break;case"S":n=Y(6,1);break;case"SS":n=Y(6,2);break;case"SSS":n=Y(6,3);break;case"Z":case"ZZ":case"ZZZ":n=jn(0);break;case"ZZZZZ":n=jn(3);break;case"O":case"OO":case"OOO":case"z":case"zz":case"zzz":n=jn(1);break;case"OOOO":case"ZZZZ":case"zzzz":n=jn(2);break;default:return null}return Li[t]=n,n}function Tr(t,n){t=t.replace(/:/g,"");let e=Date.parse("Jan 01, 1970 00:00:00 "+t)/6e4;return isNaN(e)?n:e}function Cl(t,n){return t=new Date(t.getTime()),t.setMinutes(t.getMinutes()+n),t}function _l(t,n,e){let o=t.getTimezoneOffset(),r=Tr(n,o);return Cl(t,-1*(r-o))}function El(t){if(lr(t))return t;if(typeof t=="number"&&!isNaN(t))return new Date(t);if(typeof t=="string"){if(t=t.trim(),/^(\d{4}(-\d{1,2}(-\d{1,2})?)?)$/.test(t)){let[o,r=1,s=1]=t.split("-").map(a=>+a);return zn(o,r-1,s)}let e=parseFloat(t);if(!isNaN(t-e))return new Date(e);let i;if(i=t.match(hl))return wl(i)}let n=new Date(t);if(!lr(n))throw new j(2302,!1);return n}function wl(t){let n=new Date(0),e=0,i=0,o=t[8]?n.setUTCFullYear:n.setFullYear,r=t[8]?n.setUTCHours:n.setHours;t[9]&&(e=Number(t[9]+t[10]),i=Number(t[9]+t[11])),o.call(n,Number(t[1]),Number(t[2])-1,Number(t[3]));let s=Number(t[4]||0)-e,a=Number(t[5]||0)-i,l=Number(t[6]||0),u=Math.floor(parseFloat("0."+(t[7]||0))*1e3);return r.call(n,s,a,l,u),n}function lr(t){return t instanceof Date&&!isNaN(t.valueOf())}var Sl=/^(\d+)?\.((\d+)(-(\d+))?)?$/,ur=22,Gn=".",tn="0",Al=";",Fl=",",Pi="#",cr="\xA4";function Tl(t,n,e,i,o,r,s=!1){let a="",l=!1;if(!isFinite(t))a=Ve(e,me.Infinity);else{let u=Ml(t);s&&(u=Il(u));let c=n.minInt,d=n.minFrac,h=n.maxFrac;if(r){let A=r.match(Sl);if(A===null)throw new j(2306,!1);let B=A[1],I=A[3],ye=A[5];B!=null&&(c=Vi(B)),I!=null&&(d=Vi(I)),ye!=null?h=Vi(ye):I!=null&&d>h&&(h=d)}Ol(u,d,h);let p=u.digits,m=u.integerLen,E=u.exponent,g=[];for(l=p.every(A=>!A);m<c;m++)p.unshift(0);for(;m<0;m++)p.unshift(0);m>0?g=p.splice(m,p.length):(g=p,p=[0]);let b=[];for(p.length>=n.lgSize&&b.unshift(p.splice(-n.lgSize,p.length).join(""));p.length>n.gSize;)b.unshift(p.splice(-n.gSize,p.length).join(""));p.length&&b.unshift(p.join("")),a=b.join(Ve(e,i)),g.length&&(a+=Ve(e,o)+g.join("")),E&&(a+=Ve(e,me.Exponential)+"+"+E)}return t<0&&!l?a=n.negPre+a+n.negSuf:a=n.posPre+a+n.posSuf,a}function xr(t,n,e,i,o){let r=Dr(n,ji.Currency),s=xl(r,Ve(n,me.MinusSign));return s.minFrac=Sr(i),s.maxFrac=s.minFrac,Tl(t,s,n,me.CurrencyGroup,me.CurrencyDecimal,o).replace(cr,e).replace(cr,"").trim()}function xl(t,n="-"){let e={minInt:1,minFrac:0,maxFrac:0,posPre:"",posSuf:"",negPre:"",negSuf:"",gSize:0,lgSize:0},i=t.split(Al),o=i[0],r=i[1],s=o.indexOf(Gn)!==-1?o.split(Gn):[o.substring(0,o.lastIndexOf(tn)+1),o.substring(o.lastIndexOf(tn)+1)],a=s[0],l=s[1]||"";e.posPre=a.substring(0,a.indexOf(Pi));for(let c=0;c<l.length;c++){let d=l.charAt(c);d===tn?e.minFrac=e.maxFrac=c+1:d===Pi?e.maxFrac=c+1:e.posSuf+=d}let u=a.split(Fl);if(e.gSize=u[1]?u[1].length:0,e.lgSize=u[2]||u[1]?(u[2]||u[1]).length:0,r){let c=o.length-e.posPre.length-e.posSuf.length,d=r.indexOf(Pi);e.negPre=r.substring(0,d).replace(/'/g,""),e.negSuf=r.slice(d+c).replace(/'/g,"")}else e.negPre=n+e.posPre,e.negSuf=e.posSuf;return e}function Il(t){if(t.digits[0]===0)return t;let n=t.digits.length-t.integerLen;return t.exponent?t.exponent+=2:(n===0?t.digits.push(0,0):n===1&&t.digits.push(0),t.integerLen+=2),t}function Ml(t){let n=Math.abs(t)+"",e=0,i,o,r,s,a;for((o=n.indexOf(Gn))>-1&&(n=n.replace(Gn,"")),(r=n.search(/e/i))>0?(o<0&&(o=r),o+=+n.slice(r+1),n=n.substring(0,r)):o<0&&(o=n.length),r=0;n.charAt(r)===tn;r++);if(r===(a=n.length))i=[0],o=1;else{for(a--;n.charAt(a)===tn;)a--;for(o-=r,i=[],s=0;r<=a;r++,s++)i[s]=Number(n.charAt(r))}return o>ur&&(i=i.splice(0,ur-1),e=o-1,o=1),{digits:i,exponent:e,integerLen:o}}function Ol(t,n,e){if(n>e)throw new j(2307,!1);let i=t.digits,o=i.length-t.integerLen,r=Math.min(Math.max(n,o),e),s=r+t.integerLen,a=i[s];if(s>0){i.splice(Math.max(t.integerLen,s));for(let d=s;d<i.length;d++)i[d]=0}else{o=Math.max(0,o),t.integerLen=1,i.length=Math.max(1,s=r+1),i[0]=0;for(let d=1;d<s;d++)i[d]=0}if(a>=5)if(s-1<0){for(let d=0;d>s;d--)i.unshift(0),t.integerLen++;i.unshift(1),t.integerLen++}else i[s-1]++;for(;o<Math.max(0,r);o++)i.push(0);let l=r!==0,u=n+t.integerLen,c=i.reduceRight(function(d,h,p,m){return h=h+d,m[p]=h<10?h:h-10,l&&(m[p]===0&&p>=u?m.pop():l=!1),h>=10?1:0},0);c&&(i.unshift(c),t.integerLen++)}function Vi(t){let n=parseInt(t);if(isNaN(n))throw new j(2305,!1);return n}var Bi=/\s+/,dr=[],Ui=(()=>{class t{_ngEl;_renderer;initialClasses=dr;rawClass;stateMap=new Map;constructor(e,i){this._ngEl=e,this._renderer=i}set klass(e){this.initialClasses=e!=null?e.trim().split(Bi):dr}set ngClass(e){this.rawClass=typeof e=="string"?e.trim().split(Bi):e}ngDoCheck(){for(let i of this.initialClasses)this._updateState(i,!0);let e=this.rawClass;if(Array.isArray(e)||e instanceof Set)for(let i of e)this._updateState(i,!0);else if(e!=null)for(let i of Object.keys(e))this._updateState(i,!!e[i]);this._applyStateDiff()}_updateState(e,i){let o=this.stateMap.get(e);o!==void 0?(o.enabled!==i&&(o.changed=!0,o.enabled=i),o.touched=!0):this.stateMap.set(e,{enabled:i,changed:!0,touched:!0})}_applyStateDiff(){for(let e of this.stateMap){let i=e[0],o=e[1];o.changed?(this._toggleClass(i,o.enabled),o.changed=!1):o.touched||(o.enabled&&this._toggleClass(i,!1),this.stateMap.delete(i)),o.touched=!1}}_toggleClass(e,i){e=e.trim(),e.length>0&&e.split(Bi).forEach(o=>{i?this._renderer.addClass(this._ngEl.nativeElement,o):this._renderer.removeClass(this._ngEl.nativeElement,o)})}static \u0275fac=function(i){return new(i||t)(D(Ae),D(ze))};static \u0275dir=w({type:t,selectors:[["","ngClass",""]],inputs:{klass:[0,"class","klass"],ngClass:"ngClass"}})}return t})();var Wn=class{$implicit;ngForOf;index;count;constructor(n,e,i,o){this.$implicit=n,this.ngForOf=e,this.index=i,this.count=o}get first(){return this.index===0}get last(){return this.index===this.count-1}get even(){return this.index%2===0}get odd(){return!this.even}},Ir=(()=>{class t{_viewContainer;_template;_differs;set ngForOf(e){this._ngForOf=e,this._ngForOfDirty=!0}set ngForTrackBy(e){this._trackByFn=e}get ngForTrackBy(){return this._trackByFn}_ngForOf=null;_ngForOfDirty=!0;_differ=null;_trackByFn;constructor(e,i,o){this._viewContainer=e,this._template=i,this._differs=o}set ngForTemplate(e){e&&(this._template=e)}ngDoCheck(){if(this._ngForOfDirty){this._ngForOfDirty=!1;let e=this._ngForOf;!this._differ&&e&&(this._differ=this._differs.find(e).create(this.ngForTrackBy))}if(this._differ){let e=this._differ.diff(this._ngForOf);e&&this._applyChanges(e)}}_applyChanges(e){let i=this._viewContainer;e.forEachOperation((o,r,s)=>{if(o.previousIndex==null)i.createEmbeddedView(this._template,new Wn(o.item,this._ngForOf,-1,-1),s===null?void 0:s);else if(s==null)i.remove(r===null?void 0:r);else if(r!==null){let a=i.get(r);i.move(a,s),pr(a,o)}});for(let o=0,r=i.length;o<r;o++){let a=i.get(o).context;a.index=o,a.count=r,a.ngForOf=this._ngForOf}e.forEachIdentityChange(o=>{let r=i.get(o.currentIndex);pr(r,o)})}static ngTemplateContextGuard(e,i){return!0}static \u0275fac=function(i){return new(i||t)(D(Yt),D(Et),D(er))};static \u0275dir=w({type:t,selectors:[["","ngFor","","ngForOf",""]],inputs:{ngForOf:"ngForOf",ngForTrackBy:"ngForTrackBy",ngForTemplate:"ngForTemplate"}})}return t})();function pr(t,n){t.context.$implicit=n.item}var nn=(()=>{class t{_viewContainer;_context=new Kn;_thenTemplateRef=null;_elseTemplateRef=null;_thenViewRef=null;_elseViewRef=null;constructor(e,i){this._viewContainer=e,this._thenTemplateRef=i}set ngIf(e){this._context.$implicit=this._context.ngIf=e,this._updateView()}set ngIfThen(e){hr(e,!1),this._thenTemplateRef=e,this._thenViewRef=null,this._updateView()}set ngIfElse(e){hr(e,!1),this._elseTemplateRef=e,this._elseViewRef=null,this._updateView()}_updateView(){this._context.$implicit?this._thenViewRef||(this._viewContainer.clear(),this._elseViewRef=null,this._thenTemplateRef&&(this._thenViewRef=this._viewContainer.createEmbeddedView(this._thenTemplateRef,this._context))):this._elseViewRef||(this._viewContainer.clear(),this._thenViewRef=null,this._elseTemplateRef&&(this._elseViewRef=this._viewContainer.createEmbeddedView(this._elseTemplateRef,this._context)))}static ngIfUseIfTypeGuard;static ngTemplateGuard_ngIf;static ngTemplateContextGuard(e,i){return!0}static \u0275fac=function(i){return new(i||t)(D(Yt),D(Et))};static \u0275dir=w({type:t,selectors:[["","ngIf",""]],inputs:{ngIf:"ngIf",ngIfThen:"ngIfThen",ngIfElse:"ngIfElse"}})}return t})(),Kn=class{$implicit=null;ngIf=null};function hr(t,n){if(t&&!t.createEmbeddedView)throw new j(2020,!1)}var $i=class{_viewContainerRef;_templateRef;_created=!1;constructor(n,e){this._viewContainerRef=n,this._templateRef=e}create(){this._created=!0,this._viewContainerRef.createEmbeddedView(this._templateRef)}destroy(){this._created=!1,this._viewContainerRef.clear()}enforceState(n){n&&!this._created?this.create():!n&&this._created&&this.destroy()}},Mr=(()=>{class t{_defaultViews=[];_defaultUsed=!1;_caseCount=0;_lastCaseCheckIndex=0;_lastCasesMatched=!1;_ngSwitch;set ngSwitch(e){this._ngSwitch=e,this._caseCount===0&&this._updateDefaultCases(!0)}_addCase(){return this._caseCount++}_addDefault(e){this._defaultViews.push(e)}_matchCase(e){let i=e===this._ngSwitch;return this._lastCasesMatched||=i,this._lastCaseCheckIndex++,this._lastCaseCheckIndex===this._caseCount&&(this._updateDefaultCases(!this._lastCasesMatched),this._lastCaseCheckIndex=0,this._lastCasesMatched=!1),i}_updateDefaultCases(e){if(this._defaultViews.length>0&&e!==this._defaultUsed){this._defaultUsed=e;for(let i of this._defaultViews)i.enforceState(e)}}static \u0275fac=function(i){return new(i||t)};static \u0275dir=w({type:t,selectors:[["","ngSwitch",""]],inputs:{ngSwitch:"ngSwitch"}})}return t})(),kl=(()=>{class t{ngSwitch;_view;ngSwitchCase;constructor(e,i,o){this.ngSwitch=o,o._addCase(),this._view=new $i(e,i)}ngDoCheck(){this._view.enforceState(this.ngSwitch._matchCase(this.ngSwitchCase))}static \u0275fac=function(i){return new(i||t)(D(Yt),D(Et),D(Mr,9))};static \u0275dir=w({type:t,selectors:[["","ngSwitchCase",""]],inputs:{ngSwitchCase:"ngSwitchCase"}})}return t})();var Hi=(()=>{class t{_ngEl;_differs;_renderer;_ngStyle=null;_differ=null;constructor(e,i,o){this._ngEl=e,this._differs=i,this._renderer=o}set ngStyle(e){this._ngStyle=e,!this._differ&&e&&(this._differ=this._differs.find(e).create())}ngDoCheck(){if(this._differ){let e=this._differ.diff(this._ngStyle);e&&this._applyChanges(e)}}_setStyle(e,i){let[o,r]=e.split("."),s=o.indexOf("-")===-1?void 0:Uo.DashCase;i!=null?this._renderer.setStyle(this._ngEl.nativeElement,o,r?`${i}${r}`:i,s):this._renderer.removeStyle(this._ngEl.nativeElement,o,s)}_applyChanges(e){e.forEachRemovedItem(i=>this._setStyle(i.key,null)),e.forEachAddedItem(i=>this._setStyle(i.key,i.currentValue)),e.forEachChangedItem(i=>this._setStyle(i.key,i.currentValue))}static \u0275fac=function(i){return new(i||t)(D(Ae),D(tr),D(ze))};static \u0275dir=w({type:t,selectors:[["","ngStyle",""]],inputs:{ngStyle:"ngStyle"}})}return t})(),Ye=(()=>{class t{_viewContainerRef;_viewRef=null;ngTemplateOutletContext=null;ngTemplateOutlet=null;ngTemplateOutletInjector=null;constructor(e){this._viewContainerRef=e}ngOnChanges(e){if(this._shouldRecreateView(e)){let i=this._viewContainerRef;if(this._viewRef&&i.remove(i.indexOf(this._viewRef)),!this.ngTemplateOutlet){this._viewRef=null;return}let o=this._createContextForwardProxy();this._viewRef=i.createEmbeddedView(this.ngTemplateOutlet,o,{injector:this.ngTemplateOutletInjector??void 0})}}_shouldRecreateView(e){return!!e.ngTemplateOutlet||!!e.ngTemplateOutletInjector}_createContextForwardProxy(){return new Proxy({},{set:(e,i,o)=>this.ngTemplateOutletContext?Reflect.set(this.ngTemplateOutletContext,i,o):!1,get:(e,i,o)=>{if(this.ngTemplateOutletContext)return Reflect.get(this.ngTemplateOutletContext,i,o)}})}static \u0275fac=function(i){return new(i||t)(D(Yt))};static \u0275dir=w({type:t,selectors:[["","ngTemplateOutlet",""]],inputs:{ngTemplateOutletContext:"ngTemplateOutletContext",ngTemplateOutlet:"ngTemplateOutlet",ngTemplateOutletInjector:"ngTemplateOutletInjector"},features:[Ee]})}return t})();function zi(t,n){return new j(2100,!1)}var Nl="mediumDate",Or=new U(""),kr=new U(""),Rl=(()=>{class t{locale;defaultTimezone;defaultOptions;constructor(e,i,o){this.locale=e,this.defaultTimezone=i,this.defaultOptions=o}transform(e,i,o,r){if(e==null||e===""||e!==e)return null;try{let s=i??this.defaultOptions?.dateFormat??Nl,a=o??this.defaultOptions?.timezone??this.defaultTimezone??void 0;return Ar(e,s,r||this.locale,a)}catch(s){throw zi(t,s.message)}}static \u0275fac=function(i){return new(i||t)(D(Mi,16),D(Or,24),D(kr,24))};static \u0275pipe=kn({name:"date",type:t,pure:!0})}return t})();var Ll=(()=>{class t{_locale;_defaultCurrencyCode;constructor(e,i="USD"){this._locale=e,this._defaultCurrencyCode=i}transform(e,i=this._defaultCurrencyCode,o="symbol",r,s){if(!Pl(e))return null;s||=this._locale,typeof o=="boolean"&&(o=o?"symbol":"code");let a=i||this._defaultCurrencyCode;o!=="code"&&(o==="symbol"||o==="symbol-narrow"?a=wr(a,o==="symbol"?"wide":"narrow",s):a=o);try{let l=Vl(e);return xr(l,s,a,i,r)}catch(l){throw zi(t,l.message)}}static \u0275fac=function(i){return new(i||t)(D(Mi,16),D(Jo,16))};static \u0275pipe=kn({name:"currency",type:t,pure:!0})}return t})();function Pl(t){return!(t==null||t===""||t!==t)}function Vl(t){if(typeof t=="string"&&!isNaN(Number(t)-parseFloat(t)))return Number(t);if(typeof t!="number")throw new j(2309,!1);return t}var Bl=(()=>{class t{transform(e,i,o){if(e==null)return null;if(!(typeof e=="string"||Array.isArray(e)))throw zi(t,e);return e.slice(i,o)}static \u0275fac=function(i){return new(i||t)};static \u0275pipe=kn({name:"slice",type:t,pure:!1})}return t})();var ue=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=P({type:t});static \u0275inj=L({})}return t})();function Gi(t,n){n=encodeURIComponent(n);for(let e of t.split(";")){let i=e.indexOf("="),[o,r]=i==-1?[e,""]:[e.slice(0,i),e.slice(i+1)];if(o.trim()===n)return decodeURIComponent(r)}return null}var on=class{};var Ul="browser",Hl="server";function qn(t){return t===Ul}function Nr(t){return t===Hl}var eh=(()=>{class t{static \u0275prov=v({token:t,providedIn:"root",factory:()=>new Wi(f(re),window)})}return t})(),Wi=class{document;window;offset=()=>[0,0];constructor(n,e){this.document=n,this.window=e}setOffset(n){Array.isArray(n)?this.offset=()=>n:this.offset=n}getScrollPosition(){return[this.window.scrollX,this.window.scrollY]}scrollToPosition(n,e){this.window.scrollTo(de(S({},e),{left:n[0],top:n[1]}))}scrollToAnchor(n,e){let i=zl(this.document,n);i&&(this.scrollToElement(i,e),i.focus())}setHistoryScrollRestoration(n){try{this.window.history.scrollRestoration=n}catch{console.warn(In(2400,!1))}}scrollToElement(n,e){let i=n.getBoundingClientRect(),o=i.left+this.window.pageXOffset,r=i.top+this.window.pageYOffset,s=this.offset();this.window.scrollTo(de(S({},e),{left:o-s[0],top:r-s[1]}))}};function zl(t,n){let e=t.getElementById(n)||t.getElementsByName(n)[0];if(e)return e;if(typeof t.createTreeWalker=="function"&&t.body&&typeof t.body.attachShadow=="function"){let i=t.createTreeWalker(t.body,NodeFilter.SHOW_ELEMENT),o=i.currentNode;for(;o;){let r=o.shadowRoot;if(r){let s=r.getElementById(n)||r.querySelector(`[name="${n}"]`);if(s)return s}o=i.nextNode()}}return null}var Ot=class{},kt=class{},$e=class t{headers;normalizedNames=new Map;lazyInit;lazyUpdate=null;constructor(n){n?typeof n=="string"?this.lazyInit=()=>{this.headers=new Map,n.split(`
`).forEach(e=>{let i=e.indexOf(":");if(i>0){let o=e.slice(0,i),r=e.slice(i+1).trim();this.addHeaderEntry(o,r)}})}:typeof Headers<"u"&&n instanceof Headers?(this.headers=new Map,n.forEach((e,i)=>{this.addHeaderEntry(i,e)})):this.lazyInit=()=>{this.headers=new Map,Object.entries(n).forEach(([e,i])=>{this.setHeaderEntries(e,i)})}:this.headers=new Map}has(n){return this.init(),this.headers.has(n.toLowerCase())}get(n){this.init();let e=this.headers.get(n.toLowerCase());return e&&e.length>0?e[0]:null}keys(){return this.init(),Array.from(this.normalizedNames.values())}getAll(n){return this.init(),this.headers.get(n.toLowerCase())||null}append(n,e){return this.clone({name:n,value:e,op:"a"})}set(n,e){return this.clone({name:n,value:e,op:"s"})}delete(n,e){return this.clone({name:n,value:e,op:"d"})}maybeSetNormalizedName(n,e){this.normalizedNames.has(e)||this.normalizedNames.set(e,n)}init(){this.lazyInit&&(this.lazyInit instanceof t?this.copyFrom(this.lazyInit):this.lazyInit(),this.lazyInit=null,this.lazyUpdate&&(this.lazyUpdate.forEach(n=>this.applyUpdate(n)),this.lazyUpdate=null))}copyFrom(n){n.init(),Array.from(n.headers.keys()).forEach(e=>{this.headers.set(e,n.headers.get(e)),this.normalizedNames.set(e,n.normalizedNames.get(e))})}clone(n){let e=new t;return e.lazyInit=this.lazyInit&&this.lazyInit instanceof t?this.lazyInit:this,e.lazyUpdate=(this.lazyUpdate||[]).concat([n]),e}applyUpdate(n){let e=n.name.toLowerCase();switch(n.op){case"a":case"s":let i=n.value;if(typeof i=="string"&&(i=[i]),i.length===0)return;this.maybeSetNormalizedName(n.name,e);let o=(n.op==="a"?this.headers.get(e):void 0)||[];o.push(...i),this.headers.set(e,o);break;case"d":let r=n.value;if(!r)this.headers.delete(e),this.normalizedNames.delete(e);else{let s=this.headers.get(e);if(!s)return;s=s.filter(a=>r.indexOf(a)===-1),s.length===0?(this.headers.delete(e),this.normalizedNames.delete(e)):this.headers.set(e,s)}break}}addHeaderEntry(n,e){let i=n.toLowerCase();this.maybeSetNormalizedName(n,i),this.headers.has(i)?this.headers.get(i).push(e):this.headers.set(i,[e])}setHeaderEntries(n,e){let i=(Array.isArray(e)?e:[e]).map(r=>r.toString()),o=n.toLowerCase();this.headers.set(o,i),this.maybeSetNormalizedName(n,o)}forEach(n){this.init(),Array.from(this.normalizedNames.keys()).forEach(e=>n(this.normalizedNames.get(e),this.headers.get(e)))}};var Qn=class{encodeKey(n){return Rr(n)}encodeValue(n){return Rr(n)}decodeKey(n){return decodeURIComponent(n)}decodeValue(n){return decodeURIComponent(n)}};function Gl(t,n){let e=new Map;return t.length>0&&t.replace(/^\?/,"").split("&").forEach(o=>{let r=o.indexOf("="),[s,a]=r==-1?[n.decodeKey(o),""]:[n.decodeKey(o.slice(0,r)),n.decodeValue(o.slice(r+1))],l=e.get(s)||[];l.push(a),e.set(s,l)}),e}var Wl=/%(\d[a-f0-9])/gi,Kl={40:"@","3A":":",24:"$","2C":",","3B":";","3D":"=","3F":"?","2F":"/"};function Rr(t){return encodeURIComponent(t).replace(Wl,(n,e)=>Kl[e]??n)}function Zn(t){return`${t}`}var Ze=class t{map;encoder;updates=null;cloneFrom=null;constructor(n={}){if(this.encoder=n.encoder||new Qn,n.fromString){if(n.fromObject)throw new j(2805,!1);this.map=Gl(n.fromString,this.encoder)}else n.fromObject?(this.map=new Map,Object.keys(n.fromObject).forEach(e=>{let i=n.fromObject[e],o=Array.isArray(i)?i.map(Zn):[Zn(i)];this.map.set(e,o)})):this.map=null}has(n){return this.init(),this.map.has(n)}get(n){this.init();let e=this.map.get(n);return e?e[0]:null}getAll(n){return this.init(),this.map.get(n)||null}keys(){return this.init(),Array.from(this.map.keys())}append(n,e){return this.clone({param:n,value:e,op:"a"})}appendAll(n){let e=[];return Object.keys(n).forEach(i=>{let o=n[i];Array.isArray(o)?o.forEach(r=>{e.push({param:i,value:r,op:"a"})}):e.push({param:i,value:o,op:"a"})}),this.clone(e)}set(n,e){return this.clone({param:n,value:e,op:"s"})}delete(n,e){return this.clone({param:n,value:e,op:"d"})}toString(){return this.init(),this.keys().map(n=>{let e=this.encoder.encodeKey(n);return this.map.get(n).map(i=>e+"="+this.encoder.encodeValue(i)).join("&")}).filter(n=>n!=="").join("&")}clone(n){let e=new t({encoder:this.encoder});return e.cloneFrom=this.cloneFrom||this,e.updates=(this.updates||[]).concat(n),e}init(){this.map===null&&(this.map=new Map),this.cloneFrom!==null&&(this.cloneFrom.init(),this.cloneFrom.keys().forEach(n=>this.map.set(n,this.cloneFrom.map.get(n))),this.updates.forEach(n=>{switch(n.op){case"a":case"s":let e=(n.op==="a"?this.map.get(n.param):void 0)||[];e.push(Zn(n.value)),this.map.set(n.param,e);break;case"d":if(n.value!==void 0){let i=this.map.get(n.param)||[],o=i.indexOf(Zn(n.value));o!==-1&&i.splice(o,1),i.length>0?this.map.set(n.param,i):this.map.delete(n.param)}else{this.map.delete(n.param);break}}}),this.cloneFrom=this.updates=null)}};var Jn=class{map=new Map;set(n,e){return this.map.set(n,e),this}get(n){return this.map.has(n)||this.map.set(n,n.defaultValue()),this.map.get(n)}delete(n){return this.map.delete(n),this}has(n){return this.map.has(n)}keys(){return this.map.keys()}};function ql(t){switch(t){case"DELETE":case"GET":case"HEAD":case"OPTIONS":case"JSONP":return!1;default:return!0}}function Lr(t){return typeof ArrayBuffer<"u"&&t instanceof ArrayBuffer}function Pr(t){return typeof Blob<"u"&&t instanceof Blob}function Vr(t){return typeof FormData<"u"&&t instanceof FormData}function Yl(t){return typeof URLSearchParams<"u"&&t instanceof URLSearchParams}var rn="Content-Type",ei="Accept",Xi="X-Request-URL",$r="text/plain",jr="application/json",Ur=`${jr}, ${$r}, */*`,Mt=class t{url;body=null;headers;context;reportProgress=!1;withCredentials=!1;credentials;keepalive=!1;cache;priority;mode;redirect;responseType="json";method;params;urlWithParams;transferCache;timeout;constructor(n,e,i,o){this.url=e,this.method=n.toUpperCase();let r;if(ql(this.method)||o?(this.body=i!==void 0?i:null,r=o):r=i,r){if(this.reportProgress=!!r.reportProgress,this.withCredentials=!!r.withCredentials,this.keepalive=!!r.keepalive,r.responseType&&(this.responseType=r.responseType),r.headers&&(this.headers=r.headers),r.context&&(this.context=r.context),r.params&&(this.params=r.params),r.priority&&(this.priority=r.priority),r.cache&&(this.cache=r.cache),r.credentials&&(this.credentials=r.credentials),typeof r.timeout=="number"){if(r.timeout<1||!Number.isInteger(r.timeout))throw new Error("");this.timeout=r.timeout}r.mode&&(this.mode=r.mode),r.redirect&&(this.redirect=r.redirect),this.transferCache=r.transferCache}if(this.headers??=new $e,this.context??=new Jn,!this.params)this.params=new Ze,this.urlWithParams=e;else{let s=this.params.toString();if(s.length===0)this.urlWithParams=e;else{let a=e.indexOf("?"),l=a===-1?"?":a<e.length-1?"&":"";this.urlWithParams=e+l+s}}}serializeBody(){return this.body===null?null:typeof this.body=="string"||Lr(this.body)||Pr(this.body)||Vr(this.body)||Yl(this.body)?this.body:this.body instanceof Ze?this.body.toString():typeof this.body=="object"||typeof this.body=="boolean"||Array.isArray(this.body)?JSON.stringify(this.body):this.body.toString()}detectContentTypeHeader(){return this.body===null||Vr(this.body)?null:Pr(this.body)?this.body.type||null:Lr(this.body)?null:typeof this.body=="string"?$r:this.body instanceof Ze?"application/x-www-form-urlencoded;charset=UTF-8":typeof this.body=="object"||typeof this.body=="number"||typeof this.body=="boolean"?jr:null}clone(n={}){let e=n.method||this.method,i=n.url||this.url,o=n.responseType||this.responseType,r=n.keepalive??this.keepalive,s=n.priority||this.priority,a=n.cache||this.cache,l=n.mode||this.mode,u=n.redirect||this.redirect,c=n.credentials||this.credentials,d=n.transferCache??this.transferCache,h=n.timeout??this.timeout,p=n.body!==void 0?n.body:this.body,m=n.withCredentials??this.withCredentials,E=n.reportProgress??this.reportProgress,g=n.headers||this.headers,b=n.params||this.params,A=n.context??this.context;return n.setHeaders!==void 0&&(g=Object.keys(n.setHeaders).reduce((B,I)=>B.set(I,n.setHeaders[I]),g)),n.setParams&&(b=Object.keys(n.setParams).reduce((B,I)=>B.set(I,n.setParams[I]),b)),new t(e,i,p,{params:b,headers:g,context:A,reportProgress:E,responseType:o,withCredentials:m,transferCache:d,keepalive:r,cache:a,priority:s,timeout:h,mode:l,redirect:u,credentials:c})}},Xe=function(t){return t[t.Sent=0]="Sent",t[t.UploadProgress=1]="UploadProgress",t[t.ResponseHeader=2]="ResponseHeader",t[t.DownloadProgress=3]="DownloadProgress",t[t.Response=4]="Response",t[t.User=5]="User",t}(Xe||{}),Nt=class{headers;status;statusText;url;ok;type;constructor(n,e=200,i="OK"){this.headers=n.headers||new $e,this.status=n.status!==void 0?n.status:e,this.statusText=n.statusText||i,this.url=n.url||null,this.ok=this.status>=200&&this.status<300}},sn=class t extends Nt{constructor(n={}){super(n)}type=Xe.ResponseHeader;clone(n={}){return new t({headers:n.headers||this.headers,status:n.status!==void 0?n.status:this.status,statusText:n.statusText||this.statusText,url:n.url||this.url||void 0})}},Rt=class t extends Nt{body;constructor(n={}){super(n),this.body=n.body!==void 0?n.body:null}type=Xe.Response;clone(n={}){return new t({body:n.body!==void 0?n.body:this.body,headers:n.headers||this.headers,status:n.status!==void 0?n.status:this.status,statusText:n.statusText||this.statusText,url:n.url||this.url||void 0})}},Be=class extends Nt{name="HttpErrorResponse";message;error;ok=!1;constructor(n){super(n,0,"Unknown Error"),this.status>=200&&this.status<300?this.message=`Http failure during parsing for ${n.url||"(unknown url)"}`:this.message=`Http failure response for ${n.url||"(unknown url)"}: ${n.status} ${n.statusText}`,this.error=n.error||null}},Hr=200,Zl=204;function Ki(t,n){return{body:n,headers:t.headers,context:t.context,observe:t.observe,params:t.params,reportProgress:t.reportProgress,responseType:t.responseType,withCredentials:t.withCredentials,transferCache:t.transferCache,keepalive:t.keepalive,priority:t.priority,cache:t.cache,mode:t.mode,redirect:t.redirect}}var zr=(()=>{class t{handler;constructor(e){this.handler=e}request(e,i,o={}){let r;if(e instanceof Mt)r=e;else{let l;o.headers instanceof $e?l=o.headers:l=new $e(o.headers);let u;o.params&&(o.params instanceof Ze?u=o.params:u=new Ze({fromObject:o.params})),r=new Mt(e,i,o.body!==void 0?o.body:null,{headers:l,context:o.context,params:u,reportProgress:o.reportProgress,responseType:o.responseType||"json",withCredentials:o.withCredentials,transferCache:o.transferCache,keepalive:o.keepalive,priority:o.priority,cache:o.cache,mode:o.mode,redirect:o.redirect,credentials:o.credentials})}let s=Si(r).pipe(Lo(l=>this.handler.handle(l)));if(e instanceof Mt||o.observe==="events")return s;let a=s.pipe(Ro(l=>l instanceof Rt));switch(o.observe||"body"){case"body":switch(r.responseType){case"arraybuffer":return a.pipe(dt(l=>{if(l.body!==null&&!(l.body instanceof ArrayBuffer))throw new j(2806,!1);return l.body}));case"blob":return a.pipe(dt(l=>{if(l.body!==null&&!(l.body instanceof Blob))throw new j(2807,!1);return l.body}));case"text":return a.pipe(dt(l=>{if(l.body!==null&&typeof l.body!="string")throw new j(2808,!1);return l.body}));case"json":default:return a.pipe(dt(l=>l.body))}case"response":return a;default:throw new j(2809,!1)}}delete(e,i={}){return this.request("DELETE",e,i)}get(e,i={}){return this.request("GET",e,i)}head(e,i={}){return this.request("HEAD",e,i)}jsonp(e,i){return this.request("JSONP",e,{params:new Ze().append(i,"JSONP_CALLBACK"),observe:"body",responseType:"json"})}options(e,i={}){return this.request("OPTIONS",e,i)}patch(e,i,o={}){return this.request("PATCH",e,Ki(o,i))}post(e,i,o={}){return this.request("POST",e,Ki(o,i))}put(e,i,o={}){return this.request("PUT",e,Ki(o,i))}static \u0275fac=function(i){return new(i||t)(oe(Ot))};static \u0275prov=v({token:t,factory:t.\u0275fac})}return t})(),Xl=/^\)\]\}',?\n/;function Br(t){if(t.url)return t.url;let n=Xi.toLocaleLowerCase();return t.headers.get(n)}var Gr=new U(""),Xn=(()=>{class t{fetchImpl=f(qi,{optional:!0})?.fetch??((...e)=>globalThis.fetch(...e));ngZone=f(Nn);destroyRef=f(Ai);destroyed=!1;constructor(){this.destroyRef.onDestroy(()=>{this.destroyed=!0})}handle(e){return new wi(i=>{let o=new AbortController;this.doRequest(e,o.signal,i).then(Yi,s=>i.error(new Be({error:s})));let r;return e.timeout&&(r=this.ngZone.runOutsideAngular(()=>setTimeout(()=>{o.signal.aborted||o.abort(new DOMException("signal timed out","TimeoutError"))},e.timeout))),()=>{r!==void 0&&clearTimeout(r),o.abort()}})}doRequest(e,i,o){return xn(this,null,function*(){let r=this.createRequestInit(e),s;try{let p=this.ngZone.runOutsideAngular(()=>this.fetchImpl(e.urlWithParams,S({signal:i},r)));Ql(p),o.next({type:Xe.Sent}),s=yield p}catch(p){o.error(new Be({error:p,status:p.status??0,statusText:p.statusText,url:e.urlWithParams,headers:p.headers}));return}let a=new $e(s.headers),l=s.statusText,u=Br(s)??e.urlWithParams,c=s.status,d=null;if(e.reportProgress&&o.next(new sn({headers:a,status:c,statusText:l,url:u})),s.body){let p=s.headers.get("content-length"),m=[],E=s.body.getReader(),g=0,b,A,B=typeof Zone<"u"&&Zone.current,I=!1;if(yield this.ngZone.runOutsideAngular(()=>xn(this,null,function*(){for(;;){if(this.destroyed){yield E.cancel(),I=!0;break}let{done:_e,value:Pe}=yield E.read();if(_e)break;if(m.push(Pe),g+=Pe.length,e.reportProgress){A=e.responseType==="text"?(A??"")+(b??=new TextDecoder).decode(Pe,{stream:!0}):void 0;let tt=()=>o.next({type:Xe.DownloadProgress,total:p?+p:void 0,loaded:g,partialText:A});B?B.run(tt):tt()}}})),I){o.complete();return}let ye=this.concatChunks(m,g);try{let _e=s.headers.get(rn)??"";d=this.parseBody(e,ye,_e)}catch(_e){o.error(new Be({error:_e,headers:new $e(s.headers),status:s.status,statusText:s.statusText,url:Br(s)??e.urlWithParams}));return}}c===0&&(c=d?Hr:0),c>=200&&c<300?(o.next(new Rt({body:d,headers:a,status:c,statusText:l,url:u})),o.complete()):o.error(new Be({error:d,headers:a,status:c,statusText:l,url:u}))})}parseBody(e,i,o){switch(e.responseType){case"json":let r=new TextDecoder().decode(i).replace(Xl,"");return r===""?null:JSON.parse(r);case"text":return new TextDecoder().decode(i);case"blob":return new Blob([i],{type:o});case"arraybuffer":return i.buffer}}createRequestInit(e){let i={},o;if(o=e.credentials,e.withCredentials&&(o="include"),e.headers.forEach((r,s)=>i[r]=s.join(",")),e.headers.has(ei)||(i[ei]=Ur),!e.headers.has(rn)){let r=e.detectContentTypeHeader();r!==null&&(i[rn]=r)}return{body:e.serializeBody(),method:e.method,headers:i,credentials:o,keepalive:e.keepalive,cache:e.cache,priority:e.priority,mode:e.mode,redirect:e.redirect}}concatChunks(e,i){let o=new Uint8Array(i),r=0;for(let s of e)o.set(s,r),r+=s.length;return o}static \u0275fac=function(i){return new(i||t)};static \u0275prov=v({token:t,factory:t.\u0275fac})}return t})(),qi=class{};function Yi(){}function Ql(t){t.then(Yi,Yi)}function Jl(t,n){return n(t)}function eu(t,n,e){return(i,o)=>$o(e,()=>n(i,r=>t(r,o)))}var Wr=new U(""),Kr=new U(""),qr=new U("",{providedIn:"root",factory:()=>!0});var ti=(()=>{class t extends Ot{backend;injector;chain=null;pendingTasks=f(jo);contributeToStability=f(qr);constructor(e,i){super(),this.backend=e,this.injector=i}handle(e){if(this.chain===null){let i=Array.from(new Set([...this.injector.get(Wr),...this.injector.get(Kr,[])]));this.chain=i.reduceRight((o,r)=>eu(o,r,this.injector),Jl)}if(this.contributeToStability){let i=this.pendingTasks.add();return this.chain(e,o=>this.backend.handle(o)).pipe(Po(i))}else return this.chain(e,i=>this.backend.handle(i))}static \u0275fac=function(i){return new(i||t)(oe(kt),oe(Bo))};static \u0275prov=v({token:t,factory:t.\u0275fac})}return t})();var tu=/^\)\]\}',?\n/,nu=RegExp(`^${Xi}:`,"m");function iu(t){return"responseURL"in t&&t.responseURL?t.responseURL:nu.test(t.getAllResponseHeaders())?t.getResponseHeader(Xi):null}var Zi=(()=>{class t{xhrFactory;constructor(e){this.xhrFactory=e}handle(e){if(e.method==="JSONP")throw new j(-2800,!1);let i=this.xhrFactory;return Si(null).pipe(Vo(()=>new wi(r=>{let s=i.build();if(s.open(e.method,e.urlWithParams),e.withCredentials&&(s.withCredentials=!0),e.headers.forEach((g,b)=>s.setRequestHeader(g,b.join(","))),e.headers.has(ei)||s.setRequestHeader(ei,Ur),!e.headers.has(rn)){let g=e.detectContentTypeHeader();g!==null&&s.setRequestHeader(rn,g)}if(e.timeout&&(s.timeout=e.timeout),e.responseType){let g=e.responseType.toLowerCase();s.responseType=g!=="json"?g:"text"}let a=e.serializeBody(),l=null,u=()=>{if(l!==null)return l;let g=s.statusText||"OK",b=new $e(s.getAllResponseHeaders()),A=iu(s)||e.url;return l=new sn({headers:b,status:s.status,statusText:g,url:A}),l},c=()=>{let{headers:g,status:b,statusText:A,url:B}=u(),I=null;b!==Zl&&(I=typeof s.response>"u"?s.responseText:s.response),b===0&&(b=I?Hr:0);let ye=b>=200&&b<300;if(e.responseType==="json"&&typeof I=="string"){let _e=I;I=I.replace(tu,"");try{I=I!==""?JSON.parse(I):null}catch(Pe){I=_e,ye&&(ye=!1,I={error:Pe,text:I})}}ye?(r.next(new Rt({body:I,headers:g,status:b,statusText:A,url:B||void 0})),r.complete()):r.error(new Be({error:I,headers:g,status:b,statusText:A,url:B||void 0}))},d=g=>{let{url:b}=u(),A=new Be({error:g,status:s.status||0,statusText:s.statusText||"Unknown Error",url:b||void 0});r.error(A)},h=d;e.timeout&&(h=g=>{let{url:b}=u(),A=new Be({error:new DOMException("Request timed out","TimeoutError"),status:s.status||0,statusText:s.statusText||"Request timeout",url:b||void 0});r.error(A)});let p=!1,m=g=>{p||(r.next(u()),p=!0);let b={type:Xe.DownloadProgress,loaded:g.loaded};g.lengthComputable&&(b.total=g.total),e.responseType==="text"&&s.responseText&&(b.partialText=s.responseText),r.next(b)},E=g=>{let b={type:Xe.UploadProgress,loaded:g.loaded};g.lengthComputable&&(b.total=g.total),r.next(b)};return s.addEventListener("load",c),s.addEventListener("error",d),s.addEventListener("timeout",h),s.addEventListener("abort",d),e.reportProgress&&(s.addEventListener("progress",m),a!==null&&s.upload&&s.upload.addEventListener("progress",E)),s.send(a),r.next({type:Xe.Sent}),()=>{s.removeEventListener("error",d),s.removeEventListener("abort",d),s.removeEventListener("load",c),s.removeEventListener("timeout",h),e.reportProgress&&(s.removeEventListener("progress",m),a!==null&&s.upload&&s.upload.removeEventListener("progress",E)),s.readyState!==s.DONE&&s.abort()}})))}static \u0275fac=function(i){return new(i||t)(oe(on))};static \u0275prov=v({token:t,factory:t.\u0275fac})}return t})(),Yr=new U(""),ou="XSRF-TOKEN",ru=new U("",{providedIn:"root",factory:()=>ou}),su="X-XSRF-TOKEN",au=new U("",{providedIn:"root",factory:()=>su}),an=class{},lu=(()=>{class t{doc;cookieName;lastCookieString="";lastToken=null;parseCount=0;constructor(e,i){this.doc=e,this.cookieName=i}getToken(){let e=this.doc.cookie||"";return e!==this.lastCookieString&&(this.parseCount++,this.lastToken=Gi(e,this.cookieName),this.lastCookieString=e),this.lastToken}static \u0275fac=function(i){return new(i||t)(oe(re),oe(ru))};static \u0275prov=v({token:t,factory:t.\u0275fac})}return t})();function uu(t,n){let e=t.url.toLowerCase();if(!f(Yr)||t.method==="GET"||t.method==="HEAD"||e.startsWith("http://")||e.startsWith("https://"))return n(t);let i=f(an).getToken(),o=f(au);return i!=null&&!t.headers.has(o)&&(t=t.clone({headers:t.headers.set(o,i)})),n(t)}var Qi=function(t){return t[t.Interceptors=0]="Interceptors",t[t.LegacyInterceptors=1]="LegacyInterceptors",t[t.CustomXsrfConfiguration=2]="CustomXsrfConfiguration",t[t.NoXsrfProtection=3]="NoXsrfProtection",t[t.JsonpSupport=4]="JsonpSupport",t[t.RequestsMadeViaParent=5]="RequestsMadeViaParent",t[t.Fetch=6]="Fetch",t}(Qi||{});function cu(t,n){return{\u0275kind:t,\u0275providers:n}}function du(...t){let n=[zr,Zi,ti,{provide:Ot,useExisting:ti},{provide:kt,useFactory:()=>f(Gr,{optional:!0})??f(Zi)},{provide:Wr,useValue:uu,multi:!0},{provide:Yr,useValue:!0},{provide:an,useClass:lu}];for(let e of t)n.push(...e.\u0275providers);return Mn(n)}function pu(){return cu(Qi.Fetch,[Xn,{provide:Gr,useExisting:Xn},{provide:kt,useExisting:Xn}])}function Lt(...t){if(t){let n=[];for(let e=0;e<t.length;e++){let i=t[e];if(!i)continue;let o=typeof i;if(o==="string"||o==="number")n.push(i);else if(o==="object"){let r=Array.isArray(i)?[Lt(...i)]:Object.entries(i).map(([s,a])=>a?s:void 0);n=r.length?n.concat(r.filter(s=>!!s)):n}}return n.join(" ").trim()}}function Xr(t,n){return t?t.classList?t.classList.contains(n):new RegExp("(^| )"+n+"( |$)","gi").test(t.className):!1}function Qe(t,n){if(t&&n){let e=i=>{Xr(t,i)||(t.classList?t.classList.add(i):t.className+=" "+i)};[n].flat().filter(Boolean).forEach(i=>i.split(" ").forEach(e))}}function hu(){return window.innerWidth-document.documentElement.offsetWidth}function Qr(t){typeof t=="string"?Qe(document.body,t||"p-overflow-hidden"):(t!=null&&t.variableName&&document.body.style.setProperty(t.variableName,hu()+"px"),Qe(document.body,t?.className||"p-overflow-hidden"))}function nt(t,n){if(t&&n){let e=i=>{t.classList?t.classList.remove(i):t.className=t.className.replace(new RegExp("(^|\\b)"+i.split(" ").join("|")+"(\\b|$)","gi")," ")};[n].flat().filter(Boolean).forEach(i=>i.split(" ").forEach(e))}}function Jr(t){typeof t=="string"?nt(document.body,t||"p-overflow-hidden"):(t!=null&&t.variableName&&document.body.style.removeProperty(t.variableName),nt(document.body,t?.className||"p-overflow-hidden"))}function ln(t){for(let n of document?.styleSheets)try{for(let e of n?.cssRules)for(let i of e?.style)if(t.test(i))return{name:i,value:e.style.getPropertyValue(i).trim()}}catch{}return null}function es(t){let n={width:0,height:0};if(t){let[e,i]=[t.style.visibility,t.style.display];t.style.visibility="hidden",t.style.display="block",n.width=t.offsetWidth,n.height=t.offsetHeight,t.style.display=i,t.style.visibility=e}return n}function no(){let t=window,n=document,e=n.documentElement,i=n.getElementsByTagName("body")[0],o=t.innerWidth||e.clientWidth||i.clientWidth,r=t.innerHeight||e.clientHeight||i.clientHeight;return{width:o,height:r}}function to(t){return t?Math.abs(t.scrollLeft):0}function fu(){let t=document.documentElement;return(window.pageXOffset||to(t))-(t.clientLeft||0)}function gu(){let t=document.documentElement;return(window.pageYOffset||t.scrollTop)-(t.clientTop||0)}function mu(t){return t?getComputedStyle(t).direction==="rtl":!1}function Ph(t,n,e=!0){var i,o,r,s;if(t){let a=t.offsetParent?{width:t.offsetWidth,height:t.offsetHeight}:es(t),l=a.height,u=a.width,c=n.offsetHeight,d=n.offsetWidth,h=n.getBoundingClientRect(),p=gu(),m=fu(),E=no(),g,b,A="top";h.top+c+l>E.height?(g=h.top+p-l,A="bottom",g<0&&(g=p)):g=c+h.top+p,h.left+u>E.width?b=Math.max(0,h.left+m+d-u):b=h.left+m,mu(t)?t.style.insetInlineEnd=b+"px":t.style.insetInlineStart=b+"px",t.style.top=g+"px",t.style.transformOrigin=A,e&&(t.style.marginTop=A==="bottom"?`calc(${(o=(i=ln(/-anchor-gutter$/))==null?void 0:i.value)!=null?o:"2px"} * -1)`:(s=(r=ln(/-anchor-gutter$/))==null?void 0:r.value)!=null?s:"")}}function ts(t,n){t&&(typeof n=="string"?t.style.cssText=n:Object.entries(n||{}).forEach(([e,i])=>t.style[e]=i))}function io(t,n){if(t instanceof HTMLElement){let e=t.offsetWidth;if(n){let i=getComputedStyle(t);e+=parseFloat(i.marginLeft)+parseFloat(i.marginRight)}return e}return 0}function Vh(t,n,e=!0,i=void 0){var o;if(t){let r=t.offsetParent?{width:t.offsetWidth,height:t.offsetHeight}:es(t),s=n.offsetHeight,a=n.getBoundingClientRect(),l=no(),u,c,d=i??"top";if(!i&&a.top+s+r.height>l.height?(u=-1*r.height,d="bottom",a.top+u<0&&(u=-1*a.top)):u=s,r.width>l.width?c=a.left*-1:a.left+r.width>l.width?c=(a.left+r.width-l.width)*-1:c=0,t.style.top=u+"px",t.style.insetInlineStart=c+"px",t.style.transformOrigin=d,e){let h=(o=ln(/-anchor-gutter$/))==null?void 0:o.value;t.style.marginTop=d==="bottom"?`calc(${h??"2px"} * -1)`:h??""}}}function ns(t){if(t){let n=t.parentNode;return n&&n instanceof ShadowRoot&&n.host&&(n=n.host),n}return null}function bu(t){return!!(t!==null&&typeof t<"u"&&t.nodeName&&ns(t))}function Pt(t){return typeof Element<"u"?t instanceof Element:t!==null&&typeof t=="object"&&t.nodeType===1&&typeof t.nodeName=="string"}function is(t){let n=t;return t&&typeof t=="object"&&(Object.hasOwn(t,"current")?n=t.current:Object.hasOwn(t,"el")&&(Object.hasOwn(t.el,"nativeElement")?n=t.el.nativeElement:n=t.el)),Pt(n)?n:void 0}function yu(t,n){var e,i,o;if(t)switch(t){case"document":return document;case"window":return window;case"body":return document.body;case"@next":return n?.nextElementSibling;case"@prev":return n?.previousElementSibling;case"@first":return n?.firstElementChild;case"@last":return n?.lastElementChild;case"@child":return(e=n?.children)==null?void 0:e[0];case"@parent":return n?.parentElement;case"@grandparent":return(i=n?.parentElement)==null?void 0:i.parentElement;default:{if(typeof t=="string"){let a=t.match(/^@child\[(\d+)]/);return a?((o=n?.children)==null?void 0:o[parseInt(a[1],10)])||null:document.querySelector(t)||null}let r=(a=>typeof a=="function"&&"call"in a&&"apply"in a)(t)?t():t,s=is(r);return bu(s)?s:r?.nodeType===9?r:void 0}}}function Bh(t,n){let e=yu(t,n);if(e)e.appendChild(n);else throw new Error("Cannot append "+n+" to "+t)}var Ji;function $h(t){if(t){let n=getComputedStyle(t);return t.offsetHeight-t.clientHeight-parseFloat(n.borderTopWidth)-parseFloat(n.borderBottomWidth)}else{if(Ji!=null)return Ji;let n=document.createElement("div");ts(n,{width:"100px",height:"100px",overflow:"scroll",position:"absolute",top:"-9999px"}),document.body.appendChild(n);let e=n.offsetHeight-n.clientHeight;return document.body.removeChild(n),Ji=e,e}}var eo;function Zr(t){if(t){let n=getComputedStyle(t);return t.offsetWidth-t.clientWidth-parseFloat(n.borderLeftWidth)-parseFloat(n.borderRightWidth)}else{if(eo!=null)return eo;let n=document.createElement("div");ts(n,{width:"100px",height:"100px",overflow:"scroll",position:"absolute",top:"-9999px"}),document.body.appendChild(n);let e=n.offsetWidth-n.clientWidth;return document.body.removeChild(n),eo=e,e}}function jh(){if(window.getSelection){let t=window.getSelection()||{};t.empty?t.empty():t.removeAllRanges&&t.rangeCount>0&&t.getRangeAt(0).getClientRects().length>0&&t.removeAllRanges()}}function ni(t,n={}){if(Pt(t)){let e=(i,o)=>{var r,s;let a=(r=t?.$attrs)!=null&&r[i]?[(s=t?.$attrs)==null?void 0:s[i]]:[];return[o].flat().reduce((l,u)=>{if(u!=null){let c=typeof u;if(c==="string"||c==="number")l.push(u);else if(c==="object"){let d=Array.isArray(u)?e(i,u):Object.entries(u).map(([h,p])=>i==="style"&&(p||p===0)?`${h.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()}:${p}`:p?h:void 0);l=d.length?l.concat(d.filter(h=>!!h)):l}}return l},a)};Object.entries(n).forEach(([i,o])=>{if(o!=null){let r=i.match(/^on(.+)/);r?t.addEventListener(r[1].toLowerCase(),o):i==="p-bind"||i==="pBind"?ni(t,o):(o=i==="class"?[...new Set(e("class",o))].join(" ").trim():i==="style"?e("style",o).join(";").trim():o,(t.$attrs=t.$attrs||{})&&(t.$attrs[i]=o),t.setAttribute(i,o))}})}}function Uh(t,n={},...e){if(t){let i=document.createElement(t);return ni(i,n),i.append(...e),i}}function Hh(t,n){if(t){t.style.opacity="0";let e=+new Date,i="0",o=function(){i=`${+t.style.opacity+(new Date().getTime()-e)/n}`,t.style.opacity=i,e=+new Date,+i<1&&("requestAnimationFrame"in window?requestAnimationFrame(o):setTimeout(o,16))};o()}}function vu(t,n){return Pt(t)?Array.from(t.querySelectorAll(n)):[]}function Vt(t,n){return Pt(t)?t.matches(n)?t:t.querySelector(n):null}function zh(t,n){t&&document.activeElement!==t&&t.focus(n)}function Gh(t,n){if(Pt(t)){let e=t.getAttribute(n);return isNaN(e)?e==="true"||e==="false"?e==="true":e:+e}}function os(t,n=""){let e=vu(t,`button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${n},
            [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${n},
            input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${n},
            select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${n},
            textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${n},
            [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${n},
            [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${n}`),i=[];for(let o of e)getComputedStyle(o).display!="none"&&getComputedStyle(o).visibility!="hidden"&&i.push(o);return i}function Wh(t,n){let e=os(t,n);return e.length>0?e[0]:null}function oo(t){if(t){let n=t.offsetHeight,e=getComputedStyle(t);return n-=parseFloat(e.paddingTop)+parseFloat(e.paddingBottom)+parseFloat(e.borderTopWidth)+parseFloat(e.borderBottomWidth),n}return 0}function Du(t){if(t){let[n,e]=[t.style.visibility,t.style.display];t.style.visibility="hidden",t.style.display="block";let i=t.offsetHeight;return t.style.display=e,t.style.visibility=n,i}return 0}function Cu(t){if(t){let[n,e]=[t.style.visibility,t.style.display];t.style.visibility="hidden",t.style.display="block";let i=t.offsetWidth;return t.style.display=e,t.style.visibility=n,i}return 0}function Kh(t){var n;if(t){let e=(n=ns(t))==null?void 0:n.childNodes,i=0;if(e)for(let o=0;o<e.length;o++){if(e[o]===t)return i;e[o].nodeType===1&&i++}}return-1}function qh(t,n){let e=os(t,n);return e.length>0?e[e.length-1]:null}function ro(t){if(t){let n=t.getBoundingClientRect();return{top:n.top+(window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0),left:n.left+(window.pageXOffset||to(document.documentElement)||to(document.body)||0)}}return{top:"auto",left:"auto"}}function ii(t,n){if(t){let e=t.offsetHeight;if(n){let i=getComputedStyle(t);e+=parseFloat(i.marginTop)+parseFloat(i.marginBottom)}return e}return 0}function Yh(){if(window.getSelection)return window.getSelection().toString();if(document.getSelection)return document.getSelection().toString()}function so(t){if(t){let n=t.offsetWidth,e=getComputedStyle(t);return n-=parseFloat(e.paddingLeft)+parseFloat(e.paddingRight)+parseFloat(e.borderLeftWidth)+parseFloat(e.borderRightWidth),n}return 0}function Zh(){return/(android)/i.test(navigator.userAgent)}function Xh(t){return!!(t&&t.offsetParent!=null)}function Qh(){return/iPad|iPhone|iPod/.test(navigator.userAgent)&&!("MSStream"in window)}function Jh(){return"ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0}function ef(t,n){var e,i;if(t){let o=t.parentElement,r=ro(o),s=no(),a=t.offsetParent?t.offsetWidth:Cu(t),l=t.offsetParent?t.offsetHeight:Du(t),u=io((e=o?.children)==null?void 0:e[0]),c=ii((i=o?.children)==null?void 0:i[0]),d="",h="";r.left+u+a>s.width-Zr()?r.left<a?n%2===1?d=r.left?"-"+r.left+"px":"100%":n%2===0&&(d=s.width-a-Zr()+"px"):d="-100%":d="100%",t.getBoundingClientRect().top+c+l>s.height?h=`-${l-c}px`:h="0px",t.style.top=h,t.style.insetInlineStart=d}}function rs(t){var n;t&&("remove"in Element.prototype?t.remove():(n=t.parentNode)==null||n.removeChild(t))}function tf(t,n){let e=is(t);if(e)e.removeChild(n);else throw new Error("Cannot remove "+n+" from "+t)}function nf(t,n){let e=getComputedStyle(t).getPropertyValue("borderTopWidth"),i=e?parseFloat(e):0,o=getComputedStyle(t).getPropertyValue("paddingTop"),r=o?parseFloat(o):0,s=t.getBoundingClientRect(),a=n.getBoundingClientRect().top+document.body.scrollTop-(s.top+document.body.scrollTop)-i-r,l=t.scrollTop,u=t.clientHeight,c=ii(n);a<0?t.scrollTop=l+a:a+c>u&&(t.scrollTop=l+a-u+c)}function of(t,n="",e){Pt(t)&&e!==null&&e!==void 0&&t.setAttribute(n,e)}function ss(){let t=new Map;return{on(n,e){let i=t.get(n);return i?i.push(e):i=[e],t.set(n,i),this},off(n,e){let i=t.get(n);return i&&i.splice(i.indexOf(e)>>>0,1),this},emit(n,e){let i=t.get(n);i&&i.forEach(o=>{o(e)})},clear(){t.clear()}}}var _u=Object.defineProperty,as=Object.getOwnPropertySymbols,Eu=Object.prototype.hasOwnProperty,wu=Object.prototype.propertyIsEnumerable,ls=(t,n,e)=>n in t?_u(t,n,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[n]=e,Su=(t,n)=>{for(var e in n||(n={}))Eu.call(n,e)&&ls(t,e,n[e]);if(as)for(var e of as(n))wu.call(n,e)&&ls(t,e,n[e]);return t};function je(t){return t==null||t===""||Array.isArray(t)&&t.length===0||!(t instanceof Date)&&typeof t=="object"&&Object.keys(t).length===0}function ao(t,n,e=new WeakSet){if(t===n)return!0;if(!t||!n||typeof t!="object"||typeof n!="object"||e.has(t)||e.has(n))return!1;e.add(t).add(n);let i=Array.isArray(t),o=Array.isArray(n),r,s,a;if(i&&o){if(s=t.length,s!=n.length)return!1;for(r=s;r--!==0;)if(!ao(t[r],n[r],e))return!1;return!0}if(i!=o)return!1;let l=t instanceof Date,u=n instanceof Date;if(l!=u)return!1;if(l&&u)return t.getTime()==n.getTime();let c=t instanceof RegExp,d=n instanceof RegExp;if(c!=d)return!1;if(c&&d)return t.toString()==n.toString();let h=Object.keys(t);if(s=h.length,s!==Object.keys(n).length)return!1;for(r=s;r--!==0;)if(!Object.prototype.hasOwnProperty.call(n,h[r]))return!1;for(r=s;r--!==0;)if(a=h[r],!ao(t[a],n[a],e))return!1;return!0}function Au(t,n){return ao(t,n)}function cs(t){return typeof t=="function"&&"call"in t&&"apply"in t}function R(t){return!je(t)}function it(t,n){if(!t||!n)return null;try{let e=t[n];if(R(e))return e}catch{}if(Object.keys(t).length){if(cs(n))return n(t);if(n.indexOf(".")===-1)return t[n];{let e=n.split("."),i=t;for(let o=0,r=e.length;o<r;++o){if(i==null)return null;i=i[e[o]]}return i}}return null}function Ue(t,n,e){return e?it(t,e)===it(n,e):Au(t,n)}function ds(t,n){if(t!=null&&n&&n.length){for(let e of n)if(Ue(t,e))return!0}return!1}function ke(t,n=!0){return t instanceof Object&&t.constructor===Object&&(n||Object.keys(t).length!==0)}function ps(t={},n={}){let e=Su({},t);return Object.keys(n).forEach(i=>{let o=i;ke(n[o])&&o in t&&ke(t[o])?e[o]=ps(t[o],n[o]):e[o]=n[o]}),e}function lo(...t){return t.reduce((n,e,i)=>i===0?e:ps(n,e),{})}function af(t,n){let e=-1;if(n){for(let i=0;i<n.length;i++)if(n[i]===t){e=i;break}}return e}function lf(t,n){let e;if(R(t))try{e=t.findLast(n)}catch{e=[...t].reverse().find(n)}return e}function uf(t,n){let e=-1;if(R(t))try{e=t.findLastIndex(n)}catch{e=t.lastIndexOf([...t].reverse().find(n))}return e}function be(t,...n){return cs(t)?t(...n):t}function ot(t,n=!0){return typeof t=="string"&&(n||t!=="")}function us(t){return ot(t)?t.replace(/(-|_)/g,"").toLowerCase():t}function oi(t,n="",e={}){let i=us(n).split("."),o=i.shift();if(o){if(ke(t)){let r=Object.keys(t).find(s=>us(s)===o)||"";return oi(be(t[r],e),i.join("."),e)}return}return be(t,e)}function Fu(t,n=!0){return Array.isArray(t)&&(n||t.length!==0)}function cf(t){return t instanceof Date}function hs(t){return R(t)&&!isNaN(t)}function df(t=""){return R(t)&&t.length===1&&!!t.match(/\S| /)}function Ne(t,n){if(n){let e=n.test(t);return n.lastIndex=0,e}return!1}function uo(...t){return lo(...t)}function yt(t){return t&&t.replace(/\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g,"").replace(/ {2,}/g," ").replace(/ ([{:}]) /g,"$1").replace(/([;,]) /g,"$1").replace(/ !/g,"!").replace(/: /g,":").trim()}function ve(t){if(t&&/[\xC0-\xFF\u0100-\u017E]/.test(t)){let n={A:/[\xC0-\xC5\u0100\u0102\u0104]/g,AE:/[\xC6]/g,C:/[\xC7\u0106\u0108\u010A\u010C]/g,D:/[\xD0\u010E\u0110]/g,E:/[\xC8-\xCB\u0112\u0114\u0116\u0118\u011A]/g,G:/[\u011C\u011E\u0120\u0122]/g,H:/[\u0124\u0126]/g,I:/[\xCC-\xCF\u0128\u012A\u012C\u012E\u0130]/g,IJ:/[\u0132]/g,J:/[\u0134]/g,K:/[\u0136]/g,L:/[\u0139\u013B\u013D\u013F\u0141]/g,N:/[\xD1\u0143\u0145\u0147\u014A]/g,O:/[\xD2-\xD6\xD8\u014C\u014E\u0150]/g,OE:/[\u0152]/g,R:/[\u0154\u0156\u0158]/g,S:/[\u015A\u015C\u015E\u0160]/g,T:/[\u0162\u0164\u0166]/g,U:/[\xD9-\xDC\u0168\u016A\u016C\u016E\u0170\u0172]/g,W:/[\u0174]/g,Y:/[\xDD\u0176\u0178]/g,Z:/[\u0179\u017B\u017D]/g,a:/[\xE0-\xE5\u0101\u0103\u0105]/g,ae:/[\xE6]/g,c:/[\xE7\u0107\u0109\u010B\u010D]/g,d:/[\u010F\u0111]/g,e:/[\xE8-\xEB\u0113\u0115\u0117\u0119\u011B]/g,g:/[\u011D\u011F\u0121\u0123]/g,i:/[\xEC-\xEF\u0129\u012B\u012D\u012F\u0131]/g,ij:/[\u0133]/g,j:/[\u0135]/g,k:/[\u0137,\u0138]/g,l:/[\u013A\u013C\u013E\u0140\u0142]/g,n:/[\xF1\u0144\u0146\u0148\u014B]/g,p:/[\xFE]/g,o:/[\xF2-\xF6\xF8\u014D\u014F\u0151]/g,oe:/[\u0153]/g,r:/[\u0155\u0157\u0159]/g,s:/[\u015B\u015D\u015F\u0161]/g,t:/[\u0163\u0165\u0167]/g,u:/[\xF9-\xFC\u0169\u016B\u016D\u016F\u0171\u0173]/g,w:/[\u0175]/g,y:/[\xFD\xFF\u0177]/g,z:/[\u017A\u017C\u017E]/g};for(let e in n)t=t.replace(n[e],e)}return t}function pf(t,n,e){t&&n!==e&&(e>=t.length&&(e%=t.length,n%=t.length),t.splice(e,0,t.splice(n,1)[0]))}function ri(t){return ot(t)?t.replace(/(_)/g,"-").replace(/[A-Z]/g,(n,e)=>e===0?n:"-"+n.toLowerCase()).toLowerCase():t}var si={};function un(t="pui_id_"){return Object.hasOwn(si,t)||(si[t]=0),si[t]++,`${t}${si[t]}`}var fs=["*"],Tu=function(t){return t[t.ACCEPT=0]="ACCEPT",t[t.REJECT=1]="REJECT",t[t.CANCEL=2]="CANCEL",t}(Tu||{}),yf=(()=>{class t{requireConfirmationSource=new pe;acceptConfirmationSource=new pe;requireConfirmation$=this.requireConfirmationSource.asObservable();accept=this.acceptConfirmationSource.asObservable();confirm(e){return this.requireConfirmationSource.next(e),this}close(){return this.requireConfirmationSource.next(null),this}onAccept(){this.acceptConfirmationSource.next(null)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=v({token:t,factory:t.\u0275fac})}return t})();var te=(()=>{class t{static STARTS_WITH="startsWith";static CONTAINS="contains";static NOT_CONTAINS="notContains";static ENDS_WITH="endsWith";static EQUALS="equals";static NOT_EQUALS="notEquals";static IN="in";static LESS_THAN="lt";static LESS_THAN_OR_EQUAL_TO="lte";static GREATER_THAN="gt";static GREATER_THAN_OR_EQUAL_TO="gte";static BETWEEN="between";static IS="is";static IS_NOT="isNot";static BEFORE="before";static AFTER="after";static DATE_IS="dateIs";static DATE_IS_NOT="dateIsNot";static DATE_BEFORE="dateBefore";static DATE_AFTER="dateAfter"}return t})(),vf=(()=>{class t{static AND="and";static OR="or"}return t})(),Df=(()=>{class t{filter(e,i,o,r,s){let a=[];if(e)for(let l of e)for(let u of i){let c=it(l,u);if(this.filters[r](c,o,s)){a.push(l);break}}return a}filters={startsWith:(e,i,o)=>{if(i==null||i.trim()==="")return!0;if(e==null)return!1;let r=ve(i.toString()).toLocaleLowerCase(o);return ve(e.toString()).toLocaleLowerCase(o).slice(0,r.length)===r},contains:(e,i,o)=>{if(i==null||typeof i=="string"&&i.trim()==="")return!0;if(e==null)return!1;let r=ve(i.toString()).toLocaleLowerCase(o);return ve(e.toString()).toLocaleLowerCase(o).indexOf(r)!==-1},notContains:(e,i,o)=>{if(i==null||typeof i=="string"&&i.trim()==="")return!0;if(e==null)return!1;let r=ve(i.toString()).toLocaleLowerCase(o);return ve(e.toString()).toLocaleLowerCase(o).indexOf(r)===-1},endsWith:(e,i,o)=>{if(i==null||i.trim()==="")return!0;if(e==null)return!1;let r=ve(i.toString()).toLocaleLowerCase(o),s=ve(e.toString()).toLocaleLowerCase(o);return s.indexOf(r,s.length-r.length)!==-1},equals:(e,i,o)=>i==null||typeof i=="string"&&i.trim()===""?!0:e==null?!1:e.getTime&&i.getTime?e.getTime()===i.getTime():e==i?!0:ve(e.toString()).toLocaleLowerCase(o)==ve(i.toString()).toLocaleLowerCase(o),notEquals:(e,i,o)=>i==null||typeof i=="string"&&i.trim()===""?!1:e==null?!0:e.getTime&&i.getTime?e.getTime()!==i.getTime():e==i?!1:ve(e.toString()).toLocaleLowerCase(o)!=ve(i.toString()).toLocaleLowerCase(o),in:(e,i)=>{if(i==null||i.length===0)return!0;for(let o=0;o<i.length;o++)if(Ue(e,i[o]))return!0;return!1},between:(e,i)=>i==null||i[0]==null||i[1]==null?!0:e==null?!1:e.getTime?i[0].getTime()<=e.getTime()&&e.getTime()<=i[1].getTime():i[0]<=e&&e<=i[1],lt:(e,i,o)=>i==null?!0:e==null?!1:e.getTime&&i.getTime?e.getTime()<i.getTime():e<i,lte:(e,i,o)=>i==null?!0:e==null?!1:e.getTime&&i.getTime?e.getTime()<=i.getTime():e<=i,gt:(e,i,o)=>i==null?!0:e==null?!1:e.getTime&&i.getTime?e.getTime()>i.getTime():e>i,gte:(e,i,o)=>i==null?!0:e==null?!1:e.getTime&&i.getTime?e.getTime()>=i.getTime():e>=i,is:(e,i,o)=>this.filters.equals(e,i,o),isNot:(e,i,o)=>this.filters.notEquals(e,i,o),before:(e,i,o)=>this.filters.lt(e,i,o),after:(e,i,o)=>this.filters.gt(e,i,o),dateIs:(e,i)=>i==null?!0:e==null?!1:e.toDateString()===i.toDateString(),dateIsNot:(e,i)=>i==null?!0:e==null?!1:e.toDateString()!==i.toDateString(),dateBefore:(e,i)=>i==null?!0:e==null?!1:e.getTime()<i.getTime(),dateAfter:(e,i)=>i==null?!0:e==null?!1:(e.setHours(0,0,0,0),e.getTime()>i.getTime())};register(e,i){this.filters[e]=i}static \u0275fac=function(i){return new(i||t)};static \u0275prov=v({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),Cf=(()=>{class t{messageSource=new pe;clearSource=new pe;messageObserver=this.messageSource.asObservable();clearObserver=this.clearSource.asObservable();add(e){e&&this.messageSource.next(e)}addAll(e){e&&e.length&&this.messageSource.next(e)}clear(e){this.clearSource.next(e||null)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=v({token:t,factory:t.\u0275fac})}return t})(),_f=(()=>{class t{clickSource=new pe;clickObservable=this.clickSource.asObservable();add(e){e&&this.clickSource.next(e)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=v({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var Ef=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275cmp=W({type:t,selectors:[["p-header"]],standalone:!1,ngContentSelectors:fs,decls:1,vars:0,template:function(i,o){i&1&&(Ge(),We(0))},encapsulation:2})}return t})(),wf=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275cmp=W({type:t,selectors:[["p-footer"]],standalone:!1,ngContentSelectors:fs,decls:1,vars:0,template:function(i,o){i&1&&(Ge(),We(0))},encapsulation:2})}return t})(),rt=(()=>{class t{template;type;name;constructor(e){this.template=e}getType(){return this.name}static \u0275fac=function(i){return new(i||t)(D(Et))};static \u0275dir=w({type:t,selectors:[["","pTemplate",""]],inputs:{type:"type",name:[0,"pTemplate","name"]}})}return t})(),Z=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=P({type:t});static \u0275inj=L({imports:[ue]})}return t})(),Sf=(()=>{class t{static STARTS_WITH="startsWith";static CONTAINS="contains";static NOT_CONTAINS="notContains";static ENDS_WITH="endsWith";static EQUALS="equals";static NOT_EQUALS="notEquals";static NO_FILTER="noFilter";static LT="lt";static LTE="lte";static GT="gt";static GTE="gte";static IS="is";static IS_NOT="isNot";static BEFORE="before";static AFTER="after";static CLEAR="clear";static APPLY="apply";static MATCH_ALL="matchAll";static MATCH_ANY="matchAny";static ADD_RULE="addRule";static REMOVE_RULE="removeRule";static ACCEPT="accept";static REJECT="reject";static CHOOSE="choose";static UPLOAD="upload";static CANCEL="cancel";static PENDING="pending";static FILE_SIZE_TYPES="fileSizeTypes";static DAY_NAMES="dayNames";static DAY_NAMES_SHORT="dayNamesShort";static DAY_NAMES_MIN="dayNamesMin";static MONTH_NAMES="monthNames";static MONTH_NAMES_SHORT="monthNamesShort";static FIRST_DAY_OF_WEEK="firstDayOfWeek";static TODAY="today";static WEEK_HEADER="weekHeader";static WEAK="weak";static MEDIUM="medium";static STRONG="strong";static PASSWORD_PROMPT="passwordPrompt";static EMPTY_MESSAGE="emptyMessage";static EMPTY_FILTER_MESSAGE="emptyFilterMessage";static SHOW_FILTER_MENU="showFilterMenu";static HIDE_FILTER_MENU="hideFilterMenu";static SELECTION_MESSAGE="selectionMessage";static ARIA="aria";static SELECT_COLOR="selectColor";static BROWSE_FILES="browseFiles"}return t})(),Af=(()=>{class t{dragStartSource=new pe;dragStopSource=new pe;dragStart$=this.dragStartSource.asObservable();dragStop$=this.dragStopSource.asObservable();startDrag(e){this.dragStartSource.next(e)}stopDrag(e){this.dragStopSource.next(e)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=v({token:t,factory:t.\u0275fac})}return t})();var xu=Object.defineProperty,Iu=Object.defineProperties,Mu=Object.getOwnPropertyDescriptors,ai=Object.getOwnPropertySymbols,bs=Object.prototype.hasOwnProperty,ys=Object.prototype.propertyIsEnumerable,gs=(t,n,e)=>n in t?xu(t,n,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[n]=e,z=(t,n)=>{for(var e in n||(n={}))bs.call(n,e)&&gs(t,e,n[e]);if(ai)for(var e of ai(n))ys.call(n,e)&&gs(t,e,n[e]);return t},$t=(t,n)=>Iu(t,Mu(n)),Je=(t,n)=>{var e={};for(var i in t)bs.call(t,i)&&n.indexOf(i)<0&&(e[i]=t[i]);if(t!=null&&ai)for(var i of ai(t))n.indexOf(i)<0&&ys.call(t,i)&&(e[i]=t[i]);return e};var Ou=ss(),De=Ou,cn=/{([^}]*)}/g,vs=/(\d+\s+[\+\-\*\/]\s+\d+)/g,Ds=/var\([^)]+\)/g;function ms(t){return ot(t)?t.replace(/[A-Z]/g,(n,e)=>e===0?n:"."+n.toLowerCase()).toLowerCase():t}function ku(t){return ke(t)&&t.hasOwnProperty("$value")&&t.hasOwnProperty("$type")?t.$value:t}function Nu(t){return t.replaceAll(/ /g,"").replace(/[^\w]/g,"-")}function co(t="",n=""){return Nu(`${ot(t,!1)&&ot(n,!1)?`${t}-`:t}${n}`)}function Cs(t="",n=""){return`--${co(t,n)}`}function Ru(t=""){let n=(t.match(/{/g)||[]).length,e=(t.match(/}/g)||[]).length;return(n+e)%2!==0}function _s(t,n="",e="",i=[],o){if(ot(t)){let r=t.trim();if(Ru(r))return;if(Ne(r,cn)){let s=r.replaceAll(cn,a=>{let l=a.replace(/{|}/g,"").split(".").filter(u=>!i.some(c=>Ne(u,c)));return`var(${Cs(e,ri(l.join("-")))}${R(o)?`, ${o}`:""})`});return Ne(s.replace(Ds,"0"),vs)?`calc(${s})`:s}return r}else if(hs(t))return t}function Lu(t,n,e){ot(n,!1)&&t.push(`${n}:${e};`)}function Bt(t,n){return t?`${t}{${n}}`:""}function Es(t,n){if(t.indexOf("dt(")===-1)return t;function e(s,a){let l=[],u=0,c="",d=null,h=0;for(;u<=s.length;){let p=s[u];if((p==='"'||p==="'"||p==="`")&&s[u-1]!=="\\"&&(d=d===p?null:p),!d&&(p==="("&&h++,p===")"&&h--,(p===","||u===s.length)&&h===0)){let m=c.trim();m.startsWith("dt(")?l.push(Es(m,a)):l.push(i(m)),c="",u++;continue}p!==void 0&&(c+=p),u++}return l}function i(s){let a=s[0];if((a==='"'||a==="'"||a==="`")&&s[s.length-1]===a)return s.slice(1,-1);let l=Number(s);return isNaN(l)?s:l}let o=[],r=[];for(let s=0;s<t.length;s++)if(t[s]==="d"&&t.slice(s,s+3)==="dt(")r.push(s),s+=2;else if(t[s]===")"&&r.length>0){let a=r.pop();r.length===0&&o.push([a,s])}if(!o.length)return t;for(let s=o.length-1;s>=0;s--){let[a,l]=o[s],u=t.slice(a+3,l),c=e(u,n),d=n(...c);t=t.slice(0,a)+d+t.slice(l+1)}return t}var ho=t=>{var n;let e=T.getTheme(),i=po(e,t,void 0,"variable"),o=(n=i?.match(/--[\w-]+/g))==null?void 0:n[0],r=po(e,t,void 0,"value");return{name:o,variable:i,value:r}},et=(...t)=>po(T.getTheme(),...t),po=(t={},n,e,i)=>{if(n){let{variable:o,options:r}=T.defaults||{},{prefix:s,transform:a}=t?.options||r||{},l=Ne(n,cn)?n:`{${n}}`;return i==="value"||je(i)&&a==="strict"?T.getTokenValue(n):_s(l,void 0,s,[o.excludedKeyRegex],e)}return""};function jt(t,...n){if(t instanceof Array){let e=t.reduce((i,o,r)=>{var s;return i+o+((s=be(n[r],{dt:et}))!=null?s:"")},"");return Es(e,et)}return be(t,{dt:et})}var Pu=(t={})=>{let{preset:n,options:e}=t;return{preset(i){return n=n?uo(n,i):i,this},options(i){return e=e?z(z({},e),i):i,this},primaryPalette(i){let{semantic:o}=n||{};return n=$t(z({},n),{semantic:$t(z({},o),{primary:i})}),this},surfacePalette(i){var o,r;let{semantic:s}=n||{},a=i&&Object.hasOwn(i,"light")?i.light:i,l=i&&Object.hasOwn(i,"dark")?i.dark:i,u={colorScheme:{light:z(z({},(o=s?.colorScheme)==null?void 0:o.light),!!a&&{surface:a}),dark:z(z({},(r=s?.colorScheme)==null?void 0:r.dark),!!l&&{surface:l})}};return n=$t(z({},n),{semantic:z(z({},s),u)}),this},define({useDefaultPreset:i=!1,useDefaultOptions:o=!1}={}){return{preset:i?T.getPreset():n,options:o?T.getOptions():e}},update({mergePresets:i=!0,mergeOptions:o=!0}={}){let r={preset:i?uo(T.getPreset(),n):n,options:o?z(z({},T.getOptions()),e):e};return T.setTheme(r),r},use(i){let o=this.define(i);return T.setTheme(o),o}}};function Vu(t,n={}){let e=T.defaults.variable,{prefix:i=e.prefix,selector:o=e.selector,excludedKeyRegex:r=e.excludedKeyRegex}=n,s=[],a=[],l=[{node:t,path:i}];for(;l.length;){let{node:c,path:d}=l.pop();for(let h in c){let p=c[h],m=ku(p),E=Ne(h,r)?co(d):co(d,ri(h));if(ke(m))l.push({node:m,path:E});else{let g=Cs(E),b=_s(m,E,i,[r]);Lu(a,g,b);let A=E;i&&A.startsWith(i+"-")&&(A=A.slice(i.length+1)),s.push(A.replace(/-/g,"."))}}}let u=a.join("");return{value:a,tokens:s,declarations:u,css:Bt(o,u)}}var Re={regex:{rules:{class:{pattern:/^\.([a-zA-Z][\w-]*)$/,resolve(t){return{type:"class",selector:t,matched:this.pattern.test(t.trim())}}},attr:{pattern:/^\[(.*)\]$/,resolve(t){return{type:"attr",selector:`:root${t}`,matched:this.pattern.test(t.trim())}}},media:{pattern:/^@media (.*)$/,resolve(t){return{type:"media",selector:t,matched:this.pattern.test(t.trim())}}},system:{pattern:/^system$/,resolve(t){return{type:"system",selector:"@media (prefers-color-scheme: dark)",matched:this.pattern.test(t.trim())}}},custom:{resolve(t){return{type:"custom",selector:t,matched:!0}}}},resolve(t){let n=Object.keys(this.rules).filter(e=>e!=="custom").map(e=>this.rules[e]);return[t].flat().map(e=>{var i;return(i=n.map(o=>o.resolve(e)).find(o=>o.matched))!=null?i:this.rules.custom.resolve(e)})}},_toVariables(t,n){return Vu(t,{prefix:n?.prefix})},getCommon({name:t="",theme:n={},params:e,set:i,defaults:o}){var r,s,a,l,u,c,d;let{preset:h,options:p}=n,m,E,g,b,A,B,I;if(R(h)&&p.transform!=="strict"){let{primitive:ye,semantic:_e,extend:Pe}=h,tt=_e||{},{colorScheme:bn}=tt,yn=Je(tt,["colorScheme"]),vn=Pe||{},{colorScheme:Dn}=vn,Kt=Je(vn,["colorScheme"]),qt=bn||{},{dark:Cn}=qt,_n=Je(qt,["dark"]),En=Dn||{},{dark:wn}=En,Sn=Je(En,["dark"]),An=R(ye)?this._toVariables({primitive:ye},p):{},Fn=R(yn)?this._toVariables({semantic:yn},p):{},Tn=R(_n)?this._toVariables({light:_n},p):{},xo=R(Cn)?this._toVariables({dark:Cn},p):{},Io=R(Kt)?this._toVariables({semantic:Kt},p):{},Mo=R(Sn)?this._toVariables({light:Sn},p):{},Oo=R(wn)?this._toVariables({dark:wn},p):{},[ja,Ua]=[(r=An.declarations)!=null?r:"",An.tokens],[Ha,za]=[(s=Fn.declarations)!=null?s:"",Fn.tokens||[]],[Ga,Wa]=[(a=Tn.declarations)!=null?a:"",Tn.tokens||[]],[Ka,qa]=[(l=xo.declarations)!=null?l:"",xo.tokens||[]],[Ya,Za]=[(u=Io.declarations)!=null?u:"",Io.tokens||[]],[Xa,Qa]=[(c=Mo.declarations)!=null?c:"",Mo.tokens||[]],[Ja,el]=[(d=Oo.declarations)!=null?d:"",Oo.tokens||[]];m=this.transformCSS(t,ja,"light","variable",p,i,o),E=Ua;let tl=this.transformCSS(t,`${Ha}${Ga}`,"light","variable",p,i,o),nl=this.transformCSS(t,`${Ka}`,"dark","variable",p,i,o);g=`${tl}${nl}`,b=[...new Set([...za,...Wa,...qa])];let il=this.transformCSS(t,`${Ya}${Xa}color-scheme:light`,"light","variable",p,i,o),ol=this.transformCSS(t,`${Ja}color-scheme:dark`,"dark","variable",p,i,o);A=`${il}${ol}`,B=[...new Set([...Za,...Qa,...el])],I=be(h.css,{dt:et})}return{primitive:{css:m,tokens:E},semantic:{css:g,tokens:b},global:{css:A,tokens:B},style:I}},getPreset({name:t="",preset:n={},options:e,params:i,set:o,defaults:r,selector:s}){var a,l,u;let c,d,h;if(R(n)&&e.transform!=="strict"){let p=t.replace("-directive",""),m=n,{colorScheme:E,extend:g,css:b}=m,A=Je(m,["colorScheme","extend","css"]),B=g||{},{colorScheme:I}=B,ye=Je(B,["colorScheme"]),_e=E||{},{dark:Pe}=_e,tt=Je(_e,["dark"]),bn=I||{},{dark:yn}=bn,vn=Je(bn,["dark"]),Dn=R(A)?this._toVariables({[p]:z(z({},A),ye)},e):{},Kt=R(tt)?this._toVariables({[p]:z(z({},tt),vn)},e):{},qt=R(Pe)?this._toVariables({[p]:z(z({},Pe),yn)},e):{},[Cn,_n]=[(a=Dn.declarations)!=null?a:"",Dn.tokens||[]],[En,wn]=[(l=Kt.declarations)!=null?l:"",Kt.tokens||[]],[Sn,An]=[(u=qt.declarations)!=null?u:"",qt.tokens||[]],Fn=this.transformCSS(p,`${Cn}${En}`,"light","variable",e,o,r,s),Tn=this.transformCSS(p,Sn,"dark","variable",e,o,r,s);c=`${Fn}${Tn}`,d=[...new Set([..._n,...wn,...An])],h=be(b,{dt:et})}return{css:c,tokens:d,style:h}},getPresetC({name:t="",theme:n={},params:e,set:i,defaults:o}){var r;let{preset:s,options:a}=n,l=(r=s?.components)==null?void 0:r[t];return this.getPreset({name:t,preset:l,options:a,params:e,set:i,defaults:o})},getPresetD({name:t="",theme:n={},params:e,set:i,defaults:o}){var r,s;let a=t.replace("-directive",""),{preset:l,options:u}=n,c=((r=l?.components)==null?void 0:r[a])||((s=l?.directives)==null?void 0:s[a]);return this.getPreset({name:a,preset:c,options:u,params:e,set:i,defaults:o})},applyDarkColorScheme(t){return!(t.darkModeSelector==="none"||t.darkModeSelector===!1)},getColorSchemeOption(t,n){var e;return this.applyDarkColorScheme(t)?this.regex.resolve(t.darkModeSelector===!0?n.options.darkModeSelector:(e=t.darkModeSelector)!=null?e:n.options.darkModeSelector):[]},getLayerOrder(t,n={},e,i){let{cssLayer:o}=n;return o?`@layer ${be(o.order||o.name||"primeui",e)}`:""},getCommonStyleSheet({name:t="",theme:n={},params:e,props:i={},set:o,defaults:r}){let s=this.getCommon({name:t,theme:n,params:e,set:o,defaults:r}),a=Object.entries(i).reduce((l,[u,c])=>l.push(`${u}="${c}"`)&&l,[]).join(" ");return Object.entries(s||{}).reduce((l,[u,c])=>{if(ke(c)&&Object.hasOwn(c,"css")){let d=yt(c.css),h=`${u}-variables`;l.push(`<style type="text/css" data-primevue-style-id="${h}" ${a}>${d}</style>`)}return l},[]).join("")},getStyleSheet({name:t="",theme:n={},params:e,props:i={},set:o,defaults:r}){var s;let a={name:t,theme:n,params:e,set:o,defaults:r},l=(s=t.includes("-directive")?this.getPresetD(a):this.getPresetC(a))==null?void 0:s.css,u=Object.entries(i).reduce((c,[d,h])=>c.push(`${d}="${h}"`)&&c,[]).join(" ");return l?`<style type="text/css" data-primevue-style-id="${t}-variables" ${u}>${yt(l)}</style>`:""},createTokens(t={},n,e="",i="",o={}){let r=function(a,l={},u=[]){if(u.includes(this.path))return console.warn(`Circular reference detected at ${this.path}`),{colorScheme:a,path:this.path,paths:l,value:void 0};u.push(this.path),l.name=this.path,l.binding||(l.binding={});let c=this.value;if(typeof this.value=="string"&&cn.test(this.value)){let d=this.value.trim().replace(cn,h=>{var p;let m=h.slice(1,-1),E=this.tokens[m];if(!E)return console.warn(`Token not found for path: ${m}`),"__UNRESOLVED__";let g=E.computed(a,l,u);return Array.isArray(g)&&g.length===2?`light-dark(${g[0].value},${g[1].value})`:(p=g?.value)!=null?p:"__UNRESOLVED__"});c=vs.test(d.replace(Ds,"0"))?`calc(${d})`:d}return je(l.binding)&&delete l.binding,u.pop(),{colorScheme:a,path:this.path,paths:l,value:c.includes("__UNRESOLVED__")?void 0:c}},s=(a,l,u)=>{Object.entries(a).forEach(([c,d])=>{let h=Ne(c,n.variable.excludedKeyRegex)?l:l?`${l}.${ms(c)}`:ms(c),p=u?`${u}.${c}`:c;ke(d)?s(d,h,p):(o[h]||(o[h]={paths:[],computed:(m,E={},g=[])=>{if(o[h].paths.length===1)return o[h].paths[0].computed(o[h].paths[0].scheme,E.binding,g);if(m&&m!=="none")for(let b=0;b<o[h].paths.length;b++){let A=o[h].paths[b];if(A.scheme===m)return A.computed(m,E.binding,g)}return o[h].paths.map(b=>b.computed(b.scheme,E[b.scheme],g))}}),o[h].paths.push({path:p,value:d,scheme:p.includes("colorScheme.light")?"light":p.includes("colorScheme.dark")?"dark":"none",computed:r,tokens:o}))})};return s(t,e,i),o},getTokenValue(t,n,e){var i;let o=(a=>a.split(".").filter(l=>!Ne(l.toLowerCase(),e.variable.excludedKeyRegex)).join("."))(n),r=n.includes("colorScheme.light")?"light":n.includes("colorScheme.dark")?"dark":void 0,s=[(i=t[o])==null?void 0:i.computed(r)].flat().filter(a=>a);return s.length===1?s[0].value:s.reduce((a={},l)=>{let u=l,{colorScheme:c}=u,d=Je(u,["colorScheme"]);return a[c]=d,a},void 0)},getSelectorRule(t,n,e,i){return e==="class"||e==="attr"?Bt(R(n)?`${t}${n},${t} ${n}`:t,i):Bt(t,Bt(n??":root",i))},transformCSS(t,n,e,i,o={},r,s,a){if(R(n)){let{cssLayer:l}=o;if(i!=="style"){let u=this.getColorSchemeOption(o,s);n=e==="dark"?u.reduce((c,{type:d,selector:h})=>(R(h)&&(c+=h.includes("[CSS]")?h.replace("[CSS]",n):this.getSelectorRule(h,a,d,n)),c),""):Bt(a??":root",n)}if(l){let u={name:"primeui",order:"primeui"};ke(l)&&(u.name=be(l.name,{name:t,type:i})),R(u.name)&&(n=Bt(`@layer ${u.name}`,n),r?.layerNames(u.name))}return n}return""}},T={defaults:{variable:{prefix:"p",selector:":root",excludedKeyRegex:/^(primitive|semantic|components|directives|variables|colorscheme|light|dark|common|root|states|extend|css)$/gi},options:{prefix:"p",darkModeSelector:"system",cssLayer:!1}},_theme:void 0,_layerNames:new Set,_loadedStyleNames:new Set,_loadingStyles:new Set,_tokens:{},update(t={}){let{theme:n}=t;n&&(this._theme=$t(z({},n),{options:z(z({},this.defaults.options),n.options)}),this._tokens=Re.createTokens(this.preset,this.defaults),this.clearLoadedStyleNames())},get theme(){return this._theme},get preset(){var t;return((t=this.theme)==null?void 0:t.preset)||{}},get options(){var t;return((t=this.theme)==null?void 0:t.options)||{}},get tokens(){return this._tokens},getTheme(){return this.theme},setTheme(t){this.update({theme:t}),De.emit("theme:change",t)},getPreset(){return this.preset},setPreset(t){this._theme=$t(z({},this.theme),{preset:t}),this._tokens=Re.createTokens(t,this.defaults),this.clearLoadedStyleNames(),De.emit("preset:change",t),De.emit("theme:change",this.theme)},getOptions(){return this.options},setOptions(t){this._theme=$t(z({},this.theme),{options:t}),this.clearLoadedStyleNames(),De.emit("options:change",t),De.emit("theme:change",this.theme)},getLayerNames(){return[...this._layerNames]},setLayerNames(t){this._layerNames.add(t)},getLoadedStyleNames(){return this._loadedStyleNames},isStyleNameLoaded(t){return this._loadedStyleNames.has(t)},setLoadedStyleName(t){this._loadedStyleNames.add(t)},deleteLoadedStyleName(t){this._loadedStyleNames.delete(t)},clearLoadedStyleNames(){this._loadedStyleNames.clear()},getTokenValue(t){return Re.getTokenValue(this.tokens,t,this.defaults)},getCommon(t="",n){return Re.getCommon({name:t,theme:this.theme,params:n,defaults:this.defaults,set:{layerNames:this.setLayerNames.bind(this)}})},getComponent(t="",n){let e={name:t,theme:this.theme,params:n,defaults:this.defaults,set:{layerNames:this.setLayerNames.bind(this)}};return Re.getPresetC(e)},getDirective(t="",n){let e={name:t,theme:this.theme,params:n,defaults:this.defaults,set:{layerNames:this.setLayerNames.bind(this)}};return Re.getPresetD(e)},getCustomPreset(t="",n,e,i){let o={name:t,preset:n,options:this.options,selector:e,params:i,defaults:this.defaults,set:{layerNames:this.setLayerNames.bind(this)}};return Re.getPreset(o)},getLayerOrderCSS(t=""){return Re.getLayerOrder(t,this.options,{names:this.getLayerNames()},this.defaults)},transformCSS(t="",n,e="style",i){return Re.transformCSS(t,n,i,e,this.options,{layerNames:this.setLayerNames.bind(this)},this.defaults)},getCommonStyleSheet(t="",n,e={}){return Re.getCommonStyleSheet({name:t,theme:this.theme,params:n,props:e,defaults:this.defaults,set:{layerNames:this.setLayerNames.bind(this)}})},getStyleSheet(t,n,e={}){return Re.getStyleSheet({name:t,theme:this.theme,params:n,props:e,defaults:this.defaults,set:{layerNames:this.setLayerNames.bind(this)}})},onStyleMounted(t){this._loadingStyles.add(t)},onStyleUpdated(t){this._loadingStyles.add(t)},onStyleLoaded(t,{name:n}){this._loadingStyles.size&&(this._loadingStyles.delete(n),De.emit(`theme:${n}:load`,t),!this._loadingStyles.size&&De.emit("theme:load"))}};function Lf(...t){let n=lo(T.getPreset(),...t);return T.setPreset(n),n}function Pf(t){return Pu().surfacePalette(t).update().preset}var ws=`
    *,
    ::before,
    ::after {
        box-sizing: border-box;
    }

    /* Non vue overlay animations */
    .p-connected-overlay {
        opacity: 0;
        transform: scaleY(0.8);
        transition:
            transform 0.12s cubic-bezier(0, 0, 0.2, 1),
            opacity 0.12s cubic-bezier(0, 0, 0.2, 1);
    }

    .p-connected-overlay-visible {
        opacity: 1;
        transform: scaleY(1);
    }

    .p-connected-overlay-hidden {
        opacity: 0;
        transform: scaleY(1);
        transition: opacity 0.1s linear;
    }

    /* Vue based overlay animations */
    .p-connected-overlay-enter-from {
        opacity: 0;
        transform: scaleY(0.8);
    }

    .p-connected-overlay-leave-to {
        opacity: 0;
    }

    .p-connected-overlay-enter-active {
        transition:
            transform 0.12s cubic-bezier(0, 0, 0.2, 1),
            opacity 0.12s cubic-bezier(0, 0, 0.2, 1);
    }

    .p-connected-overlay-leave-active {
        transition: opacity 0.1s linear;
    }

    /* Toggleable Content */
    .p-toggleable-content-enter-from,
    .p-toggleable-content-leave-to {
        max-height: 0;
    }

    .p-toggleable-content-enter-to,
    .p-toggleable-content-leave-from {
        max-height: 1000px;
    }

    .p-toggleable-content-leave-active {
        overflow: hidden;
        transition: max-height 0.45s cubic-bezier(0, 1, 0, 1);
    }

    .p-toggleable-content-enter-active {
        overflow: hidden;
        transition: max-height 1s ease-in-out;
    }

    .p-disabled,
    .p-disabled * {
        cursor: default;
        pointer-events: none;
        user-select: none;
    }

    .p-disabled,
    .p-component:disabled {
        opacity: dt('disabled.opacity');
    }

    .pi {
        font-size: dt('icon.size');
    }

    .p-icon {
        width: dt('icon.size');
        height: dt('icon.size');
    }

    .p-overlay-mask {
        background: dt('mask.background');
        color: dt('mask.color');
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .p-overlay-mask-enter {
        animation: p-overlay-mask-enter-animation dt('mask.transition.duration') forwards;
    }

    .p-overlay-mask-leave {
        animation: p-overlay-mask-leave-animation dt('mask.transition.duration') forwards;
    }

    @keyframes p-overlay-mask-enter-animation {
        from {
            background: transparent;
        }
        to {
            background: dt('mask.background');
        }
    }
    @keyframes p-overlay-mask-leave-animation {
        from {
            background: dt('mask.background');
        }
        to {
            background: transparent;
        }
    }
`;var Bu=0,Ss=(()=>{class t{document=f(re);use(e,i={}){let o=!1,r=e,s=null,{immediate:a=!0,manual:l=!1,name:u=`style_${++Bu}`,id:c=void 0,media:d=void 0,nonce:h=void 0,first:p=!1,props:m={}}=i;if(this.document){if(s=this.document.querySelector(`style[data-primeng-style-id="${u}"]`)||c&&this.document.getElementById(c)||this.document.createElement("style"),!s.isConnected){r=e;let E=this.document.head;p&&E.firstChild?E.insertBefore(s,E.firstChild):E.appendChild(s),ni(s,{type:"text/css",media:d,nonce:h,"data-primeng-style-id":u})}return s.textContent!==r&&(s.textContent=r),{id:c,name:u,el:s,css:r}}}static \u0275fac=function(i){return new(i||t)};static \u0275prov=v({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var Ut={_loadedStyleNames:new Set,getLoadedStyleNames(){return this._loadedStyleNames},isStyleNameLoaded(t){return this._loadedStyleNames.has(t)},setLoadedStyleName(t){this._loadedStyleNames.add(t)},deleteLoadedStyleName(t){this._loadedStyleNames.delete(t)},clearLoadedStyleNames(){this._loadedStyleNames.clear()}},$u=`
.p-hidden-accessible {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
}

.p-hidden-accessible input,
.p-hidden-accessible select {
    transform: scale(0);
}

.p-overflow-hidden {
    overflow: hidden;
    padding-right: dt('scrollbar.width');
}
`,G=(()=>{class t{name="base";useStyle=f(Ss);theme=void 0;css=void 0;classes={};inlineStyles={};load=(e,i={},o=r=>r)=>{let r=o(jt`${be(e,{dt:et})}`);return r?this.useStyle.use(yt(r),S({name:this.name},i)):{}};loadCSS=(e={})=>this.load(this.css,e);loadTheme=(e={},i="")=>this.load(this.theme,e,(o="")=>T.transformCSS(e.name||this.name,`${o}${jt`${i}`}`));loadGlobalCSS=(e={})=>this.load($u,e);loadGlobalTheme=(e={},i="")=>this.load(ws,e,(o="")=>T.transformCSS(e.name||this.name,`${o}${jt`${i}`}`));getCommonTheme=e=>T.getCommon(this.name,e);getComponentTheme=e=>T.getComponent(this.name,e);getDirectiveTheme=e=>T.getDirective(this.name,e);getPresetTheme=(e,i,o)=>T.getCustomPreset(this.name,e,i,o);getLayerOrderThemeCSS=()=>T.getLayerOrderCSS(this.name);getStyleSheet=(e="",i={})=>{if(this.css){let o=be(this.css,{dt:et}),r=yt(jt`${o}${e}`),s=Object.entries(i).reduce((a,[l,u])=>a.push(`${l}="${u}"`)&&a,[]).join(" ");return`<style type="text/css" data-primeng-style-id="${this.name}" ${s}>${r}</style>`}return""};getCommonThemeStyleSheet=(e,i={})=>T.getCommonStyleSheet(this.name,e,i);getThemeStyleSheet=(e,i={})=>{let o=[T.getStyleSheet(this.name,e,i)];if(this.theme){let r=this.name==="base"?"global-style":`${this.name}-style`,s=jt`${be(this.theme,{dt:et})}`,a=yt(T.transformCSS(r,s)),l=Object.entries(i).reduce((u,[c,d])=>u.push(`${c}="${d}"`)&&u,[]).join(" ");o.push(`<style type="text/css" data-primeng-style-id="${r}" ${l}>${a}</style>`)}return o.join("")};static \u0275fac=function(i){return new(i||t)};static \u0275prov=v({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var ju=(()=>{class t{theme=X(void 0);csp=X({nonce:void 0});isThemeChanged=!1;document=f(re);baseStyle=f(G);constructor(){Zt(()=>{De.on("theme:change",e=>{Ie(()=>{this.isThemeChanged=!0,this.theme.set(e)})})}),Zt(()=>{let e=this.theme();this.document&&e&&(this.isThemeChanged||this.onThemeChange(e),this.isThemeChanged=!1)})}ngOnDestroy(){T.clearLoadedStyleNames(),De.clear()}onThemeChange(e){T.setTheme(e),this.document&&this.loadCommonTheme()}loadCommonTheme(){if(this.theme()!=="none"&&!T.isStyleNameLoaded("common")){let{primitive:e,semantic:i,global:o,style:r}=this.baseStyle.getCommonTheme?.()||{},s={nonce:this.csp?.()?.nonce};this.baseStyle.load(e?.css,S({name:"primitive-variables"},s)),this.baseStyle.load(i?.css,S({name:"semantic-variables"},s)),this.baseStyle.load(o?.css,S({name:"global-variables"},s)),this.baseStyle.loadGlobalTheme(S({name:"global-style"},s),r),T.setLoadedStyleName("common")}}setThemeConfig(e){let{theme:i,csp:o}=e||{};i&&this.theme.set(i),o&&this.csp.set(o)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=v({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),fo=(()=>{class t extends ju{ripple=X(!1);platformId=f(_t);inputStyle=X(null);inputVariant=X(null);overlayAppendTo=X("self");overlayOptions={};csp=X({nonce:void 0});filterMatchModeOptions={text:[te.STARTS_WITH,te.CONTAINS,te.NOT_CONTAINS,te.ENDS_WITH,te.EQUALS,te.NOT_EQUALS],numeric:[te.EQUALS,te.NOT_EQUALS,te.LESS_THAN,te.LESS_THAN_OR_EQUAL_TO,te.GREATER_THAN,te.GREATER_THAN_OR_EQUAL_TO],date:[te.DATE_IS,te.DATE_IS_NOT,te.DATE_BEFORE,te.DATE_AFTER]};translation={startsWith:"Starts with",contains:"Contains",notContains:"Not contains",endsWith:"Ends with",equals:"Equals",notEquals:"Not equals",noFilter:"No Filter",lt:"Less than",lte:"Less than or equal to",gt:"Greater than",gte:"Greater than or equal to",is:"Is",isNot:"Is not",before:"Before",after:"After",dateIs:"Date is",dateIsNot:"Date is not",dateBefore:"Date is before",dateAfter:"Date is after",clear:"Clear",apply:"Apply",matchAll:"Match All",matchAny:"Match Any",addRule:"Add Rule",removeRule:"Remove Rule",accept:"Yes",reject:"No",choose:"Choose",completed:"Completed",upload:"Upload",cancel:"Cancel",pending:"Pending",fileSizeTypes:["B","KB","MB","GB","TB","PB","EB","ZB","YB"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su","Mo","Tu","We","Th","Fr","Sa"],monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],chooseYear:"Choose Year",chooseMonth:"Choose Month",chooseDate:"Choose Date",prevDecade:"Previous Decade",nextDecade:"Next Decade",prevYear:"Previous Year",nextYear:"Next Year",prevMonth:"Previous Month",nextMonth:"Next Month",prevHour:"Previous Hour",nextHour:"Next Hour",prevMinute:"Previous Minute",nextMinute:"Next Minute",prevSecond:"Previous Second",nextSecond:"Next Second",am:"am",pm:"pm",dateFormat:"mm/dd/yy",firstDayOfWeek:0,today:"Today",weekHeader:"Wk",weak:"Weak",medium:"Medium",strong:"Strong",passwordPrompt:"Enter a password",emptyMessage:"No results found",searchMessage:"Search results are available",selectionMessage:"{0} items selected",emptySelectionMessage:"No selected item",emptySearchMessage:"No results found",emptyFilterMessage:"No results found",fileChosenMessage:"Files",noFileChosenMessage:"No file chosen",aria:{trueLabel:"True",falseLabel:"False",nullLabel:"Not Selected",star:"1 star",stars:"{star} stars",selectAll:"All items selected",unselectAll:"All items unselected",close:"Close",previous:"Previous",next:"Next",navigation:"Navigation",scrollTop:"Scroll Top",moveTop:"Move Top",moveUp:"Move Up",moveDown:"Move Down",moveBottom:"Move Bottom",moveToTarget:"Move to Target",moveToSource:"Move to Source",moveAllToTarget:"Move All to Target",moveAllToSource:"Move All to Source",pageLabel:"{page}",firstPageLabel:"First Page",lastPageLabel:"Last Page",nextPageLabel:"Next Page",prevPageLabel:"Previous Page",rowsPerPageLabel:"Rows per page",previousPageLabel:"Previous Page",jumpToPageDropdownLabel:"Jump to Page Dropdown",jumpToPageInputLabel:"Jump to Page Input",selectRow:"Row Selected",unselectRow:"Row Unselected",expandRow:"Row Expanded",collapseRow:"Row Collapsed",showFilterMenu:"Show Filter Menu",hideFilterMenu:"Hide Filter Menu",filterOperator:"Filter Operator",filterConstraint:"Filter Constraint",editRow:"Row Edit",saveEdit:"Save Edit",cancelEdit:"Cancel Edit",listView:"List View",gridView:"Grid View",slide:"Slide",slideNumber:"{slideNumber}",zoomImage:"Zoom Image",zoomIn:"Zoom In",zoomOut:"Zoom Out",rotateRight:"Rotate Right",rotateLeft:"Rotate Left",listLabel:"Option List",selectColor:"Select a color",removeLabel:"Remove",browseFiles:"Browse Files",maximizeLabel:"Maximize"}};zIndex={modal:1100,overlay:1e3,menu:1e3,tooltip:1100};translationSource=new pe;translationObserver=this.translationSource.asObservable();getTranslation(e){return this.translation[e]}setTranslation(e){this.translation=S(S({},this.translation),e),this.translationSource.next(this.translation)}setConfig(e){let{csp:i,ripple:o,inputStyle:r,inputVariant:s,theme:a,overlayOptions:l,translation:u,filterMatchModeOptions:c,overlayAppendTo:d}=e||{};i&&this.csp.set(i),d&&this.overlayAppendTo.set(d),o&&this.ripple.set(o),r&&this.inputStyle.set(r),s&&this.inputVariant.set(s),l&&(this.overlayOptions=l),u&&this.setTranslation(u),c&&(this.filterMatchModeOptions=c),a&&this.setThemeConfig({theme:a,csp:i})}static \u0275fac=(()=>{let e;return function(o){return(e||(e=y(t)))(o||t)}})();static \u0275prov=v({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),Uu=new U("PRIME_NG_CONFIG");function sg(...t){let n=t?.map(i=>({provide:Uu,useValue:i,multi:!1})),e=zo(()=>{let i=f(fo);t?.forEach(o=>i.setConfig(o))});return Mn([...n,e])}var Rs=(()=>{class t{_renderer;_elementRef;onChange=e=>{};onTouched=()=>{};constructor(e,i){this._renderer=e,this._elementRef=i}setProperty(e,i){this._renderer.setProperty(this._elementRef.nativeElement,e,i)}registerOnTouched(e){this.onTouched=e}registerOnChange(e){this.onChange=e}setDisabledState(e){this.setProperty("disabled",e)}static \u0275fac=function(i){return new(i||t)(D(ze),D(Ae))};static \u0275dir=w({type:t})}return t})(),Ls=(()=>{class t extends Rs{static \u0275fac=(()=>{let e;return function(o){return(e||(e=y(t)))(o||t)}})();static \u0275dir=w({type:t,features:[C]})}return t})(),He=new U("");var Hu={provide:He,useExisting:ie(()=>Ps),multi:!0};function zu(){let t=bt()?bt().getUserAgent():"";return/android (\d+)/.test(t.toLowerCase())}var Gu=new U(""),Ps=(()=>{class t extends Rs{_compositionMode;_composing=!1;constructor(e,i,o){super(e,i),this._compositionMode=o,this._compositionMode==null&&(this._compositionMode=!zu())}writeValue(e){let i=e??"";this.setProperty("value",i)}_handleInput(e){(!this._compositionMode||this._compositionMode&&!this._composing)&&this.onChange(e)}_compositionStart(){this._composing=!0}_compositionEnd(e){this._composing=!1,this._compositionMode&&this.onChange(e)}static \u0275fac=function(i){return new(i||t)(D(ze),D(Ae),D(Gu,8))};static \u0275dir=w({type:t,selectors:[["input","formControlName","",3,"type","checkbox"],["textarea","formControlName",""],["input","formControl","",3,"type","checkbox"],["textarea","formControl",""],["input","ngModel","",3,"type","checkbox"],["textarea","ngModel",""],["","ngDefaultControl",""]],hostBindings:function(i,o){i&1&&fe("input",function(s){return o._handleInput(s.target.value)})("blur",function(){return o.onTouched()})("compositionstart",function(){return o._compositionStart()})("compositionend",function(s){return o._compositionEnd(s.target.value)})},standalone:!1,features:[x([Hu]),C]})}return t})();function Co(t){return t==null||_o(t)===0}function _o(t){return t==null?null:Array.isArray(t)||typeof t=="string"?t.length:t instanceof Set?t.size:null}var vt=new U(""),mn=new U(""),Wu=/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,As=class{static min(n){return Vs(n)}static max(n){return Ku(n)}static required(n){return Bs(n)}static requiredTrue(n){return qu(n)}static email(n){return Yu(n)}static minLength(n){return Zu(n)}static maxLength(n){return Xu(n)}static pattern(n){return Qu(n)}static nullValidator(n){return ui()}static compose(n){return Gs(n)}static composeAsync(n){return Ks(n)}};function Vs(t){return n=>{if(n.value==null||t==null)return null;let e=parseFloat(n.value);return!isNaN(e)&&e<t?{min:{min:t,actual:n.value}}:null}}function Ku(t){return n=>{if(n.value==null||t==null)return null;let e=parseFloat(n.value);return!isNaN(e)&&e>t?{max:{max:t,actual:n.value}}:null}}function Bs(t){return Co(t.value)?{required:!0}:null}function qu(t){return t.value===!0?null:{required:!0}}function Yu(t){return Co(t.value)||Wu.test(t.value)?null:{email:!0}}function Zu(t){return n=>{let e=n.value?.length??_o(n.value);return e===null||e===0?null:e<t?{minlength:{requiredLength:t,actualLength:e}}:null}}function Xu(t){return n=>{let e=n.value?.length??_o(n.value);return e!==null&&e>t?{maxlength:{requiredLength:t,actualLength:e}}:null}}function Qu(t){if(!t)return ui;let n,e;return typeof t=="string"?(e="",t.charAt(0)!=="^"&&(e+="^"),e+=t,t.charAt(t.length-1)!=="$"&&(e+="$"),n=new RegExp(e)):(e=t.toString(),n=t),i=>{if(Co(i.value))return null;let o=i.value;return n.test(o)?null:{pattern:{requiredPattern:e,actualValue:o}}}}function ui(t){return null}function $s(t){return t!=null}function js(t){return Fi(t)?ko(t):t}function Us(t){let n={};return t.forEach(e=>{n=e!=null?S(S({},n),e):n}),Object.keys(n).length===0?null:n}function Hs(t,n){return n.map(e=>e(t))}function Ju(t){return!t.validate}function zs(t){return t.map(n=>Ju(n)?n:e=>n.validate(e))}function Gs(t){if(!t)return null;let n=t.filter($s);return n.length==0?null:function(e){return Us(Hs(e,n))}}function Ws(t){return t!=null?Gs(zs(t)):null}function Ks(t){if(!t)return null;let n=t.filter($s);return n.length==0?null:function(e){let i=Hs(e,n).map(js);return No(i).pipe(dt(Us))}}function qs(t){return t!=null?Ks(zs(t)):null}function Fs(t,n){return t===null?[n]:Array.isArray(t)?[...t,n]:[t,n]}function Ys(t){return t._rawValidators}function Zs(t){return t._rawAsyncValidators}function go(t){return t?Array.isArray(t)?t:[t]:[]}function ci(t,n){return Array.isArray(t)?t.includes(n):t===n}function Ts(t,n){let e=go(n);return go(t).forEach(o=>{ci(e,o)||e.push(o)}),e}function xs(t,n){return go(n).filter(e=>!ci(t,e))}var di=class{get value(){return this.control?this.control.value:null}get valid(){return this.control?this.control.valid:null}get invalid(){return this.control?this.control.invalid:null}get pending(){return this.control?this.control.pending:null}get disabled(){return this.control?this.control.disabled:null}get enabled(){return this.control?this.control.enabled:null}get errors(){return this.control?this.control.errors:null}get pristine(){return this.control?this.control.pristine:null}get dirty(){return this.control?this.control.dirty:null}get touched(){return this.control?this.control.touched:null}get status(){return this.control?this.control.status:null}get untouched(){return this.control?this.control.untouched:null}get statusChanges(){return this.control?this.control.statusChanges:null}get valueChanges(){return this.control?this.control.valueChanges:null}get path(){return null}_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators=[];_rawAsyncValidators=[];_setValidators(n){this._rawValidators=n||[],this._composedValidatorFn=Ws(this._rawValidators)}_setAsyncValidators(n){this._rawAsyncValidators=n||[],this._composedAsyncValidatorFn=qs(this._rawAsyncValidators)}get validator(){return this._composedValidatorFn||null}get asyncValidator(){return this._composedAsyncValidatorFn||null}_onDestroyCallbacks=[];_registerOnDestroy(n){this._onDestroyCallbacks.push(n)}_invokeOnDestroyCallbacks(){this._onDestroyCallbacks.forEach(n=>n()),this._onDestroyCallbacks=[]}reset(n=void 0){this.control&&this.control.reset(n)}hasError(n,e){return this.control?this.control.hasError(n,e):!1}getError(n,e){return this.control?this.control.getError(n,e):null}},Ce=class extends di{name;get formDirective(){return null}get path(){return null}},Le=class extends di{_parent=null;name=null;valueAccessor=null},pi=class{_cd;constructor(n){this._cd=n}get isTouched(){return this._cd?.control?._touched?.(),!!this._cd?.control?.touched}get isUntouched(){return!!this._cd?.control?.untouched}get isPristine(){return this._cd?.control?._pristine?.(),!!this._cd?.control?.pristine}get isDirty(){return!!this._cd?.control?.dirty}get isValid(){return this._cd?.control?._status?.(),!!this._cd?.control?.valid}get isInvalid(){return!!this._cd?.control?.invalid}get isPending(){return!!this._cd?.control?.pending}get isSubmitted(){return this._cd?._submitted?.(),!!this._cd?.submitted}},ec={"[class.ng-untouched]":"isUntouched","[class.ng-touched]":"isTouched","[class.ng-pristine]":"isPristine","[class.ng-dirty]":"isDirty","[class.ng-valid]":"isValid","[class.ng-invalid]":"isInvalid","[class.ng-pending]":"isPending"},Ag=de(S({},ec),{"[class.ng-submitted]":"isSubmitted"}),Xs=(()=>{class t extends pi{constructor(e){super(e)}static \u0275fac=function(i){return new(i||t)(D(Le,2))};static \u0275dir=w({type:t,selectors:[["","formControlName",""],["","ngModel",""],["","formControl",""]],hostVars:14,hostBindings:function(i,o){i&2&&mt("ng-untouched",o.isUntouched)("ng-touched",o.isTouched)("ng-pristine",o.isPristine)("ng-dirty",o.isDirty)("ng-valid",o.isValid)("ng-invalid",o.isInvalid)("ng-pending",o.isPending)},standalone:!1,features:[C]})}return t})(),Fg=(()=>{class t extends pi{constructor(e){super(e)}static \u0275fac=function(i){return new(i||t)(D(Ce,10))};static \u0275dir=w({type:t,selectors:[["","formGroupName",""],["","formArrayName",""],["","ngModelGroup",""],["","formGroup",""],["form",3,"ngNoForm",""],["","ngForm",""]],hostVars:16,hostBindings:function(i,o){i&2&&mt("ng-untouched",o.isUntouched)("ng-touched",o.isTouched)("ng-pristine",o.isPristine)("ng-dirty",o.isDirty)("ng-valid",o.isValid)("ng-invalid",o.isInvalid)("ng-pending",o.isPending)("ng-submitted",o.isSubmitted)},standalone:!1,features:[C]})}return t})();var dn="VALID",li="INVALID",Ht="PENDING",pn="DISABLED",st=class{},hi=class extends st{value;source;constructor(n,e){super(),this.value=n,this.source=e}},hn=class extends st{pristine;source;constructor(n,e){super(),this.pristine=n,this.source=e}},fn=class extends st{touched;source;constructor(n,e){super(),this.touched=n,this.source=e}},zt=class extends st{status;source;constructor(n,e){super(),this.status=n,this.source=e}},mo=class extends st{source;constructor(n){super(),this.source=n}},bo=class extends st{source;constructor(n){super(),this.source=n}};function Eo(t){return(bi(t)?t.validators:t)||null}function tc(t){return Array.isArray(t)?Ws(t):t||null}function wo(t,n){return(bi(n)?n.asyncValidators:t)||null}function nc(t){return Array.isArray(t)?qs(t):t||null}function bi(t){return t!=null&&!Array.isArray(t)&&typeof t=="object"}function Qs(t,n,e){let i=t.controls;if(!(n?Object.keys(i):i).length)throw new j(1e3,"");if(!i[e])throw new j(1001,"")}function Js(t,n,e){t._forEachChild((i,o)=>{if(e[o]===void 0)throw new j(1002,"")})}var Gt=class{_pendingDirty=!1;_hasOwnPendingAsyncValidator=null;_pendingTouched=!1;_onCollectionChange=()=>{};_updateOn;_parent=null;_asyncValidationSubscription;_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators;_rawAsyncValidators;value;constructor(n,e){this._assignValidators(n),this._assignAsyncValidators(e)}get validator(){return this._composedValidatorFn}set validator(n){this._rawValidators=this._composedValidatorFn=n}get asyncValidator(){return this._composedAsyncValidatorFn}set asyncValidator(n){this._rawAsyncValidators=this._composedAsyncValidatorFn=n}get parent(){return this._parent}get status(){return Ie(this.statusReactive)}set status(n){Ie(()=>this.statusReactive.set(n))}_status=ee(()=>this.statusReactive());statusReactive=X(void 0);get valid(){return this.status===dn}get invalid(){return this.status===li}get pending(){return this.status==Ht}get disabled(){return this.status===pn}get enabled(){return this.status!==pn}errors;get pristine(){return Ie(this.pristineReactive)}set pristine(n){Ie(()=>this.pristineReactive.set(n))}_pristine=ee(()=>this.pristineReactive());pristineReactive=X(!0);get dirty(){return!this.pristine}get touched(){return Ie(this.touchedReactive)}set touched(n){Ie(()=>this.touchedReactive.set(n))}_touched=ee(()=>this.touchedReactive());touchedReactive=X(!1);get untouched(){return!this.touched}_events=new pe;events=this._events.asObservable();valueChanges;statusChanges;get updateOn(){return this._updateOn?this._updateOn:this.parent?this.parent.updateOn:"change"}setValidators(n){this._assignValidators(n)}setAsyncValidators(n){this._assignAsyncValidators(n)}addValidators(n){this.setValidators(Ts(n,this._rawValidators))}addAsyncValidators(n){this.setAsyncValidators(Ts(n,this._rawAsyncValidators))}removeValidators(n){this.setValidators(xs(n,this._rawValidators))}removeAsyncValidators(n){this.setAsyncValidators(xs(n,this._rawAsyncValidators))}hasValidator(n){return ci(this._rawValidators,n)}hasAsyncValidator(n){return ci(this._rawAsyncValidators,n)}clearValidators(){this.validator=null}clearAsyncValidators(){this.asyncValidator=null}markAsTouched(n={}){let e=this.touched===!1;this.touched=!0;let i=n.sourceControl??this;this._parent&&!n.onlySelf&&this._parent.markAsTouched(de(S({},n),{sourceControl:i})),e&&n.emitEvent!==!1&&this._events.next(new fn(!0,i))}markAllAsDirty(n={}){this.markAsDirty({onlySelf:!0,emitEvent:n.emitEvent,sourceControl:this}),this._forEachChild(e=>e.markAllAsDirty(n))}markAllAsTouched(n={}){this.markAsTouched({onlySelf:!0,emitEvent:n.emitEvent,sourceControl:this}),this._forEachChild(e=>e.markAllAsTouched(n))}markAsUntouched(n={}){let e=this.touched===!0;this.touched=!1,this._pendingTouched=!1;let i=n.sourceControl??this;this._forEachChild(o=>{o.markAsUntouched({onlySelf:!0,emitEvent:n.emitEvent,sourceControl:i})}),this._parent&&!n.onlySelf&&this._parent._updateTouched(n,i),e&&n.emitEvent!==!1&&this._events.next(new fn(!1,i))}markAsDirty(n={}){let e=this.pristine===!0;this.pristine=!1;let i=n.sourceControl??this;this._parent&&!n.onlySelf&&this._parent.markAsDirty(de(S({},n),{sourceControl:i})),e&&n.emitEvent!==!1&&this._events.next(new hn(!1,i))}markAsPristine(n={}){let e=this.pristine===!1;this.pristine=!0,this._pendingDirty=!1;let i=n.sourceControl??this;this._forEachChild(o=>{o.markAsPristine({onlySelf:!0,emitEvent:n.emitEvent})}),this._parent&&!n.onlySelf&&this._parent._updatePristine(n,i),e&&n.emitEvent!==!1&&this._events.next(new hn(!0,i))}markAsPending(n={}){this.status=Ht;let e=n.sourceControl??this;n.emitEvent!==!1&&(this._events.next(new zt(this.status,e)),this.statusChanges.emit(this.status)),this._parent&&!n.onlySelf&&this._parent.markAsPending(de(S({},n),{sourceControl:e}))}disable(n={}){let e=this._parentMarkedDirty(n.onlySelf);this.status=pn,this.errors=null,this._forEachChild(o=>{o.disable(de(S({},n),{onlySelf:!0}))}),this._updateValue();let i=n.sourceControl??this;n.emitEvent!==!1&&(this._events.next(new hi(this.value,i)),this._events.next(new zt(this.status,i)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._updateAncestors(de(S({},n),{skipPristineCheck:e}),this),this._onDisabledChange.forEach(o=>o(!0))}enable(n={}){let e=this._parentMarkedDirty(n.onlySelf);this.status=dn,this._forEachChild(i=>{i.enable(de(S({},n),{onlySelf:!0}))}),this.updateValueAndValidity({onlySelf:!0,emitEvent:n.emitEvent}),this._updateAncestors(de(S({},n),{skipPristineCheck:e}),this),this._onDisabledChange.forEach(i=>i(!1))}_updateAncestors(n,e){this._parent&&!n.onlySelf&&(this._parent.updateValueAndValidity(n),n.skipPristineCheck||this._parent._updatePristine({},e),this._parent._updateTouched({},e))}setParent(n){this._parent=n}getRawValue(){return this.value}updateValueAndValidity(n={}){if(this._setInitialStatus(),this._updateValue(),this.enabled){let i=this._cancelExistingSubscription();this.errors=this._runValidator(),this.status=this._calculateStatus(),(this.status===dn||this.status===Ht)&&this._runAsyncValidator(i,n.emitEvent)}let e=n.sourceControl??this;n.emitEvent!==!1&&(this._events.next(new hi(this.value,e)),this._events.next(new zt(this.status,e)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._parent&&!n.onlySelf&&this._parent.updateValueAndValidity(de(S({},n),{sourceControl:e}))}_updateTreeValidity(n={emitEvent:!0}){this._forEachChild(e=>e._updateTreeValidity(n)),this.updateValueAndValidity({onlySelf:!0,emitEvent:n.emitEvent})}_setInitialStatus(){this.status=this._allControlsDisabled()?pn:dn}_runValidator(){return this.validator?this.validator(this):null}_runAsyncValidator(n,e){if(this.asyncValidator){this.status=Ht,this._hasOwnPendingAsyncValidator={emitEvent:e!==!1,shouldHaveEmitted:n!==!1};let i=js(this.asyncValidator(this));this._asyncValidationSubscription=i.subscribe(o=>{this._hasOwnPendingAsyncValidator=null,this.setErrors(o,{emitEvent:e,shouldHaveEmitted:n})})}}_cancelExistingSubscription(){if(this._asyncValidationSubscription){this._asyncValidationSubscription.unsubscribe();let n=(this._hasOwnPendingAsyncValidator?.emitEvent||this._hasOwnPendingAsyncValidator?.shouldHaveEmitted)??!1;return this._hasOwnPendingAsyncValidator=null,n}return!1}setErrors(n,e={}){this.errors=n,this._updateControlsErrors(e.emitEvent!==!1,this,e.shouldHaveEmitted)}get(n){let e=n;return e==null||(Array.isArray(e)||(e=e.split(".")),e.length===0)?null:e.reduce((i,o)=>i&&i._find(o),this)}getError(n,e){let i=e?this.get(e):this;return i&&i.errors?i.errors[n]:null}hasError(n,e){return!!this.getError(n,e)}get root(){let n=this;for(;n._parent;)n=n._parent;return n}_updateControlsErrors(n,e,i){this.status=this._calculateStatus(),n&&this.statusChanges.emit(this.status),(n||i)&&this._events.next(new zt(this.status,e)),this._parent&&this._parent._updateControlsErrors(n,e,i)}_initObservables(){this.valueChanges=new Q,this.statusChanges=new Q}_calculateStatus(){return this._allControlsDisabled()?pn:this.errors?li:this._hasOwnPendingAsyncValidator||this._anyControlsHaveStatus(Ht)?Ht:this._anyControlsHaveStatus(li)?li:dn}_anyControlsHaveStatus(n){return this._anyControls(e=>e.status===n)}_anyControlsDirty(){return this._anyControls(n=>n.dirty)}_anyControlsTouched(){return this._anyControls(n=>n.touched)}_updatePristine(n,e){let i=!this._anyControlsDirty(),o=this.pristine!==i;this.pristine=i,this._parent&&!n.onlySelf&&this._parent._updatePristine(n,e),o&&this._events.next(new hn(this.pristine,e))}_updateTouched(n={},e){this.touched=this._anyControlsTouched(),this._events.next(new fn(this.touched,e)),this._parent&&!n.onlySelf&&this._parent._updateTouched(n,e)}_onDisabledChange=[];_registerOnCollectionChange(n){this._onCollectionChange=n}_setUpdateStrategy(n){bi(n)&&n.updateOn!=null&&(this._updateOn=n.updateOn)}_parentMarkedDirty(n){let e=this._parent&&this._parent.dirty;return!n&&!!e&&!this._parent._anyControlsDirty()}_find(n){return null}_assignValidators(n){this._rawValidators=Array.isArray(n)?n.slice():n,this._composedValidatorFn=tc(this._rawValidators)}_assignAsyncValidators(n){this._rawAsyncValidators=Array.isArray(n)?n.slice():n,this._composedAsyncValidatorFn=nc(this._rawAsyncValidators)}},fi=class extends Gt{constructor(n,e,i){super(Eo(e),wo(i,e)),this.controls=n,this._initObservables(),this._setUpdateStrategy(e),this._setUpControls(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator})}controls;registerControl(n,e){return this.controls[n]?this.controls[n]:(this.controls[n]=e,e.setParent(this),e._registerOnCollectionChange(this._onCollectionChange),e)}addControl(n,e,i={}){this.registerControl(n,e),this.updateValueAndValidity({emitEvent:i.emitEvent}),this._onCollectionChange()}removeControl(n,e={}){this.controls[n]&&this.controls[n]._registerOnCollectionChange(()=>{}),delete this.controls[n],this.updateValueAndValidity({emitEvent:e.emitEvent}),this._onCollectionChange()}setControl(n,e,i={}){this.controls[n]&&this.controls[n]._registerOnCollectionChange(()=>{}),delete this.controls[n],e&&this.registerControl(n,e),this.updateValueAndValidity({emitEvent:i.emitEvent}),this._onCollectionChange()}contains(n){return this.controls.hasOwnProperty(n)&&this.controls[n].enabled}setValue(n,e={}){Js(this,!0,n),Object.keys(n).forEach(i=>{Qs(this,!0,i),this.controls[i].setValue(n[i],{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e)}patchValue(n,e={}){n!=null&&(Object.keys(n).forEach(i=>{let o=this.controls[i];o&&o.patchValue(n[i],{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e))}reset(n={},e={}){this._forEachChild((i,o)=>{i.reset(n?n[o]:null,{onlySelf:!0,emitEvent:e.emitEvent})}),this._updatePristine(e,this),this._updateTouched(e,this),this.updateValueAndValidity(e)}getRawValue(){return this._reduceChildren({},(n,e,i)=>(n[i]=e.getRawValue(),n))}_syncPendingControls(){let n=this._reduceChildren(!1,(e,i)=>i._syncPendingControls()?!0:e);return n&&this.updateValueAndValidity({onlySelf:!0}),n}_forEachChild(n){Object.keys(this.controls).forEach(e=>{let i=this.controls[e];i&&n(i,e)})}_setUpControls(){this._forEachChild(n=>{n.setParent(this),n._registerOnCollectionChange(this._onCollectionChange)})}_updateValue(){this.value=this._reduceValue()}_anyControls(n){for(let[e,i]of Object.entries(this.controls))if(this.contains(e)&&n(i))return!0;return!1}_reduceValue(){let n={};return this._reduceChildren(n,(e,i,o)=>((i.enabled||this.disabled)&&(e[o]=i.value),e))}_reduceChildren(n,e){let i=n;return this._forEachChild((o,r)=>{i=e(i,o,r)}),i}_allControlsDisabled(){for(let n of Object.keys(this.controls))if(this.controls[n].enabled)return!1;return Object.keys(this.controls).length>0||this.disabled}_find(n){return this.controls.hasOwnProperty(n)?this.controls[n]:null}};var yo=class extends fi{};var yi=new U("",{providedIn:"root",factory:()=>vi}),vi="always";function Di(t,n){return[...n.path,t]}function vo(t,n,e=vi){So(t,n),n.valueAccessor.writeValue(t.value),(t.disabled||e==="always")&&n.valueAccessor.setDisabledState?.(t.disabled),oc(t,n),sc(t,n),rc(t,n),ic(t,n)}function Is(t,n,e=!0){let i=()=>{};n.valueAccessor&&(n.valueAccessor.registerOnChange(i),n.valueAccessor.registerOnTouched(i)),mi(t,n),t&&(n._invokeOnDestroyCallbacks(),t._registerOnCollectionChange(()=>{}))}function gi(t,n){t.forEach(e=>{e.registerOnValidatorChange&&e.registerOnValidatorChange(n)})}function ic(t,n){if(n.valueAccessor.setDisabledState){let e=i=>{n.valueAccessor.setDisabledState(i)};t.registerOnDisabledChange(e),n._registerOnDestroy(()=>{t._unregisterOnDisabledChange(e)})}}function So(t,n){let e=Ys(t);n.validator!==null?t.setValidators(Fs(e,n.validator)):typeof e=="function"&&t.setValidators([e]);let i=Zs(t);n.asyncValidator!==null?t.setAsyncValidators(Fs(i,n.asyncValidator)):typeof i=="function"&&t.setAsyncValidators([i]);let o=()=>t.updateValueAndValidity();gi(n._rawValidators,o),gi(n._rawAsyncValidators,o)}function mi(t,n){let e=!1;if(t!==null){if(n.validator!==null){let o=Ys(t);if(Array.isArray(o)&&o.length>0){let r=o.filter(s=>s!==n.validator);r.length!==o.length&&(e=!0,t.setValidators(r))}}if(n.asyncValidator!==null){let o=Zs(t);if(Array.isArray(o)&&o.length>0){let r=o.filter(s=>s!==n.asyncValidator);r.length!==o.length&&(e=!0,t.setAsyncValidators(r))}}}let i=()=>{};return gi(n._rawValidators,i),gi(n._rawAsyncValidators,i),e}function oc(t,n){n.valueAccessor.registerOnChange(e=>{t._pendingValue=e,t._pendingChange=!0,t._pendingDirty=!0,t.updateOn==="change"&&ea(t,n)})}function rc(t,n){n.valueAccessor.registerOnTouched(()=>{t._pendingTouched=!0,t.updateOn==="blur"&&t._pendingChange&&ea(t,n),t.updateOn!=="submit"&&t.markAsTouched()})}function ea(t,n){t._pendingDirty&&t.markAsDirty(),t.setValue(t._pendingValue,{emitModelToViewChange:!1}),n.viewToModelUpdate(t._pendingValue),t._pendingChange=!1}function sc(t,n){let e=(i,o)=>{n.valueAccessor.writeValue(i),o&&n.viewToModelUpdate(i)};t.registerOnChange(e),n._registerOnDestroy(()=>{t._unregisterOnChange(e)})}function ac(t,n){t==null,So(t,n)}function lc(t,n){return mi(t,n)}function ta(t,n){if(!t.hasOwnProperty("model"))return!1;let e=t.model;return e.isFirstChange()?!0:!Object.is(n,e.currentValue)}function uc(t){return Object.getPrototypeOf(t.constructor)===Ls}function cc(t,n){t._syncPendingControls(),n.forEach(e=>{let i=e.control;i.updateOn==="submit"&&i._pendingChange&&(e.viewToModelUpdate(i._pendingValue),i._pendingChange=!1)})}function na(t,n){if(!n)return null;Array.isArray(n);let e,i,o;return n.forEach(r=>{r.constructor===Ps?e=r:uc(r)?i=r:o=r}),o||i||e||null}function dc(t,n){let e=t.indexOf(n);e>-1&&t.splice(e,1)}function Ms(t,n){let e=t.indexOf(n);e>-1&&t.splice(e,1)}function Os(t){return typeof t=="object"&&t!==null&&Object.keys(t).length===2&&"value"in t&&"disabled"in t}var gn=class extends Gt{defaultValue=null;_onChange=[];_pendingValue;_pendingChange=!1;constructor(n=null,e,i){super(Eo(e),wo(i,e)),this._applyFormState(n),this._setUpdateStrategy(e),this._initObservables(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator}),bi(e)&&(e.nonNullable||e.initialValueIsDefault)&&(Os(n)?this.defaultValue=n.value:this.defaultValue=n)}setValue(n,e={}){this.value=this._pendingValue=n,this._onChange.length&&e.emitModelToViewChange!==!1&&this._onChange.forEach(i=>i(this.value,e.emitViewToModelChange!==!1)),this.updateValueAndValidity(e)}patchValue(n,e={}){this.setValue(n,e)}reset(n=this.defaultValue,e={}){this._applyFormState(n),this.markAsPristine(e),this.markAsUntouched(e),this.setValue(this.value,e),this._pendingChange=!1}_updateValue(){}_anyControls(n){return!1}_allControlsDisabled(){return this.disabled}registerOnChange(n){this._onChange.push(n)}_unregisterOnChange(n){Ms(this._onChange,n)}registerOnDisabledChange(n){this._onDisabledChange.push(n)}_unregisterOnDisabledChange(n){Ms(this._onDisabledChange,n)}_forEachChild(n){}_syncPendingControls(){return this.updateOn==="submit"&&(this._pendingDirty&&this.markAsDirty(),this._pendingTouched&&this.markAsTouched(),this._pendingChange)?(this.setValue(this._pendingValue,{onlySelf:!0,emitModelToViewChange:!1}),!0):!1}_applyFormState(n){Os(n)?(this.value=this._pendingValue=n.value,n.disabled?this.disable({onlySelf:!0,emitEvent:!1}):this.enable({onlySelf:!0,emitEvent:!1})):this.value=this._pendingValue=n}};var pc=t=>t instanceof gn,hc=(()=>{class t extends Ce{_parent;ngOnInit(){this._checkParentType(),this.formDirective.addFormGroup(this)}ngOnDestroy(){this.formDirective&&this.formDirective.removeFormGroup(this)}get control(){return this.formDirective.getFormGroup(this)}get path(){return Di(this.name==null?this.name:this.name.toString(),this._parent)}get formDirective(){return this._parent?this._parent.formDirective:null}_checkParentType(){}static \u0275fac=(()=>{let e;return function(o){return(e||(e=y(t)))(o||t)}})();static \u0275dir=w({type:t,standalone:!1,features:[C]})}return t})();var fc={provide:Le,useExisting:ie(()=>Ao)},ks=Promise.resolve(),Ao=(()=>{class t extends Le{_changeDetectorRef;callSetDisabledState;control=new gn;static ngAcceptInputType_isDisabled;_registered=!1;viewModel;name="";isDisabled;model;options;update=new Q;constructor(e,i,o,r,s,a){super(),this._changeDetectorRef=s,this.callSetDisabledState=a,this._parent=e,this._setValidators(i),this._setAsyncValidators(o),this.valueAccessor=na(this,r)}ngOnChanges(e){if(this._checkForErrors(),!this._registered||"name"in e){if(this._registered&&(this._checkName(),this.formDirective)){let i=e.name.previousValue;this.formDirective.removeControl({name:i,path:this._getPath(i)})}this._setUpControl()}"isDisabled"in e&&this._updateDisabled(e),ta(e,this.viewModel)&&(this._updateValue(this.model),this.viewModel=this.model)}ngOnDestroy(){this.formDirective&&this.formDirective.removeControl(this)}get path(){return this._getPath(this.name)}get formDirective(){return this._parent?this._parent.formDirective:null}viewToModelUpdate(e){this.viewModel=e,this.update.emit(e)}_setUpControl(){this._setUpdateStrategy(),this._isStandalone()?this._setUpStandalone():this.formDirective.addControl(this),this._registered=!0}_setUpdateStrategy(){this.options&&this.options.updateOn!=null&&(this.control._updateOn=this.options.updateOn)}_isStandalone(){return!this._parent||!!(this.options&&this.options.standalone)}_setUpStandalone(){vo(this.control,this,this.callSetDisabledState),this.control.updateValueAndValidity({emitEvent:!1})}_checkForErrors(){this._checkName()}_checkName(){this.options&&this.options.name&&(this.name=this.options.name),!this._isStandalone()&&this.name}_updateValue(e){ks.then(()=>{this.control.setValue(e,{emitViewToModelChange:!1}),this._changeDetectorRef?.markForCheck()})}_updateDisabled(e){let i=e.isDisabled.currentValue,o=i!==0&&_(i);ks.then(()=>{o&&!this.control.disabled?this.control.disable():!o&&this.control.disabled&&this.control.enable(),this._changeDetectorRef?.markForCheck()})}_getPath(e){return this._parent?Di(e,this._parent):[e]}static \u0275fac=function(i){return new(i||t)(D(Ce,9),D(vt,10),D(mn,10),D(He,10),D(xt,8),D(yi,8))};static \u0275dir=w({type:t,selectors:[["","ngModel","",3,"formControlName","",3,"formControl",""]],inputs:{name:"name",isDisabled:[0,"disabled","isDisabled"],model:[0,"ngModel","model"],options:[0,"ngModelOptions","options"]},outputs:{update:"ngModelChange"},exportAs:["ngModel"],standalone:!1,features:[x([fc]),C,Ee]})}return t})();var xg=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275dir=w({type:t,selectors:[["form",3,"ngNoForm","",3,"ngNativeValidate",""]],hostAttrs:["novalidate",""],standalone:!1})}return t})(),gc={provide:He,useExisting:ie(()=>mc),multi:!0},mc=(()=>{class t extends Ls{writeValue(e){let i=e??"";this.setProperty("value",i)}registerOnChange(e){this.onChange=i=>{e(i==""?null:parseFloat(i))}}static \u0275fac=(()=>{let e;return function(o){return(e||(e=y(t)))(o||t)}})();static \u0275dir=w({type:t,selectors:[["input","type","number","formControlName",""],["input","type","number","formControl",""],["input","type","number","ngModel",""]],hostBindings:function(i,o){i&1&&fe("input",function(s){return o.onChange(s.target.value)})("blur",function(){return o.onTouched()})},standalone:!1,features:[x([gc]),C]})}return t})();var ia=new U("");var bc={provide:Ce,useExisting:ie(()=>oa)},oa=(()=>{class t extends Ce{callSetDisabledState;get submitted(){return Ie(this._submittedReactive)}set submitted(e){this._submittedReactive.set(e)}_submitted=ee(()=>this._submittedReactive());_submittedReactive=X(!1);_oldForm;_onCollectionChange=()=>this._updateDomValue();directives=[];form=null;ngSubmit=new Q;constructor(e,i,o){super(),this.callSetDisabledState=o,this._setValidators(e),this._setAsyncValidators(i)}ngOnChanges(e){e.hasOwnProperty("form")&&(this._updateValidators(),this._updateDomValue(),this._updateRegistrations(),this._oldForm=this.form)}ngOnDestroy(){this.form&&(mi(this.form,this),this.form._onCollectionChange===this._onCollectionChange&&this.form._registerOnCollectionChange(()=>{}))}get formDirective(){return this}get control(){return this.form}get path(){return[]}addControl(e){let i=this.form.get(e.path);return vo(i,e,this.callSetDisabledState),i.updateValueAndValidity({emitEvent:!1}),this.directives.push(e),i}getControl(e){return this.form.get(e.path)}removeControl(e){Is(e.control||null,e,!1),dc(this.directives,e)}addFormGroup(e){this._setUpFormContainer(e)}removeFormGroup(e){this._cleanUpFormContainer(e)}getFormGroup(e){return this.form.get(e.path)}addFormArray(e){this._setUpFormContainer(e)}removeFormArray(e){this._cleanUpFormContainer(e)}getFormArray(e){return this.form.get(e.path)}updateModel(e,i){this.form.get(e.path).setValue(i)}onSubmit(e){return this._submittedReactive.set(!0),cc(this.form,this.directives),this.ngSubmit.emit(e),this.form._events.next(new mo(this.control)),e?.target?.method==="dialog"}onReset(){this.resetForm()}resetForm(e=void 0,i={}){this.form.reset(e,i),this._submittedReactive.set(!1),i?.emitEvent!==!1&&this.form._events.next(new bo(this.form))}_updateDomValue(){this.directives.forEach(e=>{let i=e.control,o=this.form.get(e.path);i!==o&&(Is(i||null,e),pc(o)&&(vo(o,e,this.callSetDisabledState),e.control=o))}),this.form._updateTreeValidity({emitEvent:!1})}_setUpFormContainer(e){let i=this.form.get(e.path);ac(i,e),i.updateValueAndValidity({emitEvent:!1})}_cleanUpFormContainer(e){if(this.form){let i=this.form.get(e.path);i&&lc(i,e)&&i.updateValueAndValidity({emitEvent:!1})}}_updateRegistrations(){this.form._registerOnCollectionChange(this._onCollectionChange),this._oldForm&&this._oldForm._registerOnCollectionChange(()=>{})}_updateValidators(){So(this.form,this),this._oldForm&&mi(this._oldForm,this)}static \u0275fac=function(i){return new(i||t)(D(vt,10),D(mn,10),D(yi,8))};static \u0275dir=w({type:t,selectors:[["","formGroup",""]],hostBindings:function(i,o){i&1&&fe("submit",function(s){return o.onSubmit(s)})("reset",function(){return o.onReset()})},inputs:{form:[0,"formGroup","form"]},outputs:{ngSubmit:"ngSubmit"},exportAs:["ngForm"],standalone:!1,features:[x([bc]),C,Ee]})}return t})(),yc={provide:Ce,useExisting:ie(()=>ra)},ra=(()=>{class t extends hc{name=null;constructor(e,i,o){super(),this._parent=e,this._setValidators(i),this._setAsyncValidators(o)}_checkParentType(){aa(this._parent)}static \u0275fac=function(i){return new(i||t)(D(Ce,13),D(vt,10),D(mn,10))};static \u0275dir=w({type:t,selectors:[["","formGroupName",""]],inputs:{name:[0,"formGroupName","name"]},standalone:!1,features:[x([yc]),C]})}return t})(),vc={provide:Ce,useExisting:ie(()=>sa)},sa=(()=>{class t extends Ce{_parent;name=null;constructor(e,i,o){super(),this._parent=e,this._setValidators(i),this._setAsyncValidators(o)}ngOnInit(){aa(this._parent),this.formDirective.addFormArray(this)}ngOnDestroy(){this.formDirective?.removeFormArray(this)}get control(){return this.formDirective.getFormArray(this)}get formDirective(){return this._parent?this._parent.formDirective:null}get path(){return Di(this.name==null?this.name:this.name.toString(),this._parent)}static \u0275fac=function(i){return new(i||t)(D(Ce,13),D(vt,10),D(mn,10))};static \u0275dir=w({type:t,selectors:[["","formArrayName",""]],inputs:{name:[0,"formArrayName","name"]},standalone:!1,features:[x([vc]),C]})}return t})();function aa(t){return!(t instanceof ra)&&!(t instanceof oa)&&!(t instanceof sa)}var Dc={provide:Le,useExisting:ie(()=>Cc)},Cc=(()=>{class t extends Le{_ngModelWarningConfig;_added=!1;viewModel;control;name=null;set isDisabled(e){}model;update=new Q;static _ngModelWarningSentOnce=!1;_ngModelWarningSent=!1;constructor(e,i,o,r,s){super(),this._ngModelWarningConfig=s,this._parent=e,this._setValidators(i),this._setAsyncValidators(o),this.valueAccessor=na(this,r)}ngOnChanges(e){this._added||this._setUpControl(),ta(e,this.viewModel)&&(this.viewModel=this.model,this.formDirective.updateModel(this,this.model))}ngOnDestroy(){this.formDirective&&this.formDirective.removeControl(this)}viewToModelUpdate(e){this.viewModel=e,this.update.emit(e)}get path(){return Di(this.name==null?this.name:this.name.toString(),this._parent)}get formDirective(){return this._parent?this._parent.formDirective:null}_setUpControl(){this.control=this.formDirective.addControl(this),this._added=!0}static \u0275fac=function(i){return new(i||t)(D(Ce,13),D(vt,10),D(mn,10),D(He,10),D(ia,8))};static \u0275dir=w({type:t,selectors:[["","formControlName",""]],inputs:{name:[0,"formControlName","name"],isDisabled:[0,"disabled","isDisabled"],model:[0,"ngModel","model"]},outputs:{update:"ngModelChange"},standalone:!1,features:[x([Dc]),C,Ee]})}return t})();function _c(t){return typeof t=="number"?t:parseFloat(t)}var la=(()=>{class t{_validator=ui;_onChange;_enabled;ngOnChanges(e){if(this.inputName in e){let i=this.normalizeInput(e[this.inputName].currentValue);this._enabled=this.enabled(i),this._validator=this._enabled?this.createValidator(i):ui,this._onChange&&this._onChange()}}validate(e){return this._validator(e)}registerOnValidatorChange(e){this._onChange=e}enabled(e){return e!=null}static \u0275fac=function(i){return new(i||t)};static \u0275dir=w({type:t,features:[Ee]})}return t})();var Ec={provide:vt,useExisting:ie(()=>wc),multi:!0},wc=(()=>{class t extends la{min;inputName="min";normalizeInput=e=>_c(e);createValidator=e=>Vs(e);static \u0275fac=(()=>{let e;return function(o){return(e||(e=y(t)))(o||t)}})();static \u0275dir=w({type:t,selectors:[["input","type","number","min","","formControlName",""],["input","type","number","min","","formControl",""],["input","type","number","min","","ngModel",""]],hostVars:1,hostBindings:function(i,o){i&2&&K("min",o._enabled?o.min:null)},inputs:{min:"min"},standalone:!1,features:[x([Ec]),C]})}return t})(),Sc={provide:vt,useExisting:ie(()=>Ac),multi:!0};var Ac=(()=>{class t extends la{required;inputName="required";normalizeInput=_;createValidator=e=>Bs;enabled(e){return e}static \u0275fac=(()=>{let e;return function(o){return(e||(e=y(t)))(o||t)}})();static \u0275dir=w({type:t,selectors:[["","required","","formControlName","",3,"type","checkbox"],["","required","","formControl","",3,"type","checkbox"],["","required","","ngModel","",3,"type","checkbox"]],hostVars:1,hostBindings:function(i,o){i&2&&K("required",o._enabled?"":null)},inputs:{required:"required"},standalone:!1,features:[x([Sc]),C]})}return t})();var ua=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=P({type:t});static \u0275inj=L({})}return t})(),Do=class extends Gt{constructor(n,e,i){super(Eo(e),wo(i,e)),this.controls=n,this._initObservables(),this._setUpdateStrategy(e),this._setUpControls(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator})}controls;at(n){return this.controls[this._adjustIndex(n)]}push(n,e={}){this.controls.push(n),this._registerControl(n),this.updateValueAndValidity({emitEvent:e.emitEvent}),this._onCollectionChange()}insert(n,e,i={}){this.controls.splice(n,0,e),this._registerControl(e),this.updateValueAndValidity({emitEvent:i.emitEvent})}removeAt(n,e={}){let i=this._adjustIndex(n);i<0&&(i=0),this.controls[i]&&this.controls[i]._registerOnCollectionChange(()=>{}),this.controls.splice(i,1),this.updateValueAndValidity({emitEvent:e.emitEvent})}setControl(n,e,i={}){let o=this._adjustIndex(n);o<0&&(o=0),this.controls[o]&&this.controls[o]._registerOnCollectionChange(()=>{}),this.controls.splice(o,1),e&&(this.controls.splice(o,0,e),this._registerControl(e)),this.updateValueAndValidity({emitEvent:i.emitEvent}),this._onCollectionChange()}get length(){return this.controls.length}setValue(n,e={}){Js(this,!1,n),n.forEach((i,o)=>{Qs(this,!1,o),this.at(o).setValue(i,{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e)}patchValue(n,e={}){n!=null&&(n.forEach((i,o)=>{this.at(o)&&this.at(o).patchValue(i,{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e))}reset(n=[],e={}){this._forEachChild((i,o)=>{i.reset(n[o],{onlySelf:!0,emitEvent:e.emitEvent})}),this._updatePristine(e,this),this._updateTouched(e,this),this.updateValueAndValidity(e)}getRawValue(){return this.controls.map(n=>n.getRawValue())}clear(n={}){this.controls.length<1||(this._forEachChild(e=>e._registerOnCollectionChange(()=>{})),this.controls.splice(0),this.updateValueAndValidity({emitEvent:n.emitEvent}))}_adjustIndex(n){return n<0?n+this.length:n}_syncPendingControls(){let n=this.controls.reduce((e,i)=>i._syncPendingControls()?!0:e,!1);return n&&this.updateValueAndValidity({onlySelf:!0}),n}_forEachChild(n){this.controls.forEach((e,i)=>{n(e,i)})}_updateValue(){this.value=this.controls.filter(n=>n.enabled||this.disabled).map(n=>n.value)}_anyControls(n){return this.controls.some(e=>e.enabled&&n(e))}_setUpControls(){this._forEachChild(n=>this._registerControl(n))}_allControlsDisabled(){for(let n of this.controls)if(n.enabled)return!1;return this.controls.length>0||this.disabled}_registerControl(n){n.setParent(this),n._registerOnCollectionChange(this._onCollectionChange)}_find(n){return this.at(n)??null}};function Ns(t){return!!t&&(t.asyncValidators!==void 0||t.validators!==void 0||t.updateOn!==void 0)}var Ig=(()=>{class t{useNonNullable=!1;get nonNullable(){let e=new t;return e.useNonNullable=!0,e}group(e,i=null){let o=this._reduceControls(e),r={};return Ns(i)?r=i:i!==null&&(r.validators=i.validator,r.asyncValidators=i.asyncValidator),new fi(o,r)}record(e,i=null){let o=this._reduceControls(e);return new yo(o,i)}control(e,i,o){let r={};return this.useNonNullable?(Ns(i)?r=i:(r.validators=i,r.asyncValidators=o),new gn(e,de(S({},r),{nonNullable:!0}))):new gn(e,i,o)}array(e,i,o){let r=e.map(s=>this._createControl(s));return new Do(r,i,o)}_reduceControls(e){let i={};return Object.keys(e).forEach(o=>{i[o]=this._createControl(e[o])}),i}_createControl(e){if(e instanceof gn)return e;if(e instanceof Gt)return e;if(Array.isArray(e)){let i=e[0],o=e.length>1?e[1]:null,r=e.length>2?e[2]:null;return this.control(i,o,r)}else return this.control(e)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=v({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var ca=(()=>{class t{static withConfig(e){return{ngModule:t,providers:[{provide:yi,useValue:e.callSetDisabledState??vi}]}}static \u0275fac=function(i){return new(i||t)};static \u0275mod=P({type:t});static \u0275inj=L({imports:[ua]})}return t})(),Mg=(()=>{class t{static withConfig(e){return{ngModule:t,providers:[{provide:ia,useValue:e.warnOnNgModelWithFormControl??"always"},{provide:yi,useValue:e.callSetDisabledState??vi}]}}static \u0275fac=function(i){return new(i||t)};static \u0275mod=P({type:t});static \u0275inj=L({imports:[ua]})}return t})();var da=(()=>{class t extends G{name="common";static \u0275fac=(()=>{let e;return function(o){return(e||(e=y(t)))(o||t)}})();static \u0275prov=v({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),ne=(()=>{class t{document=f(re);platformId=f(_t);el=f(Ae);injector=f(On);cd=f(xt);renderer=f(ze);config=f(fo);baseComponentStyle=f(da);baseStyle=f(G);scopedStyleEl;rootEl;dt;get styleOptions(){return{nonce:this.config?.csp().nonce}}get _name(){return this.constructor.name.replace(/^_/,"").toLowerCase()}get componentStyle(){return this._componentStyle}attrSelector=un("pc");themeChangeListeners=[];_getHostInstance(e){if(e)return e?this.hostName?e.name===this.hostName?e:this._getHostInstance(e.parentInstance):e.parentInstance:void 0}_getOptionValue(e,i="",o={}){return oi(e,i,o)}ngOnInit(){this.document&&(this._loadCoreStyles(),this._loadStyles())}ngAfterViewInit(){this.rootEl=this.el?.nativeElement,this.rootEl&&this.rootEl?.setAttribute(this.attrSelector,"")}ngOnChanges(e){if(this.document&&!Nr(this.platformId)){let{dt:i}=e;i&&i.currentValue&&(this._loadScopedThemeStyles(i.currentValue),this._themeChangeListener(()=>this._loadScopedThemeStyles(i.currentValue)))}}ngOnDestroy(){this._unloadScopedThemeStyles(),this.themeChangeListeners.forEach(e=>De.off("theme:change",e))}_loadStyles(){let e=()=>{Ut.isStyleNameLoaded("base")||(this.baseStyle.loadGlobalCSS(this.styleOptions),Ut.setLoadedStyleName("base")),this._loadThemeStyles()};e(),this._themeChangeListener(()=>e())}_loadCoreStyles(){!Ut.isStyleNameLoaded("base")&&this.componentStyle?.name&&(this.baseComponentStyle.loadCSS(this.styleOptions),this.componentStyle&&this.componentStyle?.loadCSS(this.styleOptions),Ut.setLoadedStyleName(this.componentStyle?.name))}_loadThemeStyles(){if(!T.isStyleNameLoaded("common")){let{primitive:e,semantic:i,global:o,style:r}=this.componentStyle?.getCommonTheme?.()||{};this.baseStyle.load(e?.css,S({name:"primitive-variables"},this.styleOptions)),this.baseStyle.load(i?.css,S({name:"semantic-variables"},this.styleOptions)),this.baseStyle.load(o?.css,S({name:"global-variables"},this.styleOptions)),this.baseStyle.loadGlobalTheme(S({name:"global-style"},this.styleOptions),r),T.setLoadedStyleName("common")}if(!T.isStyleNameLoaded(this.componentStyle?.name)&&this.componentStyle?.name){let{css:e,style:i}=this.componentStyle?.getComponentTheme?.()||{};this.componentStyle?.load(e,S({name:`${this.componentStyle?.name}-variables`},this.styleOptions)),this.componentStyle?.loadTheme(S({name:`${this.componentStyle?.name}-style`},this.styleOptions),i),T.setLoadedStyleName(this.componentStyle?.name)}if(!T.isStyleNameLoaded("layer-order")){let e=this.componentStyle?.getLayerOrderThemeCSS?.();this.baseStyle.load(e,S({name:"layer-order",first:!0},this.styleOptions)),T.setLoadedStyleName("layer-order")}this.dt&&(this._loadScopedThemeStyles(this.dt),this._themeChangeListener(()=>this._loadScopedThemeStyles(this.dt)))}_loadScopedThemeStyles(e){let{css:i}=this.componentStyle?.getPresetTheme?.(e,`[${this.attrSelector}]`)||{},o=this.componentStyle?.load(i,S({name:`${this.attrSelector}-${this.componentStyle?.name}`},this.styleOptions));this.scopedStyleEl=o?.el}_unloadScopedThemeStyles(){this.scopedStyleEl?.remove()}_themeChangeListener(e=()=>{}){Ut.clearLoadedStyleNames(),De.on("theme:change",e),this.themeChangeListeners.push(e)}cx(e,i={}){return Lt(this._getOptionValue(this.$style?.classes,e,S({instance:this},i)))}sx(e="",i=!0,o={}){if(i)return this._getOptionValue(this.$style?.inlineStyles,e,S({instance:this},o))}get parent(){return this.parentInstance}get $style(){return this.parent?this.parent.componentStyle:this.componentStyle}cn=Lt;static \u0275fac=function(i){return new(i||t)};static \u0275dir=w({type:t,inputs:{dt:"dt"},features:[x([da,G]),Ee]})}return t})();var pa=`
    .p-ink {
        display: block;
        position: absolute;
        background: dt('ripple.background');
        border-radius: 100%;
        transform: scale(0);
        pointer-events: none;
    }

    .p-ink-active {
        animation: ripple 0.4s linear;
    }

    @keyframes ripple {
        100% {
            opacity: 0;
            transform: scale(2.5);
        }
    }
`;var Tc=`
    ${pa}
    /* For PrimeNG */
    .p-ripple {
        overflow: hidden;
        position: relative;
    }

    .p-ripple-disabled .p-ink {
        display: none !important;
    }

    @keyframes ripple {
        100% {
            opacity: 0;
            transform: scale(2.5);
        }
    }
`,xc={root:"p-ink"},ha=(()=>{class t extends G{name="ripple";theme=Tc;classes=xc;static \u0275fac=(()=>{let e;return function(o){return(e||(e=y(t)))(o||t)}})();static \u0275prov=v({token:t,factory:t.\u0275fac})}return t})();var Ci=(()=>{class t extends ne{zone=f(Nn);_componentStyle=f(ha);animationListener;mouseDownListener;timeout;constructor(){super(),Zt(()=>{qn(this.platformId)&&(this.config.ripple()?this.zone.runOutsideAngular(()=>{this.create(),this.mouseDownListener=this.renderer.listen(this.el.nativeElement,"mousedown",this.onMouseDown.bind(this))}):this.remove())})}ngAfterViewInit(){super.ngAfterViewInit()}onMouseDown(e){let i=this.getInk();if(!i||this.document.defaultView?.getComputedStyle(i,null).display==="none")return;if(nt(i,"p-ink-active"),!oo(i)&&!so(i)){let a=Math.max(io(this.el.nativeElement),ii(this.el.nativeElement));i.style.height=a+"px",i.style.width=a+"px"}let o=ro(this.el.nativeElement),r=e.pageX-o.left+this.document.body.scrollTop-so(i)/2,s=e.pageY-o.top+this.document.body.scrollLeft-oo(i)/2;this.renderer.setStyle(i,"top",s+"px"),this.renderer.setStyle(i,"left",r+"px"),Qe(i,"p-ink-active"),this.timeout=setTimeout(()=>{let a=this.getInk();a&&nt(a,"p-ink-active")},401)}getInk(){let e=this.el.nativeElement.children;for(let i=0;i<e.length;i++)if(typeof e[i].className=="string"&&e[i].className.indexOf("p-ink")!==-1)return e[i];return null}resetInk(){let e=this.getInk();e&&nt(e,"p-ink-active")}onAnimationEnd(e){this.timeout&&clearTimeout(this.timeout),nt(e.currentTarget,"p-ink-active")}create(){let e=this.renderer.createElement("span");this.renderer.addClass(e,"p-ink"),this.renderer.appendChild(this.el.nativeElement,e),this.renderer.setAttribute(e,"aria-hidden","true"),this.renderer.setAttribute(e,"role","presentation"),this.animationListener||(this.animationListener=this.renderer.listen(e,"animationend",this.onAnimationEnd.bind(this)))}remove(){let e=this.getInk();e&&(this.mouseDownListener&&this.mouseDownListener(),this.animationListener&&this.animationListener(),this.mouseDownListener=null,this.animationListener=null,rs(e))}ngOnDestroy(){this.config&&this.config.ripple()&&this.remove(),super.ngOnDestroy()}static \u0275fac=function(i){return new(i||t)};static \u0275dir=w({type:t,selectors:[["","pRipple",""]],hostAttrs:[1,"p-ripple"],features:[x([ha]),C]})}return t})(),em=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=P({type:t});static \u0275inj=L({})}return t})();var fa=`
    .p-togglebutton {
        display: inline-flex;
        cursor: pointer;
        user-select: none;
        overflow: hidden;
        position: relative;
        color: dt('togglebutton.color');
        background: dt('togglebutton.background');
        border: 1px solid dt('togglebutton.border.color');
        padding: dt('togglebutton.padding');
        font-size: 1rem;
        font-family: inherit;
        font-feature-settings: inherit;
        transition:
            background dt('togglebutton.transition.duration'),
            color dt('togglebutton.transition.duration'),
            border-color dt('togglebutton.transition.duration'),
            outline-color dt('togglebutton.transition.duration'),
            box-shadow dt('togglebutton.transition.duration');
        border-radius: dt('togglebutton.border.radius');
        outline-color: transparent;
        font-weight: dt('togglebutton.font.weight');
    }

    .p-togglebutton-content {
        display: inline-flex;
        flex: 1 1 auto;
        align-items: center;
        justify-content: center;
        gap: dt('togglebutton.gap');
        padding: dt('togglebutton.content.padding');
        background: transparent;
        border-radius: dt('togglebutton.content.border.radius');
        transition:
            background dt('togglebutton.transition.duration'),
            color dt('togglebutton.transition.duration'),
            border-color dt('togglebutton.transition.duration'),
            outline-color dt('togglebutton.transition.duration'),
            box-shadow dt('togglebutton.transition.duration');
    }

    .p-togglebutton:not(:disabled):not(.p-togglebutton-checked):hover {
        background: dt('togglebutton.hover.background');
        color: dt('togglebutton.hover.color');
    }

    .p-togglebutton.p-togglebutton-checked {
        background: dt('togglebutton.checked.background');
        border-color: dt('togglebutton.checked.border.color');
        color: dt('togglebutton.checked.color');
    }

    .p-togglebutton-checked .p-togglebutton-content {
        background: dt('togglebutton.content.checked.background');
        box-shadow: dt('togglebutton.content.checked.shadow');
    }

    .p-togglebutton:focus-visible {
        box-shadow: dt('togglebutton.focus.ring.shadow');
        outline: dt('togglebutton.focus.ring.width') dt('togglebutton.focus.ring.style') dt('togglebutton.focus.ring.color');
        outline-offset: dt('togglebutton.focus.ring.offset');
    }

    .p-togglebutton.p-invalid {
        border-color: dt('togglebutton.invalid.border.color');
    }

    .p-togglebutton:disabled {
        opacity: 1;
        cursor: default;
        background: dt('togglebutton.disabled.background');
        border-color: dt('togglebutton.disabled.border.color');
        color: dt('togglebutton.disabled.color');
    }

    .p-togglebutton-label,
    .p-togglebutton-icon {
        position: relative;
        transition: none;
    }

    .p-togglebutton-icon {
        color: dt('togglebutton.icon.color');
    }

    .p-togglebutton:not(:disabled):not(.p-togglebutton-checked):hover .p-togglebutton-icon {
        color: dt('togglebutton.icon.hover.color');
    }

    .p-togglebutton.p-togglebutton-checked .p-togglebutton-icon {
        color: dt('togglebutton.icon.checked.color');
    }

    .p-togglebutton:disabled .p-togglebutton-icon {
        color: dt('togglebutton.icon.disabled.color');
    }

    .p-togglebutton-sm {
        padding: dt('togglebutton.sm.padding');
        font-size: dt('togglebutton.sm.font.size');
    }

    .p-togglebutton-sm .p-togglebutton-content {
        padding: dt('togglebutton.content.sm.padding');
    }

    .p-togglebutton-lg {
        padding: dt('togglebutton.lg.padding');
        font-size: dt('togglebutton.lg.font.size');
    }

    .p-togglebutton-lg .p-togglebutton-content {
        padding: dt('togglebutton.content.lg.padding');
    }

    .p-togglebutton-fluid {
        width: 100%;
    }
`;var _i=(()=>{class t extends ne{modelValue=X(void 0);$filled=ee(()=>R(this.modelValue()));writeModelValue(e){this.modelValue.set(e)}static \u0275fac=(()=>{let e;return function(o){return(e||(e=y(t)))(o||t)}})();static \u0275dir=w({type:t,features:[C]})}return t})();var at=(()=>{class t extends _i{required=F(void 0,{transform:_});invalid=F(void 0,{transform:_});disabled=F(void 0,{transform:_});name=F();_disabled=X(!1);$disabled=ee(()=>this.disabled()||this._disabled());onModelChange=()=>{};onModelTouched=()=>{};writeDisabledState(e){this._disabled.set(e)}writeControlValue(e,i){}writeValue(e){this.writeControlValue(e,this.writeModelValue.bind(this))}registerOnChange(e){this.onModelChange=e}registerOnTouched(e){this.onModelTouched=e}setDisabledState(e){this.writeDisabledState(e),this.cd.markForCheck()}static \u0275fac=(()=>{let e;return function(o){return(e||(e=y(t)))(o||t)}})();static \u0275dir=w({type:t,inputs:{required:[1,"required"],invalid:[1,"invalid"],disabled:[1,"disabled"],name:[1,"name"]},features:[C]})}return t})();var Mc=["icon"],Oc=["content"],ma=t=>({$implicit:t});function kc(t,n){t&1&&gt(0)}function Nc(t,n){if(t&1&&xe(0,"span"),t&2){let e=V(3);k(e.cn(e.cx("icon"),e.checked?e.onIcon:e.offIcon,e.iconPos==="left"?e.cx("iconLeft"):e.cx("iconRight"))),K("data-pc-section","icon")}}function Rc(t,n){if(t&1&&wt(0,Nc,1,3,"span",1),t&2){let e=V(2);St(e.onIcon||e.offIcon?0:-1)}}function Lc(t,n){t&1&&gt(0)}function Pc(t,n){if(t&1&&J(0,Lc,1,0,"ng-container",0),t&2){let e=V(2);M("ngTemplateOutlet",e.iconTemplate||e._iconTemplate)("ngTemplateOutletContext",Tt(2,ma,e.checked))}}function Vc(t,n){if(t&1&&(wt(0,Rc,1,1)(1,Pc,1,4,"ng-container"),Fe(2,"span"),At(3),Te()),t&2){let e=V();St(e.iconTemplate?1:0),O(2),k(e.cx("label")),K("data-pc-section","label"),O(),Ft(e.checked?e.hasOnLabel?e.onLabel:"\xA0":e.hasOffLabel?e.offLabel:"\xA0")}}var Bc=`
    ${fa}

    /* For PrimeNG (iconPos) */
    .p-togglebutton-icon-right {
        order: 1;
    }

    .p-togglebutton.ng-invalid.ng-dirty {
        border-color: dt('togglebutton.invalid.border.color');
    }
`,$c={root:({instance:t})=>["p-togglebutton p-component",{"p-togglebutton-checked":t.checked,"p-invalid":t.invalid(),"p-disabled":t.$disabled(),"p-togglebutton-sm p-inputfield-sm":t.size==="small","p-togglebutton-lg p-inputfield-lg":t.size==="large","p-togglebutton-fluid":t.fluid()}],content:"p-togglebutton-content",icon:"p-togglebutton-icon",iconLeft:"p-togglebutton-icon-left",iconRight:"p-togglebutton-icon-right",label:"p-togglebutton-label"},ga=(()=>{class t extends G{name="togglebutton";theme=Bc;classes=$c;static \u0275fac=(()=>{let e;return function(o){return(e||(e=y(t)))(o||t)}})();static \u0275prov=v({token:t,factory:t.\u0275fac})}return t})();var jc={provide:He,useExisting:ie(()=>Ei),multi:!0},Ei=(()=>{class t extends at{onKeyDown(e){switch(e.code){case"Enter":this.toggle(e),e.preventDefault();break;case"Space":this.toggle(e),e.preventDefault();break}}toggle(e){!this.$disabled()&&!(this.allowEmpty===!1&&this.checked)&&(this.checked=!this.checked,this.writeModelValue(this.checked),this.onModelChange(this.checked),this.onModelTouched(),this.onChange.emit({originalEvent:e,checked:this.checked}),this.cd.markForCheck())}onLabel="Yes";offLabel="No";onIcon;offIcon;ariaLabel;ariaLabelledBy;styleClass;inputId;tabindex=0;iconPos="left";autofocus;size;allowEmpty;fluid=F(void 0,{transform:_});onChange=new Q;iconTemplate;contentTemplate;templates;checked=!1;_componentStyle=f(ga);onBlur(){this.onModelTouched()}get hasOnLabel(){return this.onLabel&&this.onLabel.length>0}get hasOffLabel(){return this.onLabel&&this.onLabel.length>0}get active(){return this.checked===!0}_iconTemplate;_contentTemplate;ngAfterContentInit(){this.templates.forEach(e=>{switch(e.getType()){case"icon":this._iconTemplate=e.template;break;case"content":this._contentTemplate=e.template;break;default:this._contentTemplate=e.template;break}})}writeControlValue(e,i){this.checked=e,i(e),this.cd.markForCheck()}static \u0275fac=(()=>{let e;return function(o){return(e||(e=y(t)))(o||t)}})();static \u0275cmp=W({type:t,selectors:[["p-toggleButton"],["p-togglebutton"],["p-toggle-button"]],contentQueries:function(i,o,r){if(i&1&&(ce(r,Mc,4),ce(r,Oc,4),ce(r,rt,4)),i&2){let s;se(s=ae())&&(o.iconTemplate=s.first),se(s=ae())&&(o.contentTemplate=s.first),se(s=ae())&&(o.templates=s)}},hostVars:6,hostBindings:function(i,o){i&1&&fe("keydown",function(s){return o.onKeyDown(s)})("click",function(s){return o.toggle(s)}),i&2&&(K("aria-labelledby",o.ariaLabelledBy)("aria-pressed",o.checked)("role","button")("tabindex",o.$disabled()?-1:0),k(o.cn(o.cx("root"),o.styleClass)))},inputs:{onLabel:"onLabel",offLabel:"offLabel",onIcon:"onIcon",offIcon:"offIcon",ariaLabel:"ariaLabel",ariaLabelledBy:"ariaLabelledBy",styleClass:"styleClass",inputId:"inputId",tabindex:[2,"tabindex","tabindex",Ke],iconPos:"iconPos",autofocus:[2,"autofocus","autofocus",_],size:"size",allowEmpty:"allowEmpty",fluid:[1,"fluid"]},outputs:{onChange:"onChange"},features:[x([jc,ga]),Ho([Ci]),C],decls:3,vars:7,consts:[[4,"ngTemplateOutlet","ngTemplateOutletContext"],[3,"class"]],template:function(i,o){i&1&&(Fe(0,"span"),J(1,kc,1,0,"ng-container",0),wt(2,Vc,4,5),Te()),i&2&&(k(o.cx("content")),O(),M("ngTemplateOutlet",o.contentTemplate||o._contentTemplate)("ngTemplateOutletContext",Tt(5,ma,o.checked)),O(),St(o.contentTemplate?-1:2))},dependencies:[ue,Ye,Z],encapsulation:2,changeDetection:0})}return t})(),Fm=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=P({type:t});static \u0275inj=L({imports:[Ei,Z,Z]})}return t})();var ba=`
    .p-selectbutton {
        display: inline-flex;
        user-select: none;
        vertical-align: bottom;
        outline-color: transparent;
        border-radius: dt('selectbutton.border.radius');
    }

    .p-selectbutton .p-togglebutton {
        border-radius: 0;
        border-width: 1px 1px 1px 0;
    }

    .p-selectbutton .p-togglebutton:focus-visible {
        position: relative;
        z-index: 1;
    }

    .p-selectbutton .p-togglebutton:first-child {
        border-inline-start-width: 1px;
        border-start-start-radius: dt('selectbutton.border.radius');
        border-end-start-radius: dt('selectbutton.border.radius');
    }

    .p-selectbutton .p-togglebutton:last-child {
        border-start-end-radius: dt('selectbutton.border.radius');
        border-end-end-radius: dt('selectbutton.border.radius');
    }

    .p-selectbutton.p-invalid {
        outline: 1px solid dt('selectbutton.invalid.border.color');
        outline-offset: 0;
    }

    .p-selectbutton-fluid {
        width: 100%;
    }
    
    .p-selectbutton-fluid .p-togglebutton {
        flex: 1 1 0;
    }
`;var Uc=["item"],Hc=(t,n)=>({$implicit:t,index:n});function zc(t,n){return this.getOptionLabel(n)}function Gc(t,n){t&1&&gt(0)}function Wc(t,n){if(t&1&&J(0,Gc,1,0,"ng-container",3),t&2){let e=V(2),i=e.$implicit,o=e.$index,r=V();M("ngTemplateOutlet",r.itemTemplate||r._itemTemplate)("ngTemplateOutletContext",Ln(2,Hc,i,o))}}function Kc(t,n){t&1&&J(0,Wc,1,5,"ng-template",null,0,Qo)}function qc(t,n){if(t&1){let e=Rn();Fe(0,"p-togglebutton",2),fe("onChange",function(o){let r=Dt(e),s=r.$implicit,a=r.$index,l=V();return Ct(l.onOptionSelect(o,s,a))}),wt(1,Kc,2,0),Te()}if(t&2){let e=n.$implicit,i=V();M("autofocus",i.autofocus)("styleClass",i.styleClass)("ngModel",i.isSelected(e))("onLabel",i.getOptionLabel(e))("offLabel",i.getOptionLabel(e))("disabled",i.$disabled()||i.isOptionDisabled(e))("allowEmpty",i.getAllowEmpty())("size",i.size())("fluid",i.fluid()),O(),St(i.itemTemplate||i._itemTemplate?1:-1)}}var Yc=`
    ${ba}

    /* For PrimeNG */
    .p-selectbutton.ng-invalid.ng-dirty {
        outline: 1px solid dt('selectbutton.invalid.border.color');
        outline-offset: 0;
    }
`,Zc={root:({instance:t})=>["p-selectbutton p-component",{"p-invalid":t.invalid(),"p-selectbutton-fluid":t.fluid()}]},ya=(()=>{class t extends G{name="selectbutton";theme=Yc;classes=Zc;static \u0275fac=(()=>{let e;return function(o){return(e||(e=y(t)))(o||t)}})();static \u0275prov=v({token:t,factory:t.\u0275fac})}return t})();var Xc={provide:He,useExisting:ie(()=>va),multi:!0},va=(()=>{class t extends at{options;optionLabel;optionValue;optionDisabled;get unselectable(){return this._unselectable}_unselectable=!1;set unselectable(e){this._unselectable=e,this.allowEmpty=!e}tabindex=0;multiple;allowEmpty=!0;styleClass;ariaLabelledBy;dataKey;autofocus;size=F();fluid=F(void 0,{transform:_});onOptionClick=new Q;onChange=new Q;itemTemplate;_itemTemplate;get equalityKey(){return this.optionValue?null:this.dataKey}value;focusedIndex=0;_componentStyle=f(ya);getAllowEmpty(){return this.multiple?this.allowEmpty||this.value?.length!==1:this.allowEmpty}getOptionLabel(e){return this.optionLabel?it(e,this.optionLabel):e.label!=null?e.label:e}getOptionValue(e){return this.optionValue?it(e,this.optionValue):this.optionLabel||e.value===void 0?e:e.value}isOptionDisabled(e){return this.optionDisabled?it(e,this.optionDisabled):e.disabled!==void 0?e.disabled:!1}onOptionSelect(e,i,o){if(this.$disabled()||this.isOptionDisabled(i))return;let r=this.isSelected(i);if(r&&this.unselectable)return;let s=this.getOptionValue(i),a;if(this.multiple)r?a=this.value.filter(l=>!Ue(l,s,this.equalityKey)):a=this.value?[...this.value,s]:[s];else{if(r&&!this.allowEmpty)return;a=r?null:s}this.focusedIndex=o,this.value=a,this.writeModelValue(this.value),this.onModelChange(this.value),this.onChange.emit({originalEvent:e,value:this.value}),this.onOptionClick.emit({originalEvent:e,option:i,index:o})}changeTabIndexes(e,i){let o,r;for(let s=0;s<=this.el.nativeElement.children.length-1;s++)this.el.nativeElement.children[s].getAttribute("tabindex")==="0"&&(o={elem:this.el.nativeElement.children[s],index:s});i==="prev"?o.index===0?r=this.el.nativeElement.children.length-1:r=o.index-1:o.index===this.el.nativeElement.children.length-1?r=0:r=o.index+1,this.focusedIndex=r,this.el.nativeElement.children[r].focus()}onFocus(e,i){this.focusedIndex=i}onBlur(){this.onModelTouched()}removeOption(e){this.value=this.value.filter(i=>!Ue(i,this.getOptionValue(e),this.dataKey))}isSelected(e){let i=!1,o=this.getOptionValue(e);if(this.multiple){if(this.value&&Array.isArray(this.value)){for(let r of this.value)if(Ue(r,o,this.dataKey)){i=!0;break}}}else i=Ue(this.getOptionValue(e),this.value,this.equalityKey);return i}templates;ngAfterContentInit(){this.templates.forEach(e=>{switch(e.getType()){case"item":this._itemTemplate=e.template;break}})}writeControlValue(e,i){this.value=e,i(this.value),this.cd.markForCheck()}static \u0275fac=(()=>{let e;return function(o){return(e||(e=y(t)))(o||t)}})();static \u0275cmp=W({type:t,selectors:[["p-selectButton"],["p-selectbutton"],["p-select-button"]],contentQueries:function(i,o,r){if(i&1&&(ce(r,Uc,4),ce(r,rt,4)),i&2){let s;se(s=ae())&&(o.itemTemplate=s.first),se(s=ae())&&(o.templates=s)}},hostVars:6,hostBindings:function(i,o){i&2&&(K("role","group")("aria-labelledby",o.ariaLabelledBy)("data-pc-section","root")("data-pc-name","selectbutton"),k(o.cx("root")))},inputs:{options:"options",optionLabel:"optionLabel",optionValue:"optionValue",optionDisabled:"optionDisabled",unselectable:[2,"unselectable","unselectable",_],tabindex:[2,"tabindex","tabindex",Ke],multiple:[2,"multiple","multiple",_],allowEmpty:[2,"allowEmpty","allowEmpty",_],styleClass:"styleClass",ariaLabelledBy:"ariaLabelledBy",dataKey:"dataKey",autofocus:[2,"autofocus","autofocus",_],size:[1,"size"],fluid:[1,"fluid"]},outputs:{onOptionClick:"onOptionClick",onChange:"onChange"},features:[x([Xc,ya]),C],decls:2,vars:0,consts:[["content",""],[3,"autofocus","styleClass","ngModel","onLabel","offLabel","disabled","allowEmpty","size","fluid"],[3,"onChange","autofocus","styleClass","ngModel","onLabel","offLabel","disabled","allowEmpty","size","fluid"],[4,"ngTemplateOutlet","ngTemplateOutletContext"]],template:function(i,o){i&1&&Go(0,qc,2,10,"p-togglebutton",1,zc,!0),i&2&&Wo(o.options)},dependencies:[Ei,ca,Xs,Ao,ue,Ye,Z],encapsulation:2,changeDetection:0})}return t})(),qm=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=P({type:t});static \u0275inj=L({imports:[va,Z,Z]})}return t})();var Da=`
    .p-badge {
        display: inline-flex;
        border-radius: dt('badge.border.radius');
        align-items: center;
        justify-content: center;
        padding: dt('badge.padding');
        background: dt('badge.primary.background');
        color: dt('badge.primary.color');
        font-size: dt('badge.font.size');
        font-weight: dt('badge.font.weight');
        min-width: dt('badge.min.width');
        height: dt('badge.height');
    }

    .p-badge-dot {
        width: dt('badge.dot.size');
        min-width: dt('badge.dot.size');
        height: dt('badge.dot.size');
        border-radius: 50%;
        padding: 0;
    }

    .p-badge-circle {
        padding: 0;
        border-radius: 50%;
    }

    .p-badge-secondary {
        background: dt('badge.secondary.background');
        color: dt('badge.secondary.color');
    }

    .p-badge-success {
        background: dt('badge.success.background');
        color: dt('badge.success.color');
    }

    .p-badge-info {
        background: dt('badge.info.background');
        color: dt('badge.info.color');
    }

    .p-badge-warn {
        background: dt('badge.warn.background');
        color: dt('badge.warn.color');
    }

    .p-badge-danger {
        background: dt('badge.danger.background');
        color: dt('badge.danger.color');
    }

    .p-badge-contrast {
        background: dt('badge.contrast.background');
        color: dt('badge.contrast.color');
    }

    .p-badge-sm {
        font-size: dt('badge.sm.font.size');
        min-width: dt('badge.sm.min.width');
        height: dt('badge.sm.height');
    }

    .p-badge-lg {
        font-size: dt('badge.lg.font.size');
        min-width: dt('badge.lg.min.width');
        height: dt('badge.lg.height');
    }

    .p-badge-xl {
        font-size: dt('badge.xl.font.size');
        min-width: dt('badge.xl.min.width');
        height: dt('badge.xl.height');
    }
`;var Qc=`
    ${Da}

    /* For PrimeNG (directive)*/
    .p-overlay-badge {
        position: relative;
    }

    .p-overlay-badge > .p-badge {
        position: absolute;
        top: 0;
        inset-inline-end: 0;
        transform: translate(50%, -50%);
        transform-origin: 100% 0;
        margin: 0;
    }
`,Jc={root:({instance:t})=>["p-badge p-component",{"p-badge-circle":R(t.value())&&String(t.value()).length===1,"p-badge-dot":je(t.value()),"p-badge-sm":t.size()==="small"||t.badgeSize()==="small","p-badge-lg":t.size()==="large"||t.badgeSize()==="large","p-badge-xl":t.size()==="xlarge"||t.badgeSize()==="xlarge","p-badge-info":t.severity()==="info","p-badge-success":t.severity()==="success","p-badge-warn":t.severity()==="warn","p-badge-danger":t.severity()==="danger","p-badge-secondary":t.severity()==="secondary","p-badge-contrast":t.severity()==="contrast"}]},Ca=(()=>{class t extends G{name="badge";theme=Qc;classes=Jc;static \u0275fac=(()=>{let e;return function(o){return(e||(e=y(t)))(o||t)}})();static \u0275prov=v({token:t,factory:t.\u0275fac})}return t})();var Fo=(()=>{class t extends ne{styleClass=F();badgeSize=F();size=F();severity=F();value=F();badgeDisabled=F(!1,{transform:_});_componentStyle=f(Ca);static \u0275fac=(()=>{let e;return function(o){return(e||(e=y(t)))(o||t)}})();static \u0275cmp=W({type:t,selectors:[["p-badge"]],hostVars:4,hostBindings:function(i,o){i&2&&(k(o.cn(o.cx("root"),o.styleClass())),Zo("display",o.badgeDisabled()?"none":null))},inputs:{styleClass:[1,"styleClass"],badgeSize:[1,"badgeSize"],size:[1,"size"],severity:[1,"severity"],value:[1,"value"],badgeDisabled:[1,"badgeDisabled"]},features:[x([Ca]),C],decls:1,vars:1,template:function(i,o){i&1&&At(0),i&2&&Ft(o.value())},dependencies:[ue,Z],encapsulation:2,changeDetection:0})}return t})(),_a=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=P({type:t});static \u0275inj=L({imports:[Fo,Z,Z]})}return t})();var Ea=`
    .p-progressbar {
        display: block;
        position: relative;
        overflow: hidden;
        height: dt('progressbar.height');
        background: dt('progressbar.background');
        border-radius: dt('progressbar.border.radius');
    }

    .p-progressbar-value {
        margin: 0;
        background: dt('progressbar.value.background');
    }

    .p-progressbar-label {
        color: dt('progressbar.label.color');
        font-size: dt('progressbar.label.font.size');
        font-weight: dt('progressbar.label.font.weight');
    }

    .p-progressbar-determinate .p-progressbar-value {
        height: 100%;
        width: 0%;
        position: absolute;
        display: none;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        transition: width 1s ease-in-out;
    }

    .p-progressbar-determinate .p-progressbar-label {
        display: inline-flex;
    }

    .p-progressbar-indeterminate .p-progressbar-value::before {
        content: '';
        position: absolute;
        background: inherit;
        inset-block-start: 0;
        inset-inline-start: 0;
        inset-block-end: 0;
        will-change: inset-inline-start, inset-inline-end;
        animation: p-progressbar-indeterminate-anim 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
    }

    .p-progressbar-indeterminate .p-progressbar-value::after {
        content: '';
        position: absolute;
        background: inherit;
        inset-block-start: 0;
        inset-inline-start: 0;
        inset-block-end: 0;
        will-change: inset-inline-start, inset-inline-end;
        animation: p-progressbar-indeterminate-anim-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
        animation-delay: 1.15s;
    }

    @keyframes p-progressbar-indeterminate-anim {
        0% {
            inset-inline-start: -35%;
            inset-inline-end: 100%;
        }
        60% {
            inset-inline-start: 100%;
            inset-inline-end: -90%;
        }
        100% {
            inset-inline-start: 100%;
            inset-inline-end: -90%;
        }
    }
    @-webkit-keyframes p-progressbar-indeterminate-anim {
        0% {
            inset-inline-start: -35%;
            inset-inline-end: 100%;
        }
        60% {
            inset-inline-start: 100%;
            inset-inline-end: -90%;
        }
        100% {
            inset-inline-start: 100%;
            inset-inline-end: -90%;
        }
    }

    @keyframes p-progressbar-indeterminate-anim-short {
        0% {
            inset-inline-start: -200%;
            inset-inline-end: 100%;
        }
        60% {
            inset-inline-start: 107%;
            inset-inline-end: -8%;
        }
        100% {
            inset-inline-start: 107%;
            inset-inline-end: -8%;
        }
    }
    @-webkit-keyframes p-progressbar-indeterminate-anim-short {
        0% {
            inset-inline-start: -200%;
            inset-inline-end: 100%;
        }
        60% {
            inset-inline-start: 107%;
            inset-inline-end: -8%;
        }
        100% {
            inset-inline-start: 107%;
            inset-inline-end: -8%;
        }
    }
`;var td=["*"],nd={root:"p-fluid"},wa=(()=>{class t extends G{name="fluid";classes=nd;theme=Ea;static \u0275fac=(()=>{let e;return function(o){return(e||(e=y(t)))(o||t)}})();static \u0275prov=v({token:t,factory:t.\u0275fac})}return t})();var lt=(()=>{class t extends ne{_componentStyle=f(wa);static \u0275fac=(()=>{let e;return function(o){return(e||(e=y(t)))(o||t)}})();static \u0275cmp=W({type:t,selectors:[["p-fluid"]],hostVars:2,hostBindings:function(i,o){i&2&&k(o.cx("root"))},features:[x([wa]),C],ngContentSelectors:td,decls:1,vars:0,template:function(i,o){i&1&&(Ge(),We(0))},dependencies:[ue],encapsulation:2,changeDetection:0})}return t})(),_b=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=P({type:t});static \u0275inj=L({imports:[lt]})}return t})();var To=(()=>{class t{static zindex=1e3;static calculatedScrollbarWidth=null;static calculatedScrollbarHeight=null;static browser;static addClass(e,i){e&&i&&(e.classList?e.classList.add(i):e.className+=" "+i)}static addMultipleClasses(e,i){if(e&&i)if(e.classList){let o=i.trim().split(" ");for(let r=0;r<o.length;r++)e.classList.add(o[r])}else{let o=i.split(" ");for(let r=0;r<o.length;r++)e.className+=" "+o[r]}}static removeClass(e,i){e&&i&&(e.classList?e.classList.remove(i):e.className=e.className.replace(new RegExp("(^|\\b)"+i.split(" ").join("|")+"(\\b|$)","gi")," "))}static removeMultipleClasses(e,i){e&&i&&[i].flat().filter(Boolean).forEach(o=>o.split(" ").forEach(r=>this.removeClass(e,r)))}static hasClass(e,i){return e&&i?e.classList?e.classList.contains(i):new RegExp("(^| )"+i+"( |$)","gi").test(e.className):!1}static siblings(e){return Array.prototype.filter.call(e.parentNode.children,function(i){return i!==e})}static find(e,i){return Array.from(e.querySelectorAll(i))}static findSingle(e,i){return this.isElement(e)?e.querySelector(i):null}static index(e){let i=e.parentNode.childNodes,o=0;for(var r=0;r<i.length;r++){if(i[r]==e)return o;i[r].nodeType==1&&o++}return-1}static indexWithinGroup(e,i){let o=e.parentNode?e.parentNode.childNodes:[],r=0;for(var s=0;s<o.length;s++){if(o[s]==e)return r;o[s].attributes&&o[s].attributes[i]&&o[s].nodeType==1&&r++}return-1}static appendOverlay(e,i,o="self"){o!=="self"&&e&&i&&this.appendChild(e,i)}static alignOverlay(e,i,o="self",r=!0){e&&i&&(r&&(e.style.minWidth=`${t.getOuterWidth(i)}px`),o==="self"?this.relativePosition(e,i):this.absolutePosition(e,i))}static relativePosition(e,i,o=!0){let r=B=>{if(B)return getComputedStyle(B).getPropertyValue("position")==="relative"?B:r(B.parentElement)},s=e.offsetParent?{width:e.offsetWidth,height:e.offsetHeight}:this.getHiddenElementDimensions(e),a=i.offsetHeight,l=i.getBoundingClientRect(),u=this.getWindowScrollTop(),c=this.getWindowScrollLeft(),d=this.getViewport(),p=r(e)?.getBoundingClientRect()||{top:-1*u,left:-1*c},m,E,g="top";l.top+a+s.height>d.height?(m=l.top-p.top-s.height,g="bottom",l.top+m<0&&(m=-1*l.top)):(m=a+l.top-p.top,g="top");let b=l.left+s.width-d.width,A=l.left-p.left;if(s.width>d.width?E=(l.left-p.left)*-1:b>0?E=A-b:E=l.left-p.left,e.style.top=m+"px",e.style.left=E+"px",e.style.transformOrigin=g,o){let B=ln(/-anchor-gutter$/)?.value;e.style.marginTop=g==="bottom"?`calc(${B??"2px"} * -1)`:B??""}}static absolutePosition(e,i,o=!0){let r=e.offsetParent?{width:e.offsetWidth,height:e.offsetHeight}:this.getHiddenElementDimensions(e),s=r.height,a=r.width,l=i.offsetHeight,u=i.offsetWidth,c=i.getBoundingClientRect(),d=this.getWindowScrollTop(),h=this.getWindowScrollLeft(),p=this.getViewport(),m,E;c.top+l+s>p.height?(m=c.top+d-s,e.style.transformOrigin="bottom",m<0&&(m=d)):(m=l+c.top+d,e.style.transformOrigin="top"),c.left+a>p.width?E=Math.max(0,c.left+h+u-a):E=c.left+h,e.style.top=m+"px",e.style.left=E+"px",o&&(e.style.marginTop=origin==="bottom"?"calc(var(--p-anchor-gutter) * -1)":"calc(var(--p-anchor-gutter))")}static getParents(e,i=[]){return e.parentNode===null?i:this.getParents(e.parentNode,i.concat([e.parentNode]))}static getScrollableParents(e){let i=[];if(e){let o=this.getParents(e),r=/(auto|scroll)/,s=a=>{let l=window.getComputedStyle(a,null);return r.test(l.getPropertyValue("overflow"))||r.test(l.getPropertyValue("overflowX"))||r.test(l.getPropertyValue("overflowY"))};for(let a of o){let l=a.nodeType===1&&a.dataset.scrollselectors;if(l){let u=l.split(",");for(let c of u){let d=this.findSingle(a,c);d&&s(d)&&i.push(d)}}a.nodeType!==9&&s(a)&&i.push(a)}}return i}static getHiddenElementOuterHeight(e){e.style.visibility="hidden",e.style.display="block";let i=e.offsetHeight;return e.style.display="none",e.style.visibility="visible",i}static getHiddenElementOuterWidth(e){e.style.visibility="hidden",e.style.display="block";let i=e.offsetWidth;return e.style.display="none",e.style.visibility="visible",i}static getHiddenElementDimensions(e){let i={};return e.style.visibility="hidden",e.style.display="block",i.width=e.offsetWidth,i.height=e.offsetHeight,e.style.display="none",e.style.visibility="visible",i}static scrollInView(e,i){let o=getComputedStyle(e).getPropertyValue("borderTopWidth"),r=o?parseFloat(o):0,s=getComputedStyle(e).getPropertyValue("paddingTop"),a=s?parseFloat(s):0,l=e.getBoundingClientRect(),c=i.getBoundingClientRect().top+document.body.scrollTop-(l.top+document.body.scrollTop)-r-a,d=e.scrollTop,h=e.clientHeight,p=this.getOuterHeight(i);c<0?e.scrollTop=d+c:c+p>h&&(e.scrollTop=d+c-h+p)}static fadeIn(e,i){e.style.opacity=0;let o=+new Date,r=0,s=function(){r=+e.style.opacity.replace(",",".")+(new Date().getTime()-o)/i,e.style.opacity=r,o=+new Date,+r<1&&(window.requestAnimationFrame&&requestAnimationFrame(s)||setTimeout(s,16))};s()}static fadeOut(e,i){var o=1,r=50,s=i,a=r/s;let l=setInterval(()=>{o=o-a,o<=0&&(o=0,clearInterval(l)),e.style.opacity=o},r)}static getWindowScrollTop(){let e=document.documentElement;return(window.pageYOffset||e.scrollTop)-(e.clientTop||0)}static getWindowScrollLeft(){let e=document.documentElement;return(window.pageXOffset||e.scrollLeft)-(e.clientLeft||0)}static matches(e,i){var o=Element.prototype,r=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.msMatchesSelector||function(s){return[].indexOf.call(document.querySelectorAll(s),this)!==-1};return r.call(e,i)}static getOuterWidth(e,i){let o=e.offsetWidth;if(i){let r=getComputedStyle(e);o+=parseFloat(r.marginLeft)+parseFloat(r.marginRight)}return o}static getHorizontalPadding(e){let i=getComputedStyle(e);return parseFloat(i.paddingLeft)+parseFloat(i.paddingRight)}static getHorizontalMargin(e){let i=getComputedStyle(e);return parseFloat(i.marginLeft)+parseFloat(i.marginRight)}static innerWidth(e){let i=e.offsetWidth,o=getComputedStyle(e);return i+=parseFloat(o.paddingLeft)+parseFloat(o.paddingRight),i}static width(e){let i=e.offsetWidth,o=getComputedStyle(e);return i-=parseFloat(o.paddingLeft)+parseFloat(o.paddingRight),i}static getInnerHeight(e){let i=e.offsetHeight,o=getComputedStyle(e);return i+=parseFloat(o.paddingTop)+parseFloat(o.paddingBottom),i}static getOuterHeight(e,i){let o=e.offsetHeight;if(i){let r=getComputedStyle(e);o+=parseFloat(r.marginTop)+parseFloat(r.marginBottom)}return o}static getHeight(e){let i=e.offsetHeight,o=getComputedStyle(e);return i-=parseFloat(o.paddingTop)+parseFloat(o.paddingBottom)+parseFloat(o.borderTopWidth)+parseFloat(o.borderBottomWidth),i}static getWidth(e){let i=e.offsetWidth,o=getComputedStyle(e);return i-=parseFloat(o.paddingLeft)+parseFloat(o.paddingRight)+parseFloat(o.borderLeftWidth)+parseFloat(o.borderRightWidth),i}static getViewport(){let e=window,i=document,o=i.documentElement,r=i.getElementsByTagName("body")[0],s=e.innerWidth||o.clientWidth||r.clientWidth,a=e.innerHeight||o.clientHeight||r.clientHeight;return{width:s,height:a}}static getOffset(e){var i=e.getBoundingClientRect();return{top:i.top+(window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0),left:i.left+(window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0)}}static replaceElementWith(e,i){let o=e.parentNode;if(!o)throw"Can't replace element";return o.replaceChild(i,e)}static getUserAgent(){if(navigator&&this.isClient())return navigator.userAgent}static isIE(){var e=window.navigator.userAgent,i=e.indexOf("MSIE ");if(i>0)return!0;var o=e.indexOf("Trident/");if(o>0){var r=e.indexOf("rv:");return!0}var s=e.indexOf("Edge/");return s>0}static isIOS(){return/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream}static isAndroid(){return/(android)/i.test(navigator.userAgent)}static isTouchDevice(){return"ontouchstart"in window||navigator.maxTouchPoints>0}static appendChild(e,i){if(this.isElement(i))i.appendChild(e);else if(i&&i.el&&i.el.nativeElement)i.el.nativeElement.appendChild(e);else throw"Cannot append "+i+" to "+e}static removeChild(e,i){if(this.isElement(i))i.removeChild(e);else if(i.el&&i.el.nativeElement)i.el.nativeElement.removeChild(e);else throw"Cannot remove "+e+" from "+i}static removeElement(e){"remove"in Element.prototype?e.remove():e.parentNode.removeChild(e)}static isElement(e){return typeof HTMLElement=="object"?e instanceof HTMLElement:e&&typeof e=="object"&&e!==null&&e.nodeType===1&&typeof e.nodeName=="string"}static calculateScrollbarWidth(e){if(e){let i=getComputedStyle(e);return e.offsetWidth-e.clientWidth-parseFloat(i.borderLeftWidth)-parseFloat(i.borderRightWidth)}else{if(this.calculatedScrollbarWidth!==null)return this.calculatedScrollbarWidth;let i=document.createElement("div");i.className="p-scrollbar-measure",document.body.appendChild(i);let o=i.offsetWidth-i.clientWidth;return document.body.removeChild(i),this.calculatedScrollbarWidth=o,o}}static calculateScrollbarHeight(){if(this.calculatedScrollbarHeight!==null)return this.calculatedScrollbarHeight;let e=document.createElement("div");e.className="p-scrollbar-measure",document.body.appendChild(e);let i=e.offsetHeight-e.clientHeight;return document.body.removeChild(e),this.calculatedScrollbarWidth=i,i}static invokeElementMethod(e,i,o){e[i].apply(e,o)}static clearSelection(){if(window.getSelection)window.getSelection().empty?window.getSelection().empty():window.getSelection().removeAllRanges&&window.getSelection().rangeCount>0&&window.getSelection().getRangeAt(0).getClientRects().length>0&&window.getSelection().removeAllRanges();else if(document.selection&&document.selection.empty)try{document.selection.empty()}catch{}}static getBrowser(){if(!this.browser){let e=this.resolveUserAgent();this.browser={},e.browser&&(this.browser[e.browser]=!0,this.browser.version=e.version),this.browser.chrome?this.browser.webkit=!0:this.browser.webkit&&(this.browser.safari=!0)}return this.browser}static resolveUserAgent(){let e=navigator.userAgent.toLowerCase(),i=/(chrome)[ \/]([\w.]+)/.exec(e)||/(webkit)[ \/]([\w.]+)/.exec(e)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e)||/(msie) ([\w.]+)/.exec(e)||e.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e)||[];return{browser:i[1]||"",version:i[2]||"0"}}static isInteger(e){return Number.isInteger?Number.isInteger(e):typeof e=="number"&&isFinite(e)&&Math.floor(e)===e}static isHidden(e){return!e||e.offsetParent===null}static isVisible(e){return e&&e.offsetParent!=null}static isExist(e){return e!==null&&typeof e<"u"&&e.nodeName&&e.parentNode}static focus(e,i){e&&document.activeElement!==e&&e.focus(i)}static getFocusableSelectorString(e=""){return`button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
        [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
        input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
        select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
        textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
        [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
        [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
        .p-inputtext:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
        .p-button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e}`}static getFocusableElements(e,i=""){let o=this.find(e,this.getFocusableSelectorString(i)),r=[];for(let s of o){let a=getComputedStyle(s);this.isVisible(s)&&a.display!="none"&&a.visibility!="hidden"&&r.push(s)}return r}static getFocusableElement(e,i=""){let o=this.findSingle(e,this.getFocusableSelectorString(i));if(o){let r=getComputedStyle(o);if(this.isVisible(o)&&r.display!="none"&&r.visibility!="hidden")return o}return null}static getFirstFocusableElement(e,i=""){let o=this.getFocusableElements(e,i);return o.length>0?o[0]:null}static getLastFocusableElement(e,i){let o=this.getFocusableElements(e,i);return o.length>0?o[o.length-1]:null}static getNextFocusableElement(e,i=!1){let o=t.getFocusableElements(e),r=0;if(o&&o.length>0){let s=o.indexOf(o[0].ownerDocument.activeElement);i?s==-1||s===0?r=o.length-1:r=s-1:s!=-1&&s!==o.length-1&&(r=s+1)}return o[r]}static generateZIndex(){return this.zindex=this.zindex||999,++this.zindex}static getSelection(){return window.getSelection?window.getSelection().toString():document.getSelection?document.getSelection().toString():document.selection?document.selection.createRange().text:null}static getTargetElement(e,i){if(!e)return null;switch(e){case"document":return document;case"window":return window;case"@next":return i?.nextElementSibling;case"@prev":return i?.previousElementSibling;case"@parent":return i?.parentElement;case"@grandparent":return i?.parentElement.parentElement;default:let o=typeof e;if(o==="string")return document.querySelector(e);if(o==="object"&&e.hasOwnProperty("nativeElement"))return this.isExist(e.nativeElement)?e.nativeElement:void 0;let s=(a=>!!(a&&a.constructor&&a.call&&a.apply))(e)?e():e;return s&&s.nodeType===9||this.isExist(s)?s:null}}static isClient(){return!!(typeof window<"u"&&window.document&&window.document.createElement)}static getAttribute(e,i){if(e){let o=e.getAttribute(i);return isNaN(o)?o==="true"||o==="false"?o==="true":o:+o}}static calculateBodyScrollbarWidth(){return window.innerWidth-document.documentElement.offsetWidth}static blockBodyScroll(e="p-overflow-hidden"){document.body.style.setProperty("--scrollbar-width",this.calculateBodyScrollbarWidth()+"px"),this.addClass(document.body,e)}static unblockBodyScroll(e="p-overflow-hidden"){document.body.style.removeProperty("--scrollbar-width"),this.removeClass(document.body,e)}static createElement(e,i={},...o){if(e){let r=document.createElement(e);return this.setAttributes(r,i),r.append(...o),r}}static setAttribute(e,i="",o){this.isElement(e)&&o!==null&&o!==void 0&&e.setAttribute(i,o)}static setAttributes(e,i={}){if(this.isElement(e)){let o=(r,s)=>{let a=e?.$attrs?.[r]?[e?.$attrs?.[r]]:[];return[s].flat().reduce((l,u)=>{if(u!=null){let c=typeof u;if(c==="string"||c==="number")l.push(u);else if(c==="object"){let d=Array.isArray(u)?o(r,u):Object.entries(u).map(([h,p])=>r==="style"&&(p||p===0)?`${h.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()}:${p}`:p?h:void 0);l=d.length?l.concat(d.filter(h=>!!h)):l}}return l},a)};Object.entries(i).forEach(([r,s])=>{if(s!=null){let a=r.match(/^on(.+)/);a?e.addEventListener(a[1].toLowerCase(),s):r==="pBind"?this.setAttributes(e,s):(s=r==="class"?[...new Set(o("class",s))].join(" ").trim():r==="style"?o("style",s).join(";").trim():s,(e.$attrs=e.$attrs||{})&&(e.$attrs[r]=s),e.setAttribute(r,s))}})}}static isFocusableElement(e,i=""){return this.isElement(e)?e.matches(`button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${i},
                [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${i},
                input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${i},
                select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${i},
                textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${i},
                [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${i},
                [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${i}`):!1}}return t})();function Fb(){Qr({variableName:ho("scrollbar.width").name})}function Tb(){Jr({variableName:ho("scrollbar.width").name})}var Sa=class{element;listener;scrollableParents;constructor(n,e=()=>{}){this.element=n,this.listener=e}bindScrollListener(){this.scrollableParents=To.getScrollableParents(this.element);for(let n=0;n<this.scrollableParents.length;n++)this.scrollableParents[n].addEventListener("scroll",this.listener)}unbindScrollListener(){if(this.scrollableParents)for(let n=0;n<this.scrollableParents.length;n++)this.scrollableParents[n].removeEventListener("scroll",this.listener)}destroy(){this.unbindScrollListener(),this.element=null,this.listener=null,this.scrollableParents=null}};var Aa=(()=>{class t extends ne{autofocus=!1;focused=!1;platformId=f(_t);document=f(re);host=f(Ae);ngAfterContentChecked(){this.autofocus===!1?this.host.nativeElement.removeAttribute("autofocus"):this.host.nativeElement.setAttribute("autofocus",!0),this.focused||this.autoFocus()}ngAfterViewChecked(){this.focused||this.autoFocus()}autoFocus(){qn(this.platformId)&&this.autofocus&&setTimeout(()=>{let e=To.getFocusableElements(this.host?.nativeElement);e.length===0&&this.host.nativeElement.focus(),e.length>0&&e[0].focus(),this.focused=!0})}static \u0275fac=(()=>{let e;return function(o){return(e||(e=y(t)))(o||t)}})();static \u0275dir=w({type:t,selectors:[["","pAutoFocus",""]],inputs:{autofocus:[0,"pAutoFocus","autofocus"]},features:[C]})}return t})(),Pb=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=P({type:t});static \u0275inj=L({})}return t})();var id=["*"],od=`
.p-icon {
    display: inline-block;
    vertical-align: baseline;
}

.p-icon-spin {
    -webkit-animation: p-icon-spin 2s infinite linear;
    animation: p-icon-spin 2s infinite linear;
}

@-webkit-keyframes p-icon-spin {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg);
    }
}

@keyframes p-icon-spin {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg);
    }
}
`,Fa=(()=>{class t extends G{name="baseicon";css=od;static \u0275fac=(()=>{let e;return function(o){return(e||(e=y(t)))(o||t)}})();static \u0275prov=v({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var Wt=(()=>{class t extends ne{spin=!1;_componentStyle=f(Fa);getClassNames(){return Lt("p-icon",{"p-icon-spin":this.spin})}static \u0275fac=(()=>{let e;return function(o){return(e||(e=y(t)))(o||t)}})();static \u0275cmp=W({type:t,selectors:[["ng-component"]],hostAttrs:["width","14","height","14","viewBox","0 0 14 14","fill","none","xmlns","http://www.w3.org/2000/svg"],hostVars:2,hostBindings:function(i,o){i&2&&k(o.getClassNames())},inputs:{spin:[2,"spin","spin",_]},features:[x([Fa]),C],ngContentSelectors:id,decls:1,vars:0,template:function(i,o){i&1&&(Ge(),We(0))},encapsulation:2,changeDetection:0})}return t})();var rd=["data-p-icon","check"],Ta=(()=>{class t extends Wt{static \u0275fac=(()=>{let e;return function(o){return(e||(e=y(t)))(o||t)}})();static \u0275cmp=W({type:t,selectors:[["","data-p-icon","check"]],features:[C],attrs:rd,decls:1,vars:0,consts:[["d","M4.86199 11.5948C4.78717 11.5923 4.71366 11.5745 4.64596 11.5426C4.57826 11.5107 4.51779 11.4652 4.46827 11.4091L0.753985 7.69483C0.683167 7.64891 0.623706 7.58751 0.580092 7.51525C0.536478 7.44299 0.509851 7.36177 0.502221 7.27771C0.49459 7.19366 0.506156 7.10897 0.536046 7.03004C0.565935 6.95111 0.613367 6.88 0.674759 6.82208C0.736151 6.76416 0.8099 6.72095 0.890436 6.69571C0.970973 6.67046 1.05619 6.66385 1.13966 6.67635C1.22313 6.68886 1.30266 6.72017 1.37226 6.76792C1.44186 6.81567 1.4997 6.8786 1.54141 6.95197L4.86199 10.2503L12.6397 2.49483C12.7444 2.42694 12.8689 2.39617 12.9932 2.40745C13.1174 2.41873 13.2343 2.47141 13.3251 2.55705C13.4159 2.64268 13.4753 2.75632 13.4938 2.87973C13.5123 3.00315 13.4888 3.1292 13.4271 3.23768L5.2557 11.4091C5.20618 11.4652 5.14571 11.5107 5.07801 11.5426C5.01031 11.5745 4.9368 11.5923 4.86199 11.5948Z","fill","currentColor"]],template:function(i,o){i&1&&(Se(),pt(0,"path",0))},encapsulation:2})}return t})();var sd=["data-p-icon","spinner"],xa=(()=>{class t extends Wt{pathId;ngOnInit(){super.ngOnInit(),this.pathId="url(#"+un()+")"}static \u0275fac=(()=>{let e;return function(o){return(e||(e=y(t)))(o||t)}})();static \u0275cmp=W({type:t,selectors:[["","data-p-icon","spinner"]],features:[C],attrs:sd,decls:5,vars:2,consts:[["d","M6.99701 14C5.85441 13.999 4.72939 13.7186 3.72012 13.1832C2.71084 12.6478 1.84795 11.8737 1.20673 10.9284C0.565504 9.98305 0.165424 8.89526 0.041387 7.75989C-0.0826496 6.62453 0.073125 5.47607 0.495122 4.4147C0.917119 3.35333 1.59252 2.4113 2.46241 1.67077C3.33229 0.930247 4.37024 0.413729 5.4857 0.166275C6.60117 -0.0811796 7.76026 -0.0520535 8.86188 0.251112C9.9635 0.554278 10.9742 1.12227 11.8057 1.90555C11.915 2.01493 11.9764 2.16319 11.9764 2.31778C11.9764 2.47236 11.915 2.62062 11.8057 2.73C11.7521 2.78503 11.688 2.82877 11.6171 2.85864C11.5463 2.8885 11.4702 2.90389 11.3933 2.90389C11.3165 2.90389 11.2404 2.8885 11.1695 2.85864C11.0987 2.82877 11.0346 2.78503 10.9809 2.73C9.9998 1.81273 8.73246 1.26138 7.39226 1.16876C6.05206 1.07615 4.72086 1.44794 3.62279 2.22152C2.52471 2.99511 1.72683 4.12325 1.36345 5.41602C1.00008 6.70879 1.09342 8.08723 1.62775 9.31926C2.16209 10.5513 3.10478 11.5617 4.29713 12.1803C5.48947 12.7989 6.85865 12.988 8.17414 12.7157C9.48963 12.4435 10.6711 11.7264 11.5196 10.6854C12.3681 9.64432 12.8319 8.34282 12.8328 7C12.8328 6.84529 12.8943 6.69692 13.0038 6.58752C13.1132 6.47812 13.2616 6.41667 13.4164 6.41667C13.5712 6.41667 13.7196 6.47812 13.8291 6.58752C13.9385 6.69692 14 6.84529 14 7C14 8.85651 13.2622 10.637 11.9489 11.9497C10.6356 13.2625 8.85432 14 6.99701 14Z","fill","currentColor"],[3,"id"],["width","14","height","14","fill","white"]],template:function(i,o){i&1&&(Se(),Ti(0,"g"),pt(1,"path",0),xi(),Ti(2,"defs")(3,"clipPath",1),pt(4,"rect",2),xi()()),i&2&&(K("clip-path",o.pathId),O(3),Ko("id",o.pathId))},encapsulation:2})}return t})();var ad=["data-p-icon","times"],ty=(()=>{class t extends Wt{static \u0275fac=(()=>{let e;return function(o){return(e||(e=y(t)))(o||t)}})();static \u0275cmp=W({type:t,selectors:[["","data-p-icon","times"]],features:[C],attrs:ad,decls:1,vars:0,consts:[["d","M8.01186 7.00933L12.27 2.75116C12.341 2.68501 12.398 2.60524 12.4375 2.51661C12.4769 2.42798 12.4982 2.3323 12.4999 2.23529C12.5016 2.13827 12.4838 2.0419 12.4474 1.95194C12.4111 1.86197 12.357 1.78024 12.2884 1.71163C12.2198 1.64302 12.138 1.58893 12.0481 1.55259C11.9581 1.51625 11.8617 1.4984 11.7647 1.50011C11.6677 1.50182 11.572 1.52306 11.4834 1.56255C11.3948 1.60204 11.315 1.65898 11.2488 1.72997L6.99067 5.98814L2.7325 1.72997C2.59553 1.60234 2.41437 1.53286 2.22718 1.53616C2.03999 1.53946 1.8614 1.61529 1.72901 1.74767C1.59663 1.88006 1.5208 2.05865 1.5175 2.24584C1.5142 2.43303 1.58368 2.61419 1.71131 2.75116L5.96948 7.00933L1.71131 11.2675C1.576 11.403 1.5 11.5866 1.5 11.7781C1.5 11.9696 1.576 12.1532 1.71131 12.2887C1.84679 12.424 2.03043 12.5 2.2219 12.5C2.41338 12.5 2.59702 12.424 2.7325 12.2887L6.99067 8.03052L11.2488 12.2887C11.3843 12.424 11.568 12.5 11.7594 12.5C11.9509 12.5 12.1346 12.424 12.27 12.2887C12.4053 12.1532 12.4813 11.9696 12.4813 11.7781C12.4813 11.5866 12.4053 11.403 12.27 11.2675L8.01186 7.00933Z","fill","currentColor"]],template:function(i,o){i&1&&(Se(),pt(0,"path",0))},encapsulation:2})}return t})();var Ia=`
    .p-button {
        display: inline-flex;
        cursor: pointer;
        user-select: none;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        position: relative;
        color: dt('button.primary.color');
        background: dt('button.primary.background');
        border: 1px solid dt('button.primary.border.color');
        padding: dt('button.padding.y') dt('button.padding.x');
        font-size: 1rem;
        font-family: inherit;
        font-feature-settings: inherit;
        transition:
            background dt('button.transition.duration'),
            color dt('button.transition.duration'),
            border-color dt('button.transition.duration'),
            outline-color dt('button.transition.duration'),
            box-shadow dt('button.transition.duration');
        border-radius: dt('button.border.radius');
        outline-color: transparent;
        gap: dt('button.gap');
    }

    .p-button:disabled {
        cursor: default;
    }

    .p-button-icon-right {
        order: 1;
    }

    .p-button-icon-right:dir(rtl) {
        order: -1;
    }

    .p-button:not(.p-button-vertical) .p-button-icon:not(.p-button-icon-right):dir(rtl) {
        order: 1;
    }

    .p-button-icon-bottom {
        order: 2;
    }

    .p-button-icon-only {
        width: dt('button.icon.only.width');
        padding-inline-start: 0;
        padding-inline-end: 0;
        gap: 0;
    }

    .p-button-icon-only.p-button-rounded {
        border-radius: 50%;
        height: dt('button.icon.only.width');
    }

    .p-button-icon-only .p-button-label {
        visibility: hidden;
        width: 0;
    }

    .p-button-icon-only::after {
        content: "\0A0";
        visibility: hidden;
        width: 0;
    }

    .p-button-sm {
        font-size: dt('button.sm.font.size');
        padding: dt('button.sm.padding.y') dt('button.sm.padding.x');
    }

    .p-button-sm .p-button-icon {
        font-size: dt('button.sm.font.size');
    }

    .p-button-sm.p-button-icon-only {
        width: dt('button.sm.icon.only.width');
    }

    .p-button-sm.p-button-icon-only.p-button-rounded {
        height: dt('button.sm.icon.only.width');
    }

    .p-button-lg {
        font-size: dt('button.lg.font.size');
        padding: dt('button.lg.padding.y') dt('button.lg.padding.x');
    }

    .p-button-lg .p-button-icon {
        font-size: dt('button.lg.font.size');
    }

    .p-button-lg.p-button-icon-only {
        width: dt('button.lg.icon.only.width');
    }

    .p-button-lg.p-button-icon-only.p-button-rounded {
        height: dt('button.lg.icon.only.width');
    }

    .p-button-vertical {
        flex-direction: column;
    }

    .p-button-label {
        font-weight: dt('button.label.font.weight');
    }

    .p-button-fluid {
        width: 100%;
    }

    .p-button-fluid.p-button-icon-only {
        width: dt('button.icon.only.width');
    }

    .p-button:not(:disabled):hover {
        background: dt('button.primary.hover.background');
        border: 1px solid dt('button.primary.hover.border.color');
        color: dt('button.primary.hover.color');
    }

    .p-button:not(:disabled):active {
        background: dt('button.primary.active.background');
        border: 1px solid dt('button.primary.active.border.color');
        color: dt('button.primary.active.color');
    }

    .p-button:focus-visible {
        box-shadow: dt('button.primary.focus.ring.shadow');
        outline: dt('button.focus.ring.width') dt('button.focus.ring.style') dt('button.primary.focus.ring.color');
        outline-offset: dt('button.focus.ring.offset');
    }

    .p-button .p-badge {
        min-width: dt('button.badge.size');
        height: dt('button.badge.size');
        line-height: dt('button.badge.size');
    }

    .p-button-raised {
        box-shadow: dt('button.raised.shadow');
    }

    .p-button-rounded {
        border-radius: dt('button.rounded.border.radius');
    }

    .p-button-secondary {
        background: dt('button.secondary.background');
        border: 1px solid dt('button.secondary.border.color');
        color: dt('button.secondary.color');
    }

    .p-button-secondary:not(:disabled):hover {
        background: dt('button.secondary.hover.background');
        border: 1px solid dt('button.secondary.hover.border.color');
        color: dt('button.secondary.hover.color');
    }

    .p-button-secondary:not(:disabled):active {
        background: dt('button.secondary.active.background');
        border: 1px solid dt('button.secondary.active.border.color');
        color: dt('button.secondary.active.color');
    }

    .p-button-secondary:focus-visible {
        outline-color: dt('button.secondary.focus.ring.color');
        box-shadow: dt('button.secondary.focus.ring.shadow');
    }

    .p-button-success {
        background: dt('button.success.background');
        border: 1px solid dt('button.success.border.color');
        color: dt('button.success.color');
    }

    .p-button-success:not(:disabled):hover {
        background: dt('button.success.hover.background');
        border: 1px solid dt('button.success.hover.border.color');
        color: dt('button.success.hover.color');
    }

    .p-button-success:not(:disabled):active {
        background: dt('button.success.active.background');
        border: 1px solid dt('button.success.active.border.color');
        color: dt('button.success.active.color');
    }

    .p-button-success:focus-visible {
        outline-color: dt('button.success.focus.ring.color');
        box-shadow: dt('button.success.focus.ring.shadow');
    }

    .p-button-info {
        background: dt('button.info.background');
        border: 1px solid dt('button.info.border.color');
        color: dt('button.info.color');
    }

    .p-button-info:not(:disabled):hover {
        background: dt('button.info.hover.background');
        border: 1px solid dt('button.info.hover.border.color');
        color: dt('button.info.hover.color');
    }

    .p-button-info:not(:disabled):active {
        background: dt('button.info.active.background');
        border: 1px solid dt('button.info.active.border.color');
        color: dt('button.info.active.color');
    }

    .p-button-info:focus-visible {
        outline-color: dt('button.info.focus.ring.color');
        box-shadow: dt('button.info.focus.ring.shadow');
    }

    .p-button-warn {
        background: dt('button.warn.background');
        border: 1px solid dt('button.warn.border.color');
        color: dt('button.warn.color');
    }

    .p-button-warn:not(:disabled):hover {
        background: dt('button.warn.hover.background');
        border: 1px solid dt('button.warn.hover.border.color');
        color: dt('button.warn.hover.color');
    }

    .p-button-warn:not(:disabled):active {
        background: dt('button.warn.active.background');
        border: 1px solid dt('button.warn.active.border.color');
        color: dt('button.warn.active.color');
    }

    .p-button-warn:focus-visible {
        outline-color: dt('button.warn.focus.ring.color');
        box-shadow: dt('button.warn.focus.ring.shadow');
    }

    .p-button-help {
        background: dt('button.help.background');
        border: 1px solid dt('button.help.border.color');
        color: dt('button.help.color');
    }

    .p-button-help:not(:disabled):hover {
        background: dt('button.help.hover.background');
        border: 1px solid dt('button.help.hover.border.color');
        color: dt('button.help.hover.color');
    }

    .p-button-help:not(:disabled):active {
        background: dt('button.help.active.background');
        border: 1px solid dt('button.help.active.border.color');
        color: dt('button.help.active.color');
    }

    .p-button-help:focus-visible {
        outline-color: dt('button.help.focus.ring.color');
        box-shadow: dt('button.help.focus.ring.shadow');
    }

    .p-button-danger {
        background: dt('button.danger.background');
        border: 1px solid dt('button.danger.border.color');
        color: dt('button.danger.color');
    }

    .p-button-danger:not(:disabled):hover {
        background: dt('button.danger.hover.background');
        border: 1px solid dt('button.danger.hover.border.color');
        color: dt('button.danger.hover.color');
    }

    .p-button-danger:not(:disabled):active {
        background: dt('button.danger.active.background');
        border: 1px solid dt('button.danger.active.border.color');
        color: dt('button.danger.active.color');
    }

    .p-button-danger:focus-visible {
        outline-color: dt('button.danger.focus.ring.color');
        box-shadow: dt('button.danger.focus.ring.shadow');
    }

    .p-button-contrast {
        background: dt('button.contrast.background');
        border: 1px solid dt('button.contrast.border.color');
        color: dt('button.contrast.color');
    }

    .p-button-contrast:not(:disabled):hover {
        background: dt('button.contrast.hover.background');
        border: 1px solid dt('button.contrast.hover.border.color');
        color: dt('button.contrast.hover.color');
    }

    .p-button-contrast:not(:disabled):active {
        background: dt('button.contrast.active.background');
        border: 1px solid dt('button.contrast.active.border.color');
        color: dt('button.contrast.active.color');
    }

    .p-button-contrast:focus-visible {
        outline-color: dt('button.contrast.focus.ring.color');
        box-shadow: dt('button.contrast.focus.ring.shadow');
    }

    .p-button-outlined {
        background: transparent;
        border-color: dt('button.outlined.primary.border.color');
        color: dt('button.outlined.primary.color');
    }

    .p-button-outlined:not(:disabled):hover {
        background: dt('button.outlined.primary.hover.background');
        border-color: dt('button.outlined.primary.border.color');
        color: dt('button.outlined.primary.color');
    }

    .p-button-outlined:not(:disabled):active {
        background: dt('button.outlined.primary.active.background');
        border-color: dt('button.outlined.primary.border.color');
        color: dt('button.outlined.primary.color');
    }

    .p-button-outlined.p-button-secondary {
        border-color: dt('button.outlined.secondary.border.color');
        color: dt('button.outlined.secondary.color');
    }

    .p-button-outlined.p-button-secondary:not(:disabled):hover {
        background: dt('button.outlined.secondary.hover.background');
        border-color: dt('button.outlined.secondary.border.color');
        color: dt('button.outlined.secondary.color');
    }

    .p-button-outlined.p-button-secondary:not(:disabled):active {
        background: dt('button.outlined.secondary.active.background');
        border-color: dt('button.outlined.secondary.border.color');
        color: dt('button.outlined.secondary.color');
    }

    .p-button-outlined.p-button-success {
        border-color: dt('button.outlined.success.border.color');
        color: dt('button.outlined.success.color');
    }

    .p-button-outlined.p-button-success:not(:disabled):hover {
        background: dt('button.outlined.success.hover.background');
        border-color: dt('button.outlined.success.border.color');
        color: dt('button.outlined.success.color');
    }

    .p-button-outlined.p-button-success:not(:disabled):active {
        background: dt('button.outlined.success.active.background');
        border-color: dt('button.outlined.success.border.color');
        color: dt('button.outlined.success.color');
    }

    .p-button-outlined.p-button-info {
        border-color: dt('button.outlined.info.border.color');
        color: dt('button.outlined.info.color');
    }

    .p-button-outlined.p-button-info:not(:disabled):hover {
        background: dt('button.outlined.info.hover.background');
        border-color: dt('button.outlined.info.border.color');
        color: dt('button.outlined.info.color');
    }

    .p-button-outlined.p-button-info:not(:disabled):active {
        background: dt('button.outlined.info.active.background');
        border-color: dt('button.outlined.info.border.color');
        color: dt('button.outlined.info.color');
    }

    .p-button-outlined.p-button-warn {
        border-color: dt('button.outlined.warn.border.color');
        color: dt('button.outlined.warn.color');
    }

    .p-button-outlined.p-button-warn:not(:disabled):hover {
        background: dt('button.outlined.warn.hover.background');
        border-color: dt('button.outlined.warn.border.color');
        color: dt('button.outlined.warn.color');
    }

    .p-button-outlined.p-button-warn:not(:disabled):active {
        background: dt('button.outlined.warn.active.background');
        border-color: dt('button.outlined.warn.border.color');
        color: dt('button.outlined.warn.color');
    }

    .p-button-outlined.p-button-help {
        border-color: dt('button.outlined.help.border.color');
        color: dt('button.outlined.help.color');
    }

    .p-button-outlined.p-button-help:not(:disabled):hover {
        background: dt('button.outlined.help.hover.background');
        border-color: dt('button.outlined.help.border.color');
        color: dt('button.outlined.help.color');
    }

    .p-button-outlined.p-button-help:not(:disabled):active {
        background: dt('button.outlined.help.active.background');
        border-color: dt('button.outlined.help.border.color');
        color: dt('button.outlined.help.color');
    }

    .p-button-outlined.p-button-danger {
        border-color: dt('button.outlined.danger.border.color');
        color: dt('button.outlined.danger.color');
    }

    .p-button-outlined.p-button-danger:not(:disabled):hover {
        background: dt('button.outlined.danger.hover.background');
        border-color: dt('button.outlined.danger.border.color');
        color: dt('button.outlined.danger.color');
    }

    .p-button-outlined.p-button-danger:not(:disabled):active {
        background: dt('button.outlined.danger.active.background');
        border-color: dt('button.outlined.danger.border.color');
        color: dt('button.outlined.danger.color');
    }

    .p-button-outlined.p-button-contrast {
        border-color: dt('button.outlined.contrast.border.color');
        color: dt('button.outlined.contrast.color');
    }

    .p-button-outlined.p-button-contrast:not(:disabled):hover {
        background: dt('button.outlined.contrast.hover.background');
        border-color: dt('button.outlined.contrast.border.color');
        color: dt('button.outlined.contrast.color');
    }

    .p-button-outlined.p-button-contrast:not(:disabled):active {
        background: dt('button.outlined.contrast.active.background');
        border-color: dt('button.outlined.contrast.border.color');
        color: dt('button.outlined.contrast.color');
    }

    .p-button-outlined.p-button-plain {
        border-color: dt('button.outlined.plain.border.color');
        color: dt('button.outlined.plain.color');
    }

    .p-button-outlined.p-button-plain:not(:disabled):hover {
        background: dt('button.outlined.plain.hover.background');
        border-color: dt('button.outlined.plain.border.color');
        color: dt('button.outlined.plain.color');
    }

    .p-button-outlined.p-button-plain:not(:disabled):active {
        background: dt('button.outlined.plain.active.background');
        border-color: dt('button.outlined.plain.border.color');
        color: dt('button.outlined.plain.color');
    }

    .p-button-text {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.primary.color');
    }

    .p-button-text:not(:disabled):hover {
        background: dt('button.text.primary.hover.background');
        border-color: transparent;
        color: dt('button.text.primary.color');
    }

    .p-button-text:not(:disabled):active {
        background: dt('button.text.primary.active.background');
        border-color: transparent;
        color: dt('button.text.primary.color');
    }

    .p-button-text.p-button-secondary {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.secondary.color');
    }

    .p-button-text.p-button-secondary:not(:disabled):hover {
        background: dt('button.text.secondary.hover.background');
        border-color: transparent;
        color: dt('button.text.secondary.color');
    }

    .p-button-text.p-button-secondary:not(:disabled):active {
        background: dt('button.text.secondary.active.background');
        border-color: transparent;
        color: dt('button.text.secondary.color');
    }

    .p-button-text.p-button-success {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.success.color');
    }

    .p-button-text.p-button-success:not(:disabled):hover {
        background: dt('button.text.success.hover.background');
        border-color: transparent;
        color: dt('button.text.success.color');
    }

    .p-button-text.p-button-success:not(:disabled):active {
        background: dt('button.text.success.active.background');
        border-color: transparent;
        color: dt('button.text.success.color');
    }

    .p-button-text.p-button-info {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.info.color');
    }

    .p-button-text.p-button-info:not(:disabled):hover {
        background: dt('button.text.info.hover.background');
        border-color: transparent;
        color: dt('button.text.info.color');
    }

    .p-button-text.p-button-info:not(:disabled):active {
        background: dt('button.text.info.active.background');
        border-color: transparent;
        color: dt('button.text.info.color');
    }

    .p-button-text.p-button-warn {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.warn.color');
    }

    .p-button-text.p-button-warn:not(:disabled):hover {
        background: dt('button.text.warn.hover.background');
        border-color: transparent;
        color: dt('button.text.warn.color');
    }

    .p-button-text.p-button-warn:not(:disabled):active {
        background: dt('button.text.warn.active.background');
        border-color: transparent;
        color: dt('button.text.warn.color');
    }

    .p-button-text.p-button-help {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.help.color');
    }

    .p-button-text.p-button-help:not(:disabled):hover {
        background: dt('button.text.help.hover.background');
        border-color: transparent;
        color: dt('button.text.help.color');
    }

    .p-button-text.p-button-help:not(:disabled):active {
        background: dt('button.text.help.active.background');
        border-color: transparent;
        color: dt('button.text.help.color');
    }

    .p-button-text.p-button-danger {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.danger.color');
    }

    .p-button-text.p-button-danger:not(:disabled):hover {
        background: dt('button.text.danger.hover.background');
        border-color: transparent;
        color: dt('button.text.danger.color');
    }

    .p-button-text.p-button-danger:not(:disabled):active {
        background: dt('button.text.danger.active.background');
        border-color: transparent;
        color: dt('button.text.danger.color');
    }

    .p-button-text.p-button-contrast {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.contrast.color');
    }

    .p-button-text.p-button-contrast:not(:disabled):hover {
        background: dt('button.text.contrast.hover.background');
        border-color: transparent;
        color: dt('button.text.contrast.color');
    }

    .p-button-text.p-button-contrast:not(:disabled):active {
        background: dt('button.text.contrast.active.background');
        border-color: transparent;
        color: dt('button.text.contrast.color');
    }

    .p-button-text.p-button-plain {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.plain.color');
    }

    .p-button-text.p-button-plain:not(:disabled):hover {
        background: dt('button.text.plain.hover.background');
        border-color: transparent;
        color: dt('button.text.plain.color');
    }

    .p-button-text.p-button-plain:not(:disabled):active {
        background: dt('button.text.plain.active.background');
        border-color: transparent;
        color: dt('button.text.plain.color');
    }

    .p-button-link {
        background: transparent;
        border-color: transparent;
        color: dt('button.link.color');
    }

    .p-button-link:not(:disabled):hover {
        background: transparent;
        border-color: transparent;
        color: dt('button.link.hover.color');
    }

    .p-button-link:not(:disabled):hover .p-button-label {
        text-decoration: underline;
    }

    .p-button-link:not(:disabled):active {
        background: transparent;
        border-color: transparent;
        color: dt('button.link.active.color');
    }
`;var ld=["content"],ud=["loadingicon"],cd=["icon"],dd=["*"],ka=t=>({class:t});function pd(t,n){t&1&&gt(0)}function hd(t,n){if(t&1&&xe(0,"span"),t&2){let e=V(3);k(e.cx("loadingIcon")),K("aria-hidden",!0)("data-pc-section","loadingicon")}}function fd(t,n){if(t&1&&(Se(),xe(0,"svg",7)),t&2){let e=V(3);k(e.cn(e.cx("loadingIcon"),e.spinnerIconClass())),M("spin",!0),K("aria-hidden",!0)("data-pc-section","loadingicon")}}function gd(t,n){if(t&1&&(ht(0),J(1,hd,1,4,"span",3)(2,fd,1,5,"svg",6),ft()),t&2){let e=V(2);O(),M("ngIf",e.loadingIcon),O(),M("ngIf",!e.loadingIcon)}}function md(t,n){}function bd(t,n){if(t&1&&J(0,md,0,0,"ng-template",8),t&2){let e=V(2);M("ngIf",e.loadingIconTemplate||e._loadingIconTemplate)}}function yd(t,n){if(t&1&&(ht(0),J(1,gd,3,2,"ng-container",2)(2,bd,1,1,null,5),ft()),t&2){let e=V();O(),M("ngIf",!e.loadingIconTemplate&&!e._loadingIconTemplate),O(),M("ngTemplateOutlet",e.loadingIconTemplate||e._loadingIconTemplate)("ngTemplateOutletContext",Tt(3,ka,e.cx("loadingIcon")))}}function vd(t,n){if(t&1&&xe(0,"span"),t&2){let e=V(2);k(e.cx("icon")),K("data-pc-section","icon")}}function Dd(t,n){}function Cd(t,n){if(t&1&&J(0,Dd,0,0,"ng-template",8),t&2){let e=V(2);M("ngIf",!e.icon&&(e.iconTemplate||e._iconTemplate))}}function _d(t,n){if(t&1&&(ht(0),J(1,vd,1,3,"span",3)(2,Cd,1,1,null,5),ft()),t&2){let e=V();O(),M("ngIf",e.icon&&!e.iconTemplate&&!e._iconTemplate),O(),M("ngTemplateOutlet",e.iconTemplate||e._iconTemplate)("ngTemplateOutletContext",Tt(3,ka,e.cx("icon")))}}function Ed(t,n){if(t&1&&(Fe(0,"span"),At(1),Te()),t&2){let e=V();k(e.cx("label")),K("aria-hidden",e.icon&&!e.label)("data-pc-section","label"),O(),Ft(e.label)}}function wd(t,n){if(t&1&&xe(0,"p-badge",9),t&2){let e=V();M("value",e.badge)("severity",e.badgeSeverity)}}var Sd={root:({instance:t})=>["p-button p-component",{"p-button-icon-only":(t.icon||t.buttonProps?.icon||t.iconTemplate||t._iconTemplate||t.loadingIcon||t.loadingIconTemplate||t._loadingIconTemplate)&&!t.label&&!t.buttonProps?.label,"p-button-vertical":(t.iconPos==="top"||t.iconPos==="bottom")&&t.label,"p-button-loading":t.loading||t.buttonProps?.loading,"p-button-link":t.link||t.buttonProps?.link,[`p-button-${t.severity||t.buttonProps?.severity}`]:t.severity||t.buttonProps?.severity,"p-button-raised":t.raised||t.buttonProps?.raised,"p-button-rounded":t.rounded||t.buttonProps?.rounded,"p-button-text":t.text||t.variant==="text"||t.buttonProps?.text||t.buttonProps?.variant==="text","p-button-outlined":t.outlined||t.variant==="outlined"||t.buttonProps?.outlined||t.buttonProps?.variant==="outlined","p-button-sm":t.size==="small"||t.buttonProps?.size==="small","p-button-lg":t.size==="large"||t.buttonProps?.size==="large","p-button-plain":t.plain||t.buttonProps?.plain,"p-button-fluid":t.hasFluid}],loadingIcon:"p-button-loading-icon",icon:({instance:t})=>["p-button-icon",{[`p-button-icon-${t.iconPos||t.buttonProps?.iconPos}`]:t.label||t.buttonProps?.label,"p-button-icon-left":(t.iconPos==="left"||t.buttonProps?.iconPos==="left")&&t.label||t.buttonProps?.label,"p-button-icon-right":(t.iconPos==="right"||t.buttonProps?.iconPos==="right")&&t.label||t.buttonProps?.label},t.icon,t.buttonProps?.icon],spinnerIcon:({instance:t})=>Object.entries(t.iconClass()).filter(([,n])=>!!n).reduce((n,[e])=>n+` ${e}`,"p-button-loading-icon"),label:"p-button-label"},ct=(()=>{class t extends G{name="button";theme=Ia;classes=Sd;static \u0275fac=(()=>{let e;return function(o){return(e||(e=y(t)))(o||t)}})();static \u0275prov=v({token:t,factory:t.\u0275fac})}return t})();var ut={button:"p-button",component:"p-component",iconOnly:"p-button-icon-only",disabled:"p-disabled",loading:"p-button-loading",labelOnly:"p-button-loading-label-only"},Ma=(()=>{class t extends ne{_componentStyle=f(ct);static \u0275fac=(()=>{let e;return function(o){return(e||(e=y(t)))(o||t)}})();static \u0275dir=w({type:t,selectors:[["","pButtonLabel",""]],hostVars:2,hostBindings:function(i,o){i&2&&mt("p-button-label",!0)},features:[x([ct]),C]})}return t})(),Oa=(()=>{class t extends ne{_componentStyle=f(ct);static \u0275fac=(()=>{let e;return function(o){return(e||(e=y(t)))(o||t)}})();static \u0275dir=w({type:t,selectors:[["","pButtonIcon",""]],hostVars:2,hostBindings:function(i,o){i&2&&mt("p-button-icon",!0)},features:[x([ct]),C]})}return t})(),Ay=(()=>{class t extends ne{iconPos="left";loadingIcon;set label(e){this._label=e,this.initialized&&(this.updateLabel(),this.updateIcon(),this.setStyleClass())}set icon(e){this._icon=e,this.initialized&&(this.updateIcon(),this.setStyleClass())}get loading(){return this._loading}set loading(e){this._loading=e,this.initialized&&(this.updateIcon(),this.setStyleClass())}_buttonProps;iconSignal=Oi(Oa);labelSignal=Oi(Ma);isIconOnly=ee(()=>!!(!this.labelSignal()&&this.iconSignal()));set buttonProps(e){this._buttonProps=e,e&&typeof e=="object"&&Object.entries(e).forEach(([i,o])=>this[`_${i}`]!==o&&(this[`_${i}`]=o))}_severity;get severity(){return this._severity}set severity(e){this._severity=e,this.initialized&&this.setStyleClass()}raised=!1;rounded=!1;text=!1;outlined=!1;size=null;plain=!1;fluid=F(void 0,{transform:_});_label;_icon;_loading=!1;initialized;get htmlElement(){return this.el.nativeElement}_internalClasses=Object.values(ut);pcFluid=f(lt,{optional:!0,host:!0,skipSelf:!0});isTextButton=ee(()=>!!(!this.iconSignal()&&this.labelSignal()&&this.text));get label(){return this._label}get icon(){return this._icon}get buttonProps(){return this._buttonProps}spinnerIcon=`<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="p-icon-spin">
        <g clip-path="url(#clip0_417_21408)">
            <path
                d="M6.99701 14C5.85441 13.999 4.72939 13.7186 3.72012 13.1832C2.71084 12.6478 1.84795 11.8737 1.20673 10.9284C0.565504 9.98305 0.165424 8.89526 0.041387 7.75989C-0.0826496 6.62453 0.073125 5.47607 0.495122 4.4147C0.917119 3.35333 1.59252 2.4113 2.46241 1.67077C3.33229 0.930247 4.37024 0.413729 5.4857 0.166275C6.60117 -0.0811796 7.76026 -0.0520535 8.86188 0.251112C9.9635 0.554278 10.9742 1.12227 11.8057 1.90555C11.915 2.01493 11.9764 2.16319 11.9764 2.31778C11.9764 2.47236 11.915 2.62062 11.8057 2.73C11.7521 2.78503 11.688 2.82877 11.6171 2.85864C11.5463 2.8885 11.4702 2.90389 11.3933 2.90389C11.3165 2.90389 11.2404 2.8885 11.1695 2.85864C11.0987 2.82877 11.0346 2.78503 10.9809 2.73C9.9998 1.81273 8.73246 1.26138 7.39226 1.16876C6.05206 1.07615 4.72086 1.44794 3.62279 2.22152C2.52471 2.99511 1.72683 4.12325 1.36345 5.41602C1.00008 6.70879 1.09342 8.08723 1.62775 9.31926C2.16209 10.5513 3.10478 11.5617 4.29713 12.1803C5.48947 12.7989 6.85865 12.988 8.17414 12.7157C9.48963 12.4435 10.6711 11.7264 11.5196 10.6854C12.3681 9.64432 12.8319 8.34282 12.8328 7C12.8328 6.84529 12.8943 6.69692 13.0038 6.58752C13.1132 6.47812 13.2616 6.41667 13.4164 6.41667C13.5712 6.41667 13.7196 6.47812 13.8291 6.58752C13.9385 6.69692 14 6.84529 14 7C14 8.85651 13.2622 10.637 11.9489 11.9497C10.6356 13.2625 8.85432 14 6.99701 14Z"
                fill="currentColor"
            />
        </g>
        <defs>
            <clipPath id="clip0_417_21408">
                <rect width="14" height="14" fill="white" />
            </clipPath>
        </defs>
    </svg>`;_componentStyle=f(ct);ngAfterViewInit(){super.ngAfterViewInit(),Qe(this.htmlElement,this.getStyleClass().join(" ")),this.createIcon(),this.createLabel(),this.initialized=!0}getStyleClass(){let e=[ut.button,ut.component];return this.icon&&!this.label&&je(this.htmlElement.textContent)&&e.push(ut.iconOnly),this.loading&&(e.push(ut.disabled,ut.loading),!this.icon&&this.label&&e.push(ut.labelOnly),this.icon&&!this.label&&!je(this.htmlElement.textContent)&&e.push(ut.iconOnly)),this.text&&e.push("p-button-text"),this.severity&&e.push(`p-button-${this.severity}`),this.plain&&e.push("p-button-plain"),this.raised&&e.push("p-button-raised"),this.size&&e.push(`p-button-${this.size}`),this.outlined&&e.push("p-button-outlined"),this.rounded&&e.push("p-button-rounded"),this.size==="small"&&e.push("p-button-sm"),this.size==="large"&&e.push("p-button-lg"),this.hasFluid&&e.push("p-button-fluid"),e}get hasFluid(){return this.fluid()??!!this.pcFluid}setStyleClass(){let e=this.getStyleClass();this.removeExistingSeverityClass(),this.htmlElement.classList.remove(...this._internalClasses),this.htmlElement.classList.add(...e)}removeExistingSeverityClass(){let e=["success","info","warn","danger","help","primary","secondary","contrast"],i=this.htmlElement.classList.value.split(" ").find(o=>e.some(r=>o===`p-button-${r}`));i&&this.htmlElement.classList.remove(i)}createLabel(){if(!Vt(this.htmlElement,".p-button-label")&&this.label){let i=this.document.createElement("span");this.icon&&!this.label&&i.setAttribute("aria-hidden","true"),i.className="p-button-label",i.appendChild(this.document.createTextNode(this.label)),this.htmlElement.appendChild(i)}}createIcon(){if(!Vt(this.htmlElement,".p-button-icon")&&(this.icon||this.loading)){let i=this.document.createElement("span");i.className="p-button-icon",i.setAttribute("aria-hidden","true");let o=this.label?"p-button-icon-"+this.iconPos:null;o&&Qe(i,o);let r=this.getIconClass();r&&Qe(i,r),!this.loadingIcon&&this.loading&&(i.innerHTML=this.spinnerIcon),this.htmlElement.insertBefore(i,this.htmlElement.firstChild)}}updateLabel(){let e=Vt(this.htmlElement,".p-button-label");if(!this.label){e&&this.htmlElement.removeChild(e);return}e?e.textContent=this.label:this.createLabel()}updateIcon(){let e=Vt(this.htmlElement,".p-button-icon"),i=Vt(this.htmlElement,".p-button-label");this.loading&&!this.loadingIcon&&e?e.innerHTML=this.spinnerIcon:e?.innerHTML&&(e.innerHTML=""),e?this.iconPos?e.className="p-button-icon "+(i?"p-button-icon-"+this.iconPos:"")+" "+this.getIconClass():e.className="p-button-icon "+this.getIconClass():this.createIcon()}getIconClass(){return this.loading?"p-button-loading-icon "+(this.loadingIcon?this.loadingIcon:"p-icon"):this.icon||"p-hidden"}ngOnDestroy(){this.initialized=!1,super.ngOnDestroy()}static \u0275fac=(()=>{let e;return function(o){return(e||(e=y(t)))(o||t)}})();static \u0275dir=w({type:t,selectors:[["","pButton",""]],contentQueries:function(i,o,r){i&1&&(Ii(r,o.iconSignal,Oa,5),Ii(r,o.labelSignal,Ma,5)),i&2&&Yo(2)},hostVars:4,hostBindings:function(i,o){i&2&&mt("p-button-icon-only",o.isIconOnly())("p-button-text",o.isTextButton())},inputs:{iconPos:"iconPos",loadingIcon:"loadingIcon",loading:"loading",severity:"severity",raised:[2,"raised","raised",_],rounded:[2,"rounded","rounded",_],text:[2,"text","text",_],outlined:[2,"outlined","outlined",_],size:"size",plain:[2,"plain","plain",_],fluid:[1,"fluid"],label:"label",icon:"icon",buttonProps:"buttonProps"},features:[x([ct]),C]})}return t})(),Ad=(()=>{class t extends ne{type="button";iconPos="left";icon;badge;label;disabled;loading=!1;loadingIcon;raised=!1;rounded=!1;text=!1;plain=!1;severity;outlined=!1;link=!1;tabindex;size;variant;style;styleClass;badgeClass;badgeSeverity="secondary";ariaLabel;buttonProps;autofocus;fluid=F(void 0,{transform:_});onClick=new Q;onFocus=new Q;onBlur=new Q;contentTemplate;loadingIconTemplate;iconTemplate;templates;pcFluid=f(lt,{optional:!0,host:!0,skipSelf:!0});get hasFluid(){return this.fluid()??!!this.pcFluid}_componentStyle=f(ct);_contentTemplate;_iconTemplate;_loadingIconTemplate;ngAfterContentInit(){this.templates?.forEach(e=>{switch(e.getType()){case"content":this._contentTemplate=e.template;break;case"icon":this._iconTemplate=e.template;break;case"loadingicon":this._loadingIconTemplate=e.template;break;default:this._contentTemplate=e.template;break}})}spinnerIconClass(){return Object.entries(this.iconClass()).filter(([,e])=>!!e).reduce((e,[i])=>e+` ${i}`,"p-button-loading-icon")}iconClass(){return{[`p-button-loading-icon pi-spin ${this.loadingIcon??""}`]:this.loading,"p-button-icon":!0,"p-button-icon-left":this.iconPos==="left"&&this.label,"p-button-icon-right":this.iconPos==="right"&&this.label,"p-button-icon-top":this.iconPos==="top"&&this.label,"p-button-icon-bottom":this.iconPos==="bottom"&&this.label}}static \u0275fac=(()=>{let e;return function(o){return(e||(e=y(t)))(o||t)}})();static \u0275cmp=W({type:t,selectors:[["p-button"]],contentQueries:function(i,o,r){if(i&1&&(ce(r,ld,5),ce(r,ud,5),ce(r,cd,5),ce(r,rt,4)),i&2){let s;se(s=ae())&&(o.contentTemplate=s.first),se(s=ae())&&(o.loadingIconTemplate=s.first),se(s=ae())&&(o.iconTemplate=s.first),se(s=ae())&&(o.templates=s)}},inputs:{type:"type",iconPos:"iconPos",icon:"icon",badge:"badge",label:"label",disabled:[2,"disabled","disabled",_],loading:[2,"loading","loading",_],loadingIcon:"loadingIcon",raised:[2,"raised","raised",_],rounded:[2,"rounded","rounded",_],text:[2,"text","text",_],plain:[2,"plain","plain",_],severity:"severity",outlined:[2,"outlined","outlined",_],link:[2,"link","link",_],tabindex:[2,"tabindex","tabindex",Ke],size:"size",variant:"variant",style:"style",styleClass:"styleClass",badgeClass:"badgeClass",badgeSeverity:"badgeSeverity",ariaLabel:"ariaLabel",buttonProps:"buttonProps",autofocus:[2,"autofocus","autofocus",_],fluid:[1,"fluid"]},outputs:{onClick:"onClick",onFocus:"onFocus",onBlur:"onBlur"},features:[x([ct]),C],ngContentSelectors:dd,decls:7,vars:15,consts:[["pRipple","",3,"click","focus","blur","ngStyle","disabled","pAutoFocus"],[4,"ngTemplateOutlet"],[4,"ngIf"],[3,"class",4,"ngIf"],[3,"value","severity",4,"ngIf"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],["data-p-icon","spinner",3,"class","spin",4,"ngIf"],["data-p-icon","spinner",3,"spin"],[3,"ngIf"],[3,"value","severity"]],template:function(i,o){i&1&&(Ge(),Fe(0,"button",0),fe("click",function(s){return o.onClick.emit(s)})("focus",function(s){return o.onFocus.emit(s)})("blur",function(s){return o.onBlur.emit(s)}),We(1),J(2,pd,1,0,"ng-container",1)(3,yd,3,5,"ng-container",2)(4,_d,3,5,"ng-container",2)(5,Ed,2,5,"span",3)(6,wd,1,2,"p-badge",4),Te()),i&2&&(k(o.cn(o.cx("root"),o.styleClass,o.buttonProps==null?null:o.buttonProps.styleClass)),M("ngStyle",o.style||(o.buttonProps==null?null:o.buttonProps.style))("disabled",o.disabled||o.loading||(o.buttonProps==null?null:o.buttonProps.disabled))("pAutoFocus",o.autofocus||(o.buttonProps==null?null:o.buttonProps.autofocus)),K("type",o.type||(o.buttonProps==null?null:o.buttonProps.type))("aria-label",o.ariaLabel||(o.buttonProps==null?null:o.buttonProps.ariaLabel))("data-pc-name","button")("data-pc-section","root")("tabindex",o.tabindex||(o.buttonProps==null?null:o.buttonProps.tabindex)),O(2),M("ngTemplateOutlet",o.contentTemplate||o._contentTemplate),O(),M("ngIf",o.loading),O(),M("ngIf",!o.loading),O(),M("ngIf",!o.contentTemplate&&!o._contentTemplate&&o.label),O(),M("ngIf",!o.contentTemplate&&!o._contentTemplate&&o.badge))},dependencies:[ue,nn,Ye,Hi,Ci,Aa,xa,_a,Fo,Z],encapsulation:2,changeDetection:0})}return t})(),Fy=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=P({type:t});static \u0275inj=L({imports:[ue,Ad,Z,Z]})}return t})();var Na=`
    .p-checkbox {
        position: relative;
        display: inline-flex;
        user-select: none;
        vertical-align: bottom;
        width: dt('checkbox.width');
        height: dt('checkbox.height');
    }

    .p-checkbox-input {
        cursor: pointer;
        appearance: none;
        position: absolute;
        inset-block-start: 0;
        inset-inline-start: 0;
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
        opacity: 0;
        z-index: 1;
        outline: 0 none;
        border: 1px solid transparent;
        border-radius: dt('checkbox.border.radius');
    }

    .p-checkbox-box {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: dt('checkbox.border.radius');
        border: 1px solid dt('checkbox.border.color');
        background: dt('checkbox.background');
        width: dt('checkbox.width');
        height: dt('checkbox.height');
        transition:
            background dt('checkbox.transition.duration'),
            color dt('checkbox.transition.duration'),
            border-color dt('checkbox.transition.duration'),
            box-shadow dt('checkbox.transition.duration'),
            outline-color dt('checkbox.transition.duration');
        outline-color: transparent;
        box-shadow: dt('checkbox.shadow');
    }

    .p-checkbox-icon {
        transition-duration: dt('checkbox.transition.duration');
        color: dt('checkbox.icon.color');
        font-size: dt('checkbox.icon.size');
        width: dt('checkbox.icon.size');
        height: dt('checkbox.icon.size');
    }

    .p-checkbox:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {
        border-color: dt('checkbox.hover.border.color');
    }

    .p-checkbox-checked .p-checkbox-box {
        border-color: dt('checkbox.checked.border.color');
        background: dt('checkbox.checked.background');
    }

    .p-checkbox-checked .p-checkbox-icon {
        color: dt('checkbox.icon.checked.color');
    }

    .p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {
        background: dt('checkbox.checked.hover.background');
        border-color: dt('checkbox.checked.hover.border.color');
    }

    .p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-icon {
        color: dt('checkbox.icon.checked.hover.color');
    }

    .p-checkbox:not(.p-disabled):has(.p-checkbox-input:focus-visible) .p-checkbox-box {
        border-color: dt('checkbox.focus.border.color');
        box-shadow: dt('checkbox.focus.ring.shadow');
        outline: dt('checkbox.focus.ring.width') dt('checkbox.focus.ring.style') dt('checkbox.focus.ring.color');
        outline-offset: dt('checkbox.focus.ring.offset');
    }

    .p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:focus-visible) .p-checkbox-box {
        border-color: dt('checkbox.checked.focus.border.color');
    }

    .p-checkbox.p-invalid > .p-checkbox-box {
        border-color: dt('checkbox.invalid.border.color');
    }

    .p-checkbox.p-variant-filled .p-checkbox-box {
        background: dt('checkbox.filled.background');
    }

    .p-checkbox-checked.p-variant-filled .p-checkbox-box {
        background: dt('checkbox.checked.background');
    }

    .p-checkbox-checked.p-variant-filled:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {
        background: dt('checkbox.checked.hover.background');
    }

    .p-checkbox.p-disabled {
        opacity: 1;
    }

    .p-checkbox.p-disabled .p-checkbox-box {
        background: dt('checkbox.disabled.background');
        border-color: dt('checkbox.checked.disabled.border.color');
    }

    .p-checkbox.p-disabled .p-checkbox-box .p-checkbox-icon {
        color: dt('checkbox.icon.disabled.color');
    }

    .p-checkbox-sm,
    .p-checkbox-sm .p-checkbox-box {
        width: dt('checkbox.sm.width');
        height: dt('checkbox.sm.height');
    }

    .p-checkbox-sm .p-checkbox-icon {
        font-size: dt('checkbox.icon.sm.size');
        width: dt('checkbox.icon.sm.size');
        height: dt('checkbox.icon.sm.size');
    }

    .p-checkbox-lg,
    .p-checkbox-lg .p-checkbox-box {
        width: dt('checkbox.lg.width');
        height: dt('checkbox.lg.height');
    }

    .p-checkbox-lg .p-checkbox-icon {
        font-size: dt('checkbox.icon.lg.size');
        width: dt('checkbox.icon.lg.size');
        height: dt('checkbox.icon.lg.size');
    }
`;var Fd=["icon"],Td=["input"],xd=(t,n)=>({checked:t,class:n});function Id(t,n){if(t&1&&xe(0,"span",7),t&2){let e=V(3);k(e.cx("icon")),M("ngClass",e.checkboxIcon),K("data-pc-section","icon")}}function Md(t,n){if(t&1&&(Se(),xe(0,"svg",8)),t&2){let e=V(3);k(e.cx("icon")),K("data-pc-section","icon")}}function Od(t,n){if(t&1&&(ht(0),J(1,Id,1,4,"span",5)(2,Md,1,3,"svg",6),ft()),t&2){let e=V(2);O(),M("ngIf",e.checkboxIcon),O(),M("ngIf",!e.checkboxIcon)}}function kd(t,n){if(t&1&&(Se(),xe(0,"svg",9)),t&2){let e=V(2);k(e.cx("icon")),K("data-pc-section","icon")}}function Nd(t,n){if(t&1&&(ht(0),J(1,Od,3,2,"ng-container",2)(2,kd,1,3,"svg",4),ft()),t&2){let e=V();O(),M("ngIf",e.checked),O(),M("ngIf",e._indeterminate())}}function Rd(t,n){}function Ld(t,n){t&1&&J(0,Rd,0,0,"ng-template")}var Pd=`
    ${Na}

    /* For PrimeNG */
    p-checkBox.ng-invalid.ng-dirty .p-checkbox-box,
    p-check-box.ng-invalid.ng-dirty .p-checkbox-box,
    p-checkbox.ng-invalid.ng-dirty .p-checkbox-box {
        border-color: dt('checkbox.invalid.border.color');
    }
`,Vd={root:({instance:t})=>["p-checkbox p-component",{"p-checkbox-checked p-highlight":t.checked,"p-disabled":t.$disabled(),"p-invalid":t.invalid(),"p-variant-filled":t.$variant()==="filled","p-checkbox-sm p-inputfield-sm":t.size()==="small","p-checkbox-lg p-inputfield-lg":t.size()==="large"}],box:"p-checkbox-box",input:"p-checkbox-input",icon:"p-checkbox-icon"},Ra=(()=>{class t extends G{name="checkbox";theme=Pd;classes=Vd;static \u0275fac=(()=>{let e;return function(o){return(e||(e=y(t)))(o||t)}})();static \u0275prov=v({token:t,factory:t.\u0275fac})}return t})();var Bd={provide:He,useExisting:ie(()=>La),multi:!0},La=(()=>{class t extends at{value;binary;ariaLabelledBy;ariaLabel;tabindex;inputId;inputStyle;styleClass;inputClass;indeterminate=!1;formControl;checkboxIcon;readonly;autofocus;trueValue=!0;falseValue=!1;variant=F();size=F();onChange=new Q;onFocus=new Q;onBlur=new Q;inputViewChild;get checked(){return this._indeterminate()?!1:this.binary?this.modelValue()===this.trueValue:ds(this.value,this.modelValue())}_indeterminate=X(void 0);checkboxIconTemplate;templates;_checkboxIconTemplate;focused=!1;_componentStyle=f(Ra);$variant=ee(()=>this.variant()||this.config.inputStyle()||this.config.inputVariant());ngAfterContentInit(){this.templates.forEach(e=>{switch(e.getType()){case"icon":this._checkboxIconTemplate=e.template;break;case"checkboxicon":this._checkboxIconTemplate=e.template;break}})}ngOnChanges(e){super.ngOnChanges(e),e.indeterminate&&this._indeterminate.set(e.indeterminate.currentValue)}updateModel(e){let i,o=this.injector.get(Le,null,{optional:!0,self:!0}),r=o&&!this.formControl?o.value:this.modelValue();this.binary?(i=this._indeterminate()?this.trueValue:this.checked?this.falseValue:this.trueValue,this.writeModelValue(i),this.onModelChange(i)):(this.checked||this._indeterminate()?i=r.filter(s=>!Ue(s,this.value)):i=r?[...r,this.value]:[this.value],this.onModelChange(i),this.writeModelValue(i),this.formControl&&this.formControl.setValue(i)),this._indeterminate()&&this._indeterminate.set(!1),this.onChange.emit({checked:i,originalEvent:e})}handleChange(e){this.readonly||this.updateModel(e)}onInputFocus(e){this.focused=!0,this.onFocus.emit(e)}onInputBlur(e){this.focused=!1,this.onBlur.emit(e),this.onModelTouched()}focus(){this.inputViewChild.nativeElement.focus()}writeControlValue(e,i){i(e),this.cd.markForCheck()}static \u0275fac=(()=>{let e;return function(o){return(e||(e=y(t)))(o||t)}})();static \u0275cmp=W({type:t,selectors:[["p-checkbox"],["p-checkBox"],["p-check-box"]],contentQueries:function(i,o,r){if(i&1&&(ce(r,Fd,4),ce(r,rt,4)),i&2){let s;se(s=ae())&&(o.checkboxIconTemplate=s.first),se(s=ae())&&(o.templates=s)}},viewQuery:function(i,o){if(i&1&&qo(Td,5),i&2){let r;se(r=ae())&&(o.inputViewChild=r.first)}},hostVars:5,hostBindings:function(i,o){i&2&&(K("data-p-highlight",o.checked)("data-p-checked",o.checked)("data-p-disabled",o.$disabled()),k(o.cn(o.cx("root"),o.styleClass)))},inputs:{value:"value",binary:[2,"binary","binary",_],ariaLabelledBy:"ariaLabelledBy",ariaLabel:"ariaLabel",tabindex:[2,"tabindex","tabindex",Ke],inputId:"inputId",inputStyle:"inputStyle",styleClass:"styleClass",inputClass:"inputClass",indeterminate:[2,"indeterminate","indeterminate",_],formControl:"formControl",checkboxIcon:"checkboxIcon",readonly:[2,"readonly","readonly",_],autofocus:[2,"autofocus","autofocus",_],trueValue:"trueValue",falseValue:"falseValue",variant:[1,"variant"],size:[1,"size"]},outputs:{onChange:"onChange",onFocus:"onFocus",onBlur:"onBlur"},features:[x([Bd,Ra]),C,Ee],decls:5,vars:22,consts:[["input",""],["type","checkbox",3,"focus","blur","change","checked"],[4,"ngIf"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],["data-p-icon","minus",3,"class",4,"ngIf"],[3,"class","ngClass",4,"ngIf"],["data-p-icon","check",3,"class",4,"ngIf"],[3,"ngClass"],["data-p-icon","check"],["data-p-icon","minus"]],template:function(i,o){if(i&1){let r=Rn();Fe(0,"input",1,0),fe("focus",function(a){return Dt(r),Ct(o.onInputFocus(a))})("blur",function(a){return Dt(r),Ct(o.onInputBlur(a))})("change",function(a){return Dt(r),Ct(o.handleChange(a))}),Te(),Fe(2,"div"),J(3,Nd,3,2,"ng-container",2)(4,Ld,1,0,null,3),Te()}i&2&&(Xo(o.inputStyle),k(o.cn(o.cx("input"),o.inputClass)),M("checked",o.checked),K("id",o.inputId)("value",o.value)("name",o.name())("tabindex",o.tabindex)("required",o.required()?"":void 0)("readonly",o.readonly?"":void 0)("disabled",o.$disabled()?"":void 0)("aria-labelledby",o.ariaLabelledBy)("aria-label",o.ariaLabel),O(2),k(o.cx("box")),O(),M("ngIf",!o.checkboxIconTemplate&&!o._checkboxIconTemplate),O(),M("ngTemplateOutlet",o.checkboxIconTemplate||o._checkboxIconTemplate)("ngTemplateOutletContext",Ln(19,xd,o.checked,o.cx("icon"))))},dependencies:[ue,Ui,nn,Ye,Z,Ta],encapsulation:2,changeDetection:0})}return t})(),Yy=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=P({type:t});static \u0275inj=L({imports:[La,Z,Z]})}return t})();var Pa=`
    .p-inputtext {
        font-family: inherit;
        font-feature-settings: inherit;
        font-size: 1rem;
        color: dt('inputtext.color');
        background: dt('inputtext.background');
        padding-block: dt('inputtext.padding.y');
        padding-inline: dt('inputtext.padding.x');
        border: 1px solid dt('inputtext.border.color');
        transition:
            background dt('inputtext.transition.duration'),
            color dt('inputtext.transition.duration'),
            border-color dt('inputtext.transition.duration'),
            outline-color dt('inputtext.transition.duration'),
            box-shadow dt('inputtext.transition.duration');
        appearance: none;
        border-radius: dt('inputtext.border.radius');
        outline-color: transparent;
        box-shadow: dt('inputtext.shadow');
    }

    .p-inputtext:enabled:hover {
        border-color: dt('inputtext.hover.border.color');
    }

    .p-inputtext:enabled:focus {
        border-color: dt('inputtext.focus.border.color');
        box-shadow: dt('inputtext.focus.ring.shadow');
        outline: dt('inputtext.focus.ring.width') dt('inputtext.focus.ring.style') dt('inputtext.focus.ring.color');
        outline-offset: dt('inputtext.focus.ring.offset');
    }

    .p-inputtext.p-invalid {
        border-color: dt('inputtext.invalid.border.color');
    }

    .p-inputtext.p-variant-filled {
        background: dt('inputtext.filled.background');
    }

    .p-inputtext.p-variant-filled:enabled:hover {
        background: dt('inputtext.filled.hover.background');
    }

    .p-inputtext.p-variant-filled:enabled:focus {
        background: dt('inputtext.filled.focus.background');
    }

    .p-inputtext:disabled {
        opacity: 1;
        background: dt('inputtext.disabled.background');
        color: dt('inputtext.disabled.color');
    }

    .p-inputtext::placeholder {
        color: dt('inputtext.placeholder.color');
    }

    .p-inputtext.p-invalid::placeholder {
        color: dt('inputtext.invalid.placeholder.color');
    }

    .p-inputtext-sm {
        font-size: dt('inputtext.sm.font.size');
        padding-block: dt('inputtext.sm.padding.y');
        padding-inline: dt('inputtext.sm.padding.x');
    }

    .p-inputtext-lg {
        font-size: dt('inputtext.lg.font.size');
        padding-block: dt('inputtext.lg.padding.y');
        padding-inline: dt('inputtext.lg.padding.x');
    }

    .p-inputtext-fluid {
        width: 100%;
    }
`;var $d=`
    ${Pa}

    /* For PrimeNG */
   .p-inputtext.ng-invalid.ng-dirty {
        border-color: dt('inputtext.invalid.border.color');
    }

    .p-inputtext.ng-invalid.ng-dirty::placeholder {
        color: dt('inputtext.invalid.placeholder.color');
    }
`,jd={root:({instance:t})=>["p-inputtext p-component",{"p-filled":t.$filled(),"p-inputtext-sm":t.pSize==="small","p-inputtext-lg":t.pSize==="large","p-invalid":t.invalid(),"p-variant-filled":t.$variant()==="filled","p-inputtext-fluid":t.hasFluid}]},Va=(()=>{class t extends G{name="inputtext";theme=$d;classes=jd;static \u0275fac=(()=>{let e;return function(o){return(e||(e=y(t)))(o||t)}})();static \u0275prov=v({token:t,factory:t.\u0275fac})}return t})();var u0=(()=>{class t extends _i{ngControl=f(Le,{optional:!0,self:!0});pcFluid=f(lt,{optional:!0,host:!0,skipSelf:!0});pSize;variant=F();fluid=F(void 0,{transform:_});invalid=F(void 0,{transform:_});$variant=ee(()=>this.variant()||this.config.inputStyle()||this.config.inputVariant());_componentStyle=f(Va);ngAfterViewInit(){super.ngAfterViewInit(),this.writeModelValue(this.ngControl?.value??this.el.nativeElement.value),this.cd.detectChanges()}ngDoCheck(){this.writeModelValue(this.ngControl?.value??this.el.nativeElement.value)}onInput(){this.writeModelValue(this.ngControl?.value??this.el.nativeElement.value)}get hasFluid(){return this.fluid()??!!this.pcFluid}static \u0275fac=(()=>{let e;return function(o){return(e||(e=y(t)))(o||t)}})();static \u0275dir=w({type:t,selectors:[["","pInputText",""]],hostVars:2,hostBindings:function(i,o){i&1&&fe("input",function(s){return o.onInput(s)}),i&2&&k(o.cx("root"))},inputs:{pSize:"pSize",variant:[1,"variant"],fluid:[1,"fluid"],invalid:[1,"invalid"]},features:[x([Va]),C]})}return t})(),c0=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=P({type:t});static \u0275inj=L({})}return t})();var Ba=class t{static isArray(n,e=!0){return Array.isArray(n)&&(e||n.length!==0)}static isObject(n,e=!0){return typeof n=="object"&&!Array.isArray(n)&&n!=null&&(e||Object.keys(n).length!==0)}static equals(n,e,i){return i?this.resolveFieldData(n,i)===this.resolveFieldData(e,i):this.equalsByValue(n,e)}static equalsByValue(n,e){if(n===e)return!0;if(n&&e&&typeof n=="object"&&typeof e=="object"){var i=Array.isArray(n),o=Array.isArray(e),r,s,a;if(i&&o){if(s=n.length,s!=e.length)return!1;for(r=s;r--!==0;)if(!this.equalsByValue(n[r],e[r]))return!1;return!0}if(i!=o)return!1;var l=this.isDate(n),u=this.isDate(e);if(l!=u)return!1;if(l&&u)return n.getTime()==e.getTime();var c=n instanceof RegExp,d=e instanceof RegExp;if(c!=d)return!1;if(c&&d)return n.toString()==e.toString();var h=Object.keys(n);if(s=h.length,s!==Object.keys(e).length)return!1;for(r=s;r--!==0;)if(!Object.prototype.hasOwnProperty.call(e,h[r]))return!1;for(r=s;r--!==0;)if(a=h[r],!this.equalsByValue(n[a],e[a]))return!1;return!0}return n!==n&&e!==e}static resolveFieldData(n,e){if(n&&e){if(this.isFunction(e))return e(n);if(e.indexOf(".")==-1)return n[e];{let i=e.split("."),o=n;for(let r=0,s=i.length;r<s;++r){if(o==null)return null;o=o[i[r]]}return o}}else return null}static isFunction(n){return!!(n&&n.constructor&&n.call&&n.apply)}static reorderArray(n,e,i){let o;n&&e!==i&&(i>=n.length&&(i%=n.length,e%=n.length),n.splice(i,0,n.splice(e,1)[0]))}static insertIntoOrderedArray(n,e,i,o){if(i.length>0){let r=!1;for(let s=0;s<i.length;s++)if(this.findIndexInList(i[s],o)>e){i.splice(s,0,n),r=!0;break}r||i.push(n)}else i.push(n)}static findIndexInList(n,e){let i=-1;if(e){for(let o=0;o<e.length;o++)if(e[o]==n){i=o;break}}return i}static contains(n,e){if(n!=null&&e&&e.length){for(let i of e)if(this.equals(n,i))return!0}return!1}static removeAccents(n){return n&&(n=n.normalize("NFKD").replace(new RegExp("\\p{Diacritic}","gu"),"")),n}static isDate(n){return Object.prototype.toString.call(n)==="[object Date]"}static isEmpty(n){return n==null||n===""||Array.isArray(n)&&n.length===0||!this.isDate(n)&&typeof n=="object"&&Object.keys(n).length===0}static isNotEmpty(n){return!this.isEmpty(n)}static compare(n,e,i,o=1){let r=-1,s=this.isEmpty(n),a=this.isEmpty(e);return s&&a?r=0:s?r=o:a?r=-o:typeof n=="string"&&typeof e=="string"?r=n.localeCompare(e,i,{numeric:!0}):r=n<e?-1:n>e?1:0,r}static sort(n,e,i=1,o,r=1){let s=t.compare(n,e,o,i),a=i;return(t.isEmpty(n)||t.isEmpty(e))&&(a=r===1?i:r),a*s}static merge(n,e){if(!(n==null&&e==null)){{if((n==null||typeof n=="object")&&(e==null||typeof e=="object"))return S(S({},n||{}),e||{});if((n==null||typeof n=="string")&&(e==null||typeof e=="string"))return[n||"",e||""].join(" ")}return e||n}}static isPrintableCharacter(n=""){return this.isNotEmpty(n)&&n.length===1&&n.match(/\S| /)}static getItemValue(n,...e){return this.isFunction(n)?n(...e):n}static findLastIndex(n,e){let i=-1;if(this.isNotEmpty(n))try{i=n.findLastIndex(e)}catch{i=n.lastIndexOf([...n].reverse().find(e))}return i}static findLast(n,e){let i;if(this.isNotEmpty(n))try{i=n.findLast(e)}catch{i=[...n].reverse().find(e)}return i}static deepEquals(n,e){if(n===e)return!0;if(n&&e&&typeof n=="object"&&typeof e=="object"){var i=Array.isArray(n),o=Array.isArray(e),r,s,a;if(i&&o){if(s=n.length,s!=e.length)return!1;for(r=s;r--!==0;)if(!this.deepEquals(n[r],e[r]))return!1;return!0}if(i!=o)return!1;var l=n instanceof Date,u=e instanceof Date;if(l!=u)return!1;if(l&&u)return n.getTime()==e.getTime();var c=n instanceof RegExp,d=e instanceof RegExp;if(c!=d)return!1;if(c&&d)return n.toString()==e.toString();var h=Object.keys(n);if(s=h.length,s!==Object.keys(e).length)return!1;for(r=s;r--!==0;)if(!Object.prototype.hasOwnProperty.call(e,h[r]))return!1;for(r=s;r--!==0;)if(a=h[r],!this.deepEquals(n[a],e[a]))return!1;return!0}return n!==n&&e!==e}static minifyCSS(n){return n&&n.replace(/\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g,"").replace(/ {2,}/g," ").replace(/ ([{:}]) /g,"$1").replace(/([;,]) /g,"$1").replace(/ !/g,"!").replace(/: /g,":")}static toFlatCase(n){return this.isString(n)?n.replace(/(-|_)/g,"").toLowerCase():n}static isString(n,e=!0){return typeof n=="string"&&(e||n!=="")}},$a=0;function p0(t="pn_id_"){return $a++,`${t}${$a}`}function Ud(){let t=[],n=(r,s)=>{let a=t.length>0?t[t.length-1]:{key:r,value:s},l=a.value+(a.key===r?0:s)+2;return t.push({key:r,value:l}),l},e=r=>{t=t.filter(s=>s.value!==r)},i=()=>t.length>0?t[t.length-1].value:0,o=r=>r&&parseInt(r.style.zIndex,10)||0;return{get:o,set:(r,s,a)=>{s&&(s.style.zIndex=String(n(r,a)))},clear:r=>{r&&(e(o(r)),r.style.zIndex="")},getCurrent:()=>i(),generateZIndex:n,revertZIndex:e}}var h0=Ud(),f0=t=>!!t;var $0=(()=>{class t extends at{pcFluid=f(lt,{optional:!0,host:!0,skipSelf:!0});fluid=F(void 0,{transform:_});variant=F();size=F();inputSize=F();pattern=F();min=F();max=F();step=F();minlength=F();maxlength=F();$variant=ee(()=>this.variant()||this.config.inputStyle()||this.config.inputVariant());get hasFluid(){return this.fluid()??!!this.pcFluid}static \u0275fac=(()=>{let e;return function(o){return(e||(e=y(t)))(o||t)}})();static \u0275dir=w({type:t,inputs:{fluid:[1,"fluid"],variant:[1,"variant"],size:[1,"size"],inputSize:[1,"inputSize"],pattern:[1,"pattern"],min:[1,"min"],max:[1,"max"],step:[1,"step"],minlength:[1,"minlength"],maxlength:[1,"maxlength"]},features:[C]})}return t})();export{bt as a,rl as b,ki as c,sl as d,It as e,sr as f,ar as g,cl as h,Ui as i,Ir as j,nn as k,Mr as l,kl as m,Hi as n,Ye as o,Rl as p,Ll as q,Bl as r,ue as s,Gi as t,on as u,Ul as v,qn as w,eh as x,Xe as y,zr as z,du as A,pu as B,Lt as C,Xr as D,Qe as E,nt as F,no as G,fu as H,gu as I,mu as J,Ph as K,ts as L,io as M,Vh as N,yu as O,Bh as P,$h as Q,Zr as R,jh as S,Uh as T,Hh as U,vu as V,Vt as W,zh as X,Gh as Y,os as Z,Wh as _,oo as $,Du as aa,Cu as ba,Kh as ca,qh as da,ro as ea,ii as fa,Yh as ga,so as ha,Zh as ia,Xh as ja,Qh as ka,Jh as la,ef as ma,tf as na,nf as oa,of as pa,je as qa,Au as ra,cs as sa,R as ta,it as ua,Ue as va,af as wa,lf as xa,uf as ya,be as za,Fu as Aa,cf as Ba,df as Ca,ve as Da,pf as Ea,un as Fa,Tu as Ga,yf as Ha,te as Ia,vf as Ja,Df as Ka,Cf as La,_f as Ma,Ef as Na,wf as Oa,rt as Pa,Z as Qa,Sf as Ra,Af as Sa,ho as Ta,Pu as Ua,Lf as Va,Pf as Wa,G as Xa,fo as Ya,sg as Za,He as _a,Ps as $a,As as ab,Le as bb,Xs as cb,Fg as db,Ao as eb,xg as fb,mc as gb,oa as hb,ra as ib,sa as jb,Cc as kb,wc as lb,Ac as mb,Ig as nb,ca as ob,Mg as pb,ne as qb,_i as rb,at as sb,Ci as tb,em as ub,Ei as vb,Fm as wb,va as xb,qm as yb,To as zb,Fb as Ab,Tb as Bb,Sa as Cb,Aa as Db,Pb as Eb,Fo as Fb,_a as Gb,Ea as Hb,lt as Ib,_b as Jb,Wt as Kb,Ta as Lb,xa as Mb,ty as Nb,Oa as Ob,Ay as Pb,Ad as Qb,Fy as Rb,La as Sb,Yy as Tb,u0 as Ub,c0 as Vb,$0 as Wb,Ba as Xb,p0 as Yb,h0 as Zb,f0 as _b};
