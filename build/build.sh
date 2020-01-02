#!/bin/bash
echo -e "\033[36m 修改对应的ext.json, code: $1 \033[0m";
# npm run clean;
# mkdir dist;
# npm run env:build;
# npm run copy:modules;
echo '$1=='$1;
npm run copy:color $1;
npm run build:mp-weixin-bash;
npm run copy $1;
npm run upload;
# npm run copy:dist;
echo 'Done';
