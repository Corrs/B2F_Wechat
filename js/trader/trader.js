/**
 * Created by BobyCo on 2017/11/16 0016.
 */
$(function () {
    $('.phone').off('click').click(function () {
        var phoneNO = $(this).find('span').html();
        $('.mask').css('display', 'flex');
        $('.mask .weui-media-box:eq(0) a').attr('href', 'tel:'+phoneNO);
        $('.mask .weui-media-box:eq(1) a').attr('href', 'wtai://wp/ap;'+phoneNO);
    });

    $('.mask').off('click').click(function (e) {
        $(this).hide();
    });
});