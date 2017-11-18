/**
 * Created by BobyCo on 2017/11/17 0017.
 */
$(function () {
    // 查询面板对象
    var $searchPanel = $(".search"),
        $searchInput = $("#searchInput"),
        $searchBar = $("searchBar"),
        $searchHistoryPanel = $(".search-history"),
        $status = $(".status"), // 状态切换按钮
        status = 1, // 状态值默认为1  1为公布 0为隐藏
        condition = {}, // 查询条件
        $clearBtn = $(".clear-history_btn"), // 清空历史记录按钮
        $searchHistoryItem = $(".search-history-item"), // 历史记录列表
        hallNeedSearchs = getNormalItem("hallNeedSearchs")||"", // 本地存储的查询历史记录
        items = (hallNeedSearchs && hallNeedSearchs.split(",")) || []; // 将历史记录字符串转为数组

    initHallInfo();
    initDatas();
    // 查询（初始化）数据
    function initDatas() {
        // 隐藏搜索面板
        $searchPanel.hide();
        // 后台请求数据
        /*$.post(url,condition, function (result) {

        },"json");*/


    }

    // 初始化餐厅信息
    function initHallInfo() {
        // 从localstorage获取信息，如无暂存数据
        /*

         */
    }

    // 初始化历史查询记录
    function initSearchHistoryItems() {
        $searchHistoryPanel.hide();
        $searchInput.val("");
        if (items.length > 0) {
            $searchHistoryPanel.show();
        }
        $searchHistoryItem.html("");
        $.each(items, function (i, e) {
            $searchHistoryItem.append("<li><p>" + e + "</p><a href=\"javascript:;\" class=\"label-close\">&times;</a></li>")
        });

        triggerCloseLabel();
        triggerLiClick();
    }

    // 清空历史记录
    $clearBtn.off("click").click(function () {
        removeItem("hallNeedSearchs");
        hallNeedSearchs = "";
        items = [];
        initSearchHistoryItems();
        $(this).parent().hide();
    });

    // 点击历史记录进行查询
    function triggerLiClick() {
        $searchHistoryItem.find("p").click(function (e) {
            e.stopPropagation();
            $searchBar.addClass("weui-search-bar_focusing");
            condition.search = $(this).html();
            // 查询数据
            initDatas();
        });
    }

    function triggerCloseLabel() {
        $(".label-close").off("click").click(function () {
            items.splice($(this).parent().index(), 1);
            $(this).parent().remove();
            initSearchHistoryItems();
        });
    }

    // 点击查询 显示查询面板 并初始化查询历史记录
    $(".weui-tab .add a:eq(0)").off("click").click(function (e) {
        initSearchHistoryItems();
        $searchPanel.show();
    });

    // 点击查询面板中的取消，关闭查询面板
    $(".weui-search-bar__cancel-btn").off("click").click(function (e) {
        e.preventDefault();
        $searchPanel.hide();
    });

    // 查询事件 搜索信息为必填项
    $searchInput.bind('search', function () {
        condition.search = $.trim($searchInput.val());
        if (condition.search.length > 0) {
            // 本地存储查询历史记录
            items.push($searchInput.val().toString());
            setNormalItem("hallNeedSearchs", items.join(","));
            // 查询数据
            initDatas();
        }
    });

    // 切换公布状态
    $status.off("click").click(function () {
        status = status == 1 ? 0 : 1;
        $(this).children().toggleClass("hidden");
        console.log(status);
    });

});