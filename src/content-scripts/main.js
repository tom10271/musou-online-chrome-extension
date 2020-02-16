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

import { farmAction } from "./farm";
import { loginAction } from "./login";

chrome.storage.sync.get('action', ({ action }) => {
    switch (action) {
        case 'farm':
            return farmAction();

        case 'login':
            return loginAction();
    }
});
