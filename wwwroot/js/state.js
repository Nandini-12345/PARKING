let connection = new signalR.HubConnectionBuilder()
    .withUrl("/hub/status")
    .build();

connection.start()
    .then(() => {
        console.log("SignalR connected");

        connection.on("ReceiveMessage", (address, status) => {
            console.log("Received data from SignalR:", address);

            try {
                let spanElement = document.getElementById(`d-${address}`);
                spanElement.innerText = status;

                if (status === "ONLINE") {
                    spanElement.style.background = "green";
                }
                else if (status === "OFFLINE"){
                    spanElement.style.background = "red";
                }
            } catch (error) {
                console.error("Error finding the element:", error);
            }
        });
    })
    .catch((err) => {
        console.error("Error starting SignalR connection:", err.toString());
    });