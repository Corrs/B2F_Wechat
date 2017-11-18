/**
 * Created by BobyCo on 2017/11/16 0016.
 */
$(function () {
    var flag = true;
    // 获取验证码
    $('.vcode-btn').off('click').click(function () {
        if(flag) {
            var t = 60,
                _this = this;
            flag = false;
            $(_this).addClass('weui-btn_disabled').html('重新获取（'+t+'）');
            var i = setInterval(function () {
                if (t <= 0) {
                    $(_this).removeClass('weui-btn_disabled').html('获取验证码');
                    flag = true;
                    clearInterval(i);
                    return;
                }
                $(_this).html('重新获取（'+(--t)+'）');
            }, 1000);
        }
    });
});