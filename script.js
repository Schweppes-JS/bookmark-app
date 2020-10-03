const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');
const bookmarksConatainer = document.getElementById('bookmarks-container');

let bookmarks = [];

// Show modalm, Focus on input
function showModal() {
    modal.classList.add('show-modal');
    websiteNameEl.focus();
}

// Validate form
function validate(nameValue, urlValue) {
    const experssion = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    const regex = new RegExp(experssion);
    if (!nameValue || !nameValue) {
        alert('Please submit values for both fields');
        return false;
    }
    if (!urlValue.match(regex)) {
        alert('Please provide a valid web address');
        return false;
    }
    // Valid
    return true;
}

// Fetch bookmarks
function fetchBookmarks() {
    if (localStorage.getItem('bookmarks')) {
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    } else {
        // Create bookmarks array in localStorage
        bookmarks = [
            {
                name: "Schweppes-JS",
                url: 'https://github.com/Schweppes-JS',
            }
        ];
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
}

// Handle data from from
function storeBookmark(e) {
    e.preventDefault();
    const nameValue = websiteNameEl.value;
    let urlValue = websiteUrlEl.value;
    if (!urlValue.includes('http://', 'https://')) {
        urlValue = `https://${urlValue}`;
    }
    if (!validate(nameValue, urlValue)) {
        return false;
    }
    const bookmark = {
        name: nameValue,
        url: urlValue
    };
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
    bookmarkForm.reset();
    websiteUrlEl.focus();
}

// Modal event listeners
modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click', () => modal.classList.remove('show-modal'));
window.addEventListener('click', (e) => (e.target === modal ? modal.classList.remove('show-modal') : false));
bookmarkForm.addEventListener('submit', storeBookmark);

// On load, fetcn bookmarks
fetchBookmarks();

