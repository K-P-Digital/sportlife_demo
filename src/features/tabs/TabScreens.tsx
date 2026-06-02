import { useEffect, useMemo, useState, type ReactNode } from "react";
import type { ScreenProps } from "../../shared/lib/navigation";
import { Card, Chip, Icon, IconButton, PrimaryButton, SectionTitle, TabScreen } from "../../shared/ui";
import { images, nearbySlots } from "../../shared/data/content";
import { routes } from "../../shared/lib/routes";

const discoverCategories = [
  { key: "all", label: "Tümü", icon: "grid_view" },
  { key: "yoga", label: "Yoga", icon: "self_improvement" },
  { key: "fitness", label: "Fitness", icon: "fitness_center" },
  { key: "swim", label: "Yüzme", icon: "pool" },
  { key: "combat", label: "Kickboks", icon: "sports_martial_arts" }
] as const;

const trainingPeriods = ["Bu Ay", "Son 3 Ay", "Bu Yıl", "Tümü"] as const;
const favoriteFilters = ["Tümü", "Yoga", "Fitness", "Pilates", "Yüzme"] as const;

const discoverStudios = [
  { name: "Zenite Studio", category: "yoga", distance: "0.8 km", rating: "4.9", price: "2 kredi", slots: "4 slot", status: "Müsait", image: images.discoverYoga },
  { name: "Iron Core Gym", category: "fitness", distance: "1.2 km", rating: "4.7", price: "1 kredi", slots: "12 slot", status: "Müsait", image: images.discoverGym }
] as const;

const offPeakItems = [
  { name: "Fight Club İst.", time: "07:30", type: "Boks", price: "2 kredi", image: images.boxing },
  { name: "Spin Matrix", time: "08:00", type: "Cycling", price: "1.5 kredi", image: images.cycling }
] as const;

const rankingItems = [
  { rank: "01", name: "CrossFit Kadıköy", meta: "4.9 · CrossFit", price: "3 kredi" },
  { rank: "02", name: "Pilates Zone", meta: "4.8 · Pilates", price: "2 kredi" },
  { rank: "03", name: "Aqua Club Moda", meta: "4.7 · Yüzme", price: "2 kredi" }
] as const;

const breakdownItems = [
  { name: "Yoga", icon: "self_improvement", value: "8 ders", percent: 35 },
  { name: "Fitness", icon: "fitness_center", value: "9 ders", percent: 39 },
  { name: "Pilates", icon: "sports_gymnastics", value: "6 ders", percent: 26 }
] as const;

type FavoriteSlot = {
  time: string;
  note: string;
  accent?: boolean;
};

type FavoriteStudio = {
  id: string;
  name: string;
  category: string;
  distance: string;
  rating: string;
  open: string;
  price: string;
  cash: string;
  image: string;
  slots: FavoriteSlot[];
};

type ProfileAction = {
  icon: string;
  label: string;
  dot?: boolean;
};

const favoritesSeed: FavoriteStudio[] = [
  {
    id: "zenith",
    name: "Zenith Yoga Space",
    category: "Yoga",
    distance: "0.8 km",
    rating: "4.9",
    open: "Bugün Açık",
    price: "2 kredi",
    cash: "tek girişle ₺320",
    image: images.discoverYoga,
    slots: [
      { time: "18:30", note: "3 yer" },
      { time: "20:00", note: "-15%", accent: true },
      { time: "21:15", note: "1 yer" }
    ]
  },
  {
    id: "iron-core",
    name: "Iron Core Athletics",
    category: "Fitness",
    distance: "2.1 km",
    rating: "4.8",
    open: "Bugün Açık",
    price: "3 kredi",
    cash: "tek girişle ₺450",
    image: images.discoverGym,
    slots: [
      { time: "17:00", note: "5 yer" },
      { time: "18:00", note: "Doldu" },
      { time: "22:00", note: "-15%", accent: true }
    ]
  },
  {
    id: "flow-pilates",
    name: "Flow Pilates",
    category: "Pilates",
    distance: "1.4 km",
    rating: "4.7",
    open: "Dün Gidildi",
    price: "2 kredi",
    cash: "tek girişle ₺290",
    image: images.homeYoga,
    slots: [{ time: "Kaydet", note: "3 kez gidildi" }]
  },
  {
    id: "aqua-zone",
    name: "Aqua Zone Pool",
    category: "Yüzme",
    distance: "3.0 km",
    rating: "4.6",
    open: "Hafta Sonu Açık",
    price: "2 kredi",
    cash: "tek girişle ₺260",
    image: images.studio,
    slots: [{ time: "Kaydet", note: "1 kez gidildi" }]
  }
];

