//inbut
let title=document.getElementById('title')
let price=document.getElementById('price')
let texes=document.getElementById('texes')
let ads=document.getElementById('ads')
let descount=document.getElementById('descount')
let total=document.getElementById('total')
let count=document.getElementById('count')
let category=document.getElementById('category')
let search=document.getElementById('search')
let sub=document.getElementById('sub')
// outbut
let update=document.getElementById('update')
let deletee=document.getElementById('delete')

let countf='';
let data;


let mood='creat'
let searchMood='title'
let tmp;

if(localStorage.items!=null){
data=JSON.parse(localStorage.items)
}else{
    data=[]
}

sub.onclick=function(){

    if(title.value!=''&&price.value!=0){

    let newitem={
     title:title.value,
     price:price.value,
     texes:texes.value,
     ads:ads.value,
     descount:descount.value,
     total:countf,
     count:count.value,
     category:category.value
    }

    if(mood==='creat'){
        if(newitem.count>1){
            for(let i=0 ; i<newitem.count;i++){
                data.push(newitem)
            }
    
        }else{
            data.push(newitem)
        }

    }else{

        data[tmp]=newitem
        mood='creat'
        sub.innerHTML='creat'
        count.style.display='block'

    }
    
    


    
    localStorage.setItem('items',JSON.stringify(data))
    
    showData()
    cleardata()
}else{
    alert('PLEASE ENTER YOUR TITLE AND PRICE')
}

 }

 function getprice(){

    [ price, texes,ads,descount ].forEach(function(element) {
        element.addEventListener("keyup", ()=> {
            if( price.value > 0){

    
                let totalee= ((+price.value + +texes.value + +ads.value)-(descount.value/100*(+price.value + +texes.value + +ads.value))).toFixed(1)
                
                
                    if(totalee>0){
                total.innerHTML=totalee
                countf=totalee
                    total.style.background='rgba(255, 0, 0, 0.594)'
                }else{
                    total.innerHTML= ` free `
                    total.style.background='#14ba3c'
                }
                }else{
                    total.innerHTML= `totale : `
                    total.style.background='rgb(23, 22, 22)'
                }
        });
     });

}
getprice()


function cleardata(){
title.value=''
price.value=''
count.value=''
category.value=''
texes.value=''
ads.value=''
descount.value=''
total.innerHTML= `totale : `
total.style.background='rgb(23, 22, 22)'
}


function showData(){
    let table=''
    for(let i = 0 ; i < data.length;i++){
        table+=`
    <tr>
        <td>${i+1}</td>
        <td>${data[i].title}</td>
        <td>${data[i].price}</td>
        <td>${data[i].texes}</td>
        <td>${data[i].ads}</td>
        <td>${data[i].descount}</td>
        <td>${data[i].total}</td>
        <td>${data[i].category}</td>
        <td><button onclick="updatData(${i})" id="update">update</button></td>
        <td><button onclick="deleted(${i})" id="delete">delete</button></td>
    </tr>
        `
    }
    document.getElementById('tbody').innerHTML=table;

    let deletall=document.getElementById('deletall')
    if(data.length > 1){
        deletall.innerHTML=`
        <button onclick="deletall()">delet All (${data.length})</button>
        `
    }else{
        deletall.innerHTML=''
    }
}

function updatData(i){

title.value=data[i].title
price.value=data[i].price
texes.value=data[i].texes
ads.value=data[i].ads
descount.value=data[i].descount
category.value=data[i].category
getprice()
sub.innerHTML='update'
count.style.display='none'

mood='update'
tmp=i
scroll({
    top:0,
    behavior:'smooth'
})

}

function deletall(){
    localStorage.clear()
    data.splice(0)
    showData()
}

function deleted(i){

data.splice(i,1)
localStorage.items=JSON.stringify(data)
showData()
}

function getsearchMood(id){

id=='searchTitle'?searchMood='title':searchMood='category'

search.placeholder=`search by ${searchMood}` 
search.focus()
search.value=''
showData()
search.style.cursor='auto'
search.style.opacity='1'
search.onblur=()=>{
 search.style.cursor='default'
 search.style.opacity='0'
}
}

function searchData(value){
    let table=''
    for(let i=0 ;  i < data.length; i++){
    if(searchMood=='title'){

        
        if(data[i].title.toLowerCase().includes(value.toLowerCase())){
        
            table+=`
    <tr>
        <td>${i+1}</td>
        <td>${data[i].title}</td>
        <td>${data[i].price}</td>
        <td>${data[i].texes}</td>
        <td>${data[i].ads}</td>
        <td>${data[i].descount}</td>
        <td>${data[i].total}</td>
        <td>${data[i].category}</td>
        <td><button onclick="updatData(${i})" id="update">update</button></td>
        <td><button onclick="deleted(${i})" id="delete">delete</button></td>
    </tr>
        `
        }
    


    }else{

            if(data[i].category.toLowerCase().includes(value.toLowerCase())){
            
            table+=`
        <tr>
            <td>${i+1}</td>
            <td>${data[i].title}</td>
            <td>${data[i].price}</td>
            <td>${data[i].texes}</td>
            <td>${data[i].ads}</td>
            <td>${data[i].descount}</td>
            <td>${data[i].total}</td>
            <td>${data[i].category}</td>
            <td><button onclick="updatData(${i})" id="update">update</button></td>
            <td><button onclick="deleted(${i})" id="delete">delete</button></td>
         </tr>
            `
    
            }
        }
    }

    document.getElementById('tbody').innerHTML=table;
}

showData()



