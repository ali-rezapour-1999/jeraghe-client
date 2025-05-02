import { useMemo } from "react";
import moment from "jalali-moment";

export function usePersianDate(dateString: string | undefined): string {
  return useMemo(() => {
    if (!dateString) {
      return "";
    }
    try {
      const date = moment(dateString).locale("fa").format("YYYY/MM/DD");
      return date;
    } catch {
      return dateString;
    }
  }, [dateString]);
}
