const site_body       = document.body,
	site              = document.querySelector( '.site' ),
	site_overlay      = document.querySelector( '.ele-site-overlay' ),
	site_header       = document.querySelector( '.site-header' ),
	site_top_header   = document.querySelector( '.site-top-bar' ),
	navigation        = document.querySelector( '.main-navigation' ),
	trigger           = document.querySelectorAll( '.ele-trigger-menu' ),
	hamburger         = document.querySelectorAll( '.ele-hamburger-menu' ),
	after_header      = document.querySelector( '.ele-after-header' );

let   window_width      = window.innerWidth;
// header_menu_css     = '';

/**
 * on Resize Window
 *
 * @since 1.0.0
 */
window.addEventListener( 'resize', function( e ) {
	window_width      = window.innerWidth;

	// vertical_header_margin();
	// push_header_menu();
} );

/**
 * Sticky Header
 *
 * @since 1.0.0
 */
if ( site_header.classList.contains( 'has-sticky' ) ) {

    let sticky_offset = document.querySelector( '[data-sticky="on"]' ).offsetTop;

    window.onscroll = function() {
        let sticky = document.querySelector( '.site-header.has-sticky' ),
            scroll = window.pageYOffset;

        if ( scroll >= sticky_offset ) {
            sticky.classList.add( 'is-stuck' );
        } else {
            sticky.classList.remove( 'is-stuck' );
        }

        if ( scroll >= sticky_offset + 100 ) {
            sticky.classList.add( 'is-scrolled' );
        } else {
            sticky.classList.remove( 'is-scrolled' );
        }

        // if ( site_header.contains( site_top_header ) ) {
        //     let top_bar = document.querySelector( '.site-header.has-sticky .site-top-bar'),
        //         top_bar_height = top_bar.offsetHeight,
        //         nav_bar = document.querySelector( '.site-header.has-sticky .nav-bar' );
        //
        //     if ( scroll >= sticky_offset ) {
        //         top_bar.style.marginTop = -top_bar_height + 'px';
        //         nav_bar.classList.add('is-stuck');
        //
        //     } else {
        //         top_bar.style.marginTop = '0';
        //         nav_bar.classList.remove('is-stuck');
        //     }
        // }
    };
}

/**
 * Auto Hide Header
 *
 * @since 1.0.0
 * @link https://webdesign.tutsplus.com/tutorials/how-to-hide-reveal-a-sticky-header-on-scroll-with-javascript--cms-33756
 */
// if ( site_header.classList.contains( 'is-horizontal' ) && site_header.classList.contains( 'is-auto-hide' ) ) {
//
//     const auto_hide     = document.querySelector( '.site-header.is-auto-hide' );
//     const scrollUp      = 'scroll-up';
//     const scrollDown    = 'scroll-down';
//     let lastScroll      = 0,
//         header_height   = auto_hide.offsetHeight;
//
//     window.addEventListener( 'scroll', () => {
//         const currentScroll = window.pageYOffset;
//
//         if ( currentScroll === 0 ) {
//             auto_hide.classList.remove( scrollUp );
//             return;
//         }
//
//         if ( currentScroll > lastScroll && !auto_hide.classList.contains( scrollDown ) ) {
//
//             let top = -header_height + 'px';
//
//             // if ( site_header.classList.contains( 'have-toolbar' ) && window_width < 782 ) {
//             //     top = -header_height - 46 + 'px';
//             // } else if ( site_header.classList.contains( 'have-toolbar' ) && window_width > 782 ) {
//             //     top = -header_height - 32 +'px';
//             // }
//
//             if ( site.classList.contains( 'have-toolbar' ) ) {
//                 if ( window_width < 782 ) {
//                     top = -header_height - 46 + 'px';
//                 } else {
//                     top = -header_height - 32 +'px';
//                 }
//             }
//
//             // down
//             auto_hide.classList.remove( scrollUp );
//             auto_hide.classList.add( scrollDown );
//             auto_hide.style.top = top;
//         } else if ( currentScroll < lastScroll && auto_hide.classList.contains( scrollDown ) ) {
//
//             // up
//             auto_hide.classList.remove( scrollDown );
//             auto_hide.classList.add( scrollUp );
//             auto_hide.style.top = 0;
//         }
//
//         lastScroll = currentScroll;
//     });
// }

/**
 * Vertical Compact Header
 *
 * @since 1.0.0
 */
