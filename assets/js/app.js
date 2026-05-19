const multiForm = document.getElementById("multi-form");
const stepCards = Array.from(document.querySelectorAll(".step-card"));
const stepIndicators = Array.from(document.querySelectorAll(".step-item-index"));
const stepItems = Array.from(document.querySelectorAll(".step-item"));
/* buttons */
const btnBack = document.querySelector(".btn-back");
const btnNext = document.querySelector(".btn-next");
const btnConfirm = document.querySelector(".btn-confirm");
const billingToggle = document.getElementById("billing-cycle");
/* plan */
const monthlyLabel = document.querySelector(".monthly");
const yearlyLabel = document.querySelector(".yearly");
const freeLabels = Array.from(document.querySelectorAll(".data-free"));
const dataPer = document.getElementById("data-per");
const totalPrice = document.getElementById("total-price");
const summaryTitleGroup = document.querySelector(".plan-title-group");
const summaryOptionGroup = document.querySelector(".summary-option");
const confirmation = document.querySelector(".step-confirmation");
const nav = document.querySelector(".nav-step-container");

const planOptions = Array.from(document.querySelectorAll(".plan-item")).map((item) => ({
    item,
    input: item.querySelector('input[type="radio"]'),
    name: item.querySelector(".plan-name"),
    price: item.querySelector(".plan-price"),
    free: item.querySelector(".data-free"),
}));

const addonOptions = Array.from(document.querySelectorAll(".addon-item")).map((item) => ({
    item,
    input: item.querySelector('input[type="checkbox"]'),
    name: item.querySelector(".addon-name"),
    price: item.querySelector(".addon-price"),
}));

const state = {
    step: 0,
    billingCycle: billingToggle.checked ? "yearly" : "monthly",
    personal: {
        name: "",
        email: "",
        phone: "",
    },
    plan: "",
    addons: [],
};

function priceNumber(text) {
    const match = String(text).match(/\d+/);
    return match ? Number(match[0]) : 0;
}

function getSelectedPlanOption() {
    const selectedInput = multiForm.querySelector('input[name="plan"]:checked');
    if (!selectedInput) return null;
    return planOptions.find((option) => option.input === selectedInput) ?? null;
}

function getSelectedAddons() {
    return addonOptions.filter((option) => option.input.checked);
}

function updateStepIndicators() {
    stepIndicators.forEach((indicator, index) => {
        indicator.classList.toggle("step-active", index === state.step);
    });

    stepItems.forEach((item, index) => {
        if (index === state.step) {
            item.setAttribute("aria-current", "step");
        } else {
            item.removeAttribute("aria-current");
        }
    });
}

function updateButtons() {
    btnBack.hidden = state.step === 0;
    btnNext.hidden = state.step === stepCards.length - 1;
    btnConfirm.hidden = state.step !== stepCards.length - 1;
}

function showStep(stepIndex) {
    state.step = stepIndex;
    stepCards.forEach((card, index) => {
        card.classList.toggle("active", index === stepIndex);
    });
    updateStepIndicators();
    updateButtons();

    if (stepIndex === 3) {
        renderSummary();
    }
}

function validateCurrentStep() {
    const currentCard = stepCards[state.step];
    const requiredControls = Array.from(currentCard.querySelectorAll("input, select, textarea"));

    if (state.step === 1) {
        const selectedPlan = currentCard.querySelector('input[name="plan"]:checked');
        if (!selectedPlan) {
            const firstRadio = currentCard.querySelector('input[name="plan"]');
            firstRadio?.reportValidity();
            return false;
        }
        return true;
    }

    const invalidControl = requiredControls.find((control) => !control.checkValidity());
    if (invalidControl) {
        invalidControl.reportValidity();
        return false;
    }

    return true;
}

function syncPersonalState() {
    state.personal.name = document.getElementById("name").value.trim();
    state.personal.email = document.getElementById("email").value.trim();
    state.personal.phone = document.getElementById("phone").value.trim();
}

function syncPlanState() {
    const selectedPlan = getSelectedPlanOption();
    if (!selectedPlan) {
        state.plan = "";
        return;
    }

    state.plan = selectedPlan.input.value;
}

