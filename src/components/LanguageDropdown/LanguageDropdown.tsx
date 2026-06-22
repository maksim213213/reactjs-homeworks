import { useEffect, useRef, useState } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { LANGUAGES } from '../../i18n/translations';
import type { Language } from '../../i18n/translations';

const LanguageDropdown = () => {
  const { language, setLanguage, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const current = LANGUAGES.find((lang) => lang.code === language) ?? LANGUAGES[0];
  const activeIndex = LANGUAGES.findIndex((lang) => lang.code === language);

  const close = (returnFocus = false) => {
    setOpen(false);
    if (returnFocus) triggerRef.current?.focus();
  };

  // Close on outside click. Escape is handled per-element so focus can return
  // to the trigger.
  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [open]);

  // Move focus into the list (onto the active option) once it opens.
  useEffect(() => {
    if (open) {
      const index = activeIndex >= 0 ? activeIndex : 0;
      optionRefs.current[index]?.focus();
    }
  }, [open, activeIndex]);

  const handleSelect = (code: Language) => {
    setLanguage(code);
    close(true);
  };

  // Roving focus among the options so the listbox honours its ARIA contract.
  const handleOptionKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    const { key } = event;
    const last = LANGUAGES.length - 1;
    let next: number | null = null;

    if (key === 'ArrowDown') next = index === last ? 0 : index + 1;
    else if (key === 'ArrowUp') next = index === 0 ? last : index - 1;
    else if (key === 'Home') next = 0;
    else if (key === 'End') next = last;
    else if (key === 'Escape') {
      event.preventDefault();
      close(true);
      return;
    } else if (key === 'Tab') {
      setOpen(false);
      return;
    }

    if (next !== null) {
      event.preventDefault();
      optionRefs.current[next]?.focus();
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={t.header.selectLanguage}
        aria-haspopup="listbox"
        aria-expanded={open}
        title={t.header.selectLanguage}
        className="inline-flex items-center gap-1.5 p-3 rounded-lg text-gray-700 dark:text-slate-200 hover:text-primary dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-slate-800 transition focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-slate-900"
      >
        <Globe size={24} />
        <span className="text-sm font-medium uppercase">{current.code}</span>
        <ChevronDown
          size={16}
          className={`transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={t.header.selectLanguage}
          aria-activedescendant={`lang-option-${language}`}
          className="absolute right-0 z-20 mt-2 w-48 overflow-hidden rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 py-1 shadow-lg"
        >
          {LANGUAGES.map((lang, index) => {
            const isActive = lang.code === language;
            return (
              <li key={lang.code} role="option" aria-selected={isActive}>
                <button
                  id={`lang-option-${lang.code}`}
                  ref={(el) => {
                    optionRefs.current[index] = el;
                  }}
                  type="button"
                  onClick={() => handleSelect(lang.code)}
                  onKeyDown={(event) => handleOptionKeyDown(event, index)}
                  className={`flex w-full items-center justify-between gap-3 px-4 py-2 text-left text-sm transition hover:bg-gray-100 dark:hover:bg-slate-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-slate-800 ${
                    isActive
                      ? 'text-primary font-medium'
                      : 'text-gray-700 dark:text-slate-300'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span aria-hidden="true">{lang.flag}</span>
                    {lang.label}
                  </span>
                  {isActive && <Check size={16} />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default LanguageDropdown;
