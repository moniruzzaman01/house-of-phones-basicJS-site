const callApi = () => {
    // get input value and stored in a variable
    const searchTextField = document.getElementById('search-text')
    let searchText = searchTextField.value;
    if (searchText == '') {
        searchText = null;
    }
    searchText = 'iphone';
    // spinner
    const spinner = document.getElementById('spinner')
    spinner.classList.remove('opacity-0')
    spinner.classList.add('opacity-100')
    // api call
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => getPhones(data))
    // clean the search box
    searchTextField.value = '';
}
callApi()

// get data from api
const getPhones = (data) => {
    const resultDiv = document.getElementById('results')
    resultDiv.textContent = '';
    if (data.status == false) {
        const h1 = document.createElement('h1')
        h1.innerText = 'No Data Found!!!';
        resultDiv.appendChild(h1);
        // console.log('no data found!');
        // spinner hide
        spinner.classList.remove('opacity-100')
        spinner.classList.add('opacity-0')
    } else {
        const phones = data.data;
        let counter = 0;
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
                    <button onclick="getDetails('${slug}')" class="btn btn-sm btn-warning w-50 m-2">More...</button>
                </div>
            `;
            console.log(counter)
            counter++;
            if (counter <= 20) {
                div.innerHTML = template;
                resultDiv.appendChild(div);
                console.log('hello')
            }
            // spinner hide
            spinner.classList.remove('opacity-100')
            spinner.classList.add('opacity-0')
            // console.log(phone);
        });
    }
}
const getDetails = (id) => {
    // console.log(id);
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => showDetails(data.data))
}
const showDetails = (data) => {
    let {
        name,
        releaseDate,
        image,
        mainFeatures
    } = data;
    console.log(mainFeatures)
    const {
        chipSet,
        displaySize,
        memory,
        sensors,
        storage
    } = mainFeatures;
    if (releaseDate == '') {
        releaseDate = 'date not found!'
    }
    const detailsDiv = document.getElementById('details')

    const template = `
    <div style="max-height: 100vh; width: 60%;" class="card mb-3 h-100 mx-auto">
            <img src="${image}" style="width: 60%; overflow: hidden;" class="card-img-top mx-auto"
                alt="images/img.jpg">
            <div class="card-body">
                <h2 class="card-title">${name}</h2>
                <p class="card-text"><small>${releaseDate}</small></p>
            </div>
            <div class="container row row-cols-md-2">
                <div class="col">
                    <p>Chipset: ${chipSet}</p>
                    <p>DisplaySize: ${displaySize}</p>
                    <p>Memory: ${memory}</p>
                    <p>Storage: ${storage}</p>
                </div>
                <div class="col">
                        <p>
                            Sensors:
                            <ul>
                                <li>1</li>
                                <li>1</li>
                                <li>1</li>
                                <li>1</li>
                                <li>1</li>
                                <li>1</li>
                            </ul>
                        </p>
                    </div>
            </div>
        </div>
    `;
    detailsDiv.innerHTML = template;
}