#!/bin/bash
echo '--删除外部依赖开始--'
rm -rf "node_modules"
echo '--删除外部依赖结束--'

echo '--安装依赖开始--'
re_i() {
    directories=($(ls -d $1))
    for dir in "${directories[@]}";
    do
        if [[ $dir =~ "node_modules." ]]; then
            echo '-';
        elif [ -d $dir ]; then
            echo "$dir'开始安装'";
            (cd "$dir"; rm -rf "node_modules"; pnpm i --filter=$2$(basename $dir) --ignore-scripts);
            echo "$dir'安装结束'";
        fi
    done
}

re_i './nest/*'

echo '--安装依赖结束--'