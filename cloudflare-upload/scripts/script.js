(() => {
  'use strict';

  function initializeHeader() {
    const header = document.querySelector('.header');
    if (!header) return;

    const updateHeight = () => {
      document.documentElement.style.setProperty('--header-height', `${header.offsetHeight}px`);
    };

    updateHeight();
    new ResizeObserver(updateHeight).observe(header);
  }

  function initializeSurvey() {
    const toggle = document.querySelector('.survey-toggle__btn');
    const survey = document.querySelector('.survey');
    const form = document.querySelector('.survey__form');
    const popup = document.querySelector('.thank-you-popup');
    const closePopupButton = document.querySelector('.thank-you-popup__close-btn');

    if (!toggle || !survey || !form || !popup || !closePopupButton) return;

    function setSurveyVisible(visible) {
      survey.classList.toggle('survey--visible', visible);
      toggle.setAttribute('aria-expanded', String(visible));
    }

    function setPopupVisible(visible) {
      popup.classList.toggle('thank-you-popup--visible', visible);
      (visible ? closePopupButton : toggle).focus({ preventScroll: true });
    }

    function handleClick(event) {
      const control = event.target.closest('button, a[href="#survey"]');
      if (!control) return;

      if (control === toggle) {
        setSurveyVisible(!survey.classList.contains('survey--visible'));
      } else if (control.matches('.survey__close-btn')) {
        setSurveyVisible(false);
        toggle.focus({ preventScroll: true });
      } else if (control === closePopupButton) {
        setPopupVisible(false);
      } else if (control.matches('a[href="#survey"]')) {
        event.preventDefault();
        setSurveyVisible(true);
      }
    }

    function handleSubmit(event) {
      event.preventDefault();
      setSurveyVisible(false);
      setPopupVisible(true);
    }

    function handlePopupKeydown(event) {
      if (!popup.classList.contains('thank-you-popup--visible')) return;

      // The dialog has one control: retain keyboard focus until it is closed.
      if (event.key === 'Tab') {
        event.preventDefault();
        closePopupButton.focus();
      } else if (event.key === 'Escape') {
        setPopupVisible(false);
      }
    }

    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handlePopupKeydown);
    form.addEventListener('submit', handleSubmit);
  }

  initializeHeader();
  initializeSurvey();
})();
