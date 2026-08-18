const IMG_DIR = "gallery/";

const wall = document.getElementById("wall");
const filtersEl = document.getElementById("filters");
const emptyState = document.getElementById("emptyState");
const pieceCount = document.getElementById("pieceCount");

const viewer = document.getElementById("viewer");
const viewerImg = document.getElementById("viewerImg");
const viewerIndex = document.getElementById("viewerIndex");
const viewerName = document.getElementById("viewerName");
const viewerTags = document.getElementById("viewerTags");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let items = []; // dados crus do data.json
let visible = []; // itens atualmente exibidos (após filtro)
let activeTag = null;
let currentIndex = 0;

init();

async function init() {
  try {
    const res = await fetch("data.json");
    if (!res.ok) throw new Error("data.json não encontrado");
    items = await res.json();
  } catch (err) {
    emptyState.textContent = "Não consegui carregar o data.json.";
    emptyState.hidden = false;
    console.error(err);
    return;
  }

  if (!Array.isArray(items) || items.length === 0) {
    emptyState.hidden = false;
    return;
  }

  buildFilters();
  render();
}

function allTags() {
  const set = new Set();
  items.forEach((item) => (item.tags || []).forEach((tag) => set.add(tag)));
  return [...set].sort();
}

function buildFilters() {
  const tags = allTags();
  if (tags.length === 0) return;

  const allBtn = makeFilterButton("index", null);
  allBtn.classList.add("active");
  filtersEl.appendChild(allBtn);

  tags.forEach((tag) => filtersEl.appendChild(makeFilterButton(tag, tag)));
}

function makeFilterButton(label, tagValue) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.textContent = label;
  btn.addEventListener("click", () => {
    activeTag = tagValue;
    [...filtersEl.children].forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    render();
  });
  return btn;
}

function render() {
  visible = activeTag
    ? items.filter((item) => (item.tags || []).includes(activeTag))
    : items;

  wall.innerHTML = "";
  emptyState.hidden = visible.length > 0;
  pieceCount.textContent = String(visible.length).padStart(2, "0");

  visible.forEach((item, i) => wall.appendChild(buildCard(item, i)));
}

function buildCard(item, i) {
  const card = document.createElement("button");
  card.type = "button";
  card.className = "card";
  card.setAttribute("aria-label", `Abrir ${item.file}`);

  const img = document.createElement("img");
  img.src = IMG_DIR + item.file;
  img.alt = item.file;
  img.loading = "lazy";
  card.appendChild(img);

  const index = document.createElement("span");
  index.className = "card__index";
  index.textContent = String(i + 1).padStart(2, "0");
  card.appendChild(index);

  const plate = document.createElement("div");
  plate.className = "card__plate";
  (item.tags || []).forEach((tag) => {
    const span = document.createElement("span");
    span.className = "tag";
    span.textContent = tag;
    plate.appendChild(span);
  });
  card.appendChild(plate);

  card.addEventListener("click", () => openViewer(i));

  return card;
}

/* ---------- viewer / modal ---------- */

function openViewer(index) {
  currentIndex = index;
  updateViewer();
  viewer.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeViewer() {
  viewer.hidden = true;
  document.body.style.overflow = "";
}

function updateViewer() {
  const item = visible[currentIndex];
  if (!item) return;

  viewerImg.src = IMG_DIR + item.file;
  viewerImg.alt = item.file;
  viewerIndex.textContent =
    String(currentIndex + 1).padStart(2, "0") +
    " / " +
    String(visible.length).padStart(2, "0");
  viewerName.textContent = item.file;

  viewerTags.innerHTML = "";
  (item.tags || []).forEach((tag) => {
    const span = document.createElement("span");
    span.className = "tag";
    span.textContent = tag;
    viewerTags.appendChild(span);
  });
}

function step(delta) {
  if (visible.length === 0) return;
  currentIndex = (currentIndex + delta + visible.length) % visible.length;
  updateViewer();
}

document
  .querySelectorAll("[data-close]")
  .forEach((el) => el.addEventListener("click", closeViewer));
prevBtn.addEventListener("click", () => step(-1));
nextBtn.addEventListener("click", () => step(1));

document.addEventListener("keydown", (e) => {
  if (viewer.hidden) return;
  if (e.key === "Escape") closeViewer();
  if (e.key === "ArrowLeft") step(-1);
  if (e.key === "ArrowRight") step(1);
});
