$(document).ready(function() {
    // compiled jade
    // window.Jade = templatizer;

    // для маскировок (?)
    window.cnt = $('.cnt');

    // удаляю trailing slashes
    window.href = window.location.pathname.replace(/\/$/, "");

    // Default Date Format alias
    window.ddf = globalVar.defaultDateFormat;

    window.getUrlParams = function() {
        var vars = {},
            hash;
        var hashes = decodeURIComponent(window.location.href.slice(window.location.href.indexOf('?') + 1)).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars[hash[0]] = hash[1];
        }
        return vars;
    };

    window.setUrlParam = function(key, value) {
        key = encodeURI(key);
        value = encodeURI(value);

        var kvp = document.location.search.substr(1).split('&');

        var i = kvp.length;
        var x;
        while (i--) {
            x = kvp[i].split('=');

            if (x[0] == key) {
                x[1] = value;
                kvp[i] = x.join('=');
                break;
            }
        }

        if (i < 0) {
            kvp[kvp.length] = [key, value].join('=');
        }

        //this will reload the page, it's likely better to store this until finished
        document.location.search = kvp.join('&');
    };

    // disable interface parts
    // TODO: ATLANT-like
    $.fn.mask = function(state) {
        if(state === undefined || state) {
            // add mask
            var mask = $("<div id='mask'><img src='/images/loading.gif'/></div>");
            if (this.find('#mask').length > 0) return;
            this.append(mask);

        }
        else {
            // remove mask
            this.find('#mask').fadeOut(500, function(){ $(this).remove();});
        }

        $('#mask img').css('margin-top',($('body').scrollTop())+200);
    };
    $.fn.unmask = function() {
        this.mask(false);
    };

    // уведомление об результате действия
    // state - true/false (success/fail)
    // cb - cb.
    // TODO: ATLANT-like
    $.fn.done = function(state, cb) {
        var el = this;
        if (typeof cb !== 'function') cb = function() {};
        var mask;
        if(state) {
            mask = $("<div id='done'><img src='/img/success.png' /></div>");
        }
        else {
            mask = $("<div id='done'><img src='/img/fail.png' /></div>");
        }
        if (el.find('#done').length > 0) return;
        el.append(mask);
        setTimeout(function() {
            el.find('#done').fadeOut(200, function(){ $(this).remove();});
            cb();
        }, 300);
    };


    // magnific popups
    window.mp = {};
    // замена стандартному алерту
    window.mp.alert = function(html) {
        var popup = $('<div></div>');
        popup.addClass('white-popup');
        // popup.append('<h3>Внимание!</h3>');
        popup.append(html);

        $.magnificPopup.open({
            items: {
                src: popup,
                type: 'inline'
            }
        });
    }
    // замена стандартному confirm
    window.mp.confirm = function(html, cb) {
        var popup = $('<div></div>');
        popup.addClass('white-popup');
        popup.append('<h2 class="mb-10">'+'Confirmation required!'+'</h2>');
        popup.append(html);

        var btns = $('<div class="mt-10"></div>');
            var ok = $(Jade.els.button('OK')).addClass('mr-10');
                ok.bind('click', function() {
                    cb();
                    $.magnificPopup.close();
                });
            var cancel = $(Jade.els.button('Cancel'));
                cancel.bind('click', function() {
                    $.magnificPopup.close();
                });
            btns.append(ok);
            btns.append(cancel);
        popup.append(btns);

        $.magnificPopup.open({
            items: {
                src: popup,
                type: 'inline'
            },
            modal: true
        });
    };

    window.mp.err = function(err) {
        console.error(err);
        var popup = $('<div></div>');
        popup.addClass('white-popup');
        popup.append('<p>Something went wrong. More about error:</p>');
        popup.append('<pre class="error">'+err.statusText+'</p>');
        popup.append('<p>Please, contact Administrator!</p>');
        $.magnificPopup.open({
            items: {
                src: popup,
                type: 'inline'
            }
        });
    };


});
