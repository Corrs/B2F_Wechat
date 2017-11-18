/**
 * Created by BobyCo on 2017/11/14 0014.
 */
$(function(){
    var value = 1;
    // 选中身份类别：1餐厅、2供应商
    $('label>div').off('click').click(function(e){
        e.stopPropagation();
        $('label input:checkbox').attr('checked', false);
        $('label input:checkbox').siblings().removeClass('checked');
        $(this).find('input:checkbox').attr('checked', true);
        $(this).find('i').addClass('checked');
        value = $(this).find('input:checkbox').val();
    });

    // 确定按钮动作
    $('.btn-confirm').off('click').click(function (e) {
        e.preventDefault();
        var href = '',
            realPath = getRealPath();
        if (value == 2) {
            href = realPath + '/register/wechat_supplier.html'
        } else {
            href = realPath + '/register/wechat_hall.html'
        }

        window.location.href = href;
    });
});