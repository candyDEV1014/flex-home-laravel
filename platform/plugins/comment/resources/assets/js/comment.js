import CommentComponent from './components/CommentComponent';
import Vue from 'vue';
import VueToastr from "vue-toastr";
import axios from 'axios';
import VueAxios from 'vue-axios'
import VueSocialauth from 'vue-social-auth'

import { linkify } from './components/helpers';
import Ls from './service/Ls';
import Echo from "laravel-echo";
window.Pusher = require("pusher-js");
window.Echo = new Echo({
    broadcaster: "pusher",
    key: "ac01d8b0ce970cd77c68",
    cluster: "ap3",
    encrypted: true,
    auth: {
        headers: {
            Authorization: 'Bearer ' + Ls.get('auth.token')
        },
    },
});

$.fn.serializeData = function(options){var a=this,r={},i={},u=/[a-zA-Z0-9_]+|(?=\[\])/g,h=/^$/,c=/^\d+$/,s=/^[a-zA-Z0-9_]+$/;return this.build=function(t,i,e){return t[i]=e,t},this.push_counter=function(t){return void 0===i[t]&&(i[t]=0),i[t]++},$.each($(this).getFormData(options),function(){for(var t,i=this.name.match(u),e=this.value,n=this.name;void 0!==(t=i.pop());)n=n.replace(new RegExp("\\["+t+"\\]$"),""),t.match(h)?e=a.build([],a.push_counter(n),e):t.match(c)?e=a.build([],t,e):t.match(s)&&(e=a.build({},t,e));r=$.extend(!0,r,e)}),r};
$.fn.getFormData = function(options) {
    var formData = $(this).serializeArray();
    var serialized = (options && options.includeCheckbox) ? $(this).find('input:checkbox:not(:checked)')
        .filter(function() {
            return $.trim(this.name) !== '' && !(options && options.excludeUncheck && !this.checked);
        })
        .map(function() {
            return {
                name: this.name,
                value: this.checked ? this.value : (this.value === 'y' ? 'n' : '0')
            };
        }) : false;

    return formData.concat(serialized ? serialized.toArray() : []);
}

Vue.prototype.__ = key => {
    return window.trans[key] !== undefined ? window.trans[key] : key;
};

Vue.prototype.linkify = linkify;

Vue.component('comment', CommentComponent);
Vue.use(VueToastr);

Vue.use(VueAxios, axios)
Vue.use(VueSocialauth, {

    providers: {
        facebook: {
            clientId: '200210032318300',
            secret: 'ea107f81006663f7a381e4b7918031ec',
            redirectUri: '/auth/{provider}/callback' // Your client app URL
        }
    }
});

const app = new Vue({
    el: '#bb-comment',
});
