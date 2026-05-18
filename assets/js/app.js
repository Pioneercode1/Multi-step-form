/* elements */
const multiForm = document.getElementById("multi-form");
const stepNumber = document.querySelectorAll(".step-item-index");
const stepCard = document.querySelectorAll(".step-card");
/* plan selected*/
const planPriceArcade = document.getElementById("plan-price-arcade");
const planPriceAdvanced = document.getElementById("plan-price-advanced");
const planPricePro = document.getElementById("plan-price-pro");
// plan switch
const onLabelYearly = document.querySelector(".switch");
const onYearly = document.getElementById("billing-cycle");
const freeTwoMonths = document.querySelectorAll(".data-free");
const monthlyActive = document.querySelector(".monthly");
const yearlyActive = document.querySelector(".yearly");
/* pick add ons selected*/
const addonService = document.getElementById("addon-price-service");
const addonStorage = document.getElementById("addon-price-storage");
const addonCustom = document.getElementById("addon-price-custom");
// addon switch
const onService = document.getElementById("addon-online-service");
const onStorage = document.getElementById("addon-larger-storage");
const onCustom = document.getElementById("addon-customizable-profile");
/* summary */
const planItemContainer = document.querySelectorAll("[plan-option]");
const summaryTitleGroup = document.querySelector(".plan-title-group")
//
const optionContainer = document.querySelectorAll("[addon-option]");
const summaryOptionGroup = document.querySelector(".summary-option");
const totalPrice = document.querySelector(".total-price");
/* buttons */
const btnBack = document.querySelector(".btn-back");
const btnNext = document.querySelector(".btn-next");
const btnConfirm = document.querySelector(".btn-confirm");
const stepConfirmation = document.querySelector(".step-confirmation");
/**/

/* create Summary Plan */
function createSummaryPlan(valuePlanTitle, valuePlanPrice) {
    const planTitle = document.createElement("span");
    planTitle.classList.add("summary-plan-title");
    const summaryPlanPrice = document.createElement("span");
    summaryPlanPrice.classList.add("plan-price");
    //
    const newValuePlanTitle = document.createTextNode(valuePlanTitle);
    const newValuePlanPrice = document.createTextNode(valuePlanPrice);
    //
    planTitle.appendChild(newValuePlanTitle);
    summaryPlanPrice.appendChild(newValuePlanPrice);

    //
    planTitle.appendChild(summaryPlanPrice);
    summaryTitleGroup.innerHTML = "";
    summaryTitleGroup.append(planTitle);
}

for (let plan = 0; plan < planItemContainer.length; plan++) {
    const element = planItemContainer[plan];
    element.addEventListener("click", e => {
        if (!e.target.getAttribute("e.target")) {
            for (const key of planItemContainer) {
                key.removeAttribute("checked");
            }
            e.target.setAttribute("checked", "");
            const valuePlanTitle = e.target.value;
            let valuePlanPrice;
            if (onYearly) {
                valuePlanPrice = e.target.getAttribute("data-yearly");
            }
            if (onYearly) {
                valuePlanPrice = e.target.getAttribute("data-monthly");
            }
            createSummaryPlan(valuePlanTitle, valuePlanPrice);
        }
    });
}

/* create Summary Options */
function createSummaryOptions(valueOptionTitle, valueOptionPrice) {
    const summaryOptionTitle = document.createElement("span");
    summaryOptionTitle.classList.add("summary-option-title");
    const summaryOptionPrice = document.createElement("span");
    summaryOptionPrice.classList.add("option-price");
    //
    newValueOptionTitle = document.createTextNode(valueOptionTitle);
    newValueOptionPrice = document.createTextNode(valueOptionPrice);
    //
    summaryOptionTitle.appendChild(newValueOptionTitle);
    summaryOptionPrice.appendChild(newValueOptionPrice);
    //
    summaryOptionTitle.appendChild(summaryOptionPrice);
    summaryOptionGroup.append(summaryOptionTitle);
}

