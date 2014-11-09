{:user
 {:plugins
  [
   [lein-ancient "0.5.5"]
   [lein-midje "3.1.3"]
   [lein-kibit "0.0.8"]
   [lein-asciidoctor "0.1.10"]
   [lein-ring "LATEST"]
   [com.palletops/lein-shorthand "0.4.0"]
   ]

  :dependencies
  [
   [org.clojure/clojure "1.5.1"]
   [alembic "0.3.2"]
   [backtick "0.3.0"]
   [org.clojure/tools.namespace "0.2.7"]

   ;;[org.clojure/core.async "0.1.346.0-17112a-alpha"]

   ]

  :injections
  [

   (require '[alembic.still :refer [distill*]]
            '[backtick :refer [template]]
            '(clojure [pprint :refer [pprint print-table cl-format]]
                      [string :as string :refer [upper-case lower-case split trim trim-newline]]
                      [set :refer [difference project map-invert]]
                      [edn :as edn])
            '[clojure.tools.namespace.find
              :refer [find-namespaces-in-jarfile
                      find-ns-decls-in-jarfile]])




   (import '[java.util.jar JarFile])



(def registrar (atom #{}))

(defn register!
  "Takes raw map returned by distillation process, modifies it further to serve as
  addition to the central registra]r."
  [pm] (swap! registrar conj pm) @registrar )

(defn reset-reg!
  "Reset the registrar container, defaults to a set."
  ([] (reset-reg! #{}))
  ([x] (reset! registrar x)))

;(defrecord BundledPkg [id ])

(defn- bundle
  [id & pkgs]
  (letfn [(install [pkg] (distill* [pkg "LATEST"] {:verbose false}))
          (filters [pkg] (first (filter #(= (->> % :coords first) pkg) (install pkg))))
          ]
    (if-let [result (hash-map id (mapv filters pkgs)) ]
      (let [{pid :pid [{current-version :current-version [fqn ver] :coords jar :jar}] :bundled :as pkg-bundle} result
            jarns (comp find-namespaces-in-jarfile #(new JarFile %) :jar)
            ]
       (->> pkg-bundle vals first
            (map jarns)

            )
        ;(register! result)
        ))))


   ;;    (defmacro synonym [s s′] (list 'defmacro s′ (str s) '[& rest] (list 'cons (list 'quote s) 'rest)))
   ;;    (synonym λ fn)

   ;(💉)
   ]
  }







 }

