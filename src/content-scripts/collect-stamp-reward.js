import { actionFinished, isIn } from "./common";
import $ from "./jquery-3.4.1.min";

export function collectStampRewardAction() {
    if (isIn('home')) {
        location.href = 'http://msp.musou-online.jp/m/musou_stamp_top';
    }

    if (isIn('select_chara')) {
        if (!($('.okbtn').length)) {
            location.href = 'http://msp.musou-online.jp/m/musou_stamp_top';
        } else {
            $('.okbtn').click();
        }
    }

    if (isIn('musou_stamp_top')) {
        if ($('.text-highlight').length) {
            location.href = 'http://msp.musou-online.jp/m/musou_stamp_get_reward_confirm';
        } else {
            actionFinished();
        }
    }

    if (isIn('musou_stamp_get_reward_confirm')) {
        if ($('a[href*=musou_stamp_item_full]').length) {
            location.href = 'http://msp.musou-online.jp/m/trader_item';
        } else {
            $('#popup_inner input#confirm').click();
        }
    }

    if (isIn('musou_stamp_claim_reward')) {
        if ($('.explanation:contains(\'を授与されました\')').length) {
            location.href = 'http://msp.musou-online.jp/m/home';
        }
    }
}