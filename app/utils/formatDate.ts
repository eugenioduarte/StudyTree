import { format } from "date-fns/format";
import type { Locale } from "date-fns/locale";
import { parseISO } from "date-fns/parseISO";
import i18n from "i18next";

type Options = Parameters<typeof format>[2];

let dateFnsLocale: Locale | undefined;

export const loadDateFnsLocale = async (): Promise<void> => {
  const primaryTag = i18n.language.split("-")[0];

  switch (primaryTag) {
    case "en":
      dateFnsLocale = (await import("date-fns/locale/en-US")).enUS;
      break;
    case "ar":
      dateFnsLocale = (await import("date-fns/locale/ar")).ar;
      break;
    case "ko":
      dateFnsLocale = (await import("date-fns/locale/ko")).ko;
      break;
    case "es":
      dateFnsLocale = (await import("date-fns/locale/es")).es;
      break;
    case "fr":
      dateFnsLocale = (await import("date-fns/locale/fr")).fr;
      break;
    case "hi":
      dateFnsLocale = (await import("date-fns/locale/hi")).hi;
      break;
    case "ja":
      dateFnsLocale = (await import("date-fns/locale/ja")).ja;
      break;
    default:
      dateFnsLocale = (await import("date-fns/locale/en-US")).enUS;
      break;
  }
};

export const formatDate = (
  date: string,
  dateFormat?: string,
  options?: Options,
) => {
  const dateOptions = {
    ...options,
    locale: dateFnsLocale,
  };
  return format(parseISO(date), dateFormat ?? "MMM dd, yyyy", dateOptions);
};