const profileActions: ProfileAction[] = [
  { icon: "calendar_month", label: "Rezerv" },
  { icon: "payments", label: "Krediler" },
  { icon: "notifications", label: "Bildirim", dot: true },
  { icon: "settings", label: "Ayarlar" }
];

const badgeItems = [
  { icon: "self_improvement", label: "Yoga Ustası" },
  { icon: "local_fire_department", label: "4 Gün Seri" },
  { icon: "bolt", label: "Sabah Fırtınası" }
] as const;

function HeaderBlock({
  title,
  subtitle,
  action
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <header className="sticky top-0 z-30 bg-sport-bg/95 px-5 pb-4 pt-12 backdrop-blur-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-[26px] font-bold tracking-tight text-white">{title}</h1>
          {subtitle ? <p className="mt-1 text-xs text-sport-muted">{subtitle}</p> : null}
        </div>
        {action}
      </div>
    </header>
  );
}

function HomeHeader({ navigate }: ScreenProps) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <p className="text-[13px] text-sport-muted">İyi sabahlar,</p>
        <h1 className="mt-1 font-epilogue text-[28px] font-extrabold leading-none text-white">Ayşe.</h1>
      </div>
      <button
        type="button"
        onClick={() => navigate(routes.profile)}
        className="flex flex-col items-center gap-1"
      >
        <div className="relative">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-sport-lime bg-sport-panel text-sm font-bold text-sport-lime">
            AS
          </div>
          <span className="absolute right-0 top-0 h-1.5 w-1.5 rounded-full border border-sport-bg bg-sport-lime" />
        </div>
        <span className="text-[10px] font-semibold uppercase tracking-wide text-sport-lime">12 kredi</span>
      </button>
    </div>
  );
}

