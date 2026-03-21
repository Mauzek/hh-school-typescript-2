/**
 * DomShot — утилита для создания скриншотов DOM-элементов.
 * Студенты пишут .d.ts для этого файла.
 */

const DomShot = {
  /**
   * Делает скриншот DOM-элемента и возвращает data URL картинки.
   *
   * @param {HTMLElement} element - DOM-элемент для скриншота
   * @param {Object} [options] - Настройки
   * @param {number} [options.scale=1] - Масштаб (1 = 100%, 2 = 200%)
   * @param {string|null} [options.backgroundColor="#ffffff"] - Цвет фона (null = прозрачный)
   * @param {number} [options.quality=0.92] - Качество JPEG (0-1)
   * @param {"png"|"jpeg"|"webp"} [options.format="png"] - Формат изображения
   * @param {boolean} [options.useCORS=false] - Загружать cross-origin изображения
   * @param {number} [options.width] - Ширина (по умолчанию = ширина элемента)
   * @param {number} [options.height] - Высота (по умолчанию = высота элемента)
   * @param {{x: number, y: number}} [options.offset] - Смещение
   * @param {function} [options.onClone] - Callback после клонирования DOM
   *
   * @returns {Promise<string>} data URL изображения
   */
  capture(element, options) {
    // реализация скрыта
    return Promise.resolve("data:image/png;base64,...");
  },

  /**
   * Делает скриншот и сразу скачивает файл.
   *
   * @param {HTMLElement} element - DOM-элемент
   * @param {string} filename - Имя файла (без расширения)
   * @param {Object} [options] - Те же настройки, что у capture
   *
   * @returns {Promise<void>}
   */
  download(element, filename, options) {
    // реализация скрыта
    return Promise.resolve();
  },

  /**
   * Возвращает поддерживаемые форматы в текущем браузере.
   *
   * @returns {("png"|"jpeg"|"webp")[]}
   */
  getSupportedFormats() {
    return ["png", "jpeg"];
  },

  /** Текущая версия библиотеки */
  version: "1.4.2",
};

export default DomShot;
