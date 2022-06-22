const colorThief = new ColorThief();
const img = document.querySelector('img');

// Make sure image is finished loading
if (img.complete) {
    jazminGG(img);
} else {
    // agregamos evento de carga de imagen
    img.addEventListener('load', function() {
        jazminGG(img);
    });
}


function jazminGG(img) {
    let palette = colorThief.getPalette(img, 5);
    // ordenamos por valor más alto
    palette.sort(function(a, b) {
        return b[1] - a[1];
    });
    // Si el primer color es muy oscuro, creamos un color más claro que sea menor a 255 y lo añadimos al principio
    if (palette[0][1] < 200) {
        let newColor = [0, 0, 0];
        for (let i = 0; i < 3; i++) {
            newColor[i] = palette[0][i] + (255 - palette[0][i]) / 1.35;
        }
        palette.unshift(newColor);
    }
    // Si el primer color es muy oscuro, creamos un color más claro que sea menor a 255 y lo añadimos al principio
    if (palette[0][1] > 200 && palette[0][1] < 240) {
        let newColor = [0, 0, 0];
        for (let i = 0; i < 3; i++) {
            newColor[i] = palette[0][i] + (255 - palette[0][i]) / 2.25;
        }
        // verificamos en que posicion de newColor esta el numero más alto
        let max = Math.max(newColor[0], newColor[1], newColor[2]);
        let index = newColor.indexOf(max);
        if (newColor[index] < 241) {
            let optimizeColor = newColor[index] - 241;
            newColor[0] = newColor[0] - optimizeColor;
            newColor[1] = newColor[1] - optimizeColor;
            newColor[2] = newColor[2] - optimizeColor;
        } else {
            let optimizeColor = newColor[index] - 241;
            newColor[0] = newColor[0] - optimizeColor;
            newColor[1] = newColor[1] - optimizeColor;
            newColor[2] = newColor[2] - optimizeColor;
        }
        palette.unshift(newColor);
    }
    // Si el último color es muy claro, creamos un color más oscuro que sea mayor a 0 y lo añadimos al final
    if (palette[palette.length - 1][1] > 0) {
        let newColor = [255, 255, 255];
        for (let i = 0; i < 3; i++) {
            newColor[i] = palette[palette.length - 1][i] - (palette[palette.length - 1][i] / 1.35);
        }
        palette.push(newColor);
    }

    console.log(palette);
    let lengthPalette = palette.length;
    for (let i = 0; i < lengthPalette; i++) {
        let color = palette[i];
        let colorDiv = document.createElement('div');
        colorDiv.style.borderRadius = '50px';
        colorDiv.style.width = '50px';
        colorDiv.style.height = '50px';
        colorDiv.style.margin = '5px';
        colorDiv.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
        document.body.appendChild(colorDiv);
    }


    // Aplicamos primer color al fondo del body
    document.body.style.backgroundColor = `rgb(${palette[0][0]}, ${palette[0][1]}, ${palette[0][2]})`;
    // Aplicamos el penultimo color a todos los class="tittle"
    let tittles = document.querySelectorAll('.tittle');
    for (let i = 0; i < tittles.length; i++) {
        tittles[i].style.color = `rgb(${palette[palette.length - 2][0]}, ${palette[palette.length - 2][1]}, ${palette[palette.length - 2][2]})`;
    }
    // Aplicamos el ultimo color a todos los class="subtittle" y class="parrafo"
    let subtittles = document.querySelectorAll('.subtittle');
    for (let i = 0; i < subtittles.length; i++) {
        subtittles[i].style.color = `rgb(${palette[palette.length - 1][0]}, ${palette[palette.length - 1][1]}, ${palette[palette.length - 1][2]})`;
    }
    let parrafos = document.querySelectorAll('.parrafo');
    for (let i = 0; i < parrafos.length; i++) {
        parrafos[i].style.color = `rgb(${palette[palette.length - 1][0]}, ${palette[palette.length - 1][1]}, ${palette[palette.length - 1][2]})`;
    }
    // Aplicamos el cuarto color a todos los class="label"
    let labels = document.querySelectorAll('.label');
    for (let i = 0; i < labels.length; i++) {
        labels[i].style.color = `rgb(${palette[3][0]}, ${palette[3][1]}, ${palette[3][2]})`;
    }

    // Aplicamos el penultimo color al texto de los class="btn-ui" y el segundo color de fondo
    let btnUIs = document.querySelectorAll('.btn-ui');
    for (let i = 0; i < btnUIs.length; i++) {
        btnUIs[i].style.color = `rgb(${palette[palette.length - 2][0]}, ${palette[palette.length - 2][1]}, ${palette[palette.length - 2][2]})`;
        btnUIs[i].style.backgroundColor = `rgb(${palette[1][0]}, ${palette[1][1]}, ${palette[1][2]})`;
    }

    // Aplicamos el penultimo color al fondo de los class="btn-alt" y el primer color a su texto
    let btnsAlt = document.querySelectorAll('.btn-alt');
    for (let i = 0; i < btnsAlt.length; i++) {
        btnsAlt[i].style.color = `rgb(${palette[0][0]}, ${palette[0][1]}, ${palette[0][2]})`;
        btnsAlt[i].style.backgroundColor = `rgb(${palette[palette.length - 2][0]}, ${palette[palette.length - 2][1]}, ${palette[palette.length - 2][2]})`;
    }

    // Aplicamos el penultimo color al texto de los class="material-icons-ui"
    let materialIconsUIs = document.querySelectorAll('.material-icons-ui');
    for (let i = 0; i < materialIconsUIs.length; i++) {
        materialIconsUIs[i].style.color = `rgb(${palette[palette.length - 2][0]}, ${palette[palette.length - 2][1]}, ${palette[palette.length - 2][2]})`;
    }

    // Aplicamos el primer color al texto de los class="material-icons-alt"
    let materialIconsAlts = document.querySelectorAll('.material-icons-alt');
    for (let i = 0; i < materialIconsAlts.length; i++) {
        materialIconsAlts[i].style.color = `rgb(${palette[0][0]}, ${palette[0][1]}, ${palette[0][2]})`;
    }
}