/**
 * Created by hua on 2017/8/17.
 */


/**
 * 实现的逻辑采用《定时器》来避免页面获取的内容和代码的不同步（就是代码跑完了，可是页面的变化却没有跟上，会导致抓取的内容完全没变）
 *
 *
 */

var contact = new Array();
var sumcontact = 0;

/**
 * 把联系人存入数组，先判断是否存在
 * @param nikename
 */
function inputcontact(nikename) {

    if ($.inArray(nikename, contact) < 0) {
        contact[sumcontact] = nikename;
        sumcontact++;
    }
}

/**
 * wechat的滚动条使用了jQuery Scrollbar
 *
 * 所以用滚动遍历获取列表内容
 *
 */
function getAllcontact() {
    var top = $($('.top-placeholder')[1]).css("height");
    var bottom = $($('.bottom-placeholder')[1]).css("height");

    top = top.substring(0, top.length - 2);
    bottom = bottom.substring(0, bottom.length - 2);

    sumheight = top + bottom;

    timedCount01();
}




var c = 0;
var t;
var sumheight;

//滚动获取联系人的定时器
function timedCount01() {
    $('.J_ContactScrollBody .nickname').each(function () {
        inputcontact($(this).text())
    });
    $('.J_ContactScrollBody').scrollTop(c);
    c = c + 20
    if (c > sumheight) {
        clearTimeout(t)
    }
    t = setTimeout("timedCount01()", 100)
}

//判断是否可以开始滚动的定时器
function timedCount02() {

    var top = $($('.top-placeholder')[1]).css("height");
    var bottom = $($('.bottom-placeholder')[1]).css("height");

    top = top.substring(0, top.length - 2);
    bottom = bottom.substring(0, bottom.length - 2);

    if ((top + bottom) > 0) {
        clearTimeout(t);
        getAllcontact();
    }
    t = setTimeout("timedCount02()", 100)
}


//timedCount02();

//模拟点击联系人界面
//$('.web_wechat_tab_friends ').click();












// $.ajax({
//
//     url: 'https://wx2.qq.com/cgi-bin/mmwebwx-bin/webwxgetcontact?r=1505304543564&seq=0&skey=@crypt_3322a4d8_4f2fec3a3adff7579e0e320bef676b12',
//     success: function(data){
//         console.log(data)
//     }
// })





















