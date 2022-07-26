const colorThief = new ColorThief();
const img = document.querySelector('#principalIcon');
console.log(img);
// Make sure image is finished loading
if (img.complete) {
    jazminGG(img);
} else {
    // agregamos evento de carga de imagen
    img.addEventListener('load', function () {
        jazminGG(img);
    });
}


function jazminGG(img) {
    let palette = colorThief.getPalette(img, 5);
    // ordenamos por valor más alto
    palette.sort(function (a, b) {
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
    if (palette[0][1] > 200 && palette[0][1] < 245) {
        let newColor = [0, 0, 0];
        for (let i = 0; i < 3; i++) {
            newColor[i] = palette[0][i] + (255 - palette[0][i]) / 2.25;
        }
        // verificamos en que posicion de newColor esta el numero más alto
        let max = Math.max(newColor[0], newColor[1], newColor[2]);
        let index = newColor.indexOf(max);
        if (newColor[index] < 245) {
            let optimizeColor = newColor[index] - 255;
            newColor[0] = newColor[0] - optimizeColor;
            newColor[1] = newColor[1] - optimizeColor;
            newColor[2] = newColor[2] - optimizeColor;
        } else {
            let optimizeColor = newColor[index] - 255;
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
    // si el primer color tiene alguno de sus valores inferiores a 200, añadimos color gris claro al principio
    if (palette[0][0] < 200 || palette[0][1] < 200 || palette[0][2] < 200) {
        let newColor = [255, 255, 255];
        for (let i = 0; i < 3; i++) {
            newColor[i] = palette[0][i] + (255 - palette[0][i]) / 1.35;
        }
        palette.unshift(newColor);
    }

    let lengthPalette = palette.length;

    // creamos un div #palette con los colores de la paleta
    let paletteDiv = document.createElement('div');
    paletteDiv.id = 'palette';
    // agregamos estilos al div, position fixed, centrado, width 50%, bottom 8px, background-color white, border-radius 8px, padding 8px, contenido y texto centrado
    paletteDiv.style.position = 'fixed';
    paletteDiv.style.bottom = '8px';
    paletteDiv.style.left = '25%';
    paletteDiv.style.width = '50%';
    paletteDiv.style.backgroundColor = 'white';
    paletteDiv.style.borderRadius = '8px';
    paletteDiv.style.padding = '8px';
    paletteDiv.style.textAlign = 'center';
    paletteDiv.style.zIndex = '9999';
    // lo insertamos al principio del body
    document.body.insertBefore(paletteDiv, document.body.firstChild);
    for (let i = 0; i < lengthPalette; i++) {
        let color = palette[i];
        let colorDiv = document.createElement('span');
        colorDiv.style.borderRadius = '50px';
        colorDiv.style.width = '50px';
        colorDiv.style.height = '50px';
        colorDiv.style.margin = '5px';
        colorDiv.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
        colorDiv.style.display = 'inline-block';
        colorDiv.style.cursor = 'pointer';
        colorDiv.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
        colorDiv.style.borderRadius = '50px';
        paletteDiv.appendChild(colorDiv);
    }
    // agregamos 250px de height al main para que el div #palette no se salga del viewport
    document.getElementsByTagName('main')[0].style.height = '250px';
    // height del 100% al html
    document.documentElement.style.height = '100%';

    // // Aplicamos primer color al fondo del body
    // document.body.style.backgroundColor = `rgb(${palette[0][0]}, ${palette[0][1]}, ${palette[0][2]})`;
    // // Aplicamos el penultimo color a todos los class="tittle"
    // let tittles = document.querySelectorAll('.tittle');
    // for (let i = 0; i < tittles.length; i++) {
    //     tittles[i].style.color = `rgb(${palette[palette.length - 2][0]}, ${palette[palette.length - 2][1]}, ${palette[palette.length - 2][2]})`;
    // }
    // // Aplicamos el ultimo color a todos los class="subtittle" y class="parrafo"
    // let subtittles = document.querySelectorAll('.subtittle');
    // for (let i = 0; i < subtittles.length; i++) {
    //     subtittles[i].style.color = `rgb(${palette[palette.length - 1][0]}, ${palette[palette.length - 1][1]}, ${palette[palette.length - 1][2]})`;
    // }
    // let parrafos = document.querySelectorAll('.parrafo');
    // for (let i = 0; i < parrafos.length; i++) {
    //     parrafos[i].style.color = `rgb(${palette[palette.length - 1][0]}, ${palette[palette.length - 1][1]}, ${palette[palette.length - 1][2]})`;
    // }
    // // Aplicamos el cuarto color a todos los class="label"
    // let labels = document.querySelectorAll('.label');
    // for (let i = 0; i < labels.length; i++) {
    //     labels[i].style.color = `rgb(${palette[3][0]}, ${palette[3][1]}, ${palette[3][2]})`;
    // }

    // // Aplicamos el penultimo color al texto de los class="btn-ui" y el segundo color de fondo
    // let btnUIs = document.querySelectorAll('.btn-ui');
    // for (let i = 0; i < btnUIs.length; i++) {
    //     btnUIs[i].style.color = `rgb(${palette[palette.length - 2][0]}, ${palette[palette.length - 2][1]}, ${palette[palette.length - 2][2]})`;
    //     btnUIs[i].style.backgroundColor = `rgb(${palette[1][0]}, ${palette[1][1]}, ${palette[1][2]})`;
    // }

    // // Aplicamos el penultimo color al fondo de los class="btn-alt" y el primer color a su texto
    // let btnsAlt = document.querySelectorAll('.btn-alt');
    // for (let i = 0; i < btnsAlt.length; i++) {
    //     btnsAlt[i].style.color = `rgb(${palette[0][0]}, ${palette[0][1]}, ${palette[0][2]})`;
    //     btnsAlt[i].style.backgroundColor = `rgb(${palette[palette.length - 2][0]}, ${palette[palette.length - 2][1]}, ${palette[palette.length - 2][2]})`;
    // }

    // // Aplicamos el penultimo color al texto de los class="material-icons-ui"
    // let materialIconsUIs = document.querySelectorAll('.material-icons-ui');
    // for (let i = 0; i < materialIconsUIs.length; i++) {
    //     materialIconsUIs[i].style.color = `rgb(${palette[palette.length - 2][0]}, ${palette[palette.length - 2][1]}, ${palette[palette.length - 2][2]})`;
    // }

    // // Aplicamos el primer color al texto de los class="material-icons-alt"
    // let materialIconsAlts = document.querySelectorAll('.material-icons-alt');
    // for (let i = 0; i < materialIconsAlts.length; i++) {
    //     materialIconsAlts[i].style.color = `rgb(${palette[0][0]}, ${palette[0][1]}, ${palette[0][2]})`;
    // }

    // creamos un style con todos los colores de la paleta, los almacenamos en variables :root, recorremos con for
    let styleColor = document.createElement('style');
    styleColor.innerHTML = `
        :root {
        `;
    for (let i = 0; i < palette.length; i++) {
        styleColor.innerHTML += `
            --color-${i}: rgb(${palette[i][0]}, ${palette[i][1]}, ${palette[i][2]}) !important;
        `;
    }
    styleColor.innerHTML += `
            --white: rgba(255, 255, 255, .7) !important;
        }
    `;
    document.head.appendChild(styleColor);

    // creamos un style con todas las clases mencionadas anteriormente
    let style = document.createElement('style');
    style.innerHTML = `
        .tittle {
            color: var(--color-${palette.length - 2});
        }
        .subtittle {
            color: var(--color-${palette.length - 1});
        }
        .paragraph {
            color: var(--color-${palette.length - 1});
        }
        .label {
            color: var(--color-${palette.length - 3});
        }
        .btn-ui {
            color: var(--color-${palette.length - 2});
            background-color: var(--color-1);
        }
        .btn-alt {
            color: var(--color-0);
            background-color: var(--color-${palette.length - 2});
        }
        .material-icons-ui {
            color: var(--color-${palette.length - 2});
        }
        .material-icons-alt {
            color: var(--color-0);
        }
        /* primer color al body y navbar */
        body {
            background-color: var(--color-0);
        }
        .navbar {
            background-color: var(--color-0);
        }
    `;
    // style.innerHTML = `
    //     .tittle {
    //         color: rgb(${palette[palette.length - 2][0]}, ${palette[palette.length - 2][1]}, ${palette[palette.length - 2][2]}) !important;
    //     }
    //     .subtittle {
    //         color: rgb(${palette[palette.length - 1][0]}, ${palette[palette.length - 1][1]}, ${palette[palette.length - 1][2]}) !important;
    //     }
    //     .parrafo {
    //         color: rgb(${palette[palette.length - 1][0]}, ${palette[palette.length - 1][1]}, ${palette[palette.length - 1][2]}) !important;
    //     }
    //     .label {
    //         color: rgb(${palette[3][0]}, ${palette[3][1]}, ${palette[3][2]})  !important;
    //     }
    //     .btn-ui {
    //         color: rgb(${palette[palette.length - 2][0]}, ${palette[palette.length - 2][1]}, ${palette[palette.length - 2][2]}) !important;
    //         background-color: rgb(${palette[1][0]}, ${palette[1][1]}, ${palette[1][2]}) !important;
    //     }
    //     .btn-alt {
    //         color: rgb(${palette[0][0]}, ${palette[0][1]}, ${palette[0][2]}) !important;
    //         background-color: rgb(${palette[palette.length - 2][0]}, ${palette[palette.length - 2][1]}, ${palette[palette.length - 2][2]}) !important;
    //     }
    //     .material-icons-ui {
    //         color: rgb(${palette[palette.length - 2][0]}, ${palette[palette.length - 2][1]}, ${palette[palette.length - 2][2]}) !important;
    //     }
    //     .material-icons-alt {
    //         color: rgb(${palette[0][0]}, ${palette[0][1]}, ${palette[0][2]}) !important;
    //     }
    //     /* primer color al body y al nav */
    //     body {
    //         background-color: rgb(${palette[0][0]}, ${palette[0][1]}, ${palette[0][2]}) !important;
    //     }
    //     nav {
    //         background-color: rgb(${palette[0][0]}, ${palette[0][1]}, ${palette[0][2]}) !important;
    //     }
    // `;
    document.head.appendChild(style);
}
