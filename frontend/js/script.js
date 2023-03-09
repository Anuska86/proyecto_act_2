//Index

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
    .then(response => response[0]?toogleChecks(true):toogleChecks(false))
.catch(function(err) {
    console.info(err );
});
}


function toogleChecks(isValid){
  if(isValid){
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

  function updateUser(formData) {
    fetch('http://localhost:8000/usuario', {
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

//Admin View
var selectedRow = null

function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null){
            insertNewRecord(formData);
            createUser(formData);
        }
        
        else{
            updateRecord(formData);
            updateUser(formData);
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
    cell4 = newRow.insertCell(4);
    cell4.innerHTML = `<button onClick="onEdit(this)" class="btn btn-info">Edit</button>
                       <button onClick="onDelete(this)" class="btn btn-danger">Delete</button>`;
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
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.user_name;
    selectedRow.cells[1].innerHTML = formData.user_pass;
    selectedRow.cells[2].innerHTML = formData.email;
    selectedRow.cells[3].innerHTML = formData.salary;
}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("employeeList").deleteRow(row.rowIndex);
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