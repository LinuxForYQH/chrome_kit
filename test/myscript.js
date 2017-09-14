/**
 * Created by hua on 2017/2/7.
 */

jQuery.fn.simulateKeyPress = function(character) {
    // 内部调用jQuery.event.trigger
    // 参数有 (Event, data, elem). 最后一个参数是非常重要的的！
    jQuery(this).trigger({ type: 'keypress', which: character.charCodeAt(0) });
};

window.setTimeout(function () {



    var aa;
    $('.chat_list .nickname span').each(function(  ){
        if($(this).text()=='文件传输助手'){

            aa=$(this);
            aa.click()
        }
    });


    $('#editArea').text("123");

    window.setTimeout(function () {
    $('.web_wechat_face').click();
    $('.qqface0').click()
    $('.web_wechat_face').click();
    $('.btn_send').click()},5000)



},2000);





