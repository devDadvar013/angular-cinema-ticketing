import { Movie, Showtime } from '../models/movie';

export const MOVIES: Movie[] = [
  {
    id: 'm1',
    title: 'قهرمان شب',
    originalTitle: 'Night Hero',
    genres: ['اکشن', 'ماجراجویی'],
    durationMin: 128,
    ageRating: '+۱۳',
    rating: 8.1,
    synopsis:
      'در شهری که هر شب در تاریکی فرو می‌رود، یک نگهبان ساده رازی را کشف می‌کند که او را به تنها امید مردم تبدیل می‌کند. سفری پرهیجان میان تعقیب‌وگریز و خیانت، تا مرز فداکاری.',
    director: 'امیرحسین مقدم',
    cast: ['رضا کیانیان', 'نیکی کریمی', 'پارسا پیروزفر'],
    releaseYear: '۱۴۰۵',
    accentFrom: '#f5b50a',
    accentTo: '#c2410c',
    nowShowing: true,
  },
  {
    id: 'm2',
    title: 'عطر باران',
    originalTitle: 'Scent of Rain',
    genres: ['درام', 'عاشقانه'],
    durationMin: 112,
    ageRating: '+۱۲',
    rating: 7.9,
    synopsis:
      'دو هم‌سایه قدیمی پس از سال‌ها در یک روز بارانی به‌هم می‌رسند و خاطراتی که فکر می‌کردند برای همیشه دفن شده، جان دوباره می‌گیرند.',
    director: 'سارا بهرامی',
    cast: ['نیکی کریمی', 'محمدرضا گلزار', 'هدیه تهرانی'],
    releaseYear: '۱۴۰۴',
    accentFrom: '#38bdf8',
    accentTo: '#6366f1',
    nowShowing: true,
  },
  {
    id: 'm3',
    title: 'کافه ترنج',
    originalTitle: 'Toranj Café',
    genres: ['کمدی'],
    durationMin: 98,
    ageRating: '+۹',
    rating: 8.4,
    synopsis:
      'یک کافه کوچک در قلب تهران می‌خواهد تعطیل شود، اما یک شب عجیب پر از مشتری‌های غیرمنتظره همه‌چیز را زیر و رو می‌کند. کمدی‌ای گرم و پر از لحظه‌های خنده.',
    director: 'کاوه آهنگر',
    cast: ['رضا عطاران', 'پیمان قاسم‌خانی', 'سیامک انصاری'],
    releaseYear: '۱۴۰۵',
    accentFrom: '#34d399',
    accentTo: '#0d9488',
    nowShowing: true,
  },
  {
    id: 'm4',
    title: 'رویای نیمه‌شب',
    originalTitle: 'Midnight Dream',
    genres: ['فانتزی', 'ماجراجویی'],
    durationMin: 141,
    ageRating: '+۱۳',
    rating: 8.7,
    synopsis:
      'دختری جوان در نیمه‌شب دری می‌یابد که به دنیایی جادویی باز می‌شود؛ جایی که رؤیاها واقعی‌اند و بازگشت به خانه، خود بزرگ‌ترین ماجراست.',
    director: 'آرش معیریان',
    cast: ['الناز شاکردوست', 'حامد بهداد', 'گلشیفته فراهانی'],
    releaseYear: '۱۴۰۵',
    accentFrom: '#a855f7',
    accentTo: '#6d28d9',
    nowShowing: true,
  },
  {
    id: 'm5',
    title: 'بیست و چهار',
    originalTitle: 'Twenty-Four',
    genres: ['دلهره‌آور', 'جنایی'],
    durationMin: 109,
    ageRating: '+۱۶',
    rating: 7.5,
    synopsis:
      'کارآگاهی تنها ۲۴ ساعت فرصت دارد تا پیش از رخ دادن یک فاجعه، رد یک گروگان‌گیر مرموز را در خیابان‌های تهران بزند. هر دقیقه، یک انتخاب مرگبار.',
    director: 'بهرام توکلی',
    cast: ['پارسا پیروزفر', 'نوید محمدزاده', 'پانته‌آ پناهی‌ها'],
    releaseYear: '۱۴۰۴',
    accentFrom: '#f87171',
    accentTo: '#b91c1c',
    nowShowing: true,
  },
  {
    id: 'm6',
    title: 'شهر خاموش',
    originalTitle: 'The Silent City',
    genres: ['معمایی', 'درام'],
    durationMin: 122,
    ageRating: '+۱۳',
    rating: 8.0,
    synopsis:
      'در شهری که هیچ‌کس از گذشته‌اش حرف نمی‌زند، یک روزنامه‌نگار جوان برای نوشتن یک گزارش ساده، پرده از رازی بزرگ برمی‌دارد که سال‌ها خاموش نگه داشته شده بود.',
    director: 'منیر قیدی',
    cast: ['حامد بهداد', 'باران کوثری', 'پیمان معادی'],
    releaseYear: '۱۴۰۴',
    accentFrom: '#64748b',
    accentTo: '#1e293b',
    nowShowing: true,
  },
];

