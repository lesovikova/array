const container = document.querySelector('#container');


const url2 = 'https://picsum.photos/200/300?random=1';
const url = 'https://api.unsplash.com/photos/random/?client_id=1xSQgjlBBsvbOswqA6IX1468Kzhl7D9szw6jVHxvmPk';
const changeButton = document.querySelector('#change');
const addButton = document.querySelector('#add');
const form = document.querySelector('form');
const email = document.querySelector('.select__email');
const emailsSelect = document.querySelector('#emails');
const alertsPlace = document.querySelector('.select__after');
const displayField = document.querySelector('.assign');

let data;

const imageLinkfunc = () => document.querySelector('.select__image');

// readyPic();

//Creating first picture
function readyPic (link) {
    console.log(data);
    const image = document.createElement('img');
    image.classList.add('select__image');
    console.log(image);
    image.src = link;
    // image.src = fetchImage();
    console.log(image.src);
    container.prepend(image);

}
//Fetching the image and parcing into object, assigning url to the image through the callback
async function fetchJSON (callback) {    
    let response = await fetch(url);    
    data = await response.json();
    console.log(data);
    let link = await data.urls.regular;
    callback (link);
    console.log(link);
    return link;
}
fetchJSON(readyPic);


//callback function for the changing of the picture
function reachImage(link) {
    const image = document.querySelector('.select__image');
    console.log(image);
    image.src = link;
    console.log(image);
}

//changing url on click
changeButton.addEventListener('click', () => {
    const image = imageLinkfunc();
    let isLoaded = image.complete;
    if(isLoaded) {
    fetchJSON(reachImage);
    }
});

//adding image to the container on click


//field-not-empty algorythm 
const isRequired = value => value === '' ? false : true;


//email validation algorythm
const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

//email validation fuction
const checkEmail = () => {
const inputemail = email.value.trim();
    let valid = false;
    if (!isRequired(inputemail)) {
        showError(email, 'Email cannot be blank.');
    } else if (!isEmailValid(inputemail)) {
        showError(email, 'Email is not valid.')
    } else {
        showSuccess(email);
        valid = true;
    }
    return valid;
}

//showing error messages function
const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;
    // show the error message
    const error = formField.querySelector('span');
    error.textContent = message;
};

//showinf successfull validation
const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement;
    // hide the error message
    const error = formField.querySelector('span');
    error.textContent = '';
}

//final validation of form
form.addEventListener('submit', function (e) {
    // prevent the form from submitting
    e.preventDefault();
    // validate forms
    let isEmailValid = checkEmail();
    let isFormValid = isEmailValid ;

    // if valid -> get email value, add it to the select and the image box
    if (isFormValid) {

        alertsPlace.classList.remove('is-hidden');
        alertsPlace.textContent = 'Add your pictures below';
        emailValue();
        addEmailOption();
        createBox();
        e.target.reset();
            }
});

//finding value of selected option
function getValue() {
    let collection = emailsSelect.selectedOptions;
    console.log(collection[0].label);
}


function checkEmailOptions () {

}

addButton.addEventListener('click', () => {

    const imagelink = document.querySelector('.select__image').src;
    console.log(imagelink);
});

function createImages (link) {
    const image = document.createElement('img');
    image.classList.add('assign__image');
    const container = document.querySelector('.assign__images');
    container.prepend(image);

}

//adding emails to the list of emails
function addEmailOption () {
    let emailOption = document.createElement('option');
    emailOption.textContent = emailValue();
    emailOption.value = emailValue();
    emailOption.setAttribute('selected', 'true');
    emailsSelect.add(emailOption);
}

//creating the section for displaying of images and email
function createBox () {
    displayField.classList.remove('is-hidden');
    const box = document.createElement('div');
    const emailField = document.createElement('div');
    const imagesBox = document.createElement('div'); 
    box.classList.add('assign__box');
    emailField.classList.add('assign__email');
    imagesBox.classList.add('assign__images');
    displayField.prepend(box);
    box.prepend(emailField);
    box.append(imagesBox);
    addEmailName(emailField);
}


//add email name to the box
function addEmailName(emailField) {
    emailField.textContent = emailValue();
}

//returns email name
function emailValue () {
    return email.value;
 }



// function checkSelect () {
//     let selectOption = document.querySelector('select.option');
//     console.log(selectOption);
// }

// checkSelect();


// addButton.addEventListener('click', function(e) {
//     e.preventDefault();

// });

