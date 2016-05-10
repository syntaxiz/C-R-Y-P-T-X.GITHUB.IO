function httpGet(theUrl)
{
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function FormatNumberLength(num, length) {
    var r = "" + num;
    while (r.length < length) {
        r = "0" + r;
    }
    return r;
}

crypt_multi_background_color = typeof crypt_multi_background_color == "undefined" ? "#FFFFFF" : crypt_multi_background_color;
crypt_multi_transperency = typeof crypt_multi_transperency == "undefined" ? true : crypt_multi_transperency;
crypt_multi_border_width = typeof crypt_multi_border_width == "undefined" ? 1 : crypt_multi_border_width;
crypt_multi_border_color = typeof crypt_multi_border_color == "undefined" ? "#CCCCCC" : crypt_multi_border_color;
crypt_multi_border_corners = typeof crypt_multi_border_corners == "undefined" ? "rounded" : crypt_multi_border_corners;
crypt_multi_font_family = typeof crypt_multi_font_family == "undefined" ? "Arial" : crypt_multi_font_family;
crypt_multi_font_size = typeof crypt_multi_font_size == "undefined" ? "medium" : crypt_multi_font_size;
crypt_multi_font_color = typeof crypt_multi_font_color == "undefined" ? "#000000" : crypt_multi_font_color;
crypt_multi_display_time = typeof crypt_multi_display_time == "undefined" ? true : crypt_multi_display_time;

if (crypt_multi_transperency)
    crypt_multi_background_color = 'transparent';

switch (crypt_multi_font_size) {
    case 'small':
        crypt_multi_font_size = "90%";
        break;

    case 'medium':
        crypt_multi_font_size = "110%";
        break;

    case 'large':
        crypt_multi_font_size = "150%";
        break;
}

crypt_multi_style = 'background: ' + crypt_multi_background_color +
    '; border: ' + crypt_multi_border_width + 'px solid ' + crypt_multi_border_color + ';' +
    'font-family: ' + crypt_multi_font_family +'; font-size: ' + crypt_multi_font_size +
    '; color: ' + crypt_multi_font_color + ';';

if (crypt_multi_border_corners == "square") {
    crypt_multi_style += "-webkit-border-radius: 0 !important; -moz-border-radius: 0 !important; border-radius: 0 !important;";
}

document.write('\
    <div class="cryptonatorwidget" style="border-radius:4px;' + crypt_multi_style + '">\
    ');

for (var i = 0; i < crypt_multi_num_cur; ++i) {
    n1 = eval("crypt_base_cur_" + i);
    n2 = eval("crypt_target_cur_" + i);

    getPar = eval('(' + httpGet("https://www.cryptonator.com/api/ticker/" +
        n1.match(/.*?\(([0-9a-z]+)\)/i)[1] + "-" + n2.match(/.*?\(([0-9a-z]+)\)/i)[1]) + ')');

    if (getPar.success != false) {
        if (getPar.ticker.price > 1)
            price = Math.round(getPar.ticker.price * 100) / 100;
        else
            price = getPar.ticker.price;

        var text_style = '<font style="color:#cc0000;font-weight:heavy;"><b>&darr;</b></font>';
        if (getPar.ticker.change >= 0) {
            text_style = '<font style="color:#009900;font-weight:heavy;"><b>&uarr;</b></font>';
        }

        document.write('<div style="border-bottom: 1px solid ' + crypt_multi_border_color + ';padding:10px;">\
            <font style="font-size:90%;">' + n1 + '</font>\
            <b>' + price + '</b> ' + n2.match(/.*?\(([0-9a-z]+)\)/i)[1] + '\
                ' + text_style + '\
                ');

        var month_name = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");

        var date = new Date(getPar.timestamp * 1000);
        var day = FormatNumberLength(date.getDate(), 2);
        var month = month_name[date.getMonth()];
        var year = date.getFullYear();
        var hour = FormatNumberLength(date.getHours(), 2);
        var minutes = FormatNumberLength(date.getMinutes(), 2);
        var seconds = FormatNumberLength(date.getSeconds(), 2);
        var time_zone = date.getTimezoneOffset();
        time_zone = "UTC" + (time_zone > 0 ? "-" : "+") + Math.floor(Math.abs(time_zone) / 60)
            + ":" + FormatNumberLength((time_zone % 60), 2);

        document.write('</div>');
    }
    else {
        document.write('<div style="border-bottom: 1px solid ' + crypt_multi_border_color + ';padding:10px;">No price available</div>');
    }
}

if (crypt_multi_display_time)
    document.write('<div style="font-size:70%;opacity:0.6;padding-top:10px;padding-left:10px;">Updated ' + day + ' ' + month + ' ' + year + ' '
        + hour + ':' + minutes + ':' + seconds + ' '
        + time_zone + '</div>');

document.write('<div style="font-size:10px;opacity:0.6;padding:10px;">Powered by <a style="color:' + crypt_multi_font_color + ';" href="https://www.cryptonator.com" target="_blank">Cryptonator</a></div>\
</div>');
