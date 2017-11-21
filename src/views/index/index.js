// js lib
import $ from 'jquery';
import 'slick-carousel';
// js
import ('../../public/js/header');
import ('../../public/js/footer');
import ('../../public/js/slick-animation');
import ('../../public/js/lettering.min')
// sass
import ('slick-carousel/slick/slick.scss');
import ('slick-carousel/slick/slick-theme.scss');
import ('./index.scss');

import ('animate.css/animate.min.css');

// html with pug template and hot reload in DevMode
if (process.env.NODE_ENV === 'development' && module.hot) {
    import ('!raw-loader!./index.pug');
}

export class banner{
    constructor(){
        this.wrap = document.querySelector('.banner');
        this.items = document.querySelector('.banner_slider ul');
        this.itemCount = document.querySelectorAll('.banner_slider ul li').length;
        this.scroller = document.querySelector('.banner_slider');
        this.pos = 0;
    }
    setTransform () {
        this.items.style['transform'] = 'translate3d(' + (-this.pos * this.items.offsetWidth) + 'px,0,0)';
    }
    next () {
        this.pos = Math.min(this.pos + 1, this.itemCount - 1);
        this.setTransform();
    }
    prev () {
        this.pos = Math.max(this.pos - 1, 0);
        this.setTransform();
    }   
}

function ripple (e){
    console.log('ripple click;')
    let posX = null;
    let posY = null;
    let buttonWidth = null;
    let buttonHeight = null;
    let pageX = null;
    let pageY = null;
    console.log(e.target);
    // Setup
    if(e.target.classList.contains('sliderCtrl')){
        posX = e.target.parentNode.parentNode.offsetLeft;
        posY = e.target.parentNode.parentNode.offsetTop;
        buttonWidth = e.target.parentNode.parentNode.offsetWidth;
        buttonHeight = e.target.parentNode.parentNode.offsetHeight;
    }else if(e.target.parentNode.classList.contains('sliderCtrl')){
        posX = e.target.parentNode.parentNode.parentNode.offsetLeft;
        posY = e.target.parentNode.parentNode.parentNode.offsetTop;
        buttonWidth = e.target.parentNode.parentNode.parentNode.offsetWidth;
        buttonHeight = e.target.parentNode.parentNode.parentNode.offsetHeight;
    }else{
        posX = e.target.offsetLeft;
        posY = e.target.offsetTop;
        buttonWidth = e.target.offsetWidth;
        buttonHeight = e.target.offsetHeight;   
    }
    pageX = e.pageX;
    pageY = e.pageY; 

    // Remove olds ones
    let oldripple = document.querySelector('.ripple') || null;
    if(oldripple) oldripple.remove();

    // Add the element as firstChild
    let ripple = document.createElement('span');
    ripple.classList.add('ripple');

    if(e.target.classList.contains('sliderCtrl')){
        e.target.parentNode.parentNode.insertBefore(ripple, e.target.parentNode.parentNode.firstChild);
    }else if(e.target.parentNode.classList.contains('sliderCtrl')){
        e.target.parentNode.parentNode.parentNode.insertBefore(ripple, e.target.parentNode.parentNode.parentNode.firstChild);
    }else{
        e.target.insertBefore(ripple, e.target.firstChild);
    }
  
    // Make it round!
    if (buttonWidth >= buttonHeight) {
      buttonHeight = buttonWidth;
    } else {
      buttonWidth = buttonHeight;
    }
  
    // Get the center of the element
    let x = pageX - posX - buttonWidth / 2;
    let y = pageY - posY - buttonHeight / 2;
  
    let cssStyle = 'width:'+buttonWidth+'px;height:'+buttonHeight+'px;top:'+y+'px'+';left:'+x+'px;';
    // console.log(cssStyle);
    // Add the ripples CSS and start the animation
    document.querySelector('.ripple').style.cssText = cssStyle;
    document.querySelector('.ripple').classList.add('rippleEffect');  
}


window.onload = function(){
    //Index init
    window.addEventListener('resize', globalObject.setTransform);

    let index_banner = new banner();
    document.querySelectorAll('.arrow')[0].addEventListener('click',function(){index_banner.prev();},false);
    document.querySelectorAll('.arrow')[1].addEventListener('click',function(){index_banner.next();},false);
    document.querySelector('.photoWorks-container').addEventListener('click',ripple,false);
    
    $('.photoWorks')
    .on('init',function(e,slick){
        $('[aria-label="Previous"]').addClass('prev sliderCtrl').removeClass('slick-prev slick-arrow');
        $('[aria-label="Next"]').addClass('next sliderCtrl').removeClass('slick-next slick-arrow');
        
        $('[aria-label="Previous"]').text('').append('<div class="slider-controlLine"></div>');
        $('[aria-label="Next"]').text('').append('<div class="slider-controlLine slider-controlLine-right"></div>');
    }).on('beforeChange', function(e, slick, currentSlide, nextSlide) {

    }).on('afterChange', function(e, slick, currentSlide, nextSlide) {
        
    }).slick({
        autoplay: true,
        autoplaySpeed: 8000,
        slideToShow:1,
        slideToScroll:1,
        infinite:true,
        speed: 1000,
        pauseOnHover:true,
        useTransform:true,
        lazyLoad: 'progressive',
        arrows: true,
        dots: true,
    }).slickAnimation();
    
    $('.photoWorks-container-bg p').lettering();

    
}

// function Animal(){  

//     // Private property
//     var alive=true;

//     // Private method
//     function fight(){ //... }   

//     // Public method which can access private variables
//     this.isAlive = function() { return alive; } 

//     // Public property
//     this.name = "Joe";
// }

// // Public method
// Animal.prototype.play = function() { alert("Bow wow!"); }


// var index_banner = new function(){
//     this.init = function(){

//     }
//     this.run = function(){

//     }
// }