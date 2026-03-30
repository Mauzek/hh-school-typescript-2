/** Допустимые форматы изображения */
export type ImageFormat = "png" | "jpeg" | "webp";

/** Смещение при захвате */
export interface DomShotOffset {
  x: number;
  y: number;
}

/** Настройки захвата скриншота. Все поля опциональные. */
export interface DomShotOptions {
  /** Масштаб (1 = 100%, 2 = 200%). По умолчанию 1 */
  scale?: number;
  /** Цвет фона. null = прозрачный. По умолчанию "#ffffff" */
  backgroundColor?: string | null;
  /** Качество JPEG/WebP (0–1). По умолчанию 0.92 */
  quality?: number;
  /** Формат изображения. По умолчанию "png" */
  format?: ImageFormat;
  /** Загружать cross-origin изображения. По умолчанию false */
  useCORS?: boolean;
  /** Ширина (по умолчанию = ширина элемента) */
  width?: number;
  /** Высота (по умолчанию = высота элемента) */
  height?: number;
  /** Смещение при захвате */
  offset?: DomShotOffset;
  /** Callback после клонирования DOM */
  onClone?: (clonedElement: HTMLElement) => void;
}

/** Интерфейс библиотеки DomShot */
export interface DomShotInstance {
  /**
   * Делает скриншот DOM-элемента и возвращает data URL картинки.
   * @param element - DOM-элемент для скриншота
   * @param options - настройки (опционально)
   * @returns Promise с data URL изображения
   */
  capture(element: HTMLElement, options?: DomShotOptions): Promise<string>;

  /**
   * Делает скриншот и сразу скачивает файл.
   * @param element - DOM-элемент
   * @param filename - имя файла (без расширения)
   * @param options - настройки (опционально)
   */
  download(
    element: HTMLElement,
    filename: string,
    options?: DomShotOptions,
  ): Promise<void>;

  /**
   * Возвращает поддерживаемые форматы в текущем браузере.
   * @returns массив поддерживаемых форматов
   */
  getSupportedFormats(): ImageFormat[];

  /** Текущая версия библиотеки */
  readonly version: string;
}

declare const DomShot: DomShotInstance;
export default DomShot;
