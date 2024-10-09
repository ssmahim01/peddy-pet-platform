/* Global Variables */

let urlApi = 'https://openapi.programming-hero.com/api/peddy/pets';
// let categoryData;
let loadData = [];

/* Go to Best Friend Section */

const viewBtn = document.querySelector('#viewBtn');
viewBtn.addEventListener('click', function(){
  const bestFriendContent = document.getElementById('best-friend');
  bestFriendContent.scrollIntoView({
    behavior: 'smooth'
  });
});

/* Load all Pets */

const loadAllPets = async() => {
    const response = await fetch(urlApi);
    const data = await response.json();
    displayAllPets(data.pets);
    loadData = data.pets;
};

/* Display All Pets */

const displayAllPets = (pets) => {
   const petsContainer = document.getElementById('all-pets-container');
   let loadingSpinner = document.getElementById('spinner1');
   let secondColumn = document.getElementById('second-column');
   secondColumn.classList.add('hidden');

   loadingSpinner.classList.remove('hidden');
   petsContainer.innerHTML = "";

   setTimeout(() => {
    secondColumn.classList.remove('hidden');
    loadingSpinner.classList.add('hidden');

    if(pets.length == 0){
      petsContainer.classList.remove('grid');
      petsContainer.innerHTML = `
      <div class="bg-bgError rounded-3xl">
      <div class="sm:w-4/5 w-11/12 mx-auto flex flex-col justify-center items-center gap-6 sm:py-24 py-20">
      <div>
      <img src="images/error.webp" alt="Image of Error"/>
      </div>
        <div class="text-center space-y-3">
        <h2 class="font-fontInter text-2xl sm:text-4xl font-bold">No Information Available</h2>
        <p class="text-gray-500 font-medium lg:text-base text-sm">No contents or information available in here. Find another then deal or view, We have cute and best pets in here. Thanks for read this description.</p>
        </div>
      </div>
     </div>
      `
      return;
  }else{
      petsContainer.classList.add('grid');
}
    pets.forEach(pet => {
      const div = document.createElement('div');
      div.innerHTML = `
      <div class="border border-opacity-80 rounded-xl sm:p-6 p-5 space-y-3">
      <div class="lg:h-40">
      <img class="rounded-lg w-full h-full object-cover" src=${pet.image}/>
      </div>
        <h3 class="font-fontInter text-xl font-bold">${pet.pet_name}</h3>
        <div class="space-y-2 text-gray-500 font-medium">
          <p class="flex gap-2 items-center"><i class="fa-solid fa-qrcode"></i>  Breed: ${pet?.breed || "N/A"}</p>
          <p class="flex gap-2 items-center"><i class="fa-regular fa-calendar"></i>  Birth: ${pet?.date_of_birth || "N/A"}</p>
          <p class="flex gap-2 items-center"><i class="fa-solid fa-mercury"></i>  Gender: ${pet?.gender || "N/A"}</p>
          <p class="flex gap-2 items-center"><i class="fa-solid fa-dollar-sign"></i>  Price: ${pet?.price || "N/A"}</p>
        </div>

        <hr class="bg-gray-300">

        <div class="flex justify-between">
      <button onclick="loadImage('${pet.image}')" class="py-1 lg:px-4 md:px-14 px-5 border border-btnBorder rounded-lg"><i class="fa-regular fa-thumbs-up text-xl"></i></button>

      <button onclick="loadAdopt(this)" class="py-1 lg:px-4 md:px-14 px-5 border border-btnBorder rounded-lg text-btnPrimary text-lg font-bold">Adopt</button>

      <button onclick="loadDetailsPet('${pet.petId}')" class="py-1 lg:px-4 md:px-14 px-5 border border-btnBorder rounded-lg text-btnPrimary text-lg font-bold">Details</button>
        </div>
      </div>
      `
      petsContainer.appendChild(div);
    });
  }, 2000);
};

/* Load Image */

const loadImage = (image) => {
    const addImage = document.getElementById('add-pet');

   const div = document.createElement('div');
   div.classList.add('lg:h-32', 'w-full');
   div.innerHTML = `
   <img class="w-full h-full rounded-lg" src=${image}/>
   `
   addImage.appendChild(div);
};

/* Load Categories */

const loadCategories = async() =>{
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories');
    const data = await res.json();
    displayCategories(data.categories);
};

/* Display Categories */

