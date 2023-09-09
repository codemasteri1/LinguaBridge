const fromText = document.querySelector(".form-text"),
selectTag = document.querySelectorAll("select"),
exchangeIcon = document.querySelector(".exchange"),
toText = document.querySelector(".to-text"),
translateBtn = document.querySelector("button"),
icons = document.querySelectorAll(".row i")
id = 0
selectTag.forEach(tag =>{
    for (const country_code in countries){
        let selected;
        if(id == 0 && country_code == "en-GB"){
            selected = "selected";
        }else if(id == 1 && country_code == "hi-IN"){
            selected = "selected";
        }
        let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }
});


exchangeIcon.addEventListener("click" , () =>{
    let tempText = fromText.value,
    tempLang = selectTag[0].value;
    forText.value = toText.value;
    selectTag[1] = selectTag[0].value;
    toText.value = tempText;
    selectTag[1].value = tempLang;

});

translateBtn.addEventListener("click" , () =>{
    let text = fromText.value,
    translateFrom = selectTag[0].value,
    translateTo = selectTag[1].value;
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    fetch(apiUrl).then(res => res.json()).then(data => {
        toText.value = data.responseData.translatedText;

    });
});
icons.forEach(icons =>{
    icons.addEventListener("click", ({target}) =>{
        if (target.classList.contains("bi-clipboard-check")) {
            if(target.id === "from"){
                navigator.clipboard.writeText(fromText.value)
            }else{
                navigator.clipboard.writeText(toText.value)
            }
        }
        else{
            let utternance;
                if(target.id == "from"){
                    utternance = new SpeechSynthesisUtterance(fromText.value);
                    utternance.lang = selectTag[0].value;
                }else{
                    utternance = new SpeechSynthesisUtterance(toText.value);
                    utternance.lang = selectTag[1].value;

                }   speechSynthesis.speak(utternance);     }
    });
});