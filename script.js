// On va déclarer une constante avec notre clé d'api de open weather
// BIEN SUR VOUS PRENNEZ LA VOTRE !!!!!!!!!!!!!!
const apiKey = '8cd839c5fdafc91d2adc41462816ab09';

function getWeather() {

    // On va récupérer les valeurs des inputs
    const latitude = document.getElementById('latitude').value;
    const longitude = document.getElementById('longitude').value;
    // console.log('latiture', latitude);
    // console.log('longitude', longitude);

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=fr`;

    // On va faire une requ$ete ajax avec fetch
    fetch(url)
        .then(response => response.json())
        .then(data => {

            // Dans une constante weather on va reconstruire un objet literal avec les données de l'API
            // Je veux comme propriété: description, icon, température, humidité, vitesse du vent , ville et pays
            const weather = {
                description: data.weather[0].description,
                icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
                temperature: data.main.temp,
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                city: data.name,
                country: data.sys.country
            };
            console.log('weather', weather)

            // On va appeler la fonction displayWeather en lui passant en paramètre l'objet weather
            displayWeather(weather);
        }).catch(error => console.log(error));
}

function displayWeather(weather) {
    console.log('weather', weather);
    const resultDiv = document.getElementById('result');

    // Création une div avec la classe card
    const cardDiv = document.createElement('div');
    cardDiv.classname = 'card mb-3';
    cardDiv.style.maxWidth = '540px';
    cardDiv.style.backgroundColor = '#E3E3E3';

    // Créer une div avec la classe row
    const rowDiv = document.createElement('div');
    rowDiv.className = 'row g-0';

    // Créer une colonne pour l'image
    const colImgDiv = document.createElement('div');
    colImgDiv.className = 'col-md-4';

    // Créer une image
    const iconImg = document.createElement('img');
    iconImg.src = weather.icon;
    iconImg.alt = `icone météo : ${weather.description}`;
    iconImg.className = 'img-fluid rounded-start w-100';

    // Créer une colonne pour le contenue de la carte
    const colContentDiv = document.createElement('div');
    colContentDiv.className = 'col-md-8';

    // Créer le corp de la card
    const cardBodyDiv = document.createElement('div');
    cardBodyDiv.className = 'card-body';

    // Créer le titre de la card
    const cardTitle = document.createElement('h2');
    cardTitle.className = 'card-title';
    cardTitle.textContent = `${weather.city}, ${weather.country}`;

    // Créer le paragraphe de la description du temps
    const descP = document.createElement('p');
    descP.className = 'card-text';
    descP.textContent = `${weather.description}`;

    // Créer le paragraphe de la température
    const tempP = document.createElement('p');
    tempP.className = 'card-text';
    tempP.textContent = `Température: ${weather.temperature}°C`;

    // Créer le paragraphe de l'humidité
    const humidityP = document.createElement('p');
    humidityP.className = 'card-text';
    humidityP.textContent = `Humidité: ${weather.humidity}%`;

    // Créer le paragraphe de la vitesse du vent
    const winSpeedP = document.createElement('p');
    winSpeedP.className = 'card-text';
    winSpeedP.textContent = `Vitesse du vent: ${weather.windSpeed}m/s`;

    // On va ajouter les éléments dans le DOM
    // On va ajouter l'image dans la colonne de l'image
    colImgDiv.appendChild(iconImg);

    // On va ajouter le titre, la description, la température, l'humidité et la vitesse du vent dans le corps de la card
    cardBodyDiv.append(cardTitle, descP, tempP, humidityP, winSpeedP);

    // On va ajouter le corps de la card dans la colonne du contenue
    colContentDiv.appendChild(cardBodyDiv);

    // On va ajouter la colonne de l'image et la colonne du contenu dans la div row
    rowDiv.append(colImgDiv, colContentDiv);

    // On va ajouter la div row dans la div card
    cardDiv.appendChild(rowDiv);

    // On va ajouter la div card dans la div result
    resultDiv.innerHTML = '';
    resultDiv.appendChild(cardDiv);
}