const displayCategories = (categories) => {
    const categoriesContainer = document.getElementById('categories');
      categories.forEach(category => {
        const newDiv = document.createElement('div');
        newDiv.innerHTML = `
        <button onclick="controlCategoryContent('${category.category}' ,'${category.id}')" class="btn-category py-4 lg:px-[92px] md:px-16 px-5 rounded-2xl border border-slate-200 font-fontInter font-bold flex gap-4 items-center hover:rounded-full hover:bg-slate-200 hover:border-2 hover:border-btnPrimary" id="btn-${category.id}">
         <img class="sm:w-12 w-10" src=${category.category_icon}/>
         <p class="sm:text-2xl text-xl">${category.category}</p>
        </button>
        `
        categoriesContainer.appendChild(newDiv);
    });
};

/* Control category Content */
const controlCategoryContent = async(category ,id) => {
  // categoryData = category;
 const response = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`);

 const data = await response.json();
 displayAllPets(data.data);
 loadData = data.data;

  removeActive();
  const activeBtn = document.getElementById(`btn-${id}`);
  activeBtn.classList.add('rounded-full', 'bg-active', 'border-2', 'border-btnPrimary');

  activeBtn.classList.remove('rounded-2xl');

};

/* Remove Active */

const removeActive = () => {
  const buttons = document.getElementsByClassName('btn-category');
  for(const btn of buttons){
    btn.classList.remove('rounded-full', 'bg-active', 'border-2', 'border-btnPrimary');

    btn.classList.add('rounded-2xl');
  }
};

/* Load details of Pet */

const loadDetailsPet = async(petId) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`);

  const data = await res.json();
  displayPetDetails(data.petData);
};

/* Display details of Pet */

const displayPetDetails = (petData) => {
  const contentOfModal = document.getElementById('show-content');

  contentOfModal.innerHTML = `
  <div class="space-y-4">
    <div class="space-y-3 w-full sm:h-64">
      <img class="w-full rounded-lg h-full" src=${petData.image}/>
      </div>
          <h3 class="text-xl font-fontInter font-extrabold pt-3">${petData.pet_name}</h3>
    <div class="flex sm:flex-row flex-col sm:gap-5 gap-3 text-gray-500 font-medium">
      <div class="space-y-2">
        <p class="flex gap-2 items-center"><i class="fa-solid fa-qrcode"></i>  Breed: ${petData?.breed || "N/A"}</p>
        <p class="flex gap-2 items-center"><i class="fa-solid fa-mercury"></i>  Gender: ${petData?.gender || "N/A"}</p>
        <p class="flex gap-2 items-center"><i class="fa-solid fa-mercury"></i>  Vaccinated Status: ${petData?.vaccinated_status || "N/A"}</p>
      </div>
      <div class="space-y-2">
        <p class="flex gap-2 items-center"><i class="fa-regular fa-calendar"></i>  Birth: ${petData?.date_of_birth || "N/A"}</p>
        <p class="flex gap-2 items-center"><i class="fa-solid fa-dollar-sign"></i>  Price: ${petData?.price || "N/A"}</p>
      </div>
    </div>

    <hr class="text-gray-400"/>

    <div class="font-fontInter">
      <h3 class="font-bold pb-3">Details Information</h3>
      <p class="opacity-80 font-normal">${petData.pet_details}</p>
    </div>
  </div>
    `;

  document.getElementById('showDetails').showModal();
};

/* Sort Price */

const sortPrice = async() => {
  // const fetchUrl1 = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${categoryData}`);
  // const data = await fetchUrl1.json();
  // const pets = data.data;
  let sortedPets = loadData.sort((a, b) => b.price - a.price)
  displayAllPets(sortedPets);
};

/* Load Adopt */

const loadAdopt = (btn) => {
  const showModal = document.getElementById('show-modal-content');
  showModal.innerHTML = `
  <div class="flex flex-col justify-center items-center gap-3 py-8">
  <div class="w-52 h-40">
  <img class="w-full h-full" src="images/congratulation.png"/>
  </div>
    <h3 class="text-6xl font-extrabold">Congrats</h3>
    <p class="opacity-80 font-semibold text-xl text-center">Adoption Process is Start For Your Pet</p>
    <h2 id="countDown" class="text-6xl font-black"></h2>
  </div>
  `
  btn.classList.add('disabled');
  btn.disabled = true;
  let count = 4;
  let intervalId = setInterval(() => {
    count--;
    let countDown = document.getElementById('countDown').innerText = `${count}`;
    if(count < 0){
      btn.classList.remove('text-btnPrimary');
      btn.classList.add('text-gray-400');
      btn.classList.add('mx-2');
      clearInterval(intervalId);
      btn.innerText = 'Adopted';
      return countDown;
    }
  }, 1000);

  document.getElementById('showModalDetails').showModal();

  setTimeout(() => {
    document.getElementById('showModalDetails').close();
  }, 4000);
};

loadAllPets();
loadCategories();