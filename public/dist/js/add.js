let count = 1;

function themTruongInput() {
    const dem= count++;
    const labels = ["Size", "Giá", "Giảm giá"];
    const container = document.getElementById('ThemMang');
    const newtitle = document.createElement('div');
    newtitle.innerHTML = `
                          <hr>
                          <h6>${dem}</h6>`;
    container.appendChild(newtitle);
    for (let i = 0; i < 3; i++) {
        const label = labels[i];
        const newInput = document.createElement('div');
        
        newInput.classList.add('form-group');
        newInput.innerHTML = `
            <h6>${label}</h6>
            <input type="text" class="form-control" placeholder="${label}">
        `;
        
        container.appendChild(newInput);
    }

}