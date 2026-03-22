import DomShot from "./DomShot.js";

export async function main() {
  const el = document.getElementById("app");
  if (!el) return;

  // ── capture: базовый вызов ──────────────────────────────────
  const dataUrl: string = await DomShot.capture(el);
  console.log("Data URL:", dataUrl);

  // ── capture: с полными опциями ──────────────────────────────
  const hqDataUrl = await DomShot.capture(el, {
    scale: 2,
    format: "jpeg",
    quality: 0.95,
    backgroundColor: "#f0f0f0",
    useCORS: true,
    width: 800,
    height: 600,
    offset: { x: 10, y: 20 },
    onClone: (cloned) => {
      cloned.style.border = "none";
    },
  });
  console.log("HQ:", hqDataUrl);

  // ── capture: прозрачный фон ─────────────────────────────────
  await DomShot.capture(el, { backgroundColor: null });

  // ── capture: пустые опции / без опций ───────────────────────
  await DomShot.capture(el, {}); // ✅
  await DomShot.capture(el); // ✅

  // ── Ошибки компиляции ──────

  // ❌ scale должен быть number
  // await DomShot.capture(el, { scale: "two" });

  // ❌ "bmp" не входит в ImageFormat
  // await DomShot.capture(el, { format: "bmp" });

  // ❌ первый аргумент — HTMLElement, не string
  // await DomShot.capture("not element");

  
  await DomShot.download(el, "screenshot");
  await DomShot.download(el, "photo", { format: "webp", quality: 0.8 });


  const formats = DomShot.getSupportedFormats();
  console.log("Поддерживаемые форматы:", formats);


  const ver: string = DomShot.version;
  console.log("DomShot version:", ver);
}


