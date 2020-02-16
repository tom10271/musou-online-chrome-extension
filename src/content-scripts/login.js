import $ from './jquery-3.4.1.min';
import { isIn } from "./common";

function nextAccount() {
    chrome.runtime.sendMessage({ status: "LOGIN_FINISHED" }, function ({ action }) {
        if (action === 'CONTINUE') {
            location.href = 'https://www.gamecity.ne.jp/waap/login/msol_sp';
        } else {
            alert('所有帳號經已登入完成。');
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
        if ($('.okbtn').length) {
            $('.okbtn').click();
        } else {
            if ($('.text-highlight').length) {
                location.href = 'http://msp.musou-online.jp/m/musou_stamp_top';
            } else {
                nextAccount();
            }
        }
    }

    if (isIn('garden_reset')) {
        location.href = 'http://msp.musou-online.jp/m/musou_stamp_top';
    }

    if (isIn('musou_stamp_top')) {
        if ($('.text-highlight').length) {
            location.href = 'http://msp.musou-online.jp/m/musou_stamp_get_reward_confirm';
        } else {
            nextAccount();
        }
    }

    if (isIn('musou_stamp_get_reward_confirm')) {
        $('#popup_inner input#confirm').click();
    }

    if (isIn('musou_stamp_claim_reward')) {
        if ($('.explanation:contains(\'を授与されました\')').length) {
            location.href = 'http://msp.musou-online.jp/m/home';
        }
    }

    if (isIn('home')) {
        location.href = 'http://msp.musou-online.jp/m/musou_stamp_top';
    }
}
