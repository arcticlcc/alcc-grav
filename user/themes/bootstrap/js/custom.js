/**
 * This file is part of the Gravstrap plugin and it is distributed
 * under the MIT License. To use this application you must leave
 * intact this copyright notice.
 *
 * Copyright (c) Giansimon Diblas <info@diblas.net>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * For extra documentation and help please visit http://diblas.net
 *
 * @license    MIT License
 *
 */

/*** CREDITS
This code is based on https://github.com/getgrav/grav-theme-antimatter/blob/develop/js/antimatter.js from Rocket Team's Antimatter theme
 ***/

// The selector to apply the effect
var selector = ".navbar";
// The value, when reached, activates the effect
var scrolledAt = 100;

var isTouch = window.DocumentTouch && document instanceof DocumentTouch;

function scrollHeader() {
    // Has scrolled class on header
    var zvalue = $(document)
        .scrollTop();
    if(zvalue > scrolledAt) {
        $(selector)
            .addClass("scrolled");
    } else {
        $(selector)
            .removeClass("scrolled");
    }
}

jQuery(document)
    .ready(function ($) {

        // ON SCROLL EVENTS
        if(!isTouch) {
            $(document)
                .scroll(function () {
                    scrollHeader();
                });
        }

        // TOUCH SCROLL
        $(document)
            .on({
                'touchmove': function (e) {
                    scrollHeader(); // Replace this with your code.
                }
            });

        $('.form-control-expand')
            .on('click', function () {
                var nb = $('.navbar .search-form .form-group');
                var me = $(this);
                var navs = $('.main-navbar .nav li:not(".search")');

                navs.animate({opacity:0, visibility:'hidden'}, 200);
                nb.toggleClass('hover');
                me.fadeOut();
                me
                    .prev()
                    .one('blur', function () {
                        navs.animate({opacity:1, visibility:'visible'}, 200);
                        nb.toggleClass('hover');
                        me.fadeIn();
                    })
                    .focus();
            });
    });
