/* Load all Pets */

const loadAllPets = async() => {
    const response = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
    const data = await response.json();
    console.log(data.pets);
};

/* Load all Pets categories */

const loadCategories = async() =>{
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories');
    const data = await res.json();
    displayCategories(data.categories);
};

/* Display Categories */

const displayCategories = (categories) => {
    const categoriesContainer = document.getElementById('categories');

    categories.forEach(category => {
        console.log(category);

        const newDiv = document.createElement('div');
        newDiv.innerHTML = `
        <button class="py-4 px-16 rounded-2xl border border-slate-400 font-bold flex gap-4 items-center">
         <img class="w-12" src=${category.category_icon}/>
         <p class="text-2xl">${category.category}</p>
        </button>
        `
        categoriesContainer.appendChild(newDiv);
    });

}

loadAllPets();
loadCategories();

const pets = {
    petId: 1, 
    breed: 'Golden Retriever', 
    category: 'Dog', 
    date_of_birth: '2023-01-15', 
    price: 1200,
    vaccinated_status: "Fully"
};