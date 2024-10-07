function disableDevice(type) {
  const selectors = [
    `button[data-is-muted="false"][aria-label*="${type}"]`,
    `button[aria-label*="${type}"][aria-pressed="false"]`,
  ]

  let button = null
  for (const selector of selectors) {
    button = document.querySelector(selector)
    if (button) break
  }

  if (button) {
    button.click()
    console.log(`meet-privacy-ext: ${type} disabled`)
  } else {
    console.log(
      `meet-privacy-ext: ${type} button not found or ${type} already disabled`,
    )
  }
}

function disableDevices() {
  disableDevice('microphone')
  disableDevice('camera')
}

function waitForMeetingLoad(callback) {
  const observer = new MutationObserver((_, obs) => {
    const toolbar = document.querySelector('.fJsklc.nulMpf.Didmac.G03iKb')
    if (toolbar) {
      obs.disconnect()
      setTimeout(callback, 500)
    }
  })

  observer.observe(document, { childList: true, subtree: true })
}

function init() {
  console.log('meet-privacy-ext: Initializing')
  waitForMeetingLoad(disableDevices)
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}

window.addEventListener('load', init)

let lastUrl = location.href
new MutationObserver((mutations) => {
  const url = location.href
  if (url !== lastUrl) {
    lastUrl = url
    init()
  }
}).observe(document, { subtree: true, childList: true })