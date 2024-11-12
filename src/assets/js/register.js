async function registerJS() {

  const frmRegister = document.getElementById("frm-register")

  frmRegister.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombres = document.getElementById('nombres').value;
    const apellidos = document.getElementById('apellidos').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch('http://localhost:3001/api/crear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombres, apellidos, email, password })
      });


      const data = await response.json();
      if (response.ok) {
        alert('Usuario Registrado con exito');
        window.location.href = '/index.html';
      } else {
        alert('Error: ' + data.message || 'Error al registrarse');
      }
    } catch (error) {
      console.error('Error al registrarse:', error);
      alert('Error al registrarse.');
    }
  })



  console.log("funciona")



}
registerJS()
