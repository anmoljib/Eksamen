import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = "https://yteihuoozvmdubgatjkp.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0ZWlodW9venZtZHViZ2F0amtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1ODQ5MzQsImV4cCI6MjA5NjE2MDkzNH0.ALyTV7sNmviTNq8jPOvXgzlW0Mi1Dp3Qm-URI5VcfH8";

const supabase = createClient(supabaseUrl, supabaseKey);

const tipsList = document.getElementById("tipsListe");
const errorMsg = document.getElementById("errorMsg");

let allTips = [];

async function loadTips() {
  const { data, error } = await supabase
    .from("tips")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Feil ved henting:", error);
    errorMsg.textContent = "Kunne ikke hente tips fra databasen.";
    tipsList.innerHTML = "";
    return;
  }

  allTips = data;
  renderTips(allTips);
}

function renderTips(tips) {
  tipsList.innerHTML = "";

  if (tips.length === 0) {
    const li = document.createElement("li");
    li.textContent = "Ingen tips funnet.";
    tipsList.appendChild(li);
    return;
  }

  tips.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = "🌿 " + item.text;
    tipsList.appendChild(li);
  });
}

document.getElementById("addTipBtn").addEventListener("click", async () => {
  const text = document.getElementById("searchInput").value.trim();

  if (!text) {
    errorMsg.textContent = "Du må skrive noe før du legger til.";
    return;
  }

  const { error } = await supabase.from("tips").insert({ text });

  if (error) {
    errorMsg.textContent = "Kunne ikke legge til tipset.";
    return;
  }

  document.getElementById("searchInput").value = "";
  errorMsg.textContent = "";
  loadTips();
});
loadTips();
