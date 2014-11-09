


(def pkg-name
  (insta/parser
   "
   s = package-name
   (* Package names are written in all lower case to avoid conflict with the names of classes or interfaces. *)
   package-name := token
   <token> := #'\\b[^\\s][a-z-.]*\\b'
   "))

(pkg-name "foobar-baz")


