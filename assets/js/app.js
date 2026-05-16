/* elements */
const multiForm = document.getElementById("multi-form");
const stepNumber = document.querySelectorAll(".step-item-index");
const stepCard = document.querySelectorAll(".step-card");
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

updateProgress();
updateUI();

multiForm.addEventListener("submit", event => {
    event.preventDefault();
});


const userInfo = { name: '', email: '', phone: '', address: '', city: '', state: '', zip: '', country: '', cardNumber: '', cardName: '', cardExp: '', cardCVC: '' };