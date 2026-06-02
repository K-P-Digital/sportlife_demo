import { useEffect, useMemo, useState, type ReactNode } from "react";
import type { ScreenProps } from "../../shared/lib/navigation";
import {
  AppCanvas,
  Card,
  Chip,
  Icon,
  IconButton,
  PrimaryButton,
  SectionTitle,
  TabScreen,
  TransactionHeader
} from "../../shared/ui";
import { images } from "../../shared/data/content";
import { routes } from "../../shared/lib/routes";

type StudioSlot = {
  time: string;
  seats: number;
  label: string;
  type: "full" | "default" | "selected" | "discount";
  badge?: string;
};

type StudioDay = {
  key: string;
  day: string;
  date: string;
  disabled?: boolean;
};

type ReservationItem = {
  id: string;
  period: string;
  studio: string;
  detail: string;
  payment: string;
  highlighted?: boolean;
};

const studioSlots: StudioSlot[] = [
  { time: "07:00", seats: 0, label: "Dolu", type: "full" },
  { time: "09:00", seats: 3, label: "3 yer", type: "default" },
  { time: "10:30", seats: 5, label: "5 yer", type: "selected" },
  { time: "12:00", seats: 8, label: "8 yer", type: "discount", badge: "-15%" },
  { time: "18:00", seats: 0, label: "Dolu", type: "full" },
  { time: "19:30", seats: 2, label: "2 yer", type: "default" }
];

const studioDays: StudioDay[] = [
  { key: "mon-24", day: "Pt", date: "24", disabled: true },
  { key: "tue-25", day: "Sa", date: "25", disabled: true },
  { key: "wed-26", day: "Pz", date: "26" },
  { key: "thu-27", day: "Çr", date: "27" },
  { key: "fri-28", day: "Pe", date: "28" },
  { key: "sat-29", day: "Cu", date: "29" }
];

const paymentOptions = [
  {
    id: "credits",
    title: "Kredi Kullan",
    subtitle: "12 kredinin 2'si harcanır",
    value: "2 kredi",
    meta: "= ₺260 değer",
    badge: "%42 tasarruf",
    icon: "generating_tokens"
  },
  {
    id: "card",
    title: "Tek Giriş Öde",
    subtitle: "Visa •••• 4242 ile tek çekim",
    value: "₺320",
    meta: "İptal hakkı dahil",
    badge: "Anında onay",
    icon: "credit_card"
  }
] as const;

const reservationSections: Record<"upcoming" | "past", ReservationItem[]> = {
  upcoming: [
    {
      id: "zen-today",
      period: "BUGÜN · 10:30",
      studio: "Zen Studio Kadıköy",
      detail: "Mat Yoga · 60 dakika · Eğitmen Selin K.",
      payment: "Tek Giriş · ₺320 ödendi",
      highlighted: true
    },
    {
      id: "form-thu",
      period: "PERŞEMBE · 19:30",
      studio: "Form Gym Bağdat",
      detail: "Fitness Grup Ders · 45 dk",
      payment: "1 kredi kullanıldı"
    },
    {
      id: "pilates-next",
      period: "SALI · 09:00",
      studio: "Pilates Studio Moda",
      detail: "Reformer · 55 dk",
      payment: "3 kredi"
    }
  ],
  past: [
    {
      id: "ride-last",
      period: "GEÇEN CUMA · 18:00",
      studio: "Ride Club Etiler",
      detail: "Spinning · 50 dk",
      payment: "2 kredi kullanıldı"
    },
    {
      id: "box-last",
      period: "GEÇEN SALI · 20:00",
      studio: "North Box",
      detail: "Boxing Conditioning · 45 dk",
      payment: "₺280 ödendi"
    }
  ]
};

const activityFilters = [
  { id: "fitness", label: "Fitness", icon: "fitness_center" },
  { id: "swimming", label: "Yüzme", icon: "pool" },
  { id: "tennis", label: "Tenis", icon: "sports_tennis" },
  { id: "running", label: "Koşu", icon: "directions_run" }
] as const;

const timeFilters = ["Sabah 06–12", "Öğlen 12–17", "Akşam 17–21", "Gece 21+"] as const;
const sortOptions = ["En Yakın", "En Yüksek Puan", "En Az Kredi", "En Çok Rezervasyon"] as const;

function StickyFooter({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`fixed bottom-0 left-1/2 z-40 w-full max-w-[430px] -translate-x-1/2 border-t border-white/10 bg-sport-bg/95 p-4 backdrop-blur-xl ${className}`}
    >
      {children}
    </div>
  );
}

