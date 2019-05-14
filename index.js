// Inputs
const fullName = document.getElementById('fullName');
const accountNumber = document.getElementById('accountNumber');

// Form
const form = document.getElementById('myForm');

// Success Container
const success = document.getElementById('success-container');

// Validation colors
const green = '#4CAF50';
const red = '#F44336';

// Handle form
const checkValidation = e => {
  e.preventDefault();
  if (validateFullName() && validateAccountNumber()) {
    success.style.display = 'block';
    const firstName = fullName.value.split(' ').shift();

    const successMsg = document.getElementById('success-container');
    successMsg.innerHTML = `
      <div class="success-section">
        <p class="success-text">Sign in successful, welcome to Provident Credit Union ${firstName}!</p>
      </div>
    `;
  }
};

// Validation Functions
const validateFullName = () => {
  // check if empty
  if (checkIfEmpty(fullName)) return;
  // check if only has letters
  if (!checkIfOnlyLetters(fullName)) return;
  // check length
  if (meetNameLength(fullName, 4, 25)) return true;
};

const validateAccountNumber = () => {
  // check if empty
  if (checkIfEmpty(accountNumber)) return;
  // check if certain length
  if (!meetAccountLength(accountNumber, 6)) return;
  // check if contains only numbers
  if (!checkIfOnlyNumbers(accountNumber)) return;
  return true;
};

// Utility functions
const checkIfEmpty = field => {
  if (isEmpty(field.value.trim())) {
    // set field invalid
    setInvalid(field, `${field.name} must not be empty`);
    return true;
  } else {
    // set field valid
    setValid(field);
    return false;
  }
};

const isEmpty = value => {
  if (value === '') return true;
  return false;
};

const setInvalid = (field, message) => {
  field.className = 'invalid';
  field.nextElementSibling.innerHTML = message;
  field.nextElementSibling.style.color = red;
};

const setValid = field => {
  field.className = 'valid';
  field.nextElementSibling.innerHTML = '';
  //field.nextElementSibling.style.color = green;
};

const checkIfOnlyLetters = field => {
  if (/^[a-zA-Z ]+$/.test(field.value)) {
    setValid(field);
    return true;
  } else {
    setInvalid(field, `${field.name} must contain only letters`);
    return false;
  }
};

const meetNameLength = (field, min, max) => {
  if (
    field.value.length >= min &&
    field.value.length < max &&
    field.value.includes(' ')
  ) {
    setValid(field);
    return true;
  } else if (field.value.length < min) {
    setInvalid(field, `${field.name} must be at least ${min} characters long`);
    return false;
  } else if (field.value.length > max) {
    setInvalid(field, `${field.name} must be less than ${max} characters`);
    return false;
  } else {
    setInvalid(field, `Must use a space to seperate first and last name`);
  }
};

const checkIfOnlyNumbers = field => {
  if (/^\d*$/.test(field.value)) {
    setValid(field);
    return true;
  } else {
    setInvalid(field, `${field.name} must contain only numbers`);
    return false;
  }
};

const meetAccountLength = (field, size) => {
  if (field.value.length === size) {
    setValid(field);
    return true;
  } else {
    setInvalid(field, `${field.name} must be ${size} characters`);
    return false;
  }
};

form.addEventListener('submit', function(e) {
  checkValidation(e);
});
