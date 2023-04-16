window.addEventListener('load', function() {
  // Get all <img> elements within the .post-content container
  const images = document.querySelectorAll('.post-content img');
  
  // Loop through each image and check if it has a "title" attribute
  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    const title = img.getAttribute('title');
    
    if (title) {
      // Create a <blockquote> element with the title as its content
      const blockquote = document.createElement('blockquote');
      blockquote.textContent = title;
      
      // Add the "image-caption" class to the <blockquote> element
      blockquote.classList.add('image-caption');
      
      // Insert the <blockquote> element after the <img> element
      img.parentNode.insertBefore(blockquote, img.nextSibling);
    }
  }
});
