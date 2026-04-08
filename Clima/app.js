const boton = document.getElementById("btnClima");
const resultado = document.getElementById("resultado");

boton.addEventListener("click", obtenerUbicacion);

function obtenerUbicacion() {
  if ("geolocation" in navigator) {
    resultado.innerHTML = "⏳ Intentando obtener ubicación...";
    navigator.geolocation.getCurrentPosition(
      posicionCorrecta,
      errorUbicacion
    );
  } else {
    resultado.innerHTML = "❌ Geolocalización no compatible.";
  }
}

function posicionCorrecta(posicion) {
  const lat = posicion.coords.latitude;
  const lon = posicion.coords.longitude;
  obtenerClima(lat, lon);
}

function errorUbicacion() {
  resultado.innerHTML = "⚠️ Permiso de ubicación denegado.<br>Mostrando clima de ubicación por defecto (CDMX).";

  // Coordenadas Ciudad de México
  const lat = 19.4326;
  const lon = -99.1332;

  obtenerClima(lat, lon);
}

function obtenerClima(lat, lon) {
  const apiKey = "TU_APIKEY";

  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&lang=es`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("Error en la API");
      }
      return response.json();
    })
    .then(data => mostrarClima(data))
    .catch(() => {
      resultado.innerHTML = "❌ Error al obtener datos del clima.";
    });
}

function mostrarClima(data) {
  resultado.innerHTML = `
    <h2>${data.location.name}, ${data.location.country}</h2>
    https:${data.current.condition.icon}
    <p>🌡️ Temperatura: ${data.current.temp_c} °C</p>
    <p>☁️ Clima: ${data.current.condition.text}</p>
    <p>💧 Humedad: ${data.current.humidity}%</p>
  `;
}
