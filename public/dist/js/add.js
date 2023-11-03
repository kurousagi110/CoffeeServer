let count = 2 ;
function themTruongInput() {

    let label = count++;
    const container = document.getElementById('ThemMang');
    const newInput = document.createElement('div');
    newInput.classList.add('form-group');
    newInput.innerHTML = `
    <h6>${label}</h6>
      <input type="text" class="form-control" placeholder="">
    `;
    
    container.appendChild(newInput);
  }