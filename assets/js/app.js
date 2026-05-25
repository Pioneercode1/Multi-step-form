/* Elements Selection */
const multiForm = document.getElementById("multi-form");
const stepNumber = document.querySelectorAll(".step-item-index");
const stepCard = document.querySelectorAll(".step-card");

/* Plan Elements */
const planPriceArcade = document.getElementById("plan-price-arcade");
const planPriceAdvanced = document.getElementById("plan-price-advanced");
const planPricePro = document.getElementById("plan-price-pro");
const onYearly = document.getElementById("billing-cycle");
const freeTwoMonths = document.querySelectorAll(".data-free");
const dataPer = document.getElementById("data-per");
const allRadio = document.querySelectorAll('.plan-item-container input[type="radio"]');

/* Add-ons Elements */
const addonService = document.getElementById("addon-price-service");
const addonStorage = document.getElementById("addon-price-storage");
const addonCustom = document.getElementById("addon-price-custom");
const allCheckbox = document.querySelectorAll('.addons-item-container input[type="checkbox"]');

/* Summary Elements */
const summaryTitleGroup = document.querySelector(".plan-title-group");
const summaryOptionGroup = document.querySelector(".summary-option");
const totalPrice = document.querySelector(".total-price");

/* Action Buttons */
const btnBack = document.querySelector(".btn-back");
const btnNext = document.querySelector(".btn-next");
const btnConfirm = document.querySelector(".btn-confirm");
const stepConfirmation = document.querySelector(".step-confirmation");

let currentStep = 0;

/*Modern Practice: Clean State Architecture*/
const formState = {
    personalInfo: { name: '', email: '', phone: '' },
    plan: { name: '', price: '', type: 'monthly' },
    addons: []
};

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

function saveCurrentStepData() {
    if (currentStep === 0) {

        formState.personalInfo.name = document.getElementById("name").value;
        formState.personalInfo.email = document.getElementById("email").value;
        formState.personalInfo.phone = document.getElementById("phone").value;
    }
    else if (currentStep === 1) {

        const selectedRadio = document.querySelector('input[name="plan"]:checked');
        if (selectedRadio) {
            const isYearly = onYearly.checked;
            formState.plan.name = selectedRadio.value;
            formState.plan.price = isYearly ? selectedRadio.getAttribute("data-yearly") : selectedRadio.getAttribute("data-monthly");
            formState.plan.type = isYearly ? 'yearly' : 'monthly';
        }
    }
    else if (currentStep === 2) {

        formState.addons = [];
        const isYearly = onYearly.checked;

        allCheckbox.forEach(box => {
            if (box.checked) {
                const addonItem = box.closest('.addon-item');
                const name = addonItem.querySelector('.addon-name').innerText;
                const price = isYearly ? box.getAttribute("data-yearly") : box.getAttribute("data-monthly");

                formState.addons.push({ name, price });
            }
        });
    }
}

function renderSummary() {
    const existingTitle = summaryTitleGroup.querySelector('.summary-plan-title');
    if (existingTitle) {existingTitle.remove();}

    if (formState.plan.name) {
        const planTitleSpan = document.createElement("span");
        planTitleSpan.classList.add("summary-plan-title");
        const billingText = formState.plan.type === 'yearly' ? 'Yearly' : 'Monthly';

        const formattedPlanName = formState.plan.name.charAt(0).toUpperCase() + formState.plan.name.slice(1);

        planTitleSpan.innerHTML = `${formattedPlanName} (${billingText}) <span class="plan-price">${formState.plan.price}</span>`;
        summaryTitleGroup.insertBefore(planTitleSpan, summaryTitleGroup.querySelector('.link-change'));
    }

    //  clean and add selected options (Checkboxes)
    summaryOptionGroup.innerHTML = '';
    formState.addons.forEach(addon => {
        const addonOptionTitle = document.createElement("span");
        addonOptionTitle.classList.add("summary-option-title");
        addonOptionTitle.innerHTML = `${addon.name} <span class="option-price">${addon.price}</span>`;
        summaryOptionGroup.appendChild(addonOptionTitle);
    });

    const planPriceNum = parseInt(formState.plan.price.replace(/[^0-9]/g, '')) || 0;
    const addonsPriceSum = formState.addons.reduce((sum, addon) => {
        return sum + (parseInt(addon.price.replace(/[^0-9]/g, '')) || 0);
    }, 0);

    const grandTotal = planPriceNum + addonsPriceSum;
    const perText = formState.plan.type === 'yearly' ? 'yr' : 'mo';

    dataPer.innerText = formState.plan.type === 'yearly' ? '(per year)' : '(per month)';
    totalPrice.innerText = `+$${grandTotal}/${perText}`;
}

/*Event Listeners*/

multiForm.addEventListener("click", e => {
    const target = e.target;

    if (target.matches("[data-next]")) {
        const inputs = stepCard[currentStep].querySelectorAll("input");
        const valid = [...inputs].every(input => input.checkValidity());

        if (!valid) {
            inputs.forEach((input, index) => {
                input.reportValidity() && input.focus()
                input.classList.toggle("input-error", !input.checkValidity());
            });
            return;
        }

        saveCurrentStepData();

        if (currentStep < stepCard.length - 1) {
            currentStep++
            if (currentStep === 3) {
                renderSummary();
            }
            updateProgress();
            updateUI();
        }
    }
    else if (target.matches("[data-back]")) {
        if (currentStep > 0) {
            currentStep--;
            updateProgress();
            updateUI();
        }
    }
});

const linkChange = document.querySelector(".link-change");
if (linkChange) {
    linkChange.addEventListener("click", e => {
        e.preventDefault();
        currentStep = 1;
        updateProgress();
        updateUI();
    });
}

onYearly.addEventListener("change", () => {
    const isYearly = onYearly.checked;
    const toggleMonthly = document.querySelector(".monthly");
    const toggleYearly = document.querySelector(".yearly");
    toggleMonthly.classList.toggle("active-time");
    toggleYearly.classList.toggle("active-time");

    freeTwoMonths.forEach(span => span.hidden = !isYearly);

    planPriceArcade.innerText = planPriceArcade.getAttribute(isYearly ? "data-yearly" : "data-monthly");
    planPriceAdvanced.innerText = planPriceAdvanced.getAttribute(isYearly ? "data-yearly" : "data-monthly");
    planPricePro.innerText = planPricePro.getAttribute(isYearly ? "data-yearly" : "data-monthly");

    addonService.innerText = addonService.getAttribute(isYearly ? "data-yearly" : "data-monthly");
    addonStorage.innerText = addonStorage.getAttribute(isYearly ? "data-yearly" : "data-monthly");
    addonCustom.innerText = addonCustom.getAttribute(isYearly ? "data-yearly" : "data-monthly");

    dataPer.innerText = isYearly ? "(per year)" : "(per month)";

    allRadio.forEach(radio => radio.checked = false);
    formState.plan = { name: '', price: '', type: isYearly ? 'yearly' : 'monthly' };
});

multiForm.addEventListener("submit", event => {
    event.preventDefault();
    multiForm.style.display = "none";
    stepConfirmation.classList.add("goActive");

});

updateProgress();
updateUI();