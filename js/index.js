const tagContainer = document.querySelector('.tag__container');
const input = document.querySelector('.tag__container input');

let tags = [];

function createTag(label) {
    // Create div for tag
    const div = document.createElement('div');
    div.setAttribute('class', 'tag');
    // Create span for tag
    const span = document.createElement('span');
    span.innerHTML = label;
    // Create close element
    const closeIcon = document.createElement('i');
    closeIcon.setAttribute('class', 'fa fa times');
    closeIcon.setAttribute('data-item', label);
    div.appendChild(span);
    div.appendChild(closeIcon);
    return div;
}

// Function to clear Tags
function clearTags() {
    document.querySelectorAll('.tag').forEach(tag => {
        tag.parentElement.removeChild(tag);
    });
}

// Add tags to input field
function addTags() {
    clearTags();
    tags.slice().reverse().forEach(tag => {
        tagContainer.prepend(createTag(tag));
    });
}

// Add event listener on input
input.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        e.target.value.split(',').forEach(tag => {
            tags.push(tag);
        });
        addTags();
        displayTags();
        input.value = '';
    }
});
document.addEventListener('click', (e) => {
    if (e.target.tagName === 'I') {
        const tagLabel = e.target.getAttribute('date-item');
        const index = tags.indexOf(tagLabel);
        tags = [...tags.slice(0, index), ...tags.slice(index + 1)];
        addTags();
        displayTags();
    }
})

