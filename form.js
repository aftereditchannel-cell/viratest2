// ===== کلید ذخیره فرم =====
const STORAGE_KEY = "onboardingData";
const DONE_KEY = "vira_form_done";

// داده‌های فرم
const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
const data = {
  height: saved.height || "",
  weight: saved.weight || "",
  age: saved.age || "",
  bodyShape: saved.bodyShape || "",
  gender: saved.gender || "",
  styles: saved.styles || [],
  goals: saved.goals || []
};

// ذخیره فرم
function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// المان‌ها
const steps = document.querySelectorAll(".step");
const progress = document.getElementById("progress");
const nextBtn = document.getElementById("nextBtn");
let step = 0;

// رندر گزینه‌ها
function render(list, el, key, multi = false) {
  list.forEach(([val, label]) => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.innerText = label;
    if ((multi && data[key].includes(val)) || data[key] === val) btn.classList.add("active");
    btn.onclick = () => {
      if (multi) {
        data[key] = data[key].includes(val) ? data[key].filter(v => v !== val) : [...data[key], val];
        btn.classList.toggle("active");
      } else {
        data[key] = val;
        [...el.children].forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
      }
      save();
      validate();
    };
    el.appendChild(btn);
  });
}

// نمونه داده‌ها
const bodyShapes = [["slim","لاغر"],["athletic","ورزشکاری"],["average","متوسط"],["plus","پلاس‌سایز"]];
const genders = [["male","مرد"],["female","زن"],["non","غیردودویی"],["none","نمی‌گم"]];
const styles = [["minimal","✨ مینیمال"],["street","🔥 خیابانی"],["formal","👔 رسمی"],["casual","😎 کژوال"],["sport","🏃 اسپرت"],["luxury","💎 لاکچری"],["exp","🎨 تجربی"]];
const goals = [["daily","☀️ روزانه"],["party","🎉 مهمانی"],["date","💕 قرار"],["show","💃 فشن‌شو"],["closet","👚 کمد"],["ai","🤖 استایلیست"]];

render(bodyShapes, document.getElementById("bodyShapes"), "bodyShape");
render(genders, document.getElementById("genders"), "gender");
render(styles, document.getElementById("styles"), "styles", true);
render(goals, document.getElementById("goals"), "goals", true);

// ورودی‌های عددی
["height","weight","age"].forEach(id => {
  const el = document.getElementById(id);
  el.value = data[id];
  el.oninput = e => { data[id] = e.target.value; save(); validate(); };
});

// ===== تابع validate =====
let lastOk = false;
function validate() {
  let ok = false;
  if (step === 0) ok = data.height && data.weight && data.bodyShape;
  if (step === 1) ok = data.gender && data.styles.length;
  if (step === 2) ok = data.goals.length;

  nextBtn.classList.toggle("enabled", ok);

  // افکت bounce فقط وقتی تازه فعال شده باشه
  if (ok && !lastOk) {
    nextBtn.animate([
      { transform: 'scale(0.95)' },
      { transform: 'scale(1)' }
    ], { duration: 150, easing: 'ease-out' });
  }
  lastOk = ok;
}

// ===== بروزرسانی UI =====
function updateUI() {
  steps.forEach(s => s.classList.add("hidden"));
  steps[step].classList.remove("hidden");
  progress.style.width = ((step + 1) / steps.length * 100) + "%";
  nextBtn.innerText = step === steps.length - 1 ? "شروع کنیم 🚀" : "بعدی";
  validate();
}

nextBtn.onclick = () => {
  if (!nextBtn.classList.contains("enabled")) return;
  if (step < steps.length - 1) {
    step++;
    updateUI();
  } else {
    localStorage.setItem(DONE_KEY, "true");
    save();
    alert("آن‌بوردینگ با موفقیت انجام شد 🚀");
    window.location.href = "home.html";
  }
};

updateUI();
