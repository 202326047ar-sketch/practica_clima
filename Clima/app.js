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
  resultado.innerHTML = "⚠️ Permiso de ubicación denegado.<br>Mostrando clima de u>

  // Coordenadas de Ciudad de México
  const lat = 19.4326;
  const lon = -99.1332;

  obtenerClima(lat, lon);
}
