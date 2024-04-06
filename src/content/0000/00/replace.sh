# コンテンツディレクトリのパス
content_dir="../.."

# 記事ファイルを検索して処理
find "$content_dir" -type f -name "*.md" | while read -r file; do
    # 記事のメタデータから日付を取得
    date_str=$(ggrep -oP '(?<=date: )\d{4}-\d{2}-\d{2}' "$file" | head -n 1)
    year=$(echo "$date_str" | cut -d'-' -f1)
    month=$(echo "$date_str" | cut -d'-' -f2)

    # 画像パスを抽出
    image_path=$(ggrep -oP '(?<=image: ).*' "$file")

    # 新しい画像パスを生成
    random_string=$(openssl rand -hex 4)
    new_image_path="../../img/header/$year/$month/$random_string.jpg"

    echo "image_path: $image_path"
    echo "new_image_path: $new_image_path"

    # 画像ファイルをコピー
    mkdir -p "$content_dir/img/header/$year/$month"
    cp "$image_path" "$new_image_path"

    # 記事内の画像パスを置換
    sed -i.bak "s|image: $image_path|image: $new_image_path|" "$file"
    rm "$file.bak"
done
