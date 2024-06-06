const fromText = document.querySelector(".from-text");
const toText = document.querySelector(".to-text");
const selectTags = document.querySelectorAll("select");
const exchangeIcon = document.querySelector(".exchange");
const translateBtn = document.querySelector("#translate-btn");
const icons = document.querySelectorAll(".row i");

// New buttons for voice input and output
const startRecording = document.getElementById("startRecording");
const stopRecording = document.getElementById("stopRecording");
const playTranslation = document.getElementById("playTranslation");

// Speech recognition setup
let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
let isRecording = false;

selectTags.forEach((tag, id) => {
    for (const country_code in countries) {
        // selecting English by default as From language and Korean as To language
        let selected = "";
        if (id === 0 && country_code === "en-GB") {
            selected = "selected";
        } else if (id === 1 && country_code === "ko-KP") {
            selected = "selected";
        }
        let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }
});

exchangeIcon.addEventListener("click", () => {
    // exchanging textarea and select tag values
    let tempText = fromText.value;
    let tempLang = selectTags[0].value;
    fromText.value = toText.value;
    selectTags[0].value = selectTags[1].value;
    toText.value = tempText;
    selectTags[1].value = tempLang;
});

translateBtn.addEventListener("click", () => {
    let text = fromText.value;
    let translateFrom = selectTags[0].value;
    let translateTo = selectTags[1].value;
    if (!text) return;
    toText.setAttribute("placeholder", "Translating...");
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    // fetching api response and returning it with parsing into a JavaScript object
    // and in another then method receiving that object
    fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
            toText.value = data.responseData.translatedText;
            toText.setAttribute("placeholder", "Translation");
        });
});

icons.forEach((icon) => {
    icon.addEventListener("click", ({ target }) => {
        if (target.classList.contains("copy-from")) {
            // if clicked icon has from id, copy the fromTextarea value else copy the toTextarea value
            navigator.clipboard.writeText(fromText.value);
        } else if (target.classList.contains("copy-to")) {
            navigator.clipboard.writeText(toText.value);
        } else if (target.classList.contains("speak-from")) {
            let utterance = new SpeechSynthesisUtterance(fromText.value);
            utterance.lang = selectTags[0].value;
            window.speechSynthesis.speak(utterance);
        } else if (target.classList.contains("speak-to")) {
            let utterance = new SpeechSynthesisUtterance(toText.value);
            utterance.lang = selectTags[1].value;
            window.speechSynthesis.speak(utterance);
        }
    });
});

// Adding voice input feature
startRecording.addEventListener("click", () => {
    if (!isRecording) {
        recognition.start();
        isRecording = true;
    }
});

stopRecording.addEventListener("click", () => {
    if (isRecording) {
        recognition.stop();
        isRecording = false;
    }
});

recognition.onresult = (event) => {
    const speechToText = event.results[0][0].transcript;
    fromText.value = speechToText;
    translateBtn.click();
};

recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
};

// Adding voice output feature
playTranslation.addEventListener("click", () => {
    let utterance = new SpeechSynthesisUtterance(toText.value);
    utterance.lang = selectTags[1].value;
    window.speechSynthesis.speak(utterance);
});

// Functions for the continent sidebar
function openContinentSidebar(continent) {
    var continentSidebar = document.getElementById("continentSidebar");
    var continentSidebarContent = document.getElementById("continentSidebarContent");

    // Replace the content in the continent sidebar based on the selected continent
    continentSidebarContent.innerHTML = generateCountryList(continent);

    // If the sidebar is off-screen, bring it into view; otherwise, push it off-screen
    if (continentSidebar.style.right === "-200px" || continentSidebar.style.right === "") {
        continentSidebar.style.right = "0";
        mainContent.style.marginRight = "200px";
    }
}

function closeContinentSidebar() {
    var continentSidebar = document.getElementById("continentSidebar");
    var mainContent = document.getElementById("main");

    // Close the continent sidebar
    continentSidebar.style.right = "-200px";
    mainContent.style.marginRight = "0";
}

function generateCountryList(continent) {
    // Replace this with your logic to get the list of countries for the selected continent
    var countries = getCountriesForContinent(continent);
    var listHTML = "<ul>";

    for (var i = 0; i < countries.length; i++) {
        listHTML += "<li>" + countries[i] + "</li>";
    }

    listHTML += "</ul>";
    return listHTML;
}

function getCountriesForContinent(continent) {
    // Replace this with your logic to retrieve the list of countries for the selected continent
    // For now, a simple example is provided
    var country_list = {
        'North America': ['Antigua and Barbuda', 'Bahamas', 'Barbados', 'Belize', 'Canada', 'Costa Rica', 'Cuba', 'Dominica', 'Dominican Republic', 'El Salvador', 'Grenada', 'Guatemala', 'Haiti', 'Honduras', 'Jamaica', 'Mexico', 'Nicaragua', 'Panama', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Trinidad and Tobago', 'United States'],
        'South America': ['Argentina', 'Bolivia', 'Brazil', 'Chile', 'Colombia', 'Ecuador', 'Guyana', 'Paraguay', 'Peru', 'Suriname', 'Uruguay', 'Venezuela'],
        'Europe': ['Albania', 'Andorra', 'Armenia', 'Austria', 'Azerbaijan', 'Belarus', 'Belgium', 'Bosnia and Herzegovina', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 'Estonia', 'Finland', 'France', 'Georgia', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Ireland', 'Italy', 'Kazakhstan', 'Kosovo', 'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Malta', 'Moldova', 'Monaco', 'Montenegro', 'Netherlands', 'North Macedonia', 'Norway', 'Poland', 'Portugal', 'Romania', 'Russia', 'San Marino', 'Serbia', 'Slovakia', 'Slovenia', 'Spain', 'Sweden', 'Switzerland', 'Turkey', 'Ukraine', 'United Kingdom', 'Vatican City'],
        'Asia': ['Afghanistan', 'Armenia', 'Azerbaijan', 'Bahrain', 'Bangladesh', 'Bhutan', 'Brunei', 'Cambodia', 'China', 'Cyprus', 'Georgia', 'India', 'Indonesia', 'Iran', 'Iraq', 'Israel', 'Japan', 'Jordan', 'Kazakhstan', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Lebanon', 'Malaysia', 'Maldives', 'Mongolia', 'Myanmar (Burma)', 'Nepal', 'North Korea', 'Oman', 'Pakistan', 'Palestine', 'Philippines', 'Qatar', 'Saudi Arabia', 'Singapore', 'South Korea', 'Sri Lanka', 'Syria', 'Taiwan', 'Tajikistan', 'Thailand', 'Timor-Leste', 'Turkey', 'Turkmenistan', 'United Arab Emirates', 'Uzbekistan', 'Vietnam', 'Yemen'],
        'Africa': ['Algeria', 'Angola', 'Benin', 'Botswana', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cameroon', 'Central African Republic', 'Chad', 'Comoros', 'Democratic Republic of the Congo', 'Djibouti', 'Egypt', 'Equatorial Guinea', 'Eritrea', 'Eswatini', 'Ethiopia', 'Gabon', 'Gambia', 'Ghana', 'Guinea', 'Guinea-Bissau', 'Ivory Coast', 'Kenya', 'Lesotho', 'Liberia', 'Libya', 'Madagascar', 'Malawi', 'Mali', 'Mauritania', 'Mauritius', 'Morocco', 'Mozambique', 'Namibia', 'Niger', 'Nigeria', 'Rwanda', 'Sao Tome and Principe', 'Senegal', 'Seychelles', 'Sierra Leone', 'Somalia', 'South Africa', 'South Sudan', 'Sudan', 'Tanzania', 'Togo', 'Tunisia', 'Uganda', 'Zambia', 'Zimbabwe'],
        'Australia': ['Australia', 'Fiji', 'Kiribati', 'Marshall Islands', 'Micronesia', 'Nauru', 'New Zealand', 'Palau', 'Papua New Guinea', 'Samoa', 'Solomon Islands', 'Tonga', 'Tuvalu', 'Vanuatu']
    };

    return country_list[continent] || [];
}

// Drag-to-Scroll functionality
const ele = document.getElementById('container');
let pos = { top: 0, left: 0, x: 0, y: 0 };

const mouseDownHandler = function(e) {
    ele.style.cursor = 'grabbing';
    ele.style.userSelect = 'none';

    pos = {
        left: ele.scrollLeft,
        top: ele.scrollTop,
        x: e.clientX,
        y: e.clientY,
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
};

const mouseMoveHandler = function(e) {
    const dx = e.clientX - pos.x;
    const dy = e.clientY - pos.y;

    ele.scrollTop = pos.top - dy;
    ele.scrollLeft = pos.left - dx;
};

const mouseUpHandler = function() {
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);

    ele.style.cursor = 'grab';
    ele.style.removeProperty('user-select');
};

ele.addEventListener('mousedown', mouseDownHandler);
