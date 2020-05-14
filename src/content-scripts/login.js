import $ from './jquery-3.4.1.min';
import { isIn, actionFinished } from "./common";

export function dailyLoginAction() {
    if (isIn('select_chara')) {
        if (!($('.okbtn').length)) {
            actionFinished();
        } else {
            $('.okbtn').click();
        }
    }

    if (isIn('home')) {
        actionFinished();
    }
}
