let student_list = document.querySelector(".student-list");
let student_name = document.querySelector("#name");
let student_surname = document.querySelector("#surname");
let student_gender = document.querySelector("#gender");
let selectedclass = sessionStorage.getItem("selectedclass");
let students = [];

checkLocalStorage();

document.addEventListener('DOMContentLoaded', getStorageUI);

student_list.addEventListener("click", removeStudentUI);

function checkLocalStorage()
{
    if (localStorage.getItem(selectedclass + "_class_students")===null)
    {
        students = [];
    }
    else
    {
        students = JSON.parse(localStorage.getItem(selectedclass + "_class_students"));
    }
}

function getStorageUI()
{
    checkLocalStorage();
    if (students.length>0)
    {
        students.forEach(students_ => {
            student_list.innerHTML+=`
            <tr id="${students_.ID}">
                <td>${students_.NAME}</td>
                <td>${students_.SURNAME}</td>
                <td>${students_.GENDER}</td>
                <td><button class="delete-button btn btn-danger">Sil</button></td>
            </tr>
            `;
        });
    }
}

function addStudent()
{   
    if (student_name.value!=null && student_name.value!="" && student_surname.value!=null && student_surname.value!="")
    {
        if (students.length>0)
        {
            
            let student =
            {
              "NAME": student_name.value,
              "SURNAME": student_surname.value,
              "GENDER": student_gender.value,
              "CLASS": null,
              "ID": students[students.length-1].ID+1
            }
            students.push(student)
        }
        else
        {
            let student =
            {
                "NAME": student_name.value,
                "SURNAME": student_surname.value,
                "GENDER": student_gender.value,
                "CLASS": null,
                "ID": 1
            }
            students.push(student)
        }
        localStorage.setItem(selectedclass + "_class_students", JSON.stringify(students));
        student_name.value="";
        student_surname.value="";
        student_list.innerHTML="";
        getStorageUI()
        alert("Öğrenci Başarıyla Eklendi!");
    }
    else
    {
        alert("Ad ve Soyad Kısmı Boş Geçilemez!");
    }
}

function removeStudentUI(e)
{
    if (e.target.className==="delete-button btn btn-danger")
    {
        let values = e.target.parentElement.parentElement.id;
        e.target.parentElement.parentElement.remove();
        removeStudent(values)
    }
}

function removeStudent(std)
{
    checkLocalStorage();
    students.forEach(function (std_, index) {
        if (std_.ID == std.trim())
        {
            console.log("GİRİLDİ")
            students.splice(index, 1);
        }
    })
    localStorage.setItem(selectedclass + "_class_students", JSON.stringify(students));
    alert("Öğrenci Başarıyla Silindi!")
}

function exitStudent()
{
    window.location.href="class.html";
}

/*
<div class="card mt-3">
    <div class="card-body" id="${students_.ID}">
        <h5 class="card-title">Öğrenci: ${students_.NAME} ${students_.SURNAME}</h5>
        <p class="card-text">Cinsiyet: ${students_.GENDER}</p>
        <button class="delete-button">Sil</button>
    </div>
</div>*/