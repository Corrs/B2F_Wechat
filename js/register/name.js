/**
 * Created by BobyCo on 2017/11/14 0014.
 */
$(function () {
    // 获取本地保存的hall信息
    var hall = getJSONItem("hall");
    if (typeof hall == "undefined" || hall === null) {
        hall = {};
    }
    // 点击保存时将信息更新到localStorage
    $('.name-save_btn').click(function (e) {
        e.preventDefault();
        hall.name = $('input[name="name"]').val();
        setJSONItem("hall", hall);
        // localStorage.setItem("hallName", $('input[name="name"]').val());
        window.history.back(-1);
    });

    // 根据本地存储的信息进行初始化展示
    $('input[name="name"]').val(hall.name);
});