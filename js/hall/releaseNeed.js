/**
 * Created by BobyCo on 2017/11/17 0017.
 */
$(function () {
    var $normInput = $(".budget input[name=\"norm\"]"), // 规格输入框
        $normSpan = $(".demand .norm"), // 规格数据同步展示区
        $status = $(".status"), // 状态切换按钮
        $labelAddBtn = $(".label-add_btn"), // 贴上标签按钮
        $labelInput = $("input[name=\"label\"]"),// 标签输入框
        $labelItems = $(".label-items"),// 标签显示区域
        $normalLabels = $(".normal-label .weui-cell__bd ul li"); // 推荐标签
        labels=[], // 存储标签
        status = 1; // 状态值默认为1  1为公布 0为隐藏
    // 输入规格时 同步显示
    $normInput.change(function () {
        $normSpan.html($(this).val());
    });

    // 切换公布状态
    $status.off("click").click(function () {
        status = status == 1 ? 0 : 1;
        $(this).children().toggleClass("hidden");
        console.log(status);
    });

    // 贴上标签
    $labelAddBtn.off("click").click(function () {
        $.trim($labelInput.val());
        var label = $.trim($labelInput.val());
        if (label.length > 0) {
            addLabel(label);
        }
        $labelInput.val("");
    });

    // 添加标签
    function addLabel(label) {
        if (labels.length < 4) {
            $labelItems.append('<li class="on"><p>'+label+'</p><a href="javascript:;" class="label-close">&times;</a></li>');
            labels.push(label);
            removeLabel();
            return true;
        } else {
            $.toptip("最多允许添加4个标签", "warning");
            return false;
        }
    }

    // 删除标签事件方法
    function removeLabel() {
        $('.label-close').off('click').click(function (e) {
            labels.splice($(this).parent().index(), 1);
            // saveLables();
            $(this).parent().remove();
            var labelName = $(this).siblings().html();
            for (var i=0; i<$normalLabels.length; i++) {
                var li = $normalLabels[i];
                if ((typeof $(li).attr("class") != "undefined" && $(li).attr("class").indexOf("on") != -1) && $.trim($(li).find("p").html()) == labelName) {
                    $(li).removeClass("on");
                    break;
                }
            }
        });
    }

    // 点击标签选中
    $normalLabels.off("click").click(function () {
        var label = $.trim($(this).find("p").html());
        if (label.length > 0 && (typeof $(this).attr("class") == "undefined" || $(this).attr("class").indexOf("on") == -1)) {
            addLabel(label) ? $(this).addClass("on"):console.log("最多允许添加4个标签");
        }
    });

    // 发布按钮事件
    $(".release-need_btn").off("click").click(function () {
        if (labels.length <= 0) {
            $.toptip("请填写标签", "warning");
            return;
        }

        var data = {};
        data.category = $("select[name=\"category\"]").val(); // 分类
        data.price = $(".budget input[name=\"price\"]").val(); // 预算金额
        data.norm = $(".budget input[name=\"norm\"]").val(); // 规格
        data.num = $(".demand input[name=\"num\"]").val(); // 需求量
        data.rate = $(".demand select[name=\"rate\"]").val();// 需求频率
        data.formula = $("textarea[name=\"formula\"]").val(); // 产品配方
        data.label = labels.join(","); //标签
        data.status = status; // 公布状态
        // 数据发送后台保存 保存成功后返回前一页
        /*
            $.post(url, data, function(result){},"json");
        */
        window.history.back(-1);
    });
});