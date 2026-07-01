const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const avatar = document.getElementById("avatar");
const profileMenu = document.getElementById("profileMenu");

// Theme Toggle
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const dark = document.body.classList.contains("dark");
    themeIcon.className = dark ? "fas fa-sun sun-active" : "fas fa-moon";
});

if (avatar && profileMenu) {
    avatar.addEventListener("click", () => {
        profileMenu.classList.toggle("show");
    });

    document.addEventListener("click", (event) => {
        if (!avatar.contains(event.target) && !profileMenu.contains(event.target)) {
            profileMenu.classList.remove("show");
        }
    });
}

const extAccount = document.getElementById("extAccount");
if (extAccount) {
    extAccount.addEventListener("click", () => {
        window.open("http://localhost:5173/profile", "_blank");
    });
}

const extLogout = document.getElementById("extLogout");
if (extLogout) {
    extLogout.addEventListener("click", async () => {
        chrome.tabs.query({}, (tabs) => {
            const dashboardTabs = tabs.filter(t => t.url && t.url.includes("localhost:5173"));
            if (dashboardTabs.length > 0) {
                chrome.scripting.executeScript({
                    target: { tabId: dashboardTabs[0].id },
                    func: () => {
                        localStorage.removeItem("session_id");
                        localStorage.removeItem("user");
                        window.location.href = "/login";
                    }
                });
            }
        });
        showUnauthView();
    });
}

const extLoginBtn = document.getElementById("extLoginBtn");
if (extLoginBtn) {
    extLoginBtn.addEventListener("click", () => {
        window.open("http://localhost:5173/login", "_blank");
    });
}

function showUnauthView() {
    document.getElementById("authView").style.display = "none";
    document.getElementById("avatarWrapper").style.display = "none";
    document.getElementById("unauthView").style.display = "block";
}

function showAuthView() {
    document.getElementById("unauthView").style.display = "none";
    document.getElementById("authView").style.display = "block";
    document.getElementById("avatarWrapper").style.display = "block";
}

// Tabs logic
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        tab.classList.add('active');
        document.getElementById(tab.dataset.target).classList.add('active');
    });
});

// Get Session ID from Web App
async function getSessionId() {
    return new Promise((resolve) => {
        // Query for all tabs and manually filter by URL
        chrome.tabs.query({}, (tabs) => {
            if (chrome.runtime.lastError) {
                resolve(null);
                return;
            }
            
            const dashboardTabs = tabs.filter(t => t.url && t.url.includes("localhost:5173"));
            if (dashboardTabs.length === 0) {
                resolve(null);
                return;
            }
            
            // Execute script to get session_id from localStorage
            chrome.scripting.executeScript({
                target: { tabId: dashboardTabs[0].id },
                func: () => localStorage.getItem("session_id")
            }, (results) => {
                if (chrome.runtime.lastError) {
                    console.error("Scripting error:", chrome.runtime.lastError);
                    resolve(null);
                    return;
                }
                if (results && results[0] && results[0].result) {
                    resolve(results[0].result);
                } else {
                    resolve(null);
                }
            });
        });
    });
}

// Load Stats
async function loadStats() {
    const sessionId = await getSessionId();
    if (!sessionId) {
        showUnauthView();
        return false;
    }

    showAuthView();
    try {
        const response = await fetch(`http://localhost:8000/api/emails/stats?session_id=${sessionId}`);
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        
        document.getElementById('statTotal').innerText = data.total_emails;
        document.getElementById('statUnread').innerText = data.unread_emails;
        document.getElementById('statHigh').innerText = data.high_priority;
        document.getElementById('statDeadlines').innerText = data.upcoming_deadlines;
        document.getElementById('statRecruiter').innerText = data.recruiter_emails;
        document.getElementById('statSpam').innerText = data.spam_emails;
        
        const now = new Date();
        document.getElementById('lastSyncTime').innerText = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        return true;
    } catch(err) {
        console.error(err);
        return false;
    }
}

// Sync Button
document.getElementById('syncBtn').addEventListener('click', async () => {
    const btn = document.getElementById('syncBtn');
    btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Syncing...`;
    
    // Simulate sync or tell backend to sync
    const success = await loadStats();
    
    if (success) {
        btn.innerHTML = `<i class="fas fa-check"></i> Synced`;
    } else {
        btn.innerHTML = `<i class="fas fa-times"></i> Failed`;
    }
    setTimeout(() => {
        btn.innerHTML = `<i class="fas fa-sync-alt"></i> Sync Inbox`;
    }, 2000);
});

// Load stats initially
loadStats();

// Email Analysis
const analyzeBtn = document.getElementById("analyzeBtn");

analyzeBtn.addEventListener("click", analyzeEmail);

async function analyzeEmail() {
    try {
        analyzeBtn.innerHTML = "Extracting...";
        
        // Find active tab
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        
        // Verify it's Gmail
        if (!tab.url.includes("mail.google.com")) {
            alert("Please open an email in Gmail first.");
            analyzeBtn.innerHTML = "✦ Analyze Current Email";
            return;
        }

        // Execute content script to get email body
        const injection = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => {
                // Simplified DOM extraction for Gmail body
                const emailBody = document.querySelector('.a3s.aiL');
                return emailBody ? emailBody.innerText : null;
            }
        });
        
        const emailText = injection[0].result;
        
        if (!emailText) {
            alert("Could not extract email content. Make sure an email is open.");
            analyzeBtn.innerHTML = "✦ Analyze Current Email";
            return;
        }

        analyzeBtn.innerHTML = "Analyzing with AI...";
        
        const sessionId = await getSessionId();
        if (!sessionId) {
            alert("Please login to MailMind Dashboard in another tab first.");
            analyzeBtn.innerHTML = "✦ Analyze Current Email";
            return;
        }

        const response = await fetch("http://localhost:8000/api/ai/classify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email_text: emailText.substring(0, 1000) }) // send first 1000 chars to avoid overload
        });

        if (!response.ok) {
            throw new Error("Backend Error");
        }

        const data = await response.json();
        updateAnalysisUI(data);

    } catch(error) {
        console.error(error);
        alert("Analysis failed. Is the backend running?");
    } finally {
        analyzeBtn.innerHTML = "✦ Analyze Current Email";
    }
}

function updateAnalysisUI(data) {
    document.getElementById("analysisResults").style.display = "block";
    
    document.getElementById("priorityText").textContent =
        data.priority >= 75 ? "High Priority" : data.priority >= 50 ? "Medium Priority" : "Low Priority";
        
    document.getElementById("categoryText").textContent = data.category;
    document.getElementById("summaryText").textContent = data.summary;
    document.getElementById("replyText").textContent = data.suggested_reply;

    const actionsList = document.getElementById("actionsList");
    actionsList.innerHTML = "";
    if (data.actions && data.actions.length > 0) {
        data.actions.forEach(action => {
            const li = document.createElement("li");
            li.textContent = action;
            actionsList.appendChild(li);
        });
    } else {
        actionsList.innerHTML = "<li>No specific actions needed</li>";
    }
}