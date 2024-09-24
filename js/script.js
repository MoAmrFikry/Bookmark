let sitename = document.getElementById("sitename");
let siteurl = document.getElementById("siteurl");
let Add = document.getElementById("Add");
let alertName=document.getElementById("alert")
let savebookmark = [];
function validateForm(){

    let expression=/(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])?/;
    let regex=new RegExp(expression);
    if(!siteurl.value.match(regex)){
        siteurl.classList.add('is-invalid');
        siteurl.classList.remove('is-valid');
        alertName.classList.remove('d-none')
        return false
    }
    else {
        siteurl.classList.add('is-valid');
        siteurl.classList.remove('is-invalid');
        alertName.classList.add('d-none')
        return true;
    }
    }
if (localStorage.getItem("bookmark") !== null) {
    savebookmark = JSON.parse(localStorage.getItem("bookmark"));
    display();
}

siteurl.addEventListener('blur',validateForm);
function Addbook() {
    if (sitename.value === "" || siteurl.value === "") {
        window.alert("Must enter name and URL");
        return;
    }

    if (!validateForm()) {
        return;
    }

    let mark = {
        markname: sitename.value,
        markURL: siteurl.value
    };


    let isDuplicate = savebookmark.some(bookmark => bookmark.markURL === mark.markURL);

    if (isDuplicate) {
        alert("This URL is already bookmarked.");
        return;
    }

    savebookmark.push(mark);
    localStorage.setItem("bookmark", JSON.stringify(savebookmark));
    clear();
    display();
}

function clear() {
    sitename.value = '';
    siteurl.value = '';
}

function display() {
    let showdata = '';
    for (let i = 0; i < savebookmark.length; i++) {
        showdata += `
            <tr>
                <td>${savebookmark[i].markname}</td>
                <td>${savebookmark[i].markURL}</td>
                <td><button type="button" class="btn btn-primary" onclick="visit(${i})">Visit</button></td>
                <td><button type="button" class="btn btn-outline-danger" onclick="Del(${i})">Delete</button></td>
            </tr>
        `;
    }
    
    document.getElementById("tabledata").innerHTML = showdata;
}

function Del(index) {
    if (confirm("Are you sure you want to delete this item?")) {
      
        savebookmark.splice(index, 1);
        localStorage.setItem("bookmark", JSON.stringify(savebookmark));
        display();
    }
}

function visit(index) {
    window.open(savebookmark[index].markURL);
}


