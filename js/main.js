const tag_active_class = 'tag-active';
const search_hidden_class = 'search-hidden'
const close_tag_class = 'close-tag';
const tag_class = 'tag';

// Job Listing information
const jobsListings = [{
        "id": 1,
        "company": "Photosnap",
        "logo": "./images/photosnap.svg",
        "new": true,
        "featured": true,
        "position": "Senior Frontend Developer",
        "role": "Frontend",
        "level": "Senior",
        "postedAt": "1d ago",
        "contract": "Full Time",
        "location": "USA Only",
        "languages": ["HTML", "CSS", "JavaScript"],
        "tools": []
    },
    {
        "id": 2,
        "company": "Manage",
        "logo": "./images/manage.svg",
        "new": true,
        "featured": true,
        "position": "Fullstack Developer",
        "role": "Fullstack",
        "level": "Midweight",
        "postedAt": "1d ago",
        "contract": "Part Time",
        "location": "Remote",
        "languages": ["Python"],
        "tools": ["React"]
    },
    {
        "id": 3,
        "company": "Account",
        "logo": "./images/account.svg",
        "new": true,
        "featured": false,
        "position": "Junior Frontend Developer",
        "role": "Frontend",
        "level": "Junior",
        "postedAt": "2d ago",
        "contract": "Part Time",
        "location": "USA Only",
        "languages": ["JavaScript"],
        "tools": ["React", "Sass"]
    },
    {
        "id": 4,
        "company": "MyHome",
        "logo": "./images/myhome.svg",
        "new": false,
        "featured": false,
        "position": "Junior Frontend Developer",
        "role": "Frontend",
        "level": "Junior",
        "postedAt": "5d ago",
        "contract": "Contract",
        "location": "USA Only",
        "languages": ["CSS", "JavaScript"],
        "tools": []
    },
    {
        "id": 5,
        "company": "Loop Studios",
        "logo": "./images/loop-studios.svg",
        "new": false,
        "featured": false,
        "position": "Software Engineer",
        "role": "FullStack",
        "level": "Midweight",
        "postedAt": "1w ago",
        "contract": "Full Time",
        "location": "Worldwide",
        "languages": ["JavaScript"],
        "tools": ["Ruby", "Sass"]
    },
    {
        "id": 6,
        "company": "FaceIt",
        "logo": "./images/faceit.svg",
        "new": false,
        "featured": false,
        "position": "Junior Backend Developer",
        "role": "Backend",
        "level": "Junior",
        "postedAt": "2w ago",
        "contract": "Full Time",
        "location": "UK Only",
        "languages": ["Ruby"],
        "tools": ["RoR"]
    },
    {
        "id": 7,
        "company": "Shortly",
        "logo": "./images/shortly.svg",
        "new": false,
        "featured": false,
        "position": "Junior Developer",
        "role": "Frontend",
        "level": "Junior",
        "postedAt": "2w ago",
        "contract": "Full Time",
        "location": "Worldwide",
        "languages": ["HTML", "JavaScript"],
        "tools": ["Sass"]
    },
    {
        "id": 8,
        "company": "Insure",
        "logo": "./images/insure.svg",
        "new": false,
        "featured": false,
        "position": "Junior Frontend Developer",
        "role": "Frontend",
        "level": "Junior",
        "postedAt": "2w ago",
        "contract": "Full Time",
        "location": "USA Only",
        "languages": ["JavaScript"],
        "tools": ["Vue", "Sass"]
    },
    {
        "id": 9,
        "company": "Eyecam Co.",
        "logo": "./images/eyecam-co.svg",
        "new": false,
        "featured": false,
        "position": "Full Stack Engineer",
        "role": "Fullstack",
        "level": "Midweight",
        "postedAt": "3w ago",
        "contract": "Full Time",
        "location": "Worldwide",
        "languages": ["JavaScript", "Python"],
        "tools": ["Django"]
    },
    {
        "id": 10,
        "company": "The Air Filter Company",
        "logo": "./images/the-air-filter-company.svg",
        "new": false,
        "featured": false,
        "position": "Front-end Dev",
        "role": "Frontend",
        "level": "Junior",
        "postedAt": "1mo ago",
        "contract": "Part Time",
        "location": "Worldwide",
        "languages": ["JavaScript"],
        "tools": ["React", "Sass"]
    }
];

//Function to get job tags

