document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Clock HUD
  const clockElement = document.getElementById('realtime-clock');
  function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    seconds = seconds < 10 ? '0'+seconds : seconds;
    
    const strTime = `${hours}:${minutes}:${seconds} ${ampm}`;
    clockElement.textContent = strTime;
  }
  setInterval(updateClock, 1000);
  updateClock();

  // 2. Theme Switcher
  const themeSelector = document.getElementById('theme-selector');
  themeSelector.addEventListener('change', (e) => {
    const selectedTheme = e.target.value;
    document.body.className = ''; // Reset all classes
    document.body.classList.add(selectedTheme);
  });

  // 3. Card Hover Glow Effect
  const panels = document.querySelectorAll('.panel, .cert-card, .philosophy-card');
  panels.forEach(panel => {
    panel.addEventListener('mousemove', (e) => {
      const rect = panel.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      panel.style.setProperty('--mouse-x', `${x}px`);
      panel.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // 4. Lightbox Modal
  const modal = document.getElementById('lightbox-modal');
  const modalImg = document.getElementById('lightbox-img');
  const captionText = document.getElementById('lightbox-caption');
  const closeBtn = document.querySelector('.lightbox-close');

  const galleryItems = document.querySelectorAll('.project-img-container img, .activity-thumb');
  
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      modal.style.display = 'block';
      modalImg.src = item.src;
      captionText.textContent = item.alt;
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  // 5. Terminal CLI Simulator
  const terminalInput = document.getElementById('terminal-input');
  const terminalBody = document.getElementById('terminal-body');

  const COMMANDS = {
    help: 'คำสั่งที่รองรับ:\n  <span class="term-highlight">about</span>      - แนะนำตัวสั้นๆ\n  <span class="term-highlight">skills</span>     - แสดงทักษะความเชี่ยวชาญ\n  <span class="term-highlight">projects</span>   - แสดงโปรเจกต์เด่น\n  <span class="term-highlight">clear</span>      - ล้างหน้าจอ\n  <span class="term-highlight">matrix</span>     - เปิดโค้ดลับ Matrix\n  <span class="term-highlight">contact</span>    - ช่องทางการติดต่อ',
    about: 'ชื่อ: นางสาวณัฐทิชา ศรีสุข (ใบตอง)\nเป้าหมาย: AI Application Developer\nการศึกษา: วิศวกรรมคอมพิวเตอร์ (วิศวกรรมซอฟต์แวร์) มหาวิทยาลัยราชภัฏพิบูลสงคราม\n"พร้อมเรียนรู้และปรับตัวเข้ากับเครื่องมือใหม่ๆ ตลอดเวลา"',
    skills: 'ความทักษะทางเทคนิค:\n  [Python]   ■■■■■■■■□□ (AI & Computer Vision)\n  [PHP]      ■■■■■■□□□□ (Backend & DB)\n  [YOLO/CV]  ■■■■■■■■□□ (Object Detection)\n  [MySQL]    ■■■■■■■□□□ (Database)\n  [Java/C]   ■■■■■□□□□□ (OOP Foundations)',
    projects: 'โปรเจกต์เด่น:\n1. AI Smart Bin - แยกประเภทขยะรีไซเคิลด้วย YOLOv11 และ Roboflow\n2. แอปพลิเคชัน Android "เคมีเจ๋ง" - สื่อการเรียนรู้ตารางธาตุด้วย Java',
    contact: 'ช่องทางการติดต่อ:\n  เบอร์โทรศัพท์: 099-2710383\n  อีเมล: nadticha.s@psru.ac.th\n  Github: https://github.com/Nadticha30',
    matrix: 'Initializing Matrix Rain Mode...\n010101010101010101010101010101010101\nSYSTEM BREACHED: Nadticha30 successfully initialized.\nWake up, Neo... The Matrix has you...'
  };

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const inputVal = terminalInput.value.trim().toLowerCase();
      
      // Create user command line
      const userLine = document.createElement('div');
      userLine.className = 'term-line';
      userLine.innerHTML = `<span class="term-prompt">guest@baitong-oracle:~$</span> <span style="color:#fff;">${terminalInput.value}</span>`;
      terminalBody.insertBefore(userLine, terminalInput.parentElement);

      if (inputVal === 'clear') {
        // Clear all except introduction lines
        const lines = terminalBody.querySelectorAll('.term-line');
        lines.forEach(line => line.remove());
      } else if (inputVal === '') {
        // Do nothing
      } else if (COMMANDS[inputVal]) {
        const responseLine = document.createElement('div');
        responseLine.className = 'term-line output';
        responseLine.innerHTML = COMMANDS[inputVal].replace(/\n/g, '<br>');
        terminalBody.insertBefore(responseLine, terminalInput.parentElement);
      } else {
        const errorLine = document.createElement('div');
        errorLine.className = 'term-line error';
        errorLine.textContent = `ไม่รู้จักคำสั่ง: "${inputVal}" พิมพ์ "help" เพื่อดูรายการคำสั่ง`;
        terminalBody.insertBefore(errorLine, terminalInput.parentElement);
      }

      // Scroll to bottom
      terminalInput.value = '';
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }
  });

  // Keep terminal input focused on body click
  document.querySelector('.terminal-panel').addEventListener('click', () => {
    terminalInput.focus();
  });

  // 6. Smooth Scroll Active Effect
  const sections = document.querySelectorAll('.panel, .section-title, .activity-item');
  const observerOptions = {
    root: null,
    threshold: 0.05,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    section.classList.add('fade-in-section');
    observer.observe(section);
  });

});
