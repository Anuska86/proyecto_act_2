(function() {
  $('form > input').keyup(function() {

      var empty = false;
      $('form > input').each(function() {
          if ($(this).val() == '') {
              empty = true;
          }
      });

      if (empty) {
          $('#loginBtn').attr('disabled', 'disabled'); 
      } else {
          $('#loginBtn').removeAttr('disabled'); 
      }
  });
})()

function getUsers() {
  fetch(`http://localhost:8000/usuario`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      insertNewRecordFromDB(data);
    })
.catch(function(err) {
    console.info(err );
});
}

function checkUser() {
  let loginName = document.getElementById('user_input').value;
  let loginPassword = document.getElementById('pass_input').value;
  fetch(`http://localhost:8000/usuario/${loginName}/${loginPassword}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
  })
    .then(response => response.json())
    .then(response => response[0]?toogleChecks(true,response[0]):toogleChecks(false,response[0]))
.catch(function(err) {
    console.info(err );
});
}


function toogleChecks(isValid,response){
  if(isValid && response.tipo==='Administrador'){
    document.getElementById('admin_link').style.display="block";
    document.getElementById('admin_link_alert').style.display="none";
  }else{
    document.getElementById('admin_link').style.display="none";
    document.getElementById('admin_link_alert').style.display="block";
  }
}

  function createUser(formData) {
    fetch('http://localhost:8000/usuario', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        "nombre_usuario": formData.user_name,
        "pass": formData.user_pass,
        "email": formData.email,
        "salario": formData.salary,
        "tipo": "Usuario"
      })
    })
      .then(response => response.json())
  }

  function updateFromDB(td,formData) {
    let id = parseInt(td)
    fetch(`http://localhost:8000/usuario/${id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        "nombre_usuario": formData.user_name,
        "pass": formData.user_pass,
        "email": formData.email,
        "salario": formData.salary,
        "tipo": "Usuario"
      })
    })
      .then(response => response.json())
  }


  function deleteFromDB(td){
    let id = parseInt(td.parentElement.parentElement.lastElementChild.textContent)
    fetch(`http://localhost:8000/usuario/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(response => response.json())
  }

var selectedRow = null

function onFormSubmit() {
    if (validate() && validatePass() && validateEmail()) {
        var formData = readFormData();
        if (selectedRow == null){
            //insertNewRecord(formData);
            createUser(formData);
            getUsers()
        }
        
        else{
            updateRecord(formData);
            //updateUser(formData);
        }
        resetForm();
    }
}

function readFormData() {
    var formData = {};
    formData["user_name"] = document.getElementById("user_name").value;
    formData["user_pass"] = document.getElementById("user_pass").value;
    formData["email"] = document.getElementById("email").value;
    formData["salary"] = document.getElementById("salary").value;
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.user_name;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.user_pass;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.email;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.salary;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = `<button onClick="onEdit(this)" class="btn btn-info">Edit</button>
                       <button onClick="onDelete(this)" class="btn btn-danger">Delete</button>`;
}

function insertNewRecordFromDB(data) {
  document.getElementById("employeeList").getElementsByTagName('tbody')[0].replaceChildren();
  var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
  for (var i = 0; i < data.length; i++) {
  var newRow = table.insertRow(table.length);
  cell1 = newRow.insertCell(0);
  cell1.innerHTML = data[i].nombre_usuario;
  cell2 = newRow.insertCell(1);
  cell2.innerHTML = data[i].pass;
  cell3 = newRow.insertCell(2);
  cell3.innerHTML = data[i].email;
  cell4 = newRow.insertCell(3);
  cell4.innerHTML = data[i].salario;
  cell5 = newRow.insertCell(4);
  cell5.innerHTML = `<button onClick="onEdit(this)" class="btn btn-info">Edit</button>
                     <button onClick="onDelete(this)" class="btn btn-danger">Delete</button>`;
  cell6 = newRow.insertCell(5);
  cell6.innerHTML = data[i].id;
  }
}

function resetForm() {
    document.getElementById("user_name").value = "";
    document.getElementById("user_pass").value = "";
    document.getElementById("email").value = "";
    document.getElementById("salary").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("user_name").value = selectedRow.cells[0].innerHTML;
    document.getElementById("user_pass").value = selectedRow.cells[1].innerHTML;
    document.getElementById("email").value = selectedRow.cells[2].innerHTML;
    document.getElementById("salary").value = selectedRow.cells[3].innerHTML;
    localStorage.setItem('editValue', td.parentElement.parentElement.lastElementChild.textContent);
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.user_name;
    selectedRow.cells[1].innerHTML = formData.user_pass;
    selectedRow.cells[2].innerHTML = formData.email;
    selectedRow.cells[3].innerHTML = formData.salary;
    let td = localStorage.getItem('editValue');
    updateFromDB(td,formData);
}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("employeeList").deleteRow(row.rowIndex);
        deleteFromDB(td);
        resetForm();
    }
}
function validate() {
    isValid = true;
    if (document.getElementById("user_name").value == "") {
        isValid = false;
        document.getElementById("user_nameValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("user_nameValidationError").classList.contains("hide"))
            document.getElementById("user_nameValidationError").classList.add("hide");
    }
    return isValid;
}

function validatePass() {
  isValid = true;
  if (document.getElementById("user_pass").value == "") {
      isValid = false;
      document.getElementById("user_passValidationError").classList.remove("hide");
  } else {
      isValid = true;
      if (!document.getElementById("user_passValidationError").classList.contains("hide"))
          document.getElementById("user_passValidationError").classList.add("hide");
  }
  return isValid;
}

function validateEmail() {
  isValid = true;
  if (document.getElementById("email").value == "") {
      isValid = false;
      document.getElementById("emailValidationError").classList.remove("hide");
  } else {
      isValid = true;
      if (!document.getElementById("emailValidationError").classList.contains("hide"))
          document.getElementById("emailValidationError").classList.add("hide");
  }
  return isValid;
}