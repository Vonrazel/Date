document.addEventListener('DOMContentLoaded', () => {
    const noBtn = document.querySelector('.no-btn');
    const yesBtn = document.querySelector('.yes-btn');
    const successMessage = document.querySelector('.success-message');
    const buttons = document.querySelector('.buttons');

    // Make the No button run away from cursor
    document.addEventListener('mousemove', (e) => {
        const noBtnRect = noBtn.getBoundingClientRect();
        const noBtnCenterX = noBtnRect.left + noBtnRect.width / 2;
        const noBtnCenterY = noBtnRect.top + noBtnRect.height / 2;
        
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        // Calculate distance between mouse and button
        const distance = Math.sqrt(
            Math.pow(mouseX - noBtnCenterX, 2) + 
            Math.pow(mouseY - noBtnCenterY, 2)
        );
        
        // If mouse is close to the button, move it away
        if (distance < 100) {
            const moveX = (noBtnCenterX - mouseX) * 2;
            const moveY = (noBtnCenterY - mouseY) * 2;
            
            // Keep button within viewport
            const maxX = window.innerWidth - noBtnRect.width;
            const maxY = window.innerHeight - noBtnRect.height;
            
            const newX = Math.min(Math.max(0, noBtnRect.left + moveX), maxX);
            const newY = Math.min(Math.max(0, noBtnRect.top + moveY), maxY);
            
            noBtn.style.position = 'fixed';
            noBtn.style.left = newX + 'px';
            noBtn.style.top = newY + 'px';
        }
    });

    // Handle Yes button click
    yesBtn.addEventListener('click', () => {
        buttons.style.display = 'none';
        successMessage.classList.remove('hidden');
        
        // Add confetti effect
        for (let i = 0; i < 50; i++) {
            createConfetti();
        }
    });

    // Create confetti elements
    function createConfetti() {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = Math.random() > 0.5 ? '#ff69b4' : '#9370db';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        confetti.style.borderRadius = '50%';
        confetti.style.opacity = Math.random();
        document.body.appendChild(confetti);

        const animation = confetti.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 2000 + 1500,
            easing: 'cubic-bezier(.37,0,.63,1)'
        });

        animation.onfinish = () => confetti.remove();
    }
}); 