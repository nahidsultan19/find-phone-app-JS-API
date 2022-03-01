const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}

// load all phones
const loadPhone = () => {
    // clear previous search container
    //clear previous details
    document.getElementById('phones-container').textContent = '';
    document.getElementById('phone-details').textContent = '';

    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;

    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
        .then(res => res.json())
        .then(data => displayPhones(data.data))

    // clear input field after search 
    searchInput.value = '';

    // load spinner 
    toggleSpinner('block');
}

const displayPhones = phones => {
    const phonesContainer = document.getElementById('phones-container');
    const phonesSlice = phones.slice(0, 20);
    if (phonesSlice.length == 0) {
        document.getElementById('error').innerText = 'Phone not found';
    }
    else {
        phonesSlice?.forEach(phone => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card h-100 shadow border-0 rounded-3 text-center">
                <img src="${phone.image}" class="card-img-top p-3" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">Brand: ${phone.brand}</p>
                </div>
                <div onclick="phoneDetails('${phone.slug}')" class="btn btn-primary">${phone.phone_name} (Details) </div>
            </div>
            `;
            phonesContainer.appendChild(div);
        });

        // hide spinner 
        toggleSpinner('none');

        // after loading data clear error message
        document.getElementById('error').innerText = '';
    }
}

// phone details 
const phoneDetails = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data))
}

const displayPhoneDetails = id => {
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
    <div class="card shadow border rounded-3">
        <img src="${id.image}" class="card-img-top p-4 img-fluid" alt="...">
        <div class="card-body">
            <h5 class="card-title">${id.name}</h5>
            <p class="card-text">${id.releaseDate ? id.releaseDate : 'No release date found'}</p>
            <span>Stock: ${id.slug.length}</span>
            <h2>Features:</h2>
            <div class="list-group">
                <li class="card-text list-group-item">Storage: ${id.mainFeatures.storage}</li>
                <li class="card-text list-group-item">DisplaySize: ${id.mainFeatures.displaySize}</li>
                <li class="card-text list-group-item">ChipSet: ${id.mainFeatures?.chipSet ?? 'Not found'}</li>
                <li class="card-text list-group-item">Sensors: ${id.mainFeatures.sensors}</li>
                <li class="card-text list-group-item">WLAN: ${id.others?.WLAN ?? 'Not found'}</li>
                <li class="card-text list-group-item">Bluetooth: ${id.others?.Bluetooth ?? 'Not found'}</li>
                <li class="card-text list-group-item">GPS: ${id.others?.GPS ?? 'Not found'}</li>
                <li class="card-text list-group-item">NFC: ${id.others?.NFC ?? 'Not found'}</li>
                <li class="card-text list-group-item">USB: ${id.others?.USB ?? 'Not found'}</li>
                <li class="card-text list-group-item">Radio: ${id.others?.Radio ?? 'Not found'}</li>
            </div>
        </div>
    </div>
    `;
}
