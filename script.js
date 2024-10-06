/* Load all Pets */

const loadAllPets = async() => {
    const response = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
    const data = await response.json();
    displayAllPets(data.pets);
};

/* Display All Pets */

const displayAllPets = (pets) => {
   console.log(pets);
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
        <button class="py-4 px-14 rounded-2xl border border-slate-200 font-bold flex gap-4 items-center hover:rounded-full hover:bg-slate-200 hover:border-2 hover:border-btnPrimary">
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