// function vertical_header_margin() {
//     if (site_header.classList.contains('is-compact')) {
//
//         let header_width = site_header.offsetWidth,
//             vertical_header = document.querySelector('.have-vertical-header'),
//             menu_breakpoint = navigation.getAttribute('data-breakpoint');
//
//         if ( vertical_header.classList.contains( 'is-on-left' ) ) {
//             if ( ( menu_breakpoint === 'tablet' && window_width > 1023) || ( menu_breakpoint === 'mobile' && window_width > 767 ) ) {
//                 navigation.style.marginLeft = header_width + 'px';
//             } else {
//                 navigation.style.removeProperty('margin-left');
//             }
//         }
//     }
// }
// vertical_header_margin();

/**
 * Trigger Menu
 *
 * @since 1.0.0
 */
for( let i=0; i< trigger.length; i++ ) {

	trigger[i].addEventListener( 'click', function () {

		site_overlay.classList.toggle( 'is-active' );
		// site_header.classList.toggle( 'is-active' );
		navigation.classList.toggle( 'is-active' );

		for( let i=0; i< hamburger.length; i++ ) {
			hamburger[i].classList.toggle( 'cross' );
		}
	} )
}

/**
 * Push Mobile Menu Container
 *
 * @since 1.0.0
 */
// function push_header_menu() {
//     let menu_breakpoint     = navigation.getAttribute( 'data-breakpoint' ),
//         header_height       = site_header.offsetHeight;
//
//     if ( ( menu_breakpoint === 'tablet' && window_width < 1024 ) || ( menu_breakpoint === 'mobile' && window_width < 768 ) ) {
//
//         // let margin_top = header_height + 'px';
//
//         // if ( site_header.classList.contains( 'have-toolbar' ) && window_width < 782 ) {
//         //     margin_top = header_height + 46 + 'px';
//         // } else if ( site_header.classList.contains( 'have-toolbar' ) && window_width > 782 ) {
//         //     margin_top = header_height + 32 +'px';
//         // }
//
//
//         // if ( site.classList.contains( 'have-toolbar' ) ) {
//         //     if ( window_width < 782 ) {
//         //         margin_top = header_height + 46 + 'px';
//         //     } else {
//         //         margin_top = header_height + 32 +'px';
//         //     }
//         // }
//
//         // navigation.style.marginTop = margin_top;
//         // navigation.style.maxHeight = 'calc( 100vh - ' + margin_top + ' )';
//         // site_overlay.style.top = margin_top;
//
//         // header_menu_css = '.main-navigation{margin-top:' + margin_top + '; max-height:calc(100vh - ' + margin_top + ')}.ele-site-overlay{top:' + margin_top + '}';
//
//     } else {
//         // navigation.style.removeProperty( 'margin-top' );
//         site_overlay.classList.remove( 'is-active' );
//         navigation.classList.remove( 'is-active' );
//         // site_overlay.style.removeProperty( 'top' );
//
//         for( let i=0; i< hamburger.length; i++ ) {
//             hamburger[i].classList.remove( 'cross' );
//         }
//     }
// }
// push_header_menu();

/**
 * Remove class on clicked outside of the div
 *
 * @since 1.0.0
 */
document.addEventListener ('click', function( e ) {
	if ( !site_header.contains( e.target ) ) {
		site_overlay.classList.remove( 'is-active' );
		navigation.classList.remove( 'is-active' );

		for( let i=0; i< hamburger.length; i++ ) {
			hamburger[i].classList.remove( 'cross' );
		}
	}
} );

/**
 * Remove class on Esc keypress
 *
 * @since 1.0.0
 */
document.addEventListener('keyup', function ( e ) {
	if ( e.defaultPrevented ) {
		return;
	}

	// If Escape is pressed
	if ( e.key === 'Escape' ) {

		site_overlay.classList.remove( 'is-active' );
		navigation.classList.remove( 'is-active' );

		for( let i=0; i< hamburger.length; i++ ) {
			hamburger[i].classList.remove( 'cross' );
		}
	}
});

/**
 * Push Content
 *
 * @since 1.0.0
 */

// if ( typeof( push_content ) != 'undefined' && push_content != null ) {
//
//     let header_height = site_header.offsetHeight;
//
//     push_content.style.height = header_height + 'px';
// }

// if ( after_header.classList.contains( 'ele-push-content' ) ) {
//     let header_height = site_header.offsetHeight;
//
//     after_header.style.height = header_height + 'px';
// }








/**
 * Internal Style Sheet
 *
 * @since 1.0.0
 * @link https://stackoverflow.com/questions/524696/how-to-create-a-style-tag-with-javascript
 */
// let css = header_menu_css,
//     head = document.head || document.getElementsByTagName( 'head' )[0],
//     style = document.createElement( 'style' );
//
// head.appendChild( style );
//
// style.type = 'text/css';
// // if (style.styleSheet){
// //     // This is required for IE8 and below.
// //     style.styleSheet.cssText = css;
// // } else {
// style.appendChild( document.createTextNode( css ) );
// // }





