/* Load all Pets */

const loadAllPets = async() => {
    const response = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
    const data = await response.json();
    displayPosts(data.pets);
};

/* Load all Pets categories */

const loadCategories = async() =>{
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories');
    const data = res.json();
    console.log(data.categories);
}

loadAllPets();

const pets = {
    petId: 1, 
    breed: 'Golden Retriever', 
    category: 'Dog', 
    date_of_birth: '2023-01-15', 
    price: 1200,
    vaccinated_status: "Fully"
};