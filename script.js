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
    console.log(pet);
    const div = document.createElement('div');
    div.innerHTML = `
            <div class="border border-gray-400 rounded-xl p-6 space-y-3">
                <img class="rounded-lg w-full" src=${pet.image}/>
                    <h3 class="font-fontInter text-xl font-bold">${pet.pet_name}</h3>
                    <div class="space-y-2 text-gray-500 font-medium">
                      <p>Breed: ${pet?.breed || "Unknown"}</p>
                      <p><i class="fa-regular fa-calendar"></i> Birth: ${pet?.date_of_birth || "Unknown"}</p>
                      <p><i class="fa-solid fa-mercury"></i> Gender: ${pet?.gender || "Unknown"}</p>
                      <p><i class="fa-solid fa-dollar-sign"></i> Price: ${pet?.price || "Unknown"}</p>
                    </div>

                    <hr class="bg-gray-300">

                    <div class="flex justify-between">
                  <button onclick="loadImage('${pet.image}')" class="py-2 px-4 border border-slate-400 rounded-lg"><i class="fa-regular fa-thumbs-up text-2xl"></i></button>

                  <button onclick="loadAdopt()" class="py-2 px-4 border border-slate-400 rounded-lg text-btnPrimary text-lg font-bold">Adopt</button>

                  <button onclick="loadDetails()" class="py-2 px-4 border border-slate-400 rounded-lg text-btnPrimary text-lg font-bold">Details</button>
                    </div>
                  </div>
    `

    petsContainer.appendChild(div);
   });
};

/* Load Image */

const loadImage = async(images) => {
    
}

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
        <button class="py-4 px-14 rounded-2xl border border-slate-200 font-fontInter font-bold flex gap-4 items-center hover:rounded-full hover:bg-slate-200 hover:border-2 hover:border-btnPrimary">
         <img class="w-12" src=${category.category_icon}/>
         <p class="text-2xl">${category.category}</p>
        </button>
        `
        categoriesContainer.appendChild(newDiv);
    });

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