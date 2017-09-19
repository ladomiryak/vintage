import $ from 'jquery';
import 'fullpage.js/dist/jquery.fullPage.js';
import Splitter from 'split-html-to-chars';
import {TimelineMax} from 'gsap';


$('#fullpage').fullpage({
    scrollingSpeed: 1000,
    onLeave: function (index, nextIndex, direction) {
        let current = index;
        let tl = new TimelineMax();
        let top = $('section').eq(index).find('h2 span');
        let bottom = $('section').eq(index).find('.section-bottom');
        let progress = $('.circle');

        tl
            .staggerFromTo(top, .6, {x: 250, opacity: 0}, {x: 0, opacity: 1, ease: Back.easeOut.config(2)}, .3)
            .fromTo(bottom, .45, {y: 100, opacity: 0}, {y: 0, opacity: 1, ease: Back.easeOut.config(2)}, 1);

        if (direction === 'down') {
            progress.addClass('step-' + current);
        } else {
            current--;
            progress.removeClass('step-' + current);
        }

        if (direction === 'down' && current === 2) {
            $.fn.fullpage.setAllowScrolling(false, 'down');
        } else {
            $.fn.fullpage.setAllowScrolling(true, 'down');
        }

    }
});

// show looser text
$('.btn-looser').click(function () {
    $(this).hide().siblings().hide();
    $('.section-title').hide();
    $('.choose').hide();
    $('.looser-text').show();
    $('.circle').addClass('looser');
    tl
        .staggerTo('svg path', 0.2, {opacity: 1}, 0.2)
        .staggerFromTo('.looser .letter', 0.3, {x: 40, visibility: 'hidden'}, {x: 0, visibility: 'visible', ease: Back.easeOut.config(2)}, 0.05)
        .fromTo('.not-looser', .45, {y: 100, opacity: 0,display: 'none'}, {y: 0, opacity: 1,display: 'block', ease: Back.easeOut.config(2)});
    $.fn.fullpage.setAllowScrolling(false);
});

// miss looser text
$('.next-slide').click(function () {
    $.fn.fullpage.moveSectionDown();
});

// back to game
$('.not-looser').click(function () {
    $('.circle').removeClass('looser');
    tl
        .staggerTo('svg path', 0.3, {opacity: .2}, 0.1)
        .staggerTo('.looser .letter', 0.3, {visibility: 'hidden'})
        .staggerTo('.choose', 0.3, {display: 'block'}, 0.1);
    setTimeout(function () {
        $.fn.fullpage.moveSectionDown();
    }, 500);
    $('.section-title').show();
    tl.staggerFromTo('.section.active .section-title span', .6, {x: 250, opacity: 0}, {x: 0, opacity: 1, ease: Back.easeOut.config(2)}, .3);
    $(this).hide().siblings().show();
    $.fn.fullpage.setAllowScrolling(true);
});

// split html to chars
let els = document.querySelectorAll(".js-splitme");
[].forEach.call(els, function (el) {
    el.outerHTML = Splitter(el.outerHTML, '<span class="letter">$</span>');
});

// start animation
let tl = new TimelineMax();
tl
    .set('.circle-grey, .circle-black', {transformOrigin: '50% 50%', rotation: -90})
    .fromTo('.circle-grey', 1.2, {strokeDashoffset: 2290}, {strokeDashoffset: 0, ease: Power0.easeNone}, 0)
    .staggerFromTo('.section-title.intro span', .6, {x: 250, opacity: 0}, {x: 0, opacity: 1, ease: Back.easeOut.config(2)}, .2)
    .fromTo('.section-bottom.intro', .45, {y: 100, opacity: 0}, {y: 0, opacity: 1, ease: Back.easeOut.config(2)}, 1.8);
