class Product{
    constructor(name, quantity, price){
        this.name = name;
        this.quantity= quantity;
        this.price = price;
        this.sum = this.price*this.quantity;
    }
   
}
function getdate(){
    const date = new Date();
    str = date.getFullYear().toString()+"-"+date.getMonth().toString()+'-'+date.getDay().toString();
    return str;
}

function deleteProductFromLS(i){
    localStorage.removeItem(i);
    console.log(localStorage);
}
function addProductToLS(p,i){
        const pr = {
            'nazwa': p.name,
            'cena': p.price,
            'ilość':p.quantity,
            'suma':p.sum
        }
        localStorage.setItem(i,JSON.stringify(pr));

    }
function getProduct(id){
    let pr = JSON.parse(localStorage[id]);
    return pr;

}

function tableCreate() {
    const body = document.body;
    tbl = document.createElement('table');
    tbl.style.width = "auto";
    tbl.style.border = "1px solid black";
    
    //add headres
    const titles = ["nazwa","cena","ilość","suma"];
    let header = tbl.createTHead();
    let row = header.insertRow();
    let cell = row.insertCell();
    cell.style.border = "1px solid black";
    //add content
    for (let i=1;i<titles.length+1;i++){
        let cell = row.insertCell(i);
        cell.innerHTML = titles[i-1];
        cell.style.border = "1px solid black";
    }
    for(let i =0;i<localStorage.length;i++){
        let tr = tbl.insertRow();
        tr.value = i;
        const item = getProduct(i+1);
        for(let j =0;j<titles.length+2;j++){
            let td = tr.insertCell();
            //Delete button
            if(j==5){
                td.insert;
                //const svgPath = "bin.svg";

                const btn = document.createElement('input');
                btn.type = "button";
                btn.className = "btn";
                //const img = document.createElement('img');
                //img.src = "bin.svg";
                //img.src = "bin.svg";
                btn.style.backgroundImage = "url('delete.png')";
                btn.style.backgroundSize = "contain";
                btn.style.backgroundRepeat = "no-repeat";
                
                btn.onclick = function(){
                    deleteRow(tr.value);
                };
                td.appendChild(btn);
                


            }
            //print number rows
            if(j==0){
                td.appendChild(document.createTextNode(i+1));

            }
            //print items
            else if(j != 5){
                td.appendChild(document.createTextNode(item[titles[j-1]]));
            }
            td.style.border = '1px solid black';


        }
    }
    function deleteRow(id){
        var rows = tbl.rows;
        for (let index = 0; index < rows.length; index++) {
            if(rows[index].value == id){
                tbl.deleteRow(index);
                deleteProductFromLS(index);
            }

            
        }
   }


    body.appendChild(tbl);
}
const myform = document.getElementById("newProduct")
myform.onsubmit = (event) => {
        //document.getElementsByTagName("table").style.display = "block";

        let nazwa = event.target.nazwa.value
        let cena = event.target.cena.value
        let amt =event.target.amount.value
        let pr = new Product(nazwa,cena,amt);
        addProductToLS(pr,4);

}
 
let pr = new Product('Jabłka',1.5,4.9);
addProductToLS(pr,1);
pr = new Product('Bułka',5,0.49);
addProductToLS(pr,2);
pr = new Product('Pomidor',2,1.59);
addProductToLS(pr,3);
// write current date to title
//txt = document.createTextNode('Paragon '+getdate());
const date = new Date();

const t = document.getElementsByTagName("h1");
//let data = getdate();
document.getElementsByTagName("h1").innerHTML = "Paragon " + date.toLocaleDateString("pl");


tableCreate();
addingElementsTable();
