let Class=[];

checkLocalStorage();

let selectUl = document.querySelector(".selectClass table");
let addClass = document.querySelector(".add-class");
let selectLi = selectUl;

selectLi.addEventListener("click", selectLiToUI);

function selectLiToUI(e)
{
    if (e.target.id==="class-li-item")
    {
        let li = e.target.textContent.trim().toUpperCase();
        sessionStorage.setItem("selectedclass", li)
        classtype = sessionStorage.getItem("selectedclass") + "_class_type";
        classteacher = sessionStorage.getItem("selectedclass") + "_class_teacher";
        if (localStorage.getItem(classtype)===null || localStorage.getItem(classteacher)===null)
            window.location.href = "class-type.html";
        else
            window.location.href = "class.html";
    }
}

document.addEventListener('DOMContentLoaded', getStorageUI);

addClass.addEventListener("click", ()=> {
    let classname = prompt("Sinif Adi Giriniz : ");
    if (classname!=null && classname!="")
    {
        let controller=true;
        Class.forEach(class_ => {
            if (classname.toUpperCase()===class_.toUpperCase())
                controller=false;
        });
        if (controller)
        {
            Class.push(classname.toUpperCase());
            selectUl.innerHTML+=`
            <thead class="table table-hover">
                    <th id="class-li-item">${classname.toUpperCase()}<i id="remove-class" class="bi bi-x-circle" ></i></th>
            </thead>
            `;
            localStorage.setItem("class", JSON.stringify(Class));
        }
        else
            alert("Bu Sinif Adi Zaten Mevcut!");
    }
    else if (classname=="")
        alert("Sinif Adi Bos Gecilemez!");
});

selectUl.addEventListener("click", removeClassToUI);


function checkLocalStorage()
{
    if (localStorage.getItem("class")===null)
    {
        Class = [];
    }
    else
    {
        Class = JSON.parse(localStorage.getItem("class"));
    }
}

function getStorageUI()
{
    checkLocalStorage();
    if (Class.length>0)
    {
        Class.forEach(class_ => {
            selectUl.innerHTML+=`
            <thead class="table table-hover">
                    <th scope="col" id="class-li-item">${class_}<i id="remove-class" class="bi bi-x-circle" ></i></th>
            </thead>
            `;
        });
    }
}

function removeClassToUI(e)
{
    if (e.target.id=="remove-class")
    {
        confirm_ = confirm("Silmek istediğinizden emin misiniz?");
        if (confirm_)
        {
            let class_name = e.target.parentElement.textContent.trim();
            e.target.parentElement.remove();
            removeClass(class_name);
            localStorage.removeItem(class_name + "_class_type");
            localStorage.removeItem(class_name + "_class_teacher");
            localStorage.removeItem(class_name + "_class_students");
        }
    }
}

function removeClass(getClass)
{
    checkLocalStorage();
    Class.forEach(function(class_,index){
        if (getClass===class_)
        {
            Class.splice(index,1);
        }
    });
    localStorage.setItem("class", JSON.stringify(Class));
}