
/* ==========================================
   PRASHANT & TANU WEDDING INVITATION
========================================== */

const WEDDING = {
  weddingDate: '2026-11-30T10:00:00+05:30',

  whatsapp: '91XXXXXXXXXX',

  events: [
      {
          name: 'Sunehri Rasam  <br> (Haldi by the Ganga )',
          date: '30 November 2026',
          time: '10AM Onwards',
          venue: 'Guleria Kothi Hotel, Varanasi, Uttar Pradesh',

          map: 'https://www.google.com/maps/place/Guleria+Kothi+Hotel/@25.3132918,83.0136061,17z/data=!3m1!4b1!4m9!3m8!1s0x398e2e218d98dc59:0x789b58e0a75fb7f9!5m2!4m1!1i2!8m2!3d25.3132918!4d83.016181!16s%2Fg%2F11f24vbtjh?authuser=0&entry=ttu&g_ep=EgoyMDI2MTEwMy4wIKXMDSoASAFQAw%3D%3D'
      },

      {
          name: 'The Wedding',
          date: '30 November 2026',
          time: '4PM Onwards',
          venue: 'Guleria Kothi Hotel, Varanasi, Uttar Pradesh',

          map: 'https://www.google.com/maps/place/Guleria+Kothi+Hotel/@25.3132918,83.0136061,17z/data=!3m1!4b1!4m9!3m8!1s0x398e2e218d98dc59:0x789b58e0a75fb7f9!5m2!4m1!1i2!8m2!3d25.3132918!4d83.016181!16s%2Fg%2F11f24vbtjh?authuser=0&entry=ttu&g_ep=EgoyMDI2MTEwMy4wIKXMDSoASAFQAw%3D%3D'
      },

      {
          name: 'The Reception',
          date: '3 December 2026',
          time: '8PM Onwards',
          venue: 'Status Club, Hardoi, Uttar Pradesh',

          map: 'https://www.google.com/maps/place/Status+Club/@27.4235785,80.1186076,17z/data=!3m1!4b1!4m9!3m8!1s0x399ef9000cf3ea03:0x30072453d2b19f5d!5m2!4m1!1i2!8m2!3d27.4235785!4d80.1211825!16s%2Fg%2F11lw32_5lh?authuser=0&entry=ttu&g_ep=EgoyMDI2MTEwMy4wIKXMDSoASAFQAw%3D%3D'
      }
  ]
};


/* ==========================================
 SELECTORS
========================================== */

const $ = selector => document.querySelector(selector);

const $$ = selector => [
  ...document.querySelectorAll(selector)
];



/* ==========================================
   OPENING INVITATION + BACKGROUND MUSIC
========================================== */

const opening = $('#invitationOpening');
const enterButton = $('#enterInvitation');

const audio = $('#weddingMusic');
const musicButton = $('#musicBtn');

async function playWeddingMusic() {
  if (!audio) return;

  try {
    await audio.play();
    musicButton?.classList.add('playing');
  } catch (error) {
    console.error('Music playback failed:', error);
    musicButton?.classList.remove('playing');
  }
}

function pauseWeddingMusic() {
  if (!audio) return;

  audio.pause();
  musicButton?.classList.remove('playing');
}

// Enter invitation and start music
enterButton?.addEventListener('click', async () => {
  opening?.classList.add('closed');

  await playWeddingMusic();
});

// Music button toggle
musicButton?.addEventListener('click', async () => {
  if (!audio) return;

  if (audio.paused) {
    await playWeddingMusic();
  } else {
    pauseWeddingMusic();
  }
});



/* ==========================================
 BACKGROUND MUSIC
========================================== */

musicButton?.addEventListener('click', async () => {

  if (!audio) return;

  if (audio.paused) {

      try {

          await audio.play();

          musicButton.classList.add('playing');

      } catch (error) {

          musicButton.classList.remove('playing');

      }

  } else {

      audio.pause();

      musicButton.classList.remove('playing');

  }

});


/* ==========================================
 MOBILE NAVIGATION
========================================== */

const menuToggle = $('#menuToggle');

const mainNav = $('#mainNav');


menuToggle?.addEventListener('click', () => {

  const isOpen = mainNav.classList.toggle('open');

  menuToggle.setAttribute(
      'aria-expanded',
      String(isOpen)
  );

  menuToggle.setAttribute(
      'aria-label',
      isOpen
          ? 'Close navigation'
          : 'Open navigation'
  );

});


$$('#mainNav a').forEach(link => {

  link.addEventListener('click', () => {

      mainNav?.classList.remove('open');

      menuToggle?.setAttribute(
          'aria-expanded',
          'false'
      );

      menuToggle?.setAttribute(
          'aria-label',
          'Open navigation'
      );

  });

});


/* ==========================================
 EVENT CARD BACKGROUND IMAGES

 IMPORTANT:
 Replace these filenames with the exact
 image names inside your assets folder.

 Example:
 assets/Haldi Ceremony.png
========================================== */

const eventImages = [

  '\assets/image3.png',

  '\assets/image2.jpeg',

  '\assets/image1.jpeg'

];


/* ==========================================
 GENERATE WEDDING EVENT CARDS
========================================== */

const eventList = $('#eventList');


if (eventList) {

  eventList.innerHTML = WEDDING.events.map(
      (event, index) => {

          const image = eventImages[index];

          return `

              <article
                  class="event-board event-board-${index + 1} reveal"
                  style="--event-image: url('${image}')"
              >

                  <div class="event-content">

                      <div class="event-symbol">
                          ❀
                      </div>

                      <p>
                          THE CELEBRATION
                      </p>

                      <h3>
                          ${event.name}
                      </h3>

                      <p>
                          ${event.date}
                      </p>

                      <p>

                          <small>
                              TIME &amp; VENUE
                          </small>

                          <br>

                          ${event.time}

                          <br>

                          ${event.venue}

                      </p>

                      <button
                          class="route-btn"
                          type="button"
                          data-event="${index}"
                      >

                          DISCOVER THE ROUTE →

                      </button>

                  </div>

              </article>

          `;

      }
  ).join('');

}


