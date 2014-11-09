
require('walnut');

// coroutines
/*
let (suite = {
         test_is_coroutine: function () {
             assert(is_coroutine(function () { yield 1; }()));
             assert_not(is_coroutine(function () { return 1; }()));
             assert(is_coroutine(i+3 for (i in [1,2,3])));
         }
     })
    walnut_run(suite);
*/
{ let suite = {
      suite_setup: function () {
          define_keywords("$testkeyword");
          this.testfn = function () {
              keywords(arguments, $testkeyword = "hello");
              return arguments.$testkeyword;
          };
      },
      test_keyword_default_val_1: function () {
          assert_equals(this.testfn(), "hello");
      },
      test_keyword_default_val_2: function () {
          assert_equals(this.testfn($testkeyword = "goodbye"), "goodbye");
      }
  };
//  walnut_run(suite);
}


/*

// interactive
{
  interactive('test4', null, function () { throw new Error("test error"); });
  assert_error(function () { call_interactively({}, 'test4'); },
               "interactive simple error");


  // commit de8b0ca5f572838f274e229f575c9589c365a9b6
  //  (fix alternates to properly propagate exceptions)
  // caused this test to fail:
  // interactive('test2', null, alternates(function () { throw new Error("test2 error"); }));
  // assert_error(function () { call_interactively({}, 'test2'); },
  //              "call_interactively 2: alternates and exception passing");

}
*/


{ let suite = {
      test_string_format_1: function () {
          assert_equals(string_format("", {}),
                        "");
      },
      test_string_format_2: function () {
          assert_equals(string_format("%a", {a: 'hello'}),
                        "hello");
      },
      test_string_format_3: function () {
          assert_equals(string_format("%a%a", {a: 'hello'}),
                        "hellohello");
      }
  };
  walnut_run(suite);
}

/*
function foo () {
    var some_object = {a: 1, b: 2, c: 3};
    var bar;
    if (arguments.length == 0) {
        bar = [i for (i in some_object)];
    } else {
        bar = Array.slice(arguments);
    }
    for each (let i in bar) {
        repl.print(i);
    }
}
    */
