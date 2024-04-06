document.addEventListener("DOMContentLoaded", function () {
  const pages = document.querySelectorAll('.page');
  const windowHeight = window.innerHeight;

  document.body.style.scrollSnapType = 'y mandatory';

  pages.forEach(page => {
    page.style.height = windowHeight + 'px';
  });

  window.addEventListener('wheel', function (event) {
    const delta = event.deltaY;
    if (delta > 0) {
      scrollToNextPage();
    } else {
      scrollToPrevPage();
    }
  });

  function scrollToNextPage() {
    const currentPageIndex = getCurrentPageIndex();
    if (currentPageIndex < pages.length - 1) {
      const nextPage = pages[currentPageIndex + 1];
      nextPage.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function scrollToPrevPage() {
    const currentPageIndex = getCurrentPageIndex();
    if (currentPageIndex > 0) {
      const prevPage = pages[currentPageIndex - 1];
      prevPage.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function getCurrentPageIndex() {
    let currentIndex = 0;
    let minDistance = Number.MAX_SAFE_INTEGER;
    pages.forEach((page, index) => {
      const distance = Math.abs(page.getBoundingClientRect().top);
      if (distance < minDistance) {
        minDistance = distance;
        currentIndex = index;
      }
    });
    return currentIndex;
  }
});
