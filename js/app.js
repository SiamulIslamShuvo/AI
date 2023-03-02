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
        <ul id="feat">
        ${feat}
        </ul>
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
    
    <div class="d-flex">
      <div>
        <p>${tool.description}</p>
      </div>
      <div>
        <img src="${tool.image}" alt="" height="339" width ="437" />
        <p>asdada</p>
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
