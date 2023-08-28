const loadPhone = async (searchText='13', isShowAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);
   //  console.log(phones);
};

// display all phones 
const displayPhones = (phones, isShowAll) =>{
   // console.log(phones);
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';

   //  no data available 
    const empty = document.getElementById('no-data');
    if(phones.length === 0){
       empty.classList.remove('hidden');
    }else{
       empty.classList.add('hidden');
    };

   // show all button hide and show 
    const showAllButton = document.getElementById('show-all-btn');
    if(phones.length > 12 && !isShowAll){
       showAllButton.classList.remove('hidden');
    }else{
       showAllButton.classList.add('hidden')
    };

   if(!isShowAll){
       phones = phones.slice(0,12);
   };

   // getting phone one by one and appending 
    phones.forEach(phone =>{
    // console.log(phone);
    const phoneDiv = document.createElement('div');
    phoneDiv.classList = `card p-4 bg-base-100 shadow-xl`;
    phoneDiv.innerHTML = `
    <figure><img src="${phone.image}" alt="Shoes" /></figure>
    <div class="card-body">
      <h2 class="card-title">${phone.phone_name}</h2>
      <p>If a dog chews shoes whose shoes does he choose?</p>
      <div class="card-actions justify-center">
        <button onclick="showModal('${phone.slug}')" class="btn btn-primary">Show Details</button>
      </div>
    </div>
    `
    phoneContainer.appendChild(phoneDiv);

    });
   //  hide loading
    loadingSpinner(false);
};

// search button 
const searchButton = (isShowAll) =>{
    loadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText, isShowAll);
   
};

// loading 
const loadingSpinner = (isLoading) =>{
    const loading = document.getElementById('loading');
    if(isLoading){
       loading.classList.remove('hidden');
    }else{
       loading.classList.add('hidden');
    }
};

// show all button 
const showAll = () =>{
   searchButton(true);
};


// default calling
loadPhone();

// showing modal button
const showModal = async (id) =>{
   const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
   const data = await res.json();
   const phoneDetails = data.data;
   showingModal(phoneDetails);
   // console.log(phoneDetails);

};

// showing modal 
const showingModal = (phone) => {
   const name = document.getElementById('phone-name');
   name.innerText = `${phone.name}`;
   const details = document.getElementById('details-container');
   details.innerHTML = `
   <div class = "flex justify-center"><img src="${phone.image}" alt="" /></div>
   <p><span>Storage: </span>${phone?.mainFeatures?.storage}</p>
   <p><span>Security: </span>${phone?.mainFeatures?.sensors[0]}</p>
   <p><span>GPS: </span>${phone?.others?.GPS || 'no gps'}</p>
   `;

   show_details_modal.showModal();
};

