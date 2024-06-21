// Sample student data
let students = [];

// Initialize student list
function initStudentList() {
    let studentList = document.getElementById('studentList');
    studentList.innerHTML = ''; // Clear existing content

    students.forEach(student => {
        let studentDiv = createStudentElement(student);
        studentList.appendChild(studentDiv);
    });
}

// Create DOM element for a student
function createStudentElement(student) {
    let studentDiv = document.createElement('div');
    studentDiv.classList.add('student');

    let nameLabel = document.createElement('span');
    nameLabel.textContent = 'Name: ' + student.name;
    studentDiv.appendChild(nameLabel);

    let dateLabel = document.createElement('p');
    dateLabel.textContent = 'Date: ' + student.date;
    studentDiv.appendChild(dateLabel);

    let absenceLabel = document.createElement('p');
    absenceLabel.textContent = 'Absence: ' + student.absence;
    studentDiv.appendChild(absenceLabel);

    let phoneLabel = document.createElement('p');
    phoneLabel.textContent = 'Phone: ' + student.phone;
    studentDiv.appendChild(phoneLabel);

    // Edit button
    let editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => editStudent(student));
    studentDiv.appendChild(editButton);

    // Delete button
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteStudent(student));
    studentDiv.appendChild(deleteButton);

    return studentDiv;
}

// Load student data from localStorage
function loadStudents() {
    let savedStudents = localStorage.getItem('students');
    if (savedStudents) {
        students = JSON.parse(savedStudents);
    }
}

// Save student data to localStorage
function saveStudents() {
    localStorage.setItem('students', JSON.stringify(students));
}

// Add new student
function addStudent(event) {
    event.preventDefault();

    let form = event.target;
    let student = {
        name: form.name.value,
        date: form.date.value,
        absence: form.absence.value,
        phone: form.phone.value
        // Add more fields as needed
    };

    students.push(student);
    saveStudents();
    initStudentList();

    // Reset the form
    form.reset();
}

// Edit student
function editStudent(student) {
    // Replace form with edit fields
    let studentList = document.getElementById('studentList');
    let studentIndex = students.indexOf(student);
    let studentDiv = studentList.childNodes[studentIndex];
    studentDiv.innerHTML = ''; // Clear existing content

    let editForm = document.createElement('form');
    editForm.classList.add('editStudentForm');

    let nameInput = createInput('text', 'name', student.name);
    let dateInput = createInput('date', 'date', student.date);
    let absenceInput = createSelect('absence', ['present', 'absent'], student.absence);
    let phoneInput = createInput('tel', 'phone', student.phone);

    editForm.appendChild(nameInput);
    editForm.appendChild(dateInput);
    editForm.appendChild(absenceInput);
    editForm.appendChild(phoneInput);

    let saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.addEventListener('click', () => saveEditedStudent(student, editForm));
    editForm.appendChild(saveButton);

    studentDiv.appendChild(editForm);
}

// Delete student
function deleteStudent(student) {
    let confirmation = confirm('Are you sure you want to delete this student?');
    if (confirmation) {
        let index = students.indexOf(student);
        students.splice(index, 1);
        saveStudents();
        initStudentList();
    }
}

// Save edited student
function saveEditedStudent(student, editForm) {
    let name = editForm.querySelector('#name').value;
    let date = editForm.querySelector('#date').value;
    let absence = editForm.querySelector('#absence').value;
    let phone = editForm.querySelector('#phone').value;

    let updatedStudent = {
        name: name,
        date: date,
        absence: absence,
        phone: phone
        // Add more fields as needed
    };

    let index = students.indexOf(student);
    students[index] = updatedStudent;
    saveStudents();
    initStudentList();
}

// Utility function to create input elements
function createInput(type, id, value) {
    let input = document.createElement('input');
    input.type = type;
    input.id = id;
    input.value = value;
    return input;
}

// Utility function to create select elements
function createSelect(id, options, selected) {
    let select = document.createElement('select');
    select.id = id;

    options.forEach(option => {
        let optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option.charAt(0).toUpperCase() + option.slice(1);
        if (option === selected) {
            optionElement.selected = true;
        }
        select.appendChild(optionElement);
    });

    return select;
}

// Initialize the application
function init() {
    loadStudents();
    initStudentList();

    // Add event listener to the
}