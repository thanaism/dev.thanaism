YEAR=$(date +%Y)
MONTH=$(date +%m)
if [ ! -d ../../$YEAR/$MONTH ]; then
    mkdir -p ../../$YEAR/$MONTH
fi
if [ ! -d ../../img/header/$YEAR/$MONTH ]; then
    mkdir -p ../../img/header/$YEAR/$MONTH
fi
RANDOM_STRING=$(openssl rand -hex 4)
image_url="https://picsum.photos/600/360"
image_path="../../img/header/$YEAR/$MONTH/$RANDOM_STRING.jpg"
echo "image_path: $image_path"
curl -L -s $image_url -o $image_path
sed -e "s|image:.*|image: $image_path|g" template >> draft.md
sed -i.bak "s|date:.*|date: $(date +%Y-%m-%dT%H:%M:%S%.000+09:00)|g" draft.md
sed -i.bak "s|draft:.*|draft: false|g" draft.md
rm draft.md.bak
mv draft.md ../../$YEAR/$MONTH/
