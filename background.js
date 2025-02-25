// Function to delete browsing history
function clearHistory() {
    chrome.storage.sync.get(["enabled", "interval", "siteIntervals"], function (data) {
        if (!data.enabled) return; // Exit if the extension is turned off

        let globalInterval = data.interval || 10; // Default to 10 minutes if not set
        let siteIntervals = data.siteIntervals || {};
        let currentTime = Date.now();

        chrome.history.search({ text: "", maxResults: 1000 }, function (historyItems) {
            historyItems.forEach((item) => {
                let url;
                try {
                    url = new URL(item.url);
                } catch (e) {
                    console.warn("Skipping invalid URL:", item.url);
                    return;
                }
                
                let site = url.hostname;
                let minutesToKeep = siteIntervals[site] || globalInterval;
                let timeLimit = currentTime - minutesToKeep * 60 * 1000;

                if (item.lastVisitTime < timeLimit) {
                    chrome.history.deleteUrl({ url: item.url }, () => {
                        console.log("Deleted history:", item.url);
                    });
                }
            });

            // Send notification when history is cleared
            chrome.notifications.create({
                type: "basic",
                iconUrl: "icon.png",
                title: "History Auto-Cleaner",
                message: "Browsing history has been cleared!"
            });
        });
    });
}

// Keep service worker alive by logging activity periodically
setInterval(() => {
    console.log("Keeping service worker alive...");
}, 25 * 60 * 1000); // Every 25 minutes

// Set up an alarm to trigger clearing every 5 minutes
chrome.alarms.create("historyCleaner", { periodInMinutes: 5 });

// Listen for alarm event
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "historyCleaner") {
        console.log("History cleaner alarm triggered");
        clearHistory();
    }
});

// Run cleanup on startup
chrome.runtime.onStartup.addListener(() => {
    console.log("Service Worker Activated on Startup");
    clearHistory();
});

// Run cleanup on installation/update
chrome.runtime.onInstalled.addListener(() => {
    console.log("Service Worker Installed");
    clearHistory();
});

// Manual cleanup trigger
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "clearHistoryNow") {
        console.log("Manual history clear request received");
        clearHistory();
        sendResponse({ status: "History cleared manually" });
    }
});
