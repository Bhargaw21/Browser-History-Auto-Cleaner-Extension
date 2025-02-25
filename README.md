🛡️ History Auto-Cleaner
Automatically deletes browser history after a set time with enhanced privacy controls.

🚀 Features
✅ Auto-Clears History after a specified time (default: 10 mins)
✅ Custom Time Intervals per website
✅ Toggle On/Off anytime
✅ Manual Cleanup Button in popup
✅ Desktop Notifications when history is cleared
✅ Sync Settings Across Devices via Chrome Sync

📦 Installation
Download the repository or clone it:
sh
Copy
Edit
git clone https://github.com/your-repo/history-auto-cleaner.git
Go to Chrome Extensions Page:
Open chrome://extensions/ in your browser.
Enable Developer Mode:
Toggle "Developer Mode" on the top-right.
Load the Extension:
Click "Load unpacked" → Select the project folder.
Enjoy Privacy! 🎉
🛠️ How It Works
The extension checks history every 5 minutes and deletes entries older than the set interval.
The popup UI allows setting different cleanup intervals for specific websites.
Service Worker remains active to ensure continuous cleanup.
Click "Clear History Now" to manually wipe history instantly.
📜 Files & Structure
bash
Copy
Edit
📂 History Auto-Cleaner/
│── 📜 manifest.json       # Chrome extension manifest  
│── 📜 background.js       # Handles history deletion & alarms  
│── 📜 popup.html          # User interface  
│── 📜 popup.js            # Controls UI & storage sync  
│── 📜 styles.css          # UI styling  
│── 📜 icon.png            # Extension icon  
🔧 Customization
Modify the default cleanup interval in popup.js.
Customize the notification messages in background.js.
Change the popup UI (popup.html & styles.css).
📢 Support & Feedback
For issues or improvements, open a pull request or create an issue! 🚀
