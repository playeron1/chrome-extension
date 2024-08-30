chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension Installed');
  });
  
  chrome.action.onClicked.addListener(async (tab) => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content.js']
    });
  });
  