/**
 * YuanXiaoshu Birthday Web Page - Core Interaction Script
 * Features: Starry Canvas Engine, Real-time Countdown, Scroll-Aware Polaroid Pagination, 3D Coupon Stack
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Canvas Starfield & Glow Trail Engine ---
  const canvas = document.getElementById('starfield');
  const ctx = canvas.getContext('2d');
  let stars = [];
  let sparkles = [];
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = (canvas.width = window.innerWidth);
    height = (canvas.height = window.innerHeight);
  });

  // Twinkling Star class
  class Star {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 1.6 + 0.4;
      this.twinkleSpeed = Math.random() * 0.03 + 0.008;
      this.alpha = Math.random();
      this.direction = Math.random() > 0.5 ? 1 : -1;
    }
    update() {
      this.alpha += this.twinkleSpeed * this.direction;
      if (this.alpha >= 1) {
        this.alpha = 1;
        this.direction = -1;
      } else if (this.alpha <= 0) {
        this.alpha = 0;
        this.direction = 1;
        this.reset();
      }
    }
    draw() {
      ctx.fillStyle = `rgba(252, 241, 216, ${this.alpha})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Confetti / Heart Particle class
  class Sparkle {
    constructor(x, y, color, isHeart = false) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 8 + 5;
      this.speedX = Math.random() * 10 - 5;
      this.speedY = Math.random() * -12 - 5; // Upward blast
      this.gravity = 0.22;
      this.color = color;
      this.alpha = 1;
      this.decay = Math.random() * 0.018 + 0.012;
      this.isHeart = isHeart;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = Math.random() * 0.12 - 0.06;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.speedY += this.gravity;
      this.alpha -= this.decay;
      this.rotation += this.rotationSpeed;
    }
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = this.color;
      
      if (this.isHeart) {
        // Draw elegant heart shape
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-this.size/2, -this.size/2, -this.size, 0, 0, this.size);
        ctx.bezierCurveTo(this.size, 0, this.size/2, -this.size/2, 0, 0);
        ctx.fill();
      } else {
        // Draw 5-point sparkling star shape
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          ctx.lineTo(0, 0 - this.size);
          ctx.rotate(Math.PI / 5);
          ctx.lineTo(0, 0 - this.size / 2);
          ctx.rotate(Math.PI / 5);
        }
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();
    }
  }

  // Populate dynamic stars
  const starCount = Math.min(120, Math.floor((width * height) / 7500));
  for (let i = 0; i < starCount; i++) {
    stars.push(new Star());
  }

  // Spawn star trails on mouse move
  window.addEventListener('mousemove', (e) => {
    if (Math.random() < 0.22) {
      const colors = ['#ff9ebb', '#fcf1d8', '#7bf2ff', '#ffffff'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      sparkles.push(new Sparkle(e.clientX, e.clientY, randomColor, Math.random() > 0.65));
    }
  });

  // Starfield loop
  function loop() {
    ctx.clearRect(0, 0, width, height);

    // Update & draw background stars
    stars.forEach((star) => {
      star.update();
      star.draw();
    });

    // Update & draw interactive particles
    for (let i = sparkles.length - 1; i >= 0; i--) {
      const particle = sparkles[i];
      particle.update();
      particle.draw();
      if (particle.alpha <= 0) {
        sparkles.splice(i, 1);
      }
    }

    requestAnimationFrame(loop);
  }
  loop();


  // --- 2. Real-time Countdown Timer ---
  // Target date: June 28th, 2026
  const targetDate = new Date('2026-06-28T00:00:00').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    let diff = targetDate - now;

    if (diff < 0) {
      diff = 0; // Birthday arrived!
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').innerText = String(days).padStart(2, '0');
    document.getElementById('hours').innerText = String(hours).padStart(2, '0');
    document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
    document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();


  // --- 3. Premium Carousel Slider for Polaroid Cards ---
  const polaroidRow = document.getElementById('polaroidRow');
  const slides = document.querySelectorAll('.polaroid-slide');
  const dots = document.querySelectorAll('.memories-card__dot');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  let currentSlide = 0;
  let autoplayTimer = null;
  const autoplayDelay = 4000; // 4 seconds

  function updateCarousel() {
    // Toggle active class on slides to trigger fade transition
    slides.forEach((slide, idx) => {
      if (idx === currentSlide) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });
    
    // Update dots indicator active states
    dots.forEach((dot, idx) => {
      if (idx === currentSlide) {
        dot.classList.add('memories-card__dot--active');
      } else {
        dot.classList.remove('memories-card__dot--active');
      }
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateCarousel();
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateCarousel();
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(nextSlide, autoplayDelay);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  // Prev/Next buttons event listeners
  prevBtn.addEventListener('click', () => {
    prevSlide();
    startAutoplay(); // Reset timer on user interaction
  });

  nextBtn.addEventListener('click', () => {
    nextSlide();
    startAutoplay(); // Reset timer on user interaction
  });

  // Dots click event listeners
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentSlide = index;
      updateCarousel();
      startAutoplay(); // Reset timer on user interaction
    });
  });

  // Pause autoplay when hovering over the memories card area
  const memoriesCard = document.getElementById('memoriesCard');
  memoriesCard.addEventListener('mouseenter', stopAutoplay);
  memoriesCard.addEventListener('mouseleave', startAutoplay);

  // Initialize carousel & start autoplay
  updateCarousel();
  startAutoplay();


  // --- 4. BGM Music Controller with Rotation Sync ---
  const bgm = document.getElementById('bgm');
  const audioPlayer = document.getElementById('audioPlayer');
  const musicIcon = document.getElementById('musicIcon');

  function toggleMusic() {
    if (bgm.paused) {
      bgm.play().then(() => {
        audioPlayer.classList.add('playing');
        musicIcon.innerText = '🎵';
      }).catch(err => {
        console.log("Autoplay was blocked by browser. Activating music upon user gesture.");
      });
    } else {
      bgm.pause();
      audioPlayer.classList.remove('playing');
      musicIcon.innerText = '🔇';
    }
  }

  audioPlayer.addEventListener('click', toggleMusic);


  // --- 5. Click "打开礼物" Surprise Sequence ---
  const giftBtn = document.getElementById('giftBtn');
  const giftBox = document.getElementById('giftBox');
  const surpriseOverlay = document.getElementById('surpriseOverlay');
  const closeSurprise = document.getElementById('closeSurprise');
  
  // Lock Modal Elements
  const lockModal = document.getElementById('lockModal');
  const closeLockBtn = document.getElementById('closeLockBtn');
  const lockCountdown = document.getElementById('lockCountdown');

  // Developer Bypass Easter Egg
  let devClicks = 0;
  let isBypassed = false;
  giftBox.addEventListener('click', () => {
    devClicks++;
    if (devClicks >= 5 && !isBypassed) {
      isBypassed = true;
      // Trigger sparklers to indicate success
      const rect = giftBox.getBoundingClientRect();
      for (let i = 0; i < 30; i++) {
        sparkles.push(new Sparkle(
          rect.left + rect.width / 2,
          rect.top + rect.height / 2,
          '#ff9ebb',
          true
        ));
      }
      alert("❤️ [测试通道] 惊喜礼盒已临时解封！点击“打开礼物”即可预览内容。");
    }
  });

  // Countdown timer for Lock Modal
  let lockTimer = null;
  function updateLockCountdown() {
    const now = new Date().getTime();
    // Unlock target date: June 27th, 2026
    const unlockTarget = new Date('2026-06-27T00:00:00').getTime();
    let diff = unlockTarget - now;

    if (diff <= 0) {
      lockCountdown.innerText = "礼物解封时间已到！请刷新页面开启！";
      if (lockTimer) clearInterval(lockTimer);
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    lockCountdown.innerText = `距离解封还有：${d}天 ${h}小时 ${m}分 ${s}秒`;
  }

  giftBtn.addEventListener('click', () => {
    // Check Date restriction (June 27th or 28th)
    const today = new Date();
    const isJune = today.getMonth() === 5; // 0-indexed: 5 is June
    const is27or28 = today.getDate() === 27 || today.getDate() === 28;
    
    if (!isJune || !is27or28) {
      if (!isBypassed) {
        // Show Lock Modal
        lockModal.classList.add('active');
        updateLockCountdown();
        if (lockTimer) clearInterval(lockTimer);
        lockTimer = setInterval(updateLockCountdown, 1000);
        return;
      }
    }

    // Stage 1: Shake gift box
    giftBox.classList.add('shake-animation');
    
    // Play background music if paused
    if (bgm.paused) {
      bgm.play().then(() => {
        audioPlayer.classList.add('playing');
        musicIcon.innerText = '🎵';
      }).catch(e => console.log(e));
    }

    // Spawn rich warm particles while shaking
    const shakingTimer = setInterval(() => {
      const rect = giftBox.getBoundingClientRect();
      const colors = ['#ff9ebb', '#fcf1d8', '#7bf2ff', '#ffffff'];
      sparkles.push(new Sparkle(
        rect.left + rect.width / 2 + (Math.random() * 40 - 20),
        rect.top + rect.height / 2 + (Math.random() * 40 - 20),
        colors[Math.floor(Math.random() * colors.length)],
        Math.random() > 0.5
      ));
    }, 50);

    setTimeout(() => {
      clearInterval(shakingTimer);
      giftBox.classList.remove('shake-animation');

      // Stage 2: Grand Explosion
      const rect = giftBox.getBoundingClientRect();
      const colors = ['#ff5280', '#ff9ebb', '#ffda79', '#7bf2ff', '#ffffff'];
      
      // Burst 180 high-energy sparkles
      for (let i = 0; i < 180; i++) {
        sparkles.push(new Sparkle(
          rect.left + rect.width / 2,
          rect.top + rect.height / 2,
          colors[Math.floor(Math.random() * colors.length)],
          Math.random() > 0.65
        ));
      }

      // Stage 3: Slide-in overlay coupons drawer
      setTimeout(() => {
        surpriseOverlay.classList.add('active');
        
        // Spawn soft magical hearts on active box overlay
        const boxRect = document.querySelector('.surprise-box').getBoundingClientRect();
        for (let i = 0; i < 35; i++) {
          setTimeout(() => {
            sparkles.push(new Sparkle(
              boxRect.left + Math.random() * boxRect.width,
              boxRect.top + Math.random() * boxRect.height,
              '#ff9ebb',
              true
            ));
          }, i * 50);
        }
      }, 400);

    }, 1200); // Shaking time
  });

  closeSurprise.addEventListener('click', () => {
    surpriseOverlay.classList.remove('active');
  });

  closeLockBtn.addEventListener('click', () => {
    lockModal.classList.remove('active');
    if (lockTimer) {
      clearInterval(lockTimer);
      lockTimer = null;
    }
  });


  // --- 6. 3D Flip Love Coupons & Redeem Sparkles ---
  const coupons = document.querySelectorAll('.love-coupon');

  coupons.forEach((coupon) => {
    coupon.addEventListener('click', (e) => {
      // Do not re-flip when clicking the redeem button
      if (e.target.classList.contains('love-coupon__redeem-btn')) {
        return;
      }
      coupon.classList.toggle('flipped');
    });

    const redeemBtn = coupon.querySelector('.love-coupon__redeem-btn');
    redeemBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent card from flipping back
      
      const rect = redeemBtn.getBoundingClientRect();
      const colors = ['#ffffff', '#ff9ebb', '#ffda79', '#7bf2ff'];
      
      // Fire beautiful sparkles on redeem click
      for (let i = 0; i < 60; i++) {
        sparkles.push(new Sparkle(
          rect.left + rect.width / 2,
          rect.top + rect.height / 2,
          colors[Math.floor(Math.random() * colors.length)],
          Math.random() > 0.55
        ));
      }

      // Set button to redeemed state
      redeemBtn.innerText = '已兑现 💖';
      redeemBtn.disabled = true;
      redeemBtn.style.background = '#dcdde1';
      redeemBtn.style.color = '#7f8c8d';
      redeemBtn.style.cursor = 'default';
      
      // Flip back card after a short delay
      setTimeout(() => {
        coupon.classList.remove('flipped');
      }, 1500);
    });
  });

});
