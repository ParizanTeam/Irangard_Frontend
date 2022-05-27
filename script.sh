#!/bin/bash

# get colors used in style.scss files
get_colors() {
    files=$(find src -name "style.scss")
    for file in $files; do
        grep 'color:\s*#' "$file" | grep -o "#[A-Za-z0-9]*"
    done
}

# change color codes to their variable
set_colors() {
    out=$(grep '$c' "src/theme/colors.scss")
    readarray -t colors <<<"$out"
    len=$((${#colors[@]} - 1))

    for i in $(seq 0 $len); do
        color=${colors[i]}
        c_name="${color%%:*}"
        c_code="${color##*\#}"
        c_code="${c_code%%;*}"
        regex="s/\#\b$c_code\b/$c_name/g"
        find src -name "style.scss" | xargs sed -i "$regex"
    done

}

get_colors | sort -u

# set_colors
