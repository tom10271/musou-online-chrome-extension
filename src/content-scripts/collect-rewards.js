import $ from "./jquery-3.4.1.min";
import { isIn, actionFinished } from "./common";

export function collectRewardsAction() {
    if (
        (isIn('select_chara') && $('#pagetitle').text() === "無双盤/押印確認") ||
        isIn('home') ||
        isIn('guildpoint_bonus') ||
        isIn('garden_reset') ||
        isIn('receivebox_getitem')
    ) {
        location.href = 'http://msp.musou-online.jp/m/receivebox_top';
    }

    if (isIn('receivebox_top')) {
        const $firstReward = $('#radioitem0');

        // $('#trader_result_info').text() === "受け取れる品物や報酬はありませんでした"

        if ($firstReward.length === 0) {
            actionFinished();
        } else {
            $firstReward.click();

            setTimeout(() => {
                $('#submit_btn').click();
            }, 1000);
        }
    }
}