// /**
//  * magicScroll
//  *
//  * @since 1.0.0
//  * @link https://github.com/mudin/magic-scroll
//  */
// if ( site_body.hasAttribute( "data-scrollspeed" ) ) {
//
//     let magicScroll = new MagicScroll({
//         // speed: site_body.getAttribute('data-scrollspeed'),
//         // smooth: site_body.getAttribute('data-scrollsmouth')
//
//         speed: 160,
//         smooth: 24
//     });
// }

/**
 * Reposition Offscreen Dropdown Menus
 *
 * @since 1.0.0
 *
 * @link https://stackoverflow.com/questions/11512032/detect-if-dropdown-navigation-would-go-off-screen-and-reposition-it
 */
// ( function( $ ) {
//     $( '.ele-main-menu li' ).on( 'mouseenter mouseleave', function(e) {
//         if ( $( 'ul', this).length ) {
//             let elm = $( 'ul:first', this ),
//                 off = elm.offset(),
//                 l = off.left,
//                 w = elm.width(),
//                 docW = $( 'body' ).width(),
//                 isEntirelyVisible = ( l + w <= docW );
//
//             if ( !isEntirelyVisible ) {
//                 $(this).addClass( 'align-left' );
//             } else {
//                 $(this).removeClass( 'align-left' );
//             }
//         }
//     });
// })( jQuery );


// load more post
// ( function( $ ) {
// 	// Pagination ( Posts Load with Onclick or On-scroll )
// 	const paginationType = ElementifyAttr.pagination_type;
//
// 	if( paginationType['lg'] === 'load-more' ){
// 		$(document).on('click', '.ele-pagination-load-more .pagination .ele-load-more', function(){
// 			var button = $( this );
// 			var more_post   = ElementifyAttr.more_posts,
// 				no_more     = ElementifyAttr.no_more_posts,
// 				data        = {
// 					action      : 'elementify_pagination_ajax_load_posts',
// 					page        : ElementifyAttr.current_page,
// 					query       : ElementifyAttr.query,
// 					nonce       : ElementifyAttr.elementify_post_load_nonce,
// 					//cache     : false,
// 					beforeSend : function ( xhttp ) {
// 						if ( ElementifyAttr.current_page < ElementifyAttr.max_page ) {
// 							button.text('Loading...'); // change the button text, you can also add a preloader image
// 						}
// 					},
// 				};
//
// 			$.post(ElementifyAttr.ajax_url, data, function(data) {
//
// 				if ( data ) {
// 					// Make jQuery object from HTML string
// 					var $moreBlocks     = $( data );
// 					// Append new blocks to container
// 					$('.site-main.ele-posts-wrap').find('article:last-of-type').after( $moreBlocks );
//
// 					button.text( more_post ); // insert new posts
// 					ElementifyAttr.current_page++;
//
// 				} else {
// 					button.text( no_more ); // if last page, change button text
// 					button.addClass( 'no-more-post' ); // if last page, add new class
// 				}
//
// 			});
// 		});
// 	}
//
// 	if( paginationType['lg'] === 'infinite' ) { // On-scroll mouse to Load Posts
// 		var canBeLoaded     = true, // this param allows to initiate the AJAX call only if necessary
// 			bottomOffset    = 1300; // the distance (in px) from the page bottom when you want to load more posts
//
// 		$(window).scroll(function(){
// 			var button      = $('.ele-pagination-infinite .pagination .ele-load-more'),
// 				no_more     = ElementifyAttr.no_more_posts,
// 				data        = {
// 					action      : 'elementify_pagination_ajax_load_posts',
// 					page        : ElementifyAttr.current_page,
// 					page_type   : ElementifyAttr.page_type,
// 					query       : ElementifyAttr.query,
// 					nonce       : ElementifyAttr.elementify_post_load_nonce,
// 					cache       : false,
// 					beforeSend : function ( xhttp ) {
// 						canBeLoaded = false;
// 					}
// 				};
//
// 			if ( $(document).scrollTop() > ( $(document).height() - bottomOffset ) && canBeLoaded == true ){
// 				$.post(ElementifyAttr.ajax_url, data, function(data) {
//
// 					if( data ) {
// 						// Make jQuery object from HTML string
// 						var $moreBlocks     = $( data );
//
// 						// Append new blocks to container
// 						$('.site-main.ele-posts-wrap').find('article:last-of-type').after( $moreBlocks );
//
// 						canBeLoaded = true;
// 						ElementifyAttr.current_page++;
//
// 					} else {
// 						canBeLoaded = false;
// 						button.text( no_more ); // if last page, change button text
// 						button.addClass( 'no-more-post' ); // if last page, add new class
// 					}
// 				});
// 			}
// 		});
// 	}
// })( jQuery );


