document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("config-form");
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const ssid = document.getElementById("ssid").value;
        const password = document.getElementById("password").value;

        fetch("/configure", {
            method: "POST",
            body: `ssid=${ssid}&password=${password}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(response => {
            if (response.ok) {
                console.log("Configuration successful");
            } else {
                console.error("Configuration failed");
            }
        }).catch(error => {
            console.error("Error:", error);
        });
    });
});
