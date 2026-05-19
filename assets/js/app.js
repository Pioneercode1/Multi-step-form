/* elements */
const multiForm = document.getElementById("multi-form");
const stepNumber = document.querySelectorAll(".step-item-index");
const stepCard = document.querySelectorAll(".step-card");
/* plan selected*/
const planPriceArcade = document.getElementById("plan-price-arcade");
const planPriceAdvanced = document.getElementById("plan-price-advanced");
const planPricePro = document.getElementById("plan-price-pro");
// plan switch
//const onLabelYearly = document.querySelector(".switch");
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
    const target = e.target;
    let onValid = onYearly.checked;
    let inputs = stepCard[currentStep].querySelectorAll("input");
    let valid = [...inputs].every(input => {
        return input.checkValidity();
    });

    //
    if (target.matches("[data-next]")) {
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

    } else if (target.matches("[data-back]")) {
        if (currentStep > 0) {
            currentStep--;
            updateProgress();
            updateUI();
        }
    }
    if (target.type === "radio") {
        currentUserInfo[1].value = target.value;
        if (onValid) {
            currentUserInfo[1].data = target.getAttribute("data-yearly");
        } else {
            currentUserInfo[1].data = target.getAttribute("data-monthly");
        }
        console.log(currentUserInfo[1]);
    }
});

//multiForm.addEventListener("change", e => {});

// update form
updateProgress();
updateUI();

// select your plan
onYearly.addEventListener("click", (e) => {
    let onValid = onYearly.checked;
    if (onYearly) {
        freeTwoMonths.forEach(span => {
            span.toggleAttribute("hidden");
        });
    }
    
});

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
    summaryTitleGroup.append(planTitle);
}

function updateSummaryPlan() {
    createSummaryPlan(valuePlanTitle, valuePlanPrice);
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
    createSummaryOptions(valueOptionTitle, valueOptionPrice);
}

const currentUserInfo = [
    { userInfo: { name: '', email: '', phone: '' } },
    { selectPlan: { value: '', checked: '', data: '' } },
    { pickAddons: { service: { value: '', checked: '', data: '' }, storage: { value: '', checked: '', data: '' }, custom: { value: '', checked: '', data: '' } }, },
];

//updateSummaryPlan();
//updateSummaryOptions();

multiForm.addEventListener("submit", event => {
    event.preventDefault();
});

