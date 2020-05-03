$(document).ready(function () {
    initPage();
    center_divs();
    xs_menu_functions();
    setInterval(loading_bars_function, 500);

    loading_page();
    $(".image_rgb").each(function () {
        var rgb = getAverageRGB(this);
        var thecolor =  rgb.r + ',' + rgb.g + ',' + rgb.b ;
        $(this).parent().next().attr("data-color", thecolor);
    });
    articleItem();
});
function getAverageRGB(imgEl) {

    var blockSize = 5, // only visit every 5 pixels
        defaultRGB = {r: 0, g: 0, b: 0}, // for non-supporting envs
        canvas = document.createElement('canvas'),
        context = canvas.getContext && canvas.getContext('2d'),
        data, width, height,
        i = -4,
        length,
        rgb = {r: 0, g: 0, b: 0},
        count = 0;

    if (!context) {
        return defaultRGB;
    }

    height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
    width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

    context.drawImage(imgEl, 0, 0);

    try {
        data = context.getImageData(0, 0, width, height);
    } catch (e) {
        /* security error, img on diff domain */
        //alert('x');
        return defaultRGB;
    }

    length = data.data.length;

    while ((i += blockSize * 4) < length) {
        ++count;
        rgb.r += data.data[i];
        rgb.g += data.data[i + 1];
        rgb.b += data.data[i + 2];
    }

    // ~~ used to floor values
    rgb.r = ~~(rgb.r / count);
    rgb.g = ~~(rgb.g / count);
    rgb.b = ~~(rgb.b / count);

    return rgb;

}

function badominantColor() {
    $(".image-color").each(function () {
        var colorThief = new ColorThief();

        alert(colorThief.getColor("images/links/vistor_link.png"));
        //  console.log(dominantColor);
        //// returns {r: num, g: num, b: num}
        //  $(this).next(".title-content").attr("data-color", dominantColor);
    });

}

function articleItem() {
    $(".title-content").each(function () {
        var color = $(this).attr("data-color");
        var rgbcolor = "rgba(" + color + ",.9)";
        $(this).css("backgroundColor", rgbcolor);

    });

    var height = ($(".img-container").height() / 2) - (($(".title-content").height() + 20 ) / 2);
    $(".position-center").css("marginTop", height);
}
function xs_menu_functions() {
    var menu_icon = $("#menu_icon");
    var close_icon = $("#close_icon");
    $(menu_icon).click(function () {
        $("body").addClass("clicked");
    });
    $(close_icon).click(function () {
        $("body").removeClass("clicked");
    })
}


var i = 0;
function loading_bars_function() {


    if (i == 0) {
        $(".loading-bar").eq(2).removeClass("glow");
        $(".loading-bar").eq(i).addClass("glow");
        i = i + 1;
    }
    else {
        $(".loading-bar").eq(i - 1).removeClass("glow");
        $(".loading-bar").eq(i).addClass("glow");
        i = i + 1;
    }


    if (i == 3) {
        i = 0;
    }


}


function loading_page() {
    setTimeout(function () {
        $('.loading_page').fadeOut(500);
        $('.landing-page ,.search').fadeIn(1000);
        adjust_BG_img();
    }, 100);
}

/* FUNCTIONS DEFINITION */
function initPage() {
}


/* CENTER DIVS VERTICALLY */
function center_divs() {
    var temp;
    var win_height = $(window).height();
    $('.vertical_center').each(function () {
        var div_height = $(this).height();
        var center_div = ((win_height / 2) - (div_height / 2)) - 100;
        $(this).css('margin-top', center_div);
        $(window).resize(function () {
            clearTimeout(temp);
            temp = setTimeout(function () {
                win_height = $(window).height();
                div_height = $('.vertical_center').height();
                center_div = ((win_height / 2) - (div_height / 2)) - 100;
                $('.vertical_center').css('margin-top', center_div);
            }, 200);
        })
    });
}

/* VALIDATE NUMBERS */
function validate_numbers(element) {
    element.keydown(function (e) {
        // ALLOW: BACKSPACE, DELETE, TAB, ESCAPE, ENTER AND .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                // ALLOW: CTRL+A, COMMAND+A
            (e.keyCode == 65 && ( e.ctrlKey === true || e.metaKey === true ) ) ||
                // ALLOW: HOME, END, LEFT, RIGHT, DOWN, UP
            (e.keyCode >= 35 && e.keyCode <= 40)) {
            // LET IT HAPPEN
            return true;
        }
        // ENSURE THAT IT IS A NUMBER
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105))
            return false;
        else {
            return true;
        }
    });
}

/* VALIDATE LENGTH */
function validate_length(element, length) {
    // SET MAX LENGTH
    element.keydown(function (e) {

        // ALLOW: BACKSPACE, DELETE, TAB, ESCAPE, ENTER AND .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                // ALLOW: CTRL+A, COMMAND+A
            (e.keyCode == 65 && ( e.ctrlKey === true || e.metaKey === true ) ) ||
                // ALLOW: HOME, END, LEFT, RIGHT, DOWN, UP
            (e.keyCode >= 35 && e.keyCode <= 40)) {
            // LET IT HAPPEN
            return true;
        }
        if (element.val().length > length - 1) {
            e.preventDefault();
        }
    });
}

/* VALIDATE EMAIL */
function validate_email(value) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(value);
}