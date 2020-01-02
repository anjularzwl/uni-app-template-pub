
array=(xs yxs)
for data in ${array[@]}  
do  
    echo ${data}  
    bash ./build/build.sh ${data}
done  