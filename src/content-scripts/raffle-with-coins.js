import { actionFinished, isIn } from "./common";
import $ from "./jquery-3.4.1.min";

export async function raffleWithCoinsAction(options) {
    if (isIn('home')) {
        location.href = 'http://msp.musou-online.jp/m/antique_raffle';
    }

    if (isIn('antique_raffle')) {
        if (false === await raffleFor('金貨')) {
            if (false === await raffleFor('銀貨')) {
                actionFinished();
            }
        }
    }

    if (isIn('antique_buy')) {
        $('div.explanation.jscenter:contains(福引きで以下の賞品を獲得しました)');

        location.href = 'http://msp.musou-online.jp/m/antique_raffle';
    }
}

async function raffleFor(keyword) {
    return new Promise(function (resolve, reject) {
        $('span.list_kind:contains(' + keyword + '):last').click();

        setTimeout(() => {
            console.log({ el: $('.antique_buy_raffle10_btn')});

            $('.antique_buy_raffle10_btn')[0].dispatchEvent(new MouseEvent('mouseup'));

            setTimeout(() => {
                if ($('#popup_yesno').css('display') === 'none') {
                    setTimeout(() => {
                        $('#popup_yes .btn_kakunin')[0].dispatchEvent(new MouseEvent('mouseup'));

                        setTimeout(() => {
                            $('.antique_buy_raffle1_btn')[0].dispatchEvent(new MouseEvent('mouseup'));

                            setTimeout(() => {
                                if ($('#popup_yesno').css('display') === 'none') {
                                    setTimeout(() => {
                                        $('#popup_yes .btn_kakunin')[0].dispatchEvent(new MouseEvent('mouseup'));

                                        resolve(false);
                                    }, 400);
                                } else {
                                    $('#submit_btn').click();

                                    resolve(true);
                                }
                            }, 400);
                        }, 400);
                    }, 400);
                } else {
                    $('#submit_btn').click();

                    resolve(true);
                }
            }, 500);
        }, 500);
    });
}