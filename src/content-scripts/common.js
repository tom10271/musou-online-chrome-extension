export function isIn(urlMatchRegex) {
    return window.location.href.match(urlMatchRegex);
}