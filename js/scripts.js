// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = {};
  this.currentId = 0;
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts[contact.id] = contact;
};

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};

AddressBook.prototype.findContact = function(id) {
  if (this.contacts[id] !== undefined) {
    return this.contacts[id];
  }
  return false;
};

AddressBook.prototype.updateContact = function(e, editFirstName, editLastName, editPhoneMumber){
  let id = e.target.id;
  if(this.contacts[id] === undefined) {
    return false;
  } else if ( this.contacts[id] !== undefined) {
    this.contacts[id].firstName = editFirstName; 
    this.contacts[id].lastName = editLastName;
    this.contacts[id].phoneNumber = editPhoneMumber;
  }
  displayDetails(e);
  displayContacts(addressBook);
}

AddressBook.prototype.deleteContact = function(id) {
  if (this.contacts[id] === undefined) {
    return false;
  }
  delete this.contacts[id];
  return true;
};
function Address(street, city, zip) {
  this.street = street;
  this.city = city;
  this.zip = zip;
}

Address.prototype.fullAddress = function() {
  return this.street = this.street + " " + this.city + " " + this.zip;
};

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber, address, emailAddress) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.emailAddress = emailAddress;
  this.address = address;
}
Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
};

//UI
let addressBook = new AddressBook();

function createContact() {
  const firstName = document.getElementById("first-name").value;
  const lastName = document.getElementById("last-name").value;
  const phoneNumber = document.getElementById("phone-number").value;
  const emailAddress = document.getElementById("email-address").value;
  
  const streetAddress = document.getElementById("street").value;
  const cityAddress = document.getElementById("city").value;
  const ZipCodeAddress = document.getElementById("zip").value;

  const address = new Address(streetAddress, cityAddress, ZipCodeAddress);
  const contact = new Contact(firstName, lastName, phoneNumber, address, emailAddress);
  return contact;
}

function handleFormSubmission(e){
  e.preventDefault();
  addressBook.addContact(createContact());
  console.log("address bk: ", addressBook);
  displayContacts(addressBook);
}

function handleUpdate(e){
  // populate id info
  let editFirstName = document.getElementById("first-name").value;
  let editLastName = document.getElementById("last-name").value;
  let editPhoneMumber = document.getElementById("phone-number").value;
  addressBook.updateContact(e,editFirstName, editLastName, editPhoneMumber);
  
  console.log("editFirstName handle update/ addressBoook: ", editFirstName, editLastName, editPhoneMumber, addressBook);
}

function handleDelete(event) {
  addressBook.deleteContact(event.target.id);
  displayContacts(addressBook);
  console.log("Delete AB log: ", addressBook);
}

function displayContacts(addressBook) {
  let contactsDiv = document.getElementById("contact-div");
  contactsDiv.innerText = "";
  const ul = document.createElement("ul");
  Object.keys(addressBook.contacts).forEach( function (key) {
    const contact = addressBook.findContact(key);
    const li = document.createElement("li");
    li.append(contact.fullName());
    li.setAttribute("id", contact.id);
    ul.append(li);
  });  
  contactsDiv.append(ul);
}


function displayDetails(event) {
  let fullNameSpan = document.getElementById("full-name");
  let phoneNumSpan = document.getElementById("phone-num");
  let emailAddressSpan = document.getElementById("email");
  let addressSpan = document.getElementById("full-address");

  let contactDetails = addressBook.findContact(event.target.id);
  let fullName = contactDetails.firstName + " " + contactDetails.lastName;
  let fullAddress = contactDetails.address.street + " " + contactDetails.address.city + " " + contactDetails.address.zip;
  let updateButton = document.querySelector(".update");
  let delButton = document.querySelector(".delete");

  console.log("full Addy ", fullAddress);

  fullNameSpan.replaceChildren(fullName);
  phoneNumSpan.replaceChildren(contactDetails.phoneNumber);
  emailAddressSpan.replaceChildren(contactDetails.emailAddress);
  addressSpan.replaceChildren(fullAddress);
  updateButton.setAttribute("id", event.target.id);
  delButton.setAttribute("id",event.target.id);
}

window.addEventListener("load", function(){
  const form = document.querySelector("#form");
  form.addEventListener("submit", handleFormSubmission);
  document.getElementById("contact-div").addEventListener("click", displayDetails);
  document.querySelector(".update").addEventListener("click", handleUpdate);
  document.querySelector(".delete").addEventListener("click", handleDelete);
});