import { useMemo, useState } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import type { ScreenProps } from "../../shared/lib/navigation";
import { AppCanvas, Card, Chip, Icon, PrimaryButton, ProgressHeader } from "../../shared/ui";
import { routes } from "../../shared/lib/routes";

const sports = [
  { key: "yoga", label: "Yoga", icon: "self_improvement", credit: "1 Kredi", available: true },
  { key: "pilates", label: "Pilates", icon: "sports_gymnastics", credit: "2 Kredi", available: true },
  { key: "fitness", label: "Fitness", icon: "fitness_center", credit: "1 Kredi", available: true },
  { key: "yuzme", label: "Yüzme", icon: "pool", credit: "2 Kredi", available: true },
  { key: "boks", label: "Boks", icon: "sports_mma", credit: "3 Kredi", available: true },
  { key: "tenis", label: "Tenis", icon: "sports_tennis", credit: "", available: false },
  { key: "hali-saha", label: "Halı Saha", icon: "sports_soccer", credit: "", available: false }
] as const;

const goals = [
  { key: "habit", title: "Düzenli alışkanlık edinmek", detail: "Haftada en az 3 gün antrenman.", icon: "event_available" },
  { key: "muscle", title: "Kas kütlesi artırmak", detail: "Güç ve hipertrofi odaklı plan.", icon: "fitness_center" },
  { key: "weight-loss", title: "Kilo vermek", detail: "Kardiyo ve kalori yakımı odaklı.", icon: "monitor_weight" },
  { key: "mobility", title: "Esneklik ve mobilite", detail: "Postür, rahatlama ve akıcılık.", icon: "sports_gymnastics" }
] as const;

const genderOptions = ["Kadın", "Erkek", "Diğer"] as const;

type SignUpShellProps = ScreenProps & {
  step: number;
  title: string;
  description: string;
  cta: string;
  nextRoute: string;
  children: ReactNode;
};

function SignUpShell({ navigate, step, title, description, cta, nextRoute, children }: SignUpShellProps) {
  const progress = (step / 5) * 100;
  const backRoute =
    step === 1
      ? routes.auth
      : step === 2
        ? routes.signUpBasic
        : step === 3
          ? routes.signUpLocation
          : step === 4
            ? routes.signUpSports
            : routes.signUpGoal;

  return (
    <AppCanvas className="pb-36">
      <ProgressHeader step={step} total={5} progress={progress} onBack={() => navigate(backRoute)} />
      <div className="px-5 pb-8">
        <div className="space-y-7">
          <div className="space-y-2">
            <h1 className="text-[34px] font-extrabold leading-[1.05] tracking-tight text-white">{title}</h1>
            <p className="max-w-[340px] text-[15px] leading-7 text-sport-muted">{description}</p>
          </div>
          {children}
        </div>
      </div>
      <div className="fixed bottom-0 left-1/2 z-30 w-full max-w-[430px] -translate-x-1/2 bg-gradient-to-t from-sport-bg via-sport-bg/95 to-transparent px-5 pb-8 pt-10">
        <PrimaryButton onClick={() => navigate(nextRoute)}>
          {cta}
          <Icon name={step === 5 ? "check_circle" : "arrow_forward"} className="text-[20px]" />
        </PrimaryButton>
      </div>
    </AppCanvas>
  );
}

function FieldLabel({ children }: { children: ReactNode }) {
  return <span className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.18em] text-sport-muted">{children}</span>;
}

function InputField(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`h-[54px] w-full rounded-2xl border border-sport-border bg-[#161616] px-4 text-[16px] text-white outline-none transition-colors placeholder:text-sport-muted focus:border-[#383838] ${props.className ?? ""}`}
    />
  );
}

export function SignUpBasic({ navigate }: ScreenProps) {
  const [form, setForm] = useState({
    firstName: "Can",
    lastName: "",
    email: "",
    password: "secretpassword",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const strength = useMemo(() => {
    if (form.password.length >= 12) return 3;
    if (form.password.length >= 8) return 2;
    return form.password.length > 0 ? 1 : 0;
  }, [form.password]);

  return (
    <SignUpShell
      navigate={navigate}
      step={1}
      title="Seni tanıyalım."
      description="Hesabını oluşturmak için temel bilgilerini gir. Bir sonraki adımda sana en yakın stüdyoları eşleştireceğiz."
      cta="Devam Et"
      nextRoute={routes.signUpLocation}
    >
      <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
        <label className="block">
          <FieldLabel>Ad</FieldLabel>
          <div className="relative">
            <InputField value={form.firstName} onChange={(event) => setForm({ ...form, firstName: event.target.value })} />
            <Icon name="check_circle" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[20px] text-sport-lime" fill />
          </div>
        </label>
        <label className="block">
          <FieldLabel>Soyad</FieldLabel>
          <InputField placeholder="Soyadın" value={form.lastName} onChange={(event) => setForm({ ...form, lastName: event.target.value })} />
        </label>
        <label className="block">
          <FieldLabel>E-posta</FieldLabel>
          <InputField placeholder="ornek@email.com" type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
        </label>
        <label className="block">
          <FieldLabel>Şifre</FieldLabel>
          <div className="flex h-[54px] items-center rounded-2xl border border-sport-border bg-[#161616] px-4 transition-colors focus-within:border-[#383838]">
            <input
              className="w-full bg-transparent text-[16px] text-white outline-none"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
            />
            <button className="text-sport-muted" type="button" onClick={() => setShowPassword((current) => !current)}>
              <Icon name={showPassword ? "visibility" : "visibility_off"} className="text-[22px]" />
            </button>
          </div>
          <div className="mt-3 flex items-center gap-1">
            {[1, 2, 3].map((value) => (
              <div key={value} className={`h-1 flex-1 rounded-full ${strength >= value ? "bg-sport-lime" : "bg-sport-elevated"}`} />
            ))}
            <span className="ml-2 text-[10px] font-medium text-sport-muted">{strength >= 3 ? "Güçlü" : strength === 2 ? "Orta" : "Zayıf"}</span>
          </div>
        </label>
        <label className="block">
          <FieldLabel>Şifre Tekrar</FieldLabel>
          <div className="flex h-[54px] items-center rounded-2xl border border-sport-border bg-[#161616] px-4 transition-colors focus-within:border-[#383838]">
            <input
              className="w-full bg-transparent text-[16px] text-white outline-none"
              type={showConfirmPassword ? "text" : "password"}
              value={form.confirmPassword}
              onChange={(event) => setForm({ ...form, confirmPassword: event.target.value })}
              placeholder="Şifreni onayla"
            />
            <button className="text-sport-muted" type="button" onClick={() => setShowConfirmPassword((current) => !current)}>
              <Icon name={showConfirmPassword ? "visibility" : "visibility_off"} className="text-[22px]" />
            </button>
          </div>
        </label>
      </form>
    </SignUpShell>
  );
}

export function SignUpLocation({ navigate }: ScreenProps) {
  const [birthDate, setBirthDate] = useState("12 / 08 / 1994");
  const [gender, setGender] = useState<(typeof genderOptions)[number]>("Kadın");
  const [city, setCity] = useState("İstanbul");
  const [district, setDistrict] = useState("Kadıköy");
  const [locationEnabled, setLocationEnabled] = useState(true);

  return (
    <SignUpShell
      navigate={navigate}
      step={2}
      title="Neredesin?"
      description="Doğum tarihi, cinsiyet ve konum bilgileriyle yakın stüdyoları ve uygun antrenmanları filtreleyebiliriz."
      cta="Devam Et"
      nextRoute={routes.signUpSports}
    >
      <div className="space-y-5">
        <label className="block">
          <FieldLabel>Doğum Tarihi</FieldLabel>
          <button
            className="flex h-[54px] w-full items-center justify-between rounded-2xl border border-sport-border bg-[#161616] px-4 text-left text-white transition-colors hover:border-[#383838]"
            type="button"
            onClick={() => setBirthDate("25 / 09 / 1992")}
          >
            <span>{birthDate}</span>
            <Icon name="calendar_today" className="text-[20px] text-sport-muted" />
          </button>
        </label>
        <div>
          <FieldLabel>Cinsiyet</FieldLabel>
          <div className="grid grid-cols-3 gap-2">
            {genderOptions.map((option) => (
              <button
                key={option}
                className={`h-[54px] rounded-2xl text-[14px] font-bold transition-colors ${
                  gender === option ? "bg-sport-lime text-sport-bg" : "border border-sport-border bg-[#161616] text-white hover:bg-sport-elevated"
                }`}
                type="button"
                onClick={() => setGender(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <FieldLabel>Şehir</FieldLabel>
            <button
              className="flex h-[54px] w-full items-center justify-between rounded-2xl border border-sport-border bg-[#161616] px-4 text-left text-white transition-colors hover:border-[#383838]"
              type="button"
              onClick={() => setCity(city === "İstanbul" ? "Ankara" : "İstanbul")}
            >
              <span className="truncate">{city}</span>
              <Icon name="expand_more" className="text-[20px] text-sport-muted" />
            </button>
          </label>
          <label className="block">
            <FieldLabel>İlçe</FieldLabel>
            <button
              className="flex h-[54px] w-full items-center justify-between rounded-2xl border border-sport-border bg-[#161616] px-4 text-left text-white transition-colors hover:border-[#383838]"
              type="button"
              onClick={() => setDistrict(district === "Kadıköy" ? "Beşiktaş" : "Kadıköy")}
            >
              <span className="truncate">{district}</span>
              <Icon name="expand_more" className="text-[20px] text-sport-muted" />
            </button>
          </label>
        </div>
        <Card className="flex items-center justify-between rounded-[22px] p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sport-bg text-sport-lime">
              <Icon name="location_on" className="text-[20px]" fill />
            </div>
            <div>
              <div className="text-[14px] font-bold text-white">Konum Servisleri</div>
              <div className="mt-1 text-[12px] text-sport-muted">Yakındaki etkinlikleri daha hızlı göster.</div>
            </div>
          </div>
          <button
            aria-pressed={locationEnabled}
            className={`relative h-7 w-12 rounded-full transition-colors ${locationEnabled ? "bg-sport-lime" : "bg-sport-border"}`}
            type="button"
            onClick={() => setLocationEnabled((current) => !current)}
          >
            <span className={`absolute top-1 h-5 w-5 rounded-full transition-all ${locationEnabled ? "right-1 bg-sport-bg" : "left-1 bg-white/80"}`} />
          </button>
        </Card>
      </div>
    </SignUpShell>
  );
}

export function SignUpSports({ navigate }: ScreenProps) {
  const [selectedSports, setSelectedSports] = useState<string[]>(["yoga", "pilates", "fitness"]);

  const toggleSport = (key: string, available: boolean) => {
    if (!available) return;
    setSelectedSports((current) => (current.includes(key) ? current.filter((item) => item !== key) : [...current, key]));
  };

  return (
    <SignUpShell
      navigate={navigate}
      step={3}
      title="Hangi sporları seviyorsun?"
      description="İlgi alanlarını seç; sana uygun stüdyoları, dersleri ve avantajlı saatleri buna göre öne çıkaracağız."
      cta="Devam Et"
      nextRoute={routes.signUpGoal}
    >
      <div className="flex items-center justify-between">
        <FieldLabel>İlgi Alanları</FieldLabel>
        <Chip label={`${selectedSports.length} seçildi`} active />
      </div>
      <div className="grid grid-cols-2 gap-4">
        {sports.filter((sport) => sport.available).map((sport) => {
          const active = selectedSports.includes(sport.key);
          return (
            <button
              key={sport.key}
              className={`relative rounded-[22px] p-4 text-left transition-transform active:scale-[0.98] ${
                active ? "border-2 border-sport-lime bg-sport-lime/10" : "border border-sport-border bg-sport-panel"
              }`}
              type="button"
              onClick={() => toggleSport(sport.key, sport.available)}
            >
              {active ? (
                <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-sport-lime text-sport-bg">
                  <Icon name="check" className="text-[14px]" fill />
                </span>
              ) : null}
              <div className={`flex h-12 w-12 items-center justify-center rounded-full ${active ? "bg-sport-lime text-sport-bg" : "border border-sport-border bg-[#161616] text-white"}`}>
                <Icon name={sport.icon} className="text-[24px]" />
              </div>
              <div className="mt-4">
                <div className="text-[18px] font-bold text-white">{sport.label}</div>
                <div className="mt-1 text-[11px] text-sport-muted">{sport.credit}</div>
              </div>
            </button>
          );
        })}
      </div>
      <div className="mt-2 flex items-center gap-4">
        <div className="h-px flex-1 bg-sport-border" />
        <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-sport-muted">Yakında</span>
        <div className="h-px flex-1 bg-sport-border" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        {sports.filter((sport) => !sport.available).map((sport) => (
          <Card key={sport.key} className="relative rounded-[22px] p-4 opacity-55 grayscale">
            <span className="absolute right-3 top-3 rounded-md border border-[#383838] bg-[#161616] px-2 py-1 text-[9px] font-medium uppercase tracking-[0.16em] text-white">
              Yakında
            </span>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#161616] text-white">
              <Icon name={sport.icon} className="text-[24px]" />
            </div>
            <div className="mt-4 text-[18px] font-bold text-white">{sport.label}</div>
          </Card>
        ))}
      </div>
    </SignUpShell>
  );
}

export function SignUpGoal({ navigate }: ScreenProps) {
  const [goal, setGoal] = useState<(typeof goals)[number]["key"]>("habit");

  return (
    <SignUpShell
      navigate={navigate}
      step={4}
      title="Hedefin ne?"
      description="Sana en uygun antrenman programını oluşturabilmemiz için temel hedefini seç."
      cta="Devam Et"
      nextRoute={routes.signUpPermissions}
    >
      <div className="space-y-4">
        {goals.map((item) => {
          const active = item.key === goal;
          return (
            <button
              key={item.key}
              className={`flex w-full items-center rounded-[22px] p-4 text-left transition-colors ${
                active ? "border-2 border-sport-lime bg-sport-panel" : "border border-sport-border bg-sport-panel hover:border-[#383838]"
              }`}
              type="button"
              onClick={() => setGoal(item.key)}
            >
              <div className={`mr-4 flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${active ? "bg-sport-lime/10 text-sport-lime" : "bg-[#161616] text-sport-muted"}`}>
                <Icon name={item.icon} className="text-[28px]" />
              </div>
              <div className="min-w-0 flex-1">
                <div className={`text-[18px] font-semibold ${active ? "text-white" : "text-white"}`}>{item.title}</div>
                <div className="mt-1 text-[13px] text-sport-muted">{item.detail}</div>
              </div>
              <div className={`ml-4 flex h-6 w-6 items-center justify-center rounded-full border-2 ${active ? "border-sport-lime bg-sport-lime text-sport-bg" : "border-[#383838]"}`}>
                {active ? <Icon name="check" className="text-[14px]" fill /> : null}
              </div>
            </button>
          );
        })}
      </div>
    </SignUpShell>
  );
}

export function SignUpPermissions({ navigate }: ScreenProps) {
  const [permissions, setPermissions] = useState({
    notifications: true,
    location: false,
    analytics: true,
    terms: true
  });

  const toggle = (key: keyof typeof permissions) => setPermissions((current) => ({ ...current, [key]: !current[key] }));

  return (
    <SignUpShell
      navigate={navigate}
      step={5}
      title="Birkaç izin gerekiyor."
      description="Rezervasyonlarını hatırlatmak, yakın stüdyoları göstermek ve üyeliğini tamamlamak için son adım."
      cta="Hesabımı Oluştur"
      nextRoute={routes.welcome}
    >
      <div className="space-y-4">
        {[
          ["notifications", "Bildirimler", "Antrenman hatırlatıcıları ve rezervasyon güncellemeleri.", "notifications"],
          ["location", "Konum Erişimi", "Yakındaki stüdyoları ve rotaları göster.", "location_on"],
          ["analytics", "Veri İşleme", "Performans özetleri ve öneriler için.", "analytics"],
          ["terms", "Kullanım Koşulları", "Sözleşmeyi okudum ve kabul ediyorum.", "description"]
        ].map(([key, title, detail, icon]) => {
          const enabled = permissions[key as keyof typeof permissions];
          return (
            <Card key={key} className={`flex items-center justify-between rounded-[22px] p-4 ${enabled ? "border-[#383838] bg-[#161616]" : ""}`}>
              <div className={`flex items-center gap-4 ${enabled ? "" : "opacity-75"}`}>
                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${enabled ? "bg-sport-lime/10 text-sport-lime" : "bg-[#262626] text-white"}`}>
                  <Icon name={icon} className="text-[20px]" fill={enabled} />
                </div>
                <div>
                  <div className="text-[15px] font-semibold text-white">{title}</div>
                  <div className="mt-1 text-[12px] leading-5 text-sport-muted">{detail}</div>
                </div>
              </div>
              <button
                aria-pressed={enabled}
                className={`relative h-7 w-12 rounded-full transition-colors ${enabled ? "bg-sport-lime" : "bg-sport-border"}`}
                type="button"
                onClick={() => toggle(key as keyof typeof permissions)}
              >
                <span className={`absolute top-1 h-5 w-5 rounded-full transition-all ${enabled ? "right-1 bg-sport-bg" : "left-1 bg-white/80"}`} />
              </button>
            </Card>
          );
        })}
      </div>
    </SignUpShell>
  );
}
