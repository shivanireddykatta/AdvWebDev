let form = document.getElementById("form");

// localStorage.clear();
// let Entries = [];

const retriveEntries = () => {
  let entries = localStorage.getItem("userEntry");

  if (entries) {
    entries = JSON.parse(entries);
  } else {
    entries = [];
  }
  return entries;
};

let Entries = retriveEntries();

const displayEntries = () => {
  const entries = retriveEntries();

  const rows = entries
    .map((entry) => {
      const name = `<td class="td">${entry.name}</td>`;
      const email = `<td class="td">${entry.email}</td>`;
      const password = `<td class="td">${entry.password}</td>`;
      const dob = `<td class="td">${entry.dob}</td>`;
      const acceptConditions = `<td class="td">${entry.acceptConditions}</td>`;

      const row = `<tr>${name} ${email} ${password} ${dob} ${acceptConditions}</tr>`;
      return row;
    })
    .join("\n");

  let tableDiv = document.getElementById("tableDiv");

  // <th class="th">Name</th> inside oneMore head for name
  tableDiv.innerHTML = `<table class="table" border="2">
  <tr>
    <th class="th">Name</th>
    <th class="th">Email</th>
    <th class="th">Password</th>
    <th class="th">Dob</th>
    <th class="th">Accepted terms?</th>
  </tr>
    ${rows}
  </table>`;
};

// const saveUserFrom = () => {
const saveUserFrom = (event) => {
  event.preventDefault();

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let dob = document.getElementById("dob").value;
  let acceptConditions = document.getElementById("agree").checked;

  let entry_obj = {
    name,
    email,
    password,
    dob,
    acceptConditions,
  };

  Entries.push(entry_obj);

  localStorage.setItem("userEntry", JSON.stringify(Entries));

  displayEntries();
};

form.addEventListener("submit", saveUserFrom);

displayEntries();

// Add additional validations to the date input field so that it accepts date of birth for people between ages 18 and 55 only. You'll need to figure out how to do this.

function getAge(today, birthDate) {
  // var today = new Date();
  // var birthDate = new Date(DOB);

  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

let dateELE = document.getElementById("dob");

dateELE.addEventListener("change", () => {
  let [year, month, date] = document.getElementById("dob").value.split("-");

  let dob = new Date(year, month, date);
  let Today = new Date();

  age = getAge(Today, dob);

  dateELE.style.border = "2px solid rgba(0, 0, 0, 0.4)";
  if (age < 18 || age > 55) {
    dateELE.setCustomValidity("Your age is not lies between 18 and 55");
    dateELE.style.border = "2px solid red";
    return;
  } else {
    dateELE.setCustomValidity("");
  }
});

const email = document.getElementById("email");

email.addEventListener("input", () => validate(email));

function validate(ele) {
  if (ele.validity.typeMismatch) {
    ele.setCustomValidity("The Email is not in the right format!!!");
    ele.reportValidity();
  } else {
    ele.setCustomValidity("");
  }
}