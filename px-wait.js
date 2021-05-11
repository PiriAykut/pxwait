/* 
    Created on : 11.Oca.2018, 17:04:12
    Author     : Piri AYKUT - piriaykut@hotmail.com - piriaykut@gmail.com
*/

window.pxwait = {
    ajaxobject: null,
    show: function (options) {
        if ($(".pxwait").length > 0) {
            $(".pxwait").remove();
        }

        var tempmsg = '';
        if (typeof options !== 'object') {
            tempmsg = options;
            options = undefined;
        }

        pxwait.ajaxobject = null;

        var def = {
            width: 'auto',
            bgcolor: 'rgba(0,0,0,0.4)',
            frcolor: '#fff',
            panelshow: false,
            spinlevel: 'random',
            message: '',
            ajaxobj: null,
            canceltimeout: 0,
            cancelbutton: 'İptal Et',
            showtype: 0
        };

        options = $.extend(def, options);

        pxwait.ajaxobject = options.ajaxobj;

        if (tempmsg !== '') {
            options.message = tempmsg;
        }

        switch (options.showtype.toString()) {
            case '0':
                showpxwait0(options);
                break;
            case '1':
                showpxwait1(options);
                break;
        }
    },
    change: function (_message) {
        if ($(".pxwait").length == 0) {
            pxwait.show({ message: _message });
        } else {
            $('.pxwait-window-message').html(_message);
        }
    },
    hide: function (isRunAjax) {
        if (isRunAjax === true && pxwait.ajaxobject === null) return;

        pxwait.ajaxobject = null;

        if ($(".pxwait").length > 0) {
            $(".pxwait").remove();
        } else if ($(".pleasewait1").length > 0) {
            $(".pleasewait1").remove();
        }
    },
    cancel: function () {
        if (pxwait.ajaxobject !== null) {
            pxwait.ajaxobject.abort();
            pxwait.ajaxobject = null;
        }

        if (core !== undefined) {
            core.isRunned = false;
        }

        pxwait.hide();
    }
};

function showpxwait0(options) {
    if (options.panelshow === true && options.frcolor === "#fff") {
        options.frcolor = "#444";
    }

    if (options.spinlevel === 'random') {
        options.spinlevel = (Math.floor(Math.random() * 11) + 1).toString();
    }

    $("body").append('<div class="pxwait"></div>');

    $(".pxwait")
        .css("background", options.bgcolor)
        .css("color", options.frcolor)
        .append('<div class="pxwait-window"></div>');

    $(".pxwait-window")
        .css("width", options.width)
        .css("color", options.frcolor);


    if (options.panelshow === true) {
        $(".pxwait-window").addClass("pxwait-window-showbg");
    }
    if (options.message !== "") {
        $(".pxwait-window").append('<div class="pxwait-window-message">' + options.message + '</div>');
    }

    if (options.spinlevel != "none") {
        $(".pxwait-window").append('<div class="pxwait-window-spinblock">' + getSpinnerpxwait(options.spinlevel, options.frcolor) + '</div>');
    }

    if (options.canceltimeout > 0) {
        $(".pxwait-window").append('<div class="pxwait-window-timeoutnumber">0</div>');
        $(".pxwait-window").append('<div class="pxwait-window-cancelbutton" onclick="pxwait.cancel();">' + options.cancelbutton + '</div>');
        setTimeoutpxwait(1, parseInt(options.canceltimeout));
    }

    //setColorSpinnerpxwait(options.spinlevel, options.frcolor);

    $(".pxwait-window-spinblock")
        .css("color", options.frcolor);

    var w = $(".pxwait-window").width();
    var h = $(".pxwait-window").height();

    var lp = $(".pxwait-window").css("padding-left");
    var rp = $(".pxwait-window").css("padding-right");
    var tp = $(".pxwait-window").css("padding-top");
    var bp = $(".pxwait-window").css("padding-bottom");

    if (lp === undefined || lp === null || lp === "") lp = "0";
    if (rp === undefined || rp === null || rp === "") rp = "0";
    if (tp === undefined || tp === null || tp === "") tp = "0";
    if (bp === undefined || bp === null || bp === "") bp = "0";

    lp = parseInt(lp);
    rp = parseInt(rp);
    tp = parseInt(tp);
    bp = parseInt(bp);

    w = w + lp + rp;
    h = h + tp + bp;

    $(".pxwait-window")
        .css("margin-left", "-" + (w / 2) + "px")
        .css("margin-top", "-" + ((h / 2) + 20) + "px");
}

function showpxwait1(options) {
    $("body").append('<div class="pleasewait1">' +
        '    <div class="waitwindow1">' +
        '        <img src="' + core.u.sitePath.replace('/app/', '') + '/images/loading3.gif" />' +
        '        <span>' + options.message + '</span>' +
        '    </div>' +
        '</div>');
}

function setTimeoutpxwait(say, timeout) {
    say++;

    if ($(".pxwait-window-timeoutnumber").length === 0) {
        return;
    }

    if (say > timeout) {
        $(".pxwait-window-timeoutnumber").css("display", "none");
        $(".pxwait-window-cancelbutton").css("display", "block");
        return;
    }

    $(".pxwait-window-timeoutnumber").html(say);

    setTimeout(function () {
        setTimeoutpxwait(say, timeout);
    }, 1100);
}

