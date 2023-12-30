classtype = sessionStorage.getItem("selectedclass") + "_class_type";
classteacher = sessionStorage.getItem("selectedclass") + "_class_teacher";
classstudents = sessionStorage.getItem("selectedclass") + "_class_students";
let studentCount = document.querySelector(".studentCount");
let tableCount = document.querySelector(".tableCount");
let teacherName = document.querySelector(".teacherName");
let btnCreate = document.querySelector("#btnCreate");
let preview = document.querySelector(".class-preview");

btnCreate.disabled=true;

studentCount.addEventListener('input', getStudentCount);
tableCount.addEventListener('input', getTableCount);
teacherName.addEventListener('input', getTeacherName);

btnCreate.addEventListener("click", () => {
    let type_ = [];
    let students = [];
    type_.push(studentCount.value, tableCount.value);
    localStorage.setItem(classtype, JSON.stringify(type_));
    localStorage.setItem(classteacher, teacherName.value)
    localStorage.setItem(classstudents, JSON.stringify(students));
    window.location.href = "class.html";
})

function getTeacherName()
{
    if (studentCount.value!="" && tableCount.value!="" && teacherName.value!="")
    {
        btnCreate.disabled=false;
    }
    else
    {
        btnCreate.disabled=true;
    }
}

function getStudentCount()
{
    if (studentCount.value<0)
        studentCount.value=0;
    if (studentCount.value!="" && tableCount.value!="" && studentCount.value>=2 && tableCount.value>=1)
    {
        getPreview();
    }
    else
    {
        preview.innerHTML=``;
    }
}

function getTableCount()
{
    if (tableCount.value<0)
        tableCount.value=0;
        if (tableCount.value>6)
        tableCount.value=6;
    if (studentCount.value!="" && tableCount.value!="" && studentCount.value>=2 && tableCount.value>=1)
    {
        getPreview();
    }
    else
    {
        preview.innerHTML=``;
    }
}

function getPreview()
{
    preview.innerHTML=`
    <div class="label"><center>SİZE EN UYGUN SINIFIN ÖNİZLEMESİNİ OLUŞTURDUK<center></div>
    <div class="class-object">
        <div class="board-wrapper">
            <div class="board"></div>
       </div>
        <div class="main">
            <div class="student-table-wrapper">

            </div>
        </div>
    </div>
    `;

    let wrapper=document.querySelector(".student-table-wrapper");
    let count=1;
    let student_count=studentCount.value;
    let yan_yana_sira=tableCount.value;
    
    for (let i=1; i<=student_count/(yan_yana_sira*2)+1; i++)
    {
        for (let j=1; j<=yan_yana_sira*2; j++)
        {
            if (count%2==0)
            {
                wrapper.innerHTML+=`
                <img class="left-table" src="img/tables/space-table-right.png"></img>
                `;
            }
            else
            {
                wrapper.innerHTML+=`
                <img class="right-table" src="img/tables/space-table-left.png"></img>
                `;
            }
            count++;
        }
        wrapper.innerHTML+=`
        <br><br>
        `;
    }
    
    let rt=document.querySelectorAll(".right-table");
    let lt=document.querySelectorAll(".left-table");
    
    if (yan_yana_sira<=5)
    {
        rt.forEach(rt_ => {
            rt_.style.width="150px";
        })
        lt.forEach(lt_ => {
            lt_.style.width="150px";
        })
    }
    else if (yan_yana_sira>5 && yan_yana_sira<=6)
    {
        rt.forEach(rt_ => {
            rt_.style.width="125px";
        })
        lt.forEach(lt_ => {
            lt_.style.width="125px";
        })
    }
}