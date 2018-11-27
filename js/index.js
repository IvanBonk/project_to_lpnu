let dayValue = 0; 
let classValue;
$('.day').click(dayChoise);
$('.classNum').click(classChoise);
$('.access').click(accessChoise);




function dayChoise(event){
    const target = event.target;
    dayValue = target.name
    $('.dayBtn').text(target.innerText); 
}

function classChoise(event) {
    const target = event.target;
    classValue = target.name;
    $('.classBtn').text(target.innerText);
    
    const courseList = new LessonList('')
}

function accessChoise(){
    const lessonList = new LessonList('lessons.json', $('tbody'));
}

class LessonList {
    constructor (lessonsUrl, renderContainer) {
        fetch(lessonsUrl)
            .then(result => result.json() )
            .then(products => {
                this.products = products;
                this.renderProducts(renderContainer, products);
            })
    }
   
    renderProducts(container, products,) {
        let productListDomString = '';
        
        console.log(products);
        
        products.forEach(product => {
          
            if(product.class === classValue){
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
        });
        $('table').css('display', 'table');
        container.html(productListDomString);
    }
}

