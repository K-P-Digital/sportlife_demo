import type { ReactNode } from "react";
import type { ScreenProps } from "../../shared/lib/navigation";
import { AppCanvas, Card, Chip, Icon, PrimaryButton, ProgressHeader } from "../../shared/ui";
import { images } from "../../shared/data/content";
import { routes } from "../../shared/lib/routes";

type OnboardingShellProps = ScreenProps & {
  step: number;
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  onNext: string;
  children: ReactNode;
  visualFrame?: boolean;
  visualPosition?: "top" | "afterText";
};

function OnboardingShell({
  navigate,
  step,
  eyebrow,
  title,
  description,
  cta,
  onNext,
  children,
  visualFrame = true,
  visualPosition = "top"
}: OnboardingShellProps) {
  const progress = (step / 4) * 100;
  const visual = visualFrame ? (
    <section className="relative overflow-hidden rounded-[28px] border border-white/5 bg-sport-panel p-5">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/[0.03] to-transparent" />
      {children}
    </section>
  ) : (
    children
  );
  const copy = (
    <section className="space-y-3">
      <span className="inline-flex rounded-full bg-sport-lime/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-sport-lime">
        {eyebrow}
      </span>
      <h1 className="max-w-[320px] text-[34px] font-extrabold leading-[1.05] tracking-tight text-white">{title}</h1>
      <p className="max-w-[340px] text-[15px] leading-7 text-sport-muted">{description}</p>
    </section>
  );

  return (
    <AppCanvas className="pb-36">
      <ProgressHeader
        total={4}
        progress={progress}
        label={`${String(step).padStart(2, "0")} / 04`}
        onBack={step > 1 ? () => navigate(step === 2 ? routes.onboardingProblem : step === 3 ? routes.onboardingSolution : routes.onboardingHow) : undefined}
        onSkip={step < 4 ? () => navigate(routes.auth) : undefined}
      />
      <div className="px-5 pb-8">
        <div className="flex min-h-[calc(100vh-220px)] flex-col gap-8">
          {visualPosition === "top" ? visual : copy}
          {visualPosition === "top" ? copy : visual}
        </div>
      </div>
      <div className="fixed bottom-0 left-1/2 z-30 w-full max-w-[430px] -translate-x-1/2 bg-gradient-to-t from-sport-bg via-sport-bg/95 to-transparent px-5 pb-8 pt-10">
        <PrimaryButton onClick={() => navigate(onNext)}>
          {cta}
          <Icon name="arrow_forward" className="text-[20px]" />
        </PrimaryButton>
      </div>
    </AppCanvas>
  );
}

function HowStep({
  status,
  label,
  detail,
  index
}: {
  status: "done" | "current" | "upcoming";
  label: string;
  detail?: string;
  index: number;
}) {
  const dimText = status === "upcoming" ? "opacity-45" : status === "done" ? "opacity-70" : "";
  return (
    <div className="relative z-10 flex items-center gap-4">
      <div
        className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 ${
          status === "done"
            ? "border-sport-panel bg-sport-lime text-sport-bg"
            : status === "current"
              ? "border-sport-lime bg-sport-panel text-sport-lime shadow-[0_0_14px_rgba(212,255,79,0.18)]"
              : "border-sport-border bg-sport-bg text-sport-muted"
        }`}
      >
        {status === "done" ? <Icon name="check" className="text-[18px]" fill /> : <span className="text-[14px] font-bold">{index}</span>}
      </div>
      <div className={`min-w-0 ${dimText}`}>
        <div className={`text-[17px] font-bold ${status === "upcoming" ? "text-sport-muted" : "text-white"}`}>{label}</div>
        {detail ? <div className="mt-1 text-[12px] text-sport-muted">{detail}</div> : null}
      </div>
    </div>
  );
}

export function OnboardingProblem({ navigate }: ScreenProps) {
  return (
    <OnboardingShell
      navigate={navigate}
      step={1}
      eyebrow="Sorun"
      title="Tek salon yetmez artık."
      description="Farklı antrenmanlar için farklı üyelikler almak zorunda kalıyorsunuz. Havuz, crossfit, yoga... Hepsi için ayrı ayrı ödeme yapmak hem yorucu hem de masraflı."
      cta="Çözümü Gör"
      onNext={routes.onboardingSolution}
    >
      <div className="flex min-h-[310px] items-center justify-center bg-[#0F0F0F]">
        <div className="relative h-36 w-52">
          <div className="absolute inset-0 translate-x-3 translate-y-4 rotate-[-7deg] rounded-2xl border border-[#383838] bg-[#1A1A1A]" />
          <div className="absolute inset-0 -translate-x-2 rotate-[4deg] rounded-2xl border border-[#383838] bg-[#171717]" />
          <div className="absolute inset-0 rotate-[-2deg] overflow-hidden rounded-2xl border border-[#383838] bg-[#151515]">
            <img alt="" className="h-full w-full object-cover opacity-30 mix-blend-screen" src={images.gymTexture} />
          </div>
          <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#FF5A5A]/10">
            <span className="text-[52px] font-black leading-none text-[#FF5A5A]">X</span>
          </div>
        </div>
      </div>
    </OnboardingShell>
  );
}

export function OnboardingSolution({ navigate }: ScreenProps) {
  return (
    <OnboardingShell
      navigate={navigate}
      step={2}
      eyebrow="Çözüm"
      title="Şehrin tüm sporu. Tek kredi."
      description="Yüzlerce partner stüdyoya tek bir kredi sistemiyle eriş. Abonelik karmaşasına son, özgürlüğe merhaba."
      cta="Nasıl Çalışır?"
      onNext={routes.onboardingHow}
    >
      <div className="relative min-h-[310px] overflow-hidden rounded-[24px] bg-[#0F0F0F]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,255,79,0.1),transparent_58%)]" />
        <div className="relative flex h-full min-h-[310px] items-center justify-center">
          <Card className="relative w-[230px] rounded-[22px] border-sport-lime bg-[#181818] px-6 py-7 shadow-[0_0_32px_rgba(212,255,79,0.14)]">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(212,255,79,0.12),transparent_55%)]" />
            <div className="relative text-center">
              <div className="text-[56px] font-black leading-none tracking-tight text-sport-lime">20</div>
              <div className="mt-1 text-[13px] font-bold uppercase tracking-[0.35em] text-white">Kredi</div>
            </div>
          </Card>
          {[
            ["fitness_center", "left-[11%] top-[22%]"],
            ["pool", "right-[12%] top-[22%]"],
            ["sports_tennis", "-left-1 top-1/2"],
            ["self_improvement", "-right-1 top-1/2"],
            ["sports_martial_arts", "bottom-[18%] left-[16%]"],
            ["directions_bike", "bottom-[18%] right-[16%]"]
          ].map(([icon, position]) => (
            <div
              key={icon}
              className={`absolute ${position} flex h-11 w-11 items-center justify-center rounded-full border border-sport-border bg-sport-bg shadow-lg`}
            >
              <Icon name={icon} className="text-[20px] text-white" />
            </div>
          ))}
        </div>
      </div>
    </OnboardingShell>
  );
}

export function OnboardingHow({ navigate }: ScreenProps) {
  return (
    <OnboardingShell
      navigate={navigate}
      step={3}
      eyebrow="Süreç"
      title="3 tıkta spor yap."
      description="Kredilerini kullanarak istediğin stüdyodan yerini ayırt. Antrenman sonrası stüdyoyu değerlendirerek topluluğa yön ver."
      cta="Rakamları Gör"
      onNext={routes.onboardingSocial}
      visualFrame={false}
      visualPosition="afterText"
    >
      <div>
        <Card className="relative overflow-hidden rounded-[28px] border-white/10 bg-sport-panel p-7">
          <div className="absolute bottom-[48px] left-[47px] top-[48px] w-[2px] bg-sport-border" />
          <div className="absolute left-[47px] top-[48px] h-[136px] w-[2px] bg-sport-lime shadow-[0_0_10px_rgba(212,255,79,0.3)]" />
          <div className="space-y-7">
            <HowStep status="done" label="Üye Ol" index={1} />
            <HowStep status="done" label="Keşfet" index={2} />
            <HowStep status="current" label="Rezerve Et" detail="Kredini harca, yerini al." index={3} />
            <HowStep status="upcoming" label="Spor Yap" index={4} />
          </div>
        </Card>
      </div>
    </OnboardingShell>
  );
}

export function OnboardingSocial({ navigate }: ScreenProps) {
  return (
    <OnboardingShell
      navigate={navigate}
      step={4}
      eyebrow="Rakamlar"
      title="İstanbul sporu değişiyor."
      description="Sürekli büyüyen topluluğumuzla, en iyi stüdyolara en avantajlı fiyatlarla erişin. Performans odaklı ekosisteme bugün katılın."
      cta="Hemen Başla"
      onNext={routes.auth}
    >
      <div className="space-y-5">
        <Card className="relative overflow-hidden rounded-[28px] border-white/5 bg-[#0F0F0F] p-6">
          <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-sport-lime/5 blur-3xl" />
          <div className="space-y-6">
            {[
              { value: "2.500", label: "Aktif Üye", accent: true },
              { value: "80+", label: "Partner Stüdyo", accent: false },
              { value: "₺260", label: "'ya Yoga Dersi", accent: true }
            ].map(({ value, label, accent }) => (
              <div key={label}>
                <div className={`text-[46px] font-extrabold leading-none tracking-tight ${accent ? "text-sport-lime" : "text-white"}`}>{value}</div>
                <div className="mt-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-sport-muted">{label}</div>
              </div>
            ))}
          </div>
        </Card>
        <div className="flex flex-wrap gap-2">
          <Chip label="2500+ üye" active />
          <Chip label="80+ partner" />
          <Chip label="Tek kredi modeli" />
        </div>
      </div>
    </OnboardingShell>
  );
}
