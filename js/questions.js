(function(){
     const titleQuestions = [...document.querySelectorAll('.questions__title')];
     
     titleQuestions.forEach(question =>{
         question.addEventListener('click', ()=>{
                   let height = 0;
                   let answer = question.nextElementSibling;
                   console.log(answer);
                   let addPadding = question.parentElement.parentElement;
                   console.log(addPadding);

                   addPadding.classList.toggle('questions__padding--add');
                   question.children[0].classList.toggle('questions__arrow--rotate');

                   if(answer.clientHeight === 0){
                        console.log(answer.clientHeight);
                        height = answer.scrollHeight; 
                        console.log(answer.scrollHeight);    
                   }

                   answer.style.height = `${height}px`;
                   
         });
     });
     
})();