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
/* addon selected*/
const addonService = document.getElementById("addon-price-service");
const addonStorage = document.getElementById("addon-price-storage");
const addonCustom = document.getElementById("addon-price-storage");
// addon switch
const onService = document.getElementById("addon-online-service");
const onStorage = document.getElementById("addon-larger-storage");
const onCustom = document.getElementById("addon-customizable-profile");
/* buttons */
const btnBack = document.querySelector(".btn-back");
const btnNext = document.querySelector(".btn-next");
const btnConfirm = document.querySelector(".btn-confirm");
const stepConfirmation = document.querySelector(".step-confirmation");
/* summary */
const planItemContainer = document.querySelectorAll("[plan-option]");
const summaryTitleGroup = document.querySelector(".plan-title-group")
//
const optionContainer = document.querySelectorAll("[addon-option]");
const summaryOptionGroup = document.querySelector(".summary-option");
const totalPrice = document.querySelector(".total-price");
/**/

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
    summaryOptionGroup.innerHTML = "";
    summaryOptionGroup.append(summaryOptionTitle);
}

function createSummaryPlan(valuePlanTitle, valuePlanPrice) {
    const planTitle = document.createElement("span");
    planTitle.classList.add("summary-plan-title");
    const summaryPlanPrice = document.createElement("span");
    summaryPlanPrice.classList.add("plan-price");
    //
    newValuePlanTitle = document.createTextNode(valuePlanTitle);
    newValuePlanPrice = document.createTextNode(valuePlanPrice);
    //
    planTitle.appendChild(newValuePlanTitle);
    summaryPlanPrice.appendChild(newValuePlanPrice);

    //
    planTitle.appendChild(summaryPlanPrice);
    summaryTitleGroup.innerHTML = "";
    summaryTitleGroup.append(planTitle);
}

/* create Summary Plan */
for (let plan = 0; plan < planItemContainer.length; plan++) {
    const element = planItemContainer[plan];
        element.addEventListener("click", e => {
            let valuePlanPrice ="";
            if (!e.target.getAttribute("e.target")) {
                for (const key of planItemContainer) {
                    key.removeAttribute("checked");
                }
                e.target.setAttribute("checked", "");
                const valuePlanTitle = e.target.value;
                if (onYearly) {
                    valuePlanPrice = e.target.getAttribute("data-yearly");
                } else {
                    valuePlanPrice = e.target.getAttribute("data-monthly");
                }
                createSummaryPlan(valuePlanTitle, valuePlanPrice);
            }
        });
}

/* create Summary Options */
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
            //const valueOptionPrice = "";
            if (onYearly) {
                valueOptionPrice = e.target.getAttribute("data-yearly");
            } else {
                valueOptionPrice = e.target.getAttribute("data-monthly");
            }
            createSummaryOptions(valueOptionTitle, valueOptionPrice);
        }
    });
}
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

// select your plan
onYearly.addEventListener("click", () => {
    if (onYearly) {
        freeTwoMonths.forEach(span => {
            span.toggleAttribute("hidden");
        });

        const validYear = onLabelYearly.toggleAttribute("data-valid");

        if (!validYear) {
            planPriceArcade.innerText = planPriceArcade.getAttribute("data-yearly");
            planPriceAdvanced.innerText = planPriceAdvanced.getAttribute("data-yearly");
            planPricePro.innerText = planPricePro.getAttribute("data-yearly");
            monthlyActive.classList.toggle("active-time");
            yearlyActive.classList.toggle("active-time");
        } else if (validYear) {
            planPriceArcade.innerText = planPriceArcade.getAttribute("data-monthly");
            planPriceAdvanced.innerText = planPriceAdvanced.getAttribute("data-monthly");
            planPricePro.innerText = planPricePro.getAttribute("data-monthly");
            monthlyActive.classList.toggle("active-time");
            yearlyActive.classList.toggle("active-time");
        }
    }
});

// update form
updateProgress();
updateUI();

multiForm.addEventListener("submit", event => {
    event.preventDefault();
});

const userInfo = { name: '', email: '', phone: '', address: '', city: '', state: '', zip: '', country: '', cardNumber: '', cardName: '', cardExp: '', cardCVC: '' };