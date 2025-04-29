function login() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  
  // Controllo semplice (puoi migliorarlo con dati veri)
  if (username === "admin" && password === "birillo") {
    // Carica la home
    window.location.href = "home.html";
  } else {
    alert("Username o password errati");
  }
}

