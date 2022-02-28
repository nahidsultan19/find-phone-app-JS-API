const loadPhone = () => {
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;
    document.getElementById('phones-container').textContent = '';
    const error = document.getElementById('error')
    if (searchText != 'phone_name') {
        error.innerText = `Don't have in our store `;
        searchInput.value = '';
    }
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
        .then(res => res.json())
        .then(data => displayPhones(data.data))
    searchInput.value = '';



}

const displayPhones = phones => {
    // console.log(phones);
    const phonesContainer = document.getElementById('phones-container');
    const phonesSlice = phones.slice(0, 20);
    phonesSlice.forEach(phone => {
        console.log(phone);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100 shadow border rounded-3">
            <img src="${phone.image}" class="card-img-top p-2" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">Brand: ${phone.brand}</p>
            </div>
            <div class="btn btn-primary">Phone Details</div>
        </div>
        `;
        phonesContainer.appendChild(div);
    });
}