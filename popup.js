document.addEventListener("DOMContentLoaded", function () {
    let toggleEnabled = document.getElementById("toggleEnabled");
    let intervalInput = document.getElementById("interval");
    let clearHistoryBtn = document.getElementById("clearHistory");
    let siteInput = document.getElementById("siteInput");
    let siteInterval = document.getElementById("siteInterval");
    let addSiteBtn = document.getElementById("addSite");
    let siteList = document.getElementById("siteList");
    let statusText = document.getElementById("statusText");

    // Load settings
    chrome.storage.sync.get(["enabled", "interval", "siteIntervals"], function (data) {
        toggleEnabled.checked = data.enabled || false;
        intervalInput.value = data.interval || 10;
        statusText.textContent = toggleEnabled.checked ? "Enabled" : "Disabled";

        let siteIntervals = data.siteIntervals || {};
        for (let site in siteIntervals) {
            addSiteToList(site, siteIntervals[site]);
        }
    });

    // Toggle switch event
    toggleEnabled.addEventListener("change", function () {
        chrome.storage.sync.set({ enabled: toggleEnabled.checked });
        statusText.textContent = toggleEnabled.checked ? "Enabled" : "Disabled";
    });

    // Interval input event
    intervalInput.addEventListener("change", function () {
        let interval = parseInt(intervalInput.value);
        if (interval > 0) {
            chrome.storage.sync.set({ interval: interval });
        }
    });

    // Clear history now
    clearHistoryBtn.addEventListener("click", function () {
        chrome.runtime.sendMessage({ action: "clearHistoryNow" }, function (response) {
            alert(response.status);
        });
    });

    // Add site with custom interval
    addSiteBtn.addEventListener("click", function () {
        let site = siteInput.value.trim();
        let interval = parseInt(siteInterval.value);
        if (site && interval > 0) {
            chrome.storage.sync.get(["siteIntervals"], function (data) {
                let siteIntervals = data.siteIntervals || {};
                siteIntervals[site] = interval;
                chrome.storage.sync.set({ siteIntervals: siteIntervals });
                addSiteToList(site, interval);
            });
        }
    });

    function addSiteToList(site, interval) {
        let li = document.createElement("li");
        li.textContent = `${site}: ${interval} mins `;
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.addEventListener("click", function () {
            chrome.storage.sync.get(["siteIntervals"], function (data) {
                let siteIntervals = data.siteIntervals || {};
                delete siteIntervals[site];
                chrome.storage.sync.set({ siteIntervals: siteIntervals });
                li.remove();
            });
        });
        li.appendChild(deleteBtn);
        siteList.appendChild(li);
    }
});
