document.addEventListener("DOMContentLoaded", () => {
    // Get all milestone checkboxes
    const milestones = document.querySelectorAll(".milestone");

    milestones.forEach((milestone) => {
        milestone.addEventListener("change", updateProgress);
    });
});

function updateProgress(event) {
    const checkbox = event.target;
    const goalIndex = checkbox.dataset.goal; // Get the goal index
    const progressBar = document.querySelectorAll(".progress-bar")[goalIndex];
    const progressFill = progressBar.querySelector(".progress-fill");
    const progressPercentage = document.querySelectorAll(".progress-percentage")[goalIndex];
    const goalContainer = document.querySelectorAll(".goal")[goalIndex]; // Get the specific goal container

    // Get all checkboxes for the same goal
    const goalMilestones = document.querySelectorAll(`.milestone[data-goal="${goalIndex}"]`);

    // Calculate progress
    let totalProgress = 0;
    goalMilestones.forEach((milestone) => {
        if (milestone.checked) {
            totalProgress += parseInt(milestone.value, 10);
        }
    });

    // Update progress bar and percentage
    progressFill.style.width = `${totalProgress}%`;
    progressPercentage.textContent = `${totalProgress}% Completed`;

    // Check if the goal is 100% complete
    if (totalProgress === 100) {
        showCongratulationsMessage(goalContainer);
    } else {
        removeCongratulationsMessage(goalContainer);
    }
}

function showCongratulationsMessage(container) {
    // Check if the message already exists to avoid duplicates
    if (!container.querySelector(".congratulations")) {
        const message = document.createElement("div");
        message.className = "congratulations";
        message.textContent = "🎉 Congratulations! You've completed this goal! 🎉";
        container.appendChild(message);
    }
}

function removeCongratulationsMessage(container) {
    const message = container.querySelector(".congratulations");
    if (message) {
        message.remove();
    }
}
