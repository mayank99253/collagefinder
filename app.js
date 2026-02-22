let input = document.querySelector("input");
let btn = document.querySelector("button");
let container = document.querySelector(".results"); // cards yaha show honge

let url = "/api/colleges?country=";
console.log(url)
let results = document.querySelector(".results");
let topBtn = document.getElementById("topBtn");

// Show button when scrolling
results.addEventListener("scroll", () => {
  if (results.scrollTop > 100) {
    topBtn.style.display = "block";
  } else {
    topBtn.style.display = "none";
  }
});

// Scroll to top smoothly
topBtn.addEventListener("click", () => {
  results.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

btn.addEventListener("click", async () => {
  let country = input.value.trim();
  if (country === "") return;

  container.innerHTML = ""; // old results remove
  let colData = await getColleges(country);
  showList(colData);
});

function showList(colData) {
  if (!colData || colData.length === 0) {
    container.innerHTML = "<p>No colleges found.</p>";
    return;
  }

  for (let colInfo of colData) {
    // Card div
    let card = document.createElement("div");
    card.classList.add("card");

    // College Name
    let h3 = document.createElement("h3");
    h3.innerText = colInfo.name;

    // Country Name
    let p = document.createElement("p");
    p.innerText = colInfo.country;

    // Website Link
    let a = document.createElement("a");
    a.innerText = "Visit Website";
    a.href = colInfo.web_pages[0];
    a.target = "_blank";

    // Append elements
    card.appendChild(h3);
    card.appendChild(p);
    card.appendChild(a);

    container.appendChild(card);
  }
}

async function getColleges(country) {
  try {
    let res = await axios.get(url + country);
    return res.data;
  } catch (error) {
    console.log("Error - ", error);
  }
}


