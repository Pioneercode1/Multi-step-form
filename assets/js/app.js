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
/**/
const stepConfirmation = document.querySelector(".step-confirmation");
/**/
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

onYearly.addEventListener("change", () => {
    if(onYearly) {
        freeTwoMonths.forEach(span => {
            span.toggleAttribute("hidden");
        });
    }
});

updateProgress();
updateUI();

multiForm.addEventListener("submit", event => {
    event.preventDefault();
});

const userInfo = { name: '', email: '', phone: '', address: '', city: '', state: '', zip: '', country: '', cardNumber: '', cardName: '', cardExp: '', cardCVC: '' };