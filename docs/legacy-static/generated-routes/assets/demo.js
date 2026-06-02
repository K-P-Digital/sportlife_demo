(function () {
  "use strict";

  var routes = {
    splash: "/splash/",
    onboardingProblem: "/onboarding/problem/",
    onboardingSolution: "/onboarding/solution/",
    onboardingHow: "/onboarding/how-it-works/",
    onboardingSocial: "/onboarding/social-proof/",
    auth: "/auth/",
    signIn: "/sign-in/",
    signUpBasic: "/sign-up/basic-info/",
    signUpLocation: "/sign-up/location/",
    signUpSports: "/sign-up/sports/",
    signUpGoal: "/sign-up/goal/",
    signUpPermissions: "/sign-up/permissions/",
    welcome: "/welcome/",
    home: "/home/",
    discover: "/discover/",
    training: "/training/",
    favorites: "/favorites/",
    profile: "/profile/",
    studio: "/studio/zen-studio-kadikoy/",
    slots: "/studio/zen-studio-kadikoy/slots/",
    bookingSummary: "/booking/summary/",
    bookingConfirmed: "/booking/confirmed/",
    reservations: "/reservations/",
    qr: "/qr-entry/",
    filter: "/filter/"
  };

  var routeByTab = {
    "ANA SAYFA": routes.home,
    "Ana Sayfa": routes.home,
    "KEŞFET": routes.discover,
    "Keşfet": routes.discover,
    "ANTRENMAN": routes.training,
    "Antrenman": routes.training,
    "FAVORİLER": routes.favorites,
    "Favoriler": routes.favorites,
    "PROFİL": routes.profile,
    "Profil": routes.profile
  };

  var currentPath = normalizePath(window.location.pathname);

  function normalizePath(path) {
    if (!path || path === "/index.html") return "/";
    return path.replace(/index\.html$/, "").replace(/\/?$/, "/");
  }

  function textOf(node) {
    return (node && node.textContent ? node.textContent : "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function go(path) {
    window.location.href = path;
  }

  function toast(message) {
    var node = document.querySelector(".demo-toast");
    if (!node) {
      node = document.createElement("div");
      node.className = "demo-toast";
      document.body.appendChild(node);
    }
    node.textContent = message;
    node.classList.add("is-visible");
    clearTimeout(toast.timer);
    toast.timer = setTimeout(function () {
      node.classList.remove("is-visible");
    }, 1600);
  }

  function closestAction(target) {
    return target.closest("button, a, label, [role='button']");
  }

  function setPressed(button, pressed) {
    button.setAttribute("aria-pressed", pressed ? "true" : "false");
  }

  function markChipGroup(button) {
    var parent = button.parentElement;
    if (!parent) return;
    Array.prototype.forEach.call(parent.children, function (item) {
      if (item.tagName === "BUTTON" || item.tagName === "DIV") {
        item.classList.remove("demo-selected-lime", "demo-selected-outline");
      }
    });
    if (button.className.indexOf("rounded-full") !== -1) {
      button.classList.add("demo-selected-lime");
    } else {
      button.classList.add("demo-selected-outline");
    }
  }

  function toggleSportCard(button) {
    var selected = button.classList.toggle("demo-selected-outline");
    var icon = button.querySelector(".material-symbols-outlined");
    if (icon && (icon.textContent.trim() === "check" || selected)) {
      icon.textContent = selected ? "check" : icon.getAttribute("data-original-icon") || icon.textContent;
    }
  }

  function selectSlot(button) {
    if (button.disabled) return;
    var grid = button.closest(".grid");
    if (!grid) return;
    Array.prototype.forEach.call(grid.querySelectorAll("button"), function (item) {
      item.classList.remove("demo-selected-lime");
      var label = item.querySelector("span:nth-child(2)");
      if (label && label.textContent.indexOf("SEÇİLDİ") !== -1) {
        label.textContent = label.dataset.previousText || "yer";
      }
    });
    var second = button.querySelector("span:nth-child(2)");
    if (second) {
      second.dataset.previousText = second.dataset.previousText || second.textContent;
      second.textContent = "SEÇİLDİ";
    }
    button.classList.add("demo-selected-lime");
    toast("Slot seçildi");
  }

  function selectPayment(label) {
    var group = label.parentElement;
    if (!group) return;
    Array.prototype.forEach.call(group.querySelectorAll("label"), function (item) {
      item.classList.remove("demo-selected-outline");
    });
    label.classList.add("demo-selected-outline");
    toast("Ödeme yöntemi seçildi");
  }

  function toggleSwitch(button) {
    var pressed = button.getAttribute("aria-pressed") === "true";
    setPressed(button, !pressed);
    button.classList.toggle("bg-[#D4FF4F]", !pressed);
    button.classList.toggle("bg-[#262626]", pressed);
    var knob = button.querySelector("span, div");
    if (knob) {
      knob.classList.toggle("translate-x-6", !pressed);
      knob.classList.toggle("translate-x-0", pressed);
    }
  }

  function filterDiscover(query) {
    var normalized = query.toLocaleLowerCase("tr-TR");
    var cards = document.querySelectorAll("main h4");
    Array.prototype.forEach.call(cards, function (heading) {
      var card = heading.closest(".bg-\\[\\#161616\\], .flex, .grid > div") || heading.parentElement;
      if (!card) return;
      var haystack = textOf(card).toLocaleLowerCase("tr-TR");
      card.classList.toggle("demo-hidden", normalized && haystack.indexOf(normalized) === -1);
    });
  }

  function findStudioCard(target) {
    var node = target;
    while (node && node !== document.body) {
      if (node.tagName === "MAIN") return null;
      var className = typeof node.className === "string" ? node.className : "";
      var text = textOf(node);
      var looksLikeCard = className.indexOf("rounded") !== -1 || className.indexOf("border") !== -1;
      var hasStudioContent = /(Zen|Zenite|Studio|Gym|Grit|Flow|Ride|Iron|Pilates|CrossFit|Fight|Spin|Yoga|Fitness)/i.test(text);
      if (looksLikeCard && hasStudioContent) return node;
      node = node.parentElement;
    }
    return null;
  }

  function bindSearch() {
    var search = document.querySelector('input[placeholder*="ara"]');
    if (!search) return;
    search.addEventListener("input", function () {
      filterDiscover(search.value);
    });
  }

  function routeForText(text) {
    if (text === "ATLA" || text === "Geç") return routes.auth;
    if (text.indexOf("Çözümü Gör") !== -1) return routes.onboardingSolution;
    if (text.indexOf("Nasıl Çalışır") !== -1) return routes.onboardingHow;
    if (text.indexOf("Rakamları Gör") !== -1) return routes.onboardingSocial;
    if (text.indexOf("Hemen Başla") !== -1) return routes.auth;
    if (text.indexOf("Hesap Oluştur") !== -1) return routes.signUpBasic;
    if (text.indexOf("Kayıt ol") !== -1) return routes.signUpBasic;
    if (text.indexOf("Giriş Yap") !== -1) return currentPath === routes.auth ? routes.signIn : routes.home;
    if (text.indexOf("Giriş yap") !== -1) return routes.signIn;
    if (text.indexOf("Keşfetmeye Başla") !== -1) return routes.discover;
    if (text.indexOf("QR Kodunu Gör") !== -1 || text.indexOf("QR Kodu") !== -1) return routes.qr;
    if (currentPath === routes.profile && text.indexOf("Rezerv") !== -1) return routes.reservations;
    if (text.indexOf("Rezerve Et") !== -1 && currentPath.indexOf("/studio/zen-studio-kadikoy/slots/") === -1) return routes.slots;
    if (text.indexOf("Rezerve Et") !== -1 && currentPath.indexOf("/studio/zen-studio-kadikoy/slots/") !== -1) return routes.bookingSummary;
    if (text.indexOf("Öde ve Onayla") !== -1) return routes.bookingConfirmed;
    if (text.indexOf("Rezervasyonlarıma Git") !== -1) return routes.reservations;
    if (text.indexOf("Ana Sayfaya Dön") !== -1) return routes.home;
    if (text.indexOf("Tümü") !== -1 && currentPath === routes.home) return routes.discover;
    return null;
  }

  function routeForTab(text) {
    var keys = Object.keys(routeByTab);
    for (var i = 0; i < keys.length; i += 1) {
      if (text.indexOf(keys[i]) !== -1) return routeByTab[keys[i]];
    }
    return null;
  }

  function handleBack() {
    if (currentPath.indexOf("/onboarding/solution/") === 0) return routes.onboardingProblem;
    if (currentPath.indexOf("/onboarding/how-it-works/") === 0) return routes.onboardingSolution;
    if (currentPath.indexOf("/onboarding/social-proof/") === 0) return routes.onboardingHow;
    if (currentPath.indexOf("/sign-up/location/") === 0) return routes.signUpBasic;
    if (currentPath.indexOf("/sign-up/sports/") === 0) return routes.signUpLocation;
    if (currentPath.indexOf("/sign-up/goal/") === 0) return routes.signUpSports;
    if (currentPath.indexOf("/sign-up/permissions/") === 0) return routes.signUpGoal;
    if (currentPath.indexOf("/studio/zen-studio-kadikoy/slots/") === 0) return routes.studio;
    if (currentPath.indexOf("/studio/zen-studio-kadikoy/") === 0) return routes.discover;
    if (currentPath.indexOf("/booking/summary/") === 0) return routes.slots;
    if (currentPath.indexOf("/reservations/") === 0) return routes.profile;
    if (currentPath.indexOf("/qr-entry/") === 0) return routes.home;
    return routes.home;
  }

  function initRouting() {
    if (currentPath === "/" || currentPath === routes.splash) {
      setTimeout(function () {
        go(routes.onboardingProblem);
      }, 1200);
    }

    document.addEventListener("click", function (event) {
      var action = closestAction(event.target);
      if (!action) {
        var looseText = textOf(event.target);
        if (looseText === "tune") {
          event.preventDefault();
          go(routes.filter);
          return;
        }

        if (currentPath === routes.home || currentPath === routes.discover) {
          var card = findStudioCard(event.target);
          if (card) {
            event.preventDefault();
            go(routes.studio);
          }
        }
        return;
      }

      var text = textOf(action);
      var iconText = textOf(action.querySelector(".material-symbols-outlined"));

      if (action.tagName === "A" && action.getAttribute("href") === "#") {
        event.preventDefault();
      }

      if (text.indexOf("Vazgeç") !== -1) {
        event.preventDefault();
        go(routes.slots);
        return;
      }

      if (iconText === "arrow_back" || iconText === "chevron_left" || text === "arrow_back" || text === "chevron_left") {
        event.preventDefault();
        go(handleBack());
        return;
      }

      if (iconText === "close" || text === "close") {
        event.preventDefault();
        go(currentPath === routes.qr ? routes.reservations : routes.home);
        return;
      }

      if (iconText === "tune" || text === "tune" || text.indexOf("Filtre") !== -1) {
        event.preventDefault();
        go(routes.filter);
        return;
      }

      if (iconText === "map" || text === "map" || text.indexOf("Haritada Gör") !== -1) {
        event.preventDefault();
        toast("Harita görünümü prototipte temsilidir");
        return;
      }

      if (text.indexOf("İptal Et") !== -1) {
        event.preventDefault();
        var card = action.closest(".rounded-\\[18px\\], .rounded-2xl, .bg-card-dark");
        if (card) card.classList.add("demo-hidden");
        toast("Rezervasyon iptal edildi");
        return;
      }

      var tabRoute = routeForTab(text);
      if (tabRoute) {
        event.preventDefault();
        go(tabRoute);
        return;
      }

      var route = routeForText(text);
      if (route) {
        event.preventDefault();
        go(route);
      }
    });
  }

  function initState() {
    bindSearch();

    document.addEventListener("click", function (event) {
      var action = closestAction(event.target);
      if (!action) return;
      var text = textOf(action);
      var icon = textOf(action.querySelector(".material-symbols-outlined"));

      if (text.indexOf("visibility_off") !== -1 || icon === "visibility_off") {
        var field = action.closest(".relative").querySelector("input");
        if (field) {
          field.type = field.type === "password" ? "text" : "password";
          toast(field.type === "text" ? "Şifre gösteriliyor" : "Şifre gizlendi");
        }
      }

      if (action.getAttribute("aria-pressed") !== null) {
        toggleSwitch(action);
      }

      if (currentPath.indexOf("/sign-up/sports/") === 0 && action.tagName === "BUTTON" && text.indexOf("Devam Et") === -1) {
        toggleSportCard(action);
      }

      if (currentPath.indexOf("/sign-up/goal/") === 0 && action.tagName === "LABEL") {
        var radio = action.querySelector("input[type='radio']");
        if (radio) {
          radio.checked = true;
          Array.prototype.forEach.call(document.querySelectorAll("label"), function (label) {
            label.classList.remove("demo-selected-outline");
          });
          action.classList.add("demo-selected-outline");
        }
      }

      if (currentPath.indexOf("/studio/zen-studio-kadikoy/slots/") === 0) {
        if (action.tagName === "BUTTON" && /^[0-9]{2}:[0-9]{2}/.test(text)) {
          selectSlot(action);
        }
        if (action.tagName === "LABEL") {
          selectPayment(action);
        }
      }

      if ((currentPath.indexOf("/discover/") === 0 || currentPath.indexOf("/favorites/") === 0 || currentPath.indexOf("/training/") === 0 || currentPath.indexOf("/filter/") === 0) && action.tagName === "BUTTON") {
        if (/(Tümü|Yoga|Fitness|Pilates|Yüzme|Bu Ay|Son 3 Ay|Bu Yıl|Sabah|Öğlen|Akşam|Gece)/.test(text)) {
          markChipGroup(action);
        }
        if (text.indexOf("Temizle") !== -1) {
          Array.prototype.forEach.call(document.querySelectorAll(".demo-selected-lime, .demo-selected-outline"), function (item) {
            item.classList.remove("demo-selected-lime", "demo-selected-outline");
          });
          toast("Filtreler temizlendi");
        }
        if (text.indexOf("Sonucu Gör") !== -1) {
          go(routes.discover);
        }
      }

      if (text.indexOf("favorite") !== -1 || icon === "favorite_border" || icon === "favorite") {
        var favIcon = action.querySelector(".material-symbols-outlined");
        if (favIcon) {
          favIcon.textContent = favIcon.textContent.trim() === "favorite" ? "favorite_border" : "favorite";
          toast("Favori durumu güncellendi");
        }
      }

      if (text.indexOf("Takvime Ekle") !== -1) {
        toast("Takvim etkinliği eklendi");
      }
    });

    document.addEventListener("submit", function (event) {
      event.preventDefault();
      if (currentPath.indexOf("/sign-in/") === 0) go(routes.home);
    });

    var continueMap = {
      "/sign-up/basic-info/": routes.signUpLocation,
      "/sign-up/location/": routes.signUpSports,
      "/sign-up/sports/": routes.signUpGoal,
      "/sign-up/goal/": routes.signUpPermissions,
      "/sign-up/permissions/": routes.welcome
    };
    document.addEventListener("click", function (event) {
      var action = closestAction(event.target);
      if (!action) return;
      if (textOf(action).indexOf("Devam Et") !== -1 || textOf(action).indexOf("Hesabımı Oluştur") !== -1) {
        var next = continueMap[currentPath];
        if (next) {
          event.preventDefault();
          go(next);
        }
      }
    });
  }

  initRouting();
  initState();
})();
