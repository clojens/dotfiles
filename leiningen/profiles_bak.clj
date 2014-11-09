;; My megalomanic, erh, monolithic profiles.clj file tucked full with
;; Grade-A selected packages for RAD / scaffolding Clojure (Insta)REPL
;; and Clojure/Java project development.

{:user {:plugins [[lein-ancient "0.5.5"]
                  [lein-midje "3.1.3"]
                  [lein-kibit "0.0.8"]
                  [lein-asciidoctor "0.1.10"]
                  ]

        ;; Here goes alllll the artifacts (java/clojure packages/libraries) you want to use
        ;; from inside the 'user' namespace. Injections can contain the 'require' form which
        ;; will import all the required symbols in the JDK instance applicable.
        ;; Likely we'll be running Instarepl (/opt/LightTable/plugins/clojure/resources/runner)

        :dependencies
        [
         ;; classpath management and reload
         [alembic "0.3.2"]

         ;; genius frenchie screen scraping and templating
         [enlive "1.1.5"]

         ;; file system platform i/o
         [me.raynes/fs "1.4.6"]

         ;; shell low level utils / wrap
         [me.raynes/conch "0.8.0"]

         ;; web forms
         [formative "0.8.8"]

         ;; Tentacles is a Clojure library for working with the Github v3 API. It supports the entire Github API.
         [tentacles "0.2.5"]

         ;; namespace tools
         [org.clojure/tools.namespace "0.2.7"]

         ;; templates and syntax quoting
         [backtick "0.3.0"]

         ;; clojure time library wrapping Joda library
         [clj-time "0.8.0"]

         ;; formal grammar parser combinator
         [instaparse "1.3.4"]

         ;; threading (arrow) macro's
         [swiss-arrows "1.0.0"]

         ;; composable pretty printers
         [fipp "0.4.3"]

         ;; fault tolerance and error handling
         [dire "0.5.2"]

         ;; The concept is simple. adi is a document-database syntax
         ;; grafted on Datomic. It makes use of a map/object notation to
         ;; generate datastructure for Datomic's query engine. This
         ;; provides for an even more declarative syntax for relational
         ;; search. Fundamentally, there should be no difference in the
         ;; data-structure between what the programmer uses to ask and
         ;; what the programmer is getting back. We shouldn't have to
         ;; queries... etc...
         [adi "0.1.6"]

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

         ;; hiccup html dsl for clojure
         [hiccup "1.0.5"]


         ;; PigPen is map-reduce for Clojure, or distributed Clojure. It
         ;; about Pig to use it.
         [com.netflix.pigpen/pigpen "0.2.10"]


         ;; Provides try+ and throw+ which can throw any Clojure or Java
         ;; object regardless of IThrowable, no gen-class just maps or records
         ;; to ex-info
         [slingshot "0.11.0"]

         ;; Natural language processing

         ;; Wordnet = sweeet
         ;; REQUIRES: download of the database via
         ;; https://github.com/delver/wordnet-db.git
         [clj-wordnet "0.1.0"]

         ;; natural language processing, models also for the most of it in dutch
         ;; ~/projects/resources/nlp/models/nl
         [clojure-opennlp "0.3.2"]

         ;;
         ;; JDK (not ported/wrapped in Clojure yet)
         ;;

         ;; w3c HTML tidy library for pretty-printing / formatting
         ;; of (X)HTML
         [net.sf.jtidy/jtidy "r938"]

         ;; language detection for java, supports 56 languages
         [com.cybozu.labs/langdetect "1.1-20120112"]

         ]

        :aliases {"slamhound" ["run" "-m" "slam.hound"]}

;) ┣▇▇▇═─ ns user projects like instarepl with a little ❤
:injections
[

;; Namespace aliases and symbol names imported into the 'user' namespace,
;; hence usable inside the Light Table Instarepl finally :)
 (require '[adi.core :as adi]
          '[schema.core :as s]
          '[clj-time.core :as t]
          '[me.raynes.fs :as fs]
          '[backtick :refer :all]
          '[clojure.java.io :as io]
          '[hiccup.core :refer :all]
          '[clj-wordnet.core :as wn]
          '[instaparse.core :as insta]
          '[alembic.still :refer [distill*]]
          '[swiss.arrows :refer :all]
          '(korma [db :as db :refer [defdb mysql]]
                  [core :as korma])
          '(plumbing [core :refer :all :exclude [update]]
                     [graph :as graph])
          '(clojure [pprint :refer [pprint print-table cl-format]]
                    [string :as string :refer [upper-case lower-case split trim trim-newline]]
                    [set :refer [difference project map-invert]]
                    [edn :as edn])
          '[clojure.math.combinatorics :as combo]
          '[fipp.edn :refer (pprint) :rename {pprint fipp}]
          '[me.raynes.conch :refer [programs with-programs let-programs]]
          '[me.raynes.conch.low-level :as sh]
          '[dire.core :refer :all]
          '[slingshot.slingshot :refer [throw+]]
          '(opennlp [nlp :as nlp]
                    [treebank :as treebank])
          '(formative [core :as f]
                      [parse :as fp])
          )
 (import '[org.w3c.tidy Tidy]
         '[java.util.jar JarFile]
         '[java.util ArrayList]
         '(com.cybozu.labs.langdetect Detector DetectorFactory Language))


(defonce det-profile (DetectorFactory/loadProfile "/home/acme/projects/resources/nlp/lang/detect/profiles"))
(def get-sentences (nlp/make-sentence-detector "/home/acme/projects/resources/nlp/models/nl/sent.bin"))
(def tokenize (nlp/make-tokenizer "/home/acme/projects/resources/nlp/models/nl/token.bin"))
(def langmap {"en" "english" "nl" "dutch"})

(defn lang-detect
  "TODO: String protocol"
  [txt]
  (let [^Detector detector (DetectorFactory/create)]
    (do
      (.append detector txt)
      (.detect detector))))


 ;;
 ;; Environment
 ;;

;;  (def ^:dynamic *default-voice* :dutch)

;; (defn polygloth
;;   [s]
;;   (-<> s (string/replace <> "\n" " ")
;;        (sh/proc "espeak" "-s 150" "-v" ((lang-detect s) lang-map) <>)
;;        (sh/stream-to-string <> :out) trim-newline
;;        ))

;;  (polygloth "Which switch is the right switch for Ipswich?")
;;  (Thread/sleep 1000)
;;  (polygloth "Kat krabt de krullen van de trap.")
;;  (Thread/sleep 1000)
;;  (polygloth "My Lord, the Light Table polygloth Text To Speech system has been initialized.")
;;  (polygloth "Setting up base system." "english")
;;  (polygloth "Parse configuration file.")
;;  (polygloth "Setting up wordnet dictionary.")
;; (polygloth "Setting top level macro's for reader.")

 (defn ^:base system
   []
   {:paths
    {:home (System/getenv "HOME")
     :lein (io/file (safe-get-in [:paths :home] (system)) ".lein")
     }})

 ;;
 ;; Configuration
 ;;


 (def ^:base cfg (edn/read-string (slurp "/home/acme/.lein/config.edn")))

 (defn pull [pkgs] (distill* pkgs {:verbose false}))

(defn pull+
  [pkg req]
  (let [;; fetch the package which will return a sequence of maps of dependencies and the targeted package
        tree `~(distill* [[pkg "LATEST"]] {:verbose false})
        ;; destructuring the return map from alembic we get a lot of fields/info
        {current-version :current-version [artifact version] :coords jar :jar}
        (first (filter #(->> % :coords first str (re-matches (re-pattern (str pkg)))) tree))
        ;; rebuild to a more easily managed map of stuff
        m {:artifact artifact :version version :jar (JarFile. jar) :file-name jar}
        m (into m {:ns {:exposed (find-namespaces-in-jarfile (:jar m))
                        :declared (find-ns-decls-in-jarfile (:jar m))}
                   :dtg {:date (t/now)}
                   })
        ;; check if required namespaces are found in the jar
        reqchk (some #(= req %) (:exposed (:ns m)))

        ]
    reqchk
    ))



;; (comment
;;  (polygloth "Wordnet, a large lexical database of English. Nouns, verbs,
;;  adjectives and adverbs are grouped into sets of cognitive synonyms
;;  (synsets), each expressing a distinct concept. Synsets are interlinked
;;  by means of conceptual-semantic and lexical relations." "english")
;; )


 ;; wordnet library as (wn "bus")
 (def wordnet (-> cfg :dict :wordnet wn/make-dictionary))


 ;;
 ;; Top level macros
 ;;


 (defmacro defsynonym
   "Allows for the aliasing of macro names. Bad-ass.
   e.g. (defsynonym λ fn)"
   [s s′]
   (list 'defmacro s′ (str s) '[& rest]
         (list 'cons (list 'quote s) 'rest)))

 (defmacro functions
   "Take un-quoted form and try to resolve public function names
   or throw an exception."
   [{ns-sym :ns-sym :or {ns-sym *ns*}}]
   `(-> '~ns-sym ns-publics keys sort))




 ;;
 ;; Generic tool start
 ;;
 (defn ^:base help
   ([] (help :intro))
   ([subject]
    (let [m1 {:topics {:intro "Welcome here, to general introduction. You may want to type:
                       (help :examples) to show some examples."
                       :examples {:settings {:read '[cfg]}
                                  :database {:init '[(db-init (:wbdb cfg))]}

                                  }
                         }}]
      (safe-get-in m1 [:topics subject])

    )))




 ;;
 ;; Clojars
 ;;


(def clojars
 (template
  (do
    (defonce jarseq (edn/read-string (str "[" (slurp "http://clojars.org/repo/all-jars.clj") "]")))
    (def jarmap (->> (partition-by first jarseq)
                    (mapv #(hash-map :artifact (ffirst %)
                                     :numvers (count %)
                                     :versions (mapv second %)
                                     :latest (last (mapv second %))
                                     :snapshot? (if (nil? (re-find #"(?i)snapshot"
                                                                   (last (mapv second %))))
                                                  false true))))))))

 (defn db-init
   "Takes a map, for example one from config.edn in ~/.lein or so.
   Then proceeds to create a mysql connection thread pool."
   [k] (defdb dbo (mysql (k cfg))))

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



 (defn ns-freqs
   "Stats from namespace and function refers, interns, mapped, inspected
   or gathered."
   []
   {:refers (-<> *ns* ns-refers vals
                 (map (comp namespace s/var-name) <>)
                 frequencies)
    :mapped (frequencies (map #(:ns (meta %))
                              (vals (ns-map *ns*))))
    }
   )

 ]




}}

