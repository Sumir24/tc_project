// app.js - simple reels UI that reads courses.json and embeds YouTube iframes
let state = { courses: [], currentCourseIndex: 0, lessonIndex: 0 };

async function loadData() {
  const resp = await fetch('./courses.json');
  const data = await resp.json();
  state.courses = data.courses || [];
  populateCourseSelect();
  renderCurrent();
}

function populateCourseSelect() {
  const sel = document.getElementById('courseSelect');
  sel.innerHTML = '';
  state.courses.forEach((c, i) => {
    const opt = document.createElement('option');
    opt.value = i;
    opt.textContent = c.title;
    sel.appendChild(opt);
  });
  sel.value = state.currentCourseIndex;
  sel.addEventListener('change', (e) => {
    state.currentCourseIndex = Number(e.target.value);
    state.lessonIndex = 0;
    renderCurrent();
  });
}

function renderCurrent() {
  const course = state.courses[state.currentCourseIndex];
  if (!course) {
    document.getElementById('title').textContent = 'No course loaded';
    return;
  }
  const lesson = course.lessons[state.lessonIndex];
  embedYt(lesson.ytId);
  document.getElementById('title').textContent = lesson.title;
  document.getElementById('tags').textContent = course.title + ' · ' + (state.lessonIndex + 1) + '/' + course.lessons.length;
  document.getElementById('creator').textContent = lesson.creator || '';
  document.getElementById('pageIndicator').textContent = (state.lessonIndex + 1) + ' / ' + course.lessons.length;
}

function embedYt(id) {
  const reel = document.getElementById('reel');
  reel.querySelectorAll('iframe').forEach(i => i.remove());
  if (!id) return;
  const src = `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&playsinline=1&controls=0&rel=0&modestbranding=1`;
  const iframe = document.createElement('iframe');
  iframe.src = src;
  iframe.allow = "autoplay; encrypted-media; picture-in-picture";
  iframe.allowFullscreen = true;
  reel.prepend(iframe);
}

function next() {
  const course = state.courses[state.currentCourseIndex];
  state.lessonIndex = (state.lessonIndex + 1) % course.lessons.length;
  renderCurrent();
}
function prev() {
  const course = state.courses[state.currentCourseIndex];
  state.lessonIndex = (state.lessonIndex - 1 + course.lessons.length) % course.lessons.length;
  renderCurrent();
}

document.getElementById('nextBtn').addEventListener('click', next);
document.getElementById('prevBtn').addEventListener('click', prev);

// keyboard nav
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown') next();
  if (e.key === 'ArrowUp') prev();
});

// touch swipe support
let startY = null;
const reelEl = document.getElementById('reel');
reelEl.addEventListener('touchstart', (e) => startY = e.touches[0].clientY);
reelEl.addEventListener('touchend', (e) => {
  if (startY === null) return;
  const endY = e.changedTouches[0].clientY;
  const diff = startY - endY;
  if (diff > 40) next();
  else if (diff < -40) prev();
  startY = null;
});

loadData();
