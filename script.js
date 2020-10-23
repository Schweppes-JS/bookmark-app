const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');
const bookmarksConatainer = document.getElementById('bookmarks-container');

let bookmarks = {};

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

// Build bookmarks DOM
function buildBookmarks() {
    // Remove all bookmark elements
    bookmarksConatainer.textContent = '';
    // Build items
    Object.keys(bookmarks).forEach((id) => {
        // Item
        const item = document.createElement('div');
        item.classList.add('item');
        // Close Icon
        const closeIcon = document.createElement('i');
        closeIcon.classList.add('fas', 'fa-times');
        closeIcon.setAttribute('title', 'Delete bookmark');
        closeIcon.setAttribute('onclick', `deleteBookmark('${id}')`);
        // Favicon / Link container
        const linkInfo = document.createElement('div');
        linkInfo.classList.add('name');
        // Favicon
        const favicon = document.createElement('img');
        favicon.setAttribute('src', `https://s2.googleusercontent.com/s2/favicons?domain=${bookmarks[id]}`);
        favicon.setAttribute('alt', 'Favicon');
        // Link
        const link = document.createElement('a');
        link.setAttribute('href', `${bookmarks[id]}`);
        link.setAttribute('target', '_blank');
        link.textContent = id;
        // Append to bookmarks container
        linkInfo.append(favicon, link);
        item.append(closeIcon, linkInfo);
        bookmarksConatainer.appendChild(item);
    })
}

// Fetch bookmarks
function fetchBookmarks() {
    if (localStorage.getItem('bookmarks')) {
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    } else {
        // Create bookmarks array in localStorage
        const id = 'Schweppes-JS';
        bookmarks[id] = 'https://github.com/Schweppes-JS';
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    buildBookmarks();
}

// Delete bookmark
function deleteBookmark(id) {
    // Loop through the bookmarks array
    if (bookmarks[id]) {
        delete bookmarks[id];
    }
    // Update bookmarks array in localStorage, re-populate DOM
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
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
    bookmarks[nameValue] = urlValue;
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

