/**
 * Created by hua on 2017/6/21.
 */

aa();
function aa() {

    $.get('https://login.weixin.qq.com/jslogin', {
        appid: "wx782c26e4c19acffb",
        fun: "new",
        lang: "zh_CN",
        _: (new Date()).valueOf()
    }, function (data) {


        var a = data.indexOf("uuid = ") + 8;
        var b = data.length - 2;
        var c = data.substring(a, b)


        var img = new Image();
        img.src = 'https://login.weixin.qq.com/qrcode/' + c;
        $('#status').append(img)


        $('#image-result').click(function () {
            login(c)
        })


    })

}


function login(id) {


    $.get('https://login.weixin.qq.com/cgi-bin/mmwebwx-bin/login',
        {
            tip: 1,
            uuid: id,
            _: (new Date()).valueOf()

        }, function (response, status, xhr) {


            if (response.indexOf('200') > 0) {

                var ticket_i = response.indexOf('ticket=') + 7;
                var ticket_l = response.indexOf('&uuid=');

                var scan_i = response.indexOf('scan=') + 5;
                var scan_l = response.length - 2;

                var ticket = response.substring(ticket_i, ticket_l)
                var scan = response.substring(scan_i, scan_l)


                $.get('https://wx2.qq.com/cgi-bin/mmwebwx-bin/webwxnewloginpage',
                    {
                        ticket: ticket,
                        uuid: id,
                        lang: 'zh_CN',
                        scan: scan,
                        fun: 'new'

                    }, function (response, status, xhr) {

                        response = $.xml2json(response);
                        var skey = response.skey;
                        var wxsid = response.wxsid;
                        var wxuin = response.wxuin;
                        var pass_ticket = response.pass_ticket;


                        $.ajax({
                            type: "POST",
                            url: "https://wx2.qq.com/cgi-bin/mmwebwx-bin/webwxinit",
                            data: {
                                BaseRequest: {
                                    Uin: wxuin,
                                    Sid: wxsid,
                                    Skey: skey,
                                    DeviceID: "",
                                }
                            },
                            dataType: "json",
                            header: {charset: 'UTF-8'},

                            success: function (msg) {

                                console.log(msg)


                            }
                        });

                        console.log(response)
                        console.log(status)
                        console.log(xhr)

                    }, "xml")

            }

            console.log(response)
            console.log(status)
            console.log(xhr)
        }, "text")


}


function sleep(numberMillis) {
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
        now = new Date();
        if (now.getTime() > exitTime)
            return;
    }
}


$.ajax({
    url: 'https://wx2.qq.com/cgi-bin/mmwebwx-bin/webwxsendmsg',
    type:'post',
    data: JSON.stringify({
        BaseRequest: {
            DeviceID: "e484017047757591",
            Sid: "fT4AyY2m538eL6Wz",
            Skey: "@crypt_3322a4d8_64a37d72563aecef9160c9d246757757",
            Uin: 2940808620
        },
        Msg: {
            ClientMsgId: "15052194345840444",
            Content: "1",
            FromUserName: "@fddc1cfca732e03d2280f75c26ef1037",
            LocalID: "15052194345840444",
            ToUserName: "filehelper",
            Type: 1
        },
        Scene: 0
    }),
    success: function (data) {
        console.log(data)
    }
})

