function getSpinnerpxwait(nm, clr) {
    switch (nm) {
        case "1":
            return '<div class="sk-rotating-plane" style="background-color:' + clr + '"></div>';
        case "2":
            return '<div class="sk-double-bounce">' +
                '     <div class="sk-child sk-double-bounce1" style="background-color:' + clr + '"></div>' +
                '     <div class="sk-child sk-double-bounce2" style="background-color:' + clr + '"></div>' +
                '</div>';
        case "3":
            return '<div class="sk-wave">' +
                '   <div class="sk-rect sk-rect2" style="background-color:' + clr + '"></div>' +
                '   <div class="sk-rect sk-rect1" style="background-color:' + clr + '"></div>' +
                '   <div class="sk-rect sk-rect3" style="background-color:' + clr + '"></div>' +
                '   <div class="sk-rect sk-rect4" style="background-color:' + clr + '"></div>' +
                '   <div class="sk-rect sk-rect5" style="background-color:' + clr + '"></div>' +
                '</div>';
        case "4":
            return '<div class="sk-wandering-cubes">' +
                '    <div class="sk-cube sk-cube1" style="background-color:' + clr + '"></div>' +
                '    <div class="sk-cube sk-cube2" style="background-color:' + clr + '"></div>' +
                '</div>';
        case "5":
            return '<div class="sk-spinner sk-spinner-pulse" style="background-color:' + clr + '"></div>';
        case "6":
            return '<div class="sk-chasing-dots">' +
                '    <div class="sk-child sk-dot1" style="background-color:' + clr + '"></div>' +
                '    <div class="sk-child sk-dot2" style="background-color:' + clr + '"></div>' +
                ' </div>';
        case "7":
            return '<div class="sk-three-bounce">' +
                '   <div class="sk-child sk-bounce1" style="background-color:' + clr + '"></div>' +
                '   <div class="sk-child sk-bounce2" style="background-color:' + clr + '"></div>' +
                '   <div class="sk-child sk-bounce3" style="background-color:' + clr + '"></div>' +
                '</div>';
        case "8-iptal":
            return '<div class="sk-circle">' +
                '  <div class="sk-circle1 sk-child" style="background-color:' + clr + '"></div>' +
                '  <div class="sk-circle2 sk-child" style="background-color:' + clr + '"></div>' +
                '  <div class="sk-circle3 sk-child" style="background-color:' + clr + '"></div>' +
                '  <div class="sk-circle4 sk-child" style="background-color:' + clr + '"></div>' +
                '  <div class="sk-circle5 sk-child" style="background-color:' + clr + '"></div>' +
                '  <div class="sk-circle6 sk-child" style="background-color:' + clr + '"></div>' +
                '  <div class="sk-circle7 sk-child" style="background-color:' + clr + '"></div>' +
                '  <div class="sk-circle8 sk-child" style="background-color:' + clr + '"></div>' +
                '  <div class="sk-circle9 sk-child" style="background-color:' + clr + '"></div>' +
                '  <div class="sk-circle10 sk-child" style="background-color:' + clr + '"></div>' +
                '  <div class="sk-circle11 sk-child" style="background-color:' + clr + '"></div>' +
                '  <div class="sk-circle12 sk-child" style="background-color:' + clr + '"></div>' +
                '</div>';
        case "8":
        case "9":
        case "10":
            return '<div class="sk-cube-grid">' +
                '  <div class="sk-cube sk-cube1" style="background-color:' + clr + '"></div>' +
                '  <div class="sk-cube sk-cube2" style="background-color:' + clr + '"></div>' +
                '  <div class="sk-cube sk-cube3" style="background-color:' + clr + '"></div>' +
                '  <div class="sk-cube sk-cube4" style="background-color:' + clr + '"></div>' +
                '  <div class="sk-cube sk-cube5" style="background-color:' + clr + '"></div>' +
                '  <div class="sk-cube sk-cube6" style="background-color:' + clr + '"></div>' +
                '  <div class="sk-cube sk-cube7" style="background-color:' + clr + '"></div>' +
                '  <div class="sk-cube sk-cube8" style="background-color:' + clr + '"></div>' +
                '  <div class="sk-cube sk-cube9" style="background-color:' + clr + '"></div>' +
                '</div>';
        case "10-iptal":
            return '<div class="sk-fading-circle">' +
                '  <div class="sk-circle1 sk-circle" style="background-color:' + clr + '"></div>' +
                '  <div class="sk-circle2 sk-circle" style="background-color:' + clr + '"></div>' +
                '  <div class="sk-circle3 sk-circle" style="background-color:' + clr + '"></div>' +
                '  <div class="sk-circle4 sk-circle" style="background-color:' + clr + '"></div>' +
                '  <div class="sk-circle5 sk-circle" style="background-color:' + clr + '"></div>' +
                '  <div class="sk-circle6 sk-circle" style="background-color:' + clr + '"></div>' +
                '  <div class="sk-circle7 sk-circle" style="background-color:' + clr + '"></div>' +
                '  <div class="sk-circle8 sk-circle" style="background-color:' + clr + '"></div>' +
                '  <div class="sk-circle9 sk-circle" style="background-color:' + clr + '"></div>' +
                '  <div class="sk-circle10 sk-circle" style="background-color:' + clr + '"></div>' +
                '  <div class="sk-circle11 sk-circle" style="background-color:' + clr + '"></div>' +
                '  <div class="sk-circle12 sk-circle" style="background-color:' + clr + '"></div>' +
                '</div>';
        case "11":
            return '<div class="sk-folding-cube">' +
                '  <div class="sk-cube1 sk-cube" style="background-color:' + clr + '"></div>' +
                '  <div class="sk-cube2 sk-cube" style="background-color:' + clr + '"></div>' +
                '  <div class="sk-cube4 sk-cube" style="background-color:' + clr + '"></div>' +
                '  <div class="sk-cube3 sk-cube" style="background-color:' + clr + '"></div>' +
                '</div>';
        default:
            return '';
    }
}