// chrome.runtime.onInstalled.addListener(() => {
//     chrome.storage.local.set({ color: '#3aa757' });
//
//     chrome.webNavigation.onCompleted.addListener(() => {
//         chrome.tabs.query({ active: true, currentWindow: true }, ([{ id }]) => {
//             chrome.pageAction.show(id);
//         });
//     }, { url: [{ urlMatches: 'google.com' }] });
// });

chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.create({url: chrome.extension.getURL("index.html")})
});
