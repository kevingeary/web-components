document.querySelectorAll('split-button').forEach(button => {
	const trigger = button.querySelector("button:first-of-type");
	const list = button.querySelector("ul");
	const items = list.querySelectorAll("a, button");

	// Make sure all items are initially unfocusable
	items.forEach(item => item.setAttribute("tabindex", "-1"));

	// Function to expand the list and set aria-expanded to true
	function expandList() {
		button.classList.add("expanded");
		trigger.setAttribute("aria-expanded", "true");
		// Make items focusable
		items.forEach(item => item.removeAttribute("tabindex"));
	}

	// Function to close the list and set aria-expanded to false
	function closeList() {
		button.classList.remove("expanded");
		trigger.setAttribute("aria-expanded", "false");
		trigger.focus();
		// Make items unfocusable
		items.forEach(item => item.setAttribute("tabindex", "-1"));
	}

	// Add expanded class for showing the list
	trigger.addEventListener("click", function () {
		if (button.classList.contains("expanded")) {
			closeList();
		} else {
			expandList();
		}
	});

	// Handle keyboard activation for the trigger
	trigger.addEventListener("keydown", function (event) {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault(); // Prevent default behavior for Enter and Space
			if (button.classList.contains("expanded")) {
				closeList();
			} else {
				expandList();
				items[0].focus(); // Focus the first item
			}
		}
	});

	// Listen for escape key to close the list & return focus
	document.addEventListener("keydown", function (event) {
		if (event.key === "Escape" && button.classList.contains("expanded")) {
			closeList();
		}
	});

	// Listen for clicks outside the button to close the list
	document.addEventListener("click", function (event) {
		if (
			!button.contains(event.target) &&
			button.classList.contains("expanded")
		) {
			closeList();
		}
	});

	// Listen for arrow keys and trap focus
	list.addEventListener("keydown", function (event) {
		const itemsArray = Array.from(items);
		let currentIndex = itemsArray.indexOf(document.activeElement);

		if (event.key === "ArrowDown") {
			event.preventDefault();
			currentIndex = (currentIndex + 1) % itemsArray.length;
			itemsArray[currentIndex].focus();
		} else if (event.key === "ArrowUp") {
			event.preventDefault();
			currentIndex = (currentIndex - 1 + itemsArray.length) % itemsArray.length;
			itemsArray[currentIndex].focus();
		} else if (event.key === "Tab") {
			if (button.classList.contains("expanded")) {
				event.preventDefault();
				if (event.shiftKey) {
					// Move focus to the previous item for Shift+Tab
					currentIndex =
						(currentIndex - 1 + itemsArray.length) % itemsArray.length;
				} else {
					// Move focus to the next item for Tab
					currentIndex = (currentIndex + 1) % itemsArray.length;
				}
				itemsArray[currentIndex].focus();
			}
		}
	});
});
