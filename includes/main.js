$(function(){
    $("#footer").load("/includes/footer.html"); 
});


// Load the YouTube Iframe API asynchronously
function loadYouTubeAPI() {
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }
  
  // Create a new YouTube player and embed it in the page
  function playYouTubeVideo(videoId) {
    var player = new YT.Player('youtube-player', {
      height: '360',
      width: '640',
      videoId: videoId,
      events: {
        'onReady': function(event) {
          event.target.playVideo();
        },
        'onStateChange': function(event) {
          if (event.data === YT.PlayerState.ENDED) {
            event.target.destroy();
          }
        }
      }
    });
  }
  
  // Listen for clicks on the "rick" class and play the YouTube video
  document.querySelectorAll('.rick').forEach(function(element) {
    element.addEventListener('click', function(event) {
      event.preventDefault();
      var videoId = element.getAttribute('data-video-id');
      playYouTubeVideo(videoId);
    });
  });
  
  // Load the YouTube API when the page finishes loading
  window.addEventListener('load', loadYouTubeAPI);
  