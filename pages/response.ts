const urlParams = new URLSearchParams(window.location.search);
const org = urlParams.get("org") || "";
const app = urlParams.get("app") || "";

const details = (document.getElementById("details") as HTMLElement);
const organisation = (document.getElementById("organisation") as HTMLSpanElement);
const appliance = (document.getElementById("appliance") as HTMLSpanElement);

if ((org.length + app.length) === 0) {
  details.hidden = true;
}

organisation.innerText = org;
appliance.innerText = app;
