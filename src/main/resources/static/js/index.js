var container = document.getElementById('map');
var options = {
    center: new kakao.maps.LatLng(0, 0),
    level: 3
};
var map = new kakao.maps.Map(container, options);
var overlay;

var place = {

    // 검색 함수
    search : function() {
        $('#pagination').twbsPagination('destroy');

        var frm = document.searchForm;
        if(trim(frm.keywordNm.value) == ''){
            alert("검색어를 입력해 주세요");
            frm.keywordNm.focus();
            return false;
        }

        frm.currentPage.value = 1;
        frm.searchType.value = 'search';

        var url = '/place';
        var data = $("form[name=searchForm]").serialize();

        $.ajax({
            type: "GET",
            url: url,
            data: data,
            dataType: 'JSON',
            success: function (res) {
                place.makeList(res);
            }
        });
    },

    // 리스트 및 페이징 함수
    list : function() {
        var frm = document.searchForm;
        frm.searchType.value = 'list';

        var url = '/place';
        var data = $("form[name=searchForm]").serialize();

        $.ajax({
            type: "GET",
            url: url,
            data: data,
            dataType: 'JSON',
            success: function (res) {
                place.makeList(res);
            }
        });
    },

    // 리스트를 만들어주는 함수
    makeList : function(data) {
        $('#place_list').empty();

        var frm = document.searchForm;
        var list = data.documents;
        var totalCount = data.meta.pageable_count;

        if(list.length > 0){
            var contents = '';

            list.forEach(function(item, index, array){
                contents += '<div class="card">\n';
                contents += '   <div class="card-body" data-value="'+item.id+'">\n';
                contents += '       <h6 class="card-subtitle mb-2 text-muted">'+item.category_name+'</h6>\n';
                contents += '       <h5 class="card-title">'+item.place_name+'</h5>\n';
                contents += '       <h6 class="card-subtitle mb-2 text-muted phone">'+item.phone+'</h6>\n';
                if(trim(item.road_address_name) != ''){
                    contents += '       <p class="card-text"><span class="badge badge-dark">도로명</span><span class="road-adres">'+item.road_address_name+'</span></p>\n';
                }
                if(trim(item.address_name) != ''){
                    contents += '       <p class="card-text"><span class="badge badge-dark">지번</span><span class="adres">'+item.address_name+'</span></p>\n'
                }
                contents += '       <button type="button" id="modalBtn" class="btn btn-primary" data-toggle="modal" data-target="#mapModal" data-lng="'+item.x+'" data-lat="'+item.y+'">상세조회</button>\n';
                contents += '   </div>\n';
                contents += '</div>\n';
            })

            $('#place_list').html(contents);
            $("#place_list > .card").first().prop("tabindex", -1).focus();

            var totalPage = parseInt(totalCount / 10);

            if (totalCount > 10 * totalPage) {
                totalPage++;
            }

            $('#pagination').twbsPagination({
                initiateStartPageClick: false,
                totalPages: totalPage,
                visiblePages: 10,
                first: '<<',
                prev: '<',
                next: '>',
                last: '>>',

                onPageClick: function (event, page) {
                    frm.currentPage.value = page;
                    place.list();
                }
            });
        }else{
            var contents = '';

            contents += '<div class="card">\n';
            contents += '   <div class="card-body text-center">\n';
            contents += '       <h3 class="my-xl-5">검색된 결과가 없습니다.</h3>\n';
            contents += '   </div>\n';
            contents += '</div>\n';

            $('#place_list').html(contents);
        }
    },

    // 인기 검색어 및 히스토리 갱신 함수 (10초마다 갱신)
    updateData : function() {
        var url = '/place';

        $.ajax({
            type: "POST",
            url: url,
            dataType: 'JSON',
            timeout: 5000,
            beforeSend: function () {
            },
            success: function (res) {
                $('#keyword_list').empty();
                $('#history_list').empty();

                var historyList = res.historyList;
                var topKeywordList = res.topKeywordList;
                var contents = '';

                if(typeof topKeywordList != 'undefined' && topKeywordList.length > 0){
                    topKeywordList.forEach(function(item, index, array){
                        contents += '<li class="list-group-item">'+item.keywordNm+' / '+item.keywordCnt+'회</li>\n';
                    })
                }else{
                    contents += '<li class="list-group-item">등록된 데이터가 없습니다.</li>\n';
                }

                $('#keyword_list').html(contents);
                contents = '';

                if(typeof historyList != 'undefined' && historyList.length > 0){
                    historyList.forEach(function(item, index, array){
                        contents += '<li class="list-group-item">'+item.keywordNm+'<br>'+item.convertRegDate+'</li>\n';
                    })
                }else{
                    contents += '<li class="list-group-item">등록된 데이터가 없습니다.</li>\n';
                }

                $('#history_list').html(contents);
            },
            complete: setTimeout(function () {
                place.updateData();
            }, 10000)
        });
    }
}

$( document ).ready(function() {
    place.updateData();
});