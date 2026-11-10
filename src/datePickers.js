import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

// Quest-styled calendar for every date field the chat renders (date of birth, date of service).
// The chat's own <input type="date"> stays in place, hidden, and keeps receiving the value as YYYY-MM-DD through the
// native value setter + input/change events, so the form submits exactly what it did before. A visible text field
// sits in its place: clicking anywhere in it opens the calendar, and typing MM/DD/YYYY also works.

const setNative = (el, value) => {
  Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set.call(el, value);
  el.dispatchEvent(new Event("input", { bubbles: true }));
  el.dispatchEvent(new Event("change", { bubbles: true }));
};

const labelOf = (el) => (el.closest(".rich-input-wrapper")?.querySelector(".rich-input-label")?.textContent || "").trim();

function enhance(el) {
  if (el.dataset.qdEnhanced) return;
  el.dataset.qdEnhanced = "1";
  const isBirth = /birth/i.test(labelOf(el));

  const field = document.createElement("div");
  field.className = "qd-date";
  const proxy = document.createElement("input");
  proxy.type = "text";
  proxy.className = `${el.className} qd-date__input`;
  proxy.placeholder = "MM/DD/YYYY";
  proxy.autocomplete = "off";
  proxy.inputMode = "numeric";
  proxy.setAttribute("aria-label", labelOf(el) || "Date");
  const icon = document.createElement("span");
  icon.className = "qd-date__icon";
  icon.setAttribute("aria-hidden", "true");
  field.append(proxy, icon);
  el.classList.add("qd-date-native");
  el.tabIndex = -1;
  el.setAttribute("aria-hidden", "true");
  el.insertAdjacentElement("afterend", field);

  const fp = flatpickr(proxy, {
    dateFormat: "m/d/Y",
    allowInput: true,
    disableMobile: true,
    maxDate: "today",
    monthSelectorType: "dropdown",
    defaultDate: el.value || null,
    // A birth date opens on a typical adult year instead of this month.
    ...(isBirth && !el.value ? { onOpen: (_s, _str, inst) => { if (!inst.selectedDates.length) inst.changeYear(1985); } } : {}),
    onChange: (dates, _str, inst) => setNative(el, dates[0] ? inst.formatDate(dates[0], "Y-m-d") : ""),
    onReady: (_d, _s, inst) => inst.calendarContainer.classList.add("qd-cal"),
  });
  proxy.addEventListener("click", () => fp.open());
  icon.addEventListener("click", () => { if (!proxy.disabled) fp.open(); });

  // The chat disables a form once it is submitted: mirror that on the visible field.
  const sync = () => { proxy.disabled = el.disabled; field.classList.toggle("is-disabled", el.disabled); if (el.disabled) fp.close(); };
  new MutationObserver(sync).observe(el, { attributes: true, attributeFilter: ["disabled"] });
  sync();
}

export function attachDatePickers(root) {
  const scan = () => root.querySelectorAll('input[type="date"]:not([data-qd-enhanced])').forEach(enhance);
  scan();
  const mo = new MutationObserver(scan);
  mo.observe(root, { childList: true, subtree: true });
  return () => mo.disconnect();
}
