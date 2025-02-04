// Dummy Novel Data (Replace with backend if needed)
let novels = [
    {
        id: 1,
        title: "A song of ice and fire",
        description: "An epic tale of magic and dragons.",
        chapters: [
            { id: 1, title: "Chapter 1: The Beginning", content: "Once upon a time..." },
            { id: 2, title: "Chapter 2: The queen", content: "The queen set out on a quest..." }
        ]
    },
    {
        id: 2,
        title: "Lord of Mystries",
        description: "A prehistoric tales of gods and madness.",
        chapters: [
            { id: 1, title: "Chapter 1: A New World", content: "aa..my head hurts,where am I..." },
            { id: 2, title: "Chapter 2: beyonder Encounter", content: "beyonder are the wicked souls who fight with madness..." }
        ]
    }
];

// Load Novels to Display on Home Page
function loadNovels() {
    let novelList = document.getElementById("novel-list");
    novelList.innerHTML = "";

    novels.forEach(novel => {
        let novelCard = document.createElement("div");
        novelCard.className = "novel-card";
        novelCard.innerHTML = `
            <h3>${novel.title}</h3>
            <p>${novel.description}</p>
            <button onclick="openNovel(${novel.id})">Read More</button>
        `;
        novelList.appendChild(novelCard);
    });
}

// Open Novel Page
function openNovel(novelId) {
    localStorage.setItem("currentNovel", novelId);
    window.location.href = "novel.html";
}

// Load Novel Details Page
function loadNovelDetails() {
    let novelId = localStorage.getItem("currentNovel");
    let novel = novels.find(n => n.id == novelId);

    if (!novel) return;

    document.getElementById("novel-title").innerText = novel.title;
    document.getElementById("novel-description").innerText = novel.description;

    let chapterList = document.getElementById("chapter-list");
    chapterList.innerHTML = "";

    novel.chapters.forEach(chapter => {
        let chapterItem = document.createElement("li");
        chapterItem.innerHTML = `<a href="chapter.html?novel=${novelId}&chapter=${chapter.id}">${chapter.title}</a>`;
        chapterList.appendChild(chapterItem);
    });
}

// Load Chapter Page
function loadChapter() {
    let urlParams = new URLSearchParams(window.location.search);
    let novelId = urlParams.get("novel");
    let chapterId = urlParams.get("chapter");

    let novel = novels.find(n => n.id == novelId);
    let chapter = novel ? novel.chapters.find(c => c.id == chapterId) : null;

    if (!chapter) return;

    document.getElementById("chapter-title").innerText = chapter.title;
    document.getElementById("chapter-content").innerText = chapter.content;
}

// Bookmark Novel
function bookmarkNovel() {
    let novelId = localStorage.getItem("currentNovel");
    localStorage.setItem("bookmarkedNovel", novelId);
    alert("Novel bookmarked!");
}

// Load Bookmarked Novel
function loadBookmarkedNovel() {
    let bookmarkedId = localStorage.getItem("bookmarkedNovel");
    let novel = novels.find(n => n.id == bookmarkedId);

    if (novel) {
        document.getElementById("bookmarked-novel").innerText = novel.title;
    }
}

// Sign-Up Function
function signUp() {
    let username = document.getElementById("signup-username").value;
    let password = document.getElementById("signup-password").value;

    if (username && password) {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        
        if (users.some(user => user.username === username)) {
            alert("Username already exists!");
            return;
        }

        users.push({ username, password });
        localStorage.setItem("users", JSON.stringify(users));
        alert("Account created! Redirecting to login...");
        window.location.href = "index.html";
    }
}

// Login Function
function login() {
    let username = document.getElementById("login-username").value;
    let password = document.getElementById("login-password").value;
    let users = JSON.parse(localStorage.getItem("users")) || [];

    let validUser = users.find(user => user.username === username && user.password === password);

    if (validUser) {
        localStorage.setItem("loggedIn", username);
        window.location.href = "home.html";
    } else {
        alert("Invalid username or password.");
    }
}

// Logout Function
function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "index.html";
}

// Check Login
function checkLogin() {
    if (!localStorage.getItem("loggedIn")) {
        window.location.href = "index.html";
    }
}

