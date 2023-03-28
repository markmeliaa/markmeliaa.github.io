(function() {
  "use strict";

  // Easy selector helper function
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  // Easy event listener function
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  // Easy on scroll event listener 
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  // Change navbar highlight depending on the page section you are
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  // When a navbar highlight is clicked, scrolls to it
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 16
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  // Scroll with offset when a navbar highlight is clicked
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

       let navbar = select('#navbar')
       if (navbar.classList.contains('navbar-mobile')) {
         navbar.classList.remove('navbar-mobile')
         let navbarToggle = select('.mobile-nav-toggle')
         navbarToggle.classList.toggle('bi-list')
         navbarToggle.classList.toggle('bi-x')
       }
       scrollto(this.hash)
      }
   }, true)

  // Show navbar highlights when scrolled outside the hero
  /*
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }
  */

  // Back to top button
  /*
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }
  */

  // Mobile nav toggle
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  // Mobile nav dropdowns activate
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  // Scroll with offset on page load with hash links in the url (should be deleted)
  /*
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });
  */

    // Hero writting effect
    const typed = select('.typed')
    if (typed) {
      let typed_strings = typed.getAttribute('data-typed-items')
      typed_strings = typed_strings.split(',')
      new Typed('.typed', {
        strings: typed_strings,
        loop: true,
        typeSpeed: 70,
        backSpeed: 110,
        backDelay: 2000
      });
    }

  // Hero help writting effect
  const typed_help = select('.typed-help')
  if (typed_help) {
    let typed_strings = typed_help.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed-help', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 50,
      backSpeed: 70,
      backDelay: 1000,
      showCursor: false
    });
  }

    // About help writting effect
    const typed_help_2 = select('.typed-help-2')
    if (typed_help_2) {
      let typed_strings = typed_help_2.getAttribute('data-typed-items')
      typed_strings = typed_strings.split(',')
      new Typed('.typed-help-2', {
        strings: typed_strings,
        loop: true,
        typeSpeed: 50,
        backSpeed: 70,
        backDelay: 1000,
        showCursor: false
      });
    }

    // Portfolio help writting effect
    const typed_help_3 = select('.typed-help-3')
    if (typed_help_3) {
      let typed_strings = typed_help_3.getAttribute('data-typed-items')
      typed_strings = typed_strings.split(',')
      new Typed('.typed-help-3', {
        strings: typed_strings,
        loop: true,
        typeSpeed: 50,
        backSpeed: 70,
        backDelay: 1000,
        showCursor: false
      });
    }

  // Personal traits slider
  new Swiper('.traits-slider', {
    speed: 500,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      100: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      250: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      700: {
        slidesPerView: 4,
        spaceBetween: 20
      }
    }
  });

  // Porfolio filters on click
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });

      }, true);
    }

  });

  // Initiate portfolio lightbox (should be deleted)
  /*
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });
  */

  // Image slider for each portfolio page
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  // Prevent mouse wheel scrolling
  //window.addEventListener("wheel", e => e.preventDefault(), { passive:false })
  
  // Prevent mouse wheel click scrolling
  document.body.onmousedown = function(e) {
    if (e.button == 1) {
        e.preventDefault();
        return false;
    }
  }

  // Cursor for computer
  function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }
    
  if (!isMobile()) {
    // When not in mobile, replace the cursor by this animation
    const $bigBall = document.querySelector('.cursor__ball--big');
    const $smallBall = document.querySelector('.cursor__ball--small');
    const $hoverables = document.querySelectorAll('.hoverable');

    // Listeners
    document.body.addEventListener('mousemove', onMouseMove);
    for (let i = 0; i < $hoverables.length; i++) {
      $hoverables[i].addEventListener('mouseenter', onMouseHover);
      $hoverables[i].addEventListener('mouseleave', onMouseHoverOut);
    }

    // Move the cursor
    function onMouseMove(e) {
      TweenMax.to($bigBall, .5, {
        x: e.pageX - 15,
        y: e.pageY - 15
      })
      TweenMax.to($smallBall, .1, {
        x: e.pageX - 5,
        y: e.pageY - 7
      })
    }

    // Hover an element
    function onMouseHover() {
      TweenMax.to($bigBall, .3, {
        scale: 3,
      })
    }

    function onMouseHoverOut() {
      TweenMax.to($bigBall, .3, {
        scale: 1
      })
    }

    // Scroll to the top of the page when refreshing
    /* TODOMine: Uncomment this function once finished
    window.onload = function () {
    window.scrollTo(0,0);
    };
    */

    // Mouse hover light efect over the portfolio work
    /*
    document.getElementById("portfolio-cards").onmousemove = e => {
      for(const card of document.getElementsByClassName("work-card")) {
        const rect = card.getBoundingClientRect(),
              x = e.clientX - rect.left,
              y = e.clientY - rect.top;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      };
    }
    */
  }

  document.getElementById("portfolio-cards").onmousemove = e => {
    for(const card of document.getElementsByClassName("hoverable")) {
      const rect = card.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    };
  }

  //------------------- TRAIT BOTTLE ACTIVATORS -------------------//

  // Unlock vodka trait
  const vodka_activator = document.querySelectorAll('.help-quote-1');
  const vodka_images = document.querySelectorAll('.vodka-bottle-locked');
  const vodka_quotes = document.querySelectorAll('.vodka-no-quote');

  for (const activator of vodka_activator) {
    activator.addEventListener('click', function handleClick() {
      for (const drink of vodka_images) {
        drink.classList.add('vodka-bottle-unlocked');
      }

      for (const quotes of vodka_quotes) {
        quotes.classList.add('vodka-quote');
      }
    });
  }

  // Unlock absinthe trait
  const absinthe_activator = document.querySelectorAll('.help-quote-1'); // Activator placeholder
  const absinthe_images = document.querySelectorAll('.absinthe-bottle-locked');
  const absinthe_quotes = document.querySelectorAll('.absinthe-no-quote');

  for (const activator of absinthe_activator) {
    activator.addEventListener('click', function handleClick() {
      for (const drink of absinthe_images) {
        drink.classList.add('absinthe-bottle-unlocked');
      }

      for (const quotes of absinthe_quotes) {
        quotes.classList.add('absinthe-quote');
      }
    });
  }

  // Unlock tequila trait
  const tequila_activator = document.querySelectorAll('.help-quote-3');
  const tequila_images = document.querySelectorAll('.tequila-bottle-locked');
  const tequila_quotes = document.querySelectorAll('.tequila-no-quote');

  for (const activator of tequila_activator) {
    activator.addEventListener('click', function handleClick() {
      for (const drink of tequila_images) {
        drink.classList.add('tequila-bottle-unlocked');
      }

      for (const quotes of tequila_quotes) {
        quotes.classList.add('tequila-quote');
      }
    });
  }

  // Unlock bourbon trait
  const bourbon_activator = document.querySelectorAll('.help-quote-3'); // Activator placeholder
  const bourbon_images = document.querySelectorAll('.bourbon-bottle-locked');
  const bourbon_quotes = document.querySelectorAll('.bourbon-no-quote');

  for (const activator of bourbon_activator) {
    activator.addEventListener('click', function handleClick() {
      for (const drink of bourbon_images) {
        drink.classList.add('bourbon-bottle-unlocked');
      }

      for (const quotes of bourbon_quotes) {
        quotes.classList.add('bourbon-quote');
      }
    });
  }

  // Unlock blue whisper trait
  const blue_whisper_activator = document.querySelectorAll('.help-quote-2');
  const blue_whisper_images = document.querySelectorAll('.blue-whisper-bottle-locked');
  const blue_whisper_quotes = document.querySelectorAll('.blue-whisper-no-quote');

  for (const activator of blue_whisper_activator) {
    activator.addEventListener('click', function handleClick() {
      for (const drink of blue_whisper_images) {
        drink.classList.add('blue-whisper-bottle-unlocked');
      }

      for (const quotes of blue_whisper_quotes) {
        quotes.classList.add('blue-whisper-quote');
      }
    });
  }

  // Unlock red secret trait
  const red_secret_activator = document.querySelectorAll('.help-quote-2'); // Activator placeholder
  const red_secret_images = document.querySelectorAll('.red-secret-bottle-locked');
  const red_secret_quotes = document.querySelectorAll('.red-secret-no-quote');

  for (const activator of red_secret_activator) {
    activator.addEventListener('click', function handleClick() {
      for (const drink of red_secret_images) {
        drink.classList.add('red-secret-bottle-unlocked');
      }

      for (const quotes of red_secret_quotes) {
        quotes.classList.add('red-secret-quote');
      }
    });
  }

  // Global trait activator
  const general_traits_activator = document.querySelector('.unlock-all-traits');

  general_traits_activator.addEventListener('click', function handleClick() {
    for (const drink of vodka_images) {
      drink.classList.add('vodka-bottle-unlocked');
    }
    for (const quotes of vodka_quotes) {
      quotes.classList.add('vodka-quote');
    }

    for (const drink of absinthe_images) {
      drink.classList.add('absinthe-bottle-unlocked');
    }
    for (const quotes of absinthe_quotes) {
      quotes.classList.add('absinthe-quote');
    }

    for (const drink of tequila_images) {
      drink.classList.add('tequila-bottle-unlocked');
    }
    for (const quotes of tequila_quotes) {
      quotes.classList.add('tequila-quote');
    }

    for (const drink of bourbon_images) {
      drink.classList.add('bourbon-bottle-unlocked');
    }
    for (const quotes of bourbon_quotes) {
      quotes.classList.add('bourbon-quote');
    }

    for (const drink of blue_whisper_images) {
      drink.classList.add('blue-whisper-bottle-unlocked');
    }
    for (const quotes of blue_whisper_quotes) {
      quotes.classList.add('blue-whisper-quote');
    }

    for (const drink of red_secret_images) {
      drink.classList.add('red-secret-bottle-unlocked');
    }
    for (const quotes of red_secret_quotes) {
      quotes.classList.add('red-secret-quote');
    }
  });

  //------------------- TRAIT BOTTLE ACTIVATORS -------------------//

  //------------------- TRAIT MODAL ACTIVATORS -------------------//

  // Manage help traits modal
  const open_traits_modal = document.getElementById('traits-question-mark');
  const traits_modal_container = document.getElementById('traits-modal-container');
  const close_traits_modal = document.getElementById('traits-modal-close');

  open_traits_modal.addEventListener('click', () => {
    traits_modal_container.classList.add('show');
  })

  close_traits_modal.addEventListener('click', () => {
    traits_modal_container.classList.remove('show');
  })

  // Manage vodka trait modal
  const vodka_trait_modal_container = document.getElementById('vodka-trait-modal-container');
  const close_vodka_trait_modal = document.getElementById('vodka-trait-modal-close');

  for (const drink of vodka_images) {
    drink.addEventListener('click', () => {
      vodka_trait_modal_container.classList.add('show');
    })
  }

  close_vodka_trait_modal.addEventListener('click', () => {
    vodka_trait_modal_container.classList.remove('show');
  })

  // Manage absinthe trait modal
  const absinthe_trait_modal_container = document.getElementById('absinthe-trait-modal-container');
  const close_absinthe_trait_modal = document.getElementById('absinthe-trait-modal-close');

  for (const drink of absinthe_images) {
    drink.addEventListener('click', () => {
      absinthe_trait_modal_container.classList.add('show');
    })
  }

  close_absinthe_trait_modal.addEventListener('click', () => {
    absinthe_trait_modal_container.classList.remove('show');
  })

  // Manage tequila trait modal
  const tequila_trait_modal_container = document.getElementById('tequila-trait-modal-container');
  const close_tequila_trait_modal = document.getElementById('tequila-trait-modal-close');

  for (const drink of tequila_images) {
    drink.addEventListener('click', () => {
      tequila_trait_modal_container.classList.add('show');
    })
  }

  close_tequila_trait_modal.addEventListener('click', () => {
    tequila_trait_modal_container.classList.remove('show');
  })

  // Manage bourbon trait modal
  const bourbon_trait_modal_container = document.getElementById('bourbon-trait-modal-container');
  const close_bourbon_trait_modal = document.getElementById('bourbon-trait-modal-close');

  for (const drink of bourbon_images) {
    drink.addEventListener('click', () => {
      bourbon_trait_modal_container.classList.add('show');
    })
  }

  close_bourbon_trait_modal.addEventListener('click', () => {
    bourbon_trait_modal_container.classList.remove('show');
  })

  // Manage blue whisper trait modal
  const blue_whisper_trait_modal_container = document.getElementById('blue-whisper-trait-modal-container');
  const close_blue_whisper_trait_modal = document.getElementById('blue-whisper-trait-modal-close');

  for (const drink of blue_whisper_images) {
    drink.addEventListener('click', () => {
      blue_whisper_trait_modal_container.classList.add('show');
    })
  }

  close_blue_whisper_trait_modal.addEventListener('click', () => {
    blue_whisper_trait_modal_container.classList.remove('show');
  })

  // Manage red secret trait modal
  const red_secret_trait_modal_container = document.getElementById('red-secret-trait-modal-container');
  const close_red_secret_trait_modal = document.getElementById('red-secret-trait-modal-close');

  for (const drink of red_secret_images) {
    drink.addEventListener('click', () => {
      red_secret_trait_modal_container.classList.add('show');
    })
  }

  close_red_secret_trait_modal.addEventListener('click', () => {
    red_secret_trait_modal_container.classList.remove('show');
  })

  //------------------- TRAIT MODAL ACTIVATORS -------------------//

})()