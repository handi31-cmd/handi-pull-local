<script>
document.addEventListener("DOMContentLoaded", function() {
  const container = document.querySelector('.right-content');
  const links = document.querySelectorAll('a[href^="#"]');
  const headerHeight = 80; // hauteur de ton header fixe si tu en as un
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const targetPosition = target.offsetTop - headerHeight;
        container.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});
</script>