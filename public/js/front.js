console.log('The javascript file has been loaded!');
/*
fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data);
    })
})
*/
/*
fetch('http://localhost:3000/weather?address=philadelphia').then((response)=>{
    response.json().then((data)=>{
        if(data.ERROR){
            console.log(data.ERROR);
        }else{
            console.log(data.dataForecast.forecast);
            console.log(data.ubication);
        }
    })
})
*/
// ******* Elements *******

const weatherForm = document.querySelector('.form');
const search = document.querySelector('input');
const messageOne = document.getElementById('message-1');
const messageTwo = document.getElementById('message-2');




weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    
    const location = search.value;
    messageOne.textContent='Loading...';
    messageTwo.textContent='';
    fetch(`/weather?address=${location}`).then((response)=>{
        response.json().then((data)=>{
            if(data.ERROR){
                messageOne.textContent=`${data.ERROR}`;
            }else{
                messageOne.textContent=`${data.ubication}`;
                messageTwo.textContent=`${data.dataForecast.forecast}`;
                document.querySelector('input').value='';
            }
        })
    });

});


