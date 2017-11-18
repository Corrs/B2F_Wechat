/**
 * Created by BobyCo on 2017/11/14 0014.
 */
$(function () {
    // 获得供应商信息
    var supplier = getJSONItem("supplier");
    if (typeof supplier == "undefined" || supplier === null) {
        supplier = {};
    }

    initSupplierInfo();
    function initSupplierInfo() {
        // 初始化供应商名
        $("input[name='name']").val(supplier.name);
        $(".label").html(supplier.label);
        $(".picker").html(supplier.picker);
    }

    // 点击确认按钮事件
    $(".btn-confirm").off("click").click(function (e) {
        e.preventDefault();
        supplier.name = $.trim($("input[name='name']").val());

        if (supplier.name.length <= 0) {
            $.toptip("请填写供应商名", 1000, "warning");
            return false;
        }

        if (typeof supplier.label == "undefined" || $.trim(supplier.label).length <= 0) {
            $.toptip("请填写标签", 1000, "warning");
            return false;
        }

        if (typeof supplier.picker == "undefined" || $.trim(supplier.picker).length <= 0) {
            $.toptip("请填写地址", 1000, "warning");
            return false;
        }

        setJSONItem("supplier", supplier);
        $.toast("操作成功");
    });

    // 输入标签时记录供应商信息
    $('.weui-cell_access:eq(0)').off('click').click(function () {
        supplier.name = $.trim($("input[name='name']").val());
        setJSONItem("supplier", supplier);
    });

    // 地址选择事件
    $('.choose-picker').off('click').click(function (e) {
        e.stopPropagation();
        $("#city-picker").picker("open");
        var pickerCodes = supplier.pickerCodes || "110000,110000,110101";
        $("#city-picker").picker("setValue", pickerCodes.split(","));

        // 取消
        $(".toolbar-inner").append("<a href=\"javascript:;\" class=\"cancel-picker\">取消</a>");
        $(".cancel-picker").off("click").click(function () {
            $("#city-picker").val(supplier.picker);
            $("#city-picker").picker("close");
        });
        // 完成
        $(".close-picker").off("click").click(function (e) {
            supplier.picker = $("#city-picker").val()||"北京 北京市 东城区";
            supplier.pickerCodes = $("#city-picker").attr("data-codes");
            initSupplierInfo();
        });
    });
    // 初始化地址选择组件
    $("#city-picker").val(supplier.picker).cityPicker({
        title: ""
    });
});