// Theme Toggle with smooth transition
function toggleTheme() {
  document.body.classList.toggle("dark-mode");
  let theme = "light";
  if (document.body.classList.contains("dark-mode")) {
    theme = "dark";
  }
  localStorage.setItem("theme", theme);
  
  // Add a subtle animation effect
  document.body.style.transition = "all 0.3s ease";
  setTimeout(() => {
    document.body.style.transition = "";
  }, 300);
}

// Apply saved theme on load with smooth transition
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }
  
  // Add loading animation
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease";
    document.body.style.opacity = "1";
  }, 100);
});

// Enhanced Back to Top Button with smooth scroll
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  const backToTopBtn = document.querySelector(".back-to-top");
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    backToTopBtn.style.display = "block";
    backToTopBtn.style.opacity = "1";
  } else {
    backToTopBtn.style.opacity = "0";
    setTimeout(() => {
      if (backToTopBtn.style.opacity === "0") {
        backToTopBtn.style.display = "none";
      }
    }, 300);
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Enhanced Copy Code and Send to Telegram with better feedback
function copyAndSend() {
  const copyText = document.getElementById("copyText");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  
  // Modern clipboard API with fallback
  if (navigator.clipboard) {
    navigator.clipboard.writeText(copyText.value).then(() => {
      showToast("تم النسخ بنجاح!");
    }).catch(() => {
      // Fallback to execCommand
      document.execCommand("copy");
      showToast("تم النسخ بنجاح!");
    });
  } else {
    document.execCommand("copy");
    showToast("تم النسخ بنجاح!");
  }
}

// Enhanced Copy to Clipboard for individual codes
function copyToClipboard(elementId) {
  const copyText = document.getElementById(elementId);
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  
  if (navigator.clipboard) {
    navigator.clipboard.writeText(copyText.value).then(() => {
      showNotification("تم النسخ بنجاح!");
    }).catch(() => {
      document.execCommand("copy");
      showNotification("تم النسخ بنجاح!");
    });
  } else {
    document.execCommand("copy");
    showNotification("تم النسخ بنجاح!");
  }
}

// Enhanced notification system
function showNotification(message) {
  const notification = document.getElementById("notification");
  notification.textContent = message;
  notification.style.display = "block";
  notification.style.opacity = "1";
  notification.style.transform = "translateX(-50%) translateY(0)";
  
  setTimeout(() => {
    notification.style.opacity = "0";
    notification.style.transform = "translateX(-50%) translateY(-20px)";
    setTimeout(() => {
      notification.style.display = "none";
    }, 300);
  }, 2500);
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.className = "toast show";
  setTimeout(() => {
    toast.className = toast.className.replace("show", "");
  }, 3000);
}

// Enhanced Clock and Countdown with better formatting
function updateClock() {
  const now = new Date();
  const timeElement = document.getElementById("time");
  const dateElement = document.getElementById("date");

  if (timeElement) {
    const timeString = now.toLocaleTimeString("ar-EG", { 
      hour: "2-digit", 
      minute: "2-digit", 
      second: "2-digit",
      hour12: false
    });
    timeElement.textContent = timeString;
  }
  
  if (dateElement) {
    const dateString = now.toLocaleDateString("ar-EG", { 
      weekday: "long", 
      year: "numeric", 
      month: "long", 
      day: "numeric" 
    });
    dateElement.textContent = dateString;
  }
}

// Enhanced countdown with better visual feedback
function updateCountdown() {
  const countdownElement = document.getElementById("countdown");
  if (!countdownElement) return;

  const now = new Date();
  const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
  const timeLeft = endOfDay - now;

  if (timeLeft < 0) {
    countdownElement.textContent = "انتهى العرض!";
    countdownElement.style.color = "#d32f2f";
    return;
  }

  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  countdownElement.textContent = timeString;
  
  // Add urgency color as time runs out
  if (hours < 1) {
    countdownElement.style.color = "#d32f2f";
  } else if (hours < 3) {
    countdownElement.style.color = "#ff9800";
  }
}

// Start timers
setInterval(updateClock, 1000);
setInterval(updateCountdown, 1000);
updateClock();
updateCountdown();

// Enhanced Media Filter with smooth animations
function filterMedia(category) {
  const mediaItems = document.querySelectorAll(".media-item");
  
  // First fade out all items
  mediaItems.forEach(item => {
    item.style.transition = "opacity 0.3s ease, transform 0.3s ease";
    item.style.opacity = "0";
    item.style.transform = "scale(0.9)";
  });
  
  // Then show/hide based on category after animation
  setTimeout(() => {
    mediaItems.forEach(item => {
      if (category === "all" || item.classList.contains(category)) {
        item.style.display = "block";
        setTimeout(() => {
          item.style.opacity = "1";
          item.style.transform = "scale(1)";
        }, 50);
      } else {
        item.style.display = "none";
      }
    });
  }, 300);

  // Update active button style
  const filterButtons = document.querySelectorAll(".filter-buttons button");
  filterButtons.forEach(button => {
    button.classList.remove("active");
  });
  
  // Find and activate the clicked button
  const activeButton = Array.from(filterButtons).find(button => 
    button.getAttribute('onclick').includes(`'${category}'`)
  );
  if (activeButton) {
    activeButton.classList.add("active");
  }
}

// Form submission handler with validation
document.addEventListener("DOMContentLoaded", () => {
  const subscribeForm = document.getElementById("subscribe-form");
  if (subscribeForm) {
    subscribeForm.addEventListener("submit", function(e) {
      e.preventDefault();
      
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const plan = document.getElementById("plan").value;
      
      if (!name || !email || !plan) {
        showNotification("يرجى ملء جميع الحقول المطلوبة");
        return;
      }
      
      // Simple email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showNotification("يرجى إدخال بريد إلكتروني صحيح");
        return;
      }
      
      // Simulate form submission
      showNotification("تم إرسال طلب الاشتراك بنجاح! سنتواصل معك قريباً");
      subscribeForm.reset();
    });
  }
  
  // Initialize filter to show all on load
  filterMedia("all");
  
  // Add smooth scroll to navigation links
  const navLinks = document.querySelectorAll('.navbar a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

// Add intersection observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe sections for scroll animations
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });
});


