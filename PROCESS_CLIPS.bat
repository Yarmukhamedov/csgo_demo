@echo off
title CSDEMO - Video va Audio Birlashtiruvchi Dvigatel
cls
echo ======================================================================
echo    CSDEMO.UZ - Avtomatik Video va Ovoz Birlashtiruvchi Dvigatel
echo ======================================================================
echo.

set "CS2_REC=E:\Steam\steamapps\common\Counter-Strike Global Offensive\game\bin\win64\untitled_rec"
set "OUT_DIR=C:\Users\Mukhammad\Documents\Projects\CSDemo\output_clips"
set "FFMPEG=C:\Users\Mukhammad\Documents\Projects\CSDemo\tools\hlae\ffmpeg\bin\ffmpeg.exe"

if not exist "%OUT_DIR%" mkdir "%OUT_DIR%"

echo  [*] Yangi yozilgan kliplar tekshirilmoqda...
echo.

powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$recDir = '%CS2_REC%';" ^
  "$outDir = '%OUT_DIR%';" ^
  "$ffmpeg = '%FFMPEG%';" ^
  "$takes = Get-ChildItem -Path $recDir -Filter 'take*' -Directory -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending;" ^
  "if ($takes.Count -eq 0) { Write-Host '[-] Hali hech qanday klip topilmadi.' -ForegroundColor Yellow; exit; };" ^
  "foreach ($t in $takes) {" ^
  "  $video = Join-Path $t.FullName 'myStream\video.mp4';" ^
  "  $audio = Join-Path $t.FullName 'audio.wav';" ^
  "  $dest = Join-Path $outDir ($t.Name + '_finished.mp4');" ^
  "  if ((Test-Path $video) -and (Test-Path $audio) -and -not (Test-Path $dest)) {" ^
  "    Write-Host ('[+] Qayta ishlanmoqda: ' + $t.Name) -ForegroundColor Green;" ^
  "    & $ffmpeg -y -i $video -i $audio -c:v copy -c:a aac -b:a 192k -shortest $dest | Out-Null;" ^
  "    Write-Host ('[OK] Tayyor: ' + $dest) -ForegroundColor Cyan;" ^
  "  } elseif (-not (Test-Path $video)) {" ^
  "    Write-Host ('[-] ' + $t.Name + ': faqat audio yozilgan, video topilmadi.') -ForegroundColor Yellow;" ^
  "  }" ^
  "}"

echo.
echo ======================================================================
echo  Barcha tayyor videolaringiz ovozi bilan birlashtirildi!
echo  Papkani ochish: %OUT_DIR%
echo ======================================================================
explorer "%OUT_DIR%"
