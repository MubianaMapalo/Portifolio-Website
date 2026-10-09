// ICT251 Activity 3 - JavaScript

// 1. Mobile navigation
const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");

menuButton.addEventListener("click", function () {
    navLinks.classList.toggle("open");

    const isOpen = navLinks.classList.contains("open");
    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
});

// Close the mobile menu after selecting a navigation link
document.querySelectorAll("#navLinks a").forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation menu");
    });
});


// 2. Expandable project details
document.querySelectorAll(".details-button").forEach(function (button) {
    button.addEventListener("click", function () {
        const details = button.nextElementSibling;
        const isHidden = details.classList.contains("hidden");

        details.classList.toggle("hidden");
        button.textContent = isHidden ? "Hide Details" : "Show Details";
        button.setAttribute("aria-expanded", isHidden);
    });
});


// 3. Project / skills search and filter
const projectSearch = document.getElementById("projectSearch");
const resetSearch = document.getElementById("resetSearch");
const projectCards = document.querySelectorAll(".project-card");
const searchMessage = document.getElementById("searchMessage");

function filterProjects() {
    const searchTerm = projectSearch.value.trim().toLowerCase();
    let visibleProjects = 0;

    projectCards.forEach(function (card) {
        const searchableText = card.dataset.search.toLowerCase();

        if (searchTerm === "" || searchableText.includes(searchTerm)) {
            card.style.display = "";
            visibleProjects++;
        } else {
            card.style.display = "none";
        }
    });

    if (searchTerm !== "" && visibleProjects === 0) {
        searchMessage.textContent = "No projects or skills match your search.";
    } else {
        searchMessage.textContent = "";
    }
}

projectSearch.addEventListener("input", filterProjects);

resetSearch.addEventListener("click", function () {
    projectSearch.value = "";
    filterProjects();
});


// 4. Gallery viewer
const galleryItems = [
    {
        title: "Photo 1",
        image: "images/photo1.jpg",
        caption: "[Photo 1 caption]"
    },
    {
        title: "Photo 2",
        image: "images/photo2.jpg",
        caption: "[Photo 2 caption]"
    },
    {
        title: "Photo 3",
        image: "images/photo3.jpg",
        caption: "[Photo 3 caption]"
    }
];

let currentPhoto = 0;

const previousPhoto = document.getElementById("previousPhoto");
const nextPhoto = document.getElementById("nextPhoto");
const galleryCaption = document.getElementById("galleryCaption");

function updateGallery() {
    galleryCaption.textContent = galleryItems[currentPhoto].title;
}

previousPhoto.addEventListener("click", function () {
    if (currentPhoto > 0) {
        currentPhoto--;
        updateGallery();
    }
});

nextPhoto.addEventListener("click", function () {
    if (currentPhoto < galleryItems.length - 1) {
        currentPhoto++;
        updateGallery();
    }
});

updateGallery();


// 5. Compulsory contact form validation and preview
const contactForm = document.getElementById("contactForm");
const formPreview = document.getElementById("formPreview");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";
    formPreview.textContent = "";

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    let valid = true;

    if (name === "") {
        nameError.textContent = "Please enter your name.";
        valid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        emailError.textContent = "Please enter your email.";
        valid = false;
    } else if (!emailPattern.test(email)) {
        emailError.textContent = "Please enter a valid email address.";
        valid = false;
    }

    if (message === "") {
        messageError.textContent = "Please enter a message.";
        valid = false;
    }

    if (!valid) {
        formPreview.textContent = "Please correct the errors above.";
        return;
    }

    // textContent is used for user-entered text for safety.
    const heading = document.createElement("h3");
    heading.textContent = "Form Data Validated";

    const nameParagraph = document.createElement("p");
    nameParagraph.textContent = "Name: " + name;

    const emailParagraph = document.createElement("p");
    emailParagraph.textContent = "Email: " + email;

    const messageParagraph = document.createElement("p");
    messageParagraph.textContent = "Message: " + message;

    const note = document.createElement("p");
    note.textContent =
        "The data was validated successfully. This is a browser demonstration only; no message was sent.";

    formPreview.appendChild(heading);
    formPreview.appendChild(nameParagraph);
    formPreview.appendChild(emailParagraph);
    formPreview.appendChild(messageParagraph);
    formPreview.appendChild(note);
});
