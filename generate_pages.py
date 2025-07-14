import os
import json

# --- ここから設定 ---
input_directory = "html"
output_filepath = os.path.join("json", "pages.json")
# --- ここまで設定 ---

print("\nHTMLファイルリストを生成します。\n")

# 入力ディレクトリの存在チェック
if not os.path.isdir(input_directory):
    print(f"エラー: 指定された入力ディレクトリ '{input_directory}' が見つかりません。")
    print("パスを確認してください。")
    exit(1)

# 出力ファイルの親ディレクトリが存在するか確認し、なければ作成を試みる
output_dir = os.path.dirname(output_filepath)
if output_dir and not os.path.exists(output_dir):
    print(f"警告: 出力先のディレクトリ '{output_dir}' が存在しません。作成を試みます。")
    try:
        os.makedirs(output_dir)
    except OSError as e:
        print(f"エラー: ディレクトリ '{output_dir}' を作成できませんでした。")
        print(f"詳細: {e}")
        exit(1)

html_files = []
try:
    for filename in os.listdir(input_directory):
        full_path = os.path.join(input_directory, filename)
        if filename.endswith(".html") and os.path.isfile(full_path):
            # ファイル名から.html拡張子を除去
            base_name = os.path.splitext(filename)[0]

            # --- ここから display_name の生成ロジックを変更 ---
            if base_name == "index": # index.html の場合
                display_name = "Home"
            else:
                # ハイフンをスペースに置換し、タイトルケースに変換して表示名を生成
                display_name = base_name.replace('-', ' ').title()
            # --- ここまで display_name の生成ロジックを変更 ---

            # --- ここから Font Awesome クラスの割り当てロジックを直接記述 ---
            # Font Awesome の Solid スタイル ('fas') をベースにする
            # 実際のアイコンクラス (fa-homeなど) と結合して文字列として保存
            
            icon_classes = "fas fa-file" # デフォルトのFont Awesomeアイコン (ファイルアイコン)

            if "index" in base_name:
                icon_classes = "fas fa-home" # ホームアイコン
            elif "diary" in base_name:
                icon_classes = "fas fa-book" # 本のアイコン
            elif "math" in base_name:
                icon_classes = "fas fa-calculator" # 計算機アイコン
            elif "self-introduction" in base_name: # self-introduction に対応
                icon_classes = "fas fa-user" # ユーザーアイコン
            # 必要に応じて他のファイル名パターンとFont Awesomeアイコンをマッピング
            # 例えば、bat-file.html -> fa-terminal, click-bait.html -> fa-external-link-alt など
            elif "bat-file" in base_name:
                icon_classes = "fas fa-terminal"
            elif "click-bait" in base_name:
                icon_classes = "fas fa-external-link-alt"
            # --- ここまでアイコン割り当てロジック ---

            html_files.append({"url": filename, "display_name": display_name, "icon": icon_classes})
except OSError as e:
    print(f"エラー: ディレクトリ '{input_directory}' の内容を読み取れませんでした。")
    print(f"詳細: {e}")
    exit(1)

# JSONファイルとして出力
try:
    with open(output_filepath, 'w', encoding='utf-8') as f:
        json.dump(html_files, f, indent=2, ensure_ascii=False)
except IOError as e:
    print(f"エラー: ファイル '{output_filepath}' への書き込みに失敗しました。")
    print(f"詳細: {e}")
    exit(1)

print(f"\nHTMLファイルリストを '{output_filepath}' に生成しました。\n")
# input("Enterキーを押して終了...")