COUNT=1
for f in *.jpg
do
    BN=$(basename $f)
    R=$RANDOM
    R=$(printf "%05d" "${R}")
    sed -e 's/img\//img\/'"$BN"'/g' template>>tmp$R.md
    mv $f ../../img/
    echo $COUNT;((COUNT++))
done