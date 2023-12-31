let selectedclass = sessionStorage.getItem("selectedclass");
let students = JSON.parse(localStorage.getItem(selectedclass + "_class_students"));
let title = document.querySelector(".title");
let teacher = document.querySelector(".teacher");
let disabled = document.querySelector(".disabled");
let student_select_wrapper = document.querySelector(".students-select-wrapper");
let student_ul = document.querySelector(".student-ul");
let table_number = 0;
let btnPrint = document.querySelector("#btnPrint");
let btnStudents = document.querySelector("#btnStudents");
let btnExit = document.querySelector("#btnExit");
let btnExitStudents = document.querySelector("#exit");

title.textContent="Sınıf : " + selectedclass;
teacher.textContent="Öğretmen : " + localStorage.getItem(selectedclass + "_class_teacher");

btnPrint.addEventListener("click", () => {
    var element = document.querySelector(".class-wrapper");
    btnStudents.style.display="none";
    btnPrint.style.display="none";
    btnExit.style.display="none";
    print(element)
    btnStudents.style.display="";
    btnPrint.style.display="";
    btnExit.style.display="";
})

student_ul.addEventListener("click", (e) => {
    if (e.target.className=="class-li-item")
    {
        students.forEach( std_ => {
            if (std_.CLASS == table_number)
            {
                std_.CLASS = null;
                localStorage.setItem(selectedclass + "_class_students", JSON.stringify(students));
            }
        })
        students.forEach( std_ => {
            if (e.target.id==std_.ID)
            {
                std_.CLASS=table_number;
                localStorage.setItem(selectedclass + "_class_students", JSON.stringify(students));
            }
        })
        disabled.setAttribute("style", "display: none");
        student_select_wrapper.setAttribute("style", "display: none");
        getClass();
    }
})

btnExitStudents.addEventListener("click", () => {
    disabled.setAttribute("style", "display: none");
    student_select_wrapper.setAttribute("style", "display: none");
})

btnStudents.addEventListener("click", () => {
    window.location.href="students.html";
})

btnExit.addEventListener("click", () => {
    window.location.href="index.html";
})

getClass();

let clicked = document.querySelectorAll("img");

document.querySelector(".student-table-wrapper").addEventListener("click", (e) => {
    if (e.target.tagName=="IMG")
    {
        table_number = e.target.id;
        
        disabled.setAttribute("style", "display: flex");
        student_select_wrapper.setAttribute("style", "display: flex");
        student_ul.innerHTML="";
        students.forEach( std_ => {
            student_ul.innerHTML+=`
            <li class="class-li-item" id="${std_.ID}">${std_.NAME} ${std_.SURNAME}</li>
            `;
        })
    }
})

function getClass()
{
    let wrapper=document.querySelector(".student-table-wrapper");
    let count=1;
    let type_ = JSON.parse(localStorage.getItem(selectedclass + "_class_type"))
    let student_count=type_[0];
    let yan_yana_sira=type_[1];
    
    wrapper.innerHTML="";

    for (let i=1; i<=student_count/(yan_yana_sira*2)+1; i++)
    {
        for (let j=1; j<=yan_yana_sira*2; j++)
        {
            if (count%2==0)
            {
                let control=true;
                students.forEach( std_ => {
                    if (std_.CLASS == count)
                    {
                        if (std_.GENDER=="Erkek")
                        {
                            wrapper.innerHTML+=`
                            <img class="left-table" id="${count}" src="img/tables/man-table-right.png">
                            </img>
                            <i class="man-right" id="table">${std_.NAME} ${std_.SURNAME}</i>
                            `;
                        }
                        else
                        {
                            wrapper.innerHTML+=`
                            <img class="left-table" id="${count}" src="img/tables/girl-table-right.png">
                            </img>
                            <i class="girl-right" id="table">${std_.NAME} ${std_.SURNAME}</i>
                            `;
                        }
                        control=false;
                    }
                })
                if (control)
                {
                    wrapper.innerHTML+=`
                    <img class="left-table" id="${count}" src="img/tables/space-table-right.png">
                    </img>
                    <i class="space-right" id="table">BOŞ SIRA</i>
                    `;
                }
            }
            else
            {
                let control=true;
                students.forEach( std_ => {
                    if (std_.CLASS == count)
                    {
                        if (std_.GENDER=="Erkek")
                        {
                            wrapper.innerHTML+=`
                            <img class="right-table" id="${count}" src="img/tables/man-table-left.png">
                            </img>
                            <i class="man-left" id="table">${std_.NAME} ${std_.SURNAME}</i>
                            `;
                        }
                        else
                        {
                            wrapper.innerHTML+=`
                            <img class="right-table" id="${count}" src="img/tables/girl-table-left.png">
                            </img>
                            <i class="girl-left" id="table">${std_.NAME} ${std_.SURNAME}</i>
                            `;
                        }
                        control=false;
                    }
                })
                if (control)
                {
                    wrapper.innerHTML+=`
                    <img class="right-table" id="${count}" src="img/tables/space-table-left.png">
                    </img>
                    <i class="space-left" id="table">BOŞ SIRA</i>
                    `;
                }
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
            rt_.style.width="110px";
        })
        lt.forEach(lt_ => {
            lt_.style.width="110px";
        })
    }
}