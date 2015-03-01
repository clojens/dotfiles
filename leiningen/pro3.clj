{:user
 {:plugins
  [
   [lein-ancient "0.5.5"]
   [lein-asciidoctor "0.1.10"]
   [lein-ring "LATEST"]
   ]

  :dependencies
  [
   [org.clojure/clojure "1.5.1"]
   [org.clojure/data.csv "0.1.2"]
   [alembic "0.3.2"]
   [backtick "0.3.0"]
   [org.clojure/tools.namespace "0.2.7"]
   [mysql/mysql-connector-java "5.1.33"]
   [org.clojure/java.jdbc "0.3.6"]
   [adi "0.1.6"]
   ]

  :injections
  [

   ;; include these namespace and function symbols to most projects also REPL etc.
   (require '[alembic.still :refer [distill* distill]]
            '[backtick :refer [template]]

            ;; clojure sanctioned libs
            '(clojure [pprint :refer [pprint print-table cl-format]]
                      [string :as string :refer [upper-case lower-case split trim trim-newline]]
                      [set :refer [difference project map-invert]]
                      [edn :as edn])
            '[clojure.tools.namespace.find
              :refer [find-namespaces-in-jarfile
                      find-ns-decls-in-jarfile]]
            '[clojure.data.csv :as csv]
            '[clojure.java.io :as io]
            '[adi.core :as adi]
            '[datomic.api :as d]
            )

   (defn data-path
     "Returns a path to use for data storage. Also environment variable
     INCANTER_HOME is set in ~/.zshrc"
     [s]
     (str "/home/acme/projects/data/" s))

   (defn latest
     ^{:doc "Slightly different method from pull to grab a series of packages when
       the actual return map is irrelevant. Else use pull to get the coordinates
       back with which project file dependencies can be filled."
       :example '(latest 'packs 'another/package 'some/final)}
     [& pkgs]
     (distill* (mapv #(assoc (vector %) 1 "LATEST") pkgs)
               {:verbose false}))

   (defn pull
     ^{:doc "Pulls packages from remote storage and installs locally, then reloads the
       project and returns the coordinates used for the requested package."
       :example '(pull 'mypackage)}
     [pkg & out]
     (let [res (distill* [pkg "LATEST"] {:verbose false})
           [{current-version :current-version [fqn ver] :coords jar :jar}] res
           req (first (filter #(= (-> % :coords first) pkg) res))]
       (:coords req)))

   (defn lt-plug [] nil)


   ]
  }
 }

