import $ from "jquery";
import html2canvas from 'html2canvas';
import JSZip from "jszip";
import { saveAs } from "file-saver";

export async function screenCapWeaponsAction(options) {
    const zip = new JSZip();

    const weapons = $('[id^=radioitem]');
    for (let i = 0; i < weapons.length; i++) {
        let { weaponName, base64PngString } = await handleWeapon(i);
        zip.file(i + ' - ' + weaponName + '.png', base64PngString, { base64: true });
    }

    zip.generateAsync({ type: "blob" })
        .then(function (content) {
            saveAs(content, "武器截圖.zip");
        });
}

const handleWeapon = async function (i) {
    return new Promise(function (resolve, reject) {
        const weaponListItem = $('#radioitem' + i);

        weaponListItem.click();

        setTimeout(() => {
            const weaponName = $('#down_weaponname').text().replace('武器種：', '') + ' - ' + weaponListItem.find('.list_name').text();

            const weaponInfo = $('#detail_view_' + i + ' #detail_view_pageWrap .page:first-child');

            weaponInfo.find('.pagebtn:first-child').html(
                '<span>' + weaponName + '</span><br><span>強化等級: ' +
                $('.page2enhance div:first-child div:nth-child(2)').text() + '</span>'
            );

            weaponInfo.css('background', 'black');

            $('html, body').animate({ scrollTop: weaponListItem.offset().top }, 500);

            setTimeout(() => {
                html2canvas(weaponInfo[0], {
                    scrollY: weaponListItem.offset().top * -1,
                    scrollX: -8
                }).then((canvas) => {
                    document.body.appendChild(canvas);

                    resolve({ weaponName, base64PngString: canvas.toDataURL().split('base64,')[1] });
                });
            }, 1500);
        }, 3000);
    });
};

window.a = handleWeapon;