
function jjf_shell_test () {
    co_call(
        shell_command(
            "cat",
            $fds = [
                { output: async_binary_string_writer("this is a test\n") },
                { input: async_binary_reader(function(str) { dumpln("got output: " + str); }) }
            ]));
}

