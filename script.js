/* Load all Pets */

const loadAllPets = async() => {
    const response = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
    const data = await response.json();
    displayAllPets(data.pets);
};

/* Display All Pets */

const displayAllPets = (pets) => {
   const petsContainer = document.getElementById('all-pets-container');

   pets.forEach(pet => {
    const div = document.createElement('div');
    div.innerHTML = `
            <div class="border border-gray-400 rounded-xl p-6 space-y-3">
            <div class="lg:h-40">
            <img class="rounded-lg w-full h-full object-cover" src=${pet.image}/>
            </div>
                    <h3 class="font-fontInter text-xl font-bold">${pet.pet_name}</h3>
                    <div class="space-y-2 text-gray-500 font-medium">
                      <p><i class="fa-solid fa-qrcode"></i>  Breed: ${pet?.breed || "Unknown"}</p>
                      <p><i class="fa-regular fa-calendar"></i>  Birth: ${pet?.date_of_birth || "Unknown"}</p>
                      <p><i class="fa-solid fa-mercury"></i>  Gender: ${pet?.gender || "Unknown"}</p>
                      <p><i class="fa-solid fa-dollar-sign"></i>  Price: ${pet?.price || "Unknown"}</p>
                    </div>

                    <hr class="bg-gray-300">

                    <div class="flex justify-between">
                  <button onclick="loadImage('${pet.image}')" class="py-2 px-4 border border-slate-400 rounded-lg"><i class="fa-regular fa-thumbs-up text-2xl"></i></button>

                  <button onclick="loadAdopt()" class="py-2 px-4 border border-slate-400 rounded-lg text-btnPrimary text-lg font-bold">Adopt</button>

                  <button onclick="loadDetailsPet('${pet.petId}')" class="py-2 px-4 border border-slate-400 rounded-lg text-btnPrimary text-lg font-bold">Details</button>
                    </div>
                  </div>
    `

    petsContainer.appendChild(div);
   });
};

/* Load Image */

const loadImage = (image) => {
    const addImage = document.getElementById('add-pet');

   const div = document.createElement('div');
   div.classList.add('h-32');
   div.innerHTML = `
   <img class="h-full rounded-lg" src=${image}/>
   `
   addImage.appendChild(div);
};

// /* Category Content */

// const controlCategoryContent = (category) => {
//   const allPetsContainer = document.getElementById('all-pets-container');
//   const categoryContainer = document.getElementById('categories').innerText;
//   allPetsContainer.appendChild(categoryContainer);
// };

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
        <button onclick="controlCategoryContent('${category.category}')" class="py-4 lg:px-20 md:px-16 px-5 rounded-2xl border border-slate-200 font-fontInter font-bold flex gap-4 items-center hover:rounded-full hover:bg-slate-200 hover:border-2 hover:border-btnPrimary">
         <img class="w-12" src=${category.category_icon}/>
         <p class="text-2xl">${category.category}</p>
        </button>
        `
        categoriesContainer.appendChild(newDiv);
    });

};

/* Load details of Pet */

const loadDetailsPet = async(petId) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`);

  const data = await res.json();
  displayPetDetails(data.petData);
};

const displayPetDetails = (petData) => {
  console.log(petData);
  const contentOfModal = document.getElementById('show-content');

  contentOfModal.innerHTML = `
  <div class="space-y-4">
    <div class="space-y-3 w-full h-64">
      <img class="w-full rounded-lg h-full" src=${petData.image}/>
      </div>
          <h3 class="text-xl font-fontInter font-extrabold pt-3">${petData.pet_name}</h3>
                <div class="flex flex-row sm:gap-5 gap-2 text-gray-500 font-medium">
                      <div class="space-y-2">
                        <p><i class="fa-solid fa-qrcode"></i>  Breed: ${petData?.breed || "Unknown"}</p>
                        <p><i class="fa-solid fa-mercury"></i>  Gender: ${petData?.gender || "Unknown"}</p>
                        <p><i class="fa-regular fa-calendar"></i>  Vaccinated Status: ${petData?.vaccinated_status || "Unknown"}</p>
                      </div>
                      <div class="space-y-2">
                       <p><i class="fa-regular fa-calendar"></i>  Birth: ${petData?.date_of_birth || "Unknown"}</p>
                        <p><i class="fa-solid fa-dollar-sign"></i>  Price: ${petData?.price || "Unknown"}</p>
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

loadAllPets();
loadCategories();

// const pets = {
//     petId: 1, 
//     breed: 'Golden Retriever', 
//     category: 'Dog', 
//     date_of_birth: '2023-01-15', 
//     price: 1200,
//     vaccinated_status: "Fully"
// };