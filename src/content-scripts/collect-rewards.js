import $ from "jquery";
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
        $('.list_limittime:contains(\'無期限\')').closest('[id^=radioitem]').remove();

        let timeLimitedRewards = $('[id^=radioitem]');

        if (timeLimitedRewards.length === 0) {
            return actionFinished([]);
        }

        const irretrievableRewards = timeLimitedRewards.filter(function () {
            return $(this).css('color') === 'rgb(64, 64, 64)';
        });

        if (irretrievableRewards.length > 0 && irretrievableRewards.length === timeLimitedRewards.length) {
            const result = [];

            irretrievableRewards.each(function () {
                result.push({
                    itemName: $(this).find('.list_name').text(),
                    count: $(this).find('.list_num').text(),
                    expireDate: $(this).find('.list_limittime').text(),
                });
            });

            return actionFinished(result);
        } else {
            irretrievableRewards.remove();

            let timeLimitedRewards = $('[id^=radioitem]');

            if (timeLimitedRewards.length === 0) {
                return actionFinished([]);
            } else {
                const $firstReward = $(timeLimitedRewards[0]);

                $firstReward.click();

                setTimeout(() => {
                    $('#submit_btn').click();
                }, 1000);
            }
        }
    }
}