export function HomeScreen(props: ScreenProps) {
  return (
    <TabScreen active={routes.home} navigate={props.navigate}>
      <div className="space-y-5 px-5 pb-8 pt-12">
        <HomeHeader {...props} />

        <Card className="relative overflow-hidden border-sport-lime/20 p-4">
          <div className="absolute inset-0 bg-gradient-to-br from-sport-lime/5 to-transparent" />
          <div className="relative space-y-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-sport-muted">Bugün</p>
              <h2 className="mt-1 text-[24px] font-bold text-white">10:30&apos;da Mat Yoga</h2>
              <p className="mt-1 text-sm text-sport-muted">Zen Studio Kadıköy · 2 saat kaldı</p>
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-white/5 pt-4">
              <div className="flex items-center gap-2 text-sport-lime">
                <Icon name="timer" className="text-[18px]" fill />
                <span className="text-sm font-semibold">1s 58d</span>
              </div>
              <button
                type="button"
                onClick={() => props.navigate(routes.qr)}
                className="inline-flex h-10 items-center gap-1 rounded-full bg-sport-lime px-4 text-sm font-bold text-sport-bg"
              >
                QR Kodunu Gör
                <Icon name="arrow_forward" className="text-[16px]" />
              </button>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-sport-muted">Kredi</p>
            <p className="mt-1 text-[34px] font-extrabold leading-none text-sport-lime">12</p>
            <div className="mt-4">
              <div className="mb-1 flex items-center justify-between text-[10px] text-sport-muted">
                <span>31 gün kaldı</span>
                <span>%60</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-sport-elevated">
                <div className="h-full w-[60%] rounded-full bg-sport-lime" />
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-sport-muted">Seri</p>
            <div className="mt-1 flex items-center gap-2">
              <p className="text-[28px] font-bold leading-none text-white">4 hafta</p>
              <Icon name="local_fire_department" className="text-[20px] text-sport-lime" fill />
            </div>
            <div className="mt-4 flex items-center justify-between gap-1">
              {[true, true, true, true, false, false, false].map((filled, index) => (
                <span key={index} className={`h-2 w-2 rounded-full ${filled ? "bg-sport-lime" : "bg-sport-elevated"}`} />
              ))}
            </div>
          </Card>
        </div>

        <Card className="flex items-start gap-3 p-3">
          <Icon name="bolt" className="mt-0.5 text-[20px] text-sport-lime" fill />
          <p className="text-[13px] leading-snug text-sport-text/85">
            <span className="font-bold text-sport-lime">SANA ÖZEL:</span> Pilates&apos;e uzun süredir gitmedin. Yarın 14:00 Moda&apos;da yer var.
          </p>
        </Card>

        <section className="space-y-3">
          <SectionTitle title="Bugün Yakınındaki Slotlar" action="Tümü" onAction={() => props.navigate(routes.discover)} />
          <div className="-mx-5 flex gap-4 overflow-x-auto px-5 pb-1">
            {nearbySlots.map((slot) => (
              <Card key={`${slot.title}-${slot.time}`} onClick={() => props.navigate(routes.slots)} className="w-[152px] shrink-0 overflow-hidden rounded-xl">
                <div className="relative h-24">
                  <img src={slot.image} alt={slot.title} className="h-full w-full object-cover opacity-70" />
                  <div className="absolute inset-0 bg-gradient-to-t from-sport-panel via-transparent to-transparent" />
                  <span className="absolute left-2 top-2 rounded-md bg-sport-panel px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-sport-lime">
                    {slot.type}
                  </span>
                </div>
                <div className="space-y-1 p-3">
                  <p className="truncate text-[13px] font-bold text-white">{slot.title}</p>
                  <p className="flex items-center gap-1 text-[11px] text-sport-muted">
                    <Icon name="schedule" className="text-[12px]" />
                    {slot.time}
                  </p>
                  <p className="flex items-center gap-1 text-[12px] font-bold text-sport-lime">
                    <Icon name="toll" className="text-[14px]" />
                    {slot.credit}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <SectionTitle title="Geçen Hafta" action="Detay" onAction={() => props.navigate(routes.training)} />
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-white">3 aktivite tamamlandı</p>
                <p className="mt-1 text-xs text-sport-muted">Yoga, spinning ve fonksiyonel antrenman</p>
              </div>
              <div className="rounded-full bg-sport-lime/10 px-3 py-1 text-xs font-bold text-sport-lime">+2 kredi</div>
            </div>
          </Card>
        </section>
      </div>
    </TabScreen>
  );
}

export function DiscoverScreen(props: ScreenProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof discoverCategories)[number]["key"]>("all");

  const filteredStudios = useMemo(() => {
    return discoverStudios.filter((studio) => {
      const matchesCategory = category === "all" || studio.category === category;
      const term = query.trim().toLocaleLowerCase("tr");
      const matchesQuery = term.length === 0 || studio.name.toLocaleLowerCase("tr").includes(term);
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return (
    <TabScreen active={routes.discover} navigate={props.navigate}>
      <HeaderBlock
        title="Keşfet"
        subtitle="Kadıköy · İstanbul"
        action={<IconButton icon="map" label="Harita" onClick={() => props.navigate(routes.filter)} className="rounded-xl" />}
      />

      <div className="space-y-8 px-4 pb-8">
        <div className="flex h-12 items-center rounded-xl border border-white/5 bg-sport-panel px-4">
          <Icon name="search" className="text-[18px] text-sport-muted" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Salon, aktivite veya eğitmen ara..."
            className="mx-2 w-full border-none bg-transparent text-sm text-white outline-none placeholder:text-sport-muted"
          />
          <button type="button" onClick={() => props.navigate(routes.filter)}>
            <Icon name="tune" className="text-[18px] text-sport-muted" />
          </button>
        </div>

        <section className="-mx-4 overflow-x-auto px-4">
          <div className="flex gap-3 pb-1">
            {discoverCategories.map((item) => {
              const active = item.key === category;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setCategory(item.key)}
                  className={`flex h-[108px] w-24 shrink-0 flex-col items-center justify-center gap-2 rounded-[14px] border text-sm font-medium transition-colors ${
                    active ? "border-sport-lime bg-sport-lime/5 text-sport-lime" : "border-transparent bg-sport-panel text-sport-muted"
                  }`}
                >
                  <Icon name={item.icon} className="text-[22px]" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-end justify-between">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.16em] text-sport-muted">Şu An Açık</h2>
            <button type="button" onClick={() => props.navigate(routes.filter)} className="text-xs font-semibold text-sport-lime">
              Haritada Gör
            </button>
          </div>
          <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-1">
            {filteredStudios.map((studio) => (
              <Card key={studio.name} onClick={() => props.navigate(routes.studio)} className="flex h-[220px] w-[268px] shrink-0 flex-col overflow-hidden rounded-2xl border-white/10">
                <div className="relative h-[132px]">
                  <img src={studio.image} alt={studio.name} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-sport-panel to-transparent" />
                  <div className="absolute left-3 top-3 flex gap-2">
                    <span className="rounded bg-sport-lime px-2 py-1 text-[9px] font-bold uppercase text-sport-bg">{studio.category}</span>
                    <span className="rounded bg-sport-lime px-2 py-1 text-[9px] font-bold text-sport-bg">{studio.slots}</span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-between p-4">
                  <div>
                    <h3 className="text-base font-bold text-white">{studio.name}</h3>
                    <p className="mt-1 text-[11px] text-sport-muted">★ {studio.rating} · {studio.distance}</p>
                  </div>
                  <div className="flex items-end justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-extrabold text-sport-lime">{studio.price}</span>
                      <span className="text-[10px] text-sport-muted line-through">₺260</span>
                    </div>
                    <span className="text-[11px] font-semibold text-sport-lime">{studio.status}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div>
            <h2 className="flex items-center gap-1 text-base font-extrabold uppercase text-white">
              Sabah Fırtınası <Icon name="bolt" className="text-[16px] text-sport-lime" fill />
            </h2>
            <p className="mt-1 text-xs text-sport-muted">07:00-10:00 · Off-peak -15%</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {offPeakItems.map((item) => (
              <Card key={item.name} onClick={() => props.navigate(routes.slots)} className="overflow-hidden rounded-[14px] border border-dashed border-sport-lime/30">
                <div className="relative h-20">
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-black/40" />
                  <span className="absolute right-2 top-2 rounded bg-sport-bg/80 px-1.5 py-0.5 text-[9px] font-bold text-sport-lime">-15%</span>
                </div>
                <div className="flex min-h-[80px] flex-col justify-between p-3">
                  <div>
                    <h3 className="truncate text-sm font-bold text-white">{item.name}</h3>
                    <p className="text-[10px] text-sport-muted">{item.time} · {item.type}</p>
                  </div>
                  <span className="text-sm font-extrabold text-sport-lime">{item.price}</span>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.16em] text-sport-muted">En Çok Rezerve Edilen</h2>
          <div className="space-y-4">
            {rankingItems.map((item) => (
              <button key={item.rank} type="button" onClick={() => props.navigate(routes.studio)} className="flex w-full items-center justify-between border-b border-white/10 pb-4 text-left last:border-none">
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-extrabold text-sport-lime">{item.rank}</span>
                  <div>
                    <p className="text-sm font-semibold text-white">{item.name}</p>
                    <p className="mt-0.5 text-[11px] text-sport-muted">★ {item.meta}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[13px] font-extrabold text-sport-lime">{item.price}</span>
                  <Icon name="chevron_right" className="text-[16px] text-sport-muted" />
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>
    </TabScreen>
  );
}

export function TrainingScreen(props: ScreenProps) {
  const [period, setPeriod] = useState<(typeof trainingPeriods)[number]>("Bu Ay");

  return (
    <TabScreen active={routes.training} navigate={props.navigate}>
      <HeaderBlock
        title="Antrenman"
        subtitle="Nisan 2025"
        action={<IconButton icon="calendar_month" label="Takvim" className="bg-sport-panel" />}
      />

      <div className="space-y-4 pb-8">
        <div className="overflow-x-auto px-5">
          <div className="flex gap-2 pb-1">
            {trainingPeriods.map((item) => (
              <Chip key={item} label={item} active={item === period} onClick={() => setPeriod(item)} />
            ))}
          </div>
        </div>

        <div className="space-y-4 px-5">
          <Card className="relative overflow-hidden p-6">
            <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-sport-lime/5 blur-2xl" />
            <div className="relative flex items-center justify-between gap-4">
              <div>
                <p className="text-[56px] font-extrabold leading-none tracking-tight text-sport-lime">23</p>
                <p className="mt-1 text-[13px] text-sport-muted">aktivite</p>
                <div className="mt-2 inline-flex rounded-md bg-sport-lime/15 px-2.5 py-1 text-[10px] font-bold text-sport-lime">
                  +5 geçen aydan
                </div>
              </div>
              <div className="w-[140px] border-l border-white/5 pl-5">
                {[
                  ["Toplam süre", "18 saat"],
                  ["Kalori", "4.200 kcal"],
                  ["Ort./hafta", "5.7"]
                ].map(([label, value], index) => (
                  <div key={label} className={`flex items-center justify-between py-2.5 ${index < 2 ? "border-b border-white/5" : ""}`}>
                    <span className="text-[11px] text-sport-muted">{label}</span>
                    <span className={`text-[13px] font-semibold ${label === "Ort./hafta" ? "text-sport-lime" : "text-white"}`}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-sport-muted">Nisan 2025</span>
              <div className="flex gap-2">
                <button type="button" className="flex h-7 w-7 items-center justify-center text-sport-muted">
                  <Icon name="chevron_left" className="text-[18px]" />
                </button>
                <button type="button" className="flex h-7 w-7 items-center justify-center text-sport-muted">
                  <Icon name="chevron_right" className="text-[18px]" />
                </button>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="grid grid-cols-7 gap-y-1">
                {["Pt", "Sa", "Çr", "Pe", "Cu", "Ct", "Pz"].map((day) => (
                  <div key={day} className="text-center text-[10px] font-semibold text-white/25">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-y-1.5">
                {[null, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((value) => {
                  if (!value) return <div key="blank-0" className="h-10" />;
                  const active = [2, 4, 5].includes(value);
                  const outlined = value === 7;
                  const muted = value >= 8;
                  return (
                    <div key={value} className="relative flex h-10 items-center justify-center">
                      {active ? (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sport-lime text-[13px] font-bold text-sport-bg">{value}</div>
                      ) : outlined ? (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-sport-lime text-[13px] font-bold text-sport-lime">{value}</div>
                      ) : (
                        <span className={`text-[13px] ${muted ? "text-white/25" : "text-sport-muted"}`}>{value}</span>
                      )}
                      {value === 4 ? <span className="absolute bottom-0.5 h-1 w-1 rounded-full bg-sport-lime" /> : null}
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <span className="mb-4 block text-[10px] font-semibold uppercase tracking-[0.16em] text-sport-muted">Branş Dağılımı</span>
            <div className="space-y-4">
              {breakdownItems.map((item) => (
                <div key={item.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sport-lime/15">
                        <Icon name={item.icon} className="text-[16px] text-sport-lime" fill />
                      </div>
                      <span className="text-[14px] font-semibold text-white">{item.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-[13px] font-semibold text-white">{item.value}</p>
                      <p className="text-[11px] text-sport-muted">%{item.percent}</p>
                    </div>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-sport-elevated">
                    <div className="h-full rounded-full bg-sport-lime" style={{ width: `${item.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </TabScreen>
  );
}

export function FavoritesScreen(props: ScreenProps) {
  const [activeFilter, setActiveFilter] = useState<(typeof favoriteFilters)[number]>("Tümü");
  const [liked, setLiked] = useState<Record<string, boolean>>(
    Object.fromEntries(favoritesSeed.map((item) => [item.id, true]))
  );

  const visibleFavorites = favoritesSeed.filter((item) => {
    if (!liked[item.id]) return false;
    return activeFilter === "Tümü" || item.category === activeFilter;
  });

  return (
    <TabScreen active={routes.favorites} navigate={props.navigate}>
      <div className="space-y-6 pb-8 pt-12">
        <div className="flex items-center justify-between px-5">
          <div className="flex items-center gap-2.5">
            <h1 className="text-[26px] font-bold tracking-tight text-white">Favorilerim</h1>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sport-lime text-[11px] font-bold text-sport-bg">
              {visibleFavorites.length}
            </span>
          </div>
          <IconButton icon="search" label="Ara" />
        </div>

        <div className="overflow-x-auto px-5">
          <div className="flex gap-2 pb-1">
            {favoriteFilters.map((item) => (
              <Chip key={item} label={item} active={item === activeFilter} onClick={() => setActiveFilter(item)} />
            ))}
          </div>
        </div>

        <div className="space-y-4 px-5">
          {visibleFavorites.map((item) => (
            <Card key={item.id} className="overflow-hidden rounded-[18px]">
              <div className="relative h-[124px]">
                <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute left-3 right-3 top-3 flex items-start justify-between">
                  <span className="rounded-md bg-sport-lime px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.05em] text-sport-bg">
                    {item.category}
                  </span>
                  <button
                    type="button"
                    onClick={() => setLiked((current) => ({ ...current, [item.id]: !current[item.id] }))}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-black/70 backdrop-blur-sm"
                  >
                    <Icon name="favorite" className={`text-[16px] ${liked[item.id] ? "text-sport-lime" : "text-white/60"}`} fill={liked[item.id]} />
                  </button>
                </div>
                <div className="absolute bottom-3 left-3">
                  <h2 className="text-[16px] font-bold text-white">{item.name}</h2>
                  <p className="mt-1 text-[11px] text-white/70">
                    ★ {item.rating} · {item.distance} · <span className="text-sport-lime">{item.open}</span>
                  </p>
                </div>
              </div>

              <div className="p-4">
                <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-sport-muted">Bugün Müsait</p>
                <div className="-mx-1 mt-2 flex gap-2 overflow-x-auto px-1 pb-1">
                  {item.slots.map((slot) => (
                    <div
                      key={`${item.id}-${slot.time}`}
                      className={`shrink-0 rounded-[10px] px-3 py-2 ${slot.accent ? "border border-dashed border-sport-lime/40 bg-sport-panel" : "bg-sport-elevated"}`}
                    >
                      <p className="text-[12px] font-semibold text-white">{slot.time}</p>
                      <p className={`text-[10px] ${slot.accent ? "font-bold text-sport-lime" : "text-sport-muted"}`}>{slot.note}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[14px] font-extrabold text-sport-lime">{item.price}</p>
                    <p className="text-[10px] text-sport-muted">{item.cash}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => props.navigate(routes.slots)}
                    className="h-9 rounded-xl bg-sport-lime px-4 text-[12px] font-bold text-sport-bg shadow-[0_0_16px_rgba(197,248,51,0.25)]"
                  >
                    Rezerve Et
                  </button>
                </div>
              </div>
            </Card>
          ))}

          <section className="space-y-3 pt-2">
            <SectionTitle title="Son Gittiklerin" action="Tümü" />
            <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-2">
              {favoritesSeed.slice(2).map((item) => (
                <Card key={`${item.id}-recent`} className="w-[152px] shrink-0 overflow-hidden rounded-[14px]">
                  <div className="relative h-[88px]">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-2.5">
                      <p className="text-[11px] font-semibold text-white">{item.name}</p>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-[10px] text-sport-muted">{item.slots[0]?.note}</p>
                    <button
                      type="button"
                      onClick={() => setLiked((current) => ({ ...current, [item.id]: true }))}
                      className="mt-1.5 text-[11px] font-semibold text-sport-lime"
                    >
                      Kaydet
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
    </TabScreen>
  );
}

export function ProfileScreen(props: ScreenProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  return (
    <TabScreen active={routes.profile} navigate={props.navigate}>
      <HeaderBlock title="Profil" action={<IconButton icon="settings" label="Ayarlar" />} />

      <div className="space-y-4 px-4 pb-8">
        <Card className="relative mt-1 overflow-hidden border-white/10 p-6">
          <div className="absolute inset-0 bg-gradient-to-br from-sport-lime/10 to-transparent" />
          <div className="relative flex items-center gap-5">
            <div className="relative">
              <div className="flex h-[88px] w-[88px] items-center justify-center rounded-full border-[2.5px] border-sport-lime bg-sport-bg">
                <span className="text-3xl font-bold tracking-tight text-sport-lime">AS</span>
              </div>
              <button type="button" className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-sport-panel bg-sport-lime text-sport-bg">
                <Icon name="edit" className="text-[18px]" />
              </button>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Ayşe Sarıoğlu</h2>
              <div className="mt-2 inline-flex items-center rounded border border-white/10 bg-sport-panel px-2 py-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-sport-lime">Elite Üye</span>
              </div>
            </div>
          </div>
        </Card>

        <section className="grid grid-cols-4 gap-3">
          {profileActions.map((item) => (
            <Card key={item.label} className="relative flex min-h-[88px] flex-col items-center justify-center gap-2 p-3 text-center">
              {item.dot ? <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-sport-lime" /> : null}
              <Icon name={item.icon} className={`text-[22px] ${item.icon === "calendar_month" ? "text-sport-lime" : "text-white"}`} />
              <span className="text-xs font-semibold text-white/75">{item.label}</span>
            </Card>
          ))}
        </section>

        <Card className="p-5">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/50">Seri Hedefi</p>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-white">4</span>
                <span className="text-sm text-sport-muted">Gün</span>
              </div>
            </div>
            <span className="rounded bg-sport-lime/10 px-2 py-1 text-xs font-semibold text-sport-lime">1 gün kaldı (+2 Kredi)</span>
          </div>
          <div className="mt-6 flex items-center justify-between gap-1">
            {[
              { label: "Pt", state: true },
              { label: "Sa", state: true },
              { label: "Çr", state: true },
              { label: "Pe", state: "today" },
              { label: "Cu", state: false }
            ].map(({ label, state }, index) => (
              <div key={label} className="flex flex-1 items-center">
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      state === true
                        ? "bg-sport-lime text-sport-bg"
                        : state === "today"
                          ? "border-2 border-sport-lime bg-sport-panel text-sport-lime"
                          : "border border-white/10 bg-sport-panel text-white/35"
                    }`}
                  >
                    {state === true ? <Icon name="check" className="text-[16px]" /> : <span className="text-xs font-bold">{label}</span>}
                  </div>
                  <span className={`text-[10px] font-medium ${state === "today" ? "text-sport-lime" : "text-white/50"}`}>{state === "today" ? "BGN" : label}</span>
                </div>
                {index < 4 ? <div className={`mx-1 h-[2px] flex-1 ${state === false ? "bg-white/10" : "bg-sport-lime"}`} /> : null}
              </div>
            ))}
          </div>
        </Card>

        <section className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <Card className="p-5">
              <Icon name="local_fire_department" className="mb-2 text-[20px] text-white/60" />
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/45">Aktivite</p>
              <p className="mt-1 text-2xl font-bold text-white">12 <span className="text-sm font-medium text-white/50">Saat</span></p>
            </Card>
            <Card className="border-sport-lime/20 bg-sport-lime/5 p-5">
              <Icon name="category" className="mb-2 text-[20px] text-sport-lime" />
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-sport-lime">Çeşitlilik</p>
              <p className="mt-1 text-2xl font-bold text-white">2/3 <span className="text-sm font-medium text-white/60">Branş</span></p>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-sport-panel">
                <div className="h-full w-[66%] rounded-full bg-sport-lime" />
              </div>
            </Card>
          </div>

          <Card className="flex flex-col justify-between p-5">
            <div>
              <Icon name="storefront" className="mb-2 text-[20px] text-white/60" />
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/45">Favori Salon</p>
              <p className="mt-1 text-lg font-bold leading-tight text-white">MacFit<br />Kanyon</p>
            </div>
            <img src={images.discoverGym} alt="Favori salon" className="mt-8 h-24 w-full rounded-lg border border-white/10 object-cover" />
          </Card>
        </section>

        <Card className="p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-white">Arkadaşını Davet Et</h3>
              <p className="mt-1 text-xs text-sport-muted">Her başarılı davet için 3 kredi kazan.</p>
            </div>
            <button
              type="button"
              onClick={() => setCopied(true)}
              className={`rounded-full px-4 py-2 text-xs font-bold transition-colors ${copied ? "bg-sport-lime/20 text-sport-lime" : "bg-sport-lime text-sport-bg"}`}
            >
              {copied ? "Kopyalandı" : "Kodu Kopyala"}
            </button>
          </div>
          <div className="mt-3 rounded-xl border border-dashed border-sport-lime/30 bg-sport-panel px-4 py-3 text-sm font-semibold tracking-[0.14em] text-sport-lime">
            AYSE-SPORT-24
          </div>
        </Card>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-white">Rozetler</h3>
            <button type="button" className="text-xs font-medium text-sport-lime">Tümünü Gör</button>
          </div>
          <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2">
            {badgeItems.map((item) => (
              <div key={item.label} className="w-24 shrink-0 text-center">
                <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full border border-sport-lime/50 bg-sport-panel shadow-[0_0_15px_rgba(212,255,79,0.15)]">
                  <Icon name={item.icon} className="text-2xl text-sport-lime" />
                </div>
                <p className="text-[11px] font-semibold text-white">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        <PrimaryButton onClick={() => props.navigate(routes.reservations)}>
          Rezervasyonlarım
          <Icon name="arrow_forward" />
        </PrimaryButton>
      </div>
    </TabScreen>
  );
}
