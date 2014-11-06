
let (themes = get_home_directory()) {
    themes.append(".conkerorrc");
    themes.append("themes");
    theme_load_paths.unshift(themes);
};

theme_load("mono");
theme_load("jjf");
