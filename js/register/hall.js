/**
 * Created by BobyCo on 2017/11/14 0014.
 */
$(function () {
    // 获得餐厅信息
    var hall = getJSONItem("hall");
    if (typeof hall == "undefined" || hall === null) {
        hall = {};
    }
    // 初始化餐厅信息
    initHallInfo();
    function initHallInfo() {
        $(".name").html(hall.name);
        $(".label").html(hall.label);
        $(".picker").html(hall.picker);
    }

    // 地址选择事件
    $('.choose-picker').off('click').click(function (e) {
        e.stopPropagation();
        $("#city-picker").picker("open");
        var pickerCodes = hall.pickerCodes || "110000,110000,110101";
        $("#city-picker").picker("setValue", pickerCodes.split(","));

        // 取消
        $(".toolbar-inner").append("<a href=\"javascript:;\" class=\"cancel-picker\">取消</a>");
        $(".cancel-picker").off("click").click(function () {
            $("#city-picker").val(hall.picker);
            $("#city-picker").picker("close");
        });
        // 完成
        $(".close-picker").off("click").click(function (e) {
            hall.picker = $("#city-picker").val()||"北京 北京市 东城区";
            hall.pickerCodes = $("#city-picker").attr("data-codes");
            initHallInfo();
        });
    });
    // 初始化地址选择组件
    $("#city-picker").val(hall.picker).cityPicker({
        title: ""
    });

    // 点击跳转输入店名或标签时，记录餐厅信息
    $(".weui-cell:lt(2)").off("click").click(function (e) {
        e.preventDefault();
        setJSONItem("hall", hall);
        window.location.href = $(this).attr("href");
    });

    // 注册按钮点击事件
    $(".btn-register").off("click").click(function () {
        setJSONItem("hall", hall);
        console.log("点击注册");
        $.toast("注册成功");
    });
});