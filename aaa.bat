@echo off
setlocal enabledelayedexpansion

rem --- ここから設定 ---
set "input_directory=html"
set "output_filepath=pages.json"
rem --- ここまで設定 ---

echo.
echo HTMLファイルリストを生成します。
echo.

rem 入力パスの末尾に\がない場合に追加
if not "%input_directory:~-1%"=="\" set "input_directory=%input_directory%\"

if not exist "%input_directory%" (
    echo エラー: 指定された入力ディレクトリ "%input_directory%" が見つかりません。
    echo パスを確認してください。
    goto :eof
)

rem 出力パスのディレクトリが存在するか確認し、なければ作成を試みる
for %%i in ("%output_filepath%") do set "output_dir=%%~dpi"
if not exist "%output_dir%" (
    echo 警告: 出力先のディレクトリ "%output_dir%" が存在しません。作成を試みます。
    md "%output_dir%" 2>nul
    if errorlevel 1 (
        echo エラー: ディレクトリ "%output_dir%" を作成できませんでした。パスを確認してください。
        goto :eof
    )
)

pushd "%input_directory%"

if errorlevel 1 (
    echo エラー: 指定された入力ディレクトリ "%input_directory%" に移動できませんでした。
    echo パスを確認してください。
    goto :eof
)

(
    echo [
    set "first_entry=true"
    for %%f in (*.html) do (
        if "!first_entry!"=="true" (
            echo   { "url": "%%f" }
            set "first_entry=false"
        ) else (
            echo , { "url": "%%f" }
        )
    )
    echo ]
) > "%output_filepath%"

popd

echo.
echo HTMLファイルリストを "%output_filepath%" に生成しました。
echo.
pause