function getTagHTML (tag, tagClasses) {
    return `<span class="${tagClasses}">
        ${tag}
    </span>`;
}

// Function to get job information from jobData

function getJobListingHTML(jobData, filterTags = []) {
    const job_tags_placeholder = '###JOB_TAGS###';
    let displayNew = jobData.new ? "block" : "none";
    let featuredJob = jobData.featured ? "block" : "none";
     

    let jobsListingHTML = `
        <div class="jobs__item ${jobData.featured ? "job-card featured-job" : "job-card"}">
            <div class="jobs__column jobs__column-left">
                <img src="${jobData.logo}" alt = "${jobData.company}" class="jobs__img" />
                <div class="jobs__info">
                    <div class="company__info">
                        <span class="jobs__company">${jobData.company} </span>
                        <span class="highlighted new" style="display:${displayNew}">NEW!</span>
                        <span class="highlighted featured" style="display:${featuredJob}">FEATURED</span>
                    </div>

                    <span class="jobs__title">${jobData.position} </span>
                    <ul class="jobs__details">
                        <li class="jobs__details-item">${jobData.postedAt}</li> 
                        <li class="jobs__details-item">${jobData.contract}</li> 
                        <li class="jobs__details-item">${jobData.location}</li> 
                    </ul> 
                </div> 
            </div> 
            <div class="jobs__column jobs__column-right">
            ${job_tags_placeholder}</div> 
        </div>
    `;

    const tagsList = [
        jobData.role,
        jobData.level,
        ...(jobData.languages || []),
        ...(jobData.tools || [])
    ];
    const tagsListLowercase = tagsList.map(t => t && t.toLowerCase());
    const passesFilter = !filterTags.length || filterTags.every(tag => (
        tagsListLowercase.includes(tag && tag.toLowerCase())
    ));

    if (!passesFilter) {
        return '';
    }

    const tagString = tagsList.reduce((acc, currentTag) => {
        const activeClass = (filterTags.includes(currentTag) && tag_active_class) || '';

        return acc + getTagHTML(currentTag, `${tag_class} ${activeClass}`);
    }, '');

    return jobsListingHTML.replace(job_tags_placeholder, tagString);
};

function toggleClass(el, className) {
    if (el.classList.contains(className)) {
        el.classList.remove(className);

        return;
    }

    el.classList.add(className);
}

function getSearchBarTags(tagValue, searchContentEl) {
    let searchBarTags = Array.from(searchContentEl.children).map(node => node.innerHTML && node.innerHTML.trim()).filter(tag => !!tag);

    if (searchBarTags.includes(tagValue)) {
        searchBarTags = searchBarTags.filter(tag => tag !== tagValue);
    } else {
        searchBarTags = [...searchBarTags, tagValue];
    }

    return searchBarTags;
}

function setJobsListings(filterTags) {
    const jobsListingHTML = jobsListings.reduce((acc, currentListing) => {
        return acc + getJobListingHTML(currentListing, filterTags);
    }, '');

    document.getElementById('jobs').innerHTML = jobsListingHTML;
}


// Function to display search bar

function displaySearchWrapper(display = false) {
    const searchWrapper = document.getElementById('search');

    if (display) {
        searchWrapper.classList.remove(search_hidden_class);

        return;
    }

    searchWrapper.classList.add(search_hidden_class);
}


function setSearchbarContent(searchContentEl, tags) {
    searchContentEl.innerHTML = tags.reduce((acc, currentTag) => {
        return acc + getTagHTML(currentTag, close_tag_class);
    }, '');
}

function resetState(searchContentEl) {
    searchContentEl.innerHTML = '';

    setJobsListings();
    displaySearchWrapper(false);
    toggleClass(targetEl, tag_active_class);
}


window.addEventListener('click', (event) => {
    const targetEl = event.target;
    const targetText = targetEl.innerHTML.trim();
    const searchContentEl = document.getElementById('search-content');
    const searchBarTags = getSearchBarTags(targetText, searchContentEl);

    if (targetEl.id === 'clear' || !searchBarTags.length) {
        resetState(searchContentEl);

        return;
    }

    if (![tag_class, close_tag_class].some(c => targetEl.classList.contains(c))) {
        return;
    }

    setSearchbarContent(searchContentEl, searchBarTags);
    toggleClass(targetEl, tag_active_class);
    displaySearchWrapper(searchBarTags.length > 0);
    setJobsListings(searchBarTags);
});

setJobsListings();