export function StudioDetailScreen({ navigate }: ScreenProps) {
  return (
    <AppCanvas className="pb-32">
      <header className="fixed left-1/2 top-0 z-50 flex h-16 w-full max-w-[430px] -translate-x-1/2 items-center justify-between px-4">
        <IconButton icon="arrow_back" label="Geri" onClick={() => navigate(routes.discover)} className="bg-sport-panel/85 backdrop-blur-md" />
        <div className="flex gap-2">
          <IconButton icon="favorite_border" label="Favorilere ekle" className="bg-sport-panel/85 backdrop-blur-md" />
          <IconButton icon="share" label="Paylaş" className="bg-sport-panel/85 backdrop-blur-md" />
        </div>
      </header>

      <section className="relative h-[280px] w-full">
        <img src={images.studio} alt="Zen Studio Kadıköy" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-sport-bg via-sport-bg/20 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-sport-bg/40 to-transparent" />
        <div className="absolute bottom-4 left-5">
          <span className="inline-flex items-center rounded-full border border-sport-lime bg-sport-lime/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-sport-lime">
            Yoga · Grup Ders
          </span>
        </div>
      </section>

      <main className="px-5 pb-10">
        <div className="mt-4 space-y-2">
          <h1 className="font-epilogue text-[30px] font-extrabold leading-tight text-white">Zen Studio Kadıköy</h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-sport-muted">
            <div className="flex items-center gap-1 text-sport-lime">
              <Icon name="star" fill className="text-[16px]" />
              <span className="font-bold">4.9</span>
            </div>
            <span>(87 yorum)</span>
            <span className="h-1 w-1 rounded-full bg-sport-muted/50" />
            <span>0.8 km</span>
            <span className="h-1 w-1 rounded-full bg-sport-muted/50" />
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-sport-lime" />
              <span>Açık</span>
            </div>
          </div>
        </div>

        <Card className="mt-8 grid grid-cols-3 gap-2 p-4">
          {[
            { value: "87", label: "Yorum" },
            { value: "4.9", label: "Puan" },
            { value: "12", label: "Ders/Hafta" }
          ].map((item, index) => (
            <div key={item.label} className={`flex flex-col items-center gap-1 ${index === 1 ? "border-x border-white/5" : ""}`}>
              <span className="font-epilogue text-[24px] font-bold text-white">{item.value}</span>
              <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-sport-muted">{item.label}</span>
            </div>
          ))}
        </Card>

        <section className="mt-8">
          <SectionTitle title="Hakkında" />
          <p className="mt-4 text-sm leading-6 text-sport-muted">
            İstanbul&apos;un kalbinde, Moda&apos;da. Mat yoga, reformer pilates, prenatal ve restoratif yoga. Her seviyeye uygun ders
            programı ve sakin bir stüdyo akışı.
          </p>
          <button type="button" className="mt-2 text-sm font-bold text-sport-lime">
            Devamını oku
          </button>
        </section>

        <section className="mt-8">
          <SectionTitle title="Olanaklar" />
          <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
            {[
              { icon: "shower", label: "Duş" },
              { icon: "lock", label: "Dolap" },
              { icon: "local_parking", label: "Otopark" },
              { icon: "checkroom", label: "Mat" }
            ].map((item) => (
              <Card key={item.label} className="flex shrink-0 items-center gap-2 px-4 py-3">
                <Icon name={item.icon} className="text-[18px] text-sport-lime" />
                <span className="text-[13px] font-semibold text-white">{item.label}</span>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <div className="flex items-end justify-between">
            <SectionTitle title="Bugün Müsait" />
            <button type="button" className="text-sm text-sport-muted">
              Tümünü gör
            </button>
          </div>
          <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
            {studioSlots.slice(1, 5).map((slot) => (
              <Card
                key={slot.time}
                className={`relative flex w-32 shrink-0 flex-col gap-2 p-3 ${
                  slot.type === "discount" ? "border border-dashed border-sport-lime bg-sport-lime/5" : ""
                }`}
              >
                {slot.badge ? <span className="absolute right-2 top-2 text-[10px] font-bold text-sport-lime">{slot.badge}</span> : null}
                <span className="text-[16px] font-bold text-white">{slot.time}</span>
                <span className={`text-[11px] font-semibold ${slot.type === "discount" ? "text-sport-lime" : "text-sport-muted"}`}>{slot.label}</span>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <SectionTitle title="Değerlendirmeler" />
          <div className="mt-4 space-y-3">
            {[
              { initials: "AY", text: "Selin'in dersleri inanılmaz. Stüdyo tertemiz ve ekipmanlar çok yeni.", rating: 5 },
              { initials: "MK", text: "Güzel bir deneyimdi, ancak akşam saatlerinde duşlar biraz kalabalık oluyor.", rating: 4 }
            ].map((review) => (
              <Card key={review.initials} className="p-4">
                <div className="mb-2 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sport-elevated text-sm font-bold text-white">
                    {review.initials}
                  </div>
                  <div className="flex text-sport-lime">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Icon key={index} name="star" fill={index < review.rating} className={`text-[16px] ${index < review.rating ? "text-sport-lime" : "text-sport-muted"}`} />
                    ))}
                  </div>
                </div>
                <p className="text-sm leading-6 text-sport-muted">{review.text}</p>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <StickyFooter className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="text-lg font-bold text-sport-lime">2 kredi</div>
          <div className="text-sm text-sport-muted">tek girişle ₺320</div>
        </div>
        <PrimaryButton className="h-[52px] w-auto shrink-0 px-6" onClick={() => navigate(routes.slots)}>
          Rezerve Et
          <Icon name="arrow_forward" className="text-[18px]" />
        </PrimaryButton>
      </StickyFooter>
    </AppCanvas>
  );
}

export function SlotSelectionScreen({ navigate }: ScreenProps) {
  const [selectedDay, setSelectedDay] = useState(studioDays[2].key);
  const [selectedTime, setSelectedTime] = useState("10:30");

  const selectedSlot = studioSlots.find((slot) => slot.time === selectedTime) ?? studioSlots[2];

  return (
    <AppCanvas className="pb-32">
      <header className="sticky top-0 z-40 flex items-center gap-3.5 border-b border-white/5 bg-sport-bg px-5 py-3.5">
        <button
          type="button"
          onClick={() => navigate(routes.studio)}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sport-panel"
        >
          <Icon name="chevron_left" className="text-[18px]" />
        </button>
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-[14px] font-semibold text-white">Zen Studio Kadıköy</h1>
          <p className="text-[11px] text-sport-muted">Yoga · Kadıköy</p>
        </div>
        <div className="h-11 w-11 overflow-hidden rounded-xl">
          <img src={images.slotStudio} alt="Zen Studio Kadıköy" className="h-full w-full object-cover" />
        </div>
      </header>

      <section className="mt-5 overflow-x-auto px-5">
        <div className="flex gap-1">
          {studioDays.map((day) => {
            const active = day.key === selectedDay;
            return (
              <button
                key={day.key}
                type="button"
                disabled={day.disabled}
                onClick={() => setSelectedDay(day.key)}
                className={`flex w-14 shrink-0 flex-col items-center gap-1.5 py-2 ${
                  day.disabled ? "pointer-events-none opacity-30" : ""
                }`}
              >
                <span className={`text-[10px] font-medium tracking-[0.04em] ${active ? "text-sport-lime" : "text-sport-muted"}`}>{day.day}</span>
                <div className={`flex h-10 w-10 items-center justify-center ${active ? "rounded-full bg-sport-lime shadow-[0_0_16px_rgba(212,255,79,0.3)]" : ""}`}>
                  <span className={`text-[16px] font-semibold ${active ? "text-sport-bg" : "text-white"}`}>{day.date}</span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="mt-7 px-5">
        <div className="flex items-center justify-between">
          <h2 className="text-[10px] font-semibold uppercase tracking-[0.1em] text-sport-muted">Pazartesi, 26 Nisan</h2>
          <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-sport-lime">6 slot</span>
        </div>
        <div className="mt-3.5 grid grid-cols-3 gap-2.5">
          {studioSlots.map((slot) => {
            const disabled = slot.type === "full";
            const active = slot.time === selectedTime;
            return (
              <button
                key={slot.time}
                type="button"
                disabled={disabled}
                onClick={() => setSelectedTime(slot.time)}
                className={`relative min-h-[64px] rounded-[14px] p-3 ${
                  disabled
                    ? "cursor-not-allowed border border-[#1f1f1f] bg-black/40 opacity-50"
                    : active
                      ? "bg-sport-lime shadow-[0_0_16px_rgba(212,255,79,0.25)]"
                      : slot.type === "discount"
                        ? "overflow-hidden border border-dashed border-sport-lime/40 bg-sport-panel"
                        : "border border-white/5 bg-sport-panel"
                }`}
              >
                {slot.badge ? (
                  <div className="absolute right-0 top-0 rounded-bl-md bg-sport-lime/15 px-1.5 py-0.5 text-[9px] font-bold text-sport-lime">
                    {slot.badge}
                  </div>
                ) : null}
                <div className="flex h-full flex-col items-center justify-center gap-1">
                  <span className={`text-[14px] ${active ? "font-extrabold text-sport-bg" : disabled ? "text-[#4a4a4a]" : "font-bold text-white"}`}>
                    {slot.time}
                  </span>
                  <span className={`text-[10px] ${active ? "font-bold uppercase tracking-[0.06em] text-sport-bg" : disabled ? "text-[#4a4a4a]" : "text-sport-muted"}`}>
                    {active ? "Seçildi" : slot.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="mt-6 px-5">
        <Card className="border border-sport-lime/30 bg-[#1f1f1f] p-[18px] shadow-[0_0_24px_rgba(212,255,79,0.1)]">
          <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-sport-lime">Seçilen Slot</span>
          <h3 className="mt-1.5 text-[18px] font-bold tracking-tight text-white">{selectedSlot.time} — Mat Yoga</h3>
          <p className="mt-1.5 text-[12px] text-[#b8b8b8]">60 dakika · Eğitmen Selin K. · {selectedSlot.seats || 0} yer kaldı</p>
        </Card>
      </section>

      <section className="mt-7 px-5">
        <SectionTitle title="Bilmeniz Gerekenler" />
        <div className="mt-3 space-y-3">
          {[
            "Dersten 10 dakika önce stüdyoda ol.",
            "Mat ve blok stüdyoda hazır.",
            "İptal ücretsiz sınırı: başlangıçtan 1 saat önce."
          ].map((item) => (
            <Card key={item} className="flex items-start gap-3 p-4">
              <Icon name="check_circle" className="mt-0.5 text-[18px] text-sport-lime" />
              <p className="text-sm text-sport-muted">{item}</p>
            </Card>
          ))}
        </div>
      </section>

      <StickyFooter>
        <PrimaryButton onClick={() => navigate(routes.bookingSummary)}>
          Devam Et
          <Icon name="arrow_forward" className="text-[18px]" />
        </PrimaryButton>
      </StickyFooter>
    </AppCanvas>
  );
}

export function BookingSummaryScreen({ navigate }: ScreenProps) {
  const [paymentMethod, setPaymentMethod] = useState<(typeof paymentOptions)[number]["id"]>("credits");

  const activePayment = paymentOptions.find((option) => option.id === paymentMethod) ?? paymentOptions[0];

  return (
    <AppCanvas className="pb-32">
      <TransactionHeader title="Özet" onBack={() => navigate(routes.slots)} />
      <main className="space-y-4 px-4 pt-20">
        <Card className="p-5">
          <div className="mb-6 flex items-start justify-between gap-3">
            <h2 className="text-lg font-semibold text-white">Zen Studio Kadıköy</h2>
            <span className="rounded-full bg-sport-lime px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-sport-bg">Yoga</span>
          </div>
          <div className="space-y-5">
            {[
              { icon: "calendar_month", title: "Pazartesi, 26 Nisan", text: "10:30 – 11:30 · 60 dakika" },
              { icon: "location_on", title: "Zen Studio Kadıköy", text: "Moda Cad. No:12, Kadıköy" },
              { icon: "person", title: "Selin Karadeniz", text: "★ 4.9 · 340 ders" }
            ].map((row) => (
              <div key={row.icon} className="flex gap-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sport-bg">
                  <Icon name={row.icon} className="text-[18px] text-sport-lime" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{row.title}</p>
                  <p className="mt-1 text-xs text-sport-muted">{row.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <section>
          <h3 className="mb-2 px-1 text-xs font-semibold uppercase tracking-[0.12em] text-sport-muted">Ödeme</h3>
          <div className="space-y-3">
            {paymentOptions.map((option) => {
              const active = option.id === paymentMethod;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setPaymentMethod(option.id)}
                  className={`w-full rounded-2xl border p-4 text-left transition-colors ${
                    active ? "border-sport-lime bg-sport-lime/5 shadow-[0_0_24px_rgba(212,255,79,0.12)]" : "border-white/5 bg-sport-panel"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex gap-3">
                      <div className={`flex h-11 w-11 items-center justify-center rounded-full ${active ? "bg-sport-lime/20" : "bg-sport-bg"}`}>
                        <Icon name={option.icon} className={`text-[20px] ${active ? "text-sport-lime" : "text-sport-muted"}`} />
                      </div>
                      <div>
                        <div className="text-[16px] font-bold text-white">{option.title}</div>
                        <div className="mt-0.5 text-[12px] text-[#b8b8b8]">{option.subtitle}</div>
                      </div>
                    </div>
                    <div className={`flex h-6 w-6 items-center justify-center rounded-full border ${active ? "border-sport-lime bg-sport-lime" : "border-white/10"}`}>
                      {active ? <Icon name="check" className="text-[14px] text-sport-bg" /> : null}
                    </div>
                  </div>
                  <div className="mt-4 flex items-end justify-between gap-3">
                    <div>
                      <div className={`text-[22px] font-extrabold ${active ? "text-sport-lime" : "text-white"}`}>{option.value}</div>
                      <div className="mt-0.5 text-[11px] text-sport-muted">{option.meta}</div>
                    </div>
                    <div className={`rounded-[10px] px-3.5 py-1.5 text-[11px] font-bold ${active ? "bg-sport-lime text-sport-bg" : "bg-sport-bg text-sport-muted"}`}>
                      {option.badge}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <Card className="flex items-center justify-between rounded-xl border border-dashed border-white/10 bg-[#1f1f1f] p-3">
          <p className="text-xs text-white">Active paket alsan ₺260 olurdu.</p>
          <button type="button" className="text-xs font-medium text-sport-lime">
            ₺60 tasarruf
          </button>
        </Card>

        <section>
          <h3 className="mb-2 px-1 text-xs font-semibold uppercase tracking-[0.12em] text-sport-muted">Fatura</h3>
          <Card className="space-y-3 p-4">
            {[
              ["Ders ücreti", paymentMethod === "credits" ? "2 kredi" : "₺320"],
              ["KDV", "Dahil"],
              ["İşlem ücreti", "₺0"]
            ].map(([label, value], index) => (
              <div key={label} className={`flex items-center justify-between text-sm ${index === 2 ? "border-b border-white/10 pb-3" : ""}`}>
                <span className="text-sport-muted">{label}</span>
                <span className="font-medium text-white">{value}</span>
              </div>
            ))}
            <div className="flex items-end justify-between pt-1">
              <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-sport-muted">Toplam</span>
              <span className="text-2xl font-extrabold text-white">{paymentMethod === "credits" ? "2 kredi" : "₺320"}</span>
            </div>
          </Card>
        </section>

        <section className="px-1 pb-6 pt-2">
          <h4 className="mb-1 text-xs font-semibold text-white">İptal Politikası</h4>
          <p className="text-[11px] text-sport-muted">1 saat öncesine kadar ücretsiz iptal. Bu ay 2 trafik affı hakkın var.</p>
        </section>
      </main>

      <StickyFooter>
        <PrimaryButton onClick={() => navigate(routes.bookingConfirmed)}>
          {activePayment.id === "credits" ? "2 Kredi ile Onayla" : "₺320 Öde ve Onayla"}
          <Icon name="arrow_forward" className="text-[18px]" />
        </PrimaryButton>
        <button type="button" className="mt-3 block w-full text-center text-xs font-medium text-sport-muted" onClick={() => navigate(routes.slots)}>
          Vazgeç
        </button>
      </StickyFooter>
    </AppCanvas>
  );
}

export function BookingConfirmedScreen({ navigate }: ScreenProps) {
  return (
    <AppCanvas className="flex flex-col items-center px-5 pb-10 pt-[100px]">
      <div className="flex w-full flex-col items-center">
        <div className="flex h-[88px] w-[88px] items-center justify-center rounded-full border-[2.5px] border-sport-lime shadow-[0_0_60px_rgba(212,255,79,0.2)]">
          <Icon name="check" className="text-[36px] text-sport-lime" />
        </div>
        <p className="mt-7 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-sport-lime">Rezervasyon Onaylandı</p>
        <h1 className="mt-3 text-center font-epilogue text-[28px] font-extrabold leading-tight text-white">Zen Studio Kadıköy</h1>
        <p className="mt-2 text-center text-[14px] font-medium text-[#b8b8b8]">Pazartesi, 26 Nisan · 10:30</p>
        <div className="mt-[18px] h-[1.5px] w-14 rounded-full bg-sport-lime" />
      </div>

      <Card className="relative mt-7 w-full overflow-hidden rounded-[20px] border border-sport-lime p-[22px] shadow-[0_0_32px_rgba(212,255,79,0.12)]">
        {[
          ["Aktivite", "Mat Yoga"],
          ["Süre", "60 dakika"],
          ["Eğitmen", "Selin K."],
          ["Ödenen", "2 kredi (₺260)"]
        ].map(([label, value]) => (
          <div key={label} className="mb-3 flex items-center justify-between last:mb-0">
            <span className="text-[12px] font-medium text-sport-muted">{label}</span>
            <span className={`text-[14px] font-semibold ${label === "Ödenen" ? "text-sport-lime" : "text-white"}`}>{value}</span>
          </div>
        ))}
        <div className="relative my-[18px] border-t border-dashed border-white/15">
          <div className="absolute -left-2 top-1/2 h-4 w-2 -translate-y-1/2 rounded-r-2xl bg-sport-bg" />
          <div className="absolute -right-2 top-1/2 h-4 w-2 -translate-y-1/2 rounded-l-2xl bg-sport-bg" />
        </div>
        <div className="mt-2 flex flex-col items-center justify-center">
          <Icon name="qr_code_2" className="text-[36px] text-sport-lime" />
          <p className="mt-2 text-center text-[10px] text-sport-muted">QR kodu rezervasyonlarımda.</p>
        </div>
      </Card>

      <button type="button" className="mt-4 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl border border-white/5 bg-sport-panel">
        <Icon name="calendar_month" className="text-[18px] text-sport-lime" />
        <span className="text-[13px] font-semibold text-white">Takvime Ekle</span>
      </button>

      <div className="mt-6 flex w-full flex-col gap-4">
        <PrimaryButton onClick={() => navigate(routes.reservations)}>
          Rezervasyonlarıma Git
          <Icon name="arrow_forward" className="text-[18px]" />
        </PrimaryButton>
        <button type="button" className="py-2 text-center text-[13px] font-semibold text-sport-muted" onClick={() => navigate(routes.home)}>
          Ana Sayfaya Dön
        </button>
      </div>
    </AppCanvas>
  );
}

export function ReservationsScreen({ navigate }: ScreenProps) {
  const [segment, setSegment] = useState<"upcoming" | "past">("upcoming");
  const [cancelled, setCancelled] = useState<string[]>([]);

  const visibleReservations = useMemo(
    () => reservationSections[segment].filter((item) => !cancelled.includes(item.id)),
    [cancelled, segment]
  );

  return (
    <TabScreen active={routes.profile} navigate={navigate} className="pb-28">
      <TransactionHeader title="Rezervasyonlarım" onBack={() => navigate(routes.profile)} />
      <main className="px-5 pt-20">
        <div className="rounded-[14px] border border-white/5 bg-sport-panel p-1">
          <div className="flex">
            {[
              ["upcoming", "Yaklaşan"],
              ["past", "Geçmiş"]
            ].map(([key, label]) => {
              const active = segment === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSegment(key as "upcoming" | "past")}
                  className={`flex-1 rounded-[10px] py-[6px] text-[13px] font-bold transition-colors ${
                    active ? "bg-sport-lime text-sport-bg shadow-[0_0_8px_rgba(212,255,79,0.2)]" : "text-sport-muted"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-sport-muted">
            {segment === "upcoming" ? "Bu Hafta" : "Geçmiş Dersler"}
          </h2>

          <div className="space-y-4">
            {visibleReservations.length ? (
              visibleReservations.map((item) => (
                <Card
                  key={item.id}
                  className={`relative overflow-hidden rounded-[18px] p-4 ${item.highlighted ? "border border-sport-lime/40 bg-[#1f1f1f]" : ""}`}
                >
                  {item.highlighted ? <div className="absolute inset-y-0 left-0 w-1 bg-sport-lime" /> : null}
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      {item.highlighted ? <span className="h-2 w-2 rounded-full bg-sport-lime" /> : null}
                      <span className={`text-xs font-bold tracking-wide ${item.highlighted ? "text-sport-lime" : "text-sport-muted"}`}>{item.period}</span>
                    </div>
                    {item.highlighted && segment === "upcoming" ? (
                      <button type="button" className="flex items-center gap-1 text-xs font-semibold text-sport-lime" onClick={() => navigate(routes.qr)}>
                        QR Kodu
                        <Icon name="arrow_forward" className="text-[14px]" />
                      </button>
                    ) : null}
                  </div>
                  <div className="mb-4">
                    <h3 className="mb-1 text-[16px] font-bold text-white">{item.studio}</h3>
                    <p className="text-[12px] text-[#b8b8b8]">{item.detail}</p>
                  </div>
                  <div className="flex items-center justify-between gap-3 border-t border-white/5 pt-3">
                    <div className="rounded-full border border-sport-lime/20 bg-sport-lime/10 px-3 py-1.5">
                      <span className="text-[11px] font-semibold text-sport-lime">{item.payment}</span>
                    </div>
                    {segment === "upcoming" ? (
                      <button type="button" className="text-[12px] font-semibold text-[#ff6b6b]" onClick={() => setCancelled((curr) => [...curr, item.id])}>
                        İptal Et
                      </button>
                    ) : null}
                  </div>
                </Card>
              ))
            ) : (
              <Card className="p-5 text-center">
                <p className="text-sm text-sport-muted">{segment === "upcoming" ? "Aktif rezervasyon görünmüyor." : "Geçmiş rezervasyon bulunamadı."}</p>
              </Card>
            )}
          </div>
        </div>
      </main>
    </TabScreen>
  );
}

export function QrEntryScreen({ navigate }: ScreenProps) {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (!isClosing) return;
    const timer = window.setTimeout(() => navigate(routes.reservations), 180);
    return () => window.clearTimeout(timer);
  }, [isClosing, navigate]);

  return (
    <AppCanvas className={`transition-opacity duration-150 ${isClosing ? "opacity-0" : "opacity-100"}`}>
      <style>{`@keyframes scan { 0% { transform: translateY(0); opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { transform: translateY(220px); opacity: 0; } }`}</style>
      <div className="min-h-screen px-4 pb-8">
        <header className="flex h-16 items-center justify-between">
          <button type="button" onClick={() => setIsClosing(true)} className="flex h-9 w-9 items-center justify-center rounded-full bg-sport-panel">
            <Icon name="close" className="text-[20px] text-white" />
          </button>
          <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-white">Giriş Kodu</div>
          <div className="flex items-center gap-1.5 rounded-full bg-sport-panel px-2.5 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-sport-lime" />
            <span className="text-[10px] font-bold uppercase text-sport-lime">Canlı</span>
          </div>
        </header>

        <main className="flex min-h-[calc(100vh-4rem)] flex-col pt-4">
          <Card className="mb-8 flex items-center gap-3 p-3">
            <div className="h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-sport-elevated">
              <img src={images.slotStudio} alt="Zen Studio Kadıköy" className="h-full w-full object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="truncate text-[15px] font-semibold text-white">Zen Studio Kadıköy</h2>
              <p className="mt-0.5 text-[11px] font-medium text-sport-muted">Bugün · 10:30 · Mat Yoga</p>
            </div>
            <div className="shrink-0 rounded-[4px] bg-sport-lime px-2 py-1 text-[9px] font-bold uppercase text-sport-bg">Yoga</div>
          </Card>

          <div className="mb-8 flex flex-col items-center">
            <div className="relative mb-6 rounded-[24px] border-2 border-sport-lime/30 bg-white p-6 shadow-[0_0_60px_rgba(212,255,79,0.2)]">
              <img src={images.qr} alt="QR giriş kodu" className="h-[220px] w-[220px] mix-blend-multiply" />
              <div className="pointer-events-none absolute inset-x-6 top-6 bottom-6 overflow-hidden rounded-lg">
                <div className="h-0.5 w-full animate-[scan_2s_ease-in-out_infinite] bg-sport-lime shadow-[0_0_8px_#D4FF4F]" />
              </div>
            </div>
            <div className="text-center">
              <div className="mb-1.5 flex items-center justify-center gap-1 text-[11px] font-bold uppercase tracking-[0.18em] text-sport-lime">
                <Icon name="qr_code_scanner" className="text-[14px]" />
                Taratın
              </div>
              <div className="text-[13px] font-medium text-[#b8b8b8]">Giriş otomatik kaydedilir</div>
            </div>
          </div>

          <div className="mb-8 grid grid-cols-2 gap-3">
            <Card className="flex flex-col items-center justify-center border border-white/10 p-4">
              <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-sport-muted">Kalan Süre</div>
              <div className="text-[38px] font-extrabold tracking-tight text-white">1:58</div>
            </Card>
            <Card className="flex flex-col items-center justify-center border border-white/10 p-4">
              <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-sport-muted">Kalan Kredi</div>
              <div className="flex items-baseline gap-1">
                <div className="text-[38px] font-extrabold tracking-tight text-sport-lime">10</div>
                <div className="text-[12px] font-medium text-sport-muted">kredi</div>
              </div>
            </Card>
          </div>

          <div className="mt-auto border-t border-white/10 px-6 pt-4 text-center">
            <p className="text-[12px] leading-6 text-sport-muted">QR kodu stüdyo girişindeki tarayıcıya göster. Doğrulama otomatik gerçekleşir.</p>
          </div>
        </main>
      </div>
    </AppCanvas>
  );
}

export function FilterScreen({ navigate }: ScreenProps) {
  const [selectedActivities, setSelectedActivities] = useState<string[]>(["swimming"]);
  const [selectedTime, setSelectedTime] = useState<string>("Sabah 06–12");
  const [sortBy, setSortBy] = useState<string>("En Yakın");

  const toggleActivity = (id: string) => {
    setSelectedActivities((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  };

  const clearFilters = () => {
    setSelectedActivities([]);
    setSelectedTime("");
    setSortBy("En Yakın");
  };

  return (
    <AppCanvas>
      <div className="fixed inset-0 bg-black/70" onClick={() => navigate(routes.discover)} />
      <div className="fixed bottom-0 left-1/2 z-50 flex max-h-[88%] w-full max-w-[430px] -translate-x-1/2 flex-col overflow-hidden rounded-t-[24px] bg-[#141414] shadow-2xl">
        <div className="flex justify-center pb-4 pt-2">
          <div className="h-1 w-9 rounded-full bg-[#333333]" />
        </div>

        <div className="flex items-center justify-between border-b border-[#262626] px-4 pb-4">
          <h2 className="text-[17px] font-bold text-[#f0f0f0]">FİLTRELE</h2>
          <button type="button" onClick={clearFilters} className="text-[13px] font-semibold text-sport-lime">
            Temizle
          </button>
        </div>

        <div className="flex-1 space-y-8 overflow-y-auto p-4 pb-24">
          <section>
            <h3 className="mb-3 text-[10px] font-bold uppercase tracking-[0.1em] text-[#888888]">Aktivite Türü</h3>
            <div className="grid grid-cols-2 gap-[10px]">
              {activityFilters.map((item) => {
                const active = selectedActivities.includes(item.id);
                return (
                  <Chip key={item.id} label={item.label} icon={item.icon} active={active} onClick={() => toggleActivity(item.id)} />
                );
              })}
            </div>
          </section>

          <section>
            <h3 className="mb-3 text-[10px] font-bold uppercase tracking-[0.1em] text-[#888888]">Hızlı Seçimler</h3>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {["Kadıköy", "0–3 km", "4★ ve üzeri", "Açık Şimdi"].map((label) => (
                <Chip key={label} label={label} active={label === "0–3 km"} />
              ))}
            </div>
          </section>

          <section>
            <h3 className="mb-3 text-[10px] font-bold uppercase tracking-[0.1em] text-[#888888]">Saat Dilimi</h3>
            <div className="flex gap-[10px] overflow-x-auto pb-2">
              {timeFilters.map((label) => (
                <Chip key={label} label={label} active={selectedTime === label} onClick={() => setSelectedTime(label)} />
              ))}
            </div>
          </section>

          <section>
            <h3 className="mb-3 text-[10px] font-bold uppercase tracking-[0.1em] text-[#888888]">Minimum Puan</h3>
            <div className="flex items-center gap-3">
              <div className="flex text-sport-lime">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Icon key={index} name="star" fill={index < 4} className={`text-[28px] ${index < 4 ? "text-sport-lime" : "text-[#2a2a2a]"}`} />
                ))}
              </div>
              <span className="text-sm font-medium text-[#f0f0f0]">4★ ve üzeri</span>
            </div>
          </section>

          <section>
            <h3 className="mb-3 text-[10px] font-bold uppercase tracking-[0.1em] text-[#888888]">Sıralama</h3>
            <div className="space-y-4">
              {sortOptions.map((option) => {
                const active = option === sortBy;
                return (
                  <button key={option} type="button" onClick={() => setSortBy(option)} className="flex w-full items-center justify-between text-left">
                    <span className={`text-sm font-medium ${active ? "text-white" : "text-[#888888]"}`}>{option}</span>
                    <span className={`flex h-5 w-5 items-center justify-center rounded-full border ${active ? "border-sport-lime" : "border-[#383838]"}`}>
                      {active ? <span className="h-3 w-3 rounded-full bg-sport-lime" /> : null}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        <div className="border-t border-[#262626] bg-[#141414] p-4">
          <PrimaryButton onClick={() => navigate(routes.discover)}>14 Sonucu Gör</PrimaryButton>
        </div>
      </div>
    </AppCanvas>
  );
}
