/**
 * Created by BobyCo on 2017/11/15 0015.
 */
$(function () {
    var type = GetQueryString("type"),
        typeName = "",
        labels = [];
    if (type == 1) {
        typeName = "hall";
    } else {
        typeName = "supplier";
    }

    var obj = getJSONItem(typeName);
    if (typeof obj == "undefined" || obj === null) {
        obj = {};
    }
    initLabels();
    // $('body').css('minHeight', $(window).height());
    // 贴上标签
    $('.label-add_btn').off('click').click(function (e) {
        // 获得标签内容
        var label = $.trim($('input[name="label"]').val());
        if (label.length > 0) {
            addLabel(label);
        }
        $('input[name="label"]').val('');
    });

    // 删除标签事件方法
    function removeLabel() {
        $('.label-close').off('click').click(function (e) {
            labels.splice($(this).parent().index(), 1);
            // saveLables();
            $(this).parent().remove();
            var labelName = $(this).siblings("span").html(),
                lis = $(".weui-cell__bd ul li");
            for (var i=0; i<lis.length; i++) {
                var li = lis[i];
                if ((typeof $(li).attr("class") != "undefined" && $(li).attr("class").indexOf("on") != -1) && $.trim($(li).find("p").html()) == labelName) {
                    $(li).removeClass("on");
                    break;
                }
            }
        });
    }

    function initLabels() {
        labels = obj.label && obj.label.split(',') || [];
        $.each(labels, function (i, e) {
            var lis = $(".weui-cell__bd ul li");
            $('.label-list').append('<li>'+e+'<a href="javascript:;" class="label-close">&times;</a></li>');
            for (var i=0; i<lis.length; i++) {
                var li = lis[i];
                if ((typeof $(li).attr("class") == "undefined" || $(li).attr("class").indexOf("on") == -1) && $.trim($(li).find("p").html()) == e) {
                    $(li).addClass("on");
                    break;
                }
            }
        });
        removeLabel();
    }

    // 添加标签
    function addLabel(label) {
        $('.label-list').append('<li><span>'+label+'</span><a href="javascript:;" class="label-close">&times;</a></li>');
        labels.push(label);
        // saveLables();
        // 添加删除标签事件
        removeLabel();
    }

    function saveLables() {
        obj.label = labels.join(',');
        setJSONItem(typeName, obj);
    }

    // 确定按钮
    $(".label-save_btn").off("click").click(function () {
        saveLables();
        window.history.back()
    });
    
    // 点击标签选中
    $(".weui-cell__bd ul li").off("click").click(function () {
        var label = $.trim($(this).find("p").html());
        if (label.length > 0 && (typeof $(this).attr("class") == "undefined" || $(this).attr("class").indexOf("on") == -1)) {
            addLabel(label);
            $(this).addClass("on");
        }
    });
});