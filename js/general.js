/**
 * Created by BobyCo on 2017/11/14 0014.
 */
$(function() {
    // iOS 系统下默认的 click 事件会有300毫秒的延迟，使用 fastclick消除这个延迟
    FastClick.attach(document.body);
});

function getPathName() {
    return window.location.pathname.substring(1);
}

function getWebName() {
    var pathName = getPathName();
    return pathName == '' ? '' : pathName.substring(0, pathName.indexOf('/'))
}

function getRealPath() {
    var webName = getWebName();
    if (webName == "") {
        realPath = window.location.protocol + '//' + window.location.host;
    }
    else {
        realPath = window.location.protocol + '//' + window.location.host + '/' + webName;
    }

    return realPath;
}

// 获得url中的参数
function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

function setNormalItem(name, value) {
    localStorage.setItem(name, value);
}

function getNormalItem(name) {
    return localStorage.getItem(name);
}

function setJSONItem(name, json) {
    if (!isJson(json)) {
        console.log("不是json对象");
        return false;
    }

    localStorage.setItem(name, JSON.stringify(json));
}

function getJSONItem(name) {
    try {
        return $.parseJSON(localStorage.getItem(name));
    } catch (e) {
        console.log("获取的值不是json字符串");
    }
}

function removeItem(name) {
    localStorage.removeItem(name);
}

//判断obj是否为json对象
function isJson(obj){
    return typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
}