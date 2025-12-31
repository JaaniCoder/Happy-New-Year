const pages = {
    entrance: {
        img: 'assets/cat-intro.jpg',
        text: 'Hey! I made something for you. Will you see it?',
        buttons: `<button class="btn-yes" onclick="showPage('page2', true)">YES</button>
                  <button onclick="showPage('page1')">NO</button>`
    },
    page1: {
        img: 'assets/cat-gun.jpg',
        text: 'HOW DARE YOUUU!',
        buttons: `<button onclick="showPage('entrance')">BACK</button>`
    },
    page2: {
        img: 'assets/cat-heart.jpg',
        text: 'Hehe! Click below for the surprise!!',
        buttons: `<button class="btn-yes" onclick="showPage('page3')">NEXT</button>`
    },
    page3: {
        img: 'assets/cat-excited.jpg',
        text: '<span class="wish-text">Happy New Year my Kuchupuchu!!</span><br>Click on the bouquet my highness!',
        isGift: true
    },
    page4: {
        img: 'assets/cat-camera.webp',
        text: 'SMILEEEEEE<br>Click on the camera to reveal photos!!',
        isCamera: true
    },
    page5: {
        img: 'assets/cat-with-glasses.jpg', // The cat sticker at the top
        isFinal: true,
        // Replace these with your actual image paths
        photos: ['assets/pic1.jpeg', 'assets/pic2.jpeg', 'assets/pic3.jpeg', 'assets/pic4.jpeg', 'assets/pic5.jpeg', 'assets/pic6.jpeg'],
        captions: ['Memories', 'Us ❤️', 'Best Day', 'Hands in Hands Forever', "You're my forever", 'Happy 2025'],
        text: 'I Love You!'
    }
};

const assetsToPreload = [
    'assets/cat-intro.jpg', 'cat-gun.jpg', 'cat-heart.jpg', 
    'cat-excited.jpg', 'cat-camera.webp', 'cat-with-glasses.jpg',
    'pic1.jpeg', 'pic2.jpeg', 'pic3.jpeg', 'pic4.jpeg', 'pic5.jpeg', 'pic6.jpeg'
];

function preloadAssets() {
    assetsToPreload.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

preloadAssets();

function showPage(pageKey, startMusic = false) {
    if(startMusic) {
        const music = document.getElementById('bg-music');
        music.play().catch(e => console.log("Music play blocked until user interaction."));
    }
    
    const data = pages[pageKey];
    const mainCard = document.getElementById('main-card');
    
    mainCard.classList.add('animate__fadeOut');

    setTimeout(() => {
        let content = '';

        if (data.isFinal) {
            // Special layout for 4 images
            content = `
                <img src="${data.img}" class="sticker-img animate__animated animate__bounceIn" style="width:100px; margin-bottom:10px;">
                <h2 class="wish-text animate__animated animate__fadeIn" style="margin-bottom:5px;">${data.text}</h2>
                <div class="photo-grid">
                    ${data.photos.map((url, i) => `
                        <div class="polaroid p${(i % 4) + 1} animate__animated animate__zoomIn" style="animation-delay: ${i * 0.15}s">
                            <img src="${url}">
                            <span>${data.captions[i] || ''}</span>
                        </div>
                    `).join('')}
                </div>
                
                <button class="btn-restart animate__animated animate__fadeInUp" onclick="location.reload()">RESTART</button>
            `;
        } else {
            // Standard layout for other pages
            content = `
                <img src="${data.img}" class="sticker-img animate__animated animate__zoomIn" id="action-img">
                <h2 class="animate__animated animate__fadeInUp">${data.text}</h2>
                <div class="button-group">${data.buttons || ''}</div>
            `;
        }
        
        mainCard.innerHTML = content;
        mainCard.scrollTop = 0;
        mainCard.classList.remove('animate__fadeOut');
        mainCard.classList.add('animate__fadeIn');

        const actionImg = document.getElementById('action-img');
        if(data.isGift) actionImg.onclick = () => showPage('page4');
        if(data.isCamera) actionImg.onclick = () => showPage('page5');
        
    }, 400);
}

showPage('entrance');