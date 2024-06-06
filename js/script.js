const fromText = document.querySelector(".from-text");
const toText = document.querySelector(".to-text");
const selectTags = document.querySelectorAll("select");
const exchangeIcon = document.querySelector(".exchange");
const translateBtn = document.querySelector("#translate-btn");
const icons = document.querySelectorAll(".row i");

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
// Define the country list as a JavaScript array  
  // Create the container element

  // Create the continent select element
  const continentSelect = document.createElement('select');
  continentSelect.id = 'continent-select';
  
  // Add an option for each continent
  for (const continent of Object.keys(countryList)) {
    const option = document.createElement('option');
    option.value = continent;
    option.textContent = continent;
    continentSelect.appendChild(option);
  }
  
  // Add an event listener to update the country list when the continent changes
  continentSelect.addEventListener('change', () => {
    const continent = continentSelect.value;
    const countryListForContinent = getCountriesForContinent(continent);
  
    // Clear the existing country list
    const countryListElement = document.getElementById('country-list');
    countryListElement.innerHTML = '';
  
    // Add a list item for each country
    for (const country of countryListForContinent) {
      const listItem = document.createElement('li');
      listItem.textContent = country;
      countryListElement.appendChild(listItem);
    }
  });
  
  // Create the container element
  const container = document.createElement('div');
  container.style.width = '200px'; // adjust the width as needed
  container.style.border = '1px solid #ccc';
  
  // Create the list element
  const list = document.createElement('ul');
  list.id = 'country-list';
  
  // Append the list to the container
  container.appendChild(list);
  
  // Append the container to the body
  document.body.appendChild(container);}

  const ele = document.getElementById('container');
  ele.scrollTop = 100;
  ele.scrollLeft = 150;
  const mouseUpHandler = function () {
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);

    ele.style.cursor = 'grab';
    ele.style.removeProperty('user-select');
};
const mouseDownHandler = function(e) {
    // Change the cursor and prevent user from selecting the text
    ele.style.cursor = 'grabbing';
    ele.style.userSelect = 'none';
    
};
  
const mouseMoveHandler = function (e) {
    // How far the mouse has been moved
    const dx = e.clientX - pos.x;
    const dy = e.clientY - pos.y;

    // Scroll the element
    ele.scrollTop = pos.top - dy;
    ele.scrollLeft = pos.left - dx;
};
let pos = { top: 0, left: 0, x: 0, y: 0 };

