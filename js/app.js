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

const getImage = () => document.querySelector('.select__image');

// readyPic();

//Creating first picture
function readyPic (link) {
    const image = document.createElement('img');
    image.classList.add('select__image');
    image.src = link;
    // image.src = fetchImage();
    container.prepend(image);

}
//Fetching the image and parcing into object, assigning url to the image through the callback
async function fetchJSON (callback) {    
    let response = await fetch(url);    
    data = await response.json();
    let link = await data.urls.regular;
    callback (link);
    return link;
}

//Calling the first picture making function
fetchJSON(readyPic);


//callback function for the changing of the picture
function reachImage(link) {
    const image = getImage();
    image.src = link;
}

//changing url on click
changeButton.addEventListener('click', () => {
    const image = getImage();
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
        alertsPlace.textContent = 'Click Add button to add your pictures below';
        emailValue();
        getEmails(checkRepeatedEmail);
        addEmailOption();
        createBox();
        e.target.reset();
            }
});


//adding emails to the list of emails
function addEmailOption () {
    let emailOption = document.createElement('option');
    emailOption.textContent = emailValue();
    emailOption.value = emailValue();
    emailOption.setAttribute('selected', 'true');
    emailsSelect.add(emailOption);
    
   
        let collArr = new Object();
        console.log((collArr));
        collArr.email = emailValue();
        collectionArray.push(collArr);
        
}


//collecting emails from emails select
function getEmails(callback) {
    let collection = emailsSelect.selectedOptions;
    console.log(collection.length);
 
        callback(collection);
}


//the check to see that input email hasn't already been added
function checkRepeatedEmail(collection) {
    // let collection = emailsSelect.selectedOptions;
    // console.log(collection);
    // console.log(collection.length);
    // for (let i = 0; i < collection.length; i++) {
    //     console.log(collection[i].label);
    //     if (collection.length === 0) {break;}
    //     for (let j = 1; j < ++collection.length; j++) {
    //         // console.log(collection[j].label);
    //         if (collection[j].label === collection[i].label) {
    //             document.querySelector('span').textContent = "This email already exists";
    //         }
    //         break;
    //     }
    // }
    // if (collection.length === 0) {
    //     const error = document.querySelector('span');
    //  error.textContent = "Please select at least one email";
    //    }
    //    if (collection.length < 0) {

    for (let i = 0; i < collection.length++; i++) {
        console.log(collection[i].label);
       
        // if (collection.length === 0) {break;}
       
            if (collection[i].label === emailValue()) {
                document.querySelector('span').textContent = "This email already exists";
             e.preventDefault();
             break; 
        }
    }
// }
}


//Adding elements after clicking add button
addButton.addEventListener('click', () => {
    document.querySelector('span').textContent = "";

    getEmailAndLink(searchLinks());
    addLinks(searchLinks());
    fetchJSON(reachImage);
    
});

//fucntion for validation images for the repeat
function repeatValidation () {
   const imageLink = getImage().src;
   console.log(imageLink);
   console.log(collectionArray);
   for(key of collectionArray) {
    console.log(key[i].value); 
   }

}

//Array for storying collections of images
let collectionArray = [];

//finding value of selected option and get link, identify the collection box
function getEmailAndLink(marker) {
    
        
    let collection = emailsSelect.selectedOptions;
    if (collection.length === 0) {
           const error = document.querySelector('span');
        error.textContent = "Please select at least one email";
          }
          else {
            if(marker === true) {
        for (let i = 0; i < collection.length; i++) {
            console.log(collection[i].label);
            const label = collection[i].label;
            const image = getImage();
            const imageLink = image.src;
            let emailBox = document.querySelector(`[data-email = '${label}']`);
            console.log(emailBox);
            console.log(emailBox.nextElementSibling);
            createImages(imageLink, emailBox);
        }
      }
    }
}

//adding links to the objects in the array
function addLinks (marker) {
    console.log(marker);
    if(marker === true) {
        console.log(marker);
    const imageLink = getImage().src;
    let collection = emailsSelect.selectedOptions;
    for (let i = 0; i < collection.length; i++) {
    const searchItem = collection[i].label;
    console.log(searchItem);
    let emailArray = collectionArray.find( collectionArray => collectionArray.email === searchItem);
    console.log(Object.keys(emailArray).length);
    console.log(emailArray);
    emailArray[Object.keys(emailArray).length] = imageLink;
    }
    }
}

//searching for the repeating links in the array
function searchLinks () {
    const imageLink = getImage().src;
    let marker = false;
    collectionArray.forEach(item => {
        for(key in item) {
            if (item[key] === imageLink) {
                document.querySelector('span').textContent = "This image has been used";
                break;
            }
            else {
                marker = true;
            }
        }
    });
    return marker;
}

//adding images to the boxes
function createImages (link, tag) {
    const image = document.createElement('img');
    image.src = link;
    image.classList.add('assign__image');
    const container = tag.nextElementSibling;
    container.prepend(image);
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
    // emailField.dataset.email = 
    displayField.prepend(box);
    box.prepend(emailField);
    box.append(imagesBox);
    addEmailName(emailField);
}


//add email name and dataset to the box
function addEmailName(emailField) {
    emailField.textContent = emailValue();
    emailField.dataset.email = emailValue();
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

