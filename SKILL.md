# Custom Skill: YuanXiaoshu Birthday Web Page Developer Reference Guide

This skill serves as the exact visual, structural, and interactive specifications guide for developing a premium, pixel-perfect 1:1 replica of the beautiful purple-themed birthday page for "yuanxiaoshu".

---

## Design Tokens & Theme Specification

### 1. Colors & Gradients
- **Cosmic Amethyst Gradient (Page Background)**:
  `linear-gradient(135deg, #12072B 0%, #200B3B 30%, #3B125C 60%, #5B1B7D 100%)`
- **Soft Rose Aura (Primary Accents)**: `#FF9EBB` (HSL: `342°, 100%, 81%`)
- **Creamy Champagne Gold (Calligraphy & Text)**: `#FCF1D8` (HSL: `42°, 79%, 92%`)
- **Glowing White (Titles & Icons)**: `#FFFFFF`
- **Warm Lightbulb Glow**: `rgba(255, 218, 121, 0.9)` / `radial-gradient(circle, rgba(255,223,126,1) 0%, rgba(255,183,77,0.3) 70%, rgba(255,183,77,0) 100%)`
- **Frosted Glass Container Background**: `rgba(255, 255, 255, 0.08)`
- **Frosted Glass Glow Border**: `1px solid rgba(255, 255, 255, 0.15)`
- **Glassmorphism Backdrop Blur**: `backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);`

### 2. Typography
- **Decorative Headings (e.g., "Happy Birthday")**: Use Google Fonts: `'Dancing Script', cursive` or `'Playfair Display', serif` with italics.
- **Body & Numerical Texts**: Use Google Fonts: `'Outfit', sans-serif` or `'Inter', sans-serif` for neat, premium readability.

### 3. Floating Particles & Animations
- **Twinkling Star Particle Effect**: Small golden stars `✨` that twinkle randomly.
- **Floating Heart Animation**: Soft, tiny pink/red hearts that gently float up from the bottom or around interactive hover states.
- **Pulsing Lights / Glows**: Soft fading glow animations (`opacity: 0.5` to `1`) applied to hanging fairy lights.

---

## Structural Guidelines (HTML & Layout)

The page layout must contain five main structural blocks stacked inside a responsive container:

### 1. Hero Block (Happy Birthday Header)
- **Visuals**:
  - A subtle glowing crescent moon in the top left.
  - A beautiful colorful birthday hat `🎉` resting on the letter "B" of "Birthday".
  - Warm hanging string lights across the top.
  - Pink ribbon image or CSS card in the center with text: `生日快乐，我亲爱的人`.
  - Floating balloons with dreamy opacity variations (`0.6` to `0.8`).
  - Exploding fireworks in the background (using canvas).
- **Text Block (Gold Calligraphy)**:
  ```text
  愿你所求皆如愿，所行皆坦途
  多喜乐，长安宁
  愿新的一岁，平安喜乐，万事胜意！
  ```
  *Use a heart symbol `❤` at the bottom to close the section.*

### 2. Countdown Block
- **Container**: Translucent frosted glass card centered on the screen.
- **Header**: `❤ 距离你的生日还有 ❤`
- **Grid Layout**: 4 equal columns containing the digital clock cards:
  - Card 1: `[12]` (天 / Days)
  - Card 2: `[08]` (小时 / Hours)
  - Card 3: `[35]` (分钟 / Minutes)
  - Card 4: `[21]` (秒 / Seconds)
- **Subtext**: `🎂 生日当天会有特别惊喜哦！` in a soft pink text container.

### 3. Memories Carousel Block
- **Container**: Smooth frosted glass card.
- **Title**: `📷 美好回忆` / *一起走过的时光，都是我最珍贵的记忆*
- **Slides**: A touch-responsive slider containing 5 vintage Polaroid photos taped with semi-transparent adhesive tabs:
  - `polaroid1.jpg`: Sea Sunset
  - `polaroid2.jpg`: Vase of Tulips
  - `polaroid3.jpg`: Fairy Lights Jar
  - `polaroid4.jpg`: Purple Clouds Moon
  - `polaroid5.jpg`: Daisy Field
- **Pagination Indicators**: A row of 5 circular indicator dots below, showing the active slide.

### 4. Personal Letter Block
- **Container**: Curved pastel-pink glass card.
- **Title**: `有些话，想对你说 ❤`
- **Structure**:
  - **Left**: An open romantic envelope with a sticker label showing "For You" and a soft pink heart.
  - **Center**: Custom letter text with an dynamic typewriter entrance effect.
  - **Right**: A realistic feather/quill pen standing inside an inkwell, surrounded by tiny floating heart particles.

### 5. Gift Claim Block
- **Container**: Curvy violet container with a dark starry background.
- **Header**: `🎁 点击领取生日礼物 ♡` / *一份专属于你的惊喜*
- **Visuals**: A high-resolution premium gift box centered on a reflective surface with warm spotlight rays.
- **Call-To-Action (CTA)**: A glowing, pulsing button containing `打开礼物 🎁`.
- **Instructional Caption**: `( 点击按钮，开启惊喜吧！)`

### 6. Footer Block
- **Content**:
  - `Made With ❤`
  - `By 你的专属小迷妹`
  - `2024.06.01`
- **Bottom Frame**: Hanging warm bulb fairy light decoration matching the top of the page.

---

## Interactive Gift Surprise Specification (JS & Canvas)

When the user clicks the "打开礼物" button:

1. **Trigger Box Shaking**: The gift box plays an intense shake animation for `800ms`.
2. **Confetti & Particle Blast**:
   - The gift box bursts open.
   - Canvas-based particle explosion fires from the center, spawning 200+ colored confetti pieces, golden stars, and glowing hearts cascading outwards.
3. **Fade-In Floating Coupon Drawer**:
   - The main gift block fades out, and an elegant glowing glass card smoothly slides in and scales up to the center.
   - The card reveals a greeting: `祝你生日快乐！为你送上专属礼物券：`
   - Three dynamic virtual coupons appear side-by-side with a 3D hover/tilt effect:
     - **Coupon 1: Companion Coupon 💖**: *"陪你走遍天涯海角券 - 随时兑换陪吃大餐与出游旅行"*
     - **Coupon 2: Wish Coupon 🎁**: *"无条件愿望券 - 满足你的任意一个小要求，绝不拒绝"*
     - **Coupon 3: Comfort Coupon 🤗**: *"专属拥抱和安慰券 - 无论开心难过，提供最温暖的港湾"*
4. **Sweet Background Music**:
   - A soft, romantic acoustics cover starts playing smoothly in the background.
   - A minimalist, glowing audio player appears in the top-right corner to allow full play/pause control.

---

## Mobile & PC Responsive Layout Rules

- **Universal Font Sizing**: Use `rem` or fluid variables (`clamp()`) to ensure letters scale perfectly.
- **Mobile Viewport (<= 768px)**:
  - Margins shrink to `12px` to maximize space.
  - Grid structures (like the countdown boxes) adjust sizes to remain readable on small screens.
  - Polaroid gallery switches to a 1-card-visible touch carousel.
  - The Envelope Letter changes from side-by-side layout to vertically stacked elements.
- **Animations Optimization**: Use CSS `will-change: transform, opacity` and canvas-based animations to ensure lag-free rendering on mobile devices.
