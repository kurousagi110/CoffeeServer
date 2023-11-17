let count = 1;
let sizes = [];

function themTruongInput() {
  const dem = count++;
  const labels = ["Size", "Giá", "Giảm giá"];
  const container = document.getElementById('ThemMang');
  const newtitle = document.createElement('div');
  newtitle.innerHTML = `
    <hr>
    <h6>${dem}</h6>`;
  container.appendChild(newtitle);

  // Create a new size object
  const newSize = { size: "", gia: "", giam_gia: "" };

  for (let i = 0; i < labels.length; i++) {
    const label = labels[i];
    const newInput = document.createElement('div');

    newInput.classList.add('form-group');
    newInput.innerHTML = `
      <h6>${label}</h6>
      <input type="text" id="input${dem+i}_${label}" class="form-control" placeholder="${label}" oninput="luuThongTin(${dem}, '${label}', this.value)">
    `;

    container.appendChild(newInput);
  }
}

function luuThongTin(dem, label, value) {
  let newSize = sizes[dem - 1] || { size: "", gia: "", giam_gia: "" };
  if (label === "Size") {
    newSize.size = value;
  } else if (label === "Giá") {
    newSize.gia = value;
  } else if (label === "Giảm giá") {
    newSize.giam_gia = value;
  }

  // Update or add the size object to the array
  if (sizes[dem - 1]) {
    sizes[dem - 1] = newSize;
  } else {
    sizes.push(newSize);
  }

  // Convert the sizes array to JSON
  const sizesJson = JSON.stringify(sizes);

  // Update the hidden input field with the JSON-encoded sizes array
  document.getElementById('sizesInput').value = sizesJson;

  // Add the current size to the Size array
}
