const themeToggle =
document.getElementById(
    "themeToggle"
);

const themeIcon =
document.getElementById(
    "themeIcon"
);

themeToggle.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "dark"
        );

        const dark =
        document.body.classList.contains(
            "dark"
        );

        if (dark) {

            themeIcon.className =
            "fas fa-sun sun-active";

        } else {

            themeIcon.className =
            "fas fa-moon";
        }
    }
);

const avatar =
document.getElementById(
    "avatar"
);

const profileMenu =
document.getElementById(
    "profileMenu"
);

avatar.addEventListener(
    "click",
    () => {

        profileMenu.classList.toggle(
            "show"
        );
    }
);

document.addEventListener(
    "click",
    (event) => {

        if (
            !avatar.contains(event.target)
            &&
            !profileMenu.contains(
                event.target
            )
        ) {

            profileMenu.classList.remove(
                "show"
            );
        }
    }
);

const analyzeBtn =
document.getElementById(
    "analyzeBtn"
);

analyzeBtn.addEventListener(
    "click",
    analyzeEmail
);

async function analyzeEmail() {

    try {

        analyzeBtn.innerHTML =
        "Analyzing...";

        const response =
await fetch(
    "http://localhost:8000/api/ai/classify",
    {
        method: "POST",
        headers: {
            "Content-Type":
            "application/json"
        },
        body: JSON.stringify({
            email_text: `...`
        })
    }
);

if (!response.ok) {

    const text =
    await response.text();

    console.log(
        "Backend Error:",
        text
    );

    throw new Error(text);
}

    const data =
    await response.json();

        updateUI(data);

    } catch(error) {

        console.error(error);

        alert(
            "Backend connection failed"
        );

    } finally {

        analyzeBtn.innerHTML =
        "✦ Analyze Email";
    }
}

function updateUI(data) {

    document.getElementById(
        "priorityText"
    ).textContent =
    data.priority >= 75
        ? "High Priority"
        : data.priority >= 50
        ? "Medium Priority"
        : "Low Priority";

    document.getElementById(
        "categoryText"
    ).textContent =
    data.category;

    document.getElementById(
        "summaryText"
    ).textContent =
    data.summary;

    document.getElementById(
        "replyText"
    ).textContent =
    data.suggested_reply;

    const actionsList =
    document.getElementById(
        "actionsList"
    );

    actionsList.innerHTML = "";

    data.actions.forEach(
        action => {

            const li =
            document.createElement(
                "li"
            );

            li.textContent =
            action;

            actionsList.appendChild(
                li
            );
        }
    );
}