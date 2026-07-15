@echo off
setlocal enabledelayedexpansion

:: Configuration - customize these lists as needed
set "output_file=conteudos.txt"
set "ignore_folders=\node_modules\,\.git\,\.angular\,\public\"
set "ignore_files=package-lock.json,conteudos.txt,.editorconfig,.gitignore,imprime.bat,README.md,server.ts,main.ts,main.server.ts,index.html,tsconfig.spec.json,tsconfig.json,tsconfig.app.json,app.config.server.ts,app.config.ts"

echo === LISTAGEM DE CONTEÚDOS === > "%output_file%"

for /r "." %%f in (*) do (
    set "file_path=%%~ff"
    set "file_relpath=%%~f"
    set "file_name=%%~nxf"
    set "skip_file=0"
    
    :: Check if file is in ignored folders
    for %%a in ("%ignore_folders:,=" "%") do (
        if not "!file_path:%%~a=!" == "!file_path!" (
            set "skip_file=1"
        )
    )
    
    :: Check if file is in ignored files list
    if "!skip_file!" == "0" (
        for %%b in ("%ignore_files:,=" "%") do (
            if /i "!file_name!" == "%%~b" (
                set "skip_file=1"
            )
        )
    )
    
    :: Process file if not ignored
    if "!skip_file!" == "0" (
        echo. >> "%output_file%"
        echo === !file_relpath! === >> "%output_file%"
        type "%%f" >> "%output_file%"
        echo. >> "%output_file%"
    )
)

echo Concluído! Verifique "%output_file%"
pause