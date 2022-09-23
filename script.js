/////////////////////////////////////////////////////////////////////////////////////
let buttonAdd = document.querySelector(".inputs-settings button");
let inputsField = document.querySelector("#inputs-field");
let inputsCotainer = document.querySelector(".inputs");
let inputsCounter = document.querySelector(".inputs-settings label span");

buttonAdd.onclick = () => {
    let inputs = inputsField.value.split(" ");
    let inputsCotainerArray = Array.from(inputsCotainer.children);
    let flag = true;
        inputs.forEach(ele => {
            if (ele != "" && ele != " ") {
                removeError(inputsCotainer);
                removeError(inputsField);
                for(let i=0;i<inputsCotainerArray.length;i++) {
                    if (ele == (inputsCotainerArray[i].firstChild.innerHTML)) {
                        flag = false;
                    }
                }

                if (flag) {
                    let input = document.createElement("div");
                    input.classList.toggle("input");

                    let text = document.createElement("div");
                    text.classList.toggle("text");
                    text.innerHTML = ele;
                    input.appendChild(text);

                    let div = document.createElement("div");
                    let check = document.createElement("span");
                    check.classList.toggle("check");
                    check.innerHTML = "✔";
                    div.appendChild(check);
                    let delet = document.createElement("span");
                    delet.classList.toggle("delete");
                    delet.innerHTML = "✕";
                    div.appendChild(delet);
                    input.appendChild(div);

                    inputsCotainer.appendChild(input);
                    
                    inputsCounter.innerHTML++;
                }
            }else {
                makeError(inputsField,"Please enter something!");
            }
            flag = true;
        });
}

///////////////////////////////// Element doesn't exixte yet ////////////////////////////////////////
document.addEventListener("click",(e)=>{
    if (e.target.classList.contains("delete")) {
        e.target.parentElement.parentElement.remove();
        inputsCounter.innerHTML--;
    }else if (e.target.classList.contains("check")) {
        e.target.classList.remove("check");
        e.target.classList.toggle("notcheck");
    }else if (e.target.classList.contains("notcheck")) {
        removeError(inputsCotainer);
        e.target.classList.remove("notcheck");
        e.target.classList.toggle("check");
    }else if(e.target.className == "close-button") {
        e.target.parentNode.remove();
        document.querySelector(".overlay").remove();
    }else if(e.target.className =="overlay") {
        document.querySelector(".winners-container").remove();
        document.querySelector(".overlay").remove();
    }
});

/////////////////////////////////////////////////////////////////////////////////////
let lotteryButton = document.querySelector(".lottery");

lotteryButton.onclick = () => {
    let checkedInputs = Array.from(document.querySelectorAll(".check"));

    let winnersNumber = 1;
    if (document.querySelector("#winners-number").value != "") {
        winnersNumber = document.querySelector("#winners-number").value;
    }

    if (checkedInputs.length == 0) {
        if (inputsCounter.innerHTML == 0) {
            makeError(inputsField,"Please enter something!");
        }else {
            makeError(inputsCotainer,"Please check some inputs!");
        }
    }else if(checkedInputs.length>0 && checkedInputs.length < winnersNumber) {
        if ((Array.from(inputsCotainer.children).length) < winnersNumber) {
            makeError(inputsCotainer,"Please add some inputs!");
        }else {
            makeError(inputsCotainer,"Please check some inputs!");
        }
    }else {
        removeError(inputsCotainer);
        let winners = [];
        while (winners.length < winnersNumber) {
            let randomelement = checkedInputs[Math.floor(Math.random() * checkedInputs.length)];
            randomelement = randomelement.parentElement.parentElement.firstChild.innerHTML;
            if (!(winners.includes(randomelement))) {
                winners.push(randomelement);
            }
        }

        let overlay = document.createElement("div");
        overlay.className = "overlay";
        document.body.appendChild(overlay);

        document.querySelector(".progress-bar").style.display = "block";

        setTimeout(()=>{
            document.querySelector(".progress-bar").style.display = "none";

            let winnersContainer = document.createElement("div");
            winnersContainer.className = "winners-container";
            document.body.appendChild(winnersContainer);

            winners.forEach((winner)=>{
                let winnerSpan = document.createElement("span");
                winnerSpan.className = "winner-span";
                winnerSpan.innerHTML = winner;
                winnersContainer.appendChild(winnerSpan);
            });

            let closeButton = document.createElement("span");
            closeButton.innerHTML = "X";
            closeButton.className = 'close-button';
            winnersContainer.appendChild(closeButton);
        },1000)

        
    }
}

///////////////////////////////////// Functions ///////////////////////////////////////////////
function makeError(element,errorText) {
    if (!(element.nextElementSibling.classList.contains("error"))) {
        let spanError = document.createElement("span");
        spanError.innerHTML = errorText;
        spanError.classList.toggle("error");
        element.insertAdjacentElement("afterend",spanError);
    }
}

function removeError(element) {
    if ((element.nextElementSibling.classList.contains("error"))) {
        element.nextElementSibling.remove();
    }
}
