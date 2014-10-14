;; My megalomanic, erh, monolithic profiles.clj file tucked full with
;; Grade-A selected packages for RAD / scaffolding Clojure (Insta)REPL
;; and Clojure/Java project development.
{:user {:plugins [[lein-ancient "0.5.5"]
                  [lein-midje "3.1.3"]
                  [lein-kibit "0.0.8"]
                  ]

        ;; Here goes alllll the artifacts (java/clojure packages/libraries) you want to use
        ;; from inside the 'user' namespace. Injections can contain the 'require' form which
        ;; will import all the required symbols in the JDK instance applicable.
        ;; Likely we'll be running Instarepl (/opt/LightTable/plugins/clojure/resources/runner)

        :dependencies
        [
         ;; classpath management and reload
         [alembic "0.3.2"]

         ;; file system platform i/o
         [me.raynes/fs "1.4.6"]

         ;; shell low level utils / wrap
         [me.raynes/conch "0.8.0"]

         ;; namespace tools
         [org.clojure/tools.namespace "0.2.7"]

         ;; templates and syntax quoting
         [backtick "0.3.0"]

         ;; formal grammar parser combinator
         [instaparse "1.3.4"]

         ;; threading (arrow) macro's
         [swiss-arrows "1.0.0"]

         ;; composable pretty printers
         [fipp "0.4.3"]

         ;; fault tolerance and error handling
         [dire "0.5.2"]

         ;; permutate and combine
         [org.clojure/math.combinatorics "0.0.8"]

         ;; used with plumbing (used to be needed here too)
         [prismatic/schema "0.2.4"]

         ;; pipe function graphs and tools
         [prismatic/plumbing "0.3.3"]

         ;; sql entities in clojure
         [korma "0.4.0"]

         ;; mysql-java adapter
         [mysql/mysql-connector-java "5.0.8"]

         ;; Provides try+ and throw+ which can throw any Clojure or Java
         ;; object regardless of IThrowable, no gen-class just maps or records
         ;; to ex-info
         [slingshot "0.11.0"]

         ;;
         ;; JDK (not ported/wrapped in Clojure yet)
         ;;

         ;; w3c HTML tidy library for pretty-printing / formatting
         ;; of (X)HTML
         [net.sf.jtidy/jtidy "r938"]


         ]

        :aliases {"slamhound" ["run" "-m" "slam.hound"]}

        ;;  ┣▇▇▇═─
        ;; .-..-. .-.   .-..----..---.  .---. .-. .----. .-. .-. .----.
        ;; | ||  `| |.-.| || {_ /  ___}{_   _}| |/  {}  \|  `| |{ {__
        ;; | || |\  || {} || {__\     }  | |  | |\      /| |\  |.-._} }
        ;; `-'`-' `-'`----'`----'`---'   `-'  `-' `----' `-' `-'`----'
        ;; |
        ;;/
:injections
[
;; Namespace aliases and symbol names imported into the 'user' namespace,
;; hence usable inside the Light Table Instarepl finally :)
 (require '[backtick :refer :all]
          '[schema.core :as s]
          '[clojure.java.io :as io]
          '[me.raynes.fs :as fs]
          '[instaparse.core :as insta]
          '[alembic.still :refer [distill*]]
          '[swiss.arrows :refer :all]
          '(korma [db :as db :refer [defdb mysql]]
                  [core :as korma])
          '(plumbing [core :refer :all :exclude [update]]
                     [graph :as graph])
          '(clojure [pprint :refer [pprint print-table cl-format]]
                    [string :refer [upper-case lower-case split]]
                    [set :refer [difference project map-invert]]
                    [edn :as edn])
          '[clojure.math.combinatorics :as combo]
          '[fipp.edn :refer (pprint) :rename {pprint fipp}]
          '[me.raynes.conch :refer [programs with-programs let-programs] :as sh]
          '[dire.core :refer :all]
          '[slingshot.slingshot :refer [throw+]]
          )
 (import '[org.w3c.tidy Tidy])

 ;;
 ;; Environment
 ;;

 (defn system
   []
   {:paths
    {:home (System/getenv "HOME")
     :lein (io/file (safe-get-in [:paths :home] (system)) ".lein")
     }})

 ;;
 ;; Generic tool start
 ;;
 (defn help
   "Note: I'm not going to put long texts like help in here. More likely, I will want
   to have some document root and slurp from there as required."
   [] "This is something todo but at least its a start...")

 (def cfg
   "Read out data object (hash-map) from configuration file."
   (edn/read-string (slurp "/home/acme/.lein/config.edn")))

 ;;
 ;; Top level macros
 ;;
 (defmacro defsynonym [s s′]
   (list 'defmacro s′ (str s) '[& rest]
         (list 'cons (list 'quote s) 'rest)))

 (defmacro functions
   "Take un-quoted form and try to resolve public function names or throw."
   [{ns-sym :ns-sym :or {ns-sym *ns*}}] `(-> '~ns-sym ns-publics keys sort))

 ;;
 ;; Clojars
 ;;

 (defonce jarseq (edn/read-string (str "[" (slurp "http://clojars.org/repo/all-jars.clj") "]")))
 (def jarmap (->> (partition-by first jarseq)
                  (mapv #(hash-map :artifact (ffirst %)
                                   :numvers (count %)
                                   :versions (mapv second %)
                                   :latest (last (mapv second %))
                                   :snapshot? (if (nil? (re-find #"(?i)snapshot"
                                                                 (last (mapv second %))))
                                                false true)))))




                     (defn db-init [k] (defdb dbo (mysql (k cfg))))

                     (defn db-map
                       [db-name]
                       "Creates a formatted hash-map of table names and their columns
                       usable as dataset in further functions and routines."
                       (let [qry [(str "SELECT TABLE_NAME, COLUMN_NAME
                                       FROM INFORMATION_SCHEMA.COLUMNS
                                       WHERE TABLE_SCHEMA = '" db-name "';")]]
                         (->> (korma/exec-raw qry :results)
                              (group-by :TABLE_NAME)
                              (map-vals #(mapv :COLUMN_NAME %)))))



                     (defn freqs []
                       {:refers (-<> *ns* ns-refers vals
                                     (map (comp namespace s/var-name) <>)
                                     frequencies)
                        :mapped (frequencies (map #(:ns (meta %))
                                                  (vals (ns-map *ns*))))
                        }
                       )

                     ]




}}

