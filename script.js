document.addEventListener('mousemove', function(e) {
    const container = document.getElementById('perspective');
    const containerRect = container.getBoundingClientRect();

    // Calculate rotation angles based on mouse position within the container
    const xPos = ((e.clientX - containerRect.left) / containerRect.width - 0.5) * 30;
    const yPos = ((e.clientY - containerRect.top) / containerRect.height - 0.5) * 30;

    // Apply perspective animation to the container
    container.style.transform = `rotateY(${xPos}deg) rotateX(${yPos}deg)`;
  });