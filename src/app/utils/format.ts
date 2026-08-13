const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

/** تبدیل ارقام لاتین به فارسی */
export function toFa(value: number | string): string {
  return String(value).replace(/\d/g, (d) => PERSIAN_DIGITS[Number(d)]);
}

/** قیمت با جداکننده هزارگان و ارقام فارسی */
export function formatPrice(amount: number): string {
  const grouped = Math.round(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '٬');
  return toFa(grouped);
}

/** تبدیل دقیقه به «ساعت و دقیقه» */
export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) {
    return `${toFa(m)} دقیقه`;
  }
  return m === 0 ? `${toFa(h)} ساعت` : `${toFa(h)} ساعت و ${toFa(m)} دقیقه`;
}

const J_MONTHS = [
  'فروردین',
  'اردیبهشت',
  'خرداد',
  'تیر',
  'مرداد',
  'شهریور',
  'مهر',
  'آبان',
  'آذر',
  'دی',
  'بهمن',
  'اسفند',
];

const WEEKDAYS = [
  'یکشنبه',
  'دوشنبه',
  'سه‌شنبه',
  'چهارشنبه',
  'پنجشنبه',
  'جمعه',
  'شنبه',
];

/** تبدیل تاریخ میلادی ISO به تاریخ شمسی (بدون وابستگی به ICU برای پایداری SSR) */
export function toJalali(isoDate: string): { y: number; m: number; d: number; weekday: number } {
  const g = new Date(`${isoDate}T00:00:00Z`);
  let gy = g.getUTCFullYear();
  const gm = g.getUTCMonth() + 1;
  const gd = g.getUTCDate();

  const gdm = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  let jy = gy <= 1600 ? 0 : 979;
  gy -= gy <= 1600 ? 621 : 1600;
  const gy2 = gm > 2 ? gy + 1 : gy;
  let days =
    365 * gy +
    Math.floor((gy2 + 3) / 4) -
    Math.floor((gy2 + 99) / 100) +
    Math.floor((gy2 + 399) / 400) -
    80 +
    gd +
    gdm[gm - 1];
  jy += 33 * Math.floor(days / 12053);
  days %= 12053;
  jy += 4 * Math.floor(days / 1461);
  days %= 1461;
  jy += Math.floor((days - 1) / 365);
  if (days > 365) {
    days = (days - 1) % 365;
  }
  const jm = days < 186 ? 1 + Math.floor(days / 31) : 7 + Math.floor((days - 186) / 30);
  const jd = 1 + (days < 186 ? days % 31 : (days - 186) % 30);

  return { y: jy, m: jm, d: jd, weekday: g.getUTCDay() };
}

/** نمایش تاریخ شمسی: «پنجشنبه ۲۳ مرداد» */
export function formatFaDate(isoDate: string): string {
  const j = toJalali(isoDate);
  return `${WEEKDAYS[j.weekday]} ${toFa(j.d)} ${J_MONTHS[j.m - 1]}`;
}

/** نمایش ساعت با ارقام فارسی */
export function formatTime(time: string): string {
  return toFa(time);
}
