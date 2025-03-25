chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.session.set({ redirected: false });
});

chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
  const { redirected } = await chrome.storage.session.get("redirected");
  if (!redirected) {
    chrome.declarativeNetRequest.updateEnabledRulesets({ enableRulesetIds: ["amazon_redirect_rules"] });
    await chrome.storage.session.set({ redirected: true });
  } else {
    chrome.declarativeNetRequest.updateEnabledRulesets({ disableRulesetIds: ["amazon_redirect_rules"] });
  }
}, { url: [{ hostContains: "amazon.it" }] });
