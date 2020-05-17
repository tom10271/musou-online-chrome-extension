import $ from "jquery";

export function isIn(urlMatchRegex) {
    return window.location.href.match(urlMatchRegex);
}

export function actionFinished(result = null) {
    console.log({ status: "ACTION_FINISHED" });

    chrome.runtime.sendMessage({ status: "ACTION_FINISHED", result }, function ({ action }) {
        console.log("ACTION_FINISHED", action);

        switch (action) {
            case 'NEXT_ACCOUNT':
                location.href = 'https://www.gamecity.ne.jp/waap/login/msol_sp';

                break;

            case 'ALL_ACCOUNTS_HANDLED':
                alert('所有帳號經已登入完成。');
                break;

            case 'PAUSE':
                break;

            default:
                location.href = 'http://msp.musou-online.jp/m/home';
        }
    });
}

export function loginAction() {
    if (isIn('https://www.gamecity.ne.jp/waap/login/msol_sp')) {
        if (null === document.referrer.match(/waap\/login\/msol_sp/)) {
            chrome.runtime.sendMessage({ status: "LOGIN_PAGE_READY" }, function ({ account }) {
                $('#gc_id input').val(account.loginName);
                $('#gc_pw input').val(account.password);
                $('#go_login input[type=submit]').click();
            });
        } else {
            alert('帳號或密碼錯誤');
        }
    }

    if (isIn('license')) {
        $('.agree').click();
    }

    if (isIn('select_chara')) {
        chrome.runtime.sendMessage({ status: "LOGGED_IN", payload: {'accountName': $('span.name').text()} });

        if ($('.okbtn').length) {
            $('.okbtn').click();
        }
    }
}