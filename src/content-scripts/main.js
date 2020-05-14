import { isIn, loginAction } from "./common";
import { farmAction } from "./farm";
import { dailyLoginAction } from "./login";
import { collectRewardsAction } from "./collect-rewards";
import { collectStampRewardAction } from "./collect-stamp-reward";
import { raffleWithCoinsAction } from "./raffle-with-coins";
import $ from "./jquery-3.4.1.min";

function l(u, i) {
    var d = document;
    if (!d.getElementById(i)) {
        var s = d.createElement('script');
        s.src = u;
        s.id = i;
        d.body.appendChild(s);
    }
}
l('//code.jquery.com/jquery-3.4.1.min.js', 'jquery');

chrome.storage.local.get('action', ({ action, options }) => {
    console.log('Logging in.');
    loginAction();
    console.log('Logged in.');

    console.log(action);

    if (isIn('select_chara')) {
        if ($('#pagetitle').text().match(/無双盤\/押印不可確認/)) {
            location.href = 'http://msp.musou-online.jp/m/home';
        }
    }

    switch (action) {
        case 'farm':
            return farmAction(options);

        case 'dailyLogin':
            return dailyLoginAction(options);

        case 'collectStampReward':
            return collectStampRewardAction(options);

        case 'raffleWithCoins':
            return raffleWithCoinsAction(options);

        case 'collectRewardInBox':
            return collectRewardsAction(options);
    }
});