export const SHOWTIMES: Showtime[] = [
  // قهرمان شب
  { id: 's1', movieId: 'm1', date: '2026-08-14', time: '17:00', hall: 'سالن ۱', format: '2D', basePrice: 65000, vipPrice: 95000 },
  { id: 's2', movieId: 'm1', date: '2026-08-14', time: '21:30', hall: 'سالن ۲', format: 'IMAX', basePrice: 90000, vipPrice: 130000 },
  { id: 's3', movieId: 'm1', date: '2026-08-15', time: '18:15', hall: 'سالن ۳', format: '2D', basePrice: 65000, vipPrice: 95000 },
  { id: 's4', movieId: 'm1', date: '2026-08-16', time: '20:00', hall: 'سالن ۱', format: '3D', basePrice: 80000, vipPrice: 115000 },
  { id: 's5', movieId: 'm1', date: '2026-08-17', time: '16:30', hall: 'سالن ۴', format: '2D', basePrice: 65000, vipPrice: 95000 },

  // عطر باران
  { id: 's6', movieId: 'm2', date: '2026-08-14', time: '19:30', hall: 'سالن ۴', format: '2D', basePrice: 60000, vipPrice: 90000 },
  { id: 's7', movieId: 'm2', date: '2026-08-15', time: '21:00', hall: 'سالن ۲', format: '2D', basePrice: 60000, vipPrice: 90000 },
  { id: 's8', movieId: 'm2', date: '2026-08-16', time: '17:45', hall: 'سالن ۳', format: '2D', basePrice: 60000, vipPrice: 90000 },
  { id: 's9', movieId: 'm2', date: '2026-08-17', time: '20:15', hall: 'سالن ۱', format: '2D', basePrice: 60000, vipPrice: 90000 },

  // کافه ترنج
  { id: 's10', movieId: 'm3', date: '2026-08-14', time: '16:00', hall: 'سالن ۲', format: '2D', basePrice: 55000, vipPrice: 80000 },
  { id: 's11', movieId: 'm3', date: '2026-08-15', time: '19:00', hall: 'سالن ۱', format: '2D', basePrice: 55000, vipPrice: 80000 },
  { id: 's12', movieId: 'm3', date: '2026-08-16', time: '15:30', hall: 'سالن ۴', format: '2D', basePrice: 55000, vipPrice: 80000 },
  { id: 's13', movieId: 'm3', date: '2026-08-17', time: '18:00', hall: 'سالن ۲', format: '2D', basePrice: 55000, vipPrice: 80000 },

  // رویای نیمه‌شب
  { id: 's14', movieId: 'm4', date: '2026-08-14', time: '18:30', hall: 'سالن ۳', format: '3D', basePrice: 85000, vipPrice: 120000 },
  { id: 's15', movieId: 'm4', date: '2026-08-15', time: '22:00', hall: 'سالن ۱', format: 'IMAX', basePrice: 95000, vipPrice: 135000 },
  { id: 's16', movieId: 'm4', date: '2026-08-16', time: '19:15', hall: 'سالن ۲', format: '3D', basePrice: 85000, vipPrice: 120000 },
  { id: 's17', movieId: 'm4', date: '2026-08-17', time: '21:45', hall: 'سالن ۳', format: '4DX', basePrice: 110000, vipPrice: 150000 },

  // بیست و چهار
  { id: 's18', movieId: 'm5', date: '2026-08-14', time: '22:30', hall: 'سالن ۱', format: '2D', basePrice: 70000, vipPrice: 100000 },
  { id: 's19', movieId: 'm5', date: '2026-08-15', time: '17:30', hall: 'سالن ۴', format: '2D', basePrice: 70000, vipPrice: 100000 },
  { id: 's20', movieId: 'm5', date: '2026-08-16', time: '21:00', hall: 'سالن ۳', format: '2D', basePrice: 70000, vipPrice: 100000 },
  { id: 's21', movieId: 'm5', date: '2026-08-17', time: '22:15', hall: 'سالن ۱', format: '2D', basePrice: 70000, vipPrice: 100000 },

  // شهر خاموش
  { id: 's22', movieId: 'm6', date: '2026-08-14', time: '15:00', hall: 'سالن ۳', format: '2D', basePrice: 62000, vipPrice: 90000 },
  { id: 's23', movieId: 'm6', date: '2026-08-15', time: '20:30', hall: 'سالن ۲', format: '2D', basePrice: 62000, vipPrice: 90000 },
  { id: 's24', movieId: 'm6', date: '2026-08-16', time: '18:00', hall: 'سالن ۴', format: '2D', basePrice: 62000, vipPrice: 90000 },
  { id: 's25', movieId: 'm6', date: '2026-08-17', time: '19:45', hall: 'سالن ۲', format: '2D', basePrice: 62000, vipPrice: 90000 },
];
