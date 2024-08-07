function disableDevice(type) {
  const selector = `button[data-is-muted="false"][aria-label*="${type}"]`;
  const button = document.querySelector(selector);
  if (button) {
    button.click();
    console.log(`meet-privacy-ext: ${type} disabled`);
  } else {
    console.log(`meet-privacy-ext: ${type} button not found or ${type} already disabled`);
  }
}

function disableDevices() {
  disableDevice('microphone');
  disableDevice('camera');
}

function waitForMeetingLoad(callback) {
  const checkInterval = setInterval(() => {
    const toolbar = document.querySelector('.fJsklc.nulMpf.Didmac.G03iKb');
    if (toolbar) {
      clearInterval(checkInterval);
      setTimeout(callback, 1000);
    }
  }, 500);
}

function init() {
  console.log('meet-privacy-ext: Initializing');
  waitForMeetingLoad(disableDevices);
}

// Run on initial page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Run on subsequent navigations or reloads
window.addEventListener('load', init);

// Also run when the URL changes (for single-page app navigation)
let lastUrl = location.href; 
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    init();
  }
}).observe(document, {subtree: true, childList: true});