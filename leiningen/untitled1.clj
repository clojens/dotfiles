
(def bundles (atom #{}))

(defn bundle
  [cmd & data]
  (letfn [(add-bundle [m] (swap! bundles conj m))
          (reset-all [] (reset! bundles #{}))
          (pkg-pull [pkg &{version :version output :output :or {version "LATEST" output :short}}]
                    (first (filter #(->> % :coords first str (re-matches (re-pattern (str pkg))))
                                   `~(distill* [[pkg version]] {:verbose false}))))]
    (map add-bundle (map pkg-pull data)) @bundles))

(bundle :clear)
(bundle :add 'enlive 'hiccup)


   (defn pkg-pull
     [pkg &{version :version output :output :or {version "LATEST" output :short}}]
          (first (filter #(->> % :coords first str (re-matches (re-pattern (str pkg))))
                             `~(distill* [[pkg version]] {:verbose false}))))

   (pkg-pull 'enlive)


   (defn pkg-pull
     [pkg &{version :version output :output :or {version "LATEST" output :short}}]
     (let [tree `~(distill* [[pkg version]] {:verbose false})
           {current-version :current-version [artifact version] :coords jar :jar}
           (first (filter #(->> % :coords first str (re-matches (re-pattern (str pkg)))) tree))
           m {:artifact artifact :version version :jar (JarFile. jar) :file-name jar}
           ]
       (condp = output
         :short [(:artifact m) (:version m)]

         m)


       ))




(pull 'instaparse)
(pull 'adi)
(pull 'clojure-opennlp)
(pull 'conch)

(require '[instaparse.core :as insta]
         '[clojure.pprint :as pprint]
         '[adi.core :as adi]
         '[datomic.api :as d])












(def ii
  (insta/parser
   "
   S = char / S
   char = letter / number
   letter = lc / uc

   lc = #'[a-z]'
   uc = #'[A-Z]'
   number = #'[0-9]'

   space = ' '
   nil = '0'
   quote = '\\''

   bang = '!' qmark = '?' star = '*'
   dollar = '$' hat = '^' tilde = '~'

   (* Punctuation *)
   comma = ','
   colon = ':'
   semi = ';'
   period = '.'

   (* Collections *)
   <osq> = '[' <csq> = ']'
   <oph> = '(' <cph> = ')'
   <ocb> = '{' <ccb> = '}'
   <oab> = '<' <cab> = '>'



   "))

(ii "A")

(def model
 {:character {:name [{:required true
                      :unique :value}]
              :symbol [{:required true
                        :restrict ["Symbol needs to be Ascii"
                                   #(re-find #"^\p{ASCII}*$" %)]}]
              :synonyms  []
              :template []
              :context []
              :type     [{:type :enum
                          :default :symbol
                          :enum {:ns :character.type
                                 :values #{:symbol :quoted :literal}}}]}})

(def ds (adi/datastore "datomic:mem://code-mode" model true true))

(adi/insert! ds {:character {:name "bang" :symbol "!" :synonyms "exclamation mark"}})

(format "decimal %d  octal %o  hex %x  upper-case hex %X" 63 63 63 63)

(defn mapped
  [from to]
   (zipmap
   ;(map #(vector % (format "%X" %)) (range from to))
   (range from to)
    (map char (range from to))))




;; (def named-chars
;; {:bang \!
;;  [34 \"]
;;  [35 \#]
;;  [36 \$]
;;  [37 \%]
;;  [38 \&]
;;  [39 \']
;;  [40 \(]
;;  [41 \)]
;;  [42 \*]
;;  [43 \+]
;;  [44 \,]
;;  [45 \-]
;;  [46 \.]
;;  [47 \/]
;;  [48 \0]
;;  [49 \1]
;;  [50 \2]
;;  [51 \3]
;;  [52 \4]
;;  [53 \5]
;;  [54 \6]
;;  [55 \7]
;;  [56 \8]
;;  [57 \9]
;;  [58 \:]
;;  [59 \;]
;;  [60 \<]
;;  [61 \=]
;;  [62 \>]
;;  [63 \?]
;;  [64 \@]
;;  [65 \A]
;;  [66 \B]
;;  [67 \C]
;;  [68 \D]
;;  [69 \E]
;;  [70 \F]
;;  [71 \G]
;;  [72 \H]
;;  [73 \I]
;;  [74 \J]
;;  [75 \K]
;;  [76 \L]
;;  [77 \M]
;;  [78 \N]
;;  [79 \O]
;;  [80 \P]
;;  [81 \Q]
;;  [82 \R]
;;  [83 \S]
;;  [84 \T]
;;  [85 \U]
;;  [86 \V]
;;  [87 \W]
;;  [88 \X]
;;  [89 \Y]
;;  [90 \Z]
;;  [91 \[]
;;  [92 \\]
;;  [93 \]]
;;  [94 \^]
;;  [95 \_]
;;  [96 \`]
;;  [97 \a]
;;  [98 \b]
;;  [99 \c]
;;  [100 \d]
;;  [101 \e]
;;  [102 \f]
;;  [103 \g]
;;  [104 \h]
;;  [105 \i]
;;  [106 \j]
;;  [107 \k]
;;  [108 \l]
;;  [109 \m]
;;  [110 \n]
;;  [111 \o]
;;  [112 \p]
;;  [113 \q]
;;  [114 \r]
;;  [115 \s]
;;  [116 \t]
;;  [117 \u]
;;  [118 \v]
;;  [119 \w]
;;  [120 \x]
;;  [121 \y]
;;  [122 \z]
;;  [123 \{]
;;  [124 \|]
;;  [125 \}]
;;  [126 \~]

;; (pprint
;;  (sort-by key
;;  (mapped 0 200)))


;; (def symtab
;;   )


;; (def lisp
;;   (insta/parser

;;    "
;;    S = symbolic-name / #'[(|\\[|{]' S S #'[)\\]}]' / coll
;;    symbolic-name = keyword
;;    coll = vector / hash-map / set / list
;;    keyword = #'[A-Za-z0-9]
;;    list = '(' S < S > ')'
;;    vector = '[' S < S > ']'
;;    square-brackets = open-square close-square
;;    open-square = '[' close-square = ']'
;;    hash-map = '{' *(key value) '}'
;;    set = #'[#]{' S < S > '}'

;;    "))

;; (lisp "(hello (this (world foo)))")



;; (comment (
;;    "sexpr = atomic-symbol / '(' sexpr sexpr ')' / list

;;    list = '(' sexpr < sexpr > ')'

;;    keyword = #'\\b:'


;;    atomic-symbol = symbol-type / keyword-type

;;    symbol-type = '\\'' letter atom-part / letter atom-part

;;    keyword-type = ':' name-part

;;    atom-part = empty / letter atom-part / number atom-part

;;    name-chars = #'[><|\\-?!_+* A-Za-z0-9]+'

;;    letter = #'[a-zA-Z]'

;;    number = #'[0-9]'



;;    <empty> = space / no-space
;;    no-space = ''
;;    space = ' '
;;    nil = 'nil'
;;    "))