function updateSummaryOptions() {
    for (let plan = 0; plan < optionContainer.length; plan++) {
        const element = optionContainer[plan];
        element.addEventListener("click", e => {
            let valueOptionPrice = "";
            if (!e.target.getAttribute("e.target")) {
                for (const key of optionContainer) {
                    key.removeAttribute("checked");
                }
                e.target.setAttribute("checked", "");
                const valueOptionTitle = e.target.value;
                let valueOptionPrice;
                createSummaryOptions(valueOptionTitle, valueOptionPrice);
            }
            if (onYearly) {
                valueOptionPrice = e.target.getAttribute("data-yearly");
            } else {
                valueOptionPrice = e.target.getAttribute("data-monthly");
            }
        });
    }
}

updateSummaryOptions();

function funValidYear() {
    // pick add price
    addonService.innerText = addonService.getAttribute("data-yearly");
    addonStorage.innerText = addonStorage.getAttribute("data-yearly");
    addonCustom.innerText = addonCustom.getAttribute("data-yearly");

    yearlyActive.classList.add("active-time");
    monthlyActive.classList.remove("active-time");

    // summary finishing
    planPriceArcade.innerText = planPriceArcade.getAttribute("data-yearly");
    planPriceAdvanced.innerText = planPriceAdvanced.getAttribute("data-yearly");
    planPricePro.innerText = planPricePro.getAttribute("data-yearly");

    yearlyActive.classList.add("active-time");
    monthlyActive.classList.remove("active-time");
}

function funNotValidYear() {
    // pick add price
    addonService.innerText = addonService.getAttribute("data-monthly");
    addonStorage.innerText = addonStorage.getAttribute("data-monthly");
    addonCustom.innerText = addonCustom.getAttribute("data-monthly");

    monthlyActive.classList.add("active-time");
    yearlyActive.classList.remove("active-time");
    // summary finishing
    planPriceArcade.innerText = planPriceArcade.getAttribute("data-monthly");
    planPriceAdvanced.innerText = planPriceAdvanced.getAttribute("data-monthly");
    planPricePro.innerText = planPricePro.getAttribute("data-monthly");

    monthlyActive.classList.add("active-time");
    yearlyActive.classList.remove("active-time");
}
// select your plan
onYearly.addEventListener("click", () => {
    if (onYearly) {
        freeTwoMonths.forEach(span => {
            span.toggleAttribute("hidden");
        });
        const validYear = onLabelYearly.toggleAttribute("data-valid");
        if (!validYear) {
            funValidYear();
        } else if (validYear) {
            funNotValidYear();
        }
    }

});
//

let currentStep = 0;


function updateProgress() {
    stepNumber.forEach((num, index) => {
        num.classList.toggle("step-active", index === currentStep);
    });
    btnBack.hidden = currentStep === 0;
    btnNext.hidden = currentStep === stepCard.length - 1;
    btnConfirm.hidden = currentStep !== stepCard.length - 1;
}

function updateUI() {
    stepCard.forEach((step, index) => {
        step.classList.toggle("active", index === currentStep);
    });
}

multiForm.addEventListener("click", e => {
    let inputs = stepCard[currentStep].querySelectorAll("input");
    let valid = [...inputs].every(input => {
        return input.checkValidity();
    });
    //
    if (e.target.matches("[data-next]")) {
        if (currentStep < stepCard.length - 1) {
            if (!valid) {
                inputs.forEach(input => {
                    input.reportValidity();
                });
            }
        }
        currentStep++;
        updateProgress();
        updateUI();

    } else if (e.target.matches("[data-back]")) {
        if (currentStep > 0) {
            currentStep--;
            updateProgress();
            updateUI();
        }
    }
});

// update form
updateProgress();
updateUI();

multiForm.addEventListener("submit", event => {
    event.preventDefault();
});

//const userInfo = { name: '', email: '', phone: '', address: '', city: '', state: '', zip: '', country: '', cardNumber: '', cardName: '', cardExp: '', cardCVC: '' };