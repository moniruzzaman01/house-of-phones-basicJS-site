const callApi = () => {
    // get input value and stored in a variable
    const searchTextField = document.getElementById('search-text')
    // const searchText = searchTextField.value;
    searchText = 'iphone';
    // api call
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => getPhones(data))
    // clean the search box
    searchTextField.value = '';
}
// get data from api
const getPhones = (data) => {
    const resultDiv = document.getElementById('results')
    resultDiv.textContent = '';
    if (data.status == false) {
        const h1 = document.createElement('h1')
        h1.innerText = 'No Data Found!!!';
        resultDiv.appendChild(h1);
        console.log('no data found!');
    } else {
        const phones = data.data;
        phones.forEach(phone => {
            const {
                brand,
                phone_name,
                image,
                slug,
            } = phone;
            const div = document.createElement('div')
            div.classList.add('col')
            const template = `
                <div class="card h-100">
                    <img src="${image}" style="width: 90%; overflow: hidden;" class="card-img-top mx-auto mt-2"
                        alt="images/img.jpg">
                    <div class="card-body">
                        <h5 class="card-title">${phone_name}</h5>
                        <p class="card-text"><small>Brand: ${brand}</small></p>
                    </div>
                    <button onclick="showDetails('${slug}')" class="btn btn-sm btn-warning w-50 m-2">More...</button>
                </div>
            `;
            div.innerHTML = template;
            resultDiv.appendChild(div);
            console.log(phone);
        });
    }
}
const showDetails = (id) => {
    console.log(id);
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => console.log(data.data))
}




callApi()