function syncAddonState() {
    state.addons = getSelectedAddons().map((option) => option.input.value);
}

function updateBillingUI() {
    const isYearly = state.billingCycle === "yearly";

    monthlyLabel.classList.toggle("active-time", !isYearly);
    yearlyLabel.classList.toggle("active-time", isYearly);

    freeLabels.forEach((label) => {
        label.hidden = !isYearly;
    });

    planOptions.forEach((option) => {
        option.price.textContent = option.price.dataset[state.billingCycle];
    });

    addonOptions.forEach((option) => {
        option.price.textContent = option.price.dataset[state.billingCycle];
    });

    dataPer.textContent = isYearly ? "(per year)" : "(per month)";
}

function renderSummary() {
    const selectedPlan = getSelectedPlanOption();
    const selectedAddons = getSelectedAddons();
    const cycleLabel = state.billingCycle === "yearly" ? "Yearly" : "Monthly";

    const planName = selectedPlan ? selectedPlan.name.textContent.trim() : "No plan selected";
    const planPriceText = selectedPlan ? selectedPlan.price.dataset[state.billingCycle] : "$0/mo";

    summaryTitleGroup.innerHTML = `
    <div class="summary-plan-title">
      <span>${planName} (${cycleLabel})</span>
      <span class="plan-price">${planPriceText}</span>
    </div>
    <a href="#" class="link-change">Change</a>
  `;

    summaryOptionGroup.innerHTML = "";

    let total = selectedPlan ? priceNumber(selectedPlan.price.dataset[state.billingCycle]) : 0;

    if (selectedAddons.length === 0) {
        const emptyRow = document.createElement("span");
        emptyRow.className = "summary-option-title";
        emptyRow.textContent = "No add-ons selected";
        summaryOptionGroup.append(emptyRow);
    } else {
        selectedAddons.forEach((option) => {
            const row = document.createElement("span");
            row.className = "summary-option-title";

            const addonName = document.createElement("span");
            addonName.textContent = option.name.textContent.trim();

            const addonPrice = document.createElement("span");
            addonPrice.className = "option-price";
            addonPrice.textContent = `+${option.price.dataset[state.billingCycle]}`;

            row.append(addonName, addonPrice);
            summaryOptionGroup.append(row);

            total += priceNumber(option.price.dataset[state.billingCycle]);
        });
    }

    totalPrice.textContent = `$${total}/${state.billingCycle === "yearly" ? "yr" : "mo"}`;
}

function handleChange(e) {
    const target = e.target;

    if (target.id === "billing-cycle") {
        state.billingCycle = target.checked ? "yearly" : "monthly";
        updateBillingUI();
        if (state.step === 3) {
            renderSummary();
        }
        return;
    }

    if (target.matches('input[name="plan"]')) {
        syncPlanState();
        if (state.step === 3) {
            renderSummary();
        }
        return;
    }

    if (target.matches('input[name="addon"]')) {
        syncAddonState();
        if (state.step === 3) {
            renderSummary();
        }
    }

    if (target.matches('#name, #email, #phone')) {
        syncPersonalState();
    }
}

function handleClick(e) {
    const target = e.target.closest("button, a");
    if (!target) return;

    if (target.matches("[data-next]")) {
        if (!validateCurrentStep()) return;

        syncPersonalState();
        syncPlanState();
        syncAddonState();

        if (state.step < stepCards.length - 1) {
            showStep(state.step + 1);
        }
        return;
    }

    if (target.matches("[data-back]")) {
        if (state.step > 0) {
            showStep(state.step - 1);
        }
        return;
    }

    if (target.matches(".link-change")) {
        e.preventDefault();
        showStep(1);
    }
}

function handleSubmit(e) {
    e.preventDefault();

    if (state.step !== stepCards.length - 1) return;

    syncPersonalState();
    syncPlanState();
    syncAddonState();

    multiForm.hidden = true;
    nav.hidden = true;
    confirmation.hidden = false;
}

multiForm.addEventListener("click", handleClick);
multiForm.addEventListener("change", handleChange);
multiForm.addEventListener("input", handleChange);
multiForm.addEventListener("submit", handleSubmit);

updateBillingUI();
showStep(0);
syncPersonalState();
syncPlanState();
syncAddonState();
