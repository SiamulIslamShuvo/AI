const url = `https://openapi.programming-hero.com/api/ai/tools`;

const LoadData = async () => {
  const res = await fetch(url);
  const data = await res.json();
  displayData(data.data.tools.slice(0, 9));
};
// display data
const displayData = (tools) => {
  const toolsContainer = document.getElementById("tools-container");
  const modalContainer = document.getElementById("modal_body");
  toolsContainer.innerHTML = "";
  const showAll = document.getElementById("show-all");
  if (tools.length === 9) {
    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-none");
  }

  tools.forEach((tool) => {
    const toolDiv = document.createElement("div");
    let feat = "";
    tool.features.forEach((feature) => {
      feat += `<li>${feature}</li>`;
    });
    toolDiv.classList.add("col", "mb-4");
    toolDiv.innerHTML = `
    <div class="card" style="height: 500px;">
      <img src="${tool.image}" class="card-img-top" alt="..." />
      <div class="card-body">
        <h2 class="card-title">Features</h2>
        <ul id="feat">${feat}</ul>
        <div class="d-flex justify-content-between border-top">
          <div>
            <h4>${tool.name}</h4>
            <p>
              <i class="fa-solid fa-calendar-days"></i>
              <span>${tool.published_in}</span>
            </p>
          </div>
          <div class="pt-4">
            <button
            type="button"
            class="btn"
            data-bs-toggle="modal"
            data-bs-target="#toolsModal"
          >
          <i class="fa-solid fa-arrow-right text-danger fs-4"></i>
          </button>
          </div>
        </div>
      </div>
    </div>
    `;
    toolsContainer.appendChild(toolDiv);
    // modal container
    let modalContent = `
    
    <div class="row justify-content-evenly">
      <div class="col-md-5 mr-2" style="border:1px solid #EB5757;border-radius: 16px; background: rgba(235, 87, 87, 0.05);">
      <div class="pt-2">
      <p class="modal-description">${tool.description}</p>
      <div class="d-flex justify-content-between">
        <div class="col-md-3 m-2 p-2 pricing-box">$10/month Basic</div>
        <div class="col-md-3 mt-2  p-2  pricing-box">$10/month Basic</div>
        <div class="col-md-3 m-2 p-2 pricing-box">$10/month Basic</div>
        
      </div>
      <div class="d-flex justify-content-evenly" >
          <div>
          <h4>Features</h4>
          <ul>
            <li>asdasd</li>
            <li>asdasd</li>
            <li>asdasd</li>
          </ul>
          </div>
          <div>
          <h4>Integration</h4>
          <ul>
          <li>asdasd</li>
            <li>asdasd</li>
            <li>asdasd</li>
          </ul>
          </div>
        </div>
      </div>
        
      </div>
      <div class="col-md-5" style="background: #FFFFFF position-div">
        <img class = "w-100 mt-4 position-main" style = "border: 1px solid #E7E7E7; border-radius:16px;" src="${tool.image}" alt=""  />
        <button type="button" class="btn btn-danger position"> 94% Accuracy</button>
        <h1 class="text-center">How Are you doing</h1>
        <p class="text-center">How Are you doing</p>
      </div>
    </div>
    
    `;
    modalContainer.innerHTML = modalContent;

    //   stop loader
    toggleSpinner(false);
  });
};

// see more btn
const showAllDataTogether = () => {
  toggleSpinner(true);
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      displayData(data.data.tools);
    });
};

// display loading indicator
const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("loader");
  if (isLoading) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};

// details

LoadData();
