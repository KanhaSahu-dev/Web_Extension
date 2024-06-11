// Retrieve existing text from localStorage or initialize as empty string
let selectedTextStorage = localStorage.getItem('selectedTextStorage') || '';
const today = new Date().toISOString().split('T')[0];  // Get today's date in YYYY-MM-DD format
const fileName = `selected_text_${today}.txt`;

document.addEventListener('mouseup', function (e) {
    const selection = window.getSelection();
    const iconContainer = document.getElementById('selection-icons');

    if (selection.toString().length > 0) {
        const range = selection.getRangeAt(0).getBoundingClientRect();
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

        iconContainer.style.top = (range.top + scrollTop - iconContainer.offsetHeight - 5) + 'px';
        iconContainer.style.left = (range.left + scrollLeft) + 'px';
        iconContainer.style.display = 'flex';

        const selectedText = selection.toString();
        selectedTextStorage += selectedText + '\n\n';  // Append new selection with an empty line
        localStorage.setItem('selectedTextStorage', selectedTextStorage);  // Store updated text in localStorage
        navigator.clipboard.writeText(selectedText)
            .then(() => console.log('Text copied to clipboard'))
            .catch(err => console.error('Error copying text: ', err));

        const downloadLink = document.getElementById('download-link');
        downloadLink.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(selectedTextStorage);
        downloadLink.download = fileName;
    } else {
        iconContainer.style.display = 'none';
    }
});

document.addEventListener('mousedown', function (e) {
    const iconContainer = document.getElementById('selection-icons');
    if (!iconContainer.contains(e.target)) {
        iconContainer.style.display = 'none';
    }
});

// Inject HTML for the icon container
const iconContainerHTML = `
    <div id="selection-icons" class="icon-container" style="display:none; position:absolute; background:white; border:1px solid #ccc; padding:5px;">
        <a href="https://www.google.com" target="_blank">Google!</a>
        <a href="https://chat.openai.com" target="_blank">💬GPT</a>
        <a id="download-link" href="#">Save⬇️</a>
    </div>
`;
document.body.insertAdjacentHTML('beforeend', iconContainerHTML);
