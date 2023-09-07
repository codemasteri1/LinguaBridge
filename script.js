selectTag = document.querySelectorAll("select");
const forText = document.querySelector(".form-text")
translateBtn = document.querySelector("button")
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
translateBtn.addEventListener("click" , () =>{
    let text = forText.value
    translateFrom = selectTag[0].value,
    translateTo = selectTag[1].value,
    console.log(text)
});