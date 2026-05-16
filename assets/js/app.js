/* elements */
const multiForm = document.getElementById("#multi-form");
const stepIndex = document.querySelectorAll(".step-item-index");
const stepCard = document.querySelectorAll(".step-card");
/* buttons */
const btnBack = document.querySelector(".btn-back");
const btnNext = document.querySelector(".btn-next");
const btnConfirm = document.querySelector(".btn-confirm");
/**/
const stepConfirmation = document.querySelector(".step-confirmation");
/**/
const currentStep = {stat: 0};
const userInfo = { name: '', email: '', phone: '', address: '', city: '', state: '', zip: '', country: '', cardNumber: '', cardName: '', cardExp: '', cardCVC: ''};

function updateUI() {

}

function updateProgress() {

}

function validateStep(step) {
    
}

updateUI();
updateProgress();