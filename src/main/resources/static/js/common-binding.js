$(document).on('click', '#modalBtn', function(e){
    var lat = $(this).data('lat');
    var lng = $(this).data('lng');
    var id = $(this).parent().data('value');
    var title = $(this).siblings('.card-title').text();
    var phone = $(this).siblings('.phone').text();
    var road_adres = $(this).parent().find('.road-adres').text();
    var adres = $(this).parent().find('.adres').text();

    sessionStorage.clear();
    sessionStorage.setItem("id", id);
    sessionStorage.setItem("title", title);
    sessionStorage.setItem("phone", phone);
    sessionStorage.setItem("road_adres", road_adres);
    sessionStorage.setItem("adres", adres);

    loadMap(lat, lng);
});