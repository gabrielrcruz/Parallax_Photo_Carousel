const track = document.getElementById("image-track");

const handleOnDown = (e) => {
  track.dataset.mouseDownAt = e.clientX;
}

const handleOnMove = (e) => {
  // Ignore when no mouse down (location is 0 when not clicking)
  if(track.dataset.mouseDownAt === "0") return;
  
  // How far our mouse has moved (using custom data property)
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
  // The total range of drag (half the width of window)
  const maxDelta = window.innerWidth / 2;
  // Calculating the percentage of the distance traveled relative to range
  const percentage = (mouseDelta / maxDelta) * -100;
  // Adding current mouse drag to any previous drag
  const newPercentageSansConstraints = parseFloat(track.dataset.prevPercentage) + percentage;
  // Setting upper & lower constraints of 0 & 100%
  const newPercentage = Math.max(Math.min(newPercentageSansConstraints, 0), -100);
  
  // Updating new drag percentage data prop
  track.dataset.percentage = newPercentage;
  // Updating carousel position using animate to give smooth scroll feel
  track.animate({
    transform: `translate(${newPercentage}%, -50%)`
  }, { duration: 1200, fill: "forwards" });
  // Updating each individual image position to pan left using animate
  for(const image of track.getElementsByClassName("image")) {
    image.animate({
      objectPosition: `${newPercentage + 100}% 50%`
    }, { duration: 1200, fill: "forwards" });
  }
}

const handleOnUp = (e) => {
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage;
}

window.onmousedown = (e) => handleOnDown(e);
window.ontouchstart = (e) => handleOnDown(e.touches[0]);

window.onmousemove = (e) => handleOnMove(e);
window.ontouchmove = (e) => handleOnMove(e.touches[0]);

window.onmouseup = (e) => handleOnUp(e);
window.ontouchend = (e) => handleOnUp(e.touches[0]);
