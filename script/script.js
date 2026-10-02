const filterNav = document.querySelector('[data-filters]');
const projects = [...document.querySelectorAll('.project[data-tags]')];
const filterButtons = [...document.querySelectorAll('.filter-button')];
const tagButtons = [...document.querySelectorAll('.project-tags button[data-filter]')];
const allFilterButtons = [...filterButtons, ...tagButtons];

projects.forEach((project) => {
  const info = project.querySelector('.project-info');
  const meta = info?.querySelector('.project-meta');
  const title = info?.querySelector('.project-title');
  const tags = info?.querySelector('.project-tags');

  if (!info || !meta || !title || !tags) return;

  const details = document.createElement('div');
  details.className = 'project-details';
  details.append(meta, title, tags);
  info.prepend(details);
});

const applyFilter = (selectedFilter) => {
  projects.forEach((project) => {
    const tags = project.dataset.tags.split(' ');
    const shouldShow = selectedFilter === 'all' || tags.includes(selectedFilter);
    project.classList.toggle('is-hidden', !shouldShow);
  });

  allFilterButtons.forEach((filterButton) => {
    const isActive = filterButton.dataset.filter === selectedFilter;
    filterButton.classList.toggle('is-active', isActive);
    filterButton.setAttribute('aria-pressed', String(isActive));
  });
};

if (filterNav || filterButtons.length > 0) {
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => applyFilter(button.dataset.filter));
  });
}

if (tagButtons.length > 0) {
  tagButtons.forEach((button) => {
    button.addEventListener('click', () => applyFilter(button.dataset.filter));
  });
}

const carousels = document.querySelectorAll('[data-carousel]');

carousels.forEach((carousel) => {
  const track = carousel.querySelector('.carousel-track');
  const slides = [...carousel.querySelectorAll('.slide')];
  const prevBtn = carousel.querySelector('.prev');
  const nextBtn = carousel.querySelector('.next');
  const dotsWrap = carousel.querySelector('.car-dots');

  if (!track || slides.length === 0 || !prevBtn || !nextBtn) return;

  slides.forEach((slide) => {
    const image = slide.querySelector('img');
    if (!image) return;

    const markOrientation = () => {
      if (image.naturalHeight > image.naturalWidth) {
        slide.classList.add('is-portrait');
      }
    };

    if (image.complete) {
      markOrientation();
    } else {
      image.addEventListener('load', markOrientation, { once: true });
    }
  });

  let index = 0;
  let videoPlaying = false;
  let autoPlay;

  const stopAutoPlay = () => {
    clearInterval(autoPlay);
  };

  const startAutoPlay = () => {
    if (videoPlaying) return;
    stopAutoPlay();
    autoPlay = setInterval(() => showSlide(index + 1), 5000);
  };

  const updateDots = () => {
    const dots = [...dotsWrap.querySelectorAll('.car-dot')];
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle('is-active', dotIndex === index);
    });
  };

  const buildDots = () => {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = '';
    slides.forEach((_, dotIndex) => {
      const dot = document.createElement('span');
      dot.className = 'car-dot';
      if (dotIndex === 0) dot.classList.add('is-active');
      dotsWrap.appendChild(dot);
    });
    updateDots();
  };

  const showSlide = (newIndex) => {
    if (videoPlaying) return;
    if (newIndex < 0) newIndex = slides.length - 1;
    if (newIndex >= slides.length) newIndex = 0;
    index = newIndex;
    track.style.transform = `translateX(-${index * 100}%)`;
    updateDots();
  };

  prevBtn.addEventListener('click', () => showSlide(index - 1));
  nextBtn.addEventListener('click', () => showSlide(index + 1));

  buildDots();

  startAutoPlay();

  const video = carousel.querySelector('.project-video');
  if (video && video.tagName === 'IFRAME' && window.Vimeo) {
    const player = new Vimeo.Player(video);

    player.on('play', () => {
      videoPlaying = true;
      stopAutoPlay();
    });

    player.on('pause', () => {
      videoPlaying = false;
      startAutoPlay();
    });

    player.on('ended', () => {
      videoPlaying = false;
      startAutoPlay();
    });
  }

  carousel.addEventListener('mouseenter', stopAutoPlay);
  carousel.addEventListener('mouseleave', startAutoPlay);

  carousel.addEventListener('focusin', stopAutoPlay);
  carousel.addEventListener('focusout', startAutoPlay);
});
