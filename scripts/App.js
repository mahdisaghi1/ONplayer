const musicProgress = document.getElementById('music-progress');

    musicProgress.addEventListener('input', function() {
      const gradientValue = musicProgress.value + '%';
      musicProgress.style.background = `linear-gradient(to right, #1F2544 ${gradientValue}, #639CD9 ${gradientValue}, #639CD9)`;
    });