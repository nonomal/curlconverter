library(httr2)

request("http://localhost:28139/page") |>
  req_headers(cookie = "secure_user_id=InNlY3VyZTEwNjI3Ig%3D%3D--3b5df49345735791f2b80eddafb630cdcba76a1d; adaptive_image=1440; has_js=1; ccShowCookieIcon=no; _web_session=Y2h...e5") |>
  req_perform(verbosity = 1)
