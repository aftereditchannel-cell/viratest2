function validate(){
  let ok=false;
  if(step===0) ok=data.height&&data.weight&&data.bodyShape;
  if(step===1) ok=data.gender&&data.styles.length;
  if(step===2) ok=data.goals.length;
  nextBtn.classList.toggle("enabled",ok);

  // افکت bounce کوتاه وقتی فعال شد
  if(ok){
    nextBtn.animate([
      { transform: 'scale(0.95)' },
      { transform: 'scale(1)' }
    ], { duration: 150, easing: 'ease-out' });
  }
}
