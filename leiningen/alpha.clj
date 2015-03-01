
(comment
{:user
 {:plugins
  [
   [lein-ancient "0.5.5"]
   [lein-asciidoctor "0.1.10"]
   [lein-ring "LATEST"]
   ]

  :dependencies
  [

   [org.clojure/clojure "1.6.0"]
   [alembic "0.3.2"]

   ]

  :injections
  [
   (require '[alembic.still :refer [distill*]])

   (defn pull-pkg<-
     "Plain Old Java function. Returns a `symbol` representing a Leiningen coordinate
     of artifact fully qualified name (either group/artifact or artifact if same) and
     version number. Has retrieved the requested package successfully or fails."
     [pkg]
     (let [[{curver :current-version [fqn ver] :coords jar :jar} :as r]
           (distill* [pkg "LATEST"] {:verbose false})
           fc (:coords (first (filter #(= (-> % :coords first) pkg) r)))
           ]
       fc))


   (defmacro pull
     [pkg]
     (let [[artifact version :as sy] (pull-pkg<- pkg)]
       `(do
          (notifos/working (str "Adding package " '~artifact " version " '~version " to bundle..."))
          (util/wait 10000 #(statusbar/loader-set 0))
          '~sy
          )))





   (comment


     (def bundles (atom {}))

     (defn append-package
       "Takes a name of a bundle and a leiningen coordinate returned by the macro
       call to `pull` defined in our Clojure JDK file."
       [bundle coord]
       (swap! bundles (fn [all]
         (if (all bundle)
           (update-in all [bundle] conj coord)
           (assoc all bundle #{coord})))))

     (append-package 'foo (pull enlive))
     (append-package 'foo (pull hiccup))
     (append-package 'foo (pull backtick))






     (pull org.clojure/data.csv)
     (pull backtick)
     (pull org.clojure/tools.namespace)
     (pull mysql/mysql-connector-java)
     (pull org.clojure/java.jdbc)
     (pull adi)











   (defn data-path
     "Returns a path to use for data storage. Also environment variable
     INCANTER_HOME is set in ~/.zshrc"
     [s]
     (str "/home/acme/projects/data/" s))


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



   ;; end injections `--<{\/\/\}|--|
   ]
  }
 }

)