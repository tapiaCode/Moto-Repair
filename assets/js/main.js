(function ($) {
  "use strict";
  /*=================================
      JS Index Here
  ==================================*/
  /*
    01. On Load Function
    02. Preloader
    03. Mobile Menu Active
    04. Sticky fix
    05. Scroll To Top
    06. Set Background Image
    07. Hero Slider Active 
    08. Global Slider
    09. Ajax Contact Form
    10. Popup Sidemenu   
    11. Magnific Popup
    12. Section Position
    13. Filter
    14. One Page Nav
    15. WOW.js Animation
  */
  /*=================================
      JS Index End
  ==================================*/
  /*

  /*---------- 01. On Load Function ----------*/
  $(window).on("load", function () {
    $(".preloader").fadeOut();
  });

  /*---------- 02. Preloader ----------*/
  if ($(".preloader").length > 0) {
    $(".preloaderCls").each(function () {
      $(this).on("click", function (e) {
        e.preventDefault();
        $(".preloader").css("display", "none");
      });
    });
  }

  // Menu Active Class
  document.addEventListener("DOMContentLoaded", function () {
    // Get the current page's URL path (excluding the query string and hash)
    const currentPath = window.location.pathname.split("/").pop();

    // Get all menu items
    const menuItems = document.querySelectorAll("ul li a");

    // Function to add active class to parent <li> and its ancestor if needed
    function setActive(menuItem) {
      // Add active class to the parent <li> of the current <a>
      menuItem.parentElement.classList.add("active");

      // Check if this <li> is inside another <li> with the class 'menu-item-has-children'
      let parentLi = menuItem.closest("li.menu-item-has-children");
      if (parentLi) {
        parentLi.classList.add("active");
      }
    }

    // Loop through each menu item
    menuItems.forEach(function (menuItem) {
      // Get the href attribute's path (excluding the query string and hash)
      const menuItemPath = menuItem.getAttribute("href").split("/").pop();

      // Check if the menu item's href matches the current path
      if (menuItemPath === currentPath) {
        setActive(menuItem);
      }
    });
  });

  /*---------- 03. Mobile Menu Active ----------*/
  $.fn.vsmobilemenu = function (options) {
    var opt = $.extend(
      {
        menuToggleBtn: ".vs-menu-toggle",
        bodyToggleClass: "vs-body-visible",
        subMenuClass: "vs-submenu",
        subMenuParent: "vs-item-has-children",
        subMenuParentToggle: "vs-active",
        meanExpandClass: "vs-mean-expand",
        appendElement: '<span class="vs-mean-expand"></span>',
        subMenuToggleClass: "vs-open",
        toggleSpeed: 400,
      },
      options
    );

    return this.each(function () {
      var menu = $(this); // Select menu

      // Menu Show & Hide
      function menuToggle() {
        menu.toggleClass(opt.bodyToggleClass);

        // collapse submenu on menu hide or show
        var subMenu = "." + opt.subMenuClass;
        $(subMenu).each(function () {
          if ($(this).hasClass(opt.subMenuToggleClass)) {
            $(this).removeClass(opt.subMenuToggleClass);
            $(this).css("display", "none");
            $(this).parent().removeClass(opt.subMenuParentToggle);
          }
        });
      }

      // Class Set Up for every submenu
      menu.find("li").each(function () {
        var submenu = $(this).find("ul");
        submenu.addClass(opt.subMenuClass);
        submenu.css("display", "none");
        submenu.parent().addClass(opt.subMenuParent);
        submenu.prev("a").append(opt.appendElement);
        submenu.next("a").append(opt.appendElement);
      });

      // Toggle Submenu
      function toggleDropDown($element) {
        if ($($element).next("ul").length > 0) {
          $($element).parent().toggleClass(opt.subMenuParentToggle);
          $($element).next("ul").slideToggle(opt.toggleSpeed);
          $($element).next("ul").toggleClass(opt.subMenuToggleClass);
        } else if ($($element).prev("ul").length > 0) {
          $($element).parent().toggleClass(opt.subMenuParentToggle);
          $($element).prev("ul").slideToggle(opt.toggleSpeed);
          $($element).prev("ul").toggleClass(opt.subMenuToggleClass);
        }
      }

      // Submenu toggle Button
      var expandToggler = "." + opt.meanExpandClass;
      $(expandToggler).each(function () {
        $(this).on("click", function (e) {
          e.preventDefault();
          toggleDropDown($(this).parent());
        });
      });

      // Menu Show & Hide On Toggle Btn click
      $(opt.menuToggleBtn).each(function () {
        $(this).on("click", function () {
          menuToggle();
        });
      });

      // Hide Menu On out side click
      menu.on("click", function (e) {
        e.stopPropagation();
        menuToggle();
      });

      // Stop Hide full menu on menu click
      menu.find("div").on("click", function (e) {
        e.stopPropagation();
      });
    });
  };

  $(".vs-menu-wrapper").vsmobilemenu();

  /*---------- 04. Sticky fix ----------*/
  var lastScrollTop = "";
  var scrollToTopBtn = ".scrollToTop";

  function stickyMenu($targetMenu, $toggleClass, $parentClass) {
    var st = $(window).scrollTop();
    var height = $targetMenu.css("height");
    $targetMenu.parent().css("min-height", height);
    if ($(window).scrollTop() > 800) {
      $targetMenu.parent().addClass($parentClass);

      if (st > lastScrollTop) {
        $targetMenu.removeClass($toggleClass);
      } else {
        $targetMenu.addClass($toggleClass);
      }
    } else {
      $targetMenu.parent().css("min-height", "").removeClass($parentClass);
      $targetMenu.removeClass($toggleClass);
    }
    lastScrollTop = st;
  }
  $(window).on("scroll", function () {
    stickyMenu($(".sticky-active"), "active", "will-sticky");
    if ($(this).scrollTop() > 500) {
      $(scrollToTopBtn).addClass("show");
    } else {
      $(scrollToTopBtn).removeClass("show");
    }
  });

  /*---------- 05. Scroll To Top ----------*/
  $(scrollToTopBtn).each(function () {
    $(this).on("click", function (e) {
      e.preventDefault();
      console.log("scroll to top clicked");
      $("html, body").animate(
        {
          scrollTop: 0,
        },
        1000
      );
      return false;
    });
  });

  /*---------- 06.Set Background Image ----------*/
  if ($("[data-bg-src]").length > 0) {
    $("[data-bg-src]").each(function () {
      var src = $(this).attr("data-bg-src");
      $(this).css("background-image", "url(" + src + ")");
      $(this).removeAttr("data-bg-src").addClass("background-image");
    });
  }
  /*----------- 08. Global Slider ----------*/
  $(".vs-carousel").each(function () {
    var asSlide = $(this);

    // Collect Data
    function d(data) {
      return asSlide.data(data);
    }

    // Custom Arrow Button
    var prevButton =
        '<button type="button" class="slick-prev"><i class="' +
        d("prev-arrow") +
        '"></i></button>',
      nextButton =
        '<button type="button" class="slick-next"><i class="' +
        d("next-arrow") +
        '"></i></button>';

    // Function For Custom Arrow Btn
    $("[data-slick-next]").each(function () {
      $(this).on("click", function (e) {
        e.preventDefault();
        $($(this).data("slick-next")).slick("slickNext");
      });
    });

    $("[data-slick-prev]").each(function () {
      $(this).on("click", function (e) {
        e.preventDefault();
        $($(this).data("slick-prev")).slick("slickPrev");
      });
    });

    // Check for arrow wrapper
    if (d("arrows") == true) {
      if (!asSlide.closest(".arrow-wrap").length) {
        asSlide.closest(".container").parent().addClass("arrow-wrap");
      }
    }

    asSlide.slick({
      dots: d("dots") ? true : false,
      fade: d("fade") ? true : false,
      arrows: d("arrows") ? true : false,
      speed: d("speed") ? d("speed") : 1000,
      asNavFor: d("asnavfor") ? d("asnavfor") : false,
      autoplay: d("autoplay") == false ? false : false,
      infinite: d("infinite") == false ? false : true,
      slidesToShow: d("slide-show") ? d("slide-show") : 1,
      adaptiveHeight: d("adaptive-height") ? true : false,
      centerMode: d("center-mode") ? true : false,
      autoplaySpeed: d("autoplay-speed") ? d("autoplay-speed") : 8000,
      centerPadding: d("center-padding") ? d("center-padding") : "0",
      focusOnSelect: d("focuson-select") == false ? false : true,
      pauseOnFocus: d("pauseon-focus") ? true : false,
      pauseOnHover: d("pauseon-hover") ? true : false,
      variableWidth: d("variable-width") ? true : false,
      vertical: d("vertical") ? true : false,
      verticalSwiping: d("vertical") ? true : false,
      prevArrow: d("prev-arrow")
        ? prevButton
        : '<button type="button" class="slick-prev"><i class="far fa-chevron-left"></i></button>',
      nextArrow: d("next-arrow")
        ? nextButton
        : '<button type="button" class="slick-next"><i class="far fa-chevron-right"></i></button>',
      rtl: $("html").attr("dir") == "rtl" ? true : false,
      responsive: [
        {
          breakpoint: 1600,
          settings: {
            arrows: d("xl-arrows") ? true : false,
            dots: d("xl-dots") ? true : false,
            slidesToShow: d("xl-slide-show")
              ? d("xl-slide-show")
              : d("slide-show"),
            centerMode: d("xl-center-mode") ? true : false,
            centerPadding: 0,
          },
        },
        {
          breakpoint: 1400,
          settings: {
            arrows: d("ml-arrows") ? true : false,
            dots: d("ml-dots") ? true : false,
            slidesToShow: d("ml-slide-show")
              ? d("ml-slide-show")
              : d("slide-show"),
            centerMode: d("ml-center-mode") ? true : false,
            centerPadding: 0,
          },
        },
        {
          breakpoint: 1200,
          settings: {
            arrows: d("lg-arrows") ? true : false,
            dots: d("lg-dots") ? true : false,
            slidesToShow: d("lg-slide-show")
              ? d("lg-slide-show")
              : d("slide-show"),
            centerMode: d("lg-center-mode") ? d("lg-center-mode") : false,
            centerPadding: 0,
          },
        },
        {
          breakpoint: 992,
          settings: {
            arrows: d("md-arrows") ? true : false,
            dots: d("md-dots") ? true : false,
            slidesToShow: d("md-slide-show") ? d("md-slide-show") : 1,
            centerMode: d("md-center-mode") ? d("md-center-mode") : false,
            centerPadding: 0,
          },
        },
        {
          breakpoint: 767,
          settings: {
            arrows: d("sm-arrows") ? true : false,
            dots: d("sm-dots") ? true : false,
            slidesToShow: d("sm-slide-show") ? d("sm-slide-show") : 1,
            centerMode: d("sm-center-mode") ? d("sm-center-mode") : false,
            centerPadding: 0,
          },
        },
        {
          breakpoint: 576,
          settings: {
            arrows: d("xs-arrows") ? true : false,
            dots: d("xs-dots") ? true : false,
            slidesToShow: d("xs-slide-show") ? d("xs-slide-show") : 1,
            centerMode: d("xs-center-mode") ? d("xs-center-mode") : false,
            centerPadding: 0,
            vertical: d("sm-vertical") ? true : false,
          },
        },
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ],
    });
  });

  /*----------- 13. Custom Tab  ----------*/
  $.fn.vsTab = function (options) {
    var opt = $.extend(
      {
        sliderTab: false,
        tabButton: "button",
        indicator: false,
      },
      options
    );

    $(this).each(function () {
      var $menu = $(this);
      var $button = $menu.find(opt.tabButton);

      // On Click Button Class Remove and indecator postion set
      $button.on("click", function (e) {
        e.preventDefault();
        var cBtn = $(this);
        cBtn.addClass("active").siblings().removeClass("active");
        if (opt.sliderTab) {
          $(slider).slick("slickGoTo", cBtn.data("slide-go-to"));
        }
      });

      // Work With slider
      if (opt.sliderTab) {
        var slider = $menu.data("asnavfor"); // select slider

        // Select All button and set attribute
        var i = 0;
        $button.each(function () {
          var slideBtn = $(this);
          slideBtn.attr("data-slide-go-to", i);
          i++;

          // Active Slide On load > Actived Button
          if (slideBtn.hasClass("active")) {
            $(slider).slick("slickGoTo", slideBtn.data("slide-go-to"));
          }

          // Change Indicator On slide Change
          $(slider).on(
            "beforeChange",
            function (event, slick, currentSlide, nextSlide) {
              $menu
                .find(opt.tabButton + '[data-slide-go-to="' + nextSlide + '"]')
                .addClass("active")
                .siblings()
                .removeClass("active");
            }
          );
        });
      }
    });
  };

  // Call On Load
  if ($(".vs-slider-tab").length) {
    $(".vs-slider-tab").vsTab({
      sliderTab: true,
      tabButton: ".tab-btn",
    });
  }

  /*----------- 09. Ajax Contact Form ----------*/
  function ajaxContactForm(selectForm) {
    var form = selectForm;
    var invalidCls = "is-invalid";
    var $email = '[name="email"]';
    var $validation =
      '[name="name"],[name="email"],[name="phone"],[name="message"]'; // Remove [name="subject"]
    var formMessages = $(selectForm).next(".form-messages");

    function sendContact() {
      var formData = $(form).serialize();
      var valid;
      valid = validateContact();
      if (valid) {
        jQuery
          .ajax({
            url: $(form).attr("action"),
            data: formData,
            type: "POST",
          })
          .done(function (response) {
            // Make sure that the formMessages div has the 'success' class.
            formMessages.removeClass("error");
            formMessages.addClass("success");
            // Set the message text.
            formMessages.text(response);
            // Clear the form.
            $(form + ' input:not([type="submit"]),' + form + " textarea").val(
              ""
            );
          })
          .fail(function (data) {
            // Make sure that the formMessages div has the 'error' class.
            formMessages.removeClass("success");
            formMessages.addClass("error");
            // Set the message text.
            if (data.responseText !== "") {
              formMessages.html(data.responseText);
            } else {
              formMessages.html(
                "Oops! An error occurred and your message could not be sent."
              );
            }
          });
      }
    }

    function validateContact() {
      var valid = true;
      var formInput;
      function unvalid($validation) {
        $validation = $validation.split(",");
        for (var i = 0; i < $validation.length; i++) {
          formInput = form + " " + $validation[i];
          if (!$(formInput).val()) {
            $(formInput).addClass(invalidCls);
            valid = false;
          } else {
            $(formInput).removeClass(invalidCls);
            valid = true;
          }
        }
      }
      unvalid($validation);

      if (
        !$(form + " " + $email).val() ||
        !$(form + " " + $email)
          .val()
          .match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)
      ) {
        $(form + " " + $email).addClass(invalidCls);
        valid = false;
      } else {
        $(form + " " + $email).removeClass(invalidCls);
        valid = true;
      }
      return valid;
    }

    $(form).on("submit", function (element) {
      element.preventDefault();
      sendContact();
    });
  }
  ajaxContactForm(".ajax-contact");

  /*---------- 10. Popup Sidemenu ----------*/
  function popupSideMenu($sideMenu, $sideMunuOpen, $sideMenuCls, $toggleCls) {
    // Sidebar Popup
    $($sideMunuOpen).on("click", function (e) {
      e.preventDefault();
      $($sideMenu).addClass($toggleCls);
    });
    $($sideMenu).on("click", function (e) {
      e.stopPropagation();
      $($sideMenu).removeClass($toggleCls);
    });
    var sideMenuChild = $sideMenu + " > div";
    $(sideMenuChild).on("click", function (e) {
      e.stopPropagation();
      $($sideMenu).addClass($toggleCls);
    });
    $($sideMenuCls).on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      $($sideMenu).removeClass($toggleCls);
    });
  }
  popupSideMenu(
    ".sidemenu-wrapper",
    ".sideMenuToggler",
    ".sideMenuCls",
    "show"
  );

  /*---------- 10. Popup SideCart ----------*/
  function popupSideMenu($sidecart, $sidecartOpen, $sidecartCls, $toggleCls) {
    // Sidebar Popup
    $($sidecartOpen).on("click", function (e) {
      e.preventDefault();
      $($sidecart).addClass($toggleCls);
    });
    $($sidecart).on("click", function (e) {
      e.stopPropagation();
      $($sidecart).removeClass($toggleCls);
    });
    var sidecartChild = $sidecart + " > div";
    $(sidecartChild).on("click", function (e) {
      e.stopPropagation();
      $($sidecart).addClass($toggleCls);
    });
    $($sidecartCls).on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      $($sidecart).removeClass($toggleCls);
    });
  }
  popupSideMenu(
    ".sideCart-wrapper",
    ".sideCartToggler",
    ".sideMenuCls",
    "show"
  );

  /*----------- 11. Magnific Popup ----------*/
  /* magnificPopup img view */
  $(".popup-image").magnificPopup({
    type: "image",
    gallery: {
      enabled: true,
    },
  });

  /* magnificPopup video view */
  $(".popup-video").magnificPopup({
    type: "iframe",
  });

  /*---------- 12. Section Position ----------*/
  // Interger Converter
  function convertInteger(str) {
    return parseInt(str, 10);
  }

  $.fn.sectionPosition = function (mainAttr, posAttr, getPosValue) {
    $(this).each(function () {
      var section = $(this);

      function setPosition() {
        var sectionHeight = Math.floor(section.height() / 2), // Main Height of section
          posValue = convertInteger(section.attr(getPosValue)), // positioning value
          posData = section.attr(mainAttr), // how much to position
          posFor = section.attr(posAttr), // On Which section is for positioning
          parentPT = convertInteger($(posFor).css("padding-top")), // Default Padding of  parent
          parentPB = convertInteger($(posFor).css("padding-bottom")); // Default Padding of  parent

        if (posData === "top-half") {
          $(posFor).css("padding-bottom", parentPB + sectionHeight + "px");
          section.css("margin-top", "-" + sectionHeight + "px");
        } else if (posData === "bottom-half") {
          $(posFor).css("padding-top", parentPT + sectionHeight + "px");
          section.css("margin-bottom", "-" + sectionHeight + "px");
        } else if (posData === "top") {
          $(posFor).css("padding-bottom", parentPB + posValue + "px");
          section.css("margin-top", "-" + posValue + "px");
        } else if (posData === "bottom") {
          $(posFor).css("padding-top", parentPT + posValue + "px");
          section.css("margin-bottom", "-" + posValue + "px");
        }
      }
      setPosition(); // Set Padding On Load
    });
  };

  var postionHandler = "[data-sec-pos]";
  if ($(postionHandler).length) {
    $(postionHandler).imagesLoaded(function () {
      $(postionHandler).sectionPosition(
        "data-sec-pos",
        "data-pos-for",
        "data-pos-amount"
      );
    });
  }

  /*----------- 13. Filter ----------*/
  $(".filter-active, .filter-active2").imagesLoaded(function () {
    var $filter = ".filter-active",
      $filter2 = ".filter-active2",
      $filterItem = ".filter-item",
      $filterMenu = ".filter-menu-active";

    if ($($filter).length > 0) {
      var $grid = $($filter).isotope({
        itemSelector: $filterItem,
        filter: "*",
        masonry: {
          columnWidth: 1,
          gutter: 30,
        },
      });
    }

    if ($($filter2).length > 0) {
      var $grid = $($filter2).isotope({
        itemSelector: $filterItem,
        filter: "*",
        masonry: {
          // use outer width of grid-sizer for columnWidth
          columnWidth: $filterItem,
        },
      });
    }

    // Menu Active Class
    $($filterMenu).on("click", "button", function (event) {
      event.preventDefault();
      var filterValue = $(this).attr("data-filter");
      $grid.isotope({
        filter: filterValue,
      });
      $(this).addClass("active");
      $(this).siblings(".active").removeClass("active");
    });
  });

  /*----------- 14. One Page Nav ----------*/
  function onePageNav(element) {
    if ($(element).length > 0) {
      $(element).each(function () {
        $(this)
          .find("a")
          .each(function () {
            $(this).on("click", function (e) {
              var target = $(this.getAttribute("href"));
              if (target.length) {
                e.preventDefault();
                event.preventDefault();
                $("html, body")
                  .stop()
                  .animate(
                    {
                      scrollTop: target.offset().top - 10,
                    },
                    1000
                  );
              }
            });
          });
      });
    }
  }
  onePageNav(".onepage-nav, .main-menu, .vs-mobile-menu");

  /*----------- 15. WOW.js Animation ----------*/
  var wow = new WOW({
    boxClass: "wow", // animated element css class (default is wow)
    animateClass: "wow-animated", // animation css class (default is animated)
    offset: 0, // distance to the element when triggering the animation (default is 0)
    mobile: false, // trigger animations on mobile devices (default is true)
    live: true, // act on asynchronously loaded content (default is true)
    scrollContainer: null, // optional scroll container selector, otherwise use window,
    resetAnimation: false, // reset animation on end (default is true)
  });
  wow.init();

  /*----------- 15. Indicator Position ----------*/
  function setPos(element) {
    var indicator = element.siblings(".indicator"),
      btnWidth = element.css("width"),
      btnHiehgt = element.css("height"),
      btnLeft = element.position().left,
      btnTop = element.position().top;
    element.addClass("active").siblings().removeClass("active");
    indicator.css({
      left: btnLeft + "px",
      top: btnTop + "px",
      width: btnWidth,
      height: btnHiehgt,
    });
  }

  $(".login-tab a").each(function () {
    var link = $(this);
    if (link.hasClass("active")) setPos(link);
    link.on("mouseover", function () {
      setPos($(this));
    });
  });

  /*----------- 16. Color Plate Js ----------*/
  if ($(".vs-color-plate").length) {
    var oldValue = $("#plate-color").val();
    $("#plate-color").on("change", function (e) {
      var color = e.target.value;
      $("body").css("--theme-color", color);
    });

    $("#plate-reset").on("click", function () {
      $("body").css("--theme-color", "");
      $("#plate-color").val(oldValue);
    });

    $("#plate-toggler").on("click", function () {
      $(".vs-color-plate").toggleClass("open");
    });
  }

  /*----------- 11. Select Box Active ----------*/
  if ($("select").length > 0) {
    $("select").niceSelect();
  }

  /*-----------  Price Slider ----------*/
  $(".price_slider").slider({
    range: true,
    min: 100,
    max: 750,
    values: [100, 550],
    slide: function (event, ui) {
      $(".from").text("$" + ui.values[0]);
      $(".to").text("$" + ui.values[1]);
    },
  });
  $(".from").text("$" + $(".price_slider").slider("values", 0));
  $(".to").text("$" + $(".price_slider").slider("values", 1));

  /*---------- 19. Quantity Added ----------*/
  $(".quantity-plus").each(function () {
    $(this).on("click", function (e) {
      e.preventDefault();
      var $qty = $(this).closest(".quantity-container").find(".qty-input");
      var currentVal = parseInt($qty.val());
      if (!isNaN(currentVal)) {
        $qty.val(formatNumber(currentVal + 1));
      }
    });
  });

  $(".quantity-minus").each(function () {
    $(this).on("click", function (e) {
      e.preventDefault();
      var $qty = $(this).closest(".quantity-container").find(".qty-input");
      var currentVal = parseInt($qty.val());
      if (!isNaN(currentVal) && currentVal > 1) {
        $qty.val(formatNumber(currentVal - 1));
      }
    });
  });

  // Function to format the number with leading zeros
  function formatNumber(num) {
    return num.toString().padStart(2, "0");
  }

  $(".comparison-active").twentytwenty({
    //  How much of the before image is visible when the page loads
    default_offset_pct: 0.5,

    // or vertical
    orientation: "horizontal",

    // label text
    before_label: "Before",
    after_label: "After",

    // enable/disable overlay
    no_overlay: true,

    // move with handle
    move_with_handle_only: true,

    // click to move
    click_to_move: false,
  });

  /*----------- 18. Woocommerce Toggle ----------*/
  // Ship To Different Address
  $("#ship-to-different-address-checkbox").on("change", function () {
    if ($(this).is(":checked")) {
      $("#ship-to-different-address").next(".shipping_address").slideDown();
    } else {
      $("#ship-to-different-address").next(".shipping_address").slideUp();
    }
  });

  // Login Toggle
  $(".woocommerce-form-login-toggle a").on("click", function (e) {
    e.preventDefault();
    $(".woocommerce-form-login").slideToggle();
  });

  // Coupon Toggle
  $(".woocommerce-form-coupon-toggle a").on("click", function (e) {
    e.preventDefault();
    $(".woocommerce-form-coupon").slideToggle();
  });

  // Woocommerce Shipping Method
  $(".shipping-calculator-button").on("click", function (e) {
    e.preventDefault();
    $(this).next(".shipping-calculator-form").slideToggle();
  });

  // Woocommerce Payment Toggle
  $('.wc_payment_methods input[type="radio"]:checked')
    .siblings(".payment_box")
    .show();
  $('.wc_payment_methods input[type="radio"]').each(function () {
    $(this).on("change", function () {
      $(".payment_box").slideUp();
      $(this).siblings(".payment_box").slideDown();
    });
  });

  // Woocommerce Rating Toggle
  $(".rating-select .stars a").each(function () {
    $(this).on("click", function (e) {
      e.preventDefault();
      $(this).siblings().removeClass("active");
      $(this).parent().parent().addClass("selected");
      $(this).addClass("active");
    });
  });

  $.fn.countdown = function () {
    this.each(function () {
      var $this = $(this),
        offerDate = new Date($this.data("offer-date")).getTime();

      function findElement(selector) {
        return $this.find(selector);
      }

      var interval = setInterval(function () {
        var now = new Date().getTime(),
          timeDiff = offerDate - now,
          days = Math.floor(timeDiff / 864e5),
          hours = Math.floor((timeDiff % 864e5) / 36e5),
          minutes = Math.floor((timeDiff % 36e5) / 6e4),
          seconds = Math.floor((timeDiff % 6e4) / 1e3);

        days < 10 && (days = "0" + days),
          hours < 10 && (hours = "0" + hours),
          minutes < 10 && (minutes = "0" + minutes),
          seconds < 10 && (seconds = "0" + seconds);

        if (timeDiff < 0) {
          clearInterval(interval);
          $this.addClass("expired");
          findElement(".message").css("display", "block");
        } else {
          findElement(".day").html(days);
          findElement(".hour").html(hours);
          findElement(".minute").html(minutes);
          findElement(".seconds").html(seconds);
        }
      }, 1000);
    });
  };

  $(".offer-counter").length && $(".offer-counter").countdown();

  // Progress Bar
  document.addEventListener("DOMContentLoaded", function () {
    const progressBoxes = document.querySelectorAll(".progress-box");

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // Intersection observer threshold
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateProgressBar(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, options);

    progressBoxes.forEach((progressBox) => {
      observer.observe(progressBox);
    });

    function animateProgressBar(progressBox) {
      const progressBar = progressBox.querySelector(".progress-box__bar");
      const progressNumber = progressBox.querySelector(".progress-box__number");
      const targetWidth = parseInt(progressBar.style.width);
      let width = 0;
      const countInterval = setInterval(() => {
        width++;
        progressBar.style.width = width + "%";
        progressNumber.textContent = width + "%";
        if (width >= targetWidth) {
          clearInterval(countInterval);
        }
      }, 20);
    }
  });

  /**************************************
   ***** 14. Counter Activation
   **************************************/
  // Function to animate the counters
  function animateCounter(counter) {
    const targetValue = parseInt(counter.getAttribute("data-counter"));
    const animationDuration = 1000; // Set the desired animation duration in milliseconds
    const startTimestamp = performance.now();

    function updateCounter(timestamp) {
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / animationDuration, 1);

      const currentValue = Math.floor(targetValue * progress);
      counter.textContent = currentValue;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    }

    requestAnimationFrame(updateCounter);
  }

  // Start the counting animation when the counter is intersecting with the viewport
  function startCounterAnimation(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target.querySelector(".counters");
        animateCounter(counter);
        // observer.unobserve(entry.target);
      }
    });
  }

  // Create an intersection observer instance
  const observer = new IntersectionObserver(startCounterAnimation, {
    rootMargin: "0px",
    threshold: 0.2, // Adjust the threshold value as needed (0.2 means 20% visibility)
  });

  // Observe all counter blocks
  const counterBlocks = document.querySelectorAll(".count-start");
  counterBlocks.forEach((counterBlock) => {
    observer.observe(counterBlock);
  });

  /**************************************
   ***** 8. Image Reveal Animation
   **************************************/
  function reveal1() {
    var reveals = document.querySelectorAll(".reveal1");

    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 150;
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
  }
  window.addEventListener("scroll", reveal1);

  // end
})(jQuery);
