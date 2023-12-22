// ********************** Header **********************
const btn = document.querySelector('.btn')
const links = document.querySelector('.links')
const linksContainer = document.querySelector('.links-container')
btn.addEventListener('click', function(){
   const linksHeight = links.getBoundingClientRect().height
   const linksContainerHeight = linksContainer.getBoundingClientRect().height

   if (linksContainerHeight === 0){
      linksContainer.style.height = `${linksHeight}px`
   }else{
   linksContainer.style.height = 0
   }
})

//  Scroll button 
const landing = document.querySelector('.landing')
const scrollBtn = document.querySelector('.scroll')
const navBar = document.querySelector('.header')

window.addEventListener('scroll', function(){
   const landingHeight = landing.getBoundingClientRect().height
   const scrollHeight = window.pageYOffset
   const navBarHeight = navBar.getBoundingClientRect().height
   // show navBar 
   if(scrollHeight > navBarHeight){
      navBar.classList.add('fixed-navbar')
   }else{
      navBar.classList.remove('fixed-navbar')
   }
   // Show scroll btn 
   if(scrollHeight > landingHeight){
      scrollBtn.classList.add('show-btn') 
   } else{
      scrollBtn.classList.remove('show-btn') 
   }
});

// Navigate To a specific Spot 
const linksBtns = document.querySelectorAll('.links-btn');
linksBtns.forEach(function(link){
   link.addEventListener('click', function(e){
      e.preventDefault();
      const id = e.currentTarget.getAttribute('href').slice(1);
      const element = document.getElementById(id)
      const position = element.offsetTop
      window.scrollTo(0, position)
       linksContainer.style.height = 0

 })
})





// ********************** Slider **********************
const images = document.querySelectorAll('.slide-image');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const dots = document.querySelectorAll('.dot');

let counter = 0;

// Next button 
nextButton.addEventListener('click',slideNext);
function slideNext(){
   images[counter].style.animation = 'next1 1s ease-in forwards';
   if (counter >= images.length -1 ){
      counter = 0
   }else{
      counter++
   }
   images[counter].style.animation = 'next2 1s ease-in forwards';
   indicators();

}
// previous button 
prevButton.addEventListener('click',slidePrev);
function slidePrev(){
   images[counter].style.animation = 'prev1 1s ease-in forwards';
   if (counter == 0  ){
      counter = images.length -1
   }else{
      counter--
   }
   images[counter].style.animation = 'prev2 1s ease-in forwards';
   indicators();

}

// Auto Sliding 
 function autoSliding(){
   delteInterval = setInterval(timer, 2500);
   function timer(){
      slideNext();
      indicators();

   }
   
 }
 autoSliding();

//  Stop auto sliding when mouse is over 
 const landingSlider = document.querySelector('.landing')
landingSlider.addEventListener('mouseover',function(){
   clearInterval(delteInterval)
});
landingSlider.addEventListener('mouseout',autoSliding);

// Add and remove active class from the indicators 
function indicators(){
   for (i = 0; i < dots.length; i++){
      dots[i].className = dots[i].className.replace(' active', '')
   }
   dots[counter].classList.add('active')
}
indicators();

// Add click event to the indicator 
function switchImage(current){
   const attribute = current.getAttribute('attr')
   console.log(attribute)
   current.classList.add('active')
   if (attribute > counter){
      images[counter].style.animation = 'next1 1s ease-in forwards';
      counter = attribute;
      images[counter].style.animation = 'next2 1s ease-in forwards';
   }else if (attribute == counter){
      return;
   }
   else{
      images[counter].style.animation = 'prev1 1s ease-in forwards';
      counter = attribute;
      images[counter].style.animation = 'prev2 1s ease-in forwards';
   }
indicators();
}





// ********************** Portfolio **********************
const portfolio =[
   {
      id : 1,
      title:'awesome image',
      category: 'app',
      description: 'photography',
      img: "images/shuffle-01.jpg"

   },
   {
      id : 2,
      title:'Explore',
      category: 'app',
      description: 'Nature',
      img: "images/shuffle-02.jpg"

   },
   {
      id : 3,
      title:'Adventure',
      category: 'photo',
      description: 'Discovery',
      img: "images/shuffle-03.jpg"

   },
   {
      id : 4,
      title:'Capture',
      category: 'photo',
      description: 'Nature',
      img: "images/shuffle-04.jpg"

   },
   {
      id : 5,
      title:'Urban',
      category: 'web',
      description: 'Life',
      img: "images/shuffle-05.jpg"

   },
   {
      id : 6,
      title:'Dream',
      category: 'web',
      description: 'Big',
      img: "images/shuffle-06.jpg"

   },
   {
      id : 7,
      title:'Witness',
      category: 'print',
      description: 'Wonders',
      img: "images/shuffle-07.jpg"

   },
   {
      id : 8,
      title:'Inspire',
      category: 'print',
      description: 'Creativity',
      img: "images/shuffle-08.jpg"

   },
   {
      id : 8,
      title:'Inspire',
      category: 'scan',
      description: 'Creativity',
      img: "images/shuffle-08.jpg"

   },
]

const portfolioContainer = document.querySelector('.portfolio-content')
window.addEventListener('DOMContentLoaded', function(){
   displayItems(portfolio);
   addButtons()
   filterItems();

})


 // Function to display portfolio items
function displayItems(menu){
   const items = menu.map(function(item){
      return `<div class="box ">
      <img src=${item.img} alt="">
      <div class="text">
          <h3>${item.title}</h3>
          <p>${item.description}</p>
      </div>
 </div>`
   }).join('')
   portfolioContainer.innerHTML = items
}
// Add button dynamically
function addButtons(){
   const btnContainer = document.querySelector('.btn-container')
const buttonsCategories = portfolio.reduce(function(value,current){
   if(!value.includes(current.category)){
      value.push(current.category)
   }
   return value

},["all"])

const buttons = buttonsCategories.map(function(e, index){
   const activeClass = index === 0 ? 'active' : '';


   return `<li><button class="btn-list ${activeClass}" data-id ="${e}">${e}</button></li>
   `
}).join("")

btnContainer.innerHTML = buttons
}

//Filter items
function filterItems(){
   const btns = document.querySelectorAll('.btn-list')
   btns.forEach(function(btn){
      btn.addEventListener('click', function(e){
         // Remove Active class from all elements 
         btns.forEach(function(btn){
            btn.classList.remove('active')
         })
         // Add Active class in the current element 
         e.currentTarget.classList.add('active')

         const category = e.currentTarget.dataset.id
         const categories = portfolio.filter(function(item){
         return item.category === category
      })
      if (category === 'all'){
         displayItems(portfolio)
      }
      else{
         displayItems(categories)

      }

      });
   });
}