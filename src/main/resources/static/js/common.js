$.ajaxSetup({

    beforeSend: function () {
        var width = 0;
        var height = 0;
        var left = 0;
        var top = 0;

        width = 150;
        height = 150;
        top = ( $(window).height() - height ) / 2 + $(window).scrollTop();
        left = ( $(window).width() - width ) / 2 + $(window).scrollLeft();

        if($("#ajaxLoading").length != 0) {
            $("#ajaxLoading").css({
                "top": top+"px",
                "left": left+"px"
            });
            $("#ajaxLoading").show();
        }
        else {
            $('body').append('<div id="ajaxLoading" style="position:absolute; top:' + top + 'px; left:' + left + 'px; width:' + width + 'px; height:' + height + 'px; z-index:9999; filter:alpha(opacity=50); opacity:alpha*0.5; margin:auto; padding:0; "><img src="/img/ajax_loading.gif" style="width:150px; height:150px;"></div>');
        }
    },
    complete: function () {
        $("#ajaxLoading").hide();
    },
    error:function(jqXHR, textStatus, errorThrown){
        common.error(jqXHR);
    }
});

var login = {

    submit: function () {
        var frm = document.loginForm;

        if(trim(frm.userId.value) == ''){
            alert("아이디를 입력해 주세요.");
            frm.userId.focus();
            return false;
        }

        if(trim(frm.userPw.value) == ''){
            alert("비밀번호를 입력해 주세요.");
            frm.userPw.focus();
            return false;
        }

        var url = '/login';
        var data = $("form[name=loginForm]").serialize();

        $.ajax({
            type: "POST",
            url: url,
            data: data,
            dataType: 'JSON',
            success: function (res) {
                if(res == true){
                    window.location.href = '/index';
                }else{
                    alert("로그인 정보를 다시 확인해 주세요.");
                    frm.userId.value = '';
                    frm.userPw.value = '';
                    frm.userId.focus();
                }
            }
        });
    }
}

var common = {

    error : function(jqXHR) {
        if (jqXHR.readyState == 0) {
            alert("오류가 발생했습니다. 로그인 페이지로 이동합니다.");
            window.location.href = '/login';
        }
        else {
            alert("오류가 발생했습니다. 잠시 후 다시 이용하시기 바랍니다.");
            console.log("code:"+jqXHR.status);
            console.log("message:"+jqXHR.statusText);
        }
    }
}

function trim(str) {
    return str.replace(/^\s+|\s+$/g,"");
}

function loadMap(lat, lng) {
    var moveLatLon = new kakao.maps.LatLng(lat, lng);

    var marker = new kakao.maps.Marker({
        map: map,
        position: moveLatLon
    });

    var contents = '<div class="wrap">\n';
    contents += '    <div class="info">\n';
    contents += '        <div class="title">\n';
    contents += '            <div class="text">' + sessionStorage.getItem('title') + '</div>\n';
    contents += '            <div class="close" onclick="closeOverlay()" title="닫기"></div>\n';
    contents += '        </div>\n';
    contents += '        <div class="body">\n';
    contents += '            <div class="desc">\n';
    if(trim(sessionStorage.getItem('road_adres')) == ''){
        contents += '                <div class="ellipsis">'+ sessionStorage.getItem('adres')+'</div>\n';
    }else{
        contents += '                <div class="ellipsis">'+ sessionStorage.getItem('road_adres')+'</div>\n';
        contents += '                <div class="jibun ellipsis">' + sessionStorage.getItem('adres') + '</div>\n';
    }
    if(trim(sessionStorage.getItem('phone')) == ''){
        contents += '                <div><a href="https://map.kakao.com/link/map/' + sessionStorage.getItem('id') + '" target="_blank" class="link">바로가기</a></div>\n';
    }else{
        contents += '                <div><div class="phone">' + sessionStorage.getItem('phone') + '</div><a href="https://map.kakao.com/link/map/' + sessionStorage.getItem('id') + '" target="_blank" class="link">바로가기</a></div>\n';
    }
    contents += '            </div>\n';
    contents += '        </div>\n';
    contents += '    </div>\n';
    contents += '</div>\n';

    overlay = new kakao.maps.CustomOverlay({
        content: contents,
        map: map,
        position: marker.getPosition()
    });

    kakao.maps.event.addListener(marker, 'click', function() {
        overlay.setMap(map);
    });

    setTimeout(function(){
        map.relayout();
        map.setCenter(moveLatLon);
    }, 500);
}

function closeOverlay() {
    overlay.setMap(null);
}