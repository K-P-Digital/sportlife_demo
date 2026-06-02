import { useState } from "react";
import type { ScreenProps } from "../../shared/lib/navigation";
import { AppCanvas, Card, Icon, IconButton, PrimaryButton } from "../../shared/ui";
import { images } from "../../shared/data/content";
import { routes } from "../../shared/lib/routes";

function BrandMark() {
  return (
    <div className="flex flex-col items-center">
      <div className="text-[30px] font-black uppercase italic tracking-[0.28em] text-white">SPORTLIFE</div>
      <div className="mt-2 h-1 w-12 rounded-full bg-sport-lime" />
    </div>
  );
}

export function AuthScreen({ navigate }: ScreenProps) {
  return (
    <AppCanvas className="overflow-hidden px-5 py-12">
      <div className="absolute inset-0 opacity-20">
        <img alt="" className="h-full w-full object-cover" src={images.gymTexture} />
      </div>
      <div className="relative flex min-h-screen flex-col">
        <div className="pt-8">
          <BrandMark />
        </div>
        <div className="flex flex-1 flex-col justify-center gap-8">
          <div className="space-y-3">
            <h1 className="max-w-[240px] text-[38px] font-extrabold leading-[1.05] tracking-tight text-white">Başlayalım.</h1>
            <p className="max-w-[280px] text-[16px] leading-7 text-sport-muted">Performansını takip etmek, yeni stüdyolar keşfetmek ve rezervasyon yapmak için giriş yap.</p>
          </div>
          <div className="space-y-4">
            <PrimaryButton onClick={() => navigate(routes.signUpBasic)}>Hesap Oluştur</PrimaryButton>
            <button
              className="flex h-[54px] w-full items-center justify-center rounded-full border border-sport-border bg-[#161616] px-5 text-[16px] font-semibold text-white transition-colors hover:bg-sport-elevated"
              type="button"
              onClick={() => navigate(routes.signIn)}
            >
              Giriş Yap
            </button>
          </div>
          <div className="flex items-center gap-4 text-sport-muted">
            <div className="h-px flex-1 bg-sport-border" />
            <span className="text-[12px] uppercase tracking-[0.24em]">veya</span>
            <div className="h-px flex-1 bg-sport-border" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button className="flex h-[54px] items-center justify-center rounded-2xl border border-sport-border bg-[#161616] text-white transition-colors hover:bg-sport-elevated" type="button">
              <Icon name="ios" className="text-[24px]" />
            </button>
            <button className="flex h-[54px] items-center justify-center rounded-2xl border border-sport-border bg-[#161616] text-white transition-colors hover:bg-sport-elevated" type="button">
              <Icon name="mail" className="text-[24px]" />
            </button>
          </div>
        </div>
        <p className="pb-4 text-center text-[11px] leading-5 text-sport-muted">
          Devam ederek Kullanım Koşulları ve Gizlilik Politikası'nı kabul etmiş olursun.
        </p>
      </div>
    </AppCanvas>
  );
}

