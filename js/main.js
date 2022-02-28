const loadPhone = () => {
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
        .then(res => res.json())
        .then(data => console.log(data.data))
    searchInput.value = '';
}
