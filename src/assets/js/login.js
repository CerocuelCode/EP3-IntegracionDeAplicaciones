function mainJS() {
    const frmLogin = document.getElementById("frm-login");

    frmLogin.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const url = "http://localhost:3001/api/login";
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
            .then(response => {
                if (!response.ok) {
                    return response.json()
                        .then(data => {
                            throw new Error(data.message || "Error en la autenticación");
                        });
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                window.location.href = "/principal.html";
               // alert("USUARIO EXISTE Y EXITO");
            })
            .catch(error => {
                console.error("Error:", error);
                alert(`${error.message}`);
            });
    });

    console.log("LOGIN");
}

mainJS();


