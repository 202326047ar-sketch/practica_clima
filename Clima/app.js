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
    resultado.innerHTML = "❌ Geolocalización no compatible en este navegador.";
  }
}

function posicionCorrecta(posicion) {
  const lat = posicion.coords.latitude;
  const lon = posicion.coords.longitude;
  obtenerClima(lat, lon);
}

/*
  🔴 IMPORTANTE:
  Si el navegador BLOQUEA la ubicación (por usar HTTP),
  se ejecuta esta función y usamos una ubicación por defecto.
*/
function errorUbicacion() {
  resultado.innerHTML = "⚠️ Permiso de ubicación denegado.<br>Mostrando clima de ubicación por defecto (CDMX).";

  // Coordenadas de Ciudad de México
  const lat = 19.4326;
  const lon = -99.1332;

  obtenerClima(lat, lon);
}

function obtenerClima(lat, lon) {
  // ✅ TU API KEY REAL DE WEATHERAPI
  const apiKey = "db3296e7d7dd4cd5a2140246263003";

  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&lang=es`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("Respuesta incorrecta de la API");
      }
      return response.json();
    })
    .then(data => mostrarClima(data))
    .catch(error => {
      resultado.innerHTML = "❌ Error al obtener datos del clima.";
      console.error(error);
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
