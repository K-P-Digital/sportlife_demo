#!/usr/bin/env ruby
# frozen_string_literal: true

require "fileutils"

ROUTES = {
  "index.html" => "a01_splash_screen/code.html",
  "splash/index.html" => "a01_splash_screen/code.html",
  "onboarding/problem/index.html" => "a02_onboarding_1_problem/code.html",
  "onboarding/solution/index.html" => "a03_onboarding_2_solution/code.html",
  "onboarding/how-it-works/index.html" => "a04_onboarding_3_how_it_works/code.html",
  "onboarding/social-proof/index.html" => "a05_onboarding_4_social_proof/code.html",
  "auth/index.html" => "a06_auth_gate/code.html",
  "sign-up/basic-info/index.html" => "a07_sign_up_step_1_basic_info/code.html",
  "sign-up/location/index.html" => "a08_sign_up_step_2_location/code.html",
  "sign-up/sports/index.html" => "a09_sign_up_step_3_sport_preferences/code.html",
  "sign-up/goal/index.html" => "a10_sign_up_step_4_goal/code.html",
  "sign-up/permissions/index.html" => "a11_sign_up_step_5_permissions/code.html",
  "welcome/index.html" => "a12_sign_up_success_welcome/code.html",
  "sign-in/index.html" => "a13_sign_in_returning_user/code.html",
  "home/index.html" => "home_tab_corrected_navigation_1/code.html",
  "discover/index.html" => "ke_fet_discover/code.html",
  "training/index.html" => "training_v6.0_dark/code.html",
  "favorites/index.html" => "favorites_v6.0_dark/code.html",
  "profile/index.html" => "profil_premium_light_v3/code.html",
  "studio/zen-studio-kadikoy/index.html" => "studio_detail_zen_studio_kad_k_y_1/code.html",
  "studio/zen-studio-kadikoy/slots/index.html" => "slot_selection_v6.1_polish/code.html",
  "booking/summary/index.html" => "booking_summary_premium_v6.1/code.html",
  "booking/confirmed/index.html" => "booking_confirmed_ceremony_v6.1/code.html",
  "reservations/index.html" => "rezervasyonlar_m_my_reservations/code.html",
  "qr-entry/index.html" => "giri_kodu_qr_v6.1/code.html",
  "filter/index.html" => "filter_bottom_sheet/code.html"
}.freeze

ASSET_LINKS = <<~HTML.chomp
  <link href="/assets/demo.css" rel="stylesheet"/>
HTML

SCRIPT_LINK = <<~HTML.chomp
  <script defer src="/assets/demo.js"></script>
HTML

ROUTES.each do |target, source|
  html = File.read(source)
  html = html.sub("</head>", "#{ASSET_LINKS}\n</head>")
  html = html.sub("</body>", "#{SCRIPT_LINK}\n</body>")
  dirname = File.dirname(target)
  FileUtils.mkdir_p(dirname) unless dirname == "."
  File.write(target, html)
end

puts "Generated #{ROUTES.length} demo pages."