// // Post Pagination
// let ajaxURL 			= ElementifyAttr.ajax_url,
// 	ajaxAction 			= 'elementify_pagination_ajax_load_posts',
// 	ajaxCurrentPage		= ElementifyAttr.current_page,
// 	ajaxMaxPage 		= ElementifyAttr.max_page,
// 	ajaxQuery			= ElementifyAttr.query,
// 	ajaxBtnText 		= ElementifyAttr.more_posts,
// 	ajaxNoPost			= ElementifyAttr.no_more_posts,
// 	ajaxNonce			= ElementifyAttr.elementify_post_load_nonce,
// 	ajaxBtnType			= ElementifyAttr.pagination_type,
// 	ajaxLoadBtn 		= document.querySelector('.ele-pagination-'+ajaxBtnType.lg+' .pagination .ele-load-more'),
// 	ajaxPostContainer 	= document.querySelector('.site-main.ele-posts-wrap'),
// 	canBeLoaded			= true; // this param allows to initiate the AJAX call only if necessary for infinitive scroll

// // send before ajax value called
// const beforeSend = function(){
// 	if ( ajaxCurrentPage < ajaxMaxPage ) {
// 		canBeLoaded = false;
// 		ajaxLoadBtn.innerHTML = 'Loading...'; // change the button text, you can also add a preloader image
// 	}
// }

// // Onclick load more posts
// if ( ajaxBtnType.lg === 'load-more' ) {

// 	ajaxLoadBtn.addEventListener('click', function(event) {

// 		beforeSend();

// 		// Set up our HTTP request
// 		let xhttp = new XMLHttpRequest();

// 		xhttp.open("POST", ajaxURL, true);

// 		xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

// 		// Setup our listener to process completed requests
// 		xhttp.onreadystatechange  = function () {

// 			// Process our return data
// 			if (xhttp.readyState === 4 && xhttp.status === 200) {

// 				if ( xhttp.responseText !== '' ) {

// 					ajaxPostContainer.innerHTML += xhttp.responseText;
// 					ajaxLoadBtn.innerHTML = ajaxBtnText; // insert new posts
// 					ajaxCurrentPage++;
// 				}
// 				else {

// 					ajaxLoadBtn.innerHTML = ajaxNoPost; // if last page, change button text
// 					ajaxLoadBtn.classList.add('no-more-post'); // if last page, add new class
// 				}
// 			}
// 		};

// 		xhttp.send('action='+ajaxAction+'&page='+ajaxCurrentPage+'&query='+ajaxQuery+'&nonce='+ajaxNonce );

// 		event.preventDefault()
// 	});
// }

// // Onscroll load more posts
// if ( ajaxBtnType.lg === 'infinite' ) {

// 	window.addEventListener(
// 		'scroll',
// 		(event) => {
// 			let	scrollHeight 	= document.documentElement.scrollHeight,
// 				scrollTop 		= document.documentElement.scrollTop,
// 				clientHeight 	= document.documentElement.clientHeight,
// 				bottomOffset 	= 5; //the distance (in px) from the page bottom when you want to load more posts

// 			if( (scrollTop + clientHeight) > (scrollHeight - bottomOffset) && canBeLoaded === true ){

// 				beforeSend();

// 				// Set up our HTTP request
// 				let xhttp = new XMLHttpRequest();

// 				xhttp.open("POST", ajaxURL, true);

// 				xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

// 				// Setup our listener to process completed requests
// 				xhttp.onreadystatechange  = function () {

// 					// Process our return data
// 					if (xhttp.readyState === 4 && xhttp.status === 200) {

// 						if ( xhttp.responseText !== '' ) {

// 							ajaxPostContainer.innerHTML += xhttp.responseText;
// 							ajaxLoadBtn.innerHTML = ajaxBtnText; // insert new posts
// 							canBeLoaded = true;
// 							ajaxCurrentPage++;
// 						}
// 						else {

// 							canBeLoaded = false;
// 							ajaxLoadBtn.innerHTML = ajaxNoPost; // if last page, change button text
// 							ajaxLoadBtn.classList.add('no-more-post'); // if last page, add new class
// 						}
// 					}
// 				};
// 				xhttp.send('action='+ajaxAction+'&page='+ajaxCurrentPage+'&query='+ajaxQuery+'&nonce='+ajaxNonce+'&cache=false' );
// 			}
// 		},
// 		{ passive: true }
// 	);
// }
