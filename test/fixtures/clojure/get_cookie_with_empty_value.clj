(require '[clj-http.client :as client])

(client/get "http://localhost:28139/cookies" {:headers {"accept" "application/json",
                                                        "Cookie" "mysamplecookie=someValue; emptycookie=; otherCookie=2"}})