/* ==========================================
 EVENT ROUTE MODAL
========================================== */

const modal = $('#routeModal');


function closeRoute() {

  modal?.classList.remove('open');

  modal?.setAttribute(
      'aria-hidden',
      'true'
  );

  document.body.style.overflow = '';

}


/* ==========================================
 EVENT ROUTE BUTTONS
========================================== */

eventList?.addEventListener('click', event => {

  const button = event.target.closest('[data-event]');

  if (!button) return;

  const eventIndex = Number(button.dataset.event);

  const weddingEvent = WEDDING.events[eventIndex];

  if (!weddingEvent) return;


  const routeTitle = $('#routeTitle');

  const routeMeta = $('#routeMeta');

  const routeMapLink = $('#routeMapLink');


  if (routeTitle) {

      routeTitle.textContent = weddingEvent.venue;

  }


  if (routeMeta) {

      routeMeta.textContent =

          `${weddingEvent.name} · ` +

          `${weddingEvent.date} · ` +

          `${weddingEvent.time}`;

  }


  if (routeMapLink) {

      routeMapLink.href = weddingEvent.map;

  }


  modal?.classList.add('open');

  modal?.setAttribute(
      'aria-hidden',
      'false'
  );

  document.body.style.overflow = 'hidden';

});


/* ==========================================
 CLOSE ROUTE MODAL
========================================== */

$('#closeRoute')?.addEventListener(
  'click',
  closeRoute
);


modal?.addEventListener('click', event => {

  if (event.target === modal) {

      closeRoute();

  }

});


/* ==========================================
 WEDDING COUNTDOWN
========================================== */

const target = new Date(
  WEDDING.weddingDate
).getTime();


function updateCountdown() {

  const remaining = Math.max(
      0,
      target - Date.now()
  );


  const values = {

      days: Math.floor(
          remaining / 86400000
      ),

      hours: Math.floor(
          remaining % 86400000 / 3600000
      ),

      minutes: Math.floor(
          remaining % 3600000 / 60000
      ),

      seconds: Math.floor(
          remaining % 60000 / 1000
      )

  };


  Object.entries(values).forEach(
      ([key, value]) => {

          const element = $('#' + key);

          if (element) {

              element.textContent = String(
                  value
              ).padStart(2, '0');

          }

      }
  );

}


updateCountdown();

setInterval(
  updateCountdown,
  1000
);


/* ==========================================
 WHATSAPP RSVP
========================================== */

const rsvp = $('#rsvp');


if (rsvp) {

  const phone = WEDDING.whatsapp.replace(
      /\D/g,
      ''
  );


  const message = encodeURIComponent(

      'Namaste! We would love to RSVP for ' +

      'Prashant & Tanu’s wedding celebration ' +

      'on 30 November 2026.'

  );


  rsvp.href =

      `https://wa.me/${phone}?text=${message}`;


  if (
      phone.endsWith('XXXXXXXXXX') ||
      phone.length < 10
  ) {

      rsvp.addEventListener('click', event => {

          event.preventDefault();

          alert(

              'Please add the family WhatsApp ' +

              'number in script.js before publishing.'

          );

      });

  }

}


/* ==========================================
 GALLERY LIGHTBOX
========================================== */

const lightbox = $('#lightbox');


$$('.gallery-tile').forEach(tile => {

  tile.addEventListener('click', () => {

      const caption = $('#lightboxCaption');

      if (caption) {

          caption.textContent =

              tile.dataset.caption ||

              tile.textContent.trim();

      }


      lightbox?.classList.add('open');

      lightbox?.setAttribute(
          'aria-hidden',
          'false'
      );

  });

});


/* ==========================================
 CLOSE LIGHTBOX
========================================== */

function closeLightbox() {

  lightbox?.classList.remove('open');

  lightbox?.setAttribute(
      'aria-hidden',
      'true'
  );

}


$('#closeLightbox')?.addEventListener(
  'click',
  closeLightbox
);


lightbox?.addEventListener('click', event => {

  if (event.target === lightbox) {

      closeLightbox();

  }

});


/* ==========================================
 ESCAPE KEY
========================================== */

document.addEventListener('keydown', event => {

  if (event.key === 'Escape') {

      closeRoute();

      closeLightbox();

  }

});


/* ==========================================
 SCROLL REVEAL ANIMATION
========================================== */

const revealObserver = new IntersectionObserver(

  entries => {

      entries.forEach(entry => {

          if (entry.isIntersecting) {

              entry.target.classList.add(
                  'visible'
              );

              revealObserver.unobserve(
                  entry.target
              );

          }

      });

  },

  {
      threshold: 0.12
  }

);


$$('.reveal').forEach(element => {

  revealObserver.observe(element);

});


/* ==========================================
 ACTIVE NAVIGATION
========================================== */

const sections = $$('main section[id]');

const navigationLinks = $$('#mainNav a');


const sectionObserver = new IntersectionObserver(

  entries => {

      entries.forEach(entry => {

          if (entry.isIntersecting) {

              navigationLinks.forEach(link => {

                  link.classList.toggle(

                      'active',

                      link.hash ===

                      '#' + entry.target.id

                  );

              });

          }

      });

  },

  {

      rootMargin: '-35% 0px -55% 0px'

  }

);


sections.forEach(section => {

  sectionObserver.observe(section);

});