export function SignInScreen({ navigate }: ScreenProps) {
  const [email, setEmail] = useState("ayse@email.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AppCanvas className="px-5 py-10">
      <div className="flex min-h-screen flex-col">
        <div className="flex items-center justify-between pt-2">
          <IconButton icon="arrow_back" label="Geri" onClick={() => navigate(routes.auth)} />
          <div className="text-[11px] font-bold uppercase tracking-[0.24em] text-sport-muted">Giriş</div>
          <div className="h-10 w-10" />
        </div>
        <div className="mt-10 flex flex-col items-center">
          <BrandMark />
        </div>
        <div className="mt-10 text-center">
          <h1 className="text-[36px] font-extrabold leading-none tracking-tight text-white">Tekrar hoş geldin.</h1>
        </div>
        <div className="mt-10 flex flex-1 flex-col">
          <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
            <label className="block">
              <span className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.18em] text-sport-muted">E-posta</span>
              <input
                className="h-[54px] w-full rounded-2xl border border-transparent bg-[#161616] px-4 text-[16px] text-white outline-none transition-colors focus:border-sport-border"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.18em] text-sport-muted">Şifre</span>
              <div className="flex h-[54px] items-center rounded-2xl border border-transparent bg-[#161616] px-4 transition-colors focus-within:border-sport-border">
                <input
                  className="w-full bg-transparent text-[16px] text-white outline-none"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Şifren"
                />
                <button className="text-sport-muted transition-colors hover:text-white" type="button" onClick={() => setShowPassword((current) => !current)}>
                  <Icon name={showPassword ? "visibility" : "visibility_off"} className="text-[22px]" />
                </button>
              </div>
            </label>
            <div className="text-right">
              <button className="text-[14px] font-medium text-sport-lime" type="button">
                Şifremi unuttum
              </button>
            </div>
          </form>
          <div className="mt-8 space-y-4">
            <PrimaryButton onClick={() => navigate(routes.welcome)}>
              Giriş Yap
              <Icon name="arrow_forward" className="text-[20px]" />
            </PrimaryButton>
            <button className="flex h-[54px] w-full items-center justify-center gap-3 rounded-2xl border border-sport-border bg-[#161616] text-white transition-colors hover:bg-sport-elevated" type="button">
              <Icon name="face" className="text-[22px]" />
              Face ID ile Giriş
            </button>
          </div>
          <div className="mt-10">
            <div className="flex items-center gap-4 text-sport-muted">
              <div className="h-px flex-1 bg-sport-border" />
              <span className="text-[13px]">Veya</span>
              <div className="h-px flex-1 bg-sport-border" />
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {["G", "A"].map((mark) => (
                <button
                  key={mark}
                  className="flex h-[54px] items-center justify-center rounded-2xl border border-sport-border bg-[#161616] text-xl text-white transition-colors hover:bg-sport-elevated"
                  type="button"
                >
                  {mark}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-auto pb-8 pt-10 text-center text-[14px] text-sport-muted">
            Hesabın yok mu?{" "}
            <button className="font-semibold text-sport-lime" type="button" onClick={() => navigate(routes.signUpBasic)}>
              Kayıt ol
            </button>
          </div>
        </div>
      </div>
    </AppCanvas>
  );
}

export function WelcomeScreen({ navigate }: ScreenProps) {
  return (
    <AppCanvas className="overflow-hidden px-5 py-10">
      <div className="pointer-events-none absolute left-1/2 top-[28%] h-80 w-80 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,255,79,0.08),transparent_65%)]" />
      <div className="relative flex min-h-screen flex-col items-center justify-center text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-sport-lime shadow-[0_0_40px_rgba(212,255,79,0.28)]">
          <Icon name="check" className="text-[40px] text-sport-bg" fill />
        </div>
        <div className="mt-8 space-y-2">
          <div className="text-[36px] font-extrabold uppercase leading-none tracking-tight text-white">Hoş geldin,</div>
          <div className="text-[36px] font-extrabold uppercase leading-none tracking-tight text-sport-lime">Ayşe.</div>
        </div>
        <div className="mt-6 h-1 w-12 rounded-full bg-sport-lime" />
        <Card className="mt-10 w-full rounded-[24px] border-sport-lime bg-[#161616] p-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sport-lime/10">
            <Icon name="redeem" className="text-[28px] text-sport-lime" fill />
          </div>
          <div className="mt-4 text-[24px] font-bold text-white">2 Ücretsiz Kredi</div>
          <p className="mt-2 text-[14px] leading-6 text-sport-muted">İlk aktiviteni dene, favori stüdyolarını kaydet ve programını burada kur.</p>
        </Card>
        <div className="mt-auto w-full pb-8 pt-10">
          <PrimaryButton onClick={() => navigate(routes.home)}>
            Keşfetmeye Başla
            <Icon name="arrow_forward" className="text-[20px]" />
          </PrimaryButton>
          <p className="mt-4 text-center text-[12px] text-sport-muted">Daha fazla kredi için paketleri inceleyebilirsin.</p>
        </div>
      </div>
    </AppCanvas>
  );
}
