document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('[data-tab-target]');
    const tabContents = document.querySelectorAll('[data-tab-content]');

    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const targetId = this.getAttribute('data-tab-target');
            const target = document.querySelector(targetId);

            tabContents.forEach(tabContent => {
                tabContent.style.display = 'none';
            });

            target.style.display = 'block';
        });
    });


    // Ordered Items
    const orderedItems = [];
    const orderButtons = document.querySelectorAll("#parts tbody button");

    orderButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            const row = this.closest("tr");
            const itemName = row.querySelector("td:nth-child(2)").textContent;
            const itemPrice = row.querySelector("td:nth-child(3)").textContent;

            orderedItems.push({ name: itemName, price: itemPrice });
            updateOrderedItemsTable();
        });
    });

    function updateOrderedItemsTable() {
        const orderedItemsTable = document.getElementById("orderedItemsTable");
        orderedItemsTable.innerHTML = "";

        orderedItems.forEach(function(item, index) {
            const row = document.createElement("tr");
            row.innerHTML = `<td>${index + 1}</td><td>${item.name}</td><td>${item.price}</td>`;
            orderedItemsTable.appendChild(row);
        });
    }


        // Get the logo and vertical-navbar elements
        const logo = document.getElementById("logo");
        const verticalNavbar = document.getElementById("vertical-navbar");

        // Add a click event listener to the logo
        logo.addEventListener("click", function () {
            // Toggle the display property of the vertical-navbar
            if (verticalNavbar.style.display === "block") {
                verticalNavbar.style.display = "none";
            } else {
                verticalNavbar.style.display = "block";
            }
        });
});




