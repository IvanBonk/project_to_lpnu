let dayValue = 0; 
let courseValue;
let groupValue;
$('.day').click(dayChoise);
$('.courseNum').click(courseChoise);
$('.access').click(accessChoise);
$('.subjItem').click(accessSubj);

function accessSubj(event) {
    const target = event.target;
    $('.subject_class').text(target.innerText);
}


function dayChoise(event){
    const target = event.target;
    dayValue = target.name;
    $('.dayBtn').text(target.innerText); 
}

function courseChoise(event) {
    const target = event.target;
    courseValue = target.name;
    $('.courseBtn').text(target.innerText);
    let action = true;
    const courseList = new LessonList('lessons.json', $('.render_dropdown'), action)
}

function groupChoise(event){
    const target = event.target;
    groupValue = target.name;
    $('.numberBtn').text(target.innerText);
}

function accessChoise(){
    let action = false;
    const lessonList = new LessonList('lessons.json', $('tbody'), action);
}

class LessonList {
    constructor (lessonsUrl, renderContainer, action) {
        fetch(lessonsUrl)
            .then(result => result.json() )
            .then(products => {
                this.products = products;
                if(action) {
                    this.renderDropdown(renderContainer, products)
                }
                else this.renderProducts(renderContainer, products);
            })
    }
   
    renderProducts(container, products) {
        let productListDomString = '';

        products.forEach(product => {
          
            if(product.course === +courseValue){
                if(product.group === groupValue){
                    if(product.day === +dayValue){
                        productListDomString +=
                            `<tr>
                              <th scope="row">${product.lesson}</th>
                              <td>${product.name}</td>
                              <td>${product.teacher}</td>
                              <td>${product.room}</td>
                            </tr>`;
                    }
                }
            }    
        });
        $('table').css('display', 'table');
        container.html(productListDomString);
    }
    
    renderDropdown(container, products) {
        let productListDomString = '';
        
        let curr;
        products.forEach(product => {
            if(product.course === +courseValue){
                if(product.group != curr){
                    curr = product.group;
                productListDomString +=
                    `<a class="dropdown-item groupName" name="${product.group}">${product.group}</a>`;
            
                }
            }    
        });
        container.html(productListDomString);
        $('.groupName').click(groupChoise);
    }
}


$('td').click(pressTable);
$('.addTeacherBtn').click(showTable);
$('.nextTeacher').click(nextTeacher);

function pressTable(event) {
    const target = event.target;
    $(target).toggleClass('BlueBG');
}

function showTable(){
    $('.addTeacher').toggle();
}

let listOfTeachers;
function nextTeacher(){
    $('td').removeClass('BlueBG');
    
    const teachSurname = document.querySelector('.teacherSurname').value;
    const teachName = document.querySelector('.teacherName').value;
    const teachFat = document.querySelector('.teacherFather').value;
    const teachRoom = document.querySelector('.teacherRoom').value;
    const teachSubj = document.querySelector('.subject_class').innerText;
    const name = teachSurname + ' ' + teachName[0] + '. ' + teachFat[0] +'.';
    listOfTeachers += `<tr>
                    <td>${name}</td>
                    <td>${teachSubj}</td>
                    <td>${teachRoom}</td>
                  </tr>`;
    
    $('.listTeacher').html(listOfTeachers);
    document.querySelector('.teacherSurname').value = '';
    document.querySelector('.teacherName').value = '';
    document.querySelector('.teacherFather').value = '';
    document.querySelector('.teacherRoom').value = '';
    document.querySelector('.subject_class').innerText = 'Предмет';
}
