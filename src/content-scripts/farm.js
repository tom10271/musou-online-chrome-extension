import $ from './jquery-3.4.1.min';
import { isIn } from "./common";

export function farmAction() {
    const cookItems = {
        greenTea: '緑茶',
        soup: '白玉清湯'
    };

    let cookItem = '';

    chrome.storage.local.get('cookItem', function (result) {
        cookItem = 'cookItem' in result ? result.cookItem : cookItems.greenTea;

        if (isIn(/garden_teatable/)) {
            if (isIn(/garden_teatable_select_recipe/)) {
                if ($('#result').length) {
                    var nOutOfN = $('#extension span:last-child').text().split('/');

                    if (nOutOfN[0] === nOutOfN[1]) {
                        if (cookItem === cookItems.soup) {
                            $('#popup input.btn').click();
                        } else {
                            window.location.href = 'http://msp.musou-online.jp/m/garden_top';
                        }
                    } else {
                        const $eatPopup = $('#popup_eat input.btn');

                        if ($eatPopup.length > 0) {
                            $eatPopup.click();
                        } else {
                            $('#popup input.btn').click();
                        }
                    }
                } else {
                    // Find Green tea and select it
                    $(`span.list_name:contains(${cookItem})`).closest("[id^=radioitem]").click();

                    setTimeout(() => {
                        $('#recipe_select_btn').click();
                    }, 500);
                }
            }

            if (isIn(/garden_teatable_blend_confirm/)) {
                $('a[onclick]').click();

                setTimeout(() => {
                    $('input.btn').click();
                }, 500);
            }

            if (isIn(/garden_teatable_result/)) {
                if ($('#content div:contains(料理を破棄しました)').length) {
                    if (cookItem === cookItems.soup) {
                        chrome.storage.local.set(
                            { 'cookItem': cookItems.greenTea},
                            function (data) {
                                window.location.href = 'http://msp.musou-online.jp/m/garden_top';
                            }
                        );
                    }

                    window.location.href = 'http://msp.musou-online.jp/m/garden_top';
                } else {
                    window.location.href = 'http://msp.musou-online.jp/m/garden_teatable_select_recipe?recipelisttype=2';
                }
            }

            if (isIn(/garden_teatable_food_effect/)) {

            }
        }

        if (isIn(/garden_top/)) {
            const isAnyPlantStillPlanting = $("span.status:contains(栽培中)");

            if (isAnyPlantStillPlanting) {
                if ($('.infoleft .infonumber:first').text().match(/^0\//)) {
                    chrome.storage.local.set(
                        { 'cookItem': cookItems.soup},
                        function (data) {
                            window.location.href = 'http://msp.musou-online.jp/m/garden_teatable_select_recipe?recipelisttype=2';
                        }
                    );
                }
            }

            // Remove those cannot fill water
            $('#plant_list >[id^=plant_].disabled')
                .map(function (i, each) {
                    return each['id'].replace('plant_', '');
                })
                .get()
                .forEach((each) => {
                    $('#plant_list #plant_' + each).remove();
                    $('#plant_list #plant_info_' + each).remove();
                });

            $('#plant_list >[id^=plant_]:first').click();

            const intervalId = setInterval(() => {
                const $form = $('#plant_list >[id^=plant_info_] form[action="/m/garden_plant_water"]');

                if ($form.length) {
                    $form.find('input.btn').click();

                    clearInterval(intervalId);
                }
            });

            if (isAnyPlantStillPlanting && $('#plant_list >[id^=plant_]').length === 0) {
                setTimeout(() => {
                    location.reload();
                }, 30000);
            } else {
                // alert('All planted');
            }
        }

        if (isIn(/garden_plant_water/)) {
            const stillHaveGreenTea = $('.explanation').text().match(/緑茶/);

            if (stillHaveGreenTea && stillHaveGreenTea[0] === '緑茶') {
                window.location.href = 'http://msp.musou-online.jp/m/garden_top';
            } else {
                // If action point went low, change to make soup
                window.location.href = 'http://msp.musou-online.jp/m/garden_teatable_select_recipe?recipelisttype=2';
            }
        }
    });
}