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

jQuery(document)
    .ready(function ($) {

        /*** CREDITS
        The scroll code is based on https://github.com/getgrav/grav-theme-antimatter/blob/develop/js/antimatter.js from Rocket Team's Antimatter theme
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

        //search button
        jQuery(document)
            .ready(function ($) {
                var input = $('[data-search-input]');
                var minChars = 3;

                input.on('keypress', function (event) {
                    if(event.which == 13) {
                        event.preventDefault();

                        var val = $(this)
                            .val();
                        if(val
                            .length >= minChars) {
                            window.location.href = input.data(
                                    'search-input') + ':' +
                                val;
                        } else {
                            input.attr('placeholder',
                                'Minimum ' + minChars +
                                ' characters.');
                        }
                    }
                });
            });
        $('.form-control-expand')
            .on('click', function () {
                var nb = $('.navbar .search-form .form-group');
                var me = $(this);
                var navs = $('.main-navbar .nav li:not(".search")');

                navs.animate({
                    opacity: 0,
                    visibility: 'hidden'
                }, 200);
                nb.toggleClass('hover');
                me.fadeOut();
                me
                    .prev()
                    .one('blur', function () {
                        navs.animate({
                            opacity: 1,
                            visibility: 'visible'
                        }, 200);
                        nb.toggleClass('hover');
                        me.fadeIn();
                    })
                    .focus();
            });

        //carousel Swipe
        $('.carousel')
            .bcSwipe({
                threshold: 50
            });
    });

/**
 * Bootstrap Carousel Swipe v1.1
 *
 * jQuery plugin to enable swipe gestures on Bootstrap 3 carousels.
 * Examples and documentation: https://github.com/maaaaark/bcSwipe
 *
 * Licensed under the MIT license.
 */
(function ($) {
    $.fn.bcSwipe = function (settings) {
        var config = {
            threshold: 50
        };
        if(settings) {
            $.extend(config, settings);
        }

        this.each(function () {
            var stillMoving = false;
            var start;

            if('ontouchstart' in document.documentElement) {
                this.addEventListener('touchstart',
                    onTouchStart, false);
            }

            function onTouchStart(e) {
                if(e.touches.length == 1) {
                    start = e.touches[0].pageX;
                    stillMoving = true;
                    this.addEventListener('touchmove',
                        onTouchMove, false);
                }
            }

            function onTouchMove(e) {
                if(stillMoving) {
                    var x = e.touches[0].pageX;
                    var difference = start - x;
                    if(Math.abs(difference) >= config.threshold) {
                        cancelTouch();
                        if(difference > 0) {
                            $(this)
                                .carousel('next');
                        } else {
                            $(this)
                                .carousel('prev');
                        }
                    }
                }
            }

            function cancelTouch() {
                this.removeEventListener('touchmove',
                    onTouchMove);
                start = null;
                stillMoving = false;
            }
        });

        return this;
    };
})(jQuery);
