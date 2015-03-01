
(pull 'instaparse)
(require '[instaparse.core :as insta]
         '[clojure.string :as string])

(def consttable {:newline \newline :null \0 :tab \tab})

(comment
  Intrinsic Attributes
  Attribute Entrys
  Attribute Lists
  BlockId Elements
  Macros
  API and Command Line Attributes)

(defn rule [n rhs] (str n " ::= " rhs))
(defn silent [n rhs] (str "<" n "> ::= " rhs))
(defn bnf-comment [txt] (str "(* " txt " *)" ))
(defn re-chr [c] (str "#'[" c "]'"))
(defn re-chrs [& cs] (str "#'[" (map str cs) "]+'"))
(defn re-key [k v] (str (name k) " ::= '" v "'"))

(re-key :dquote \")

(map char (range 0 200))
(defn named-special
  [k]
  (k {
      :encapsulation {:tokens '[[\\[ \\]]\\(\\)]}
      :dquote \"
      :squote \'
      :pound \#
      :dollar \$
      :obelus \%
      :amp \&

      :equal \=
      :qmark \?
      :bang \!

      :ophar \(
      :cphar \)
      :star \*
      :plus \+
      :comma \,
      :minus \-
      :period \.
      :slash \/
      :backslash \\

      :numbers {:range true
                :synonyms [:num :digits]
                :tokens {:zero \0 :one \1 :two \2 :three \3 :four \4 :five \5 :six \6 :seven \7 :eight \8 :nine \9}
      :colon \:
      :semicol \;
      :lt \<

                :gt \>

                :at \@
      :upper {:range true
              :synonyms [:capitals :latin-upper :upper-case]
              :tokens [\A \B \C \D \E \F \G \H \I \J \K \L \M \N \O \P \Q \R \S \T \U \V \W \X \Y \Z]
              }
      :lower {:range true
              :synonyms [:lower-case :latin-lower :normal-case]}

                :osquare \[
      :csquare \]
                :hat \^
                :underscore \_
                :backtick \`
                \{ \| \} \~ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \  \¡ \¢ \£ \¤ \¥ \¦ \§ \¨ \© \ª \« \¬ \­ \® \¯ \° \± \² \³ \´ \µ \¶ \· \¸ \¹ \º \» \¼ \½ \¾ \¿ \À \Á \Â \Ã \Ä \Å \Æ \Ç]

      }

     ))

(defn listing
  [sq &{chr :chr :or {chr "|"}}]
  (string/join " " (interpose chr
                              (map #(str "'" % "'") sq))))

(rule "foo" (listing ["foo" "var"]))

(def ad
  (insta/parser
   "
   S = S
   block-elements = header / title / author-info / first-name / middle-name /
                    last-name / email-address / revision-info / revision-number /
                    revision-date / revision-remark / attribute-entry / preamble /
                    section / title / section-body / block-id / block-title / block-macro /
                    block / paragraph / delimited-block / table / list / bulleted-list /
                    numbered-list / labeled-list / callout-list / list-entry / list-label /
                    list-item / item-text / list-paragraph / list-continuation
   inline-elements = quotes / replacements / special-chr / special-words /
                     attribute-references / inline-macros

   (* <, is replaced with the &lt; >, is replaced with the &gt; &, is replaced with the &amp; *)

   emphasis = #'\\b_[A-Za-z0-9]_\\b'


   special-chr = '&' / '>' / '<'

   attributes = intrinsic-attributes / attribute-entry / attribute-lists / blockid-elements / macros

   attribute-entry = attr / attr value

   value = #'[A-Za-z0-9][ $|+]'
   (* value = substitute-text / content-type / operation *)

   attr = ':' '!'? symbolic-name '!'? ':'



   "))
