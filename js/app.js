const url = `https://openapi.programming-hero.com/api/ai/tools`;

const LoadData = async () => {
  const res = await fetch(url);
  const data = await res.json();
  displayData(data.data.tools.slice(0, 6));
};
// display data
const displayData = (tools) => {
  const toolsContainer = document.getElementById("tools-container");
  toolsContainer.innerHTML = "";
  const showAll = document.getElementById("show-all");
  if (tools.length === 6) {
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

    let parseDate = new Date(tool.published_in);
    let day = parseDate.getDate();
    let month = parseDate.toLocaleString("en-US", {
      month: "short",
    });
    let year = parseDate.getFullYear();
    let myDate = `${day} ${month} ${year}`;
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
              <span>${myDate}</span>
            </p>
          </div>
          <div class="pt-4">
            <button
            type="button"
            class="btn"
            data-id=${tool.id}
            id="modal_toggle_btn"
            onclick="showModalData(${tool.id})"
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

    //   stop loader
    toggleSpinner(false);
  });
};

// see more btn
const showAllDataTogether = () => {
  // console.log("hello");
  document.getElementById("is_full_content").innerText = "true";
  let isSort = document.getElementById("is_sort").innerText;
  toggleSpinner(true);
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      let listData = data.data.tools;
      if (isSort == "true") {
        listData.sort((a, b) =>
          new Date(a.published_in) > new Date(b.published_in) ? 1 : -1
        );
      }
      displayData(listData);
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

function showModalData(id) {
  if (id < 10) {
    id = "0" + id;
  }
  const modalContainer = document.getElementById("modal_body");
  let modalDetailsUrl = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  fetch(modalDetailsUrl).then((response) =>
    response.json().then((data) => {
      let modalData = data.data;

      let priceData = "";
      let pricingTextColor = ["#03A30A", "#F28927", "#EB5757"];
      let colorIndex = 0;

      modalData.pricing?.forEach((price) => {
        priceData += `
    <div class="col-md-3 m-2 p-2 pricing-box" style="color:${
      pricingTextColor[colorIndex++]
    }">${price.plan} / ${price.price}</div>  
  `;
      });
      let featuresContent = "";

      Object.keys(modalData.features).forEach(function (key) {
        featuresContent += `
    <li>${modalData.features[key].feature_name}</li>
   `;
      });
      let integrationsData = "";
      modalData.integrations?.forEach((intg) => {
        integrationsData += `
      <li>${intg}</li>
   `;
      });

      let accuracyDisplayBtn = "";
      if (modalData.accuracy == null || modalData.accuracy.score == null) {
        accuracyDisplayBtn = "d-none";
      }

      let modalContent = `
  
    <div class="row justify-content-evenly">
      <div class="col-md-5 mr-2" style="border:1px solid #EB5757;border-radius: 16px; background: rgba(235, 87, 87, 0.05);">
      <div class="pt-2">
      <p class="modal-description fs-5">${modalData.description}</p>
      <div class="d-flex justify-content-between">
       ${priceData}
      </div>
      <div class="d-flex justify-content-evenly" >
          <div>
          <h4>Features</h4>
          <ul>
            ${featuresContent}
          </ul>
          </div>
          <div>
          <h4>Integration</h4>
          <ul>
            ${integrationsData}
          </ul>
          </div>
        </div>
      </div>
        
      </div>
      <div class="col-md-5" style="background: #FFFFFF">
        <img class = "w-100 mt-4" style = "border: 1px solid #E7E7E7; border-radius:16px; height: 250px;" src="${
          modalData.image_link[0]
        }" alt=""  />
        <div class = "position-main">
        <button type="button" class="btn btn-danger position ${accuracyDisplayBtn}" id = "acc-btn"> ${
        modalData.accuracy.score !== null
          ? modalData.accuracy.score * 100 + "% Accuracy"
          : "no data found"
      }</button>
        </div>
       <span id="chat">
        <h1 class="text-center fs-4">${
          modalData.input_output_examples
            ? modalData.input_output_examples[0].input
            : "no data"
        }</h1>
        <p class="text-center">${
          modalData.input_output_examples
            ? modalData.input_output_examples[0].output
            : "no data"
        }</p>
       </span>
      </div>
    </div>
    
    `;

      modalContainer.innerHTML = modalContent;
      // console.log(data);
    })
  );
}

const sortByDate = async () => {
  document.getElementById("is_sort").innerText = "true";
  let isTrue = document.getElementById("is_full_content").innerText;
  const res = await fetch(url);
  const data = await res.json();
  let listData = data.data.tools;
  listData.sort((a, b) =>
    new Date(a.published_in) > new Date(b.published_in) ? 1 : -1
  );
  isTrue == "true" ? displayData(listData) : displayData(listData.slice(0, 6));
};
