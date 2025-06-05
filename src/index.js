const handleClick = (ramen) => {
    const ramenDetail = document.getElementById("ramen-detail");
    const ratingDisplay = document.getElementById("rating-display");
    const commentDisplay = document.getElementById("comment-display");

  
    ramenDetail.querySelector("img").src = ramen.image;
    ramenDetail.querySelector("img").alt = ramen.name;
    ramenDetail.querySelector("h2").innerText = ramen.name;
    ramenDetail.querySelector("h3").innerText = ramen.restaurant;
    ratingDisplay.innerText = `Rating: ${ramen.rating}`;
    commentDisplay.innerText = ramen.comment;
};

// Adds an event listener to the form to handle new ramen submission
const addSubmitListener = () => {
    const newRamenForm = document.getElementById("new-ramen"); 

    newRamenForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevents page reload on form submission

        // Create a new ramen object from the form data
        const newRamen = {
            name: event.target["name"].value,
            restaurant: event.target["restaurant"].value,
            image: event.target["image"].value,
            rating: event.target["rating"].value,
            comment: event.target["new-comment"].value
        };

        // Send a POST request to the server to add the new ramen
        fetch("http://localhost:3000/ramens", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(newRamen)
        })
        .then(response => response.json()) 
        .then(data => {
            // Refresh the ramen list to include the new ramen
            displayRamens();
        })
        .catch(error => console.error("Error adding ramen:", error));

        // Reset the form after submission
        newRamenForm.reset();
    });
};

// Fetches all ramen from the server and displays them in the menu
const displayRamens = () => {
    fetch("http://localhost:3000/ramens")
    .then(response => response.json())
    .then(data => {
        const menu = document.getElementById("ramen-menu");
        menu.innerHTML = ""; 

        // For each ramen, create an image element and attach a click event
        data.forEach(ramen => {
            const imgRamens = document.createElement("img");
            imgRamens.src = ramen.image;
            imgRamens.alt = ramen.name;

            // When the image is clicked, show ramen details
            imgRamens.addEventListener("click", () => handleClick(ramen));

            // Add the image to the menu
            menu.appendChild(imgRamens);
        });
    })
    .catch(error => console.error("Error fetching ramens:", error));
};


const main = () => {
    displayRamens();       
    addSubmitListener();  
};


document.addEventListener("DOMContentLoaded", main);

// Export functions for testing or external use
export {
    displayRamens,
    addSubmitListener,
    handleClick,
    main
};
