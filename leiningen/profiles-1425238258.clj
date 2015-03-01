{:user
 {:plugins [[lein-ancient "0.5.5"]
            [lein-asciidoctor "0.1.10"]
            ]
  :dependencies [[org.clojure/clojure "1.6.0"]
                 [org.clojure/tools.namespace "0.2.9"]
                 [alembic "0.3.2"]
                 ]
  :injections
  [
   ;; this is in 'user' namespace by default: *ns* ;=> #<Namespace user>

   ;; chainstrap the whole shebang using alembic initially
   (require '[alembic.still :refer [distill*]]
            '(clojure [string :as s]))
   (import '(java.util.jar JarFile)
           '(java.net URL))


   (ns ^{:doc "Declare system namespace and briefly switch namespace from user to system
         in order to scaffold out (system/system) as seperate from user allowing reload."}
     system)

   (defn system
     "Function which returns a clean system map."
     [] {:packages {:bundles {:local (atom #{})}}
         :functions (ref #{})
         :commands {}
         })

   ;; back to user (global/repl/lt)
   (in-ns 'user)

   ;; ONLY var in entire scope
   (def system nil)

   (defn init
     "Initialize the var root binding to always return the instance bound to it."
     []
     (alter-var-root #'system
                     (constantly (system/system))))

   ;;
   ;; Package management
   ;;

   (defn pull
     "Find, download, install, reload classpath and return selected map of package data."
     [pkg &{version :version output :output :or {version "LATEST" output :short}}]
     (let [tree `~(distill* [[pkg version]] {:verbose false})
           {current-version :current-version [artifact version] :coords jar :jar}
           (first (filter #(->> % :coords first str (re-matches (re-pattern (str pkg)))) tree))
           ret {:artifact artifact :version version :jar (JarFile. jar) :file-name jar}
           out (if (= output :short) ((juxt :artifact :version) ret) ret)]
       out))

   (defn bundle
     "Adds a bundle of software packages to the ad-hoc storage. Only takes local
     for now, by default."
     [cmd & data]
     (condp = cmd
       :add (swap! (get-in system [:packages :bundles :local])
                   conj data)
       :reset (reset! (get-in system [:packages :bundles :local]) data)
       (get-in @system/system [:packages :bundles :local])
       ))








;;    (defn java
;;      [& forms]
;;      (let [m {:jarfile 'util.jar :url 'net :stringreader 'io}]
;;        (letfn [(systr [] (comp symbol str))]
;;          (map #(list (systr "java." (get m ((comp keyword clojure.string/lower-case str) %)))
;;                      (systr " " %)) forms))))


















(comment

  (bundle :reset #{})


(clojure.string/join (map first (clojure.string/split "back|tick" #"\|")))

  (bundle :add [:foo :baz])

  (add-bundle [:foo :bal])



  [org.clojure/tools.namespace "0.2.7"]
  [swiss-arrows "1.0.0"]
  [backtick "0.3.0"]
  [instaparse "LATEST"]
  ;; FIXME: unsigned-bit-shift-right won't fix, backtick needs internal record?

  (pull 'back*tick) ;=> #{[...] [backtick "1.2.3"]}
  ;=> (require '[backtick :as bt])


  '[backtick :refer [template]]
  '(clojure [string :as string]
            [pprint :as pprint]
            [set :refer [project union]]
            [data :refer [diff]]
            [edn :as edn]
            [pprint :refer [pprint print-table cl-format]])
  '[clojure.tools.namespace.find :refer [find-namespaces-in-jarfile
                                         find-ns-decls-in-jarfile]]
  (import '(java.util.jar JarFile)
          '(java.io File))


  (refer-clojure :exclude [record? unsigned-bit-shift-right])






  (def bundles (atom #{}))
  (defn reset-bundles [] (reset! bundles #{}))
  (defn pkg->bundle [pkg] (swap! bundles conj (pull pkg)))

  (defn bundle
    [cmd obj]
    (condp = cmd
      :add (swap! bundles conj (pull obj))
      :reset (reset! bundles obj)
      ))
  )


;; (def ad-hoc (atom #{}))
;; (defn add-local [a kv] (swap! a conj kv))
;; (defn reset-bundle [a] (reset! a #{}))

;; (reset-bundle ad-hoc)

;; (diff {:a {:bar 'b}}
;;       {:a {:far 'foo :bar 'b}})

;; (defn process-pkg
;;   [v]
;;   (if (symbol?)
;;     (first v))

;; (process-pkg '[foo/bar])

;; (def stub-requesting
;;   '{:pkg {:group prismatic
;;           :artifact plumbing
;;           :version nil ; even when missing :version get-in will return nil = good
;;           }})

;; (def stub-adhoc
;;   '{:pkg {:group prismatic
;;           :artifact plumbing
;;           :version "0.3.4"
;;           :update '(days 2)}}) ;; 0.3.5 latest remote storage, how do we know? Alembic but only if...

;; (def stub-remote
;; '{:pkg {:group prismatic
;;         :artifact plumbing
;;         :version "0.3.5"}})

;; (let [d (diff stub-requesting stub-adhoc)
;;       v (get-in (first d)
;;         [:pkg :version])
;;       x (if (nil? v) (get-in (second d) [:pkg :version]) d)]
;;   (str "Package Y has version " x " in local storage"))

;; (defn pull
;;   [pkgs]
;;   (if (not (vector? (ffirst pkgs)))
;;     (if (nil? (second pkgs)) (conj [pkgs] "LATEST") pkgs)
;;     (do
;;       (println (first pkgs))
;;       (map pull (rest pkgs))
;;     )))





   ]
